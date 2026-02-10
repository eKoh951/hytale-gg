import { useTranslations } from 'next-intl';
import { HeaderClient } from './header-client';

export function Header() {
  const t = useTranslations('navigation');

  return (
    <HeaderClient
      labels={{
        surveys: t('surveys'),
        signIn: t('signIn'),
        signOut: t('signOut'),
        profile: t('profile'),
        settings: t('settings'),
        changeLanguage: t('changeLanguage'),
        userMenu: t('userMenu'),
      }}
    />
  );
}
