'use client';

import { useState, useEffect } from 'react';

export default function QuoteDashboard({ onLogout, initialData = {} }) {
  // --- Sender / Branding State (defaults from props or generic) ---
  const [senderName, setSenderName] = useState(initialData.senderName || 'Tu Nombre / Empresa');
  const [senderRole, setSenderRole] = useState(initialData.senderRole || 'Servicios Profesionales de Diseño y Desarrollo Web');
  const [senderEmail, setSenderEmail] = useState(initialData.senderEmail || 'contacto@ejemplo.com');
  const [senderWebsite, setSenderWebsite] = useState(initialData.senderWebsite || 'www.tuejemplo.com');
  
  const [showSenderConfig, setShowSenderConfig] = useState(false);
  const [showDesignConfig, setShowDesignConfig] = useState(false);

  // Customization State
  const [logoImage, setLogoImage] = useState(initialData.logoImage || null);
  const [includeLogo, setIncludeLogo] = useState(!!initialData.logoImage);
  const [signatureMode, setSignatureMode] = useState(initialData.signatureMode || 'none'); // 'image', 'text', 'none'
  const [signatureImage, setSignatureImage] = useState(initialData.signatureImage || null);
  const [signatureText, setSignatureText] = useState(initialData.signatureText || 'Firma Digital');
  
  // Colors
  const DEFAULTS = {
    headerBg: '#2C2C2C',
    headerText: '#FFFFFF',
    bodyBg: '#F9F9F7',
    bodyText: '#1a1a1a',
    highlightBg: '#2C2C2C',
    highlightText: '#000000'
  };

  const THEMES = {
    elegant: {
      name: 'Elegante (Default)',
      colors: { ...DEFAULTS }
    },
    formal: {
      name: 'Formal (Blanco/Negro)',
      colors: {
        headerBg: '#FFFFFF',
        headerText: '#000000',
        bodyBg: '#FFFFFF',
        bodyText: '#000000',
        highlightBg: '#000000',
        highlightText: '#FFFFFF'
      }
    },
    bold: {
      name: 'Bold (Oscuro)',
      colors: {
        headerBg: '#000000',
        headerText: '#FFFFFF',
        bodyBg: '#111111',
        bodyText: '#FFFFFF',
        highlightBg: '#FFFFFF',
        highlightText: '#000000'
      }
    },
    material: {
      name: 'Material Blue',
      colors: {
        headerBg: '#1976D2',
        headerText: '#FFFFFF',
        bodyBg: '#F5F5F6',
        bodyText: '#212121',
        highlightBg: '#1565C0',
        highlightText: '#FFFFFF'
      }
    },
    red: {
      name: 'Professional Red',
      colors: {
        headerBg: '#D32F2F',
        headerText: '#FFFFFF',
        bodyBg: '#FFFFFF',
        bodyText: '#000000',
        highlightBg: '#B71C1C',
        highlightText: '#FFFFFF'
      }
    },
    pastel: {
      name: 'Pastel Soft',
      colors: {
        headerBg: '#E1BEE7',
        headerText: '#4A4A4A',
        bodyBg: '#FFFDF5',
        bodyText: '#5D4037',
        highlightBg: '#F8BBD0',
        highlightText: '#4A4A4A'
      }
    }
  };

  const applyTheme = (themeKey) => {
    const theme = THEMES[themeKey];
    if (!theme) return;
    setHeaderBg(theme.colors.headerBg);
    setHeaderText(theme.colors.headerText);
    setBodyBg(theme.colors.bodyBg);
    setBodyText(theme.colors.bodyText);
    setHighlightBg(theme.colors.highlightBg);
    setHighlightText(theme.colors.highlightText);
  };

  const [headerBg, setHeaderBg] = useState(initialData.headerBg || DEFAULTS.headerBg);
  const [headerText, setHeaderText] = useState(initialData.headerText || DEFAULTS.headerText);
  const [bodyBg, setBodyBg] = useState(initialData.bodyBg || DEFAULTS.bodyBg);
  const [bodyText, setBodyText] = useState(initialData.bodyText || DEFAULTS.bodyText);
  const [highlightBg, setHighlightBg] = useState(initialData.highlightBg || DEFAULTS.highlightBg);
  const [highlightText, setHighlightText] = useState(initialData.highlightText || DEFAULTS.highlightText);

  const resetColors = () => {
    setHeaderBg(DEFAULTS.headerBg);
    setHeaderText(DEFAULTS.headerText);
    setBodyBg(DEFAULTS.bodyBg);
    setBodyText(DEFAULTS.bodyText);
    setHighlightBg(DEFAULTS.highlightBg);
    setHighlightText(DEFAULTS.highlightText);
  };

  const hasCustomColors = headerBg !== DEFAULTS.headerBg || 
                          headerText !== DEFAULTS.headerText || 
                          bodyBg !== DEFAULTS.bodyBg || 
                          bodyText !== DEFAULTS.bodyText || 
                          highlightBg !== DEFAULTS.highlightBg || 
                          highlightText !== DEFAULTS.highlightText;

  // Payment Config State
  const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' or 'link'
  const [paymentLink, setPaymentLink] = useState(initialData.paymentLink || 'https://paypal.me/usuario');
  const [bankDetails, setBankDetails] = useState({
    bank: initialData.bankName || 'Banco Ejemplo',
    account: initialData.bankAccount || '1234 5678 9012',
    clabe: initialData.bankClabe || '012345678901234567',
    holder: initialData.bankHolder || 'Nombre del Titular'
  });

  // Core Info
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [packageName, setPackageName] = useState('');
  const [quoteNumber, setQuoteNumber] = useState('');

  useEffect(() => {
    setQuoteNumber(Date.now().toString().slice(-6));
  }, []);
  
  // New Fields
  const [currency, setCurrency] = useState('USD'); // Default to USD text
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState(initialData.defaultNotes || 'Condiciones del servicio, tiempos de entrega y detalles de pago.');

  // --- Items & Totals State ---
  const [items, setItems] = useState(initialData.items || [
    { id: 1, name: 'Servicio Ejemplo', quantity: 1, price: 1000 }
  ]);
  const [includeIva, setIncludeIva] = useState(false);
  const [ivaPercentage, setIvaPercentage] = useState(16);
  const [ivaMode, setIvaMode] = useState('add'); // 'add' (sumar) or 'inclusive' (desglosar)

  // Page Size State
  const [pageSize, setPageSize] = useState('letter');
  
  const PAGE_SIZES = {
    letter: { name: 'Carta (Letter)', css: '8.5in 11in', width: '215.9mm', height: '279.4mm' },
    a4: { name: 'A4', css: '210mm 297mm', width: '210mm', height: '297mm' },
    legal: { name: 'Oficio (Legal)', css: '8.5in 14in', width: '215.9mm', height: '355.6mm' },
  };

  // --- Helpers ---
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  // --- Calculations ---
  const rawSum = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRateDecimal = ivaPercentage / 100;
  
  let subtotal = 0;
  let taxAmount = 0;
  let total = 0;

  if (!includeIva) {
      subtotal = rawSum;
      taxAmount = 0;
      total = rawSum;
  } else {
      if (ivaMode === 'add') {
          // Add Tax: Total = Subtotal + (Subtotal * rate)
          subtotal = rawSum;
          taxAmount = subtotal * taxRateDecimal;
          total = subtotal + taxAmount;
      } else {
          // Inclusive Tax: Total = RawSum, need to extract Subtotal
          // Total = Subtotal * (1 + rate)  => Subtotal = Total / (1 + rate)
          total = rawSum;
          subtotal = total / (1 + taxRateDecimal);
          taxAmount = total - subtotal;
      }
  }


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getFormattedDate = (dateStr) => {
     if (!dateStr) return '';
     const d = new Date(dateStr + 'T12:00:00'); 
     const day = d.getDate();
     const month = d.toLocaleDateString('es-ES', { month: 'long' });
     const year = d.getFullYear();
     return `${day} de ${month} del ${year}`;
  };

  const handleDownloadMarkdown = () => {
    const content = `
# Cotización #${quoteNumber}: ${packageName}

**De:** ${senderName} (${senderEmail})
**Para:** ${clientName}
**Fecha:** ${getFormattedDate(date)}
${clientEmail ? `**Email Cliente:** ${clientEmail}` : ''}
${clientPhone ? `**Tel Cliente:** ${clientPhone}` : ''}

---

## Servicios (${currency})

${items.map(item => `- **${item.name}** (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

---

**Subtotal:** $${subtotal.toFixed(2)} ${currency}
${includeIva ? `**IVA (${ivaPercentage}%):** $${taxAmount.toFixed(2)} ${currency}` : ''}
**Total:** $${total.toFixed(2)} ${currency}

**Notas:**
${notes}

**Método de Pago:**
${paymentMethod === 'bank' ? `
Banco: ${bankDetails.bank}
Cuenta: ${bankDetails.account}
CLABE: ${bankDetails.clabe}
Titular: ${bankDetails.holder}
` : `Link: ${paymentLink}`}

Generated by ${senderWebsite}
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cotizacion-${quoteNumber}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('quote-preview');
    if (!element) return;

    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Convert pageSize 'letter' to array if needed, but jsPDF handles strings like 'letter', 'a4', 'legal'
    // However, html2pdf might need specific dimensions or just the string if it matches standard.
    // Let's use the string from state directly as it matches jsPDF format options usually.
    // If not, we can use the dimensions from PAGE_SIZES.
    // The PAGE_SIZES css format is '8.5in 11in'. jsPDF expects 'letter', 'a4', 'legal' or [width, height].
    
    const opt = {
      margin: 0,
      filename: `cotizacion-${quoteNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: pageSize, orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 print:bg-white print:text-black print:p-0 font-inter">
      <div className="max-w-6xl mx-auto">
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page {
              size: ${PAGE_SIZES[pageSize].css};
              margin: 0;
            }
            body {
              margin: 0;
            }
          }
        `}} />
        {/* Editor Header - Hidden in Print */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Generador de Cotizaciones
          </h1>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-lg px-3 py-1.5 text-xs">
                <span className="text-zinc-500 font-medium">Moneda:</span>
                <input 
                  type="text" 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent w-12 focus:outline-none font-bold text-zinc-700 uppercase"
                  placeholder="MXN"
                />
             </div>
            {onLogout && (
                <button 
                onClick={onLogout}
                className="text-xs flex items-center gap-2 text-zinc-500 hover:text-black transition-colors"
                >
                Salir
                </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">
          {/* Editor Column - Hidden in Print - COMPACT & ROUNDED */}
          <div className="lg:col-span-1 space-y-4 print:hidden">
            
             {/* SENDER DETAILS TOGGLE */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                <button 
                    onClick={() => setShowSenderConfig(!showSenderConfig)}
                    className="flex justify-between items-center w-full text-sm font-semibold mb-0"
                >
                    <span>Datos del Remitente</span>
                    <span className="text-xs text-zinc-500">{showSenderConfig ? 'Ocultar' : 'Editar'}</span>
                </button>
                
                {showSenderConfig && (
                    <div className="mt-3 space-y-2 border-t border-zinc-200 pt-3 animate-fadeIn">
                        <input type="text" placeholder="Tu Nombre / Empresa" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                        <input type="text" placeholder="Rol / Slogan" value={senderRole} onChange={(e) => setSenderRole(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                        <input type="text" placeholder="Email de contacto" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                        <input type="text" placeholder="Sitio Web (Footer)" value={senderWebsite} onChange={(e) => setSenderWebsite(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                    </div>
                )}
            </div>

            {/* DESIGN CUSTOMIZATION TOGGLE */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                <button 
                    onClick={() => setShowDesignConfig(!showDesignConfig)}
                    className="flex justify-between items-center w-full text-sm font-semibold mb-0"
                >
                    <span>Personalización y Diseño</span>
                    <span className="text-xs text-zinc-500">{showDesignConfig ? 'Ocultar' : 'Editar'}</span>
                </button>
                
                {showDesignConfig && (
                    <div className="mt-3 space-y-4 border-t border-zinc-200 pt-3 animate-fadeIn">
                        
                        {/* Reset Colors */}


                        {/* Logo Config */}
                        <div className="bg-white p-2 rounded-lg border border-zinc-200">
                             <label className="flex items-center justify-between text-[10px] uppercase tracking-wide font-medium text-zinc-700 mb-2 cursor-pointer">
                                 <span>¿Incluir Logotipo?</span>
                                 <input 
                                     type="checkbox" 
                                     checked={includeLogo} 
                                     onChange={(e) => {
                                         setIncludeLogo(e.target.checked);
                                         // Was checking if (!e.target.checked) setLogoImage(null); -- Removed to persist data
                                     }}
                                     className="accent-black"
                                 />
                             </label>
                             
                             {includeLogo && (
                                 <div className="pt-2 border-t border-zinc-100 animate-fadeIn">
                                     
                                     {logoImage ? (
                                         <div className="flex items-center gap-3 bg-zinc-50 p-2 rounded-lg border border-zinc-200">
                                            <div className="h-8 w-8 bg-white border border-zinc-200 rounded flex items-center justify-center overflow-hidden">
                                                <img src={logoImage} alt="Logo Prev" className="h-full w-full object-contain" />
                                            </div>
                                            <div className="flex-1 text-[10px] text-zinc-500 truncate">Logo cargado</div>
                                            <button 
                                                onClick={() => setLogoImage(null)}
                                                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                                title="Eliminar logo"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                            </button>
                                         </div>
                                     ) : (
                                         <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full text-xs text-zinc-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300" />
                                     )}
                                 </div>
                             )}
                        </div>

                         {/* Signature Config - Improved Toggle */}
                         <div className="bg-white p-2 rounded-lg border border-zinc-200">
                            <label className="flex items-center justify-between text-[10px] uppercase tracking-wide font-medium text-zinc-700 mb-2 cursor-pointer">
                                <span>¿Incluir Firma?</span>
                                <input 
                                    type="checkbox" 
                                    checked={signatureMode !== 'none'} 
                                    onChange={(e) => setSignatureMode(e.target.checked ? 'image' : 'none')}
                                    className="accent-black"
                                />
                            </label>
                            
                            {signatureMode !== 'none' && (
                                <div className="space-y-2 pt-2 border-t border-zinc-100 animate-fadeIn">
                                    <div className="flex gap-2">
                                        <button onClick={() => setSignatureMode('image')} className={`flex-1 text-[10px] py-1 rounded border transition-colors ${signatureMode === 'image' ? 'bg-black text-white border-black' : 'hover:bg-zinc-50 border-zinc-200 text-zinc-600'}`}>Usar Imagen</button>
                                        <button onClick={() => setSignatureMode('text')} className={`flex-1 text-[10px] py-1 rounded border transition-colors ${signatureMode === 'text' ? 'bg-black text-white border-black' : 'hover:bg-zinc-50 border-zinc-200 text-zinc-600'}`}>Escribir Texto</button>
                                    </div>
                                    
                                    {signatureMode === 'image' && (
                                        signatureImage ? (
                                            <div className="flex items-center gap-3 bg-zinc-50 p-2 rounded-lg border border-zinc-200 mt-2">
                                                <div className="h-8 w-16 bg-white border border-zinc-200 rounded flex items-center justify-center overflow-hidden">
                                                    <img src={signatureImage} alt="Firma Prev" className="h-full w-full object-contain opacity-80" />
                                                </div>
                                                <div className="flex-1 text-[10px] text-zinc-500 truncate">Firma cargada</div>
                                                <button 
                                                    onClick={() => setSignatureImage(null)}
                                                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                                    title="Eliminar firma"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <input type="file" accept="image/*" onChange={handleSignatureUpload} className="w-full text-xs text-zinc-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300" />
                                        )
                                    )}
                                    {signatureMode === 'text' && (
                                        <input type="text" value={signatureText} onChange={(e) => setSignatureText(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" placeholder="Escribe tu firma..." />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Colors */}
                        <div className="space-y-3">
                            <div>
                                <label className="block text-zinc-500 text-[10px] uppercase tracking-wide font-medium mb-2">Colores (Temas)</label>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(THEMES).map(([key, theme]) => (
                                        <button 
                                            key={key}
                                            onClick={() => applyTheme(key)}
                                            className="text-[9px] px-2 py-1 rounded border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-colors"
                                            title={theme.name}
                                        >
                                            {theme.name.split(' ')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-[9px] text-zinc-400 block mb-1">Fondo Cabecera</span>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={headerBg} onChange={(e) => setHeaderBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        <span className="text-[9px] font-mono text-zinc-500">{headerBg}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[9px] text-zinc-400 block mb-1">Texto Cabecera</span>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={headerText} onChange={(e) => setHeaderText(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        <span className="text-[9px] font-mono text-zinc-500">{headerText}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[9px] text-zinc-400 block mb-1">Fondo Página</span>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={bodyBg} onChange={(e) => setBodyBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        <span className="text-[9px] font-mono text-zinc-500">{bodyBg}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[9px] text-zinc-400 block mb-1">Texto Página</span>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        <span className="text-[9px] font-mono text-zinc-500">{bodyText}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 border-t border-zinc-100 pt-2 mt-1">
                                    <span className="text-[9px] text-zinc-400 block mb-1 font-bold">Resaltado (Tabla Total)</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-zinc-400 block mb-1">Fondo Resaltado</span>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={highlightBg} onChange={(e) => setHighlightBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        <span className="text-[9px] font-mono text-zinc-500">{highlightBg}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[9px] text-zinc-400 block mb-1">Texto Resaltado</span>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={highlightText} onChange={(e) => setHighlightText(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        <span className="text-[9px] font-mono text-zinc-500">{highlightText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {hasCustomColors && (
                            <div className="flex justify-end pt-2 border-t border-zinc-100">
                                 <button onClick={resetColors} className="text-[10px] text-red-500 hover:text-red-700 underline">Restablecer Colores</button>
                            </div>
                        )}

                    </div>
                )}
            </div>


             {/* Payment Method Config */}
             <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <h2 className="text-sm font-semibold mb-3">Método de Pago</h2>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                  <input type="radio" name="paymentType" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-black" />
                  Banco
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                  <input type="radio" name="paymentType" checked={paymentMethod === 'link'} onChange={() => setPaymentMethod('link')} className="accent-black" />
                  Link de Pago
                </label>
              </div>
              
              {paymentMethod === 'bank' ? (
                <div className="space-y-2">
                   <input type="text" placeholder="Banco" value={bankDetails.bank} onChange={(e) => setBankDetails({...bankDetails, bank: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                   <input type="text" placeholder="No. Cuenta" value={bankDetails.account} onChange={(e) => setBankDetails({...bankDetails, account: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                   <input type="text" placeholder="CLABE" value={bankDetails.clabe} onChange={(e) => setBankDetails({...bankDetails, clabe: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                   <input type="text" placeholder="Titular" value={bankDetails.holder} onChange={(e) => setBankDetails({...bankDetails, holder: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                </div>
              ) : (
                <div>
                   <input type="text" placeholder="Link de pago (ej. paypal.me/...)" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                </div>
              )}
             </div>

            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <h2 className="text-sm font-semibold mb-3">Detalles del Cliente</h2>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">No. Cotización</label>
                        <input
                            type="text"
                            value={quoteNumber}
                            onChange={(e) => setQuoteNumber(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">Fecha</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                        />
                    </div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">Nombre / Empresa</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                    placeholder="Cliente"
                  />
                </div>
                 {/* Optional Client Fields */}
                <div>
                   <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">Dirección</label>
                   <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                    placeholder="Calle, Ciudad, CP"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                    <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">Email</label>
                    <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                    />
                    </div>
                    <div>
                    <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">Teléfono</label>
                    <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                    />
                    </div>
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] mb-0.5 uppercase tracking-wide font-medium">Paquete/Proyecto</label>
                  <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <div className="flex justify-between items-center mb-3">
                 <h2 className="text-sm font-semibold">Servicios</h2>
                 
                 {/* Simplified Tax Settings */}
                 <div className="flex items-center gap-2">
                     <label className="flex items-center gap-1 text-[10px] cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={includeIva} 
                            onChange={(e) => setIncludeIva(e.target.checked)}
                            className="accent-black h-3 w-3"
                        />
                        IVA
                     </label>
                     {includeIva && (
                        <div className="relative">
                            <input 
                                type="number" 
                                value={ivaPercentage} 
                                onChange={(e) => setIvaPercentage(Number(e.target.value))}
                                className="w-10 bg-white border border-zinc-200 rounded px-1 py-0.5 text-[10px] focus:border-black outline-none text-center"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-zinc-400 pointer-events-none">%</span>
                        </div>
                     )}
                 </div>
              </div>
              
              {/* Only show tax mode toggle if IVA is enabled */}
              {includeIva && (
                 <div className="flex gap-2 mb-3 bg-white p-1 rounded-lg border border-zinc-100">
                    <button 
                        onClick={() => setIvaMode('add')}
                        className={`flex-1 text-[10px] py-1 rounded-md transition-all ${ivaMode === 'add' ? 'bg-black text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
                    >
                        Sumar (+IVA)
                    </button>
                    <button 
                        onClick={() => setIvaMode('inclusive')}
                        className={`flex-1 text-[10px] py-1 rounded-md transition-all ${ivaMode === 'inclusive' ? 'bg-black text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
                    >
                        Ya Incluido (Desglosar)
                    </button>
                 </div>
              )}

              {/* Labels for Inputs */}
              <div className="flex gap-2 mb-1 px-1">
                  <span className="flex-1 text-[9px] uppercase font-bold text-zinc-400">Descripción</span>
                  <span className="w-12 text-[9px] uppercase font-bold text-zinc-400 text-center">Cant.</span>
                  <span className="w-16 text-[9px] uppercase font-bold text-zinc-400 text-right">Precio</span>
              </div>

              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <div className="flex-1 flex gap-2">
                         <input
                          type="text"
                          placeholder="Servicio"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          className="w-full min-w-0 bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors"
                        />
                         <input
                          type="number"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-12 bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors text-center"
                        />
                         <input
                          type="number"
                          placeholder="0.00"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                          className="w-16 bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors text-right"
                        />
                    </div>
                   
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-red-500 p-1.5 transition-colors"
                    >
                      X
                    </button>
                  </div>
                ))}
                
                <div className="flex justify-between items-center text-xs font-medium pt-2 border-t border-zinc-200 px-1">
                    <span>Total Estimado:</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={addItem}
                  className="w-full flex items-center justify-center gap-2 text-zinc-600 text-xs hover:bg-zinc-100 py-1.5 border border-dashed border-zinc-300 rounded-lg hover:border-black transition-colors mt-2"
                >
                  + Agregar Item
                </button>
              </div>
            </div>

             <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <h2 className="text-sm font-semibold mb-3">Notas</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                 className="w-full bg-white border border-zinc-200 rounded-lg p-2 focus:border-black outline-none transition-colors h-24 resize-none text-xs"
                 placeholder="Agregar descripción del proyecto, notas, términos..."
              />
            </div>

            {/* Page Size Config */}
             <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 mt-6 print:hidden">
               <h2 className="text-sm font-semibold mb-3">Configuración de Página</h2>
               <div className="space-y-2">
                  <label className="block text-zinc-500 text-[10px] uppercase tracking-wide font-medium">Tamaño de Hoja</label>
                  <select 
                    value={pageSize} 
                    onChange={(e) => setPageSize(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:border-black outline-none transition-colors"
                  >
                    {Object.entries(PAGE_SIZES).map(([key, size]) => (
                      <option key={key} value={key}>{size.name}</option>
                    ))}
                  </select>
               </div>
             </div>

            <div className="flex gap-2 mt-4 print:hidden">
               <button
                onClick={handleDownloadPDF}
                className="flex-1 bg-black text-white hover:bg-zinc-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors shadow-lg shadow-zinc-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar PDF
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="flex-1 bg-white text-black border border-zinc-200 hover:border-black py-3 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                Descargar MD
              </button>
            </div>
          </div>

          {/* PREVIEW / PRINT VIEW - COMPACT VERSION */}
          <div className="lg:col-span-2 lg:sticky lg:top-6 h-fit">
            {/* Dynamic Page Size Style */}
            <style>{`
              @page {
                size: ${PAGE_SIZES[pageSize].css};
                margin: 0;
              }
              @media print {
                body {
                  margin: 0;
                }
              }
            `}</style>
            <div 
                id="quote-preview"
                className="shadow-lg mx-auto print:shadow-none print:w-full print:max-w-none print:min-h-0 relative flex flex-col font-inter transition-all duration-300 ease-in-out"
                style={{ 
                    WebkitPrintColorAdjust: 'exact', 
                    printColorAdjust: 'exact',
                    width: PAGE_SIZES[pageSize].width,
                    height: PAGE_SIZES[pageSize].height,
                    overflow: 'hidden',
                    backgroundColor: bodyBg,
                    color: bodyText
                }}
            >
                
                {/* 1. Header Dark - Compact with Forced Print Color */}
                <div 
                    className="p-8 pr-12 h-36 flex justify-between items-start relative overflow-hidden transition-colors"
                    style={{ 
                        WebkitPrintColorAdjust: 'exact', 
                        printColorAdjust: 'exact', 
                        backgroundColor: headerBg,
                        color: headerText
                    }}
                >
                    <div className="z-10">
                        <h1 className="text-4xl font-light tracking-wide mb-1 leading-none capitalize" style={{ color: headerText }}>{senderName}</h1>
                        <p className="text-xs tracking-[0.2em] font-light uppercase opacity-80" style={{ color: headerText }}>{senderRole}</p>
                    </div>
                    {/* Decorative Logo or Asterisk */}
                    <div className="opacity-90 leading-none select-none">
                        {includeLogo && (
                            logoImage ? (
                                <img src={logoImage} alt="Logo" className="h-16 w-16 object-contain" />
                            ) : (
                                <span className="text-[60px]" style={{ fontFamily: 'monospace', color: headerText }}>*</span>
                            )
                        )}
                    </div>
                </div>

                <div className="p-8 pb-4 pt-6 flex-1 relative">
                     {/* 2. Top Info Row - Compact */}
                     <div className="flex justify-between items-end mb-8">
                         <div className="text-xs font-medium opacity-70">
                            Fecha: {getFormattedDate(date)}
                         </div>
                         <div className="text-right max-w-sm">
                             <h2 className="text-3xl font-normal mb-1 opacity-90">Cotización</h2>
                             <p className="text-[9px] leading-relaxed opacity-60 text-justify">
                                {notes && notes.length > 0 ? (notes.length > 150 ? notes.slice(0, 150) + '...' : notes) : 'Gracias.'}
                             </p>
                         </div>
                     </div>


                     {/* 3. Grid Layout: Left Sidebar + Main Content */}
                     <div className="grid grid-cols-12 gap-6">
                         
                         {/* LEFT SIDEBAR (Client Info) */}
                         <div className="col-span-4 space-y-6 border-r border-zinc-200/0 pr-4"> 
                            
                            {/* CLIENTE */}
                            <div>
                                <h3 className="text-[9px] font-bold uppercase tracking-wider opacity-50 mb-2">Cliente</h3>
                                <p className="font-semibold text-xs mb-1 opacity-90">{clientName || 'Nombre del Cliente'}</p>
                                <div className="text-[10px] opacity-60 space-y-0.5">
                                    {clientAddress && <p>{clientAddress}</p>}
                                    {clientPhone && <p>{clientPhone}</p>}
                                    {clientEmail && <p>{clientEmail}</p>}
                                </div>
                            </div>

                            {/* FOLIO */}
                            <div>
                                <h3 className="text-[9px] font-bold uppercase tracking-wider opacity-50 mb-1">Folio</h3>
                                <p className="text-xs font-medium opacity-90">{quoteNumber}</p>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="pt-8">
                                <h3 className="text-[9px] font-bold uppercase tracking-wider opacity-90 mb-2">Método de Pago:</h3>
                                {paymentMethod === 'bank' ? (
                                    <div className="text-[10px] opacity-60 space-y-1">
                                        <p>Banco: {bankDetails.bank}</p>
                                        <p>Cuenta: {bankDetails.account}</p>
                                        <p>CLABE: {bankDetails.clabe}</p>
                                        <p>Titular: {bankDetails.holder}</p>
                                    </div>
                                ) : (
                                    <div className="text-[10px] opacity-60 space-y-1">
                                        <p className="mb-2">Pagar en línea:</p>
                                        <a href={paymentLink} target="_blank" className="inline-flex items-center justify-center px-4 py-2 rounded text-[10px] font-medium tracking-wide transition-colors" style={{ backgroundColor: headerBg, color: headerText }}>
                                            PAGAR AQUÍ
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* CONTACT */}
                            <div className="pt-4">
                                <h3 className="text-[9px] font-bold uppercase tracking-wider opacity-90 mb-2">Contáctanos:</h3>
                                <div className="text-[10px] opacity-60 space-y-1">
                                    <p>{senderEmail}</p>
                                    <p>{senderWebsite}</p>
                                </div>
                            </div>

                         </div>


                         {/* RIGHT MAIN CONTENT (Table) */}
                         <div className="col-span-8">
                             {/* Project Title */}
                             <div className="flex justify-between items-baseline border-b border-zinc-300/30 pb-2 mb-4">
                                <div className="flex gap-2 text-[9px] font-bold uppercase tracking-wider opacity-90">
                                    <span>Proyecto:</span>
                                    <span className="opacity-60">{packageName || 'GENERAL'}</span>
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-wider opacity-90">
                                    Factura No. {quoteNumber}
                                </div>
                             </div>

                             {/* Table Header */}
                             <div className="grid grid-cols-12 gap-2 mb-2 text-[9px] font-bold uppercase tracking-wider opacity-60">
                                 <div className="col-span-1 text-center">No</div>
                                 <div className="col-span-5">Descripción</div>
                                 <div className="col-span-2 text-right">Precio</div>
                                 <div className="col-span-2 text-center">Cant.</div>
                                 <div className="col-span-2 text-center">Total</div>
                             </div>

                             {/* Items */}
                             <div className="space-y-2 mb-6 min-h-[150px]">
                                {items.map((item, index) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-2 text-[11px] items-center group relative py-1">
                                        {/* Highlight Bar for Total - Absolute Background */}
                                        <div 
                                            className="absolute right-0 top-[-2px] bottom-[-2px] w-[16.666%] -z-10 opacity-100 group-hover:opacity-90"
                                            style={{ backgroundColor: highlightBg, color: highlightText }} 
                                        ></div>

                                        <div className="col-span-1 text-center opacity-50 font-light">{index + 1}</div>
                                        <div className="col-span-11 sm:col-span-5 opacity-90 font-medium pr-2 leading-tight">
                                            {item.name || 'Servicio'}
                                        </div>
                                        <div className="hidden sm:block sm:col-span-2 text-right opacity-70">
                                            ${Number(item.price).toFixed(2)}
                                        </div>
                                        <div className="hidden sm:block sm:col-span-2 text-center opacity-70 font-light">
                                            {item.quantity}
                                        </div>
                                        <div className="col-span-12 sm:col-span-2 text-center font-medium z-10 px-2" style={{ color: highlightText }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                             </div>

                             {/* Totals Section */}
                             <div className="grid grid-cols-12 gap-2 mt-4 pt-4 border-t border-zinc-300/30">
                                 <div className="col-span-6">
                                     <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-90 mb-1">Total a Pagar:</h3>
                                     <p className="text-xl font-bold opacity-100">${total.toFixed(2)} {currency}</p>
                                 </div>
                                 <div className="col-span-6 space-y-1">
                                     {/* Math Breakdown */}
                                     {((includeIva && ivaMode === 'add') || (!includeIva)) && (
                                         <div className="flex justify-between text-[10px] opacity-70 font-bold uppercase tracking-wider">
                                             <span>Subtotal</span>
                                             <span>${subtotal.toFixed(2)}</span>
                                         </div>
                                     )}

                                     { /* Special Case: Inclusive taxes, show Raw Sum first? */ }
                                     {includeIva && ivaMode === 'inclusive' && (
                                          <div className="flex justify-between text-[10px] opacity-70 font-bold uppercase tracking-wider">
                                             <span>Importe (Iva Incluido)</span>
                                             <span>${total.toFixed(2)}</span>
                                          </div>
                                     )}

                                     {includeIva && (
                                         <>
                                            {ivaMode === 'inclusive' && (
                                                <div className="flex justify-between text-[9px] opacity-60 uppercase tracking-wider pl-2 border-l-2 border-zinc-200/50">
                                                    <span>Subtotal Neto</span>
                                                    <span>${subtotal.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-[10px] opacity-70 font-bold uppercase tracking-wider">
                                                <span>IVA ({ivaPercentage}%)</span>
                                                <span>${taxAmount.toFixed(2)}</span>
                                            </div>
                                         </>
                                     )}

                                     <div className="flex justify-between text-sm opacity-100 font-bold uppercase tracking-wider mt-2 pt-1 border-t border-zinc-300/30">
                                         <span>Total</span>
                                         <span>${total.toFixed(2)}</span>
                                     </div>
                                 </div>
                             </div>

                             {/* Approved By */}
                             {signatureMode !== 'none' && (
                                 <div className="mt-12 text-right">
                                     <p className="text-[9px] font-bold uppercase tracking-wider opacity-60 mb-6">Aprobado Por</p>
                                     <div className="inline-block relative">
                                         {/* Signature Content */}
                                         <div className="h-16 w-32 mx-auto border-b border-zinc-800/30 mb-2 flex items-end justify-center">
                                          {signatureMode === 'image' && signatureImage && (
                                             <img src={signatureImage} alt={`Firma ${senderName}`} className="h-full object-contain pb-1 opacity-80" />
                                          )}
                                          {signatureMode === 'text' && signatureText && (
                                             <span className="font-cursive text-lg opacity-80 pb-1" style={{ fontFamily: 'cursive' }}>{signatureText}</span>
                                          )}
                                         </div>
                                         <p className="font-bold text-xs opacity-90 uppercase">{senderName}</p>
                                         <p className="text-[9px] opacity-60">@{senderWebsite}</p>
                                     </div>
                                 </div>
                             )}

                         </div>
                     </div>
                </div>

                {/* Print Margin Fix / URL Branding */}
                <div className="hidden print:block absolute bottom-4 left-0 w-full text-center text-[8px] opacity-30">
                    {senderWebsite}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
