import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick, className = '' }) => {
  const placeholderBg = 'bg-gradient-to-br from-gray-700 to-gray-900';

  return (
    <motion.div
      className={`relative rounded-lg shadow-md cursor-pointer overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(project)}
    >
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <div className={`w-full h-full ${placeholderBg}`} />
      )}

      <div className="font-lexend_exa absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
        <h3 className="text-lg font-bold line-clamp-2">{project.title}</h3>
        {project.class && (
          <span className="text-xs mt-1 bg-white/20 px-2 py-0.5 rounded-full">
            {project.class.name}
          </span>
        )}
        <p className="text-xs mt-2 line-clamp-3 opacity-90">{project.description}</p>
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 justify-center">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
