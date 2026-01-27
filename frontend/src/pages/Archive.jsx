import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaArrowRight } from 'react-icons/fa';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';

const Archive = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Themes for the cards
  const themes = [
    {
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      hoverBorder: "hover:border-violet-500/50",
      button: "bg-violet-500/10 text-violet-400 hover:bg-violet-500 hover:text-white",
      shadow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    },
    {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/50",
      button: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white",
      shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    },
    {
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      hoverBorder: "hover:border-amber-500/50",
      button: "bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white",
      shadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
    },
    {
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      hoverBorder: "hover:border-rose-500/50",
      button: "bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white",
      shadow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
        setFilteredProjects(res.data);
      } catch (err) {
        console.error("Failed to load archive", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = projects.filter(p => 
        p.title.toLowerCase().includes(lowerSearch) || 
        p.tech.some(t => t.toLowerCase().includes(lowerSearch))
    );
    setFilteredProjects(filtered);
  }, [search, projects]);

  return (
    <div className="bg-background min-h-screen text-text pt-20 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col min-h-[85vh]">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 md:mb-12 gap-6">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
                    <FaArrowLeft /> Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white">Project <span className="text-primary">Archive</span></h1>
                <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-400">Showing {filteredProjects.length} projects</p>
                    
                    {/* Mobile Hint */}
                    <div className="flex md:hidden items-center gap-1 text-primary text-xs font-mono animate-pulse">
                        <span>Swipe</span> <FaArrowRight />
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative w-full md:w-72"
            >
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search technology..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 outline-none focus:border-primary transition-colors text-sm text-white"
                />
            </motion.div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 mb-16">
            {loading ? (
                <div className="text-center py-20 animate-pulse text-primary">Loading Projects...</div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                        /* Mobile: Horizontal Scroll */
                        flex 
                        overflow-x-auto 
                        snap-x 
                        snap-mandatory 
                        gap-6 
                        pb-8 
                        -mx-4 px-4 
                        
                        /* Desktop: Grid Layout */
                        md:grid 
                        md:grid-cols-2 
                        md:lg:grid-cols-3 
                        md:pb-0 
                        md:mx-0 
                        md:px-0
                        md:overflow-visible
                        
                        scrollbar-hide
                    "
                >
                    {filteredProjects.map((project, index) => (
                        <div 
                            key={project._id} 
                            className="
                                /* Mobile Sizing */
                                min-w-[85vw] 
                                sm:min-w-[400px] 
                                snap-center 
                                
                                /* Desktop Sizing */
                                md:min-w-0 
                                md:w-full 
                                h-full
                            "
                        >
                            <ProjectCard 
                                project={project} 
                                theme={themes[index % themes.length]} 
                            />
                        </div>
                    ))}
                </motion.div>
            )}
            
            {!loading && filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No projects found matching "{search}"
                </div>
            )}
        </div>

        {/* FOOTER */}
        <footer className="py-8 text-center text-gray-500 border-t border-white/5 relative z-10 text-sm mt-auto">
            <p>© {new Date().getFullYear()} Prashant More. All rights reserved.</p>
            <p className='mt-2'>Made with ❤️ by Prashant More.</p>
        </footer>

      </div>
    </div>
  );
};

export default Archive;