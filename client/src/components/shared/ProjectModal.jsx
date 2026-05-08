import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const detailPath = `/portfolio/${project._type ?? 'project'}/${project.id}`;
  const skillsList = project.skills?.length ? project.skills : (project.techStack ?? []);

  return (
    <AnimatePresence>
      <motion.div
        className="font-lexend_exa fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full sm:max-w-4xl bg-white sm:rounded-xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-t-2xl"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle on mobile */}
          <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition text-sm"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1">
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full max-h-[28vh] sm:max-h-[40vh] object-cover"
              />
            )}

            <div className="p-5 sm:p-8">
              <div className="mb-3">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug pr-10">
                  {project.title}
                </h3>
                {project.class && (
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {project.class.name}
                  </span>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed font-lexend_exa text-sm sm:text-base">
                {project.description}
              </p>

              {skillsList.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillsList.map((t) => (
                    <span key={t} className="text-xs bg-black text-white px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to={detailPath}
                  onClick={onClose}
                  className="inline-block bg-black text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition"
                >
                  View Full Details →
                </Link>

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold underline hover:text-gray-500">
                    Live Project
                  </a>
                )}
                {project.githubRepo && (
                  <a href={project.githubRepo} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold underline hover:text-gray-500">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
