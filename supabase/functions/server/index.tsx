import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

const adminClient = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

// Global error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: `Internal server error: ${err.message}` }, 500);
});

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey", "x-client-info"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Helper: get authenticated user
async function getAuthUser(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return null;
  const supabase = adminClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user?.id) return null;
  return data.user;
}

async function getPairContext(userId: string) {
  const supabase = adminClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("pair_id, partner_id, partner_name")
    .eq("id", userId)
    .maybeSingle();

  if (profile?.pair_id) {
    return {
      pairId: profile.pair_id as string,
      partnerId: (profile.partner_id || "") as string,
      partnerName: (profile.partner_name || "") as string,
    };
  }

  const { data: creatorPair } = await supabase
    .from("pairings")
    .select("*")
    .eq("creator_id", userId)
    .eq("status", "completed")
    .maybeSingle();
  const { data: partnerPair } = await supabase
    .from("pairings")
    .select("*")
    .eq("partner_id", userId)
    .eq("status", "completed")
    .maybeSingle();

  const match = creatorPair || partnerPair;
  if (!match) return null;

  const isCreator = match.creator_id === userId;
  return {
    pairId: match.pair_id as string,
    partnerId: (isCreator ? match.partner_id : match.creator_id) as string,
    partnerName: (isCreator ? match.partner_name : match.creator_name) as string,
  };
}

function getScopeKey(prefix: string, pairId: string | null, userId: string) {
  return pairId ? `${prefix}:${pairId}` : `${prefix}:solo:${userId}`;
}

async function getUserByEmail(email: string) {
  const supabase = adminClient();
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;

    const match = data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
    if (match) return match;
    if (data.users.length < 200) return null;
    page += 1;
  }
}

async function clearPairScopedData(pairId: string) {
  const keys = [
    `album:${pairId}`,
    `days:${pairId}`,
    `pair_meta:${pairId}`,
  ];

  for (const key of keys) {
    await kv.del(key).catch(() => {});
  }

  const sharedNotes = await kv.getEntriesByPrefix(`note:shared:${pairId}:`).catch(() => []);
  for (const entry of sharedNotes) {
    await kv.del(entry.key).catch(() => {});
  }

  const sparkEntries = await kv.getEntriesByPrefix(`spark:${pairId}:`).catch(() => []);
  for (const entry of sparkEntries) {
    await kv.del(entry.key).catch(() => {});
  }
}

// Health check
app.get("/make-server-99bff791/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ============

// Sign up
app.post("/make-server-99bff791/auth/signup", async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    if (!name || !email || !password) {
      return c.json({ error: "Missing required fields: name, email, password" }, 400);
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });
    if (error) {
      console.log("Signup error:", error.message);
      return c.json({ error: `Signup failed: ${error.message}` }, 400);
    }
    // Store user profile in KV
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      name,
      email,
      avatar: "",
      pairId: "",
      partnerId: "",
      createdAt: Date.now(),
    });
    return c.json({ userId: data.user.id, name, email });
  } catch (err) {
    console.log("Signup exception:", err);
    return c.json({ error: `Signup exception: ${err}` }, 500);
  }
});

// ============ PAIRING ============

// Create a pairing code
app.post("/make-server-99bff791/pair/create", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized: invalid token for pair/create" }, 401);

  try {
    // Generate 6-char code
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];

    // Store the pairing record
    await kv.set(`pair_code:${code}`, {
      code,
      creatorId: user.id,
      creatorName: user.user_metadata?.name || "",
      partnerId: "",
      partnerName: "",
      createdAt: Date.now(),
      paired: false,
    });
    // Store reverse lookup
    await kv.set(`user_pair_code:${user.id}`, code);

    return c.json({ code });
  } catch (err) {
    console.log("Pair create error:", err);
    return c.json({ error: `Pair create failed: ${err}` }, 500);
  }
});

// Join a pairing code
app.post("/make-server-99bff791/pair/join", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized: invalid token for pair/join" }, 401);

  try {
    const { code, partnerName } = await c.req.json();
    if (!code) return c.json({ error: "Missing pairing code" }, 400);

    const pairData = await kv.get(`pair_code:${code}`);
    if (!pairData) return c.json({ error: "Invalid pairing code. No match found." }, 404);
    if (pairData.paired) return c.json({ error: "This code has already been used" }, 400);
    if (pairData.creatorId === user.id) return c.json({ error: "Cannot pair with yourself" }, 400);

    // Create pair ID
    const pairId = `pair_${code}_${Date.now()}`;

    // Update pairing record
    pairData.partnerId = user.id;
    pairData.partnerName = user.user_metadata?.name || partnerName || "";
    pairData.paired = true;
    pairData.pairId = pairId;
    await kv.set(`pair_code:${code}`, pairData);

    // Update both user profiles
    const creatorProfile = await kv.get(`user:${pairData.creatorId}`);
    const joinerProfile = await kv.get(`user:${user.id}`);

    if (creatorProfile) {
      creatorProfile.pairId = pairId;
      creatorProfile.partnerId = user.id;
      creatorProfile.partnerName = user.user_metadata?.name || partnerName || "";
      await kv.set(`user:${pairData.creatorId}`, creatorProfile);
    }

    if (joinerProfile) {
      joinerProfile.pairId = pairId;
      joinerProfile.partnerId = pairData.creatorId;
      joinerProfile.partnerName = pairData.creatorName;
      await kv.set(`user:${user.id}`, joinerProfile);
    } else {
      await kv.set(`user:${user.id}`, {
        id: user.id,
        name: user.user_metadata?.name || "",
        email: user.email,
        avatar: "",
        pairId,
        partnerId: pairData.creatorId,
        partnerName: pairData.creatorName,
        createdAt: Date.now(),
      });
    }

    // Store reverse lookups
    await kv.set(`user_pair:${pairData.creatorId}`, pairId);
    await kv.set(`user_pair:${user.id}`, pairId);

    // Store pairing date for spark streak
    await kv.set(`pair_meta:${pairId}`, { createdAt: Date.now(), code });

    return c.json({
      pairId,
      partnerId: pairData.creatorId,
      partnerName: pairData.creatorName,
    });
  } catch (err) {
    console.log("Pair join error:", err);
    return c.json({ error: `Pair join failed: ${err}` }, 500);
  }
});

// Check pairing status (for the creator polling)
app.get("/make-server-99bff791/pair/status/:code", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const code = c.req.param("code");
    const pairData = await kv.get(`pair_code:${code}`);
    if (!pairData) return c.json({ error: "Code not found" }, 404);

    if (pairData.paired) {
      return c.json({
        paired: true,
        pairId: pairData.pairId,
        partnerId: pairData.partnerId,
        partnerName: pairData.partnerName,
      });
    }
    return c.json({ paired: false });
  } catch (err) {
    console.log("Pair status error:", err);
    return c.json({ error: `Pair status failed: ${err}` }, 500);
  }
});

// ============ USER PROFILE ============

// Get my profile
app.get("/make-server-99bff791/user/me", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const profile = await kv.get(`user:${user.id}`);
    if (!profile) {
      return c.json({
        id: user.id,
        name: user.user_metadata?.name || "",
        email: user.email,
        avatar: "",
        pairId: "",
        partnerId: "",
        partnerName: "",
      });
    }
    return c.json(profile);
  } catch (err) {
    console.log("Get profile error:", err);
    return c.json({ error: `Get profile failed: ${err}` }, 500);
  }
});

// Update profile (avatar, name)
app.put("/make-server-99bff791/user/me", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const updates = await c.req.json();
    const profile = (await kv.get(`user:${user.id}`)) || {
      id: user.id,
      name: user.user_metadata?.name || "",
      email: user.email,
    };
    if (updates.avatar !== undefined) profile.avatar = updates.avatar;
    if (updates.name !== undefined) profile.name = updates.name;
    await kv.set(`user:${user.id}`, profile);
    return c.json(profile);
  } catch (err) {
    console.log("Update profile error:", err);
    return c.json({ error: `Update profile failed: ${err}` }, 500);
  }
});

// Get partner profile
app.get("/make-server-99bff791/user/partner", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const pairContext = await getPairContext(user.id);
    if (!pairContext?.partnerId) return c.json({ error: "No partner linked" }, 404);
    const supabase = adminClient();
    const { data: partner } = await supabase
      .from("profiles")
      .select("id, name, avatar")
      .eq("id", pairContext.partnerId)
      .maybeSingle();
    return c.json({
      id: pairContext.partnerId,
      name: partner?.name || pairContext.partnerName || "Partner",
      avatar: partner?.avatar || "",
    });
  } catch (err) {
    console.log("Get partner error:", err);
    return c.json({ error: `Get partner failed: ${err}` }, 500);
  }
});

// ============ STATUS ============

// Set my status
app.put("/make-server-99bff791/status", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const status = await c.req.json();
    await kv.set(`status:${user.id}`, { ...status, updatedAt: Date.now() });
    return c.json({ ok: true });
  } catch (err) {
    console.log("Set status error:", err);
    return c.json({ error: `Set status failed: ${err}` }, 500);
  }
});

// Get partner's status
app.get("/make-server-99bff791/status/partner", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const pairContext = await getPairContext(user.id);
    if (!pairContext?.partnerId) return c.json({ label: "Not set", dotColor: "bg-gray-400", bg: "bg-gray-50", updatedAt: 0 });
    const status = await kv.get(`status:${pairContext.partnerId}`);
    return c.json(status || { label: "Not set", dotColor: "bg-gray-400", bg: "bg-gray-50", updatedAt: 0 });
  } catch (err) {
    console.log("Get partner status error:", err);
    return c.json({ error: `Get partner status failed: ${err}` }, 500);
  }
});

// ============ SPARK ============

// Set my spark for today
app.put("/make-server-99bff791/spark", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { date, completed } = await c.req.json();
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId || `solo:${user.id}`;
    await kv.set(`spark:${pairId}:${date}:${user.id}`, { completed, updatedAt: Date.now() });
    return c.json({ ok: true });
  } catch (err) {
    console.log("Set spark error:", err);
    return c.json({ error: `Set spark failed: ${err}` }, 500);
  }
});

// Get spark status for today (both me and partner)
app.get("/make-server-99bff791/spark/:date", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const date = c.req.param("date");
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId || `solo:${user.id}`;

    const mySpark = await kv.get(`spark:${pairId}:${date}:${user.id}`);
    let partnerSpark = null;
    if (pairContext?.partnerId) {
      partnerSpark = await kv.get(`spark:${pairId}:${date}:${pairContext.partnerId}`);
    }

    let streak = 0;
    if (pairContext?.partnerId) {
      const sparkEntries = await kv.getEntriesByPrefix(`spark:${pairId}:`);
      const perDay = new Map<string, Set<string>>();

      for (const entry of sparkEntries) {
        const key = entry?.key as string | undefined;
        if (!key || !entry?.value?.completed) continue;
        const parts = key.split(":");
        const entryDate = parts[2];
        const entryUserId = parts[3];
        if (!entryDate || !entryUserId) continue;
        const users = perDay.get(entryDate) || new Set<string>();
        users.add(entryUserId);
        perDay.set(entryDate, users);
      }

      streak = Array.from(perDay.values()).filter((users) =>
        users.has(user.id) && users.has(pairContext.partnerId as string)
      ).length;
    }

    return c.json({
      myCompleted: mySpark?.completed || false,
      partnerCompleted: partnerSpark?.completed || false,
      myUpdatedAt: mySpark?.updatedAt || 0,
      partnerUpdatedAt: partnerSpark?.updatedAt || 0,
      streak,
    });
  } catch (err) {
    console.log("Get spark error:", err);
    return c.json({ error: `Get spark failed: ${err}` }, 500);
  }
});

// ============ SHARED NOTES ============

// Add shared note
app.post("/make-server-99bff791/notes/shared", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { content } = await c.req.json();
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId;
    if (!pairId) return c.json({ error: "Not paired yet" }, 400);

    const noteId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const note = {
      id: noteId,
      content,
      date: new Date().toISOString(),
      authorId: user.id,
      authorName: user.user_metadata?.name || user.email || "Unknown",
    };
    await kv.set(`note:shared:${pairId}:${noteId}`, note);
    return c.json(note);
  } catch (err) {
    console.log("Add shared note error:", err);
    return c.json({ error: `Add shared note failed: ${err}` }, 500);
  }
});

// Get all shared notes
app.get("/make-server-99bff791/notes/shared", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId;
    if (!pairId) return c.json([]);

    const notes = await kv.getByPrefix(`note:shared:${pairId}:`);
    // Sort by date descending
    notes.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return c.json(notes);
  } catch (err) {
    console.log("Get shared notes error:", err);
    return c.json({ error: `Get shared notes failed: ${err}` }, 500);
  }
});

// Delete shared note
app.delete("/make-server-99bff791/notes/shared/:noteId", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const noteId = c.req.param("noteId");
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId;
    if (!pairId) return c.json({ error: "Not paired" }, 400);

    const noteKey = `note:shared:${pairId}:${noteId}`;
    const note = await kv.get(noteKey);
    if (!note) return c.json({ error: "Note not found" }, 404);
    if (note.authorId && note.authorId !== user.id) {
      return c.json({ error: "Forbidden: only the author can delete this note" }, 403);
    }
    await kv.del(noteKey);
    return c.json({ ok: true });
  } catch (err) {
    console.log("Delete shared note error:", err);
    return c.json({ error: `Delete shared note failed: ${err}` }, 500);
  }
});

app.get("/make-server-99bff791/album", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const pairContext = await getPairContext(user.id);
    const key = getScopeKey("album", pairContext?.pairId || null, user.id);
    const photos = (await kv.get(key)) || [];
    return c.json(photos);
  } catch (err) {
    console.log("Get album error:", err);
    return c.json({ error: `Get album failed: ${err}` }, 500);
  }
});

app.put("/make-server-99bff791/album", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { photos } = await c.req.json();
    const pairContext = await getPairContext(user.id);
    const key = getScopeKey("album", pairContext?.pairId || null, user.id);
    await kv.set(key, Array.isArray(photos) ? photos : []);
    return c.json({ ok: true });
  } catch (err) {
    console.log("Save album error:", err);
    return c.json({ error: `Save album failed: ${err}` }, 500);
  }
});

app.get("/make-server-99bff791/days", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const pairContext = await getPairContext(user.id);
    const key = getScopeKey("days", pairContext?.pairId || null, user.id);
    const events = (await kv.get(key)) || [];
    return c.json(events);
  } catch (err) {
    console.log("Get days error:", err);
    return c.json({ error: `Get days failed: ${err}` }, 500);
  }
});

app.put("/make-server-99bff791/days", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { events } = await c.req.json();
    const pairContext = await getPairContext(user.id);
    const key = getScopeKey("days", pairContext?.pairId || null, user.id);
    await kv.set(key, Array.isArray(events) ? events : []);
    return c.json({ ok: true });
  } catch (err) {
    console.log("Save days error:", err);
    return c.json({ error: `Save days failed: ${err}` }, 500);
  }
});

app.post("/make-server-99bff791/reset/pairing", async (c) => {
  const user = await getAuthUser(c.req.raw);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const supabase = adminClient();
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId || null;
    const partnerId = pairContext?.partnerId || null;

    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        pair_id: null,
        partner_id: null,
        partner_name: null,
      });

    if (partnerId) {
      await supabase
        .from("profiles")
        .upsert({
          id: partnerId,
          pair_id: null,
          partner_id: null,
          partner_name: null,
        });
      await kv.del(`status:${partnerId}`).catch(() => {});
    }

    await supabase.from("pairings").delete().or(`creator_id.eq.${user.id},partner_id.eq.${user.id}`);

    await kv.del(`status:${user.id}`).catch(() => {});

    if (pairId) {
      await clearPairScopedData(pairId);
    }

    return c.json({ ok: true, pairId, partnerId });
  } catch (err) {
    console.log("Reset pairing error:", err);
    return c.json({ error: `Reset pairing failed: ${err}` }, 500);
  }
});

app.post("/make-server-99bff791/admin/reset-pairing", async (c) => {
  const adminResetKey = Deno.env.get("RESET_ADMIN_KEY");
  const providedKey = c.req.header("x-reset-admin-key");
  if (!adminResetKey || providedKey !== adminResetKey) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const { email } = await c.req.json();
    if (!email) return c.json({ error: "Missing email" }, 400);

    const user = await getUserByEmail(email);
    if (!user?.id) return c.json({ error: "User not found" }, 404);

    const supabase = adminClient();
    const pairContext = await getPairContext(user.id);
    const pairId = pairContext?.pairId || null;
    const partnerId = pairContext?.partnerId || null;

    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        pair_id: null,
        partner_id: null,
        partner_name: null,
      });

    if (partnerId) {
      await supabase
        .from("profiles")
        .upsert({
          id: partnerId,
          pair_id: null,
          partner_id: null,
          partner_name: null,
        });
      await kv.del(`status:${partnerId}`).catch(() => {});
    }

    await supabase.from("pairings").delete().or(`creator_id.eq.${user.id},partner_id.eq.${user.id}`);
    await kv.del(`status:${user.id}`).catch(() => {});

    if (pairId) {
      await clearPairScopedData(pairId);
    }

    return c.json({ ok: true, userId: user.id, pairId, partnerId });
  } catch (err) {
    console.log("Admin reset pairing error:", err);
    return c.json({ error: `Admin reset pairing failed: ${err}` }, 500);
  }
});

app.post("/make-server-99bff791/admin/profile-status", async (c) => {
  const adminResetKey = Deno.env.get("RESET_ADMIN_KEY");
  const providedKey = c.req.header("x-reset-admin-key");
  if (!adminResetKey || providedKey !== adminResetKey) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const { emails } = await c.req.json();
    if (!Array.isArray(emails) || emails.length === 0) {
      return c.json({ error: "Missing emails" }, 400);
    }

    const supabase = adminClient();
    const results = [];

    for (const email of emails) {
      const user = await getUserByEmail(email);
      if (!user?.id) {
        results.push({ email, error: "User not found" });
        continue;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, name, email, avatar, pair_id, partner_id, partner_name")
        .eq("id", user.id)
        .maybeSingle();

      results.push({ email, userId: user.id, profile });
    }

    return c.json({ ok: true, results });
  } catch (err) {
    console.log("Admin profile status error:", err);
    return c.json({ error: `Admin profile status failed: ${err}` }, 500);
  }
});

app.post("/make-server-99bff791/admin/clear-avatars", async (c) => {
  const adminResetKey = Deno.env.get("RESET_ADMIN_KEY");
  const providedKey = c.req.header("x-reset-admin-key");
  if (!adminResetKey || providedKey !== adminResetKey) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const { emails } = await c.req.json();
    if (!Array.isArray(emails) || emails.length === 0) {
      return c.json({ error: "Missing emails" }, 400);
    }

    const supabase = adminClient();
    const results = [];

    for (const email of emails) {
      const user = await getUserByEmail(email);
      if (!user?.id) {
        results.push({ email, error: "User not found" });
        continue;
      }

      await supabase
        .from("profiles")
        .upsert({ id: user.id, avatar: null });

      results.push({ email, userId: user.id, cleared: true });
    }

    return c.json({ ok: true, results });
  } catch (err) {
    console.log("Admin clear avatars error:", err);
    return c.json({ error: `Admin clear avatars failed: ${err}` }, 500);
  }
});

app.post("/make-server-99bff791/admin/ensure-profiles", async (c) => {
  const adminResetKey = Deno.env.get("RESET_ADMIN_KEY");
  const providedKey = c.req.header("x-reset-admin-key");
  if (!adminResetKey || providedKey !== adminResetKey) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const { emails } = await c.req.json();
    if (!Array.isArray(emails) || emails.length === 0) {
      return c.json({ error: "Missing emails" }, 400);
    }

    const supabase = adminClient();
    const results = [];

    for (const email of emails) {
      const user = await getUserByEmail(email);
      if (!user?.id) {
        results.push({ email, error: "User not found" });
        continue;
      }

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!existing?.id) {
        await supabase
          .from("profiles")
          .upsert({
            id: user.id,
            name: user.user_metadata?.name || "",
            email: user.email,
            avatar: null,
            pair_id: null,
            partner_id: null,
            partner_name: null,
          });
      }

      results.push({ email, userId: user.id, ensured: true });
    }

    return c.json({ ok: true, results });
  } catch (err) {
    console.log("Admin ensure profiles error:", err);
    return c.json({ error: `Admin ensure profiles failed: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
