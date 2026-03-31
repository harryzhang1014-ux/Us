import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import * as api from './api';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
  partnerId: string;
  partnerName: string;
  pairId: string;
  pairingCode: string;
}

type AuthStep = 'register' | 'login' | 'pairing' | 'avatar' | 'main';

interface AuthContextType {
  step: AuthStep;
  setStep: (step: AuthStep) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  userInfo: UserInfo;
  accessToken: string;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateAvatar: (avatar: string) => Promise<void>;
  completePairing: (partnerName: string, partnerId: string, pairId: string) => void;
  setPairingCode: (code: string) => void;
  refreshProfile: () => Promise<void>;
  unpair: () => Promise<void>;
}

const EMPTY_USER: UserInfo = {
  id: '', name: '', email: '', avatar: '',
  partnerId: '', partnerName: '', pairId: '', pairingCode: '',
};

const noop = () => {};
const asyncNoop = async () => {};

const defaultContext: AuthContextType = {
  step: 'register',
  setStep: noop,
  isLoggedIn: false,
  isLoading: true,
  userInfo: EMPTY_USER,
  accessToken: '',
  register: asyncNoop,
  login: asyncNoop,
  logout: asyncNoop,
  updateAvatar: asyncNoop,
  completePairing: noop,
  setPairingCode: noop,
  refreshProfile: asyncNoop,
  unpair: asyncNoop,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AuthStep>('register');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(EMPTY_USER);
  const [accessToken, setAccessToken] = useState('');

  // Check existing session on mount
  useEffect(() => {
    let isMounted = true;
    
    // Fast path: try to load from local storage first to show UI immediately
    try {
      const localSession = localStorage.getItem('supabase.auth.token');
      if (localSession) {
        const parsed = JSON.parse(localSession);
        if (parsed?.currentSession?.access_token) {
          const profileStr = localStorage.getItem('unitespark_anon_profile');
          if (profileStr) {
            const profile = JSON.parse(profileStr);
            if (profile.pairId && profile.avatar) {
              setStep('main');
              setIsLoading(false);
            }
          }
        }
      }
    } catch (e) {
      // Ignore local storage errors
    }

    (async () => {
      try {
        const session = await api.getSession();
        if (!isMounted) return;
        
        if (session?.access_token) {
          setAccessToken(session.access_token);
          setIsLoggedIn(true);

          // Load profile from server
          const profile = await api.getMyProfile();
          if (!isMounted) return;
          
          const info: UserInfo = {
            id: profile.id || session.user.id,
            name: profile.name || session.user.user_metadata?.name || '',
            email: profile.email || session.user.email || '',
            avatar: profile.avatar || '',
            partnerId: profile.partnerId || '',
            partnerName: profile.partnerName || '',
            pairId: profile.pairId || '',
            pairingCode: '',
          };
          setUserInfo(info);

          // Determine step
          if (info.pairId && info.avatar) {
            setStep('main');
          } else if (info.pairId) {
            setStep('avatar');
          } else {
            setStep('pairing');
          }
        }
      } catch (err) {
        console.log('Session restore error:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    // Listen for auth state changes
    const sb = api.getSupabase();
    const { data: { subscription } } = sb.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setAccessToken(session.access_token);
        setIsLoggedIn(true);
        
        try {
          const profile = await api.getMyProfile();
          const info: UserInfo = {
            id: profile.id || session.user.id,
            name: profile.name || session.user.user_metadata?.name || '',
            email: profile.email || session.user.email || '',
            avatar: profile.avatar || '',
            partnerId: profile.partnerId || '',
            partnerName: profile.partnerName || '',
            pairId: profile.pairId || '',
            pairingCode: '',
          };
          setUserInfo(info);
          
          if (info.pairId && info.avatar) {
            setStep('main');
          } else if (info.pairId) {
            setStep('avatar');
          } else {
            setStep('pairing');
          }
        } catch {
          // If profile fetch fails, default to pairing
          setStep(prev => (prev === 'register' || prev === 'login') ? 'pairing' : prev);
        }
      } else {
        setAccessToken('');
        setIsLoggedIn(false);
        setStep('register');
        setUserInfo(EMPTY_USER);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await api.signup(name, email, password);
    
    if (result.confirmationRequired) {
      // Don't log in yet, but tell the caller registration was technically successful
      throw new Error('CONFIRMATION_REQUIRED');
    }

    if (result.session) {
      setAccessToken(result.session.access_token);
      setIsLoggedIn(true);
      setUserInfo(prev => ({
        ...prev,
        id: result.userId,
        name,
        email,
      }));
      setStep('pairing');
    }
  }, []);

  const loginFn = useCallback(async (email: string, password: string) => {
    const result = await api.login(email, password);
    setAccessToken(result.session!.access_token);
    setIsLoggedIn(true);

    // Load profile
    try {
      const profile = await api.getMyProfile();
      const info: UserInfo = {
        id: profile.id || result.user.id,
        name: profile.name || result.user.user_metadata?.name || email.split('@')[0],
        email: profile.email || email,
        avatar: profile.avatar || '',
        partnerId: profile.partnerId || '',
        partnerName: profile.partnerName || '',
        pairId: profile.pairId || '',
        pairingCode: '',
      };
      setUserInfo(info);
      if (info.pairId && info.avatar) setStep('main');
      else if (info.pairId) setStep('avatar');
      else setStep('pairing');
    } catch {
      setUserInfo(prev => ({
        ...prev,
        id: result.user.id,
        name: result.user.user_metadata?.name || email.split('@')[0],
        email,
      }));
      setStep('pairing');
    }
  }, []);

  const logout = useCallback(async () => {
    await api.signOut();
    setIsLoggedIn(false);
    setStep('register');
    setUserInfo(EMPTY_USER);
    setAccessToken('');
  }, []);

  const updateAvatar = useCallback(async (avatar: string) => {
    setUserInfo(prev => ({ ...prev, avatar }));
    try {
      await api.updateMyProfile({ avatar });
    } catch (err) {
      console.log('Update avatar error:', err);
    }
  }, []);

  const completePairing = useCallback((partnerName: string, partnerId: string, pairId: string) => {
    setUserInfo(prev => {
      const newUser = { ...prev, partnerName, partnerId, pairId };
      // Persist to local storage
      try {
        const profile = api.lsGet(api.getUserKey('profile'), {});
        api.lsSet(api.getUserKey('profile'), { ...profile, partnerName, partnerId, pairId });
      } catch (err) {
        console.log('completePairing localStorage error:', err);
      }
      return newUser;
    });

    // Also sync to DB
    api.updateMyProfile({ 
      pair_id: pairId,
      partner_id: partnerId,
      partner_name: partnerName
    }).catch(err => console.error('Sync pairing to DB error:', err));

    setStep('avatar');
  }, []);

  const setPairingCode = useCallback((code: string) => {
    setUserInfo(prev => {
      const newUser = { ...prev, pairingCode: code };
      // Persist to local storage
      try {
        const profile = api.lsGet(api.getUserKey('profile'), {});
        api.lsSet(api.getUserKey('profile'), { ...profile, pairingCode: code });
      } catch (err) {
        console.log('setPairingCode localStorage error:', err);
      }
      return newUser;
    });
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await api.getMyProfile();
      setUserInfo(prev => ({
        ...prev,
        ...profile,
        pairingCode: prev.pairingCode,
      }));
    } catch (err) {
      console.log('Refresh profile error:', err);
    }
  }, []);

  const unpair = async () => {
    try {
      await api.unpairUsers();
      // Update local context
      const updated = { ...userInfo, pairId: '', partnerId: '', partnerName: '' };
      setUserInfo(updated);
      
      // Update local storage explicitly
      const localProfile = JSON.parse(localStorage.getItem('unitespark_anon_profile') || '{}');
      localProfile.pairId = '';
      localProfile.partnerId = '';
      localProfile.partnerName = '';
      localStorage.setItem('unitespark_anon_profile', JSON.stringify(localProfile));
      
      // Also clear any cached pairings
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('unitespark_pair_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (err) {
      console.error('Error during unpairing:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      step, setStep, isLoggedIn, isLoading, userInfo, accessToken,
      register, login: loginFn, logout, updateAvatar,
      completePairing, setPairingCode, refreshProfile, unpair,
    }}>
      {children}
    </AuthContext.Provider>
  );
}