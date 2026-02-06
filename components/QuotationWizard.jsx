import React, { useState } from 'react';
import { motion } from 'motion/react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { 
    Rocket01Icon, 
    Building03Icon, 
    ShoppingBasket01Icon, 
    Tick02Icon, 
    ArrowLeft02Icon, 
    WhatsappIcon 
} from 'hugeicons-react';

const QuotationWizard = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        projectType: '',
        features: [],
    });

    const projectTypes = [
        { id: 'landing', label: 'Landing Page / Personal', price: 350, description: 'Ideal para perfiles personales o páginas de aterrizaje simples.', icon: Rocket01Icon },
        { id: 'business', label: 'Sitio Web Corporativo', price: 500, description: 'Perfecto para negocios que necesitan múltiples páginas y secciones.', icon: Building03Icon },
        { id: 'ecommerce', label: 'Tienda Online / Web App', price: 750, description: 'Soluciones completas con funcionalidades avanzadas.', icon: ShoppingBasket01Icon },
    ];

    const additionalFeatures = [
        { id: 'seo', label: 'SEO Avanzado', value: 'SEO' },
        { id: 'cms', label: 'Gestor de Contenidos (CMS)', value: 'CMS' },
        { id: 'analytics', label: 'Integración de Analíticas', value: 'Analytics' },
    ];

    const handleTypeSelect = (typeId) => {
        setSelections({ ...selections, projectType: typeId });
        setStep(2);
    };

    const handleFeatureToggle = (featureValue) => {
        const currentFeatures = selections.features;
        if (currentFeatures.includes(featureValue)) {
            setSelections({ ...selections, features: currentFeatures.filter(f => f !== featureValue) });
        } else {
            setSelections({ ...selections, features: [...currentFeatures, featureValue] });
        }
    };

    const calculatePrice = () => {
        const type = projectTypes.find(t => t.id === selections.projectType);
        return type ? type.price : 0;
    };

    const getWhatsAppLink = () => {
        const price = calculatePrice();
        const typeObj = projectTypes.find(t => t.id === selections.projectType);
        const typeLabel = typeObj ? typeObj.label : 'N/A';
        const featuresText = selections.features.length > 0 ? selections.features.join(', ') : 'Ninguna adicional';
        
        const message = `Hola, completé el cuestionario de cotización.
Mi proyecto es: ${typeLabel}
Características extra: ${featuresText}
Presupuesto estimado: $${price} USD
Me gustaría agendar una llamada o recibir más detalles.`;

        return `https://wa.me/529981725547?text=${encodeURIComponent(message)}`;
    };

    return (
        <div id="cotizar" className="w-full px-[12%] py-20 scroll-mt-20">
             <motion.h4
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-2 text-lg font-Ovo"
            >
                Cotizador Online
            </motion.h4>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center text-5xl font-Ovo mb-12"
            >
                Calcula tu inversión ideal
            </motion.h2>

            <div className="max-w-3xl mx-auto bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h3 className="text-2xl font-Ovo mb-6 text-center">¿Qué tipo de proyecto necesitas?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {projectTypes.map((type) => (
                                <div 
                                    key={type.id} 
                                    onClick={() => handleTypeSelect(type.id)}
                                    className="cursor-pointer border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:border-black dark:hover:border-white transition-all hover:shadow-md text-center group flex flex-col items-center"
                                >
                                    <div className="mb-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                        <type.icon size={40} className="stroke-[1.5]" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-2">{type.label}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{type.description}</p>
                                    <span className="inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-semibold">
                                        Desde ${type.price} USD
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <h3 className="text-2xl font-Ovo mb-6 text-center">Extras y Características</h3>
                         <div className="space-y-4 mb-8">
                             {additionalFeatures.map((feature) => (
                                 <div 
                                    key={feature.id}
                                    onClick={() => handleFeatureToggle(feature.value)}
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selections.features.includes(feature.value) ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-600'}`}
                                 >
                                     <span className="font-medium">{feature.label}</span>
                                     <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selections.features.includes(feature.value) ? 'bg-black dark:bg-white border-black dark:border-white' : 'border-gray-300'}`}>
                                         {selections.features.includes(feature.value) && (
                                             <Tick02Icon size={14} className="text-white dark:text-black" />
                                         )}
                                     </div>
                                 </div>
                             ))}
                         </div>
                         <div className="flex justify-between mt-8">
                             <button
                               onClick={() => setStep(1)}
                               className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                             >
                                 <ArrowLeft02Icon size={20} /> Atrás
                             </button>
                             <button
                               onClick={() => setStep(3)}
                               className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
                             >
                                 Ver Cotización
                             </button>
                         </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                        <div className="mb-6">
                            <span className="text-lg text-gray-500 dark:text-gray-300">Tu estimado es:</span>
                            <h3 className="text-6xl font-bold font-Ovo mt-2 text-black dark:text-white">
                                ${calculatePrice()} USD
                            </h3>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                *Este es un precio estimado basado en tu selección. Para una propuesta formal, contáctanos.
                            </p>
                        </div>
                        
                        <a 
                            href={getWhatsAppLink()} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#20b85c] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <WhatsappIcon size={24} variant="solid" />
                            Confirmar y Enviar por WhatsApp
                        </a>

                        <button
                               onClick={() => setStep(2)}
                               className="block w-full mt-6 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white underline"
                             >
                                 Modificar Cotización
                             </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default QuotationWizard;
