
// import './App.css'
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
import { useState } from 'react'

function App() {

  const [user, setUser] = useState("Admin");


  return (
    <Router>
        <Header user={user} setUser={setUser} />
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/tasks" element={<TasksPage user={user} />} />
          <Route path="/courses" element={<CoursesPage user={user} />} />
          <Route path="/calendar" element={<CalendarPage user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        </Routes>
      </div>
        <Footer />
    </Router>
  );
  
}

export default App
