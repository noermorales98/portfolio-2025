'use client';

import { useState, useEffect, useRef } from 'react';

export default function QuoteDashboard({ onLogout, initialData = {} }) {
  // --- Sender / Branding State (defaults from props or generic) ---
  const [senderName, setSenderName] = useState(initialData.senderName || 'Tu Nombre / Empresa');
  const [senderRole, setSenderRole] = useState(initialData.senderRole || 'Servicios Profesionales de Diseño y Desarrollo Web');
  const [senderEmail, setSenderEmail] = useState(initialData.senderEmail || 'contacto@ejemplo.com');
  const [senderWebsite, setSenderWebsite] = useState(initialData.senderWebsite || 'www.tuejemplo.com');
  


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
  const [validUntil, setValidUntil] = useState('30 días');

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

  // Zoom State
  const [zoom, setZoom] = useState(0.8);
  const previewScrollRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const MM_TO_PX = 3.7795275591;

  const getPageSizePx = (sizeKey) => {
    const size = PAGE_SIZES[sizeKey];
    const widthMm = parseFloat(size.width);
    const heightMm = parseFloat(size.height);
    return {
      width: widthMm * MM_TO_PX,
      height: heightMm * MM_TO_PX
    };
  };

  const startPan = (event) => {
    if (zoom <= 1) return;
    if (event.button !== 0) return;
    const container = event.currentTarget;
    if (!container) return;

    isPanningRef.current = true;
    setIsPanning(true);
    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop
    };
    try {
      container.setPointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture errors (e.g., non-pointer inputs)
    }
    event.preventDefault();
  };

  const movePan = (event) => {
    if (!isPanningRef.current) return;
    const container = event.currentTarget;
    if (!container) return;
    const { x, y, scrollLeft, scrollTop } = panStartRef.current;
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    container.scrollLeft = scrollLeft - dx;
    container.scrollTop = scrollTop - dy;
  };

  const endPan = (event) => {
    if (!isPanningRef.current) return;
    isPanningRef.current = false;
    setIsPanning(false);
    const container = event.currentTarget;
    if (!container) return;
    try {
      container.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore pointer release errors
    }
  };

  const calculateDefaultZoom = () => {
    // We want to fit the page in the available main area with some padding
    // Assuming sidebars are roughly 320px each and some padding in main
    const mainArea = document.querySelector('main');
    if (!mainArea) return;

    const padding = 64; // Horizontal padding (32px each side)
    const topPadding = 48; // Vertical padding
    
    const availableWidth = mainArea.clientWidth - padding;
    const availableHeight = mainArea.clientHeight - topPadding;
    
    // Convert current page size to pixels (approx 96 DPI)
    const { width: pageWidthPx, height: pageHeightPx } = getPageSizePx(pageSize);

    const scaleX = availableWidth / pageWidthPx;
    const scaleY = availableHeight / pageHeightPx;
    
    // Choose the smaller scale to ensure it fits both ways, and cap at 1.0 or custom
    const fitScale = Math.min(scaleX, scaleY, 1) * 0.95; // 0.95 for a bit of extra breathing room
    setZoom(fitScale);
  };

  // Recalculate zoom on mount, resize, or page size change
  useEffect(() => {
    calculateDefaultZoom();
    window.addEventListener('resize', calculateDefaultZoom);
    return () => window.removeEventListener('resize', calculateDefaultZoom);
  }, [pageSize]);

  // Load from LocalStorage on Mount
  useEffect(() => {
    const savedData = localStorage.getItem('quote_dashboard_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.senderName) setSenderName(parsed.senderName);
        if (parsed.senderRole) setSenderRole(parsed.senderRole);
        if (parsed.senderEmail) setSenderEmail(parsed.senderEmail);
        if (parsed.senderWebsite) setSenderWebsite(parsed.senderWebsite);
        if (parsed.logoImage) { setLogoImage(parsed.logoImage); setIncludeLogo(true); }
        if (parsed.signatureMode) setSignatureMode(parsed.signatureMode);
        if (parsed.signatureImage) setSignatureImage(parsed.signatureImage);
        if (parsed.signatureText) setSignatureText(parsed.signatureText);
        
        if (parsed.headerBg) setHeaderBg(parsed.headerBg);
        if (parsed.headerText) setHeaderText(parsed.headerText);
        if (parsed.bodyBg) setBodyBg(parsed.bodyBg);
        if (parsed.bodyText) setBodyText(parsed.bodyText);
        if (parsed.highlightBg) setHighlightBg(parsed.highlightBg);
        if (parsed.highlightText) setHighlightText(parsed.highlightText);
        
        if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
        if (parsed.paymentLink) setPaymentLink(parsed.paymentLink);
        if (parsed.bankDetails) setBankDetails(parsed.bankDetails);
        
        if (parsed.clientName) setClientName(parsed.clientName);
        if (parsed.date) setDate(parsed.date);
        if (parsed.packageName) setPackageName(parsed.packageName);
        if (parsed.quoteNumber) setQuoteNumber(parsed.quoteNumber);
        if (parsed.validUntil) setValidUntil(parsed.validUntil);
        
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.clientAddress) setClientAddress(parsed.clientAddress);
        if (parsed.clientEmail) setClientEmail(parsed.clientEmail);
        if (parsed.clientPhone) setClientPhone(parsed.clientPhone);
        if (parsed.notes) setNotes(parsed.notes);
        
        if (parsed.items) setItems(parsed.items);
        if (parsed.includeIva !== undefined) setIncludeIva(parsed.includeIva);
        if (parsed.ivaPercentage) setIvaPercentage(parsed.ivaPercentage);
        if (parsed.ivaMode) setIvaMode(parsed.ivaMode);
        if (parsed.pageSize) setPageSize(parsed.pageSize);

      } catch (e) {
        console.error('Error loading data', e);
      }
    } else {
         setQuoteNumber(Date.now().toString().slice(-6));
    }
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    const dataToSave = {
        senderName, senderRole, senderEmail, senderWebsite,
        logoImage, signatureMode, signatureImage, signatureText,
        headerBg, headerText, bodyBg, bodyText, highlightBg, highlightText,
        paymentMethod, paymentLink, bankDetails,
        clientName, date, packageName, quoteNumber, validUntil,
        currency, clientAddress, clientEmail, clientPhone, notes,
        items, includeIva, ivaPercentage, ivaMode, pageSize
    };
    // Debounce slightly to avoid excessive writes
    const timeoutId = setTimeout(() => {
        localStorage.setItem('quote_dashboard_data', JSON.stringify(dataToSave));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [
    senderName, senderRole, senderEmail, senderWebsite,
    logoImage, signatureMode, signatureImage, signatureText,
    headerBg, headerText, bodyBg, bodyText, highlightBg, highlightText,
    paymentMethod, paymentLink, bankDetails,
    clientName, date, packageName, quoteNumber, validUntil,
    currency, clientAddress, clientEmail, clientPhone, notes,
    items, includeIva, ivaPercentage, ivaMode, pageSize
  ]);

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

  const { width: pageWidthPx, height: pageHeightPx } = getPageSizePx(pageSize);
  const scaledPageWidth = pageWidthPx * zoom;
  const scaledPageHeight = pageHeightPx * zoom;

  return (
    <div className="h-screen flex flex-col bg-zinc-50 text-black font-inter overflow-hidden">
        {/* Dynamic Styles for Print */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page {
              size: ${PAGE_SIZES[pageSize].css};
              margin: 0;
            }
            body {
              margin: 0;
            }
            .print-hidden {
              display: none !important;
            }
          }
        `}} />

        {/* 1. TOP NAVBAR (Toolbar) */}
        <nav className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 z-50 print-hidden flex-shrink-0">
             {/* Left: Branding & Project Name */}
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        QT
                    </div>
                </div>
                <div className="h-6 w-px bg-zinc-200 mx-2"></div>
                <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    placeholder="Nombre del Proyecto"
                    className="bg-transparent text-sm font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-zinc-50 hover:bg-zinc-50 px-2 py-1 rounded transition-colors w-64"
                />
             </div>

             {/* Center: Page Controls */}
             <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-lg border border-zinc-200/50">
                  <div className="flex items-center gap-2 px-2 border-r border-zinc-200">
                      <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Tamaño</span>
                      <select 
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        className="bg-transparent text-xs font-medium text-zinc-700 focus:outline-none cursor-pointer py-1"
                      >
                         {Object.entries(PAGE_SIZES).map(([key, size]) => (
                           <option key={key} value={key}>{size.name}</option>
                         ))}
                      </select>
                  </div>
                  
                  <div className="flex items-center gap-2 px-2 border-r border-zinc-200">
                      <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Moneda</span>
                      <input 
                        className="bg-transparent w-12 text-xs font-bold text-zinc-700 focus:outline-none text-center uppercase"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        placeholder="MXN"
                      />
                  </div>

                  <div className="flex items-center gap-1 px-2">
                       <button 
                         onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                         className="p-1 hover:bg-zinc-200 rounded text-zinc-600 transition-colors"
                         title="Zoom Out"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                       </button>
                       <button 
                         onClick={calculateDefaultZoom}
                         className="px-1.5 py-0.5 hover:bg-zinc-200 rounded text-[10px] font-bold text-zinc-700 transition-colors min-w-[40px]"
                         title="Ajustar"
                       >
                         {Math.round(zoom * 100)}%
                       </button>
                       <button 
                         onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                         className="p-1 hover:bg-zinc-200 rounded text-zinc-600 transition-colors"
                         title="Zoom In"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                       </button>
                  </div>
             </div>

             {/* Right: Actions */}
             <div className="flex items-center gap-3">
                 <button 
                    onClick={handlePrint}
                    className="text-zinc-600 hover:text-black hover:bg-zinc-100 p-2 rounded-lg transition-all"
                    title="Imprimir"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                 </button>
                 <button 
                    onClick={handleDownloadPDF}
                    className="bg-black text-white hover:bg-zinc-800 px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors shadow-sm"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>Descargar PDF</span>
                 </button>
                 {onLogout && (
                     <button onClick={onLogout} className="ml-2 text-xs text-zinc-400 hover:text-red-500 transition-colors">
                        Salir
                     </button>
                 )}
             </div>
        </nav>

        {/* 2. EDITOR WORKSPACE */}
        <div className="flex-1 flex overflow-hidden">
             
             {/* LEFT SIDEBAR - SENDER, CLIENT, SERVICES */}
             <aside className="w-80 bg-white border-r border-zinc-200 overflow-y-auto z-20 shadow-sm print-hidden flex flex-col flex-shrink-0">
                 <div className="p-4 border-b border-zinc-100">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Datos y Servicios</h2>
                 </div>
                 
                 <div className="p-4 space-y-6 pb-20">
                     {/* SENDER DETAILS */}
                     <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <h3 className="text-xs font-semibold mb-3">Datos del Remitente</h3>
                        <div className="space-y-2">
                                <input type="text" placeholder="Tu Nombre / Empresa" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                                <input type="text" placeholder="Rol / Slogan" value={senderRole} onChange={(e) => setSenderRole(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                                <input type="text" placeholder="Email de contacto" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                                <input type="text" placeholder="Sitio Web (Footer)" value={senderWebsite} onChange={(e) => setSenderWebsite(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                        </div>
                     </div>


                     {/* QUOTE DETAILS (NEW) */}
                     <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <h2 className="text-xs font-semibold mb-3">Detalles de la Cotización</h2>
                        <div className="space-y-2">
                             <div>
                                <label className="text-[10px] text-zinc-500 font-medium">Fecha</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                             </div>
                             <div>
                                <label className="text-[10px] text-zinc-500 font-medium">Cotización #</label>
                                <input type="text" placeholder="#" value={quoteNumber} onChange={(e) => setQuoteNumber(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                             </div>
                             <div>
                                <label className="text-[10px] text-zinc-500 font-medium">Válido hasta</label>
                                <input type="text" placeholder="Ej: 30 días, 15 de Marzo..." value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                             </div>
                        </div>
                     </div>

                     {/* CLIENT DETAILS */}
                     <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <h2 className="text-xs font-semibold mb-3">Detalles del Cliente</h2>
                        <div className="space-y-2">
                            <input type="text" placeholder="Nombre del Cliente" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                            <input type="text" placeholder="Dirección" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                            <input type="text" placeholder="Email Cliente" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                            <input type="text" placeholder="Teléfono" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-xs focus:border-black outline-none transition-colors" />
                        </div>
                     </div>


                     {/* SERVICES */}
                     <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xs font-semibold">Servicios</h2>
                            <button onClick={addItem} className="text-[10px] bg-black text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors">
                                + Agregar
                            </button>
                        </div>
                        
                        <div className="space-y-2">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white border border-zinc-200 p-2 rounded-lg space-y-2">
                                    <div className="flex justify-between gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Descripción" 
                                            value={item.name} 
                                            onChange={(e) => updateItem(item.id, 'name', e.target.value)} 
                                            className="flex-1 bg-zinc-50 border-0 rounded p-1 text-[10px] focus:ring-1 focus:ring-black outline-none" 
                                        />
                                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label className="text-[8px] text-zinc-400 uppercase font-bold">Precio</label>
                                            <input 
                                                type="number" 
                                                value={item.price} 
                                                onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))} 
                                                className="w-full bg-zinc-50 border-0 rounded p-1 text-[10px] focus:ring-1 focus:ring-black outline-none" 
                                            />
                                        </div>
                                        <div className="w-16">
                                            <label className="text-[8px] text-zinc-400 uppercase font-bold">Cant.</label>
                                            <input 
                                                type="number" 
                                                value={item.quantity} 
                                                onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} 
                                                className="w-full bg-zinc-50 border-0 rounded p-1 text-[10px] focus:ring-1 focus:ring-black outline-none text-center" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-zinc-200 space-y-2">
                             <div className="flex items-center justify-between">
                                 <label className="text-[10px] font-medium cursor-pointer flex items-center gap-2">
                                     <input 
                                         type="checkbox" 
                                         checked={includeIva} 
                                         onChange={(e) => setIncludeIva(e.target.checked)}
                                         className="accent-black rounded"
                                     />
                                     <span>Aplicar IVA</span>
                                 </label>
                                 {includeIva && (
                                     <div className="flex items-center gap-1">
                                         <input 
                                             type="number" 
                                             value={ivaPercentage} 
                                             onChange={(e) => setIvaPercentage(Number(e.target.value))}
                                             className="w-8 text-[10px] border border-zinc-200 rounded p-0.5 text-center"
                                         />
                                         <span className="text-[10px]">%</span>
                                     </div>
                                 )}
                             </div>
                             
                             {includeIva && (
                                 <div className="flex h-6 bg-zinc-100 rounded p-0.5">
                                     <button 
                                        onClick={() => setIvaMode('add')}
                                        className={`flex-1 text-[9px] rounded transition-all ${ivaMode === 'add' ? 'bg-white shadow-sm font-medium text-black' : 'text-zinc-500 hover:text-zinc-700'}`}
                                     >
                                         + IVA
                                     </button>
                                     <button 
                                        onClick={() => setIvaMode('inclusive')}
                                        className={`flex-1 text-[9px] rounded transition-all ${ivaMode === 'inclusive' ? 'bg-white shadow-sm font-medium text-black' : 'text-zinc-500 hover:text-zinc-700'}`}
                                     >
                                         Incluido
                                     </button>
                                 </div>
                             )}

                             <div className="flex justify-between items-center pt-2">
                                 <span className="text-[10px] font-bold uppercase text-zinc-500">Total Est.</span>
                                 <span className="text-sm font-bold">${total.toFixed(2)}</span>
                             </div>
                        </div>
                     </div>
                 </div>
             </aside>

             {/* MAIN CONTENT - PREVIEW */}
              <main
                ref={previewScrollRef}
                onPointerDown={startPan}
                onPointerMove={movePan}
                onPointerUp={endPan}
                onPointerCancel={endPan}
                onPointerLeave={endPan}
                className={`flex-1 bg-zinc-100/50 relative overflow-auto flex items-start ${zoom > 1 ? 'justify-start' : 'justify-center'} p-8 lg:p-12 print:p-0 print:bg-white print:block ${zoom > 1 ? 'cursor-grab' : 'cursor-default'} ${isPanning ? 'cursor-grabbing select-none' : ''}`}
              >
                  <div
                    className="relative"
                    style={{ width: `${scaledPageWidth}px`, height: `${scaledPageHeight}px` }}
                  >
                    <div 
                      className="origin-top-left transition-transform duration-200 ease-out"
                      style={{ 
                          transform: `scale(${zoom})`
                      }}
                    >
                     {/* Dynamic Page Layout */}
                    <div 
                        id="quote-preview"
                        className="shadow-2xl mx-auto print:shadow-none print:w-full print:max-w-none print:min-h-0 relative flex flex-col font-inter transition-all duration-300 ease-in-out bg-white"
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

                        {/* 2. Client Info Bar */}
                         <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex justify-between items-start text-xs">
                             <div className="space-y-1">
                                 <h3 className="font-bold uppercase tracking-wider text-zinc-400 mb-2">Para</h3>
                                 <p className="font-semibold text-lg">{clientName || 'Nombre del Cliente'}</p>
                                 <p className="text-zinc-500">{clientAddress || 'Dirección del Cliente'}</p>
                                 <div className="flex gap-4 mt-1 text-zinc-400">
                                     {clientEmail && <span>{clientEmail}</span>}
                                     {clientPhone && <span>{clientPhone}</span>}
                                 </div>
                             </div>
                             <div className="text-right space-y-1">
                                 <h3 className="font-bold uppercase tracking-wider text-zinc-400 mb-2">Detalles</h3>
                                 <div className="flex justify-between gap-8">
                                     <span className="text-zinc-400">Fecha:</span>
                                     <span className="font-medium">{getFormattedDate(date)}</span>
                                 </div>
                                 <div className="flex justify-between gap-8">
                                     <span className="text-zinc-400">Cotización #:</span>
                                     <span className="font-medium">{quoteNumber}</span>
                                 </div>
                                 <div className="flex justify-between gap-8">
                                     <span className="text-zinc-400">Válido hasta:</span>
                                     <span className="font-medium">{validUntil}</span>
                                 </div>
                             </div>
                         </div>

                        {/* 3. Items Table */}
                         <div className="p-8 min-h-[400px]">
                             <table className="w-full text-sm">
                                 <thead>
                                     <tr className="border-b border-black/10 text-left">
                                         <th className="py-3 font-semibold w-12 text-center">#</th>
                                         <th className="py-3 font-semibold">Descripción</th>
                                         <th className="py-3 font-semibold w-24 text-center">Cant.</th>
                                         <th className="py-3 font-semibold w-32 text-right">Precio</th>
                                         <th className="py-3 font-semibold w-32 text-right">Total</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-zinc-100">
                                     {items.map((item, i) => (
                                         <tr key={item.id}>
                                             <td className="py-4 text-center text-zinc-400">{i + 1}</td>
                                             <td className="py-4 font-medium">{item.name || 'Descripción del servicio...'}</td>
                                             <td className="py-4 text-center text-zinc-500">{item.quantity}</td>
                                             <td className="py-4 text-right text-zinc-500">${item.price.toFixed(2)}</td>
                                             <td className="py-4 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>

                        {/* 4. Footer / Totals */}
                         <div className="mt-auto bg-zinc-50 p-8 border-t border-zinc-100">
                             <div className="flex justify-between items-start">
                                 <div className="w-1/2 space-y-6">
                                     {bankDetails.bank && paymentMethod === 'bank' && (
                                         <div>
                                             <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 mb-2">Información de Pago</h4>
                                             <div className="text-xs space-y-1 text-zinc-600">
                                                 <p><span className="font-semibold text-black">Banco:</span> {bankDetails.bank}</p>
                                                 <p><span className="font-semibold text-black">Cuenta:</span> {bankDetails.account}</p>
                                                 <p><span className="font-semibold text-black">CLABE:</span> {bankDetails.clabe}</p>
                                                 <p><span className="font-semibold text-black">Titular:</span> {bankDetails.holder}</p>
                                             </div>
                                         </div>
                                     )}
                                     {paymentMethod === 'link' && paymentLink && (
                                          <div>
                                             <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 mb-2">Pago en Línea</h4>
                                             <div className="text-xs text-zinc-600">
                                                <p className="mb-1">Realiza tu pago seguro aquí:</p>
                                                <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline truncate block">{paymentLink}</a>
                                             </div>
                                          </div>
                                     )}

                                     {notes && (
                                         <div className="pt-4">
                                             <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400 mb-2">Notas</h4>
                                             <p className="text-xs text-zinc-500 whitespace-pre-wrap">{notes}</p>
                                         </div>
                                     )}
                                 </div>

                                 <div className="w-80 space-y-3">
                                     <div className="flex justify-between text-sm">
                                         <span className="text-zinc-500">Subtotal</span>
                                         <span className="font-medium">${subtotal.toFixed(2)} {currency}</span>
                                     </div>
                                     {includeIva && (
                                         <div className="flex justify-between text-sm">
                                             <span className="text-zinc-500">IVA ({ivaPercentage}%)</span>
                                             <span className="font-medium">${taxAmount.toFixed(2)} {currency}</span>
                                         </div>
                                     )}
                                     <div className="flex justify-between text-lg font-bold border-t border-black/10 pt-3 mt-2">
                                         <span>Total</span>
                                         <span>${total.toFixed(2)} {currency}</span>
                                     </div>
                                     
                                     {/* Signature Area */}
                                     {signatureMode !== 'none' && (
                                         <div className="mt-8 pt-8 border-t border-zinc-200 text-center">
                                             {signatureMode === 'image' && signatureImage ? (
                                                 <img src={signatureImage} alt="Firma" className="h-12 mx-auto mb-2 object-contain" />
                                             ) : signatureMode === 'text' && signatureText ? (
                                                  <div className="font-script text-xl mb-2">{signatureText}</div>
                                             ) : null}
                                             <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Firma Autorizada</p>
                                         </div>
                                     )}
                                 </div>
                             </div>
                             
                             {/* Footer Branding */}
                             <div className="mt-12 pt-6 border-t border-zinc-200 flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-widest">
                                 <span>{senderWebsite}</span>
                                 <span>Gracias por su preferencia</span>
                             </div>
                        </div>
                   </div>
                 </div>
               </div>
            </main>

             {/* RIGHT SIDEBAR - CONFIGURATION */}
             <aside className="w-80 bg-white border-l border-zinc-200 overflow-y-auto z-20 shadow-sm print-hidden flex flex-col flex-shrink-0">
                 <div className="p-4 border-b border-zinc-100">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Configuración</h2>
                 </div>
                 
                 <div className="p-4 space-y-6 pb-20">
                     {/* DESIGN CUSTOMIZATION TOGGLE */}
                     <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <h3 className="text-xs font-semibold mb-3">Personalización y Diseño</h3>
                        
                            <div className="space-y-4">
                                
                                {/* Logo Config */}
                                <div className="bg-white p-2 rounded-lg border border-zinc-200">
                                     <label className="flex items-center justify-between text-[10px] uppercase tracking-wide font-medium text-zinc-700 mb-2 cursor-pointer">
                                         <span>¿Incluir Logotipo?</span>
                                         <input 
                                             type="checkbox" 
                                             checked={includeLogo} 
                                             onChange={(e) => setIncludeLogo(e.target.checked)}
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

                                 {/* Signature Config */}
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
                                        <label className="block text-zinc-500 text-[10px] uppercase tracking-wide font-medium mb-2">Temas de Color</label>
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
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Cabecera</span>
                                            <input type="color" value={headerBg} onChange={(e) => setHeaderBg(e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Texto Cabecera</span>
                                            <input type="color" value={headerText} onChange={(e) => setHeaderText(e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Fondo</span>
                                            <input type="color" value={bodyBg} onChange={(e) => setBodyBg(e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Texto</span>
                                            <input type="color" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Resaltado</span>
                                            <input type="color" value={highlightBg} onChange={(e) => setHighlightBg(e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Texto Res.</span>
                                            <input type="color" value={highlightText} onChange={(e) => setHighlightText(e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 p-0 shadow-sm" />
                                        </div>
                                    </div>
                                </div>

                                {hasCustomColors && (
                                    <div className="flex justify-end pt-2 border-t border-zinc-100">
                                         <button onClick={resetColors} className="text-[10px] text-red-500 hover:text-red-700 underline">Restablecer Colores</button>
                                    </div>
                                )}

                            </div>
                     </div>

                    {/* NOTES */}
                    <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                      <h2 className="text-xs font-semibold mb-2">Notas</h2>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                         className="w-full bg-white border border-zinc-200 rounded-lg p-2 focus:border-black outline-none transition-colors h-20 resize-none text-[10px]"
                         placeholder="Notas..."
                      />
                    </div>

                     {/* Payment Method Config */}
                     <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                      <h2 className="text-xs font-semibold mb-3">Método de Pago</h2>
                      <div className="flex gap-2 mb-3">
                        <label className="flex items-center gap-1.5 text-[10px] cursor-pointer select-none bg-white border border-zinc-200 px-2 py-1 rounded flex-1 justify-center">
                          <input type="radio" name="paymentType" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-black" />
                          Banco
                        </label>
                        <label className="flex items-center gap-1.5 text-[10px] cursor-pointer select-none bg-white border border-zinc-200 px-2 py-1 rounded flex-1 justify-center">
                          <input type="radio" name="paymentType" checked={paymentMethod === 'link'} onChange={() => setPaymentMethod('link')} className="accent-black" />
                          Link
                        </label>
                      </div>
                      
                      {paymentMethod === 'bank' ? (
                        <div className="space-y-2">
                           <input type="text" placeholder="Banco" value={bankDetails.bank} onChange={(e) => setBankDetails({...bankDetails, bank: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-[10px] focus:border-black outline-none transition-colors" />
                           <input type="text" placeholder="No. Cuenta" value={bankDetails.account} onChange={(e) => setBankDetails({...bankDetails, account: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-[10px] focus:border-black outline-none transition-colors" />
                           <input type="text" placeholder="CLABE" value={bankDetails.clabe} onChange={(e) => setBankDetails({...bankDetails, clabe: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-[10px] focus:border-black outline-none transition-colors" />
                           <input type="text" placeholder="Titular" value={bankDetails.holder} onChange={(e) => setBankDetails({...bankDetails, holder: e.target.value})} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-[10px] focus:border-black outline-none transition-colors" />
                        </div>
                      ) : (
                        <div>
                           <input type="text" placeholder="Link de pago" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-lg p-1.5 text-[10px] focus:border-black outline-none transition-colors" />
                        </div>
                      )}
                     </div>
                 </div>
             </aside>
        </div>
    </div>
  );
}
