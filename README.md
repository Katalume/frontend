# MLBoost Frontend

Production-grade frontend for the MLBoost coding practice platform.

## Highlights

- LeetCode-inspired UI shell and problem workflow
- Auth-gated app routes via middleware
- Problemset filters, search, company insights, and status tracking
- Coding arena with Monaco editor, run/submit console, history replay, and editorial unlock
- Profile analytics, contest dashboard, explore/learning experiences
- Mock-first API layer with live-backend switch support
- Sentry + web-vitals instrumentation hooks

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Vitest + Testing Library
- Playwright

## Quick Start

```bash
npm ci
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login)

## Scripts

- `npm run dev` - start dev server
- `npm run lint` - run ESLint
- `npm run test:unit` - run Vitest tests
- `npm run test:e2e` - run Playwright tests
- `npm run build` - production build
- `npm run start` - start built app

## Environment Variables

Create `.env.local` as needed:

```bash
# API
NEXT_PUBLIC_API_MODE=mock                # mock | live | auto
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_API_RETRY_COUNT=2
NEXT_PUBLIC_API_TIMEOUT_MS=8000
NEXT_PUBLIC_API_FALLBACK_TO_MOCK=true

# Analytics
NEXT_PUBLIC_ANALYTICS_ENDPOINT=

# App environment
NEXT_PUBLIC_APP_ENV=development

# Sentry (browser)
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1

# Sentry (server/edge)
SENTRY_DSN=
SENTRY_TRACES_SAMPLE_RATE=0.1
```

## Live API Contract (expected paths)

- `POST /auth/login`
- `POST /auth/signup`
- `GET /problems`
- `GET /problems/:slug`
- `POST /submissions/run`
- `POST /submissions`
- `GET /tracks`
- `GET /profile/me`

## Testing Notes

- Unit tests use JSDOM + local storage mocks from `src/test/setup.ts`.
- E2E tests require Playwright browsers:

```bash
npx playwright install chromium
```

## CI

GitHub Actions pipeline runs:

1. `npm ci`
2. `npm run lint`
3. `npm run test:unit`
4. `npm run build`
5. `npx playwright install --with-deps chromium`
6. `npm run test:e2e`
