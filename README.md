# CodeVerse Roadmap

A one-stop interactive coding learning platform ("W3Schools++") featuring docs, tutorials, guides, curated roadmaps, challenges, quizzes, tests, and projects built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and a modular service layer.

---

## 1. Vision

Single destination to learn, practice, assess, and progress across programming domains with:

- Progressive learning paths (roadmaps)
- Multi-format content (docs, interactive tutorials, videos, snippets)
- Hands‑on coding challenges + auto-evaluation
- Quizzes & adaptive tests (knowledge & skill gap analysis)
- Project-based learning & certifications
- Community Q&A + discussion threads (later phase)
- Personalized dashboard & analytics

Success = High retention (return sessions), completion of modules, low time-to-first-successful submission.

---

## 2. Core Pillars & Modules

| Pillar                 | Modules                            | Notes                       |
| ---------------------- | ---------------------------------- | --------------------------- |
| Content Delivery       | Docs, Guides, Tutorials            | MDX + component blocks      |
| Learning Structure     | Roadmaps, Paths, Milestones        | Graph of nodes (prereqs)    |
| Practice               | Challenges, Coding Playground      | Sandboxed runner (API)      |
| Assessment             | Quizzes, Tests, Certificates       | Item bank, adaptive routing |
| Engagement             | Streaks, XP, Badges                | Gamification service        |
| Personalization        | Dashboard, Progress Tracking       | Event sourcing / analytics  |
| Discovery              | Search, Tagging, Recommendations   | Vector + keyword hybrid     |
| Auth & Access          | OAuth, Email, Role/Tier (Free/Pro) | RBAC + rate limits          |
| Admin                  | CMS for content authors            | Secure MDX publishing       |
| Monetization (Phase 3) | Subscriptions, Stripe, Paywall     | Feature gating              |

---

## 3. Tech Stack

- Web: Next.js (App Router), TypeScript, React Server Components, Edge where useful
- UI: Tailwind CSS + shadcn/ui + Radix primitives
- State: Server Components + (Client) Zustand or TanStack Query for async caches
- Forms: React Hook Form + Zod
- Auth: NextAuth.js (Auth.js) + JWT / session + OAuth providers
- DB: PostgreSQL (primary), Redis (caching, rate limits), Optional: Neon / Supabase
- Content Storage: MDX in Git repo + S3/Blob for assets
- Search: Meilisearch or Typesense (Phase 2); fallback: Postgres full-text Phase 1
- Sandbox Runner: Isolated microservice (Docker-in-Docker or Firecracker) OR 3rd-party API initially (Sphere, Judge0)
- Messaging / Events: Postgres logical decoding -> queue (Later: Kafka / Redpanda). Phase 1: simple event table.
- Analytics: Ingest events -> ClickHouse (Phase 3) or start with Postgres rollups
- Emails / Notifications: Resend / Postmark
- Payments: Stripe (Phase 3)

---

## 4. High-Level Architecture

```
apps/web (Next.js)
 ├─ app/ (routes: /docs /tutorials /roadmaps /challenges /quiz /dashboard /admin)
 ├─ components/ui (shadcn generated atoms)
 ├─ components/blocks (MDX interactive blocks: <CodePlayground/>, <QuizInline/>)
 ├─ lib/ (db, auth, analytics, feature flags)
 ├─ content/ (mdx: docs/, guides/, tutorials/, roadmaps/graph.json)
 └─ tests/ (playwright + vitest)

services/
 ├─ judge-service/ (challenge execution adapter)
 ├─ recommendation/ (Phase 3)
 └─ worker/ (cron: recompute progress, badge awards)

packages/
 ├─ ui/ (shared design system exports)
 ├─ config/ (eslint, tailwind, tsconfig bases)
 └─ schemas/ (zod schemas, types)
```

---

## 5. Data Modeling (Initial Cut)

Key tables (simplified):

- users(id, name, email, role, tier, created_at)
- content(id, slug, type(enum: doc|tutorial|guide|challenge|quiz), title, body_mdx, metadata(jsonb), published_at)
- roadmap_nodes(id, slug, title, type, difficulty, metadata, order, prereq_ids[])
- roadmap_progress(user_id, node_id, status(enum: locked|in_progress|done), updated_at)
- challenges(id, slug, starter_code, solution_ref, tests(jsonb), language, difficulty, tags[])
- submissions(id, user_id, challenge_id, status, runtime_ms, memory_kb, passed_count, created_at)
- quizzes(id, slug, config(jsonb))
- quiz_items(id, quiz_id, type(enum: mcq|code|fill), prompt, options(jsonb), answer_key(jsonb), tags[])
- quiz_attempts(id, user_id, quiz_id, score, detail(jsonb), created_at)
- events(id, user_id, type, data jsonb, created_at)
- badges(id, key, name, criteria jsonb)
- user_badges(user_id, badge_id, awarded_at)

---

## 6. Content System

- Author MDX locally -> PR -> Build pipeline validates (lint MDX, broken links, frontmatter schema)
- MDX components whitelist: alerts, tabs, code playground, inline quiz, callouts
- Versioning: `content/CHANGELOG.md` + frontmatter `version`
- Precompute TOC & search index at build

---

## 7. Sandbox / Challenge Flow

1. User opens challenge -> fetch metadata + test count
2. Edits code in Monaco editor client-side
3. Submits -> POST /api/challenges/{id}/submit (stores pending submission)
4. Worker dispatches to judge provider (Phase 1: third-party API)
5. Poll or webhook updates submission -> push via SSE/WebSocket to client
6. Update progress, award XP, emit event

---

## 8. Phased Delivery

### Phase 0 (Project Bootstrap) - Week 1

- Repo setup: monorepo (pnpm)
- Configure Next.js + Tailwind + shadcn + linting + testing harness
- Add Auth (email + GitHub) + basic layout + dark mode

### Phase 1 (MVP Learn + Practice) - Weeks 2-5

- MDX docs + tutorials rendering
- Roadmap graph (static JSON) + progress tracking
- Challenges (read-only) + external judge integration
- Basic quiz engine (MCQ) + scoring
- User dashboard: XP, recent progress
- Search (Postgres full-text) limited to titles

### Phase 2 (Interactivity & Depth) - Weeks 6-10

- Inline interactive MDX blocks (quizzes, playground)
- Enhanced challenge runner with test feedback
- Tags + filtered search + Meilisearch
- Adaptive quiz (difficulty routing)
- Badges + streaks + email notifications
- Admin CMS (protected) for content CRUD (MDX editing optional)

### Phase 3 (Scale & Monetization) - Weeks 11-16

- Subscriptions (Stripe) + tier gating
- Certificates (PDF generation) for path completion
- Recommendation service (collaborative filtering / content-based)
- Code execution security hardening (internal sandbox)
- Analytics warehouse (ClickHouse) + dashboards

### Phase 4 (Community & Growth)

- Q&A threads linked to content
- User-generated challenges (moderation queue)
- Live events / cohort features

---

## 9. Milestone Exit Criteria

- Phase 1: A new user can register, complete first roadmap node (doc+tutorial), solve 1 challenge, finish a quiz, see progress.
- Phase 2: User experiences adaptive quiz, interactive MDX, earns a badge, search across body text.
- Phase 3: Paying user receives gated content + certificate.

---

## 10. Key API Endpoints (Indicative)

- GET /api/content?type=doc|tutorial&slug=...
- GET /api/roadmap (graph)
- POST /api/progress (update node status)
- GET /api/challenges/:slug
- POST /api/challenges/:slug/submit
- GET /api/submissions/:id (poll)
- GET /api/quizzes/:slug
- POST /api/quizzes/:slug/attempt
- GET /api/dashboard/summary
- POST /api/webhooks/judge (callback)

All input validated with Zod; responses typed via OpenAPI (drizzle-zod or tRPC alternative—choose one; keep lean). Start with REST+SWR; only add tRPC if needed.

---

## 11. UI Component Strategy

- Atoms: Button, Badge, Card, Tabs, Tooltip, Dialog (generated via shadcn)
- Layout: AppShell (Sidebar + TopNav), ContentLayout (MDX), DashboardLayout
- Blocks: CodePlayground, InlineQuiz, ChallengePanel, RoadmapGraph
- Forms: generic <FormField/> wrappers

---

## 12. Performance & SEO

- RSC for most data fetch (cache segmented by tags)
- `route segment config` for dynamic rendering vs static caching (docs static; dashboards dynamic)
- MDX compiled at build -> JSON AST
- Incremental Static Regeneration (ISR) for content pages
- Precompute OpenGraph images (Phase 2)

---

## 13. Security & Compliance

- Role-based middleware (admin/editor/user)
- Rate limiting (Redis sliding window) for submissions & auth
- Output escaping in rendered MDX sandboxed via allowed components
- Store only hashed test case outputs (no leaking solutions)
- Audit log table (admin actions)

---

## 14. Testing Strategy

- Unit: Zod schemas, utility functions (Vitest)
- Integration: API routes (supertest or built-in request)
- E2E: Playwright (auth, roadmap navigation, challenge solve, quiz attempt)
- Content validation CI: broken links, frontmatter schema, orphan nodes

---

## 15. Analytics & Metrics

MVP Events: content_view, challenge_submit, challenge_result, quiz_attempt, login, roadmap_node_complete.
KPIs: D1/7 retention, challenge pass rate, time-to-first-submission, quiz accuracy, roadmap completion funnel.

---

## 16. Backlog (Future Ideas)

- AI assistant hints (LLM) with token budget & moderation
- In-browser unit test authoring for user challenges
- Offline mode (Service Worker + content manifest)
- Mobile app shell (React Native / Expo) consuming same APIs

---

## 17. Initial Setup Steps (Condensed)

1. pnpm init -w (workspace)
2. Add Next.js app (pnpm create next-app --ts)
3. Install Tailwind + shadcn/ui scaffold
4. Configure ESLint + Prettier + Husky pre-commit (lint & type check)
5. Add Auth.js, DB (drizzle ORM + Postgres)
6. Add MDX pipeline + content folder
7. Ship first doc + roadmap JSON + progress API

---

## 18. Definition of Done (Per Feature)

- Code + types + tests (>= basic coverage) pass
- Accessible (aria roles for interactive components)
- Mobile responsive
- Observability: logs & basic metrics emitted
- Docs updated (CHANGELOG + README section if architectural)

---

## 19. Risk & Mitigation

| Risk                    | Mitigation                                                      |
| ----------------------- | --------------------------------------------------------------- |
| Sandbox security        | Start with external judge; internal later with strong isolation |
| Content sprawl          | Frontmatter schema + lint CI                                    |
| Performance regressions | Add Lighthouse CI + Web Vitals logging                          |
| Scope creep             | Phase gates + exit criteria enforcement                         |
| Vendor lock-in          | Abstract judge & search behind thin service layer               |

---

## 20. License & Governance (Placeholder)

Decide early: proprietary vs open core. Add `LICENSE` + contributor guide if OSS route chosen.

---

## 21. Quick Glossary

- Roadmap Node: A single learning unit (doc, tutorial, challenge, quiz)
- Inline Quiz: Small 1–3 question component embedded inside content
- Attempt: A user session answering quiz or submitting code

---

## 22. Next Action

Bootstrap repository (Phase 0) following Section 17.

---

Contributions / adjustments: open an issue describing scope & phase alignment.
