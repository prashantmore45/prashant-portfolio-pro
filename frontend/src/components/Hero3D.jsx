import Spline from '@splinetool/react-spline';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowDown, FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero3D = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 md:py-0">
      
      <div className="absolute inset-0 z-0">
         <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-black/30 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-center">

            <div className="p-6 md:p-12 text-center md:text-left order-2 md:order-1">
              <div className="inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                System Online
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  Prashant More
                </span>
              </h1>
              
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                A <span className="text-white font-semibold">Full-Stack Engineer</span> architecting 3D web experiences and scalable systems. I turn complex problems into elegant code.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#projects" className="px-6 py-3 md:px-8 md:py-3 bg-primary hover:bg-violet-700 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)] text-sm md:text-base">
                  View Work
                </a>
                <div className="flex gap-4 items-center justify-center">
                    <a href="https://github.com/prashantmore45" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={20} className="md:text-[24px]"/></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={20} className="md:text-[24px]"/></a>
                </div>
              </div>
            </div>

            <div className="relative h-[250px] sm:h-[300px] md:h-[500px] w-full order-1 md:order-2 bg-gradient-to-b from-primary/20 to-transparent">
              <img 
                src="/images/mee.png" 
                alt="Prashant More" 
                className="w-full h-full object-cover object-center md:object-top opacity-90 hover:opacity-100 transition-opacity duration-500 mix-blend-overlay md:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
            </div>

          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 z-10 text-white/50 hidden md:block"
      >
        <FaArrowDown size={24} />
      </motion.div>

    </section>
  );
};

export default Hero3D;