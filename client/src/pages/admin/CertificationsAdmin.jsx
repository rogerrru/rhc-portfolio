import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { createCertification, updateCertification, deleteCertification, uploadFile } from '../../api/index.js';
import { useCertifications } from '../../hooks/useCertifications.js';
import LoadingSpinner from '../../components/shared/LoadingSpinner.jsx';

const EMPTY = { name: '', organization: '', issuedAt: '', badgeUrl: '', credentialUrl: '' };

const validate = (form) => {
  if (!form.name.trim()) return 'Certification name is required.';
  if (!form.organization.trim()) return 'Issuing organization is required.';
  if (!form.issuedAt) return 'Issue date is required.';
  return null;
};

const CertificationsAdmin = () => {
  const { certifications, loading, setCertifications } = useCertifications();
  const [form, setForm] = useState(EMPTY);
  const [initialForm, setInitialForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dragStartedOnBackdrop = useRef(false);

  const isDirty = () => JSON.stringify(form) !== JSON.stringify(initialForm);

  const openAdd = () => {
    setForm(EMPTY);
    setInitialForm(EMPTY);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (cert) => {
    const f = { ...cert, issuedAt: cert.issuedAt?.split('T')[0] || '' };
    setForm(f);
    setInitialForm(f);
    setEditId(cert.id);
    setShowModal(true);
  };

  const closeModal = () => {
    if (isDirty() && !confirm('You have unsaved changes. Close anyway?')) return;
    setShowModal(false);
    setForm(EMPTY);
    setInitialForm(EMPTY);
    setEditId(null);
  };

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
    const error = validate(form);
    if (error) { toast.error(error); return; }
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
      setShowModal(false);
      setForm(EMPTY);
      setInitialForm(EMPTY);
      setEditId(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
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
          onClick={openAdd}
          className="font-lexend_exa text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Certification
        </button>
      </div>

      <div className="grid gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center">
            {cert.badgeUrl && <img src={cert.badgeUrl} alt={cert.name} className="w-12 h-12 object-contain rounded shrink-0" />}
            <div className="flex-1">
              <p className="font-lexend_exa font-black text-sm">{cert.name}</p>
              <p className="text-xs text-gray-500">{cert.organization} · {new Date(cert.issuedAt).getFullYear()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(cert)} className="text-xs font-lexend_exa underline">Edit</button>
              <button onClick={() => handleDelete(cert.id)} className="text-xs font-lexend_exa text-red-500 underline">Delete</button>
            </div>
          </div>
        ))}
        {certifications.length === 0 && <p className="text-center text-gray-400 font-lexend_exa text-sm py-10">No certifications yet.</p>}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(e) => { dragStartedOnBackdrop.current = e.target === e.currentTarget; }}
          onClick={() => { if (dragStartedOnBackdrop.current) closeModal(); }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
              <h3 className="font-lexend_exa font-black">{editId ? 'EDIT CERTIFICATION' : 'NEW CERTIFICATION'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-black text-xl leading-none">✕</button>
            </div>

            {/* Scrollable form body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Certification Name <span className="text-red-500">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} className="admin-input" placeholder="e.g. AWS Solutions Architect" />
                </div>
                <div>
                  <label className="admin-label">Issuing Organization <span className="text-red-500">*</span></label>
                  <input name="organization" value={form.organization} onChange={handleChange} className="admin-input" placeholder="e.g. Amazon Web Services" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Issue Date <span className="text-red-500">*</span></label>
                  <input type="date" name="issuedAt" value={form.issuedAt} onChange={handleChange} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Credential URL</label>
                  <input type="url" name="credentialUrl" value={form.credentialUrl} onChange={handleChange} className="admin-input" placeholder="https://…" />
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
            </form>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex gap-3 justify-end">
              <button type="button" onClick={closeModal} className="font-lexend_exa text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="font-lexend_exa bg-black text-white text-sm px-6 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {saving ? 'Saving…' : editId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsAdmin;
