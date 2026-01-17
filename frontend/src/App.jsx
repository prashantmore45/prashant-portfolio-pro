import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<div className="pt-20 text-center">Admin Login Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;