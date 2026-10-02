import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJava, FaPython } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiCplusplus, SiTypescript, SiMysql, SiDocker, SiLinux, SiPostman } from "react-icons/si";

const bentoCategories = [
  {
    title: "Frontend Engineering",
    description: "Building responsive and interactive user interfaces with modern frameworks.",
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5",
    border: "hover:border-violet-500/50",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
    items: [
      { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    ]
  },
  {
    title: "Backend & Databases",
    description: "Developing scalable APIs and managing data structures.",
    className: "md:col-span-1 md:row-span-2 bg-gradient-to-br from-emerald-500/10 to-teal-500/5",
    border: "hover:border-emerald-500/50",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
      { name: "Express", icon: <SiExpress className="text-white" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "SQL", icon: <SiMysql className="text-[#4479A1]" /> },
    ]
  },
  {
    title: "Programming Languages",
    description: "Solving complex problems with versatile languages.",
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-blue-500/10 to-cyan-500/5",
    border: "hover:border-blue-500/50",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    items: [
      { name: "C++ / DSA", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
      { name: "Java", icon: <FaJava className="text-[#5382a1]" /> },
    ]
  },
  {
    title: "Tools & Environment",
    description: "Version control, containerization, and OS.",
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-br from-orange-500/10 to-red-500/5",
    border: "hover:border-orange-500/50",
    glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    items: [
      { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
      { name: "GitHub", icon: <FaGithub className="text-white" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
      { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16 text-center md:text-left"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical <span className="text-primary">Arsenal</span></h2>
            <p className="text-gray-400 text-lg max-w-xl">A curated collection of tools and technologies I use to build exceptional digital experiences.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#18181b]/50 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-1 ${category.className} ${category.border} ${category.glow}`}
            >
              {/* Subtle background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col justify-start">
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{category.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition-colors group-hover:border-white/20 hover:!bg-white/10 hover:!text-white cursor-default"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;