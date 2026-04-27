import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Archive from './pages/Archive';
import { setupBackendHeartbeat } from './utils/wakeUpBackend';

function App() {
  useEffect(() => {
    // Wake up backend on app load and set up periodic heartbeat
    const cleanup = setupBackendHeartbeat();
    
    return cleanup;
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;