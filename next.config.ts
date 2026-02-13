import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Spanish localized pathnames
      {
        source: '/es/guia-de-marca',
        destination: '/es/branding',
      },
      {
        source: '/es/prueba',
        destination: '/es/test',
      },
      // New localized pathnames for SEO
      {
        source: '/es/servidores',
        destination: '/es/servers',
      },
      {
        source: '/es/servidores/:slug',
        destination: '/es/servers/:slug',
      },
      {
        source: '/es/creadores',
        destination: '/es/creators',
      },
      {
        source: '/es/agregar',
        destination: '/es/submit',
      },
      {
        source: '/es/perfil',
        destination: '/es/profile',
      },
      {
        source: '/es/configuracion',
        destination: '/es/settings',
      },
      {
        source: '/es/encuestas',
        destination: '/es/survey',
      },
      {
        source: '/es/encuesta/:slug',
        destination: '/es/survey/:slug',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
