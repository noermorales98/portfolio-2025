import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { 
    WhatsappIcon, 
    Mail01Icon, 
    InstagramIcon, 
    Linkedin01Icon,
    ArrowRight02Icon
} from 'hugeicons-react';

const Contact = () => {
  return (
    <div
      id="contact"
      className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Conéctate conmigo
      </h4>

      <h2 className="text-center text-5xl font-Ovo flex items-center justify-center gap-2 flex-wrap">
        <span>¡Hablemos!</span> <Image src={assets.saludo_icon} alt="" className="w-8 sm:w-10" />
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Si tienes alguna duda o quieres cotizar un proyecto, elige la opción que prefieras:
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-2xl mx-auto">
        <a
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
        </a>

        <a
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
        </a>
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

    </div>
  );
};

export default Contact;
