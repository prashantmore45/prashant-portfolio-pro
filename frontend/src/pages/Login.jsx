import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", { username, password });
      const token = res.data.token || res.data.user?.token; 
      if (token) {
        login(token);
        navigate("/dashboard");
      } else {
        setError("Login succeeded but no token received.");
      }
      // -----------------------

    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || "Invalid Credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md bg-black/40 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Admin <span className="text-primary">Login</span></h2>
        
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-center text-sm border border-red-500/50">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Username</label>
            <input 
              type="text" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-violet-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;