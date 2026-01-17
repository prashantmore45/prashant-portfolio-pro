import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import api from '../api/axios';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Projects from Backend
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

      {/* Projects Section */}
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

      {/* About & Skills placeholders for now */}
      <section id="about" className="py-20 text-center bg-surface/30">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="max-w-2xl mx-auto text-gray-400">Coming soon in Phase 3...</p>
      </section>

    </div>
  );
};

export default Home;