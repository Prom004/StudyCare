import { ImageOff, Calendar, CheckCircle, BookOpen, TrendingUp, Plus } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import Header from "../components/Header";

const Dashboard = ({ user }) => {
  const [tasks] = useState([
    { id: 1, title: 'Math Assignment Chapter 5', course: 'Mathematics', dueDate: '2024-08-15', priority: 'high', completed: false },
    { id: 2, title: 'History Essay - WWII', course: 'History', dueDate: '2024-08-18', priority: 'medium', completed: true },
    { id: 3, title: 'Chemistry Lab Report', course: 'Chemistry', dueDate: '2024-08-20', priority: 'high', completed: false },
    { id: 4, title: 'Literature Reading', course: 'English', dueDate: '2024-08-16', priority: 'low', completed: false },
  ]);

  const [courses] = useState([
    { name: 'Mathematics', progress: 85, color: 'blue' },
    { name: 'History', progress: 92, color: 'green' },
    { name: 'Chemistry', progress: 78, color: 'purple' },
    { name: 'English', progress: 88, color: 'orange' },
  ]);

  const upcomingTasks = tasks.filter(task => !task.completed).slice(0, 4);
  const completedToday = tasks.filter(task => task.completed).length;

  if (!user) {
    return <div className="pt-24 text-center">Please log in to access your dashboard.</div>;
  }

  return (
    <>
      <Header user={user} />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
            <p className="text-gray-600 mt-2">Here's what you have planned for today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Due Today</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Avg Progress</p>
                  <p className="text-2xl font-bold text-gray-900">86%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Tasks */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
                  <Link to="/tasks" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {upcomingTasks.map(task => (
                    <div key={task.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mr-4 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.course} • Due {new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Progress */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Course Progress</h2>
                  <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Manage
                  </Link>
                </div>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{course.name}</span>
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-${course.color}-500`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Link to="/tasks" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <Plus className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-blue-600 font-medium">Add New Task</span>
                  </Link>
                  <Link to="/courses" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-600 font-medium">Add New Course</span>
                  </Link>
                  <Link to="/calendar" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-purple-600 font-medium">View Calendar</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;