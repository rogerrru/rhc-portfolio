import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects, useProjectClasses } from '../../hooks/useProjects.js';
import { usePublications } from '../../hooks/usePublications.js';
import { useCertifications } from '../../hooks/useCertifications.js';

const StatCard = ({ label, count, to }) => (
  <Link
    to={to}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group"
  >
    <p className="font-lexend_exa text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="font-lexend_exa text-4xl font-black mt-2 group-hover:scale-105 transition-transform">{count}</p>
  </Link>
);

const Dashboard = () => {
  const { projects } = useProjects();
  const { classes } = useProjectClasses();
  const { publications } = usePublications();
  const { certifications } = useCertifications();

  return (
    <div>
      <h2 className="font-lexend_exa text-2xl font-black mb-8">DASHBOARD</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Projects" count={projects.length} to="/admin/projects" />
        <StatCard label="Classes" count={classes.length} to="/admin/projects" />
        <StatCard label="Publications" count={publications.length} to="/admin/publications" />
        <StatCard label="Certifications" count={certifications.length} to="/admin/certifications" />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-lexend_exa font-black mb-4">QUICK LINKS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Project', to: '/admin/projects' },
            { label: 'Add Publication', to: '/admin/publications' },
            { label: 'Add Certification', to: '/admin/certifications' },
            { label: 'Edit Settings', to: '/admin/settings' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="font-lexend_exa text-sm font-semibold bg-gray-900 text-white rounded-lg px-4 py-3 text-center hover:bg-gray-700 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
