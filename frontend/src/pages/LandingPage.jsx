import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle, 
  BookOpen, 
  Target, 
  Users, 
  Star, 
  ArrowRight,
  Menu,
  X,
  Clock,
  TrendingUp,
  Smartphone
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bgImage from '../assets/img/bgImage.png';
import Testimonials from '../components/Testimonials';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/signup');
  };

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Smart Scheduling",
      description: "Automatically organize your study sessions based on due dates and priorities"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Task Management",
      description: "Keep track of assignments, exams, and deadlines in one simple interface"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: "Course Organization",
      description: "Manage all your courses with color-coded categories and progress tracking"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Progress Tracking",
      description: "Monitor your academic progress with visual indicators and completion rates"
    }
  ];

  // const testimonials = [
  //   {
  //     name: "Sarah Chen",
  //     role: "Computer Science Student",
  //     text: "This app completely transformed how I manage my coursework. I never miss deadlines anymore!",
  //     rating: 5
  //   },
  //   {
  //     name: "Michael Rodriguez",
  //     role: "Business Major",
  //     text: "Simple, clean, and exactly what I needed. Finally, a study planner that doesn't overwhelm me.",
  //     rating: 5
  //   },
  //   {
  //     name: "Emma Thompson",
  //     role: "Psychology Student",
  //     text: "The dashboard view is perfect. I can see everything I need to do at a glance.",
  //     rating: 5
  //   }
  // ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./assets/img/bgImage.png')] bg-cover bg-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-100 leading-tight">
                Master Your 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Studies</span>
              </h1>
              <p className="text-xl text-gray-100 mt-6 leading-relaxed">
                The simple, powerful study planner that helps university students stay organized, 
                meet deadlines, and achieve academic success.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={handleGetStarted} className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                  Start Planning Today
                  <ArrowRight className="inline w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-gray-100 text-gray-100 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-100">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No setup required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Works on all devices
                </div>
              </div>
            </div>
            
            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-4 mb-4">
                  <h3 className="text-white font-semibold">Today's Schedule</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium">Math Assignment</div>
                      <div className="text-sm text-gray-500">Due: Tomorrow</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">History Reading</div>
                      <div className="text-sm text-gray-500">2 hours remaining</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <div className="font-medium">Chemistry Lab Report</div>
                      <div className="text-sm text-gray-500">Due: Friday</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12">
                <Star className="w-10 h-10 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple yet powerful features help you stay organized and focused on what matters most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              From setup to success in minutes, not hours.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Your Courses</h3>
              <p className="text-gray-600">
                Quick setup with course names, codes, and colors. Upload syllabi or add manually.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Tasks</h3>
              <p className="text-gray-600">
                Add assignments, exams, and deadlines. Set priorities and due dates with ease.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Stay Organized</h3>
              <p className="text-gray-600">
                View your dashboard, track progress, and never miss a deadline again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('./assets/img/lowerImage.png')] bg-cover bg-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Study Life?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who use StudyScheduler to stay organized and achieve their academic goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleGetStarted} className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold">
              Start Free Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors">
              Contact Support
            </button>
          </div>
          <p className="text-blue-100 mt-6 text-sm">
            No credit card required • Free forever • Setup in 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;

// const LandingPage = ({ user }) => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <Calendar className="w-8 h-8 text-blue-600" />,
//       title: "Smart Scheduling",
//       description: "Automatically organize your study sessions based on due dates and priorities"
//     },
//     {
//       icon: <CheckCircle className="w-8 h-8 text-green-600" />,
//       title: "Task Management",
//       description: "Keep track of assignments, exams, and deadlines in one simple interface"
//     },
//     {
//       icon: <BookOpen className="w-8 h-8 text-purple-600" />,
//       title: "Course Organization",
//       description: "Manage all your courses with color-coded categories and progress tracking"
//     },
//     {
//       icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
//       title: "Progress Tracking",
//       description: "Monitor your academic progress with visual indicators and completion rates"
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Chen",
//       role: "Computer Science Student",
//       text: "This app completely transformed how I manage my coursework. I never miss deadlines anymore!",
//       rating: 5
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Business Major",
//       text: "Simple, clean, and exactly what I needed. Finally, a study planner that doesn't overwhelm me.",
//       rating: 5
//     },
//     {
//       name: "Emma Thompson",
//       role: "Psychology Student",
//       text: "The dashboard view is perfect. I can see everything I need to do at a glance.",
//       rating: 5
//     }
//   ];

//   const handleGetStarted = () => {
//     if (user) {
//       navigate('/dashboard');
//     } else {
//       navigate('/signup');
//     }
//   };

//   return (
//     <>
//       <Header user={user} transparent={true} />
      
//       {/* Hero Section */}
//       <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-center lg:text-left">
//               <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
//                 Master Your 
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Studies</span>
//               </h1>
//               <p className="text-xl text-gray-600 mt-6 leading-relaxed">
//                 The simple, powerful study planner that helps university students stay organized, 
//                 meet deadlines, and achieve academic success.
//               </p>
//               <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button 
//                   onClick={handleGetStarted}
//                   className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
//                 >
//                   {user ? 'Go to Dashboard' : 'Start Planning Today'}
//                   <ArrowRight className="inline w-5 h-5 ml-2" />
//                 </button>
//                 <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors">
//                   Watch Demo
//                 </button>
//               </div>
//               <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
//                 <div className="flex items-center">
//                   <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//                   Free to use
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//                   No setup required
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//                   Works on all devices
//                 </div>
//               </div>
//             </div>
            
//             {/* Hero Image/Mockup */}
//             <div className="relative">
//               <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
//                 <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-4 mb-4">
//                   <h3 className="text-white font-semibold">Today's Schedule</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center p-3 bg-green-50 rounded-lg">
//                     <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
//                     <div>
//                       <div className="font-medium">Math Assignment</div>
//                       <div className="text-sm text-gray-500">Due: Tomorrow</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center p-3 bg-blue-50 rounded-lg">
//                     <Clock className="w-5 h-5 text-blue-600 mr-3" />
//                     <div>
//                       <div className="font-medium">History Reading</div>
//                       <div className="text-sm text-gray-500">2 hours remaining</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center p-3 bg-orange-50 rounded-lg">
//                     <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
//                     <div>
//                       <div className="font-medium">Chemistry Lab Report</div>
//                       <div className="text-sm text-gray-500">Due: Friday</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12">
//                 <Star className="w-10 h-10 text-yellow-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Everything You Need to Succeed
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our simple yet powerful features help you stay organized and focused on what matters most.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
//                 <div className="flex justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Get Started in 3 Simple Steps
//             </h2>
//             <p className="text-xl text-gray-600">
//               From setup to success in minutes, not hours.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 1
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Your Courses</h3>
//               <p className="text-gray-600">
//                 Quick setup with course names, codes, and colors. Upload syllabi or add manually.
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 2
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Tasks</h3>
//               <p className="text-gray-600">
//                 Add assignments, exams, and deadlines. Set priorities and due dates with ease.
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 3
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Stay Organized</h3>
//               <p className="text-gray-600">
//                 View your dashboard, track progress, and never miss a deadline again.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Loved by Students Everywhere
//             </h2>
//             <p className="text-xl text-gray-600">
//               Join thousands of students who have transformed their academic life.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-gray-50 p-6 rounded-xl">
//                 <div className="flex mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
//                 <div>
//                   <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                   <div className="text-sm text-gray-600">{testimonial.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Study Life?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of successful students who use StudyScheduler to stay organized and achieve their academic goals.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               onClick={handleGetStarted}
//               className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
//             >
//               {user ? 'Go to Dashboard' : 'Start Free Today'}
//             </button>
//             <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-colors">
//               Contact Support
//             </button>
//           </div>
//           <p className="text-blue-100 mt-6 text-sm">
//             No credit card required • Free forever • Setup in 2 minutes
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                   <Target className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">StudyScheduler</span>
//               </div>
//               <p className="text-gray-400">
//                 The simple study planner that helps students succeed academically.
//               </p>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-4">Product</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
//                 <li><Link to="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Bug Reports</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-4">Account</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
//                 <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
//                 {user && <li><Link to="/profile" className="hover:text-white transition-colors">Profile</Link></li>}
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 StudyScheduler. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default LandingPage;
