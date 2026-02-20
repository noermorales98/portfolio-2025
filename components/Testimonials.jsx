import { testimonialsData } from "@/assets/assets";
import React from "react";

const Testimonials = ({ isDarkMode }) => {
  return (
    <div
      id="testimonials"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Lo que dicen mis clientes
      </h4>

      <h2 className="text-center text-5xl font-Ovo">
        Testimonios
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        La opinión de quienes han confiado en mi trabajo es lo que más me
        impulsa a seguir mejorando. Aquí te comparto algunos testimonios
        reales.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-10">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white dark:bg-darkHover/30 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              {testimonial.image && (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
                  {testimonial.image.startsWith("http") ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg font-Ovo">
                  {testimonial.name}
                </h3>
                {testimonial.role && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 font-Ovo italic">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
