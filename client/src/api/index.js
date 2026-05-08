import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

// Attach JWT token on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rhc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('rhc_admin_token');
      window.location.href = '/rhc-portfolio/admin/login';
    }
    return Promise.reject(err);
  }
);

// ─── Public endpoints ────────────────────────────────────────────────────────
export const fetchSiteSettings = () => api.get('/site-settings').then((r) => r.data);
export const fetchProjects = (params) => api.get('/projects', { params }).then((r) => r.data);
export const fetchProjectClasses = () => api.get('/project-classes').then((r) => r.data);
export const fetchPublications = () => api.get('/publications').then((r) => r.data);
export const fetchCertifications = () => api.get('/certifications').then((r) => r.data);
export const fetchContact = () => api.get('/contact').then((r) => r.data);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data);

// ─── Admin — Projects ────────────────────────────────────────────────────────
export const createProject = (data) => api.post('/projects', data).then((r) => r.data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ─── Admin — Project Classes ─────────────────────────────────────────────────
export const createProjectClass = (data) => api.post('/project-classes', data).then((r) => r.data);
export const updateProjectClass = (id, data) =>
  api.put(`/project-classes/${id}`, data).then((r) => r.data);
export const deleteProjectClass = (id) => api.delete(`/project-classes/${id}`);

// ─── Admin — Publications ────────────────────────────────────────────────────
export const createPublication = (data) => api.post('/publications', data).then((r) => r.data);
export const updatePublication = (id, data) =>
  api.put(`/publications/${id}`, data).then((r) => r.data);
export const deletePublication = (id) => api.delete(`/publications/${id}`);

// ─── Admin — Certifications ──────────────────────────────────────────────────
export const createCertification = (data) =>
  api.post('/certifications', data).then((r) => r.data);
export const updateCertification = (id, data) =>
  api.put(`/certifications/${id}`, data).then((r) => r.data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

// ─── Admin — Contact ─────────────────────────────────────────────────────────
export const updateContact = (data) => api.put('/contact', data).then((r) => r.data);

// ─── Admin — Site Settings ───────────────────────────────────────────────────
export const upsertSiteSetting = (key, value) =>
  api.put(`/site-settings/${key}`, { value }).then((r) => r.data);

// ─── Admin — Upload ──────────────────────────────────────────────────────────
export const uploadFile = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
};
export const deleteUploadedFile = (publicId) =>
  api.delete('/upload', { data: { publicId } }).then((r) => r.data);

export default api;
