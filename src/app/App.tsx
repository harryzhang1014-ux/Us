import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ThemeProvider } from './components/ThemeContext';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { PairingPage } from './components/PairingPage';
import { AvatarSelection } from './components/AvatarSelection';
import { Heart, Loader2 } from 'lucide-react';
import { DawnWelcome, useDawnWelcome } from './components/DawnWelcome';

function AuthGate() {
  const { step, isLoading } = useAuth();
  const { show: showDawn, dismiss: dismissDawn } = useDawnWelcome();

  if (showDawn) {
    return <DawnWelcome onComplete={dismissDawn} />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f2f2f7] dark:bg-[#000000] items-center justify-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[22px] flex items-center justify-center shadow-[0_8px_32px_rgba(244,63,94,0.35)]">
          <Heart className="w-10 h-10 text-white" fill="white" />
        </div>
        <Loader2 className="w-6 h-6 text-rose-400 animate-spin" />
        <p className="text-[13px] text-[#8e8e93]">Loading your love nest...</p>
      </div>
    );
  }

  if (step === 'register') return <RegisterPage />;
  if (step === 'login') return <LoginPage />;
  if (step === 'pairing') return <PairingPage />;
  if (step === 'avatar') return <AvatarSelection />;
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </ThemeProvider>
  );
}