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
                // Backend wraps response in { data: projects, pagination: {...} }
                setProjects(res.data.data || []);
                setFilteredProjects(res.data.data || []);
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
        <div className="bg-background min-h-screen text-text pt-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col min-h-[85vh]">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
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

                {/* MAIN CONTENT - Vertical Journey Timeline */}
                <div className="flex-1 mb-16 relative w-full pt-10">
                    {loading ? (
                        <div className="text-center py-20 animate-pulse text-primary">Loading Projects...</div>
                    ) : (
                        <div className="relative w-full max-w-6xl mx-auto">
                            
                            {/* The glowing central line */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2"></div>

                            <div className="flex flex-col gap-12 md:gap-24">
                                {filteredProjects.map((project, index) => {
                                    const isEven = index % 2 === 0;
                                    
                                    // Determine year based on project title
                                    const titleLower = project.title.toLowerCase();
                                    const is2025 = titleLower.includes('ai image') || titleLower.includes('ai chat') || titleLower.includes('amazon');
                                    const projectYear = is2025 ? '2025' : '2026';

                                    return (
                                        <motion.div 
                                            key={project._id} 
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className={`relative flex w-full flex-col md:flex-row md:justify-between items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                                        >
                                            {/* The glowing dot on the line */}
                                            <div className="absolute left-6 md:left-1/2 top-1/2 md:top-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#09090b] border-[3px] border-primary -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(139,92,246,0.6)] z-10 transition-all duration-300 hover:scale-150 hover:bg-primary"></div>
                                            
                                            {/* Content Wrapper */}
                                            <div className="w-full pl-14 md:pl-0 md:w-[45%]">
                                                <ProjectCard 
                                                    project={project} 
                                                    theme={themes[index % themes.length]} 
                                                />
                                            </div>
                                            
                                            {/* Opposite side (Desktop only) - Date & Floating details */}
                                            <div className="hidden md:flex md:w-[45%] flex-col justify-center opacity-30 hover:opacity-100 transition-opacity duration-500">
                                                <div className={`text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 ${isEven ? 'text-left pl-12' : 'text-right pr-12'}`}>
                                                    {projectYear}
                                                </div>
                                                <div className={`text-sm tracking-[0.2em] uppercase text-primary mt-2 ${isEven ? 'text-left pl-12' : 'text-right pr-12'}`}>
                                                    {project.type}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
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