# Shared assets (logos, images)

**Canonical location** for images and logos used across all frontend apps (b2b-b2c-app, admin-dashboard, picker-app, pulse-picker-app, etc.).

## Contents

- **pulse-logo.png** – Default Pulse Health Supplies brand logo (use for favicon/apple touch icon, OG image where appropriate).
- **pulse-logo-light-bg.png** – Logo for use on **light** backgrounds (dark text). Use in Header/Footer when theme is light.
- **pulse-logo-dark-bg.png** – Logo for use on **dark** backgrounds (white text). Use in Header/Footer when theme is dark.
- **pulse-logo-icon.png** – Icon-only graphic (no text). Use when the company name is shown next to it (e.g. header with name). Transparent background, scales well on small screens.

The b2b-b2c app uses `PulseLogo`: when the name is shown (`showName=true`), it uses the icon + text with a responsive layout (smaller icon and single-line name on narrow devices). When only the logo is shown (`showName=false`), it uses the theme-aware full logo. Fallback: company name text if the image fails to load.

## Usage

1. **Add new assets here** – Place any shared image/logo in this folder.
2. **Sync to apps** – Run from repo root or frontend root:
   ```bash
   ./scripts/sync-shared-assets.sh
   ```
   This copies everything under `shared/assets/` into each app’s `public/assets/`, so apps can reference `/assets/pulse-logo.png` etc.
3. **In app code** – Use the path as served from `public/`:
   ```tsx
   <Image src="/assets/pulse-logo.png" alt="Pulse Health Supplies" width={140} height={42} />
   ```

## When to add here vs app-only

- **Here**: Brand logo, shared icons, OG image, any asset used by more than one app.
- **App `public/` only**: App-specific images (e.g. one-off banners, that app’s favicon if different).
