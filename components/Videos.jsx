import { videoData } from "@/assets/assets";
import React from "react";

const Videos = ({ isDarkMode }) => {
  return (
    <div
      id="videos"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Videos que cobran vida
      </h4>

      <h2 className="text-center text-5xl font-Ovo">
        Edición de Video
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        De la idea al resultado final. Aquí te muestro algunos de los videos
        que he editado para marcas, creadores de contenido y proyectos
        personales. ¡Cada video cuenta una historia!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10">
        {videoData.map((video, index) => (
          <div
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
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg font-Ovo">{video.title}</h3>
                {video.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {video.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
