import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { upsertSiteSetting, updateContact, uploadFile } from '../../api/index.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';
import { useContact } from '../../hooks/useContact.js';
import LoadingSpinner from '../../components/shared/LoadingSpinner.jsx';

const SettingsAdmin = () => {
  const { settings, loading: settingsLoading, setSettings } = useSiteSettings();
  const { contact, loading: contactLoading, setContact } = useContact();

  const [siteForm, setSiteForm] = useState({});
  const [contactForm, setContactForm] = useState({});
  const [saving, setSaving] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!settingsLoading) setSiteForm(settings);
  }, [settings, settingsLoading]);

  useEffect(() => {
    if (!contactLoading && contact) setContactForm(contact);
  }, [contact, contactLoading]);

  const handleSiteChange = (key, value) =>
    setSiteForm((f) => ({ ...f, [key]: value }));

  const handleSaveSite = async (key) => {
    setSaving(key);
    try {
      await upsertSiteSetting(key, siteForm[key]);
      setSettings((prev) => ({ ...prev, [key]: siteForm[key] }));
      toast.success('Saved');
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving('');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFile(file);
      setSiteForm((f) => ({ ...f, resume_url: url }));
      await upsertSiteSetting('resume_url', url);
      setSettings((prev) => ({ ...prev, resume_url: url }));
      toast.success('Resume uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setSaving('contact');
    try {
      const updated = await updateContact(contactForm);
      setContact(updated);
      toast.success('Contact details saved');
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving('');
    }
  };

  if (settingsLoading || contactLoading) return <LoadingSpinner />;

  const textSettings = [
    { key: 'home_hero_title', label: 'Hero Title', multiline: false },
    { key: 'home_hero_description', label: 'Hero Description', multiline: true },
    { key: 'home_projects_description', label: 'Projects Section Description', multiline: true },
    { key: 'resume_intro', label: 'Resume Intro Text', multiline: true },
    { key: 'meta_description', label: 'SEO Meta Description', multiline: false },
  ];

  return (
    <div className="space-y-10">
      <h2 className="font-lexend_exa text-2xl font-black">SETTINGS</h2>

      {/* Site text settings */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
        <h3 className="font-lexend_exa font-black text-lg">SITE CONTENT</h3>
        {textSettings.map(({ key, label, multiline }) => (
          <div key={key}>
            <label className="admin-label">{label}</label>
            {multiline ? (
              <textarea
                rows={4}
                value={siteForm[key] || ''}
                onChange={(e) => handleSiteChange(key, e.target.value)}
                className="admin-input"
              />
            ) : (
              <input
                type="text"
                value={siteForm[key] || ''}
                onChange={(e) => handleSiteChange(key, e.target.value)}
                className="admin-input"
              />
            )}
            <button
              onClick={() => handleSaveSite(key)}
              disabled={saving === key}
              className="mt-2 font-lexend_exa text-xs bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              {saving === key ? 'Saving…' : 'Save'}
            </button>
          </div>
        ))}
      </section>

      {/* Resume upload */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-lexend_exa font-black text-lg">RESUME FILE</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <input type="file" accept="image/*,application/pdf" onChange={handleResumeUpload} className="text-sm" />
          {uploading && <span className="text-xs text-gray-400">Uploading…</span>}
        </div>
        {siteForm.resume_url && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Current resume URL:</p>
            <a href={siteForm.resume_url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-gray-700 break-all">
              {siteForm.resume_url}
            </a>
          </div>
        )}
        <div>
          <label className="admin-label">Or paste URL directly</label>
          <input
            type="url"
            value={siteForm.resume_url || ''}
            onChange={(e) => handleSiteChange('resume_url', e.target.value)}
            className="admin-input"
          />
          <button
            onClick={() => handleSaveSite('resume_url')}
            disabled={saving === 'resume_url'}
            className="mt-2 font-lexend_exa text-xs bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {saving === 'resume_url' ? 'Saving…' : 'Save URL'}
          </button>
        </div>
      </section>

      {/* Contact details */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-lexend_exa font-black text-lg mb-6">CONTACT DETAILS</h3>
        <form onSubmit={handleSaveContact} className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
            { name: 'github', label: 'GitHub URL', type: 'url' },
            { name: 'location', label: 'Location' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label className="admin-label">{label}</label>
              <input
                type={type}
                name={name}
                value={contactForm[name] || ''}
                onChange={(e) => setContactForm((f) => ({ ...f, [name]: e.target.value }))}
                className="admin-input"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <button type="submit" disabled={saving === 'contact'} className="font-lexend_exa bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
              {saving === 'contact' ? 'Saving…' : 'Save Contact Details'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SettingsAdmin;
