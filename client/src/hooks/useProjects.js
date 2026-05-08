import { useState, useEffect } from 'react';
import { fetchProjects, fetchProjectClasses } from '../api/index.js';

export const useProjects = (params = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProjects(params)
      .then((data) => { if (!cancelled) setProjects(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { projects, loading, error, setProjects };
};

export const useProjectClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectClasses()
      .then(setClasses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { classes, loading, error, setClasses };
};
