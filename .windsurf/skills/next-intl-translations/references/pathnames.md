# Localized Pathnames

Localized pathnames must be configured in **two places** or navigation will break.

## 1. `i18n/routing.ts` — Internal routing

```ts
pathnames: {
  '/servers': {
    en: '/servers',
    es: '/servidores'
  }
}
```

## 2. `next.config.ts` — URL rewrites

```ts
async rewrites() {
  return [
    {
      source: '/es/servidores',
      destination: '/es/servers',
    }
  ];
}
```

## Why Both

- **routing.ts** — tells next-intl how to generate and match links (`<Link href="/servers">` renders as `/es/servidores` in Spanish)
- **next.config.ts** — tells Next.js how to map the external Spanish URL back to the internal `[locale]/servers` route

## Adding a New Localized Pathname

1. Add the pathname mapping to `i18n/routing.ts` `pathnames` object
2. Add a corresponding rewrite entry in `next.config.ts` `rewrites()`
3. Update `@/i18n/navigation` `Link` usage to use the internal path (e.g., `/servers`, not `/servidores`)

## Current Pathnames

| Internal         | Spanish URL          |
|------------------|----------------------|
| `/servers`       | `/es/servidores`     |
| `/creators`      | `/es/creadores`      |
| `/submit`        | `/es/agregar`        |
| `/branding`      | `/es/guia-de-marca`  |
| `/profile`       | `/es/perfil`         |
| `/settings`      | `/es/configuracion`  |
| `/survey`        | `/es/encuestas`      |
| `/survey/[slug]` | `/es/encuesta/[slug]`|
