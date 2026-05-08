import React from 'react';

// React 19 automatically hoists <title>, <meta>, and <link> to <head>.
// No external library needed.
const SEOHead = ({ title, description, image, url }) => {
  const siteName = 'Roger Chegyem | Portfolio';
  const fullTitle = title ? `${title} | Roger Chegyem` : siteName;
  const defaultDesc =
    'Roger Jr. H. Chegyem — Full-Stack Developer, Data Analyst, and Machine Learning Engineer based in Baguio City, Philippines.';
  const desc = description || defaultDesc;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}

      {url && <link rel="canonical" href={url} />}
    </>
  );
};

export default SEOHead;
