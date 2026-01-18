import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaTrash, FaEdit, FaSignOutAlt, FaEnvelope, FaProjectDiagram, FaSortNumericDown } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', github: '', demo: '', tech: '', type: '', 
    order: 0 
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token && !loading) {
      navigate('/admin');
    } else {
      fetchData();
    }
  }, [user, loading, navigate]);

  const fetchData = async () => {
    try {
      const projRes = await api.get('/projects');
      setProjects(projRes.data);
      
      try {
        const msgRes = await api.get('/contact');
        setMessages(msgRes.data);
      } catch (e) {
        console.error(e);
        console.log("Message fetch skipped (Limited Access)");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = typeof formData.tech === 'string' ? formData.tech.split(',').map(t => t.trim()) : formData.tech;
    
    const payload = { ...formData, tech: techArray };

    try {
      if (isEditing) {
        await api.put(`/projects/${currentId}`, payload);
        alert("Project Updated Successfully!");
      } else {
        await api.post('/projects/add', payload);
        alert("New Project Added!");
      }
      
      setFormData({ title: '', description: '', image: '', github: '', demo: '', tech: '', type: '', order: 0 });
      setIsEditing(false);
      setCurrentId(null);
      fetchData(); 
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.msg || err.message));
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      github: project.github,
      demo: project.demo,
      tech: project.tech.join(', '), 
      type: project.type,
      order: project.order || 99
    });
    setIsEditing(true);
    setCurrentId(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await api.delete(`/projects/${id}`);
      fetchData();
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      await api.delete(`/contact/${id}`);
      fetchData();
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-primary text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-text px-4 pb-24 pt-24 md:px-8 md:pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* === Header === */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Admin <span className="text-primary">Panel</span></h1>
          <button onClick={logout} className="flex items-center gap-2 bg-red-500/10 text-red-500 px-6 py-2 rounded-full hover:bg-red-500/20 transition-all text-sm font-bold">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Mobile Friendly Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-xl overflow-x-auto">
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap text-sm font-bold ${activeTab === 'projects' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <FaProjectDiagram /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap text-sm font-bold ${activeTab === 'messages' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <FaEnvelope /> Messages
          </button>
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Form Section (Left/Top) */}
            <div className="lg:col-span-1">
              <div className="bg-surface p-6 rounded-2xl border border-white/10 lg:sticky lg:top-24 shadow-xl backdrop-blur-sm bg-black/40">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  {isEditing ? <FaEdit className="text-yellow-400"/> : <FaPlus className="text-green-400"/>}
                  {isEditing ? "Edit Project" : "Add New Project"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-20">
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 block">Order</label>
                      <div className="relative">
                        <FaSortNumericDown className="absolute top-3 left-3 text-gray-500 text-xs"/>
                        <input 
                          name="order" 
                          type="number" 
                          placeholder="#" 
                          value={formData.order} 
                          onChange={handleChange} 
                          className="w-full bg-black/50 pl-8 p-3 rounded-lg border border-white/10 outline-none text-white font-bold focus:border-primary transition-colors text-center" 
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 block">Title</label>
                      <input 
                        name="title" 
                        placeholder="Project Name" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                        className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" 
                      />
                    </div>
                  </div>

                  <input name="type" placeholder="Type (e.g. Full Stack App)" value={formData.type} onChange={handleChange} className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" />
                  <textarea name="description" placeholder="Short Description..." rows="3" value={formData.description} onChange={handleChange} required className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" />
                  <input name="image" placeholder="Image URL (https://...)" value={formData.image} onChange={handleChange} required className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input name="github" placeholder="GitHub Link" value={formData.github} onChange={handleChange} required className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" />
                    <input name="demo" placeholder="Live Demo Link" value={formData.demo} onChange={handleChange} className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" />
                  </div>
                  
                  <input name="tech" placeholder="Tech Stack (React, Node, ...)" value={formData.tech} onChange={handleChange} required className="w-full bg-black/50 p-3 rounded-lg border border-white/10 outline-none text-white focus:border-primary transition-colors placeholder-gray-600" />
                  
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-lg transform active:scale-95 ${isEditing ? 'bg-yellow-500 hover:bg-yellow-400 text-black' : 'bg-primary hover:bg-violet-600 text-white'}`}>
                      {isEditing ? "Update Project" : "Add Project"}
                    </button>
                    {isEditing && (
                      <button type="button" onClick={() => { setIsEditing(false); setFormData({ title: '', description: '', image: '', github: '', demo: '', tech: '', type: '', order: 0 }); }} className="bg-white/10 hover:bg-white/20 px-4 rounded-xl transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* List Section (Right/Bottom) */}
            <div className="lg:col-span-2 space-y-4">
              {projects.length === 0 && <div className="text-center text-gray-500 py-10">No projects yet. Add one!</div>}
              
              {projects.map((project) => (
                <div key={project._id} className="bg-surface group hover:bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-5 transition-all">
                  <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 relative rounded-xl overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                      #{project.order || 99}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-white mb-1">{project.title}</h3>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded border border-primary/20">{project.type}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t, i) => (
                          <span key={i} className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded border border-white/5">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <button onClick={() => handleEdit(project)} className="flex-1 flex items-center justify-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg transition-colors text-sm font-bold">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg transition-colors text-sm font-bold">
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="grid md:grid-cols-2 gap-4">
            {messages.length === 0 ? <p className="text-gray-500 col-span-2 text-center py-10">No messages received yet.</p> : messages.map((msg) => (
              <div key={msg._id} className="bg-surface p-6 rounded-2xl border border-white/5 relative group hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                    <p className="text-primary text-sm font-mono">{msg.email}</p>
                  </div>
                  <button onClick={() => handleDeleteMessage(msg._id)} className="text-gray-600 hover:text-red-500 p-2 rounded-full hover:bg-red-500/10 transition-all"><FaTrash /></button>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <p className="text-gray-300 text-sm leading-relaxed">"{msg.message}"</p>
                </div>
                <div className="text-right mt-2 text-xs text-gray-600">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;