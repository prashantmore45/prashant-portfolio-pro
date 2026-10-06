import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaDatabase, FaHtml5, FaCss3Alt, FaJs, FaBriefcase } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiRedux, SiFirebase, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { motion as Motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

// 1. Map string names to Icons & Colors
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
    const isInternship = project.tech.some(t =>
        t.toLowerCase() === 'codsoft' || t.toLowerCase() === 'internship'
    );

    // FILTER
    const visibleTech = project.tech.filter(t =>
        t.toLowerCase() !== 'codsoft' && t.toLowerCase() !== 'internship'
    );

    const currentTheme = theme || {
        badge: "bg-primary/20 text-primary border-primary/20",
        hoverBorder: "hover:border-primary/50",
        button: "bg-primary/20 text-primary hover:bg-primary hover:text-white",
        shadow: "hover:shadow-primary/20"
    };

    return (
        <Motion.div
            whileHover={{ y: -5 }}
            className={`
        group flex flex-col h-full bg-[#18181b] rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg
        ${isInternship
                    ? 'border-amber-500/30 hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                    : `border-white/10 ${currentTheme.hoverBorder} ${currentTheme.shadow}`
                }
      `}
        >
            {/* 1. Image Section (macOS Browser Frame) */}
            <div className="relative h-48 sm:h-56 md:h-72 w-full pt-5 sm:pt-6 px-3 sm:px-6 bg-[#18181b]">
                <div className="w-full h-full bg-[#09090b] rounded-t-xl sm:rounded-t-2xl overflow-hidden border border-white/10 border-b-0 flex flex-col relative shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">

                    {/* Browser Header Bar */}
                    <div className="h-5 sm:h-8 bg-[#1e1e24] w-full flex items-center px-2 sm:px-3 gap-1 sm:gap-1.5 relative z-10 border-b border-white/5">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27c93f]"></div>
                        {/* Minimalist address bar */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-1/3 max-w-[120px] sm:max-w-[150px] h-1.5 sm:h-3 bg-black/20 rounded-full"></div>
                    </div>

                    {/* Project Image inside the browser */}
                    <div className="relative flex-1 w-full overflow-hidden">
                        <OptimizedImage
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-all duration-[3000ms] ease-in-out hover:object-bottom"
                        />
                        {/* Gradient to blend image smoothly into the bottom content section */}
                        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-[#18181b] to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* TYPE BADGE */}
                <div className={`absolute top-2 left-3 sm:left-6 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full border shadow-xl z-20 ${currentTheme.badge} bg-black/50`}>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                        {project.type}
                    </span>
                </div>

                {/* INTERNSHIP BADGE */}
                {isInternship && (
                    <div className="absolute top-2 right-3 sm:right-6 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-amber-500/50 bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-1 sm:gap-2 z-20">
                        <FaBriefcase className="text-amber-400 text-[10px] sm:text-xs" />
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300">
                            CodSoft Work
                        </span>
                    </div>
                )}
            </div>

            {/* 2. Content Section */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-2 leading-tight ${isInternship ? 'text-white group-hover:text-amber-400' : 'text-white'}`}>
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {visibleTech.map((t, index) => {
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
                <div className="mt-auto flex gap-2 sm:gap-4">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-[12px] sm:text-sm font-bold py-2.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white hover:text-black transition-all border border-white/5"
                    >
                        <FaGithub className="text-xs sm:text-sm" /> Code
                    </a>
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-[12px] sm:text-sm font-bold py-2.5 sm:py-3 rounded-xl transition-all 
                        ${isInternship
                                    ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/20'
                                    : currentTheme.button
                                }`}
                        >
                            <FaExternalLinkAlt className="text-xs sm:text-sm" /> Live
                        </a>
                    )}
                </div>
            </div>
        </Motion.div>
    );
};

export default ProjectCard;