import { useState, useEffect } from 'react';
import { fetchCertifications } from '../api/index.js';

export const useCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertifications()
      .then(setCertifications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { certifications, loading, error, setCertifications };
};
