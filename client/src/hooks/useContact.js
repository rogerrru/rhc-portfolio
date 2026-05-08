import { useState, useEffect } from 'react';
import { fetchContact } from '../api/index.js';

export const useContact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContact()
      .then(setContact)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { contact, loading, error, setContact };
};
