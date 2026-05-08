import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createCertification, updateCertification, deleteCertification, uploadFile } from '../../api/index.js';
import { useCertifications } from '../../hooks/useCertifications.js';
import LoadingSpinner from '../../components/shared/LoadingSpinner.jsx';

const EMPTY = { name: '', organization: '', issuedAt: '', badgeUrl: '', credentialUrl: '' };

const CertificationsAdmin = () => {
  const { certifications, loading, setCertifications } = useCertifications();
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleBadgeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFile(file);
      setForm((f) => ({ ...f, badgeUrl: url }));
      toast.success('Badge uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        const updated = await updateCertification(editId, form);
        setCertifications((prev) => prev.map((c) => (c.id === editId ? updated : c)));
        toast.success('Updated');
      } else {
        const created = await createCertification(form);
        setCertifications((prev) => [...prev, created]);
        toast.success('Created');
      }
      setForm(EMPTY);
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cert) => {
    setForm({ ...cert, issuedAt: cert.issuedAt?.split('T')[0] || '' });
    setEditId(cert.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await deleteCertification(id);
      setCertifications((prev) => prev.filter((c) => c.id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="font-lexend_exa text-2xl font-black">CERTIFICATIONS</h2>
        <button
          onClick={() => { setForm(EMPTY); setEditId(null); setShowForm((v) => !v); }}
          className="font-lexend_exa text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {showForm ? 'Cancel' : '+ Add Certification'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-lexend_exa font-black">{editId ? 'EDIT CERTIFICATION' : 'NEW CERTIFICATION'}</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Certification Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Issuing Organization</label>
              <input name="organization" value={form.organization} onChange={handleChange} required className="admin-input" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Issue Date</label>
              <input type="date" name="issuedAt" value={form.issuedAt} onChange={handleChange} required className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Credential URL</label>
              <input type="url" name="credentialUrl" value={form.credentialUrl} onChange={handleChange} className="admin-input" />
            </div>
          </div>

          <div>
            <label className="admin-label">Badge Image</label>
            <div className="flex gap-3 items-center flex-wrap">
              <input type="file" accept="image/*" onChange={handleBadgeUpload} className="text-sm" />
              {uploading && <span className="text-xs text-gray-400">Uploading…</span>}
              {form.badgeUrl && <img src={form.badgeUrl} alt="badge" className="h-16 w-16 object-contain rounded" />}
            </div>
            <input type="url" name="badgeUrl" value={form.badgeUrl} onChange={handleChange} placeholder="Or paste URL" className="admin-input mt-2" />
          </div>

          <button type="submit" disabled={saving} className="font-lexend_exa bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving…' : editId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center">
            {cert.badgeUrl && <img src={cert.badgeUrl} alt={cert.name} className="w-12 h-12 object-contain rounded shrink-0" />}
            <div className="flex-1">
              <p className="font-lexend_exa font-black text-sm">{cert.name}</p>
              <p className="text-xs text-gray-500">{cert.organization} · {new Date(cert.issuedAt).getFullYear()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(cert)} className="text-xs font-lexend_exa underline">Edit</button>
              <button onClick={() => handleDelete(cert.id)} className="text-xs font-lexend_exa text-red-500 underline">Delete</button>
            </div>
          </div>
        ))}
        {certifications.length === 0 && <p className="text-center text-gray-400 font-lexend_exa text-sm py-10">No certifications yet.</p>}
      </div>
    </div>
  );
};

export default CertificationsAdmin;
