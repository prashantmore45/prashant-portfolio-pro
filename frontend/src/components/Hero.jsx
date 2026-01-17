// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  const handleDownloadResume = () => {
    window.open('http://localhost:5000/api/resume/download', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl text-primary font-medium mb-2">Hi, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Prashant <span className="text-primary">More</span>
          </h1>
          <h3 className="text-2xl md:text-3xl text-gray-400 mb-6">
            Full Stack Web Developer
          </h3>
          <p className="text-gray-300 max-w-lg mb-8 leading-relaxed">
            I build fast, scalable, and real-world web applications using the MERN stack. 
            Currently transforming ideas into code at SPPU.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleDownloadResume}
              className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-violet-700 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <FaFileDownload /> Download Resume
            </button>
            
            <div className="flex gap-4 items-center px-4">
                <a href="https://github.com/prashantmore45" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaGithub/></a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaLinkedin/></a>
            </div>
          </div>
        </motion.div>

        {/* Right: Image / Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* You can replace this with your actual photo or a 3D illustration later */}
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent rounded-full opacity-20 animate-spin-slow" />
            <img 
              src="/images/bg.png" 
              alt="Prashant" 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;