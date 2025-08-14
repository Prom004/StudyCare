import React from "react";
import { ArrowRight } from "lucide-react";
// import { Button, Input, Select, Textarea } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";

const CalendarPage = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  
  const tasks = [
    { id: 1, title: 'Math Assignment', date: '2024-08-15', course: 'Mathematics', color: 'blue' },
    { id: 2, title: 'History Essay', date: '2024-08-18', course: 'History', color: 'green' },
    { id: 3, title: 'Chemistry Lab', date: '2024-08-20', course: 'Chemistry', color: 'purple' },
    { id: 4, title: 'Literature Reading', date: '2024-08-16', course: 'English', color: 'orange' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getTasksForDay = (day) => {
    if (!day) return [];
    const dateStr = `2024-08-${day.toString().padStart(2, '0')}`;
    return tasks.filter(task => task.date === dateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  if (!user) {
    return <div className="pt-24 text-center">Please log in to access your calendar.</div>;
  }

  return (
    <>
      <Header user={user} />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="text-gray-600 mt-2">View your schedule and upcoming deadlines</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Week
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-px mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div key={index} className="bg-white p-2 min-h-[100px] relative">
                    {day && (
                      <>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {day}
                        </div>
                        <div className="space-y-1">
                          {getTasksForDay(day).map(task => (
                            <div
                              key={task.id}
                              className={`text-xs p-1 rounded bg-${task.color}-100 text-${task.color}-800 truncate`}
                            >
                              {task.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks Sidebar */}
          <div className="mt-8 grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {/* This could be expanded with more calendar features */}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {tasks.slice(0, 4).map(task => (
                  <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full bg-${task.color}-500 mr-3`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-600">{task.course}</div>
                      <div className="text-xs text-gray-500">{new Date(task.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CalendarPage;