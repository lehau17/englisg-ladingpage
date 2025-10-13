import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://english-master.haudev.io.vn';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/payment/return'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

