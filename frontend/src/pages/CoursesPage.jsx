import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Plus, X, User, BookOpen } from "lucide-react";
import { API } from "../api";

const CoursesPage = ({ user, token }) => {
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    instructor: "",
    credits: 3,
    color: "blue",
    deadline: "",
  });

  // Load courses from API when token present
  useEffect(() => {
    if (!user || !token) return;
    API.listCourses(token)
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err));
  }, [user, token]);

  // No more localStorage persistence; state is source of truth from API

  const computeProgress = (course) => {
    if (!course?.deadline) return 0;
    const created = new Date(course.createdAt || Date.now());
    const end = new Date(course.deadline);
    const now = new Date();
    if (now <= created) return 0;
    if (now >= end) return 100;
    const total = end - created;
    const elapsed = now - created;
    const pct = Math.round((elapsed / total) * 100);
    return Math.min(100, Math.max(0, pct));
  };

  useEffect(() => {
    const id = setInterval(() => setCourses((prev) => [...prev]), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const addCourse = (e) => {
    e.preventDefault();
    const payload = { name: newCourse.name, code: newCourse.code, color: newCourse.color, deadline: newCourse.deadline ? new Date(newCourse.deadline).toISOString() : null };
    API.createCourse(payload, token)
      .then((created) => {
        setCourses([...courses, created]);
        setNewCourse({ name: "", code: "", instructor: "", credits: 3, color: "blue", deadline: "" });
        setShowAddCourse(false);
      })
      .catch((err) => console.error(err));
  };

  const deleteCourse = (id) => {
    API.deleteCourse(id, token)
      .then(() => setCourses(courses.filter((course) => course.id !== id)))
      .catch((err) => console.error(err));
  };

  const colorOptions = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
  ];

  if (!user) {
    return <div className="pt-24 text-center">Please log in to access your courses.</div>;
  }

  return (
    <>
      <Header user={user} />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
              <p className="text-gray-600 mt-2">Manage your course enrollment and track progress</p>
            </div>
            <button
              onClick={() => setShowAddCourse(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </button>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`h-2 bg-${course.color}-500`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-600">{course.code}</p>
                    </div>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.credits} Credits
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Progress</span>
                      <span className="text-sm text-gray-600">{computeProgress(course)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-${course.color}-500`}
                        style={{ width: `${computeProgress(course)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Course Modal */}
          {showAddCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Course</h2>
                <form onSubmit={addCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <input
                      type="text"
                      required
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mathematics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      required
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MATH 201"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                    <input
                      type="date"
                      value={newCourse.deadline}
                      onChange={(e) => setNewCourse({ ...newCourse, deadline: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                    <input
                      type="text"
                      required
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dr. Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                    <select
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} Credit{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                    <div className="flex gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setNewCourse({ ...newCourse, color: color.value })}
                          className={`w-8 h-8 rounded-full ${color.class} ${
                            newCourse.color === color.value ? "ring-2 ring-offset-2 ring-gray-400" : ""
                          }`}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddCourse(false)}
                      className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
    