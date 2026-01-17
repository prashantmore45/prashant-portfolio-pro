import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-surface rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-colors"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm">
            {project.type}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, index) => (
            <span key={index} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            <FaGithub /> Code
          </a>
          {project.demo && project.demo !== "Coming Soon" && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-white hover:bg-violet-700 text-sm font-medium transition-colors"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;