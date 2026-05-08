import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="font-lexend_exa fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
            aria-label="Close modal"
          >
            ✕
          </button>

          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full max-h-[50vh] object-cover"
            />
          )}

          <div className="p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                {project.class && (
                  <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {project.class.name}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">{project.description}</p>

            {project.techStack?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs bg-black text-white px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold underline hover:text-gray-600"
                >
                  View Project
                </a>
              )}
              {project.githubRepo && (
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold underline hover:text-gray-600"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
