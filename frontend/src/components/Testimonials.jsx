import React from "react";
import { Star } from "lucide-react";

export default function Testimonials() {


    const testimonials = [
    {
      name: "Promise Izere Ineza",
      role: "Computer Science Student",
      text: "This app completely transformed how I manage my coursework. I never miss deadlines anymore!",
      rating: 5
    },
    {
      name: "Michael",
      role: "Business Major",
      text: "Simple, clean, and exactly what I needed. Finally, a study planner that doesn't overwhelm me.",
      rating: 5
    },
    {
      name: "Thompson",
      role: "Psychology Student",
      text: "The dashboard view is perfect. I can see everything I need to do at a glance.",
      rating: 5
    }
  ];

  return (
    <section className="relative bg-white py-20 overflow-hidden">
     

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Loved by Students Everywhere
        </h2>
        <p className="text-gray-600 mt-2">
          Join thousands of students who have transformed their academic life.
        </p>

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
