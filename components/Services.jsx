import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { 
    WebDesign01Icon, 
    Video01Icon, 
    AiChat02Icon, 
    CustomerService01Icon 
} from 'hugeicons-react';

const Services = () => {

  const serviceData = [
      {
          icon: WebDesign01Icon,
          title: "Diseño y Desarrollo Web",
          description: "Landing pages, sitios corporativos y tiendas en línea con WordPress, React o Next.js. Diseño responsivo: tu web se ve bien en teléfono, tablet y computadora.",
          link: "https://blog.noermorales.com/web-design-development/"
      },
      {
          icon: Video01Icon,
          title: "Contenido y Redes Sociales",
          description: "Gestión de perfiles y producción de videos, reels y publicaciones. Me encargo del calendario, la grabación y la edición.",
          link: "https://blog.noermorales.com/content-social-media/"
      },
      {
          icon: AiChat02Icon,
          title: "Automatización con IA",
          description: "Configuro chatbots y respuestas automáticas en tu web y tus redes. Las preguntas frecuentes de tus clientes se contestan solas, a cualquier hora.",
          link: "https://blog.noermorales.com/ai-automation/"
      },
      {
          icon: CustomerService01Icon,
          title: "Soporte Técnico",
          description: "Mantenimiento de tu sitio y de tus herramientas digitales, y ayuda cuando algo deja de funcionar. Soporte remoto o presencial.",
          link: "https://blog.noermorales.com/technical-support/"
      }
  ];

  return (
    <div
      id="services"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Servicios
      </h4>

      <h2 className="text-center text-5xl font-Ovo">
        Qué puedo hacer por ti
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Cuatro áreas de trabajo: sitios web, contenido para redes sociales,
        automatización con IA y soporte técnico. Abajo va el detalle de cada
        una.
      </p>

      <div className="grid grid-cols-auto gap-6 my-10">
        {serviceData.map(({ icon: Icon, title, description, link }, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <div className="w-10 h-10 mb-4 text-gray-700 dark:text-white">
                <Icon size={40} className="stroke-[1.5]" />
            </div>
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80 mb-6">
              {description}
            </p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-black dark:border-white rounded-full text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              Leer más <Image alt="" src={assets.right_arrow} className="w-3 invert dark:invert-0 group-hover:invert-0" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
