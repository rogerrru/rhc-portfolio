import { useState, useEffect } from 'react';
import { fetchPublications } from '../api/index.js';

export const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublications()
      .then(setPublications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { publications, loading, error, setPublications };
};
