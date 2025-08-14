import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { ImageOff, Calendar, CheckCircle, BookOpen, TrendingUp, Plus, X, AlertCircle, GraduationCap, ArrowRight } from "lucide-react";

const TasksPage = ({ user, courses = [] }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Math Assignment Chapter 5', course: 'Mathematics', dueDate: '2024-08-15', priority: 'high', completed: false },
    { id: 2, title: 'History Essay - WWII', course: 'History', dueDate: '2024-08-18', priority: 'medium', completed: true },
    { id: 3, title: 'Chemistry Lab Report', course: 'Chemistry', dueDate: '2024-08-20', priority: 'high', completed: false },
    { id: 4, title: 'Literature Reading', course: 'English', dueDate: '2024-08-16', priority: 'low', completed: false },
    { id: 5, title: 'Physics Problem Set', course: 'Physics', dueDate: '2024-08-22', priority: 'medium', completed: false },
  ]);

  const [filter, setFilter] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    dueDate: '',
    priority: 'medium'
  });
  

  // Extract course names from the courses prop
  const courseNames = courses.map(course => course.name);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    // Validate required fields
    if (!newTask.title.trim()) {
      return;
    }
    if (!newTask.course) {
      return;
    }
    if (!newTask.dueDate) {
      return;
    }

    const task = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', course: '', dueDate: '', priority: 'medium' });
    setShowAddTask(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const closeTaskModal = () => {
    setShowAddTask(false);
    setNewTask({ title: '', course: '', dueDate: '', priority: 'medium' });
  };

  // Get course color for tasks
  const getCourseColor = (courseName) => {
    const course = courses.find(c => c.name === courseName);
    return course ? course.color : 'gray';
  };

  if (!user) {
    return <div className="pt-24 text-center">Please log in to access your tasks.</div>;
  }

  return (
    <>
      <Header user={user} />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-600 mt-2">Manage all your assignments and deadlines</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/courses'} // Navigate to courses page
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Manage Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </button>
            </div>
          </div>

          {/* Courses Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Courses ({courseNames.length})</h2>
              {courseNames.length === 0 && (
                <button
                  onClick={() => window.location.href = '/courses'}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Add your first course
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {courseNames.length > 0 ? (
                courses.map((course, index) => (
                  <div key={index} className={`flex items-center bg-${course.color}-100 text-${course.color}-800 px-3 py-1 rounded-full text-sm`}>
                    <div className={`w-2 h-2 bg-${course.color}-500 rounded-full mr-2`}></div>
                    <span>{course.name}</span>
                    <span className="ml-2 text-xs opacity-75">({course.code})</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full py-8 text-gray-500">
                  <div className="text-center">
                    <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No courses added yet.</p>
                    <p className="text-xs mt-1">Add courses first to create tasks for them.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Tasks ({tasks.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending ({tasks.filter(t => !t.completed).length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Completed ({tasks.filter(t => t.completed).length})
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => {
                    const courseColor = getCourseColor(task.course);
                    return (
                      <div key={task.id} className={`flex items-center p-4 rounded-lg border transition-all ${
                        task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`p-1 rounded-full mr-4 ${
                            task.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                          }`}
                        >
                          <CheckCircle className={`w-6 h-6 ${task.completed ? 'fill-current' : ''}`} />
                        </button>
                        
                        <div className={`w-3 h-3 rounded-full mr-4 ${
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        
                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <div className={`w-2 h-2 bg-${courseColor}-500 rounded-full mr-2`}></div>
                            <span>{task.course}</span>
                            <span className="mx-2">•</span>
                            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span className={`${
                              task.priority === 'high' ? 'text-red-600' :
                              task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {task.priority} priority
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No tasks found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Task Modal */}
          {showAddTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Task</h2>
                
                {courseNames.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800 font-medium">No courses available</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          You need to add courses first before creating tasks.
                        </p>
                        <button
                          onClick={() => window.location.href = '/courses'}
                          className="text-yellow-800 hover:text-yellow-900 text-xs underline mt-2 flex items-center"
                        >
                          Go to Courses page
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                      value={newTask.course}
                      onChange={(e) => setNewTask({...newTask, course: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={courseNames.length === 0}
                    >
                      <option value="">
                        {courseNames.length === 0 ? 'No courses available' : 'Select a course'}
                      </option>
                      {courses.map((course, index) => (
                        <option key={index} value={course.name}>
                          {course.name} ({course.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeTaskModal}
                      className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addTask}
                      disabled={courseNames.length === 0 || !newTask.title.trim() || !newTask.course || !newTask.dueDate}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TasksPage;