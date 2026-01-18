import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';

const ProjectCard = ({ project, className }) => {
  return (
    <Motion.div 
      whileHover={{ y: -5 }}
      className={`group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all shadow-2xl ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        
        <div className="mb-4">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                {project.type}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm md:text-base line-clamp-2 group-hover:line-clamp-none transition-all">
                {project.description}
            </p>
        </div>

        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, index) => (
                    <span key={index} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                        {t}
                    </span>
                ))}
            </div>

            <div className="flex gap-8">
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-primary transition-colors font-medium">
                    <FaGithub /> Source
                </a>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-primary transition-colors font-medium">
                        <FaExternalLinkAlt /> Live Demo
                    </a>
                )}
            </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default ProjectCard;