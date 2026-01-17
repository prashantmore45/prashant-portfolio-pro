import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const getLink = (id) => {
    return location.pathname === "/" ? `#${id}` : `/#${id}`;
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="PM Logo" className="h-10 w-10 hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold text-white sm:block">
                Prashant<span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href={getLink("home")} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300">Home</a>
              <a href={getLink("about")} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300">About</a>
              <a href={getLink("skills")} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300">Skills</a>
              <a href={getLink("projects")} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300">Projects</a>
              <a href={getLink("contact")} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300">Contact</a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <a href="https://github.com/prashantmore45" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={20}/></a>
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={20}/></a>
             
             {location.pathname === "/dashboard" ? (
                <Link to="/" className="ml-4 px-4 py-1.5 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all text-sm">
                  Back to Home
                </Link>
             ) : (
                <Link to="/admin" className="ml-4 px-4 py-1.5 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all text-sm">
                  Admin
                </Link>
             )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>  
      </div>

      {isOpen && (
        <div className="md:hidden bg-surface border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href={getLink("home")} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href={getLink("about")} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href={getLink("projects")} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
            <a href={getLink("contact")} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-primary block px-3 py-2 rounded-md text-base font-medium mt-4">
               {location.pathname === "/dashboard" ? "Back to Home" : "Admin Dashboard"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;