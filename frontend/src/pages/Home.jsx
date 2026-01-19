import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import ProjectCard from '../components/ProjectCard';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Spotlight from '../components/Spotlight';
import api from '../api/axios';
import { FaGraduationCap, FaCode, FaLaptopCode, FaArrowRight } from 'react-icons/fa'; // Added Arrow Icon

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-background text-text min-h-screen relative overflow-hidden pb-24 md:pb-0">
      
      <div className="hidden md:block">
        <Spotlight />
      </div>

      <Hero3D />

      <section id="projects" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-16 text-center md:text-left"
        >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected <span className="text-primary">Works</span></h2>
            <p className="text-gray-400 max-w-xl text-lg mx-auto md:mx-0">
                A collection of digital products, experiments, and open source contributions.
            </p>
            
            <div className="flex items-center justify-center md:hidden gap-2 mt-4 text-sm text-primary animate-pulse">
                <span>Swipe to explore</span>
                <FaArrowRight />
            </div>
        </motion.div>

        {loading ? (
          <div className="text-primary animate-pulse text-xl text-center">Loading Projects...</div>
        ) : (
          <div className="
            flex 
            overflow-x-auto 
            snap-x 
            snap-mandatory 
            gap-6 
            pb-8 
            
            /* Ensure the first card isn't flush against the edge */
            px-2 
            
            md:grid 
            md:grid-cols-3 
            md:gap-6 
            md:auto-rows-[400px]
            md:overflow-visible 
            md:pb-0
            md:px-0
            
            scrollbar-hide
          ">
            {projects.map((project, index) => (
              <div 
                key={project._id}
                className={`
                  /* Make card 85% of screen width.
                     This forces the NEXT card to 'peek' by 15% 
                     so users know to scroll.
                  */
                  min-w-[85vw] 
                  sm:min-w-[400px] 
                  snap-center 
                  
                  md:min-w-0 
                  md:w-full

                  ${index === 0 ? "md:col-span-2" : 
                    index === 3 ? "md:col-span-2 md:row-span-2" : 
                    "md:col-span-1"}
                `}
              >
                <ProjectCard 
                  project={project} 
                  className="h-full w-full" 
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <Skills />

      <section id="about" className="py-16 md:py-32 px-4 md:px-6 relative z-10 bg-black/20">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-center">About <span className="text-primary">Me</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center md:text-left">
                    <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                        I am a <span className="text-white font-bold">Computer Engineering Student</span> driven by the art of building scalable web applications. 
                        My code is a bridge between complex backend logic and smooth frontend experiences.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10">
                            <FaCode className="text-2xl md:text-3xl text-primary mb-2 mx-auto md:mx-0" />
                            <h3 className="font-bold text-white">Full Stack</h3>
                            <p className="text-xs md:text-sm text-gray-400">MERN Specialist</p>
                        </div>
                        <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10">
                            <FaLaptopCode className="text-2xl md:text-3xl text-secondary mb-2 mx-auto md:mx-0" />
                            <h3 className="font-bold text-white">Problem Solver</h3>
                            <p className="text-xs md:text-sm text-gray-400">DSA & Logic</p>
                        </div>
                        <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10 col-span-2">
                             <FaGraduationCap className="text-2xl md:text-3xl text-green-400 mb-2 mx-auto md:mx-0" />
                            <h3 className="font-bold text-white">Student @ SPPU</h3>
                            <p className="text-xs md:text-sm text-gray-400">Constantly learning & evolving</p>
                        </div>
                    </div>
                </div>

                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="h-[300px] md:h-full min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-primary/20 to-purple-900/20 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-5xl md:text-7xl font-bold text-white/10">DEV</h3>
                        <p className="text-primary font-mono mt-2">{'< Prashant />'}</p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      <Contact />

      <footer className="py-8 text-center text-gray-500 border-t border-white/5 relative z-10 text-sm">
        <p>© {new Date().getFullYear()} Prashant More. All rights reserved.</p>
        <p className='mt-2'>Made with ❤️ by Prashant More.</p>
      </footer>

    </div>
  );
};

export default Home;