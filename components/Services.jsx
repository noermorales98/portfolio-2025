import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
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
          description: "Sitios web modernos y que se adaptan a todo, con un diseño súper limpio y pensado en ti. Usamos WordPress, React y Next.js para que tu web sea vea bien en todos los dispositivos.",
          link: "https://blog.noermorales.com/web-design-development/"
      },
      {
          icon: Video01Icon,
          title: "Contenido y Redes Sociales",
          description: "Me encargo de tus redes sociales y creo videos, reels y publicaciones que van a hacer que tu marca luzca bien. ¡A conectar con la gente!",
          link: "https://blog.noermorales.com/content-social-media/"
      },
      {
          icon: AiChat02Icon,
          title: "Automatización con IA",
          description: "Herramientas inteligentes para que las respuestas en tu web y redes sociales sean automáticas. ¡Así te ahorras tiempo y te enfocas en lo que de verdad importa!",
          link: "https://blog.noermorales.com/ai-automation/"
      },
      {
          icon: CustomerService01Icon,
          title: "Soporte Técnico",
          description: "Ayuda personalizada para que esos problemas técnicos no te quiten el sueño y para que tus herramientas digitales siempre estén a punto. ¡Aquí estoy para lo que necesites!",
          link: "https://blog.noermorales.com/technical-support/"
      }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="services"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Lo que ofrezco
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        Mis Servicios
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        Diseño webs que enamoran, creo contenido que pega, automatizo tareas con
        IA para que no te compliques y te doy soporte digital para que tu
        presencia online sea la envidia de otros.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-auto gap-6 my-10"
      >
        {serviceData.map(({ icon: Icon, title, description, link }, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <div className="w-10 h-10 mb-4 text-gray-700 dark:text-white">
                <Icon size={40} className="stroke-[1.5]" />
            </div>
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {description}
            </p>
            <a href={link} className="flex items-center gap-2 text-sm mt-5">
              Leer más <Image alt="" src={assets.right_arrow} className="w-4" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
