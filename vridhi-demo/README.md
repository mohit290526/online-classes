# Vridhi Academy — Online Platform Demo

Interactive mock-data demo: public site + login + student portal + admin panel,
for Class 11 & 12 Commerce. No real backend — everything runs on sample data
that resets when the page reloads.

## Run locally
npm install
npm run dev

## Deploy
Push to `main` — GitHub Actions builds and publishes to GitHub Pages
automatically (see .github/workflows/deploy.yml).

Before your first push, set the correct repo name in `vite.config.js`
(the `base` field) and enable Pages in repo Settings → Pages →
Source: GitHub Actions.
