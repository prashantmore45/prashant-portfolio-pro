import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiRedux, SiFirebase, SiTypescript, SiNextdotjs } from 'react-icons/si'; // You might need to install: npm install react-icons
import { motion as Motion} from 'framer-motion';
import { FaCode } from 'react-icons/fa';

// 1.Map string names to Icons & Colors
const getTechInfo = (techName) => {

  const lower = techName.toLowerCase();

  switch (true) {
    case lower.includes('react'): return { icon: FaReact, color: "text-[#61DAFB] bg-[#61DAFB]/10 border-[#61DAFB]/20" };
    case lower.includes('node'): return { icon: FaNodeJs, color: "text-[#339933] bg-[#339933]/10 border-[#339933]/20" };
    case lower.includes('mongo'): return { icon: SiMongodb, color: "text-[#47A248] bg-[#47A248]/10 border-[#47A248]/20" };
    case lower.includes('express'): return { icon: SiExpress, color: "text-white bg-white/10 border-white/20" };
    case lower.includes('tailwind'): return { icon: SiTailwindcss, color: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20" };
    case lower.includes('redux'): return { icon: SiRedux, color: "text-[#764ABC] bg-[#764ABC]/10 border-[#764ABC]/20" };
    case lower.includes('firebase'): return { icon: SiFirebase, color: "text-[#FFCA28] bg-[#FFCA28]/10 border-[#FFCA28]/20" };
    case lower.includes('typescript'): return { icon: SiTypescript, color: "text-[#3178C6] bg-[#3178C6]/10 border-[#3178C6]/20" };
    case lower.includes('next'): return { icon: SiNextdotjs, color: "text-white bg-white/10 border-white/20" };
    case lower.includes('python'): return { icon: FaPython, color: "text-[#3776AB] bg-[#3776AB]/10 border-[#3776AB]/20" };
    case lower.includes('sql') || lower.includes('database'): return { icon: FaDatabase, color: "text-gray-400 bg-gray-500/10 border-gray-500/20" };
    case lower.includes('html'): return { icon: FaHtml5, color: "text-[#E34F26] bg-[#E34F26]/10 border-[#E34F26]/20" };
    case lower.includes('css'): return { icon: FaCss3Alt, color: "text-[#1572B6] bg-[#1572B6]/10 border-[#1572B6]/20" };
    case lower.includes('js') || lower.includes('javascript'): return { icon: FaJs, color: "text-[#F7DF1E] bg-[#F7DF1E]/10 border-[#F7DF1E]/20" };
    
    // Default Fallback Gray
    default: return { icon: FaCode, color: "text-gray-400 bg-white/5 border-white/5" };
  }
};


const ProjectCard = ({ project, theme }) => {
  // Default theme fallback
  const currentTheme = theme || {
    badge: "bg-primary/20 text-primary border-primary/20",
    hoverBorder: "hover:border-primary/50",
    button: "bg-primary/20 text-primary hover:bg-primary hover:text-white",
    shadow: "hover:shadow-primary/20"
  };

  return (
    <Motion.div 
      whileHover={{ y: -5 }}
      className={`group flex flex-col h-full bg-[#18181b] rounded-3xl overflow-hidden border border-white/10 ${currentTheme.hoverBorder} transition-all duration-300 shadow-lg ${currentTheme.shadow}`}
    >
      {/* 1. Image Section */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent opacity-80" />
        
        <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full border ${currentTheme.badge}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {project.type}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
            </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {project.tech.map((t, index) => {
                const { icon: Icon, color } = getTechInfo(t); 
                return (
                    <span 
                        key={index} 
                        className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md border transition-colors ${color}`}
                    >
                        <Icon className="text-sm" /> 
                        {t}
                    </span>
                );
            })}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-4">
            <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl bg-white/5 hover:bg-white hover:text-black transition-all border border-white/5"
            >
                <FaGithub /> Code
            </a>
            {project.demo && (
                <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl transition-all ${currentTheme.button}`}
                >
                    <FaExternalLinkAlt /> Live
                </a>
            )}
        </div>
      </div>
    </Motion.div>
  );
};

export default ProjectCard;