import { LandingPageData } from '@/lib/api';

interface StructuredDataProps {
  data: LandingPageData;
}

export default function StructuredData({ data }: StructuredDataProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'EngliMaster',
    description: 'Nền tảng học tiếng Anh trực tuyến hàng đầu Việt Nam',
    url: 'https://english-master.haudev.io.vn',
    logo: 'https://english-master.haudev.io.vn/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-1900-1234',
      contactType: 'Customer Service',
      areaServed: 'VN',
      availableLanguage: ['vi', 'en'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Hà Nội',
    },
    sameAs: [
      // Add social media links if available
    ],
  };

  const courseSchemas = data.classes?.map((classInfo) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Khóa học tiếng Anh ${classInfo.levelVi}`,
    description: classInfo.description,
    provider: {
      '@type': 'Organization',
      name: 'EngliMaster',
    },
    courseCode: classInfo.level,
    educationalLevel: classInfo.level,
    timeRequired: classInfo.duration,
    offers: {
      '@type': 'Offer',
      price: classInfo.price.replace(/[^\d]/g, ''),
      priceCurrency: 'VND',
    },
  })) || [];

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '50000',
    bestRating: '5',
    worstRating: '1',
  };

  const schemas = [
    organizationSchema,
    ...courseSchemas,
    aggregateRatingSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

