// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJava } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiCplusplus, SiTypescript, SiPython, SiMysql } from "react-icons/si";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Express", icon: <SiExpress className="text-white" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "SQL", icon: <SiMysql className="text-blue-400" /> },
  { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
  { name: "Python", icon: <SiPython className="text-yellow-500" /> },
  { name: "Java", icon: <FaJava className="text-red-600" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  { name: "GitHub", icon: <FaGithub className="text-white" /> },
  { name: "DSA in C++", icon: <SiCplusplus className="text-purple-500" /> },
  { name: "MERN", icon: <FaNodeJs className="text-green-400" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-32 px-4 md:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical <span className="text-primary">Skills</span></h2>
          <p className="text-gray-400 text-lg">The tools I use to bring ideas to life.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl cursor-pointer group transition-colors"
            >
              <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {skill.icon}
              </div>
              <span className="font-medium text-gray-300 group-hover:text-white text-sm md:text-base">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;