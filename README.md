# msg-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment with Dokploy

The frontend image is built by GitHub Actions and published to GitHub Container Registry (GHCR). Dokploy only pulls and runs the image; it does not build the application.

1. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and create the repository variable `VITE_API_BASE_URL`, for example `https://api.example.com`. Use the API URL reachable from the user's browser. This value is public and is embedded in the frontend at build time; do not put secrets in it. Configure the API's CORS settings to allow the frontend domain if they use different origins.
2. Push to `main` or run **Build and publish Docker image** manually from the Actions tab. Each successful build publishes a `sha-<commit>` tag; builds of `main` also update `latest`. After changing the API URL, run the workflow again to create a new image.
3. In **Packages** on GitHub, make the GHCR package public, or configure registry authentication in Dokploy using a GitHub token with `read:packages` and access to the package. The workflow uses `GITHUB_TOKEN` to publish; check that Actions is allowed to write packages if publication fails.
4. In Dokploy, create a **Compose** service and use this repository's `compose.yaml` as its Compose source. If deploying from another repository or a fork, set `IMAGE` in Dokploy to the published image, for example `ghcr.io/owner/repository:latest` (GHCR image names are lowercase). For a fixed version use the published `sha-<commit>` tag instead.
5. Add a domain to the `web` service in Dokploy and set its container port to **80**, then deploy. On subsequent releases, redeploy and pull the updated image; a pinned SHA must first be changed to the new tag. Configure HTTPS for the domain in Dokploy.

The Compose file intentionally does not publish a host port: Dokploy routes traffic to port 80 through its proxy. The backend is a separate service and is not included in this Compose file.
