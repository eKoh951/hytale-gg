'use client'

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { IconDivider, FooterTerrainDivider } from "@/components/ui/hytale-decorations";
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    platform: [
      { label: t('surveys'), href: "/survey" as const },
      { label: t('branding'), href: "/branding" as const },
    ],
    legal: [
      { label: t('privacy'), href: "/privacy" as const },
      { label: t('terms'), href: "/terms" as const },
      { label: t('contact'), href: "/contact" as const },
    ],
  };

  return (
    <footer className="relative bg-muted text-foreground">
      {/* Minecraft cobblestone texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.5'%3E%3Cpath d='M2 2h18v18H2zM22 8h16v16H22zM8 24h14v14H8zM26 26h12v12H26z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Subtle seams/cracks for depth */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='20' x2='40' y2='20' stroke='%23000000' stroke-width='0.5'/%3E%3Cline x1='20' y1='0' x2='20' y2='40' stroke='%23000000' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='40' y2='40' stroke='%23000000' stroke-width='0.3' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Subtle seams/cracks for depth */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='20' x2='40' y2='20' stroke='%23000000' stroke-width='0.5'/%3E%3Cline x1='20' y1='0' x2='20' y2='40' stroke='%23000000' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='40' y2='40' stroke='%23000000' stroke-width='0.3' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <FooterTerrainDivider className="h-10" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/hytale-gg.png"
                alt="hytale.GG"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('description')}
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={t('twitter')}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={t('github')}
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={t('discord')}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('platform')}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <I18nLink
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </I18nLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('legal')}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <I18nLink
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </I18nLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <IconDivider icon="pickaxe" className="mt-12 mb-8" />
        <p className="text-center text-xs text-muted-foreground">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
