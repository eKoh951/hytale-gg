-- =============================================================
-- Seed data for hytale.GG staging branch
-- Run against the staging branch project_ref via MCP execute_sql
-- =============================================================
-- UUID convention:
--   a1000000-...-01 thru 10 = users/profiles
--   b1000000-...-01 thru 18 = servers
--   c1000000-...-01 thru 28 = reviews
--   d1000000-...-01 thru 04 = review comments
-- =============================================================
-- PREREQUISITE: Run the add_user_profile_foreign_keys migration first.
-- PostgREST needs FK from reviews.user_id -> profiles.id (and similar)
-- to resolve joins like `profiles:user_id (display_name, ...)`.
-- =============================================================

-- Temporarily disable RLS for bulk inserts
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE servers DISABLE ROW LEVEL SECURITY;
ALTER TABLE server_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE review_ratings DISABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes DISABLE ROW LEVEL SECURITY;
ALTER TABLE review_reactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE review_comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE owner_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE server_metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE featured_servers DISABLE ROW LEVEL SECURITY;
ALTER TABLE server_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE tags DISABLE ROW LEVEL SECURITY;

-- =====================
-- 0. AUTH USERS (profiles FK requires auth.users)
-- =====================
-- The handle_new_user trigger auto-creates profiles + user_stats.
-- After insert, we UPDATE profiles with proper display names.
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, instance_id, aud, role) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'dragonslayer99@fake.dev', '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2025-12-01T10:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000002', 'craftqueen@fake.dev',     '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2025-11-15T08:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000003', 'pvpmaster@fake.dev',      '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2025-10-20T12:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000004', 'pixelnomad@fake.dev',     '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2026-01-05T09:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000005', 'lunabuilder@fake.dev',    '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2025-09-10T14:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000006', 'stormrider@fake.dev',     '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2026-01-20T16:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000007', 'echofrost@fake.dev',      '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2025-08-01T11:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000008', 'neonvortex@fake.dev',     '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2026-02-01T07:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000009', 'terrawolf@fake.dev',      '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2025-07-15T13:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('a1000000-0000-0000-0000-000000000010', 'aquaspark@fake.dev',      '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash00', NOW(), '2026-01-10T10:00:00Z', NOW(), '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

-- =====================
-- 1. FIX PROFILES (trigger sets email as display_name; override with real names)
-- =====================
UPDATE profiles SET display_name = 'DragonSlayer99', bio = 'Hytale enthusiast since day one.' WHERE id = 'a1000000-0000-0000-0000-000000000001';
UPDATE profiles SET display_name = 'CraftQueen', bio = 'Building worlds one block at a time.' WHERE id = 'a1000000-0000-0000-0000-000000000002';
UPDATE profiles SET display_name = 'PvPMaster_X', bio = 'Top-ranked PvP player.' WHERE id = 'a1000000-0000-0000-0000-000000000003';
UPDATE profiles SET display_name = 'PixelNomad', bio = 'Explorer of digital realms.' WHERE id = 'a1000000-0000-0000-0000-000000000004';
UPDATE profiles SET display_name = 'LunaBuilder', bio = 'Architect and designer.' WHERE id = 'a1000000-0000-0000-0000-000000000005';
UPDATE profiles SET display_name = 'StormRider', bio = 'Adventure seeker.' WHERE id = 'a1000000-0000-0000-0000-000000000006';
UPDATE profiles SET display_name = 'EchoFrost', bio = 'Survival specialist.' WHERE id = 'a1000000-0000-0000-0000-000000000007';
UPDATE profiles SET display_name = 'NeonVortex', bio = 'Modding enthusiast.' WHERE id = 'a1000000-0000-0000-0000-000000000008';
UPDATE profiles SET display_name = 'TerraWolf', bio = 'Community leader.' WHERE id = 'a1000000-0000-0000-0000-000000000009';
UPDATE profiles SET display_name = 'AquaSpark', bio = 'Casual player, serious reviewer.' WHERE id = 'a1000000-0000-0000-0000-000000000010';

-- =====================
-- 2. SERVERS (18 servers)
-- =====================
INSERT INTO servers (
  id, name, slug, description, ip_address, port, category, region, language,
  current_status, verification_status, rating_avg, review_count, quality_score,
  listed_by, owner_id, cover_url, icon_url, discord_url, website_url, hosting_provider, created_at
) VALUES
  -- Verified, high-quality servers (featured candidates)
  ('b1000000-0000-0000-0000-000000000001',
   'Emerald Peaks Survival', 'emerald-peaks-survival',
   'A sprawling survival experience with custom biomes, dynamic weather, and a thriving player economy. Join thousands exploring the Emerald Peaks mountain range.',
   '192.168.1.10', 24454, 'survival', 'na', 'English',
   'online', 'verified', 4.6, 28, 88.5,
   'a1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   NULL, NULL,
   'https://discord.gg/emeraldpeaks', 'https://emeraldpeaks.example.com', 'Apex Hosting',
   '2026-01-15T08:00:00Z'),

  ('b1000000-0000-0000-0000-000000000002',
   'Orbis Creative Hub', 'orbis-creative-hub',
   'The ultimate creative playground. Unlimited plots, WorldEdit support, custom brushes, and weekly build competitions with prizes. Let your imagination soar!',
   '192.168.1.20', 24454, 'creative', 'eu', 'English',
   'online', 'verified', 4.8, 42, 95.2,
   'a1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002',
   NULL, NULL,
   'https://discord.gg/orbiscreative', 'https://orbis.example.com', 'Bisect Hosting',
   '2026-01-02T12:00:00Z'),

  ('b1000000-0000-0000-0000-000000000003',
   'Valor Arena PvP', 'valor-arena-pvp',
   'Competitive PvP at its finest. Ranked matches, tournaments every weekend, custom kits, and an ELO-based matchmaking system. Prove your worth in the arena!',
   '192.168.1.30', 24454, 'pvp', 'na', 'English',
   'online', 'verified', 4.3, 35, 82.1,
   'a1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003',
   NULL, NULL,
   'https://discord.gg/valorarena', NULL, 'Shockbyte',
   '2025-12-20T10:00:00Z'),

  ('b1000000-0000-0000-0000-000000000004',
   'Mythic Realms RP', 'mythic-realms-rp',
   'An immersive medieval roleplay server with custom lore, character creation, faction politics, and epic storylines. Write your own legend in the Mythic Realms.',
   '192.168.1.40', 24454, 'roleplay', 'eu', 'English',
   'online', 'verified', 4.5, 22, 85.0,
   'a1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004',
   NULL, NULL,
   'https://discord.gg/mythicrealms', 'https://mythicrealms.example.com', 'PebbleHost',
   '2026-01-08T14:00:00Z'),

  ('b1000000-0000-0000-0000-000000000005',
   'Arcade Galaxy', 'arcade-galaxy',
   'Non-stop minigame fun! Over 30 unique games including parkour, spleef, build battle, and our original Galaxy Rush mode. Perfect for quick sessions with friends.',
   '192.168.1.50', 24454, 'minigames', 'na', 'English',
   'online', 'verified', 4.7, 50, 92.3,
   'a1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005',
   NULL, NULL,
   'https://discord.gg/arcadegalaxy', 'https://arcadegalaxy.example.com', 'Apex Hosting',
   '2025-11-10T09:00:00Z'),

  -- Unverified but active servers
  ('b1000000-0000-0000-0000-000000000006',
   'Nether Craft Modded', 'nether-craft-modded',
   'A heavily modded experience featuring over 200 custom mods, new dimensions, bosses, and crafting systems. For players who want more depth from their Hytale adventure.',
   '10.0.0.60', 24454, 'modded', 'eu', 'English',
   'online', NULL, 3.9, 12, 65.0,
   'a1000000-0000-0000-0000-000000000006', NULL,
   NULL, NULL,
   'https://discord.gg/nethercraft', NULL, NULL,
   '2026-01-25T16:00:00Z'),

  ('b1000000-0000-0000-0000-000000000007',
   'Kingdoms of Aether', 'kingdoms-of-aether',
   'A faction-based survival server where you build kingdoms, forge alliances, and wage war. Custom enchantments, siege mechanics, and territorial control systems.',
   '10.0.0.70', 24454, 'survival', 'asia', 'English',
   'online', NULL, 4.1, 8, 58.0,
   'a1000000-0000-0000-0000-000000000007', NULL,
   NULL, NULL,
   NULL, NULL, NULL,
   '2026-01-28T11:00:00Z'),

  ('b1000000-0000-0000-0000-000000000008',
   'Pixel Playground', 'pixel-playground',
   'A family-friendly creative server with guided building tutorials, community projects, and a welcoming atmosphere for builders of all skill levels.',
   '10.0.0.80', 24454, 'creative', 'latam', 'Spanish',
   'online', NULL, 4.0, 6, 52.0,
   'a1000000-0000-0000-0000-000000000008', NULL,
   NULL, NULL,
   NULL, 'https://pixelplayground.example.com', NULL,
   '2026-02-01T08:00:00Z'),

  ('b1000000-0000-0000-0000-000000000009',
   'Shadow Duel Arena', 'shadow-duel-arena',
   'Fast-paced 1v1 and 2v2 PvP duels with custom maps, leaderboards, and seasonal rankings. Test your combat skills against the best fighters in the community.',
   '10.0.0.90', 24454, 'pvp', 'oce', 'English',
   'online', NULL, 3.7, 15, 55.0,
   'a1000000-0000-0000-0000-000000000009', NULL,
   NULL, NULL,
   'https://discord.gg/shadowduel', NULL, NULL,
   '2026-01-18T13:00:00Z'),

  ('b1000000-0000-0000-0000-000000000010',
   'Fiesta Roleplay', 'fiesta-roleplay',
   'Servidor de roleplay en español con historia original, sistema de clases, misiones dinámicas y una comunidad activa y amigable. Tu aventura comienza aquí.',
   '10.0.0.100', 24454, 'roleplay', 'latam', 'Spanish',
   'online', NULL, 4.2, 10, 60.0,
   'a1000000-0000-0000-0000-000000000010', NULL,
   NULL, NULL,
   'https://discord.gg/fiestaRP', NULL, NULL,
   '2026-01-30T15:00:00Z'),

  -- New servers (created within last 7 days for "new" badge)
  ('b1000000-0000-0000-0000-000000000011',
   'Frost Haven Survival', 'frost-haven-survival',
   'A brand new winter-themed survival server with ice biomes, custom mobs, and a unique frostbite mechanic. Survive the cold and build your haven!',
   '172.16.0.11', 24454, 'survival', 'eu', 'English',
   'online', NULL, 0, 0, 10.0,
   'a1000000-0000-0000-0000-000000000001', NULL,
   NULL, NULL,
   NULL, NULL, NULL,
   NOW() - INTERVAL '2 days'),

  ('b1000000-0000-0000-0000-000000000012',
   'Blitz Minigames', 'blitz-minigames',
   'Lightning-fast minigames with a twist! Each round has random modifiers that keep every match fresh and unpredictable. New games added weekly.',
   '172.16.0.12', 24454, 'minigames', 'na', 'English',
   'online', NULL, 0, 0, 8.0,
   'a1000000-0000-0000-0000-000000000006', NULL,
   NULL, NULL,
   NULL, NULL, NULL,
   NOW() - INTERVAL '1 day'),

  ('b1000000-0000-0000-0000-000000000013',
   'Cyber Modpack', 'cyber-modpack',
   'A cyberpunk-themed modded server featuring tech mods, neon cities, hovercraft, and futuristic weapons. Step into the future of Hytale modding.',
   '172.16.0.13', 24454, 'modded', 'asia', 'English',
   'online', NULL, 0, 0, 5.0,
   'a1000000-0000-0000-0000-000000000008', NULL,
   NULL, NULL,
   NULL, NULL, NULL,
   NOW() - INTERVAL '3 days'),

  -- Offline servers
  ('b1000000-0000-0000-0000-000000000014',
   'Legacy Survival', 'legacy-survival',
   'A classic survival server that has been running since the early days. Currently undergoing maintenance and upgrades. Check back soon!',
   '10.0.0.140', 24454, 'survival', 'na', 'English',
   'offline', 'verified', 3.5, 18, 45.0,
   'a1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003',
   NULL, NULL,
   NULL, 'https://legacysurvival.example.com', NULL,
   '2025-10-01T10:00:00Z'),

  ('b1000000-0000-0000-0000-000000000015',
   'Abandoned Realms', 'abandoned-realms',
   'An experimental creative server that pushed the boundaries of what is possible. Currently offline while the team works on a major overhaul.',
   '10.0.0.150', 24454, 'creative', 'eu', 'English',
   'offline', NULL, 2.8, 4, 20.0,
   'a1000000-0000-0000-0000-000000000005', NULL,
   NULL, NULL,
   NULL, NULL, NULL,
   '2025-09-15T08:00:00Z'),

  -- Hidden gem candidates (good quality, low review count)
  ('b1000000-0000-0000-0000-000000000016',
   'Starlight Sanctuary', 'starlight-sanctuary',
   'A peaceful roleplay server focused on storytelling, collaborative world-building, and player-driven events. Small but passionate community of dedicated roleplayers.',
   '172.16.0.16', 24454, 'roleplay', 'na', 'English',
   'online', 'verified', 4.9, 3, 72.0,
   'a1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000009',
   NULL, NULL,
   'https://discord.gg/starlightsanctuary', NULL, NULL,
   '2026-01-22T12:00:00Z'),

  ('b1000000-0000-0000-0000-000000000017',
   'Ironclad PvP', 'ironclad-pvp',
   'Hardcore PvP with permadeath, full loot, and territory control. Not for the faint of heart. Only the strongest survive in the Ironclad arena.',
   '172.16.0.17', 24454, 'pvp', 'eu', 'English',
   'online', 'verified', 4.4, 4, 68.0,
   'a1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000007',
   NULL, NULL,
   NULL, NULL, 'Shockbyte',
   '2026-01-12T09:00:00Z'),

  ('b1000000-0000-0000-0000-000000000018',
   'Terra Nova Modded', 'terra-nova-modded',
   'A carefully curated modpack focused on exploration and adventure. New continents to discover, ancient ruins to explore, and legendary artifacts to find.',
   '172.16.0.18', 24454, 'modded', 'na', 'English',
   'online', 'verified', 4.6, 2, 70.0,
   'a1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004',
   NULL, NULL,
   'https://discord.gg/terranova', 'https://terranova.example.com', 'Bisect Hosting',
   '2026-01-19T14:00:00Z');

-- =====================
-- 3. SERVER TAGS (vibe tags applied by users)
-- =====================
-- First, get the tag IDs. Since they were seeded by migration 7, we reference by slug.
-- We need 3+ votes on some tags for them to display on cards.

-- Helper: insert server_tags referencing tag slugs
-- We'll use subqueries to resolve tag IDs

-- Emerald Peaks: "friendly", "chill", "active" (3+ votes each)
INSERT INTO server_tags (server_id, tag_id, user_id, created_at) VALUES
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '9 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '8 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000004', NOW() - INTERVAL '7 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'chill'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'chill'), 'a1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '9 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'chill'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '8 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000005', NOW() - INTERVAL '6 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000006', NOW() - INTERVAL '5 days'),
  ('b1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000007', NOW() - INTERVAL '4 days'),

  -- Orbis Creative: "creative-freedom", "friendly", "chill"
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'creative-freedom'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '12 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'creative-freedom'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '11 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'creative-freedom'), 'a1000000-0000-0000-0000-000000000005', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'creative-freedom'), 'a1000000-0000-0000-0000-000000000007', NOW() - INTERVAL '9 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '12 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000004', NOW() - INTERVAL '11 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000006', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'chill'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '11 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'chill'), 'a1000000-0000-0000-0000-000000000008', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000002', (SELECT id FROM tags WHERE slug = 'chill'), 'a1000000-0000-0000-0000-000000000009', NOW() - INTERVAL '9 days'),

  -- Valor Arena: "competitive", "sweaty", "active"
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'competitive'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '14 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'competitive'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '13 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'competitive'), 'a1000000-0000-0000-0000-000000000005', NOW() - INTERVAL '12 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'competitive'), 'a1000000-0000-0000-0000-000000000009', NOW() - INTERVAL '11 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'sweaty'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '13 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'sweaty'), 'a1000000-0000-0000-0000-000000000007', NOW() - INTERVAL '12 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'sweaty'), 'a1000000-0000-0000-0000-000000000009', NOW() - INTERVAL '11 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '9 days'),
  ('b1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000005', NOW() - INTERVAL '8 days'),

  -- Mythic Realms: "lore-rich", "friendly"
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'lore-rich'), 'a1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '8 days'),
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'lore-rich'), 'a1000000-0000-0000-0000-000000000004', NOW() - INTERVAL '7 days'),
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'lore-rich'), 'a1000000-0000-0000-0000-000000000006', NOW() - INTERVAL '6 days'),
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'lore-rich'), 'a1000000-0000-0000-0000-000000000010', NOW() - INTERVAL '5 days'),
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '7 days'),
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000006', NOW() - INTERVAL '6 days'),
  ('b1000000-0000-0000-0000-000000000004', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000008', NOW() - INTERVAL '5 days'),

  -- Arcade Galaxy: "fun", "active", "casual"
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'casual'), 'a1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '15 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'casual'), 'a1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '14 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'casual'), 'a1000000-0000-0000-0000-000000000004', NOW() - INTERVAL '13 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'casual'), 'a1000000-0000-0000-0000-000000000006', NOW() - INTERVAL '12 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '14 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000005', NOW() - INTERVAL '13 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'active'), 'a1000000-0000-0000-0000-000000000007', NOW() - INTERVAL '12 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000008', NOW() - INTERVAL '11 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000009', NOW() - INTERVAL '10 days'),
  ('b1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'friendly'), 'a1000000-0000-0000-0000-000000000010', NOW() - INTERVAL '9 days');

-- =====================
-- 4. REVIEWS (35 reviews across servers)
-- =====================
INSERT INTO reviews (
  id, entity_type, entity_id, user_id, review_type, rating_overall,
  review_text, is_recommended, play_duration_text, status, helpful_count, funny_count, created_at
) VALUES
  -- Emerald Peaks (server 1) — 6 reviews
  ('c1000000-0000-0000-0000-000000000001', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 'detailed', 5,
   'Absolutely love this server! The custom biomes are stunning and the economy is well-balanced. Best survival experience I have had in Hytale so far.',
   true, '120 hours', 'published', 12, 2, '2026-02-01T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000002', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003', 'quick', 4,
   NULL, true, '45 hours', 'published', 5, 0, '2026-02-03T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000003', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005', 'detailed', 5,
   'The dynamic weather system is incredible. Rain actually affects gameplay and the seasons change monthly. Community is super welcoming too.',
   true, '200 hours', 'published', 18, 1, '2026-01-28T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000004', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000007', 'quick', 4,
   NULL, true, '30 hours', 'published', 3, 0, '2026-02-05T16:00:00Z'),
  ('c1000000-0000-0000-0000-000000000005', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000009', 'detailed', 5,
   'Been playing here for months. The admin team is responsive, updates are frequent, and the player base is growing steadily. Highly recommend!',
   true, '350 hours', 'published', 25, 3, '2026-01-20T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000006', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000010', 'quick', 4,
   NULL, false, '15 hours', 'published', 1, 0, '2026-02-08T13:00:00Z'),

  -- Orbis Creative (server 2) — 6 reviews
  ('c1000000-0000-0000-0000-000000000007', 'server', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'detailed', 5,
   'The best creative server, period. WorldEdit support is flawless, the plot system is generous, and the weekly build competitions are a blast.',
   true, '500 hours', 'published', 30, 5, '2026-01-15T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000008', 'server', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004', 'detailed', 5,
   'Incredible community of builders. I have learned so much just by exploring other peoples plots. The custom brushes are a game-changer.',
   true, '180 hours', 'published', 15, 2, '2026-01-22T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000009', 'server', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000006', 'quick', 5,
   NULL, true, '60 hours', 'published', 8, 1, '2026-02-02T15:00:00Z'),
  ('c1000000-0000-0000-0000-000000000010', 'server', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000008', 'quick', 4,
   NULL, true, '25 hours', 'published', 4, 0, '2026-02-06T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000011', 'server', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000009', 'detailed', 5,
   'As a professional builder, this server has everything I need. The admin team constantly adds new tools and the server performance is rock solid.',
   true, '800 hours', 'published', 42, 8, '2026-01-10T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000012', 'server', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000010', 'quick', 5,
   NULL, true, '40 hours', 'published', 6, 0, '2026-02-09T09:00:00Z'),

  -- Valor Arena (server 3) — 5 reviews
  ('c1000000-0000-0000-0000-000000000013', 'server', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'detailed', 4,
   'Solid PvP server with good matchmaking. The ELO system works well and tournaments are exciting. Could use more maps though.',
   true, '90 hours', 'published', 10, 1, '2026-01-25T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000014', 'server', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000005', 'quick', 5,
   NULL, true, '150 hours', 'published', 7, 0, '2026-02-01T16:00:00Z'),
  ('c1000000-0000-0000-0000-000000000015', 'server', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000007', 'detailed', 4,
   'Great for competitive players. The ranked system is fair and the anti-cheat works well. Weekend tournaments have decent prize pools.',
   true, '200 hours', 'published', 14, 2, '2026-01-18T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000016', 'server', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000009', 'quick', 3,
   NULL, false, '20 hours', 'published', 2, 0, '2026-02-07T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000017', 'server', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'detailed', 5,
   'Top tier PvP experience. The custom kits are balanced and the community is passionate. Best arena server out there!',
   true, '300 hours', 'published', 20, 3, '2026-01-12T10:00:00Z'),

  -- Arcade Galaxy (server 5) — 5 reviews
  ('c1000000-0000-0000-0000-000000000018', 'server', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'detailed', 5,
   'So much fun! Galaxy Rush is the best original minigame I have ever played. There is always something new to try and the community is amazing.',
   true, '100 hours', 'published', 22, 6, '2026-01-20T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000019', 'server', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000004', 'quick', 5,
   NULL, true, '50 hours', 'published', 9, 1, '2026-02-03T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000020', 'server', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000006', 'detailed', 4,
   'Great variety of games. Parkour courses are well-designed. Only downside is some games need more players to start, which can be slow during off-peak.',
   true, '75 hours', 'published', 11, 0, '2026-01-28T15:00:00Z'),
  ('c1000000-0000-0000-0000-000000000021', 'server', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000008', 'quick', 5,
   NULL, true, '30 hours', 'published', 5, 0, '2026-02-05T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000022', 'server', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000010', 'detailed', 5,
   'Perfect for playing with friends. The build battle mode is hilarious and spleef is a classic. New games every week keeps it fresh!',
   true, '60 hours', 'published', 16, 4, '2026-01-15T11:00:00Z'),

  -- Mythic Realms (server 4) — 4 reviews
  ('c1000000-0000-0000-0000-000000000023', 'server', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'detailed', 5,
   'The best roleplay server I have ever joined. The lore is deep, the storytelling is engaging, and the community respects the RP rules.',
   true, '250 hours', 'published', 28, 3, '2026-01-22T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000024', 'server', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000006', 'quick', 4,
   NULL, true, '40 hours', 'published', 6, 0, '2026-02-04T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000025', 'server', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000008', 'detailed', 5,
   'Character creation is incredibly detailed. The faction system creates real political drama. You genuinely feel like part of the world.',
   true, '180 hours', 'published', 19, 2, '2026-01-30T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000026', 'server', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000010', 'quick', 4,
   NULL, true, '20 hours', 'published', 3, 0, '2026-02-08T16:00:00Z'),

  -- Other servers with fewer reviews
  ('c1000000-0000-0000-0000-000000000027', 'server', 'b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'detailed', 4,
   'Great mod selection and the custom dimensions are fun to explore. Performance can dip with all the mods loaded but overall a solid experience.',
   true, '60 hours', 'published', 7, 1, '2026-02-02T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000028', 'server', 'b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000005', 'quick', 4,
   NULL, true, '35 hours', 'published', 4, 0, '2026-02-06T13:00:00Z'),

  ('c1000000-0000-0000-0000-000000000029', 'server', 'b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 'detailed', 4,
   'Faction wars are intense! The siege mechanics work surprisingly well. Needs more players but the core gameplay loop is addictive.',
   true, '80 hours', 'published', 9, 2, '2026-02-03T10:00:00Z'),

  ('c1000000-0000-0000-0000-000000000030', 'server', 'b1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000003', 'quick', 4,
   NULL, true, '25 hours', 'published', 3, 0, '2026-02-04T09:00:00Z'),

  -- Flagged reviews (for admin moderation testing)
  ('c1000000-0000-0000-0000-000000000031', 'server', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000004', 'detailed', 1,
   'This server is terrible. The admins are corrupt and they cheat in PvP. Do not waste your time here. Complete garbage.',
   false, '5 hours', 'flagged', 0, 0, '2026-02-07T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000032', 'server', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 'detailed', 1,
   'Worst server ever. Lag everywhere, economy is broken, and the community is toxic. Save yourself the trouble.',
   false, '2 hours', 'flagged', 0, 0, '2026-02-09T07:00:00Z'),

  -- Hidden gem server reviews (low count)
  ('c1000000-0000-0000-0000-000000000033', 'server', 'b1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000002', 'detailed', 5,
   'A hidden treasure! The storytelling here is top-notch and the community is incredibly welcoming. Small but mighty.',
   true, '80 hours', 'published', 8, 1, '2026-02-01T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000034', 'server', 'b1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000003', 'detailed', 4,
   'Hardcore PvP done right. Permadeath makes every fight meaningful. Not for everyone but perfect for thrill seekers.',
   true, '45 hours', 'published', 6, 0, '2026-02-02T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000035', 'server', 'b1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000005', 'detailed', 5,
   'The exploration aspect is unmatched. Finding ancient ruins and legendary artifacts is so satisfying. Great modpack curation.',
   true, '55 hours', 'published', 10, 2, '2026-02-03T08:00:00Z');

-- =====================
-- 5. REVIEW RATINGS (dimension scores for detailed reviews)
-- =====================
-- Dimensions: Fun, Community, Stability (seeded as tags with type='dimension')

INSERT INTO review_ratings (review_id, dimension_id, score, created_at) VALUES
  -- Review 1 (Emerald Peaks, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-02-01T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-02-01T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000001', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-02-01T10:00:00Z'),

  -- Review 3 (Emerald Peaks, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-28T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-28T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000003', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-01-28T09:00:00Z'),

  -- Review 5 (Emerald Peaks, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-20T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-20T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000005', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-01-20T11:00:00Z'),

  -- Review 7 (Orbis, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000007', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-15T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000007', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-15T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000007', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-01-15T08:00:00Z'),

  -- Review 8 (Orbis, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000008', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-22T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000008', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-22T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000008', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-01-22T12:00:00Z'),

  -- Review 11 (Orbis, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000011', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-10T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000011', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-10T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000011', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-01-10T14:00:00Z'),

  -- Review 13 (Valor Arena, detailed, 4 stars)
  ('c1000000-0000-0000-0000-000000000013', (SELECT id FROM tags WHERE slug = 'fun'), 4, '2026-01-25T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000013', (SELECT id FROM tags WHERE slug = 'community'), 4, '2026-01-25T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000013', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-01-25T11:00:00Z'),

  -- Review 15 (Valor Arena, detailed, 4 stars)
  ('c1000000-0000-0000-0000-000000000015', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-18T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000015', (SELECT id FROM tags WHERE slug = 'community'), 3, '2026-01-18T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000015', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-01-18T09:00:00Z'),

  -- Review 17 (Valor Arena, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000017', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-12T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000017', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-12T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000017', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-01-12T10:00:00Z'),

  -- Review 18 (Arcade Galaxy, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000018', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-20T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000018', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-20T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000018', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-01-20T08:00:00Z'),

  -- Review 20 (Arcade Galaxy, detailed, 4 stars)
  ('c1000000-0000-0000-0000-000000000020', (SELECT id FROM tags WHERE slug = 'fun'), 4, '2026-01-28T15:00:00Z'),
  ('c1000000-0000-0000-0000-000000000020', (SELECT id FROM tags WHERE slug = 'community'), 4, '2026-01-28T15:00:00Z'),
  ('c1000000-0000-0000-0000-000000000020', (SELECT id FROM tags WHERE slug = 'stability'), 3, '2026-01-28T15:00:00Z'),

  -- Review 22 (Arcade Galaxy, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000022', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-15T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000022', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-15T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000022', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-01-15T11:00:00Z'),

  -- Review 23 (Mythic Realms, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000023', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-22T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000023', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-22T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000023', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-01-22T10:00:00Z'),

  -- Review 25 (Mythic Realms, detailed, 5 stars)
  ('c1000000-0000-0000-0000-000000000025', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-01-30T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000025', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-01-30T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000025', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-01-30T09:00:00Z'),

  -- Review 27 (Nether Craft, detailed, 4 stars)
  ('c1000000-0000-0000-0000-000000000027', (SELECT id FROM tags WHERE slug = 'fun'), 4, '2026-02-02T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000027', (SELECT id FROM tags WHERE slug = 'community'), 4, '2026-02-02T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000027', (SELECT id FROM tags WHERE slug = 'stability'), 3, '2026-02-02T11:00:00Z'),

  -- Review 29 (Kingdoms, detailed, 4 stars)
  ('c1000000-0000-0000-0000-000000000029', (SELECT id FROM tags WHERE slug = 'fun'), 4, '2026-02-03T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000029', (SELECT id FROM tags WHERE slug = 'community'), 4, '2026-02-03T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000029', (SELECT id FROM tags WHERE slug = 'stability'), 3, '2026-02-03T10:00:00Z'),

  -- Hidden gem reviews
  ('c1000000-0000-0000-0000-000000000033', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-02-01T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000033', (SELECT id FROM tags WHERE slug = 'community'), 5, '2026-02-01T12:00:00Z'),
  ('c1000000-0000-0000-0000-000000000033', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-02-01T12:00:00Z'),

  ('c1000000-0000-0000-0000-000000000034', (SELECT id FROM tags WHERE slug = 'fun'), 4, '2026-02-02T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000034', (SELECT id FROM tags WHERE slug = 'community'), 4, '2026-02-02T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000034', (SELECT id FROM tags WHERE slug = 'stability'), 4, '2026-02-02T14:00:00Z'),

  ('c1000000-0000-0000-0000-000000000035', (SELECT id FROM tags WHERE slug = 'fun'), 5, '2026-02-03T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000035', (SELECT id FROM tags WHERE slug = 'community'), 4, '2026-02-03T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000035', (SELECT id FROM tags WHERE slug = 'stability'), 5, '2026-02-03T08:00:00Z');

-- =====================
-- 6. SERVER METRICS (recent health checks)
-- =====================
INSERT INTO server_metrics (server_id, status, latency_ms, player_count, checked_at) VALUES
  -- Online servers
  ('b1000000-0000-0000-0000-000000000001', 'online', 45, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000001', 'online', 42, NULL, NOW() - INTERVAL '6 hours'),
  ('b1000000-0000-0000-0000-000000000002', 'online', 38, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000002', 'online', 41, NULL, NOW() - INTERVAL '6 hours'),
  ('b1000000-0000-0000-0000-000000000003', 'online', 52, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000003', 'online', 55, NULL, NOW() - INTERVAL '6 hours'),
  ('b1000000-0000-0000-0000-000000000004', 'online', 65, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000005', 'online', 35, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000005', 'online', 33, NULL, NOW() - INTERVAL '6 hours'),
  ('b1000000-0000-0000-0000-000000000006', 'online', 78, NULL, NOW() - INTERVAL '2 hours'),
  ('b1000000-0000-0000-0000-000000000007', 'online', 120, NULL, NOW() - INTERVAL '2 hours'),
  ('b1000000-0000-0000-0000-000000000008', 'online', 95, NULL, NOW() - INTERVAL '3 hours'),
  ('b1000000-0000-0000-0000-000000000009', 'online', 150, NULL, NOW() - INTERVAL '2 hours'),
  ('b1000000-0000-0000-0000-000000000010', 'online', 88, NULL, NOW() - INTERVAL '2 hours'),
  ('b1000000-0000-0000-0000-000000000011', 'online', 60, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000012', 'online', 48, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000013', 'online', 110, NULL, NOW() - INTERVAL '3 hours'),
  ('b1000000-0000-0000-0000-000000000016', 'online', 55, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000017', 'online', 62, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000018', 'online', 50, NULL, NOW() - INTERVAL '1 hour'),
  -- Offline servers
  ('b1000000-0000-0000-0000-000000000014', 'offline', 5000, NULL, NOW() - INTERVAL '1 hour'),
  ('b1000000-0000-0000-0000-000000000015', 'offline', 5000, NULL, NOW() - INTERVAL '2 hours');

-- =====================
-- 7. FEATURED SERVERS (today's selections)
-- =====================
INSERT INTO featured_servers (server_id, featured_date, position, section, quality_score_at_feature) VALUES
  -- Featured (top 3)
  ('b1000000-0000-0000-0000-000000000002', CURRENT_DATE, 1, 'featured', 95.2),
  ('b1000000-0000-0000-0000-000000000005', CURRENT_DATE, 2, 'featured', 92.3),
  ('b1000000-0000-0000-0000-000000000001', CURRENT_DATE, 3, 'featured', 88.5),
  -- Hidden gems (4)
  ('b1000000-0000-0000-0000-000000000016', CURRENT_DATE, 1, 'hidden_gem', 72.0),
  ('b1000000-0000-0000-0000-000000000018', CURRENT_DATE, 2, 'hidden_gem', 70.0),
  ('b1000000-0000-0000-0000-000000000017', CURRENT_DATE, 3, 'hidden_gem', 68.0),
  ('b1000000-0000-0000-0000-000000000007', CURRENT_DATE, 4, 'hidden_gem', 58.0);

-- =====================
-- 8. OWNER RESPONSES (a couple of owner replies to reviews)
-- =====================
INSERT INTO owner_responses (review_id, owner_id, response_text, created_at) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Thank you so much for the kind words! We put a lot of effort into the biomes and economy balance. Glad you enjoy it!',
   '2026-02-02T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000003',
   'Thanks for the feedback! We are working on 5 new maps that should be released next month. Stay tuned!',
   '2026-01-26T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000005',
   'We hear you on the off-peak player counts. We are adding AI bots to fill games during quiet hours. Update coming soon!',
   '2026-01-29T12:00:00Z');

-- =====================
-- 9. REVIEW VOTES & REACTIONS (a few interactions)
-- =====================
INSERT INTO review_votes (review_id, user_id, vote_type, created_at) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005', 'helpful', '2026-02-02T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000007', 'helpful', '2026-02-03T11:00:00Z'),
  ('c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000003', 'helpful', '2026-01-16T09:00:00Z'),
  ('c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000005', 'helpful', '2026-01-17T14:00:00Z'),
  ('c1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000001', 'helpful', '2026-01-11T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000003', 'helpful', '2026-01-21T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000009', 'funny', '2026-01-22T15:00:00Z');

INSERT INTO review_reactions (review_id, user_id, reaction, created_at) VALUES
  ('c1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'fire', '2026-01-21T10:00:00Z'),
  ('c1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000004', 'heart', '2026-01-12T08:00:00Z'),
  ('c1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000001', 'fire', '2026-01-13T11:00:00Z');

-- =====================
-- 10. REVIEW COMMENTS (a few threaded comments)
-- =====================
INSERT INTO review_comments (id, review_id, user_id, comment_text, parent_comment_id, created_at) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005',
   'Totally agree about the economy! The trading system is well thought out.', NULL, '2026-02-02T12:00:00Z'),
  ('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002',
   'Thanks! Have you tried the new market district they added last week?', 'd1000000-0000-0000-0000-000000000001', '2026-02-02T14:00:00Z'),
  ('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000006',
   'How often are the build competitions? I want to participate!', NULL, '2026-01-17T10:00:00Z'),
  ('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001',
   'Every Saturday at 6 PM UTC! There is a themed one this weekend.', 'd1000000-0000-0000-0000-000000000003', '2026-01-17T12:00:00Z');

-- =====================
-- 11. RE-ENABLE RLS
-- =====================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Notify PostgREST to reload schema cache (picks up new FK relationships)
NOTIFY pgrst, 'reload schema';
