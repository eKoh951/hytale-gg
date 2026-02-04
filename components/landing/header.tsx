"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-provider";
import { UserProfileMenu } from "@/components/auth/user-profile-menu";
import { Link as I18nLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';

async function handleSignIn() {
  const response = await fetch('/auth/signin', { method: 'POST' })
  const data = await response.json()
  
  if (data.error) {
    console.error('Sign in error:', data.error)
    return
  }
  
  if (data.url) {
    window.location.href = data.url
  }
}

const navItems = [
  { label: "Servers", href: "/servers" },
  { label: "Creators", href: "/creators" },
  { label: "List a Server", href: "/submit" },
];

function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href="/" 
      className="flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative h-8 transition-all duration-500 ease-out",
          isHovered ? "w-[180px]" : "w-[66px]"
        )}
      >
        {/* Short logo - h.gg - fades out first with slight scale */}
        <Image
          src="/h-gg.png"
          alt="hytale.GG"
          width={80}
          height={32}
          className={cn(
            "h-8 w-auto absolute left-0 transition-all duration-300 ease-in",
            isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
          priority
        />
        
        {/* Full logo - hytale.GG - reveals from left to right after fade */}
        <div 
          className={cn(
            "absolute left-0 top-0 h-8 overflow-hidden transition-all ease-out",
            isHovered ? "w-[180px] opacity-100 delay-150 duration-500" : "w-0 opacity-0 duration-200"
          )}
        >
          <Image
            src="/hytale-gg.png"
            alt="hytale.GG"
            width={180}
            height={32}
            className={cn(
              "h-8 w-auto transition-transform duration-500 ease-out",
              isHovered ? "translate-x-0" : "-translate-x-4"
            )}
            priority
          />
        </div>
      </div>
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state: { user, isLoading }, actions: { signIn, signOut } } = useAuth();
  const t = useTranslations('navigation');

  const navItems = [
    { label: t('servers'), href: "/servers" as const },
    { label: t('creators'), href: "/creators" as const },
    { label: t('listServer'), href: "/submit" as const },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border">
      {/* Full-width background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md">
        {/* Subtle pixelated block pattern background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='20' height='20' stroke='%23000000' stroke-width='1' fill='none'/%3E%3Crect x='20' y='20' width='20' height='20' stroke='%23000000' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content container - CONSTRAINED WIDTH */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <AnimatedLogo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <I18nLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </I18nLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {isLoading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <UserProfileMenu />
          ) : (
            <Button variant="ghost" size="sm" onClick={signIn}>
              {t('signIn')}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-b border-border bg-background md:hidden",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <I18nLink
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </I18nLink>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-full rounded" />
            ) : user ? (
              <>
                <I18nLink
                  href="/profile"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('profile')}
                </I18nLink>
                <I18nLink
                  href="/settings"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('settings')}
                </I18nLink>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => signOut()}
                >
                  {t('signOut')}
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" className="justify-start" onClick={signIn}>
                {t('signIn')}
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
