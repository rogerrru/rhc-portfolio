import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, image, url }) => {
  const siteName = 'Roger Chegyem | Portfolio';
  const fullTitle = title ? `${title} | Roger Chegyem` : siteName;
  const defaultDesc =
    'Roger Jr. H. Chegyem — Full-Stack Developer, Data Analyst, and Machine Learning Engineer based in Baguio City, Philippines.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default SEOHead;
