import { Outfit, Ovo} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});



export const metadata = {
  title: "Noeli Rodriguez | Servicios Digitales",
  description: "Noeli Rodriguez, desarrollador web y creador de contenido. Servicios de diseño web, contenido digital y automatización con IA.",
  openGraph: {
    title: "Noeli Rodriguez | Servicios Digitales",
    description: "Noeli Rodriguez, desarrollador web y creador de contenido. Servicios de diseño web, contenido digital y automatización con IA.",
    url: "https://www.noermorales.com", 
    siteName: "Noeli Rodriguez Portfolio",
    images: [
      {
        url: "/share.jpg",
        width: 1080,
        height: 1350,
        alt: "Noeli Rodriguez - Desarrollador Web y Creador de Contenido",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noeli Rodriguez | Servicios Digitales",
    description: "Noeli Rodriguez, desarrollador web y creador de contenido. Servicios de diseño web, contenido digital y automatización con IA.",
    images: ["/share.jpg"],
    creator: "@noermorales", 
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
