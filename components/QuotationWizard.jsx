import React, { useState } from 'react';
import { motion } from 'motion/react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { 
    Rocket01Icon, 
    Building03Icon, 
    ShoppingBasket01Icon, 
 
    ArrowLeft02Icon, 
    WhatsappIcon 
} from 'hugeicons-react';




const QuotationWizard = () => {
    const [step, setStep] = useState(0);
    const [category, setCategory] = useState('');
    const [selections, setSelections] = useState({
        packageId: '',
        note: '',
    });

    const categories = [
        { id: 'monthly', label: 'Planes Mensuales', description: 'Crecimiento continuo para redes y marca.', icon: Rocket01Icon },
        { id: 'web', label: 'Desarrollo Web', description: 'Sitios web profesionales (Pago único).', icon: Building03Icon },
        { id: 'design', label: 'Diseño y Multimedia', description: 'Flyers, Edición de Video y Kits.', icon: ShoppingBasket01Icon },
    ];

    const packages = {
        monthly: [
            { id: 'basic', label: 'Crecimiento Personal', price: 350, description: '1 Red Social, 10 Videos/mes (sin rostro), Optimización de Perfil.', icon: Rocket01Icon },
            { id: 'standard', label: 'Expansión Total', price: 500, description: 'Todo lo anterior + 3 Redes Sociales, Web Informativa + Dominio.', icon: Building03Icon },
            { id: 'premium', label: 'Automatización IA', price: 750, description: 'Todo lo anterior + Chatbot IA y Marketing Digital.', icon: ShoppingBasket01Icon },
        ],
        web: [
            { id: 'landing', label: 'Landing Page', price: 150, description: 'Sitio de 1 página + Botón de contacto (Email/WhatsApp).', icon: Rocket01Icon },
            { id: 'web_standard', label: 'Web Corporativa', price: 350, description: 'Formularios, Blogs e Integración con Facebook.', icon: Building03Icon },
            { id: 'store', label: 'Tienda Online', price: 550, description: 'E-commerce completo con gestión de pagos.', icon: ShoppingBasket01Icon },
        ],
        design: [
            { id: 'flyer', label: 'Flyer Redes', price: 20, description: 'Diseño profesional para redes sociales.', icon: Rocket01Icon },
            { id: 'video', label: 'Edición Video', price: 25, description: 'Video corto (<2min). Incluye 2 variantes.', icon: Building03Icon },
            { id: 'kit', label: 'Kit Social', price: 50, description: 'Paquete de 3 Flyers + 3 Videos cortos.', icon: ShoppingBasket01Icon },
        ]
    };



    const handleCategorySelect = (catId) => {
        setCategory(catId);
        setStep(1);
    };

    const handlePackageSelect = (pkgId) => {
        setSelections({ ...selections, packageId: pkgId });
        setStep(2);
    };



    const getSelectedPackage = () => {
        if (!category || !selections.packageId) return null;
        return packages[category].find(p => p.id === selections.packageId);
    };

    const calculatePrice = () => {
        const pkg = getSelectedPackage();
        return pkg ? pkg.price : 0;
    };

    const getWhatsAppLink = () => {
        const pkg = getSelectedPackage();
        const price = calculatePrice();
        const catLabel = categories.find(c => c.id === category)?.label || 'Servicio';
        const pkgLabel = pkg ? pkg.label : 'N/A';
        const noteText = selections.note ? selections.note : 'Ninguna nota adicional';
        
        const message = `Hola, me interesa un servicio de ${catLabel}.
Paquete: ${pkgLabel}
Nota: ${noteText}
Precio estimado: $${price} USD
Me gustaría más información.`;

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
                Nuestros Servicios
            </motion.h4>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center text-5xl font-Ovo mb-12"
            >
                {step === 0 ? '¿Qué estás buscando?' : 'Personaliza tu plan'}
            </motion.h2>

            <div className="max-w-4xl mx-auto bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                
                {/* STEP 0: Category Selection */}
                {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {categories.map((cat) => (
                                <div 
                                    key={cat.id} 
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className="cursor-pointer border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:border-black dark:hover:border-white transition-all hover:shadow-md text-center group flex flex-col items-center h-full justify-center"
                                >
                                    <div className="mb-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                        <cat.icon size={48} className="stroke-[1.5]" />
                                    </div>
                                    <h4 className="font-bold text-xl mb-2">{cat.label}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">{cat.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 1: Package Selection */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-2 mb-6 cursor-pointer text-gray-500" onClick={() => setStep(0)}>
                            <ArrowLeft02Icon size={20} /> <span className="text-sm">Volver a categorías</span>
                        </div>
                        <h3 className="text-2xl font-Ovo mb-6 text-center">Selecciona un {category === 'monthly' ? 'Plan' : 'Paquete'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {packages[category]?.map((pkg) => (
                                <div 
                                    key={pkg.id} 
                                    onClick={() => handlePackageSelect(pkg.id)}
                                    className="cursor-pointer border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:border-black dark:hover:border-white transition-all hover:shadow-md text-center group flex flex-col items-center justify-between"
                                >
                                    <div>
                                        <div className="mb-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors flex justify-center">
                                            <pkg.icon size={40} className="stroke-[1.5]" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">{pkg.label}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{pkg.description}</p>
                                    </div>
                                    <span className="inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-semibold mt-2">
                                        ${pkg.price} USD
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: Extras (Optional) */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <h3 className="text-2xl font-Ovo mb-6 text-center">¿Deseas agregar algo más?</h3>
                         <p className="text-center text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                             Cuéntanos más detalles sobre tu proyecto o necesidades específicas.
                         </p>

                         <div className="max-w-2xl mx-auto mb-8">
                            <textarea
                                value={selections.note || ''}
                                onChange={(e) => setSelections({ ...selections, note: e.target.value })}
                                placeholder="Escribe aquí tus ideas, dudas o requerimientos especiales..."
                                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none resize-none bg-gray-50 dark:bg-gray-800 dark:text-white"
                            ></textarea>
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
                                 Ver Resumen
                             </button>
                         </div>
                    </motion.div>
                )}

                {/* STEP 3: Result */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                        <div className="mb-6">
                            <span className="text-gray-500 dark:text-gray-300 uppercase tracking-wide text-sm">Sugerencia Recomendada</span>
                            <h3 className="text-4xl font-bold font-Ovo mt-4 mb-2 text-black dark:text-white">
                                {getSelectedPackage()?.label}
                            </h3>
                            <div className="text-6xl font-bold text-black dark:text-white my-6">
                                ${calculatePrice()} <span className="text-2xl font-normal text-gray-500">USD</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                *Esto es un estimado. Para confirmar disponibilidad y detalles, envíame un mensaje.
                            </p>
                        </div>
                        
                        <a 
                            href={getWhatsAppLink()} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#20b85c] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <WhatsappIcon size={24} variant="solid" />
                            Lo quiero, contactar por WhatsApp
                        </a>

                        <button
                               onClick={() => setStep(0)}
                               className="block w-full mt-8 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white underline"
                             >
                                 Iniciar nueva cotización
                             </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default QuotationWizard;
