# next-intl App Router — Reference

## Project file map (Tokyo Sounds)

| Purpose                             | Path                                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Plugin                              | `next.config.ts`                                                                                                            |
| Routing config                      | `src/i18n/routing.ts`                                                                                                       |
| Request / messages                  | `src/i18n/request.ts`                                                                                                       |
| Navigation (Link, useRouter, etc.)  | `src/i18n/navigation.ts`                                                                                                    |
| Middleware / proxy                  | `src/proxy.ts`                                                                                                              |
| Locale layout + provider            | `src/app/[locale]/layout.tsx`                                                                                               |
| Example pages with setRequestLocale | `src/app/[locale]/page.tsx`, `src/app/[locale]/about/page.tsx`, `src/app/[locale]/patch/page.tsx`                           |
| Client translation usage            | `src/components/layout/nav.tsx`, `src/components/widget/BackToHomeButton.tsx`, `src/app/(index)/components/LandingPage.tsx` |
| Messages                            | `messages/en.json`, `messages/ja.json`, `messages/zh-CN.json`, `messages/zh-TW.json`                                        |

## defineRouting options

```ts
defineRouting({
  locales: ["en", "ja", "zh-CN", "zh-TW"],
  defaultLocale: "en",
  localePrefix: "as-needed", // or "always" | "never"
  pathnames: { "/about": "/about", "/users": "/users" }, // optional locale-specific paths
});
```

- **localePrefix**: `"always"` (e.g. `/en/about`), `"as-needed"` (default locale can omit prefix), `"never"` (no prefix in URL).

## getRequestConfig return shape

```ts
return {
  locale: "en",
  messages: { ... },
  timeZone: "Asia/Tokyo",        // optional
  now: new Date(),              // optional
  defaultTranslationValues: {}, // optional
};
```

## Server vs client APIs

| Context | Hook / API                                     | Import from         |
| ------- | ---------------------------------------------- | ------------------- |
| Client  | `useTranslations(namespace)`                   | `next-intl`         |
| Client  | `Link`, `useRouter`, `usePathname`, `redirect` | `@/i18n/navigation` |
| Server  | `getTranslations({ locale, namespace })`       | `next-intl/server`  |
| Server  | `getMessages()`, `setRequestLocale(locale)`    | `next-intl/server`  |
| Server  | `hasLocale(routing.locales, locale)`           | `next-intl`         |

## Links

- [Getting started (App Router)](https://next-intl.dev/docs/getting-started/app-router)
- [Routing setup](https://next-intl.dev/docs/routing/setup)
- [Routing configuration](https://next-intl.dev/docs/routing/configuration)
- [Translations](https://next-intl.dev/docs/usage/translations)
