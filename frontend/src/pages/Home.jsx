import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import Skills from '../components/Skills'; 
import Contact from '../components/Contact'; 
import api from '../api/axios';

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
    <div className="bg-background text-text">
      <Hero />

      <section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About <span className="text-primary">Me</span></h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          I am a passionate <span className="text-white font-medium">Computer Engineering Student</span> and a <span className="text-white font-medium">Full Stack Web Developer</span>. 
          I specialize in building performant web applications using the MERN stack. 
          My journey involves solving real-world problems with code, exploring new technologies like AI & Blockchain, and constantly leveling up my skills.
        </p>
      </section>

      <Skills />

      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Featured <span className="text-primary">Projects</span>
        </h2>

        {loading ? (
          <div className="text-center text-primary animate-pulse">Loading amazing things...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      <Contact />

      <footer className="py-8 text-center text-gray-500 border-t border-white/5">
        <p>© {new Date().getFullYear()} Prashant More. All rights reserved.</p>
        <p className='mt-2'> Made with ❤️ by Prashant More. </p>
      </footer>

    </div>
  );
};

export default Home;