import React from "react";
import { Star } from "lucide-react";
// import './index.css'

export default function Testimonials() {


    const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      text: "This app completely transformed how I manage my coursework. I never miss deadlines anymore!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Business Major",
      text: "Simple, clean, and exactly what I needed. Finally, a study planner that doesn't overwhelm me.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Psychology Student",
      text: "The dashboard view is perfect. I can see everything I need to do at a glance.",
      rating: 5
    }
  ];

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-200 opacity-30 animate-bubble"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Loved by Students Everywhere
        </h2>
        <p className="text-gray-600 mt-2">
          Join thousands of students who have transformed their academic life.
        </p>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
