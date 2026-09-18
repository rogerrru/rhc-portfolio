import React from 'react';

// External-link pills shared by the project summary modal and the full details page.
// Renders a fragment so each caller can place the pills in its own flex row.
const ProjectLinks = ({ link, githubRepo, linkLabel = 'Live Project' }) => (
  <>
    {link && (
      <a href={link} target="_blank" rel="noopener noreferrer"
        className="text-xs bg-black text-white font-bold px-3 py-1 rounded-full hover:bg-gray-700 transition">
        {linkLabel} ↗
      </a>
    )}
    {githubRepo && (
      <a href={githubRepo} target="_blank" rel="noopener noreferrer"
        className="text-xs border border-gray-300 text-gray-700 font-bold px-3 py-1 rounded-full hover:bg-gray-100 transition">
        GitHub ↗
      </a>
    )}
  </>
);

export default ProjectLinks;
