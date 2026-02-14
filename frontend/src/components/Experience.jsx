import { motion as Motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaCertificate, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaCode } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress } from 'react-icons/si';

// 1. HELPER: Map string names to Icons & Colors 
const getTechInfo = (techName) => {
  const lower = techName.toLowerCase();

  switch (true) {
    case lower.includes('react'): return { icon: FaReact, color: "text-[#61DAFB] bg-[#61DAFB]/10 border-[#61DAFB]/20" };
    case lower.includes('node'): return { icon: FaNodeJs, color: "text-[#339933] bg-[#339933]/10 border-[#339933]/20" };
    case lower.includes('mongo'): return { icon: SiMongodb, color: "text-[#47A248] bg-[#47A248]/10 border-[#47A248]/20" };
    case lower.includes('express'): return { icon: SiExpress, color: "text-white bg-white/10 border-white/20" };
    case lower.includes('tailwind'): return { icon: SiTailwindcss, color: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20" };
    case lower.includes('git'): return { icon: FaGitAlt, color: "text-[#F05032] bg-[#F05032]/10 border-[#F05032]/20" };
    case lower.includes('mern'): return { icon: FaDatabase, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" }; // Special color for MERN
    default: return { icon: FaCode, color: "text-gray-400 bg-white/5 border-white/5" };
  }
};

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Web Development Intern",
      company: "CodSoft",
      period: "Jan 2026 - Feb 2026",
      description: "Completed a 4-week intensive internship focusing on Full-Stack Web Development. Successfully built and deployed two major Level 2 tasks: a feature-rich Job Board Platform with user authentication and an interactive Online Quiz Maker with dynamic scoring logic.",
      tech: ["MERN Stack", "React.js", "Node.js", "MongoDB", "Tailwind CSS", "Git"],
      certificate: "https://drive.google.com/file/d/1AroidMuf59y4zIWZpKAJ5YPlhKvV61z0/view?usp=drivesdk" 
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 md:px-6 relative z-10 bg-black/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center md:text-left"
        >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional <span className="text-primary">Experience</span></h2>
            <p className="text-gray-400 max-w-xl text-lg mx-auto md:mx-0">
                My journey in the tech industry.
            </p>
        </Motion.div>

        <div className="space-y-8">
            {experiences.map((exp, index) => (
                <Motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 md:pl-0"
                >
                    {/* Timeline Line */}
                    <div className="hidden md:block absolute left-[29px] top-0 bottom-0 w-0.5 bg-white/10"></div>
                    
                    <div className="md:flex gap-12 items-start group">
            
                        <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-white/5 border border-white/10 items-center justify-center relative z-10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <FaBriefcase className="text-2xl text-gray-400 group-hover:text-primary transition-colors" />
                        </div>

                        <div className="flex-1 bg-[#18181b] p-6 md:p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] relative group-hover:-translate-y-1 duration-300">
                           
                            <div className="md:hidden absolute left-0 top-8 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent -ml-5 rounded-full"></div>

                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                                    <div className="text-lg text-gray-300 font-medium">{exp.company}</div>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                    <FaCalendarAlt className="text-primary" />
                                    {exp.period}
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-6 border-l-2 border-primary/20 pl-4">
                                {exp.description}
                            </p>

                            {/* TECH SECTION */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {exp.tech.map((t, i) => {
                                    const { icon: Icon, color } = getTechInfo(t);
                                    
                                    return (
                                        <span 
                                            key={i} 
                                            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border transition-colors cursor-default ${color}`}
                                        >
                                            <Icon className="text-sm" />
                                            {t}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="flex gap-4">
                                {exp.certificate && (
                                    <a href={exp.certificate} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-primary pb-0.5 hover:text-primary transition-colors">
                                        <FaCertificate /> View Certificate
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </Motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;