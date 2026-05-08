import { useState, useEffect } from 'react';
import { fetchSiteSettings } from '../api/index.js';

export const useSiteSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSiteSettings()
      .then(setSettings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading, error, setSettings };
};
