# TravelBuddy — Full story (product narrative)

TravelBuddy helps solo or small-group travelers find compatible companions, plan shared trips, and coordinate easily and safely.

- Persona A—Backpacker (Asha, 24): wants to share hostels and activities to save money and meet people. She posts a trip to Kathmandu for 10 days and looks for people with similar dates and interests.
- Persona B—Weekend Explorer (Ben, 32): wants short local trips and prefers small groups who enjoy hiking. He joins nearby trips and messages the organizer to coordinate gear and rides.
- Outcome: Users create trips, get matched with buddies filtered by dates/interests, message in‑app to confirm plans, and share trip memories and reviews. Trust features (profiles, reviews) reduce risk of bad matches.

User journey (high level)

1. Onboard → create profile + interests + verification (email).  
2. Create or browse trips → view matches (date overlap + interests).  
3. Invite/join → in‑app chat + notifications for confirmations.  
4. After travel → post photos, leave reviews, build reputation.

---

# Full picture & scope

MVP (must-have in 30 days)

- Auth: Email signup/login, profile (avatar, bio, interests, hometown). Email verification.
- Trip management: Create/edit/delete trips (destination, dates, capacity, description, tags, optional location coordinates).
- Matching: Rule-based matching (destination + overlapping dates + interests) + visible matches list + invite/join flow.
- Messaging: Basic one-to-one chat (persisted). Can be WebSocket-based or a polling fallback. Notifications for invites/messages.
- Feed: Simple “Upcoming Trips” feed + ability to view trip details and participants.
- Reviews: Post-trip reviews and ratings (basic).
- Admin basics: Basic dashboard to remove posts/users.

Out of scope for MVP (phase 2+)

- Payments/bookings, advanced verification (background checks), mobile apps, video calling, complex recommendation ML, ads, full moderation workflow, story ephemeral content.

Version 1 (post-MVP)

- Group chats, push notifications, photo uploads for posts, richer verification (phone SMS), search with filters, improved matching scoring, lightweight onboarding tours, analytics for users.

Later / Optional

- Integrations (hostel/booking APIs), marketplace for group experiences, premium features (boost listings, background checks), LLM-driven itinerary suggestions.

---

# New specification (concise)

Functional requirements (user stories)

- As a visitor I can sign up/in so I can use features.
- As a user I can create/edit my profile and set preferences.
- As a user I can create a trip and publish it.
- As a user I can browse trips and see recommended companions.
- As an organizer I can invite users to my trip; invitees can accept/decline.
- As a user I can message another user I’ve matched with or who joined my trip.
- As a traveler I can leave a review for a trip mate after a completed trip.
- As an admin I can view and remove reported content or users.

Non-functional requirements

- Availability: 99% for MVP; recoverable within minutes.
- Performance: API responses < 300ms for common GET endpoints on moderate load.
- Security: TLS everywhere, encrypted stored secrets, rate limiting.
- Privacy/regulatory: GDPR/CCPA awareness—easy account deletion and data export later.
- Scalability: design so real-time components can be replaced by third-party if needed.

Acceptance criteria (MVP)

- Sign-up + email verification works and creates profile.
- User can create a trip and 3 other users can find & join/invite.
- Chat shows messages in order, persisted; both sides can read messages.
- Matching returns sensible list (destination/date/interest overlap).
- Deployed demo on public URL and backend reachable by frontend; basic tests exist.

UX notes

- Minimal onboarding: ask location, travel style, 3 interests.
- Clear privacy & meeting-safety tips during onboarding.
- Use progressive disclosure—don’t show advanced settings until needed.

---

# Data model (simplified)

Tables & key fields:

- users: id, email, password_hash, name, avatar_url, bio, interests (array/text), location, verified_at, created_at
- trips: id, organizer_id (FK users), title, destination_name, destination_lat, destination_lng, start_date, end_date, capacity, description, tags, status, created_at
- trip_participants: id, trip_id, user_id, role (organizer|member|pending), joined_at
- trip_invites: id, trip_id, from_user_id, to_user_id, status (pending|accepted|declined), created_at
- friendships (optional): id, requester_id, receiver_id, status
- chats: id, kind (direct|trip), created_at
- chat_members: id, chat_id, user_id, last_read_at
- messages: id, chat_id, sender_id, body, attachment_url, created_at
- posts: id, user_id, trip_id (nullable), body, media_urls, created_at
- comments: id, post_id, user_id, body, created_at
- likes: id, target_type, target_id, user_id, created_at
- reviews: id, reviewer_id, reviewee_id, trip_id, rating, body, created_at
- notifications: id, user_id, type, payload(json), read_at, created_at
- destinations (optional): canonical list to avoid duplicates

Indexes: add index on (destination_name, start_date, end_date), on users.interests (GIN if Postgres array/jsonb).

---

# API surface (core endpoints — /api/v1)

Auth

- POST /auth/register — {email,password,name} => 201 + verification email
- POST /auth/login — {email,password} => {token}
- POST /auth/refresh — refresh token if used

Users

- GET /users/:id — public profile
- PUT /users/:id — update profile (auth)
- GET /users?query= — search users

Trips

- POST /trips — create
- GET /trips — list + query params (destination, date_from, date_to)
- GET /trips/:id — details
- PUT /trips/:id — edit (owner)
- POST /trips/:id/invite — invite user
- POST /trips/:id/join — request join
- POST /trips/:id/leave — leave

Matching

- GET /trips/:id/matches — list matched users (score, common_interests)

Chat & Messages

- POST /chats — create direct chat
- GET /chats — list
- GET /chats/:id/messages — list messages (pagination)
- POST /chats/:id/messages — send message (socket + persist)

Posts & Social

- POST /posts — create post (optionally attach trip)
- GET /feed — combined feed of upcoming trips & posts
- POST /posts/:id/comments
- POST /posts/:id/like

Reviews

- POST /reviews — create review (trip must be past / participant)
- GET /reviews/:user_id

Notifications

- GET /notifications
- POST /notifications/mark_read

Admin (protected)

- GET /admin/users
- DELETE /admin/users/:id

Authentication: bearer JWT for API (short token life + refresh), or use session cookies if you prefer Rails Devise.

---

# Matching algorithm (MVP)

Simple scoring function (explainable, no ML):
score = w1 *destination_match + w2* date_overlap_ratio + w3 *interest_overlap_count + w4* proximity

- destination_match = 1 if same destination_name or within X km
- date_overlap_ratio = overlap_days / union_days
- interest_overlap_count normalized
- proximity based on user.home location distance bucket
Pick weights: w1=0.4, w2=0.3, w3=0.2, w4=0.1 (adjust via testing).

Implementation: SQL + simple server-side scoring to return top 20 matches.

Later: swap for collaborative filtering or LLM-based compatibility scoring.

---

# Tech stack & recommended services

Frontend

- React + TypeScript + Vite
- Tailwind CSS
- React Router, React Query (data fetching)
- Testing: React Testing Library, Jest

Backend

- Ruby on Rails API mode (or Node/Express if you prefer JS)
- PostgreSQL
- ActionCable (or Pusher/Stream if you want managed websockets)
- Redis for ActionCable/queues
- ActiveStorage + S3 (or Cloudinary) for media

Infrastructure & ops

- Docker + docker-compose for local dev
- Host frontend: Vercel/Netlify; backend: Render/Heroku/DigitalOcean App Platform
- CI: GitHub Actions
- Email: SendGrid/Postmark
- Analytics: Mixpanel/Amplitude + server logs
- Error tracking: Sentry
- Optional managed chat: Stream or Sendbird to speed up chat

If single developer: consider Supabase or Firebase to reduce backend work (auth, db, realtime).

---

# Security, privacy & trust

- Email verification required for account activation.
- Rate limit login and messaging endpoints.
- Content moderation: report feature + admin review queue.
- Display safety tips; allow private accounts and block/report.
- Data encryption in transit (TLS).  
- Store secrets in env variables/secret store.
- Prepare data export/delete endpoints for GDPR compliance later.
- Optional: phone verification via SMS for higher trust.

---

# Monitoring & KPIs

Core KPIs (first 90 days)

- Activation: % of signups who create a trip within 7 days
- Matching conversion: % matches that become messages / invites
- Time-to-first-match: median time from trip creation to first match
- Retention: Day 7 / Day 30 retention
- Messages per matched pair
- Trips created per week
- Reports / safety incidents

Monitoring stack

- Sentry for errors, Prometheus + Grafana or hosted metrics, and simple uptime checks.

---

# Monetization options (start simple)

- Freemium: free core features; Pro subscription (boosted trip visibility, unlimited matches, read receipts).
- Transaction: once adding bookings or paid experiences, take commission.
- Partnerships: hostel/experience affiliate links.
- Safety/verification upsell: pay for verified badge.

Recommendation: start with freemium + boosts for organizers.

---

# 30‑day plan (day-by-day) — realistic MVP for a small team (2–4 people)

Assumptions: 2 devs (1 frontend, 1 backend), 1 designer (part-time), 1 QA/PM (part-time). Daily standups, weekly demos. Focus: Launch a public demo with core flows: signup, create trip, find matches, invite/join, chat (direct messages), basic feed, leave reviews.

Sprint cadence: 4 weekly sprints (days 1–7, 8–14, 15–21, 22–30).

Week 0 / Day 1 (kickoff)

- Deliverable: Project repo(s), README, basic architecture doc, Trello/Jira backlog.
- Tasks: finalize MVP scope; assign owners; design initial DB schema.
- Acceptance: repo created with templates and issues.

Week 1 — Foundation & Auth (Days 2–7)
Day 2:

- Backend: Initialize Rails API, Docker, DB migrations for users, trips.
- Frontend: Initialize Vite + React + Tailwind; auth UI skeleton.
- Designer: create 3 key screens (onboarding, trip create, trip detail).
Day 3:
- Backend: Implement registration + email verification (SendGrid), JWT login.
- Frontend: Registration flow wired to backend; basic validation.
Day 4:
- Backend: User profile endpoints (GET/PUT).
- Frontend: Profile edit UI; onboarding flow (interests).
Day 5:
- Backend: Trip model & CRUD endpoints (create/list/detail).
- Frontend: Trip create form wired; trip list view.
Day 6:
- Integrate storage for avatars (local/Dev S3 mock).
- Tests: basic backend request specs; frontend smoke tests.
Day 7:
- Deploy backend to staging (Render/Heroku); frontend to Netlify/Vercel.
- Deliverable: Working auth + profiles + trip CRUD on staging.
- Acceptance: demo script passes: sign up, login, create profile, create trip.

Week 2 — Matching, Invites & Search (Days 8–14)
Day 8:

- Backend: Implement matching endpoint (/trips/:id/matches) with scoring.
- Frontend: Matches UI on trip detail showing match score & invite button.
Day 9:
- Backend: Trip invite endpoints & trip_participants logic.
- Frontend: Invite flow + notifications UI (in-app).
Day 10:
- Backend: Basic search filters for trips (destination/date/tags).
- Frontend: Search UI + results.
Day 11:
- Implement trip join/leave flows & acceptance notification.
Day 12:
- Designer: final tweaks to UX; add privacy/safety copy on screens.
Day 13:
- Tests: matching unit tests, integration tests for invite/join.
Day 14:
- Deliverable: Matching + invite flows live on staging.
- Acceptance: Demo: create trip A, create user B, B sees match for A and accepts invite → both appear as participants.

Week 3 — Messaging, Notifications & Feed (Days 15–21)
Day 15:

- Decide chat approach: ActionCable self-hosted or managed chat (Stream). If time constrained, integrate Stream (faster).
- Backend: Chat resource scaffolding + messages persistence.
Day 16:
- Frontend: Chat UI for direct messages (open thread, send, receive).
Day 17:
- Real-time: wire websockets (ActionCable) or Stream SDK; implement message delivery and read receipts (MVP minimal).
Day 18:
- Notifications: server-side notifications for invites/messages; UI to show unread counts.
Day 19:
- Feed: combine trips & recent posts into a simple feed; create post model minimal (text + media optional).
Day 20:
- Tests: messaging end‑to‑end tests; load basic message sequence test.
Day 21:
- Deliverable: Messaging + notifications + feed on staging.
- Acceptance: Users can send messages that the other sees in near real-time; feed shows trips.

Week 4 — Polishing, QA, Deployment & Launch (Days 22–30)
Day 22–23:

- Add review system (only for participants after trip.end_date or via manual marking for demo).
- Add admin endpoints (remove user/post).
Day 24:
- UX polish, responsive adjustments, accessibility basics.
Day 25:
- Add basic rate limiting and input validation, darkMode minor tweaks.
Day 26:
- Prepare CI/CD pipelines: GitHub Actions to run tests and deploy.
Day 27:
- Instrument basic analytics (Mixpanel events for signup, create_trip, send_message).
Day 28:
- QA: run end-to-end Cypress flows (signup → create trip → match → invite → message → review).
Day 29:
- Final deploy to production, smoke test. Create demo accounts and demo script.
Day 30:
- Soft launch: invite friends, gather first 10–50 testers, quick bug triage & backlog.
- Deliverable: Public demo + test user list + roadmap for phase 2.
- Acceptance: All core flows live; Sentry reporting and basic monitoring active; first testers onboarded.

Demo script (what you show at the end)

1. Sign up as Organizer (create trip).
2. Sign up as Traveler B (find match for trip).
3. Organizer invites B → B accepts.
4. Direct message conversation between Organizer and B.
5. After trip, B leaves review for Organizer.
6. Admin removes a test post.

---

# Team & rough cost estimate (MVP)

Minimum team

- 1 Backend dev (Rails) — 50–80% for 30 days
- 1 Frontend dev (React) — 50–80% for 30 days
- 1 Designer/PM — part time
- 1 QA or generalist — part time

If solo: swap to Supabase/Firebase + React template to speed up — still doable in 30 days but expect tradeoffs.

Hosting & tooling cost (first month approximate range)

- Hosting (Render/Vercel/Netlify): $0–$50 (small plan)
- DB (Heroku Postgres small/managed): $0–$50
- SendGrid/Postmark: $0–$20
- Cloud media storage (S3) minimal: $0–$20
- Optional managed chat (Stream/Sendbird): $0–$200 (trial/free tier available)
- Monitoring & analytics: free tiers initially
Total: $0–$300+ depending on choices.

---

# Risks & mitigations

- Safety/risk meeting strangers — Mitigate: mandatory safety tips, reports, ability to block, reputation/reviews.
- Low adoption — Focus niche vertical (e.g., backpackers in a city, university exchange students) and community channels for initial traction.
- Chat scaling — Use managed chat if unsure; avoid building full scaleable chat in-house initially.
- Legal/privacy — Prepare simple TOS & privacy; avoid storing unnecessary PII; implement account deletion.

---

# Is this app a good idea?

Short answer: Yes — with conditions.

Why it can work

- Real user pain exists: solo travelers seek companions, cheaper/safer trips, and local experiences.
- Social matching + trip planning is a tangible product with frequent engagement triggers (create trip, chat, join).
- Opportunity to niche and build strong community/word-of-mouth which lowers CAC.

Key challenges

- Marketplace problem: you need both trip creators and active travelers at the same time to create value. Early supply/demand balancing is the hardest part.
- Trust & safety is critical: meeting strangers has real safety concerns.
- Competition: multiple apps and social channels already solve parts (Meetup, Facebook groups, Couchsurfing, GAFFL). You must clearly differentiate.

Recommendations to increase success probability

1. Niche first: target a focused vertical (students, festival attendees, backpackers in SE Asia, digital nomads in a city). Niche lowers CAC & streamlines onboarding.
2. Focus on trust: require verified email + optional phone verification; emphasize transparent reviews and clear meeting safety content.
3. Solve the marketplace problem: seed trips by onboarding community partners (hostels, student groups) or run events/challenges.
4. Keep the MVP laser-focused: match + in-app chat + safety + reviews. Add features after retention demonstrates value.
