import React, { useState, useEffect } from "react";
import { Target, Menu, X, User, LogOut, Bell } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationContext";

export default function Header ({ user, setUser, transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const currentUser = isAuthPage ? null : user;
  const { notifications, removeNotification, clearAllNotifications } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationsOpen && !event.target.closest('.notifications-dropdown')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

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
            <span className="text-xl font-bold text-gray-900">StudyCare</span>
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
                
                {/* Notification Bell */}
                <div className="relative notifications-dropdown">
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="text-gray-600 hover:text-blue-600 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length > 9 ? '9+' : notifications.length}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                          {notifications.length > 0 && (
                            <button
                              onClick={clearAllNotifications}
                              className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                              Clear all
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center">
                          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No notifications yet</p>
                          <p className="text-sm text-gray-400">You'll see important updates here</p>
                        </div>
                      ) : (
                        <div className="p-2">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`mb-2 p-3 rounded-lg border transition-all duration-200 ${
                                notification.type === 'success' ? 'bg-green-50 border-green-200' :
                                notification.type === 'error' ? 'bg-red-50 border-red-200' :
                                notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                                'bg-blue-50 border-blue-200'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {notification.type === 'success' ? (
                                    <div className="w-4 h-4 text-green-500">✓</div>
                                  ) : notification.type === 'error' ? (
                                    <div className="w-4 h-4 text-red-500">✕</div>
                                  ) : notification.type === 'warning' ? (
                                    <div className="w-4 h-4 text-yellow-500">⚠</div>
                                  ) : (
                                    <div className="w-4 h-4 text-blue-500">ℹ</div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  {notification.title && (
                                    <p className={`text-sm font-medium ${
                                      notification.type === 'success' ? 'text-green-800' :
                                      notification.type === 'error' ? 'text-red-800' :
                                      notification.type === 'warning' ? 'text-yellow-800' :
                                      'text-blue-800'
                                    }`}>
                                      {notification.title}
                                    </p>
                                  )}
                                  {notification.message && (
                                    <p className={`text-sm ${
                                      notification.type === 'success' ? 'text-green-700' :
                                      notification.type === 'error' ? 'text-red-700' :
                                      notification.type === 'warning' ? 'text-yellow-700' :
                                      'text-blue-700'
                                    } mt-1`}>
                                      {notification.message}
                                    </p>
                                  )}
                                  {notification.timestamp && (
                                    <p className="text-xs text-gray-500 mt-2">
                                      {notification.timestamp.toLocaleTimeString()}
                                    </p>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeNotification(notification.id)}
                                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
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