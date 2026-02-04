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
      // Add more as needed
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
