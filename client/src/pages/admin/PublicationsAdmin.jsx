import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createPublication, updatePublication, deletePublication, uploadFile } from '../../api/index.js';
import { usePublications } from '../../hooks/usePublications.js';
import LoadingSpinner from '../../components/shared/LoadingSpinner.jsx';

const EMPTY = {
  title: '', summary: '', about: '', whatWeDid: '',
  takeaways: '', highlights: '', skills: '',
  team: '', duration: '',
  coAuthors: '', link: '', imageUrl: '', publishedAt: '',
};

const PublicationsAdmin = () => {
  const { publications, loading, setPublications } = usePublications();
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFile(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const splitCSV = (s) => (s || '').split(',').map((t) => t.trim()).filter(Boolean);
    const splitLines = (s) => (s || '').split('\n').map((t) => t.trim()).filter(Boolean);
    const payload = {
      ...form,
      coAuthors:  splitCSV(form.coAuthors),
      skills:     splitCSV(form.skills),
      takeaways:  splitLines(form.takeaways),
      highlights: splitLines(form.highlights),
    };
    try {
      if (editId) {
        const updated = await updatePublication(editId, payload);
        setPublications((prev) => prev.map((p) => (p.id === editId ? updated : p)));
        toast.success('Publication updated');
      } else {
        const created = await createPublication(payload);
        setPublications((prev) => [...prev, created]);
        toast.success('Publication created');
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

  const handleEdit = (pub) => {
    setForm({
      ...pub,
      coAuthors:  pub.coAuthors?.join(', ') || '',
      skills:     pub.skills?.join(', ') || '',
      takeaways:  pub.takeaways?.join('\n') || '',
      highlights: pub.highlights?.join('\n') || '',
      publishedAt: pub.publishedAt?.split('T')[0] || '',
    });
    setEditId(pub.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this publication?')) return;
    try {
      await deletePublication(id);
      setPublications((prev) => prev.filter((p) => p.id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="font-lexend_exa text-2xl font-black">PUBLICATIONS</h2>
        <button
          onClick={() => { setForm(EMPTY); setEditId(null); setShowForm((v) => !v); }}
          className="font-lexend_exa text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {showForm ? 'Cancel' : '+ Add Publication'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-lexend_exa font-black">{editId ? 'EDIT PUBLICATION' : 'NEW PUBLICATION'}</h3>

          <div>
            <label className="admin-label">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="admin-input" />
          </div>

          <div>
            <label className="admin-label">Summary / Abstract (shown in portfolio grid)</label>
            <textarea name="summary" value={form.summary} onChange={handleChange} rows={3} required className="admin-input" />
          </div>

          <div>
            <label className="admin-label">About (extended text for detail page)</label>
            <textarea name="about" value={form.about} onChange={handleChange} rows={4} className="admin-input" />
          </div>

          <div>
            <label className="admin-label">What We Did</label>
            <textarea name="whatWeDid" value={form.whatWeDid} onChange={handleChange} rows={3} className="admin-input" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Takeaways (one per line)</label>
              <textarea name="takeaways" value={form.takeaways} onChange={handleChange} rows={4} className="admin-input" placeholder="Insight A&#10;Insight B" />
            </div>
            <div>
              <label className="admin-label">Highlights (one per line)</label>
              <textarea name="highlights" value={form.highlights} onChange={handleChange} rows={4} className="admin-input" placeholder="Finding X&#10;Result Y" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Skills / Methods (comma-separated)</label>
              <input name="skills" value={form.skills} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} className="admin-input" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Co-Authors (comma-separated)</label>
              <input name="coAuthors" value={form.coAuthors} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Published Date</label>
              <input type="date" name="publishedAt" value={form.publishedAt} onChange={handleChange} className="admin-input" />
            </div>
          </div>

          <div>
            <label className="admin-label">Link (DOI / URL)</label>
            <input type="url" name="link" value={form.link} onChange={handleChange} className="admin-input" />
          </div>

          <div>
            <label className="admin-label">Cover Image</label>
            <div className="flex gap-3 items-center flex-wrap">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
              {uploading && <span className="text-xs text-gray-400">Uploading…</span>}
              {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-16 w-16 object-cover rounded" />}
            </div>
            <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Or paste URL" className="admin-input mt-2" />
          </div>

          <button type="submit" disabled={saving} className="font-lexend_exa bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving…' : editId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {publications.map((pub) => (
          <div key={pub.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex gap-4 items-start">
              {pub.imageUrl && <img src={pub.imageUrl} alt={pub.title} className="w-16 h-16 object-cover rounded shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-lexend_exa font-black text-sm leading-snug">{pub.title}</p>
                {pub.coAuthors?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">{pub.coAuthors.join(', ')}</p>
                )}
                <p className="text-xs text-gray-600 mt-2 line-clamp-3">{pub.summary}</p>
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-xs underline text-gray-500 mt-1 inline-block">
                    View →
                  </a>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(pub)} className="text-xs font-lexend_exa underline">Edit</button>
                <button onClick={() => handleDelete(pub.id)} className="text-xs font-lexend_exa text-red-500 underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {publications.length === 0 && <p className="text-center text-gray-400 font-lexend_exa text-sm py-10">No publications yet.</p>}
      </div>
    </div>
  );
};

export default PublicationsAdmin;
