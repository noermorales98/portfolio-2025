import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { 
    WhatsappIcon, 
    Mail01Icon, 
    InstagramIcon, 
    Linkedin01Icon,
    ArrowRight02Icon
} from 'hugeicons-react';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Conéctate conmigo
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo flex items-center justify-center gap-2 flex-wrap"
      >
        <span>¡Hablemos!</span> <Image src={assets.saludo_icon} alt="" className="w-8 sm:w-10" />
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        Si tienes alguna duda o quieres cotizar un proyecto, elige la opción que prefieras:
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-2xl mx-auto">
        <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://wa.me/525642663875"
            target="_blank"
            className="flex-1 border border-gray-300 rounded-xl p-8 hover:bg-green-50 hover:border-green-500 cursor-pointer transition-all dark:border-gray-600 dark:hover:bg-green-900/20 text-center flex flex-col items-center gap-4 group"
        >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-400">
                <WhatsappIcon size={24} variant="solid" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Respuesta rápida</p>
            </div>
            <span className="text-sm font-semibold flex items-center gap-1 group-hover:underline">
                Enviar mensaje <ArrowRight02Icon size={14} />
            </span>
        </motion.a>

        <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:noe.rmorales98@gmail.com"
            className="flex-1 border border-gray-300 rounded-xl p-8 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all dark:border-gray-600 dark:hover:bg-blue-900/20 text-center flex flex-col items-center gap-4 group"
        >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                <Mail01Icon size={24} variant="solid" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1">Correo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">noe.rmorales98@gmail.com</p>
            </div>
            <span className="text-sm font-semibold flex items-center gap-1 group-hover:underline">
                Enviar correo <ArrowRight02Icon size={14} />
            </span>
        </motion.a>
      </div>

      <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-6 font-Ovo">También puedes encontrarme en:</p>
          <div className="flex items-center justify-center gap-8">
              <a href="https://instagram.com/noermorales" target="_blank" className="flex items-center gap-2 hover:-translate-y-1 transition-transform">
                  <InstagramIcon size={24} />
                  <span className="font-semibold">@noermorales</span>
              </a>
              <a href="https://www.linkedin.com/in/noermorales/" target="_blank" className="flex items-center gap-2 hover:-translate-y-1 transition-transform">
                  <Linkedin01Icon size={24} />
                  <span className="font-semibold">LinkedIn</span>
              </a>
          </div>
      </div>

    </motion.div>
  );
};

export default Contact;
