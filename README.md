# Purpose

Repository for learning react development via <https://react.dev> and the ecosystem.

Focused 2 primary goals:

- Quick dev iteration using esbuild with hot reloading
- Maintaining 100 Lighthouse score in production builds

The minimal setup captured in early commit 2aaa5354364f62af0f5e88bd7fd2aa640725380b.

## Dev setup

- `npm start` - build and start web server with hot reload for local development
- `npm run dev:build` - build for development without hot reload
- `npm run prod:build` - build for production with optimizations
- `npm run prod` - build and run in production mode

TODO:

- [ ] consider migrating `package.json` entries for the above from `esbuild` CLI to JSON.
