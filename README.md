# Doodle Chat

A small, responsive chat interface built in React + TypeScript. It lists messages
from every sender and lets you post your own, backed by the Doodle Frontend
Challenge Chat API.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for dev/build
- **Vitest** + Testing Library for tests
- **CSS Modules** + CSS custom properties (design tokens) — no UI framework

## Prerequisites

- **Node 20+**
- The **Chat API** running locally (defaults to `http://localhost:3000`). See the
  [Frontend Challenge Chat API](https://github.com/DoodleScheduling/frontend-challenge-chat-api).

## Getting started

```bash
npm install
npm run dev
```

The app starts on the port Vite prints (usually `http://localhost:5173`).

## Configuration

The API base URL and bearer token are read from environment variables, with
sensible defaults for local development:

| Variable             | Default                       |
| -------------------- | ----------------------------- |
| `VITE_API_BASE_URL`  | `http://localhost:3000`       |
| `VITE_API_TOKEN`     | `super-secret-doodle-token`   |

To override, create a `.env.local`:

```
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TOKEN=super-secret-doodle-token
```

## Scripts

| Script             | Purpose                          |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start the dev server (HMR)       |
| `npm run build`    | Type-check and build for production |
| `npm run preview`  | Preview the production build     |
| `npm test`         | Run the test suite               |
| `npm run lint`     | Lint                             |

## Project structure

```
src/
  api/         fetch client, endpoints, and request/response types
  components/  ChatApp (identity gate) → ChatRoom → MessageItem / MessageComposer, NamePrompt
  hooks/       useMessages (load + send), useIdentity (display name)
  lib/         formatTimestamp, decodeEntities
  styles/      tokens.css (design tokens), globals.css (reset + base)
```

## Decisions & tradeoffs

- **No state library.** Plain hooks + `fetch` are enough for this scope; a store or
  data-fetching library would be over-engineering.
- **Identity is a display-name convention, not auth.** The API has no
  authentication, so the name is stored in `localStorage` purely to label your
  messages and mark them as "yours". It is per-browser and spoofable by design —
  clearing storage or switching browsers yields a new identity. There is no way to
  make this durable without real auth, which the API doesn't provide.
- **System font stack.** Avoids a web-font network request for a faster first paint.
- **Safe HTML-entity decoding.** Messages arrive HTML-encoded (e.g. `It&#39;s`).
  They're decoded via a detached `<textarea>` (which yields plain text, never
  injected markup) and rendered as text by React, so message content can't inject
  HTML/scripts.
- **Accessibility.** Semantic landmarks (`<main>`, `<form>`, `<time>`), labelled
  inputs, a visually-hidden page heading and "You" marker (own messages are
  otherwise distinguished only by colour/alignment), `aria-live` for the character
  counter and validation errors, visible focus outlines, and a WCAG-contrast error
  colour.

## Known limitations

- **No live updates from others.** Messages load once on mount; seeing new messages
  from other senders requires a reload. The API is REST-only (no WebSocket), so a
  real-time feel would mean polling the `after` cursor — left out to keep scope tight.
- **The API token ships in the client bundle.** `VITE_`-prefixed variables are
  embedded at build time and visible in the browser. This is inherent to a
  client-only app with no backend-for-frontend, and is not production-secure.
