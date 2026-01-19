import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaEnvelope, FaLock, FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', id: 'home', icon: <FaHome size={20} /> },
    { name: 'About', id: 'about', icon: <FaUser size={20} /> },
    { name: 'Work', id: 'projects', icon: <FaCode size={20} /> },
    { name: 'Contact', id: 'contact', icon: <FaEnvelope size={20} /> },
  ];

  const getLink = (id) => location.pathname === "/" ? `#${id}` : `/#${id}`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[999] pointer-events-none px-4 md:px-6 pt-4 md:pt-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">

          <div className="pointer-events-auto">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-8 w-8 md:h-10 md:w-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-transform duration-500 group-hover:rotate-y-180" 
              />
              <span className="text-lg md:text-xl font-bold text-white tracking-wide">
                Prashant<span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          <div className="pointer-events-auto hidden md:block absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-1 bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full shadow-2xl">
                {navItems.map((item) => (
                    <a 
                        key={item.name}
                        href={getLink(item.id)}
                        className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all relative group"
                    >
                        {item.icon}
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.name}
                        </span>
                    </a>
                ))}
                
                <div className="w-px h-5 bg-white/20 mx-1" />

                <Link 
                    to={location.pathname === "/dashboard" ? "/" : "/admin"} 
                    className="p-3 rounded-full text-primary hover:bg-primary/20 transition-all"
                >
                    <FaLock size={20} />
                </Link>
            </nav>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
            <a 
                href="https://github.com/prashantmore45" 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:flex p-2 md:p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-primary/50 transition-all hover:scale-110"
            >
                <FaGithub size={20} />
            </a>
            <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:flex p-2 md:p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-blue-500/50 transition-all hover:scale-110"
            >
                <FaLinkedin size={20} />
            </a>

            <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-primary/90 hover:bg-primary backdrop-blur-md border border-white/10 rounded-full text-white font-medium transition-all hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)] text-sm md:text-base"
            >
                <FaFileAlt className="text-sm" />
                <span>Resume</span>
            </a>

          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] w-[90%] max-w-md md:hidden pointer-events-auto">
        <nav className="flex items-center justify-around bg-black/80 backdrop-blur-xl border border-white/10 px-2 py-3 rounded-2xl shadow-2xl">
            {navItems.map((item) => (
                <a 
                    key={item.name}
                    href={getLink(item.id)}
                    className="flex flex-col items-center p-2 text-gray-400 hover:text-primary transition-all"
                >
                    {item.icon}
                    <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                </a>
            ))}
            <Link 
                to={location.pathname === "/dashboard" ? "/" : "/admin"} 
                className="flex flex-col items-center p-2 text-primary hover:text-white transition-all"
            >
                <FaLock size={20} />
                <span className="text-[10px] mt-1 font-medium">Admin</span>
            </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;