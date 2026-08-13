import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick, className = '' }) => {
  return (
    <motion.div
      className={`cursor-pointer group ${className}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={() => onClick(project)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-300"
            loading="lazy"
          />
        )}

        {project.class && (
          <div className="absolute top-3 left-3">
            <span className="font-lexend_exa text-[10px] tracking-[0.2em] uppercase text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              {project.class.name}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-gray-700 text-lg leading-none tracking-widest">•••</span>
        </div>
      </div>

      <div className="pt-3 px-1">
        <h3 className="font-lexend_exa text-sm sm:text-base font-bold text-[#383838] leading-snug line-clamp-2">
          {project.title}
        </h3>
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-lexend_exa text-[9px] tracking-wide uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
              >
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
