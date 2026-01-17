import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    type: "Web Application",
    github: "",
    demo: "",
    tech: "" 
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    
   
    const techArray = formData.tech.split(",").map(t => t.trim());

    const payload = { ...formData, tech: techArray };

    try {
      const res = await api.post("/admin/projects/add", payload);
      if (res.data.ok) {
        alert("Project Added Successfully! 🚀");
        setFormData({ title: "", description: "", image: "", type: "Web Application", github: "", demo: "", tech: "" });
        fetchProjects(); 
      }
    } catch (err) {
      alert("Failed to add project ❌");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-text p-6 md:p-12">
      
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6 mt-12">
        <h1 className="text-3xl font-bold">Admin <span className="text-primary">Dashboard</span></h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        
        <div className="bg-surface p-8 rounded-2xl border border-white/10 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FaPlus className="text-primary"/> Add New Project
            </h2>

            <form onSubmit={handleAddProject} className="space-y-4">
                <input 
                    name="title" 
                    placeholder="Project Title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                />
                
                <input 
                    name="type" 
                    placeholder="Type (e.g. Full Stack Web App)" 
                    value={formData.type} 
                    onChange={handleChange} 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                />
                
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    rows="3" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                />
                
                <input 
                    name="image" 
                    placeholder="Image URL (e.g., images/my-project.png)" 
                    value={formData.image} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                />
                
                <div className="grid grid-cols-2 gap-4">
                    <input 
                    name="github" 
                    placeholder="GitHub URL" 
                    value={formData.github} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                    />
                    
                    <input 
                    name="demo" 
                    placeholder="Live Demo URL" 
                    value={formData.demo} 
                    onChange={handleChange} 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                    />
                </div>

                <input 
                    name="tech" 
                    placeholder="Tech Stack (comma separated: React, Node, CSS)" 
                    value={formData.tech} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none" 
                />

                <button type="submit" className="w-full bg-primary hover:bg-violet-700 text-white font-bold py-3 rounded-lg transition-all mt-4">
                    Add Project
                </button>
            </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6">Existing Projects ({projects.length})</h2>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p._id} className="bg-surface p-4 rounded-xl border border-white/5 flex justify-between items-center group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-lg bg-black" />
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-xs text-gray-400">{p.type}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDelete(p._id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                  title="Delete Project"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            {projects.length === 0 && <p className="text-gray-500 italic">No projects found.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;