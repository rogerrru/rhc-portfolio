import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  createProject,
  updateProject,
  deleteProject,
  createProjectClass,
  updateProjectClass,
  deleteProjectClass,
  uploadFile,
} from '../../api/index.js';
import { useProjects, useProjectClasses } from '../../hooks/useProjects.js';
import LoadingSpinner from '../../components/shared/LoadingSpinner.jsx';

const EMPTY_PROJECT = {
  title: '',
  description: '',
  about: '',
  whatWeDid: '',
  takeaways: '',
  highlights: '',
  skills: '',
  team: '',
  duration: '',
  imageUrl: '',
  screenshots: [],
  techStack: '',
  link: '',
  githubRepo: '',
  classId: '',
  featured: false,
  order: 0,
};

const ProjectsAdmin = () => {
  const { projects, loading, setProjects } = useProjects();
  const { classes, setClasses } = useProjectClasses();

  const [form, setForm] = useState(EMPTY_PROJECT);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [classForm, setClassForm] = useState({ name: '', slug: '' });
  const [addingClass, setAddingClass] = useState(false);

  const openAdd = () => {
    setForm(EMPTY_PROJECT);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (project) => {
    setForm({
      ...project,
      techStack:  project.techStack?.join(', ') || '',
      skills:     project.skills?.join(', ') || '',
      takeaways:  project.takeaways?.join('\n') || '',
      highlights: project.highlights?.join('\n') || '',
      screenshots: project.screenshots ?? [],
      classId: project.classId?.toString() || '',
    });
    setEditId(project.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(EMPTY_PROJECT);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleScreenshotUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingScreenshot(true);
    try {
      const { url } = await uploadFile(file);
      setForm((f) => ({ ...f, screenshots: [...f.screenshots, url] }));
      toast.success('Screenshot uploaded');
    } catch {
      toast.error('Screenshot upload failed');
    } finally {
      setUploadingScreenshot(false);
      e.target.value = '';
    }
  };

  const removeScreenshot = (idx) => {
    setForm((f) => ({ ...f, screenshots: f.screenshots.filter((_, i) => i !== idx) }));
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
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const splitCSV = (s) => (s || '').split('\n').map((t) => t.trim()).filter(Boolean);
    const payload = {
      ...form,
      techStack:  form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      skills:     form.skills.split(',').map((t) => t.trim()).filter(Boolean),
      takeaways:  splitCSV(form.takeaways),
      highlights: splitCSV(form.highlights),
      screenshots: form.screenshots,
      classId: parseInt(form.classId),
      order: parseInt(form.order) || 0,
    };
    try {
      if (editId) {
        const updated = await updateProject(editId, payload);
        setProjects((prev) => prev.map((p) => (p.id === editId ? updated : p)));
        toast.success('Project updated');
      } else {
        const created = await createProject(payload);
        setProjects((prev) => [...prev, created]);
        toast.success('Project created');
      }
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    setAddingClass(true);
    try {
      const cls = await createProjectClass({
        name: classForm.name,
        slug: classForm.slug || classForm.name.toLowerCase().replace(/\s+/g, '-'),
      });
      setClasses((prev) => [...prev, cls]);
      setClassForm({ name: '', slug: '' });
      toast.success('Class added');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add class');
    } finally {
      setAddingClass(false);
    }
  };

  const handleDeleteClass = async (id) => {
    if (!confirm('Delete this class? Projects in this class will be unlinked.')) return;
    try {
      await deleteProjectClass(id);
      setClasses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Class deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleMoveClass = async (cls, direction) => {
    const sorted = [...classes].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((c) => c.id === cls.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    try {
      await Promise.all([
        updateProjectClass(cls.id, { order: other.order }),
        updateProjectClass(other.id, { order: cls.order }),
      ]);
      setClasses((prev) =>
        prev.map((c) => {
          if (c.id === cls.id) return { ...c, order: other.order };
          if (c.id === other.id) return { ...c, order: cls.order };
          return c;
        })
      );
    } catch {
      toast.error('Reorder failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="font-lexend_exa text-2xl font-black">PROJECTS</h2>
        <button
          onClick={openAdd}
          className="font-lexend_exa text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Project
        </button>
      </div>

      {/* Project classes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-lexend_exa font-black mb-4">PROJECT CLASSES</h3>
        <form onSubmit={handleAddClass} className="flex gap-3 flex-wrap mb-4">
          <input placeholder="Class name" value={classForm.name} onChange={(e) => setClassForm((f) => ({ ...f, name: e.target.value }))} required className="admin-input flex-1 min-w-[150px]" />
          <input placeholder="Slug (optional)" value={classForm.slug} onChange={(e) => setClassForm((f) => ({ ...f, slug: e.target.value }))} className="admin-input w-36" />
          <button type="submit" disabled={addingClass} className="font-lexend_exa bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50">
            {addingClass ? '…' : 'Add'}
          </button>
        </form>
        <div className="space-y-2">
          {[...classes].sort((a, b) => a.order - b.order).map((c, idx, arr) => (
            <div key={c.id} className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2.5">
              <div className="flex flex-col gap-0.5 shrink-0">
                <button onClick={() => handleMoveClass(c, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-black disabled:opacity-20 leading-none text-xs" title="Move up">▲</button>
                <button onClick={() => handleMoveClass(c, 'down')} disabled={idx === arr.length - 1} className="text-gray-400 hover:text-black disabled:opacity-20 leading-none text-xs" title="Move down">▼</button>
              </div>
              <span className="font-lexend_exa text-sm flex-1">{c.name}</span>
              <span className="font-lexend_exa text-xs text-gray-400">order {c.order}</span>
              <button onClick={() => handleDeleteClass(c.id)} className="text-red-400 hover:text-red-600 text-xs font-lexend_exa">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Project list */}
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-start">
            {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-16 h-16 rounded object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-lexend_exa font-black text-sm">{p.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{p.class?.name} {p.featured && '· Featured'}</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.techStack?.map((t) => <span key={t} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="text-xs font-lexend_exa underline hover:text-gray-500">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-xs font-lexend_exa text-red-500 underline hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-center text-gray-400 font-lexend_exa text-sm py-10">No projects yet.</p>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
              <h3 className="font-lexend_exa font-black">{editId ? 'EDIT PROJECT' : 'NEW PROJECT'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-black text-xl leading-none">✕</button>
            </div>

            {/* Scrollable form body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
                <div>
                  <label className="admin-label">Class</label>
                  <select name="classId" value={form.classId} onChange={handleChange} required className="admin-input">
                    <option value="">Select class…</option>
                    {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} required className="admin-input" />
              </div>

              <div>
                <label className="admin-label">About (extended description for detail page)</label>
                <textarea name="about" value={form.about} onChange={handleChange} rows={4} className="admin-input" />
              </div>

              <div>
                <label className="admin-label">What We Did</label>
                <textarea name="whatWeDid" value={form.whatWeDid} onChange={handleChange} rows={3} className="admin-input" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Takeaways (one per line)</label>
                  <textarea name="takeaways" value={form.takeaways} onChange={handleChange} rows={4} className="admin-input" placeholder={"Learned X\nImproved Y\nAchieved Z"} />
                </div>
                <div>
                  <label className="admin-label">Highlights (one per line)</label>
                  <textarea name="highlights" value={form.highlights} onChange={handleChange} rows={4} className="admin-input" placeholder={"Feature A\nAchievement B"} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Tech Stack (comma-separated)" name="techStack" value={form.techStack} onChange={handleChange} />
                <Field label="Skills / Focus (comma-separated)" name="skills" value={form.skills} onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Team (number or description, '1' = solo)" name="team" value={form.team} onChange={handleChange} />
                <Field label="Duration (e.g. 3 months)" name="duration" value={form.duration} onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Live Link" name="link" value={form.link} onChange={handleChange} />
                <Field label="GitHub Repo" name="githubRepo" value={form.githubRepo} onChange={handleChange} />
              </div>

              <Field label="Order" name="order" type="number" value={form.order} onChange={handleChange} />

              <div>
                <label className="admin-label">Cover Image</label>
                <div className="flex gap-3 items-center flex-wrap">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
                  {uploading && <span className="text-xs text-gray-400">Uploading…</span>}
                  {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-16 w-16 object-cover rounded" />}
                </div>
                <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Or paste Cloudinary URL" className="admin-input mt-2" />
              </div>

              <div>
                <label className="admin-label">Screenshots</label>
                <div className="flex gap-3 items-center flex-wrap mb-3">
                  <label className="cursor-pointer font-lexend_exa text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition">
                    {uploadingScreenshot ? 'Uploading…' : '+ Add Screenshot'}
                    <input type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" disabled={uploadingScreenshot} />
                  </label>
                </div>
                {form.screenshots.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {form.screenshots.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img src={url} alt={`screenshot ${idx + 1}`} className="h-20 w-28 object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeScreenshot(idx)}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 font-lexend_exa text-sm cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded" />
                Featured on Home page
              </label>
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

const Field = ({ label, name, value, onChange, type = 'text', required }) => (
  <div>
    <label className="admin-label">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} className="admin-input" />
  </div>
);

export default ProjectsAdmin;
