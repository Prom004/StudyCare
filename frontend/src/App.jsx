import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import Dashboard from './pages/Dashboard'
import SignupPage from './pages/SignupPage'
import TasksPage from './pages/TasksPage'
import CoursesPage from './pages/CoursesPage'
import CalendarPage from './pages/CalendarPage'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { API } from './api'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token') || null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      setInitializing(true);
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        const me = await API.me(token);
        setUser(me);
      } catch (e) {
        // Do not clear token on transient errors; user can retry later
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, [token]);


  return (
    <Router>
        <Header user={user} setUser={setUser} />
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} setToken={setToken} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} setToken={setToken} />} />
          <Route path="/dashboard" element={<ProtectedRoute user={user} initializing={initializing}><Dashboard user={user} token={token} /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute user={user} initializing={initializing}><TasksPage user={user} token={token} /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute user={user} initializing={initializing}><CoursesPage user={user} token={token} /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute user={user} initializing={initializing}><CalendarPage user={user} token={token} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user} initializing={initializing}><ProfilePage user={user} setUser={setUser} /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center"><h1 className="text-xl font-semibold text-gray-900 mb-2">Forgot Password</h1><p className="text-gray-600">This feature is not available yet. Please contact support or try signing up again with a different email.</p></div></div>} />
        </Routes>
      </div>
        <Footer />
    </Router>
  );
  
}

export default App
