import React, { useState, useEffect } from "react";
import { Target, Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header ({ user, setUser, transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const currentUser = isAuthPage ? null : user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleGetStarted = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    if (typeof setUser === 'function') {
      setUser(null);
    }
    navigate('/signup');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || !transparent ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to={currentUser ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">StudyScheduler</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              // Authenticated Navigation
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
                <Link to="/tasks" className="text-gray-600 hover:text-blue-600 transition-colors">Tasks</Link>
                <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">Courses</Link>
                <Link to="/calendar" className="text-gray-600 hover:text-blue-600 transition-colors">Calendar</Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <User className="w-4 h-4" />
                    <span>{currentUser.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Guest Navigation
              <>
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/signup" onClick={handleGetStarted} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-600">Dashboard</Link>
                <Link to="/tasks" className="block py-2 text-gray-600">Tasks</Link>
                <Link to="/courses" className="block py-2 text-gray-600">Courses</Link>
                <Link to="/calendar" className="block py-2 text-gray-600">Calendar</Link>
                <Link to="/profile" className="block py-2 text-gray-600">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left py-2 text-gray-600">Logout</button>
              </>
            ) : (
              <>
                <a href="#features" className="block py-2 text-gray-600">Features</a>
                <a href="#how-it-works" className="block py-2 text-gray-600">How it Works</a>
                <a href="#testimonials" className="block py-2 text-gray-600">Reviews</a>
                <Link to="/login" className="block py-2 text-gray-600">Login</Link>
                <Link to="/signup" onClick={handleGetStarted} className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 text-center block">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};