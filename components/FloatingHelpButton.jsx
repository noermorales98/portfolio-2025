'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerSupportIcon, Invoice03Icon, Mail01Icon, Cancel01Icon } from 'hugeicons-react';

export default function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col gap-3"
          >
            <a
              href="#cotizar"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-end gap-3 rounded-full bg-white dark:bg-zinc-800 px-4 py-2 md:px-5 md:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors group"
            >
              <span className="font-medium text-sm md:text-base text-gray-700 dark:text-gray-200">Cotizar</span>
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Invoice03Icon size={18} className="md:w-5 md:h-5" variant="bulk" />
              </div>
            </a>
            
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-end gap-3 rounded-full bg-white dark:bg-zinc-800 px-4 py-2 md:px-5 md:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors group"
            >
              <span className="font-medium text-sm md:text-base text-gray-700 dark:text-gray-200">Contactar</span>
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <Mail01Icon size={18} className="md:w-5 md:h-5" variant="bulk" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        layout
        className={`flex items-center gap-2 md:gap-3 rounded-full px-4 py-3 md:px-6 md:py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] ${
          isOpen 
            ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white' 
            : 'bg-black dark:bg-white text-white dark:text-black'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-medium text-sm md:text-lg">
          {isOpen ? 'Cerrar' : '¿En qué puedo ayudarte?'}
        </span>
        <div className={`flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? (
             <Cancel01Icon size={20} className="md:w-6 md:h-6 text-gray-500" variant="bulk" />
          ) : (
             <CustomerSupportIcon size={20} className="md:w-6 md:h-6" variant="bulk" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
