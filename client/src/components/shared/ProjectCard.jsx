import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick, className = '' }) => {
  return (
    <motion.div
      className={`cursor-pointer group ${className}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={() => onClick(project)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#0d1117] aspect-[3/4] shadow-lg w-full">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 transition-opacity duration-300"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />

        {project.class && (
          <div className="absolute top-4 left-4">
            <span className="font-lexend_exa text-[10px] tracking-[0.2em] uppercase text-white/50">
              {project.class.name}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-lexend_exa text-lg sm:text-xl font-black text-white leading-tight line-clamp-3">
            {project.title}
          </h3>
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="font-lexend_exa text-[9px] tracking-wide uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
