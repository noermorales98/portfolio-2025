import { videoData } from "@/assets/assets";
import React from "react";
import { motion } from "motion/react";

const Videos = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="videos"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Videos que cobran vida
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        Edición de Video
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        De la idea al resultado final. Aquí te muestro algunos de los videos
        que he editado para marcas, creadores de contenido y proyectos
        personales. ¡Cada video cuenta una historia!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10"
      >
        {videoData.map((video, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            key={index}
            className="relative w-full"
          >
            <div className="relative pb-[177.78%] overflow-hidden rounded-lg shadow-lg">
              <iframe
                src={`https://www.instagram.com/p/${video.reelId}/embed/`}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
            {video.title && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 * index + 0.2, duration: 0.4 }}
                className="mt-4 text-center"
              >
                <h3 className="font-semibold text-lg font-Ovo">{video.title}</h3>
                {video.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {video.description}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Videos;
