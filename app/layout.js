import { Outfit, Ovo} from "next/font/google";
import "./globals.css";
import FloatingHelpButton from "@/components/FloatingHelpButton";

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
        url: "/about-me.webp",
        width: 1200,
        height: 630,
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
    images: ["/about-me.webp"],
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
        <FloatingHelpButton />
      </body>
    </html>
  );
}
