'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { 
  UserCircleIcon, 
  Briefcase01Icon, 
  Invoice01Icon, 
  Settings01Icon, 
  NotebookIcon,
  CreditCardIcon,
  PaintBoardIcon
} from 'hugeicons-react';

// --- Inline Editing Helper ---
const InlineEdit = ({ value, onChange, placeholder, className = "", type = "text", multiline = false, style={} }) => {
  // When printing or downloading PDF, inputs might look strange, cut off or overlap.
  // We apply custom print classes to hide the input and show a clean text div instead.
  if (multiline) {
      return (
          <div className="relative w-full">
              <div 
                  className={`hidden print-text-only whitespace-pre-wrap break-words ${className.replace(/hover:[^\s]+/g, '').replace(/focus:[^\s]+/g, '')}`} 
                  style={{ ...style, minHeight: '1.5em' }}
              >
                  {value || placeholder || ' '}
              </div>
              <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className={`bg-transparent border-0 outline-none resize-none hover:bg-black/5 focus:bg-white focus:ring-1 focus:ring-black text-inherit transition-colors rounded print-input-only relative z-10 pointer-events-auto w-full ${className}`}
                  style={{ ...style, overflow: 'hidden' }}
                  onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
              />
          </div>
      );
  }
  return (
      <div className="relative w-full">
          <div 
              className={`hidden print-text-only whitespace-pre-wrap ${className.replace(/hover:[^\s]+/g, '').replace(/focus:[^\s]+/g, '')}`} 
              style={{ ...style, minHeight: '1.2em' }}
          >
              {value || placeholder || ' '}
          </div>
          <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`bg-transparent border-0 outline-none hover:bg-black/5 focus:bg-white focus:ring-1 focus:ring-black text-inherit transition-colors rounded w-full print-input-only relative z-10 pointer-events-auto ${className}`}
              style={style}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
          />
      </div>
  );
};

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

  // Quote Number State - initialize empty to avoid hydration mismatch
  const [quoteNumber, setQuoteNumber] = useState(initialData.quoteNumber || '');
  
  // Mobile desktop notice popup state
  const [showDesktopNotice, setShowDesktopNotice] = useState(false);

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
  const [packageName, setPackageName] = useState(initialData.packageName || 'General');

  const [validUntil, setValidUntil] = useState('30 días');

  // New Fields
  const [currency, setCurrency] = useState('USD'); // Default to USD text
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState(initialData.defaultNotes || 'Condiciones del servicio, tiempos de entrega y detalles de pago.');

  // --- Items State ---
  const [items, setItems] = useState(initialData.items || [{ id: 1, name: '', quantity: 1, price: 0, includes: [], excludes: [] }]);
  const [nextItemId, setNextItemId] = useState(initialData.items ? Math.max(...initialData.items.map(item => item.id)) + 1 : 2);
  const [includeIva, setIncludeIva] = useState(false);
  const [ivaPercentage, setIvaPercentage] = useState(16);
  const [ivaMode, setIvaMode] = useState('add'); // 'add' (sumar) or 'inclusive' (desglosar)

  // Page Size State
  const [pageSize, setPageSize] = useState('letter');
  const [activeMobileTab, setActiveMobileTab] = useState('preview'); // 'data', 'preview', 'config'
  const [activeSidebarPanel, setActiveSidebarPanel] = useState('sender'); // 'sender', 'client', 'services', 'config', 'notes', 'payment', null
  
  const PAGE_SIZES = {
    letter: { name: 'Carta (Letter)', css: '8.5in 11in', width: '215.9mm', height: '279.4mm' },
    a4: { name: 'A4', css: '210mm 297mm', width: '210mm', height: '297mm' },
    legal: { name: 'Oficio (Legal)', css: '8.5in 14in', width: '215.9mm', height: '355.6mm' },
  };

  // Zoom State
  const [zoom, setZoom] = useState(0.8);
  const previewScrollRef = useRef(null);
  const pageWrapperRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastZoomRef = useRef(zoom);
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
    if (event.button !== 0) return;
    // Ignore touch events in pointer handler to avoid conflict with dedicated touch handlers
    if (event.pointerType === 'touch') return;
    
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

  // --- Panning (Desktop only) ---

  const centerContent = () => {
      const container = previewScrollRef.current;
      if (!container) return;

      // Verify that we actually have scrollable content
      const hasScrollableContent = container.scrollWidth > container.clientWidth || 
                                    container.scrollHeight > container.clientHeight;
      
      if (!hasScrollableContent) {
          // Content might still be loading, try again
          return false;
      }

      // Center the scroll view (the infinite canvas creates scrollable area)
      const scrollX = (container.scrollWidth - container.clientWidth) / 2;
      const scrollY = (container.scrollHeight - container.clientHeight) / 2;
      
      container.scrollTo({ top: scrollY, left: scrollX, behavior: 'smooth' });
      return true;
  };

  const centerContentWithRetry = (maxAttempts = 5, attempt = 0) => {
      if (attempt >= maxAttempts) return;
      
      requestAnimationFrame(() => {
          const success = centerContent();
          if (!success && attempt < maxAttempts - 1) {
              // If centering failed (no scrollable content yet), retry after a short delay
              setTimeout(() => centerContentWithRetry(maxAttempts, attempt + 1), 100);
          }
      });
  };

  const handleResetZoom = () => {
      calculateDefaultZoom();
      // Use retry logic for reset zoom
      setTimeout(() => centerContentWithRetry(), 100);
  };

  const calculateDefaultZoom = () => {
    const mainArea = document.querySelector('main');
    if (!mainArea) return;

    // Check if we're on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    if (isMobile) {
      // On mobile: fit to width only, allow vertical scrolling
      const availableWidth = mainArea.clientWidth - 32; // Small padding
      const { width: pageWidthPx } = getPageSizePx(pageSize);
      const fitScale = (availableWidth / pageWidthPx) * 0.98;
      setZoom(fitScale);
    } else {
      // On desktop: fit both width and height with padding
      const padding = 64;
      const topPadding = 48;
      
      const availableWidth = mainArea.clientWidth - padding;
      const availableHeight = mainArea.clientHeight - topPadding;
      
      const { width: pageWidthPx, height: pageHeightPx } = getPageSizePx(pageSize);
      const scaleX = availableWidth / pageWidthPx;
      const scaleY = availableHeight / pageHeightPx;
      
      const fitScale = Math.min(scaleX, scaleY, 1) * 0.95;
      setZoom(fitScale);
    }
  };

  // Recalculate zoom on mount, resize, or page size change
  useEffect(() => {
    calculateDefaultZoom();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', calculateDefaultZoom);
      return () => window.removeEventListener('resize', calculateDefaultZoom);
    }
  }, [pageSize]);

  // Center content on desktop only (not needed on mobile with width-fit)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        centerContentWithRetry();
      }
    }
  }, [zoom, activeMobileTab]);

  useLayoutEffect(() => {
    const container = previewScrollRef.current;
    const pageWrapper = pageWrapperRef.current;
    if (!container || !pageWrapper) {
      lastZoomRef.current = zoom;
      return;
    }

    const previousZoom = lastZoomRef.current;
    if (previousZoom === zoom) return;

    const centerX = container.scrollLeft + container.clientWidth / 2;
    const centerY = container.scrollTop + container.clientHeight / 2;
    const pageOffsetLeft = pageWrapper.offsetLeft;
    const pageOffsetTop = pageWrapper.offsetTop;

    const contentX = (centerX - pageOffsetLeft) / previousZoom;
    const contentY = (centerY - pageOffsetTop) / previousZoom;

    const nextCenterX = pageOffsetLeft + contentX * zoom;
    const nextCenterY = pageOffsetTop + contentY * zoom;

    container.scrollLeft = nextCenterX - container.clientWidth / 2;
    container.scrollTop = nextCenterY - container.clientHeight / 2;

    lastZoomRef.current = zoom;
  }, [zoom, pageSize]);

  // Load from LocalStorage on Mount
  useEffect(() => {
    if (typeof window === 'undefined') return; // Prevent SSR crash

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
        
        if (parsed.items) {
           const migratedItems = parsed.items.map(item => {
               const getArrayField = (field) => {
                   if (Array.isArray(field)) return field;
                   if (typeof field === 'string' && field.trim()) {
                       return field.split('\\n').filter(l => l.trim()).map(l => l.startsWith('-') ? l.substring(1).trim() : l.trim());
                   }
                   return [];
               };
               return { ...item, includes: getArrayField(item.includes), excludes: getArrayField(item.excludes) };
           });
           setItems(migratedItems);
        }
        if (parsed.nextItemId) setNextItemId(parsed.nextItemId);
        if (parsed.includeIva !== undefined) setIncludeIva(parsed.includeIva);
        if (parsed.ivaPercentage) setIvaPercentage(parsed.ivaPercentage);
        if (parsed.ivaMode) setIvaMode(parsed.ivaMode);
        if (parsed.pageSize) setPageSize(parsed.pageSize);

      } catch (e) {
        console.error('Error loading data', e);
      }
    }
    
    // Set quote number after mount to avoid hydration mismatch
    if (!initialData.quoteNumber && !quoteNumber) {
      setQuoteNumber(Date.now().toString().slice(-6));
    }
    
    // Check if we should show desktop notice on mobile
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      const hasSeenNotice = localStorage.getItem('hasSeenDesktopNotice');
      if (isMobile && !hasSeenNotice) {
        setShowDesktopNotice(true);
      }
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
        items, nextItemId, includeIva, ivaPercentage, ivaMode, pageSize
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
    items, nextItemId, includeIva, ivaPercentage, ivaMode, pageSize
  ]);

  // --- Helpers ---
  const addItem = () => {
    setItems([...items, { id: nextItemId, name: '', quantity: 1, price: 0, includes: [], excludes: [] }]);
    setNextItemId(nextItemId + 1);
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
  
  const handleDismissNotice = () => {
    setShowDesktopNotice(false);
    localStorage.setItem('hasSeenDesktopNotice', 'true');
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

${items.map(item => {
    let text = '- **' + item.name + '** (x' + item.quantity + '): $' + (item.price * item.quantity).toFixed(2);
    if (item.includes && item.includes.filter(i=>i.trim()).length > 0) {
        text += '\\n  **Incluye:**\\n' + item.includes.filter(i=>i.trim()).map(l => '  - ' + l.trim()).join('\\n');
    }
    if (item.excludes && item.excludes.filter(e=>e.trim()).length > 0) {
        text += '\\n  **No incluye:**\\n' + item.excludes.filter(e=>e.trim()).map(l => '  - ' + l.trim()).join('\\n');
    }
    return text;
}).join('\\n\\n')}

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

    // Add CSS class to trigger print-style rendering (hides inputs, shows clean text)
    element.classList.add('pdf-export-mode');

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: 0,
        filename: `cotizacion-${quoteNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: element.scrollWidth },
        jsPDF: { unit: 'in', format: pageSize, orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } finally {
      // Restore normal editing view
      element.classList.remove('pdf-export-mode');
    }
  };



  const { width: pageWidthPx, height: pageHeightPx } = getPageSizePx(pageSize);
  const scaledPageWidth = pageWidthPx * zoom;
  const scaledPageHeight = pageHeightPx * zoom;

  return (
    <>
      {/* Desktop Notice Popup for Mobile */}
      {showDesktopNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleDismissNotice}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-zinc-900">
                Mejor experiencia en escritorio
              </h3>
              
              {/* Message */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                La versión de escritorio ofrece más opciones y está mejor optimizada para crear y editar cotizaciones.
              </p>
              
              {/* Button */}
              <button
                onClick={handleDismissNotice}
                className="w-full bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-zinc-800 active:scale-95 transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
      
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
            .print-text-only {
              display: block !important;
            }
            .print-input-only {
              display: none !important;
            }
          }
          
          /* For html2pdf export */
          .pdf-export-mode .print-hidden {
            display: none !important;
          }
          .pdf-export-mode .print-text-only {
            display: block !important;
          }
          .pdf-export-mode .print-input-only {
            display: none !important;
          }
          .pdf-export-mode {
            transform: none !important;
          }
        `}} />

        {/* 1. TOP NAVBAR (Toolbar) */}
        <nav className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 z-50 print-hidden flex-shrink-0">
             {/* Left: Branding & Project Name */}
             <div className="flex items-center gap-4">
                 <div className="hidden lg:flex items-center gap-2">
                    <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        QT
                    </div>
                </div>
                <div className="hidden lg:block h-6 w-px bg-zinc-200 mx-2"></div>
                <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    placeholder="Nombre del Proyecto"
                    className="hidden lg:block bg-transparent text-sm font-semibold text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-zinc-50 hover:bg-zinc-50 px-2 py-1 rounded transition-colors w-full lg:w-64"
                />
             </div>

             {/* Center: Page Controls */}
             <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-lg border border-zinc-200/50">
                  <div className="hidden lg:flex items-center gap-2 px-2 border-r border-zinc-200">
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

                  <div className="hidden lg:flex items-center gap-1 px-2">
                       <button 
                         onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                         className="p-1 hover:bg-zinc-200 rounded text-zinc-600 transition-colors"
                         title="Zoom Out"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                       </button>
                       <button 
                         onClick={handleResetZoom}
                         className="px-1.5 py-0.5 hover:bg-zinc-200 rounded text-[10px] font-bold text-zinc-700 transition-colors min-w-[40px]"
                         title="Ajustar y Centrar"
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
                    className="hidden lg:block text-zinc-600 hover:text-black hover:bg-zinc-100 p-2 rounded-full transition-all"
                    title="Imprimir"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                 </button>
                 <button 
                    onClick={handleDownloadPDF}
                    className="bg-black text-white hover:bg-zinc-800 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-colors shadow-sm"
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
        <div className="flex-1 flex overflow-hidden relative">
             
             {/* LEFT SIDEBAR - SENDER, CLIENT, SERVICES */}
             {/* Mini Sidebar (Luxury Icons) */}
             <aside className="w-16 bg-zinc-50 border-r border-zinc-200 flex-col items-center py-6 gap-6 z-30 flex-shrink-0 hidden lg:flex rounded-none">
                 {/* Navigation Icons using Hugeicons */}
                 <button onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'sender' ? null : 'sender')} className={`p-3 rounded-full transition-all duration-300 ${activeSidebarPanel === 'sender' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'}`} title="Remitente">
                     <UserCircleIcon size={22} variant="twotone" />
                 </button>
                 <button onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'client' ? null : 'client')} className={`p-3 rounded-full transition-all duration-300 ${activeSidebarPanel === 'client' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'}`} title="Cliente">
                     <Briefcase01Icon size={22} variant="twotone" />
                 </button>
                 <button onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'services' ? null : 'services')} className={`p-3 rounded-full transition-all duration-300 ${activeSidebarPanel === 'services' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'}`} title="Servicios">
                     <Invoice01Icon size={22} variant="twotone" />
                 </button>
                 <button onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'payment' ? null : 'payment')} className={`p-3 rounded-full transition-all duration-300 ${activeSidebarPanel === 'payment' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'}`} title="Métodos de Pago">
                     <CreditCardIcon size={22} variant="twotone" />
                 </button>
                 <button onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'notes' ? null : 'notes')} className={`p-3 rounded-full transition-all duration-300 ${activeSidebarPanel === 'notes' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'}`} title="Notas Extras">
                     <NotebookIcon size={22} variant="twotone" />
                 </button>
                 
                 <div className="mt-auto w-8 h-px bg-black/10 my-4" />
                 
                 <button onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'config' ? null : 'config')} className={`p-3 rounded-full transition-all duration-300 ${activeSidebarPanel === 'config' ? 'bg-black text-white shadow-sm' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'}`} title="Personalización">
                     <PaintBoardIcon size={22} variant="twotone" />
                 </button>
             </aside>

             {/* Expanded Active Panel Container */}
             <div className={`
                 ${activeMobileTab === 'data' ? 'flex w-full' : 'hidden lg:flex'} 
                 ${activeSidebarPanel ? 'lg:w-96 border-r border-zinc-200 shadow-[10px_0_20px_-10px_rgba(0,0,0,0.05)]' : 'w-0 border-r-0'} 
                 bg-white overflow-y-auto z-20 print-hidden flex-col flex-shrink-0 absolute inset-0 lg:relative lg:inset-auto transition-all duration-300 ease-in-out`
             } style={{ overflowX: activeSidebarPanel ? 'visible' : 'hidden' }}>
                 
                 {/* Panel Content Wrapper (fade in/out based on active state) */}
                 <div className={`w-full min-w-[320px] transition-opacity duration-300 ${activeSidebarPanel ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                     <div className="p-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50 backdrop-blur sticky top-0 z-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-800">
                            {activeSidebarPanel === 'sender' && 'Datos del Remitente'}
                            {activeSidebarPanel === 'client' && 'Datos del Cliente'}
                            {activeSidebarPanel === 'services' && 'Gestión de Servicios'}
                            {activeSidebarPanel === 'payment' && 'Métodos de Pago'}
                            {activeSidebarPanel === 'notes' && 'Notas Adicionales'}
                            {activeSidebarPanel === 'config' && 'Personalización'}
                            {activeSidebarPanel === 'system' && 'Configuración General'}
                        </h2>
                        <button onClick={() => setActiveSidebarPanel(null)} className="hidden lg:block text-zinc-400 hover:text-zinc-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                     </div>
                 
                 <div className="p-5 space-y-6 pb-20">
                     {/* SENDER DETAILS */}
                     {activeSidebarPanel === 'sender' && (
                         <div className="animate-fadeIn">
                            <div className="space-y-3">
                                <input type="text" placeholder="Tu Nombre / Empresa" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                                <input type="text" placeholder="Rol / Slogan" value={senderRole} onChange={(e) => setSenderRole(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                                <input type="text" placeholder="Email de contacto" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                                <input type="text" placeholder="Sitio Web (Footer)" value={senderWebsite} onChange={(e) => setSenderWebsite(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                            </div>
                         </div>
                     )}

                     {/* QUOTE DETAILS & CLIENT */}
                     {activeSidebarPanel === 'client' && (
                         <div className="space-y-6 animate-fadeIn">
                             <div className="">
                                <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Info. Documento</h2>
                        <div className="space-y-2">
                             <div>
                                <label className="text-[10px] text-zinc-500 font-medium">Fecha</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                             </div>
                             <div>
                                <label className="text-[10px] text-zinc-500 font-medium">Cotización #</label>
                                <input type="text" placeholder="#" value={quoteNumber} onChange={(e) => setQuoteNumber(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                             </div>
                             <div>
                                <label className="text-[10px] text-zinc-500 font-medium">Válido hasta</label>
                                <input type="text" placeholder="Ej: 30 días, 15 de Marzo..." value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                             </div>
                        </div>
                             </div>

                             <div className="">
                                <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Datos del Receptor</h2>
                        <div className="space-y-2">
                            <input type="text" placeholder="Nombre del Cliente" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                            <input type="text" placeholder="Dirección" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                            <input type="text" placeholder="Email Cliente" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                            <input type="text" placeholder="Teléfono" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                        </div>
                             </div>
                         </div>
                     )}


                     {/* SERVICES */}
                     {activeSidebarPanel === 'services' && (
                     <div className="animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Artículos</h2>
                            <button onClick={addItem} className="text-[10px] bg-black text-white px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors">
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
                                        <button onClick={() => removeItem(item.id)} className="text-zinc-400 hover:text-black transition-colors" title="Eliminar servicio">
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
                                                className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-3 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" 
                                            />
                                        </div>
                                        <div className="w-16">
                                            <label className="text-[8px] text-zinc-400 uppercase font-bold">Cant.</label>
                                            <input 
                                                type="number" 
                                                value={item.quantity} 
                                                onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} 
                                                className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-3 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none text-center transition-all" 
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t border-zinc-100 pt-2">
                                        <div>
                                            <div className="flex justify-between items-center mb-1.5 text-[8px] text-zinc-500 uppercase font-bold tracking-wider">
                                                <span>Incluye</span>
                                                <button onClick={() => updateItem(item.id, 'includes', [...(item.includes || []), ''])} className="hover:text-white hover:bg-black flex items-center gap-1 bg-zinc-100 px-2.5 py-1 rounded-full text-[9px] transition-colors">
                                                    + Detalle
                                                </button>
                                            </div>
                                            {(item.includes || []).map((inc, idx) => (
                                                <div key={`inc-${idx}`} className="flex items-center gap-1 mb-1 relative group">
                                                    <input 
                                                        value={inc} 
                                                        onChange={(e) => {
                                                            const newInc = [...(item.includes || [])];
                                                            newInc[idx] = e.target.value;
                                                            updateItem(item.id, 'includes', newInc);
                                                        }} 
                                                        className="flex-1 min-w-0 bg-zinc-50 border border-zinc-200/60 rounded-full px-3 py-1.5 text-[10px] focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" 
                                                        placeholder={`Punto ${idx + 1}...`}
                                                    />
                                                    <button onClick={() => {
                                                        const newInc = [...(item.includes || [])];
                                                        newInc.splice(idx, 1);
                                                        updateItem(item.id, 'includes', newInc);
                                                    }} className="text-zinc-300 hover:text-black px-1 font-bold shrink-0 transition-colors" title="Eliminar punto">
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1.5 text-[8px] text-zinc-500 uppercase font-bold tracking-wider">
                                                <span>No Incluye</span>
                                                <button onClick={() => updateItem(item.id, 'excludes', [...(item.excludes || []), ''])} className="hover:text-white hover:bg-black flex items-center gap-1 bg-zinc-100 px-2.5 py-1 rounded-full text-[9px] transition-colors">
                                                    + Detalle
                                                </button>
                                            </div>
                                            {(item.excludes || []).map((exc, idx) => (
                                                <div key={`exc-${idx}`} className="flex items-center gap-1 mb-1 relative group">
                                                    <input 
                                                        value={exc} 
                                                        onChange={(e) => {
                                                            const newExc = [...(item.excludes || [])];
                                                            newExc[idx] = e.target.value;
                                                            updateItem(item.id, 'excludes', newExc);
                                                        }} 
                                                        className="flex-1 min-w-0 bg-zinc-50 border border-zinc-200/60 rounded-full px-3 py-1.5 text-[10px] focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" 
                                                        placeholder={`Punto ${idx + 1}...`}
                                                    />
                                                    <button onClick={() => {
                                                        const newExc = [...(item.excludes || [])];
                                                        newExc.splice(idx, 1);
                                                        updateItem(item.id, 'excludes', newExc);
                                                    }} className="text-zinc-300 hover:text-black px-1 font-bold shrink-0 transition-colors" title="Eliminar punto">
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
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
                                             step="0.01" 
                                             value={ivaPercentage} 
                                             onChange={(e) => setIvaPercentage(Number(e.target.value))}
                                             className="w-12 text-[10px] border border-zinc-200 rounded p-0.5 text-center"
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

                              <div className="flex justify-between items-center pt-3 mt-2 border-t border-zinc-200">
                                  <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Total Est.</span>
                                  <span className="text-sm font-bold">${total.toFixed(2)}</span>
                              </div>
                         </div>
                     </div>
                     )}

                     {/* PAYMENT */}
                     {activeSidebarPanel === 'payment' && (
                     <div className="animate-fadeIn">
                      <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Método de Pago</h2>
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
                           <input type="text" placeholder="Banco" value={bankDetails.bank} onChange={(e) => setBankDetails({...bankDetails, bank: e.target.value})} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                           <input type="text" placeholder="No. Cuenta" value={bankDetails.account} onChange={(e) => setBankDetails({...bankDetails, account: e.target.value})} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                           <input type="text" placeholder="CLABE" value={bankDetails.clabe} onChange={(e) => setBankDetails({...bankDetails, clabe: e.target.value})} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                           <input type="text" placeholder="Titular" value={bankDetails.holder} onChange={(e) => setBankDetails({...bankDetails, holder: e.target.value})} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                        </div>
                      ) : (
                        <div>
                           <input type="text" placeholder="Link de pago" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                        </div>
                      )}
                     </div>
                     )}

                     {/* NOTES */}
                     {activeSidebarPanel === 'notes' && (
                     <div className="animate-fadeIn">
                      <h2 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Notas</h2>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                         className="w-full bg-zinc-50 border border-zinc-200/60 rounded-3xl px-4 py-4 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all h-40 resize-none"
                         placeholder="Notas y condiciones del servicio..."
                      />
                     </div>
                     )}

                     {/* CONFIGURATION */}
                     {activeSidebarPanel === 'config' && (
                     <div className="animate-fadeIn">
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Diseño</h3>
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
                                                <button onClick={() => setSignatureMode('image')} className={`flex-1 text-[10px] py-1.5 rounded-full border transition-colors ${signatureMode === 'image' ? 'bg-black text-white border-black' : 'hover:bg-zinc-50 border-zinc-200 text-zinc-600'}`}>Usar Imagen</button>
                                                <button onClick={() => setSignatureMode('text')} className={`flex-1 text-[10px] py-1.5 rounded-full border transition-colors ${signatureMode === 'text' ? 'bg-black text-white border-black' : 'hover:bg-zinc-50 border-zinc-200 text-zinc-600'}`}>Escribir Texto</button>
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
                                                <input type="text" value={signatureText} onChange={(e) => setSignatureText(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200/60 rounded-full px-4 py-2 text-xs focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="Escribe tu firma..." />
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
                                            <input type="color" value={headerBg} onChange={(e) => setHeaderBg(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 shadow-sm overflow-hidden appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Texto Cabecera</span>
                                            <input type="color" value={headerText} onChange={(e) => setHeaderText(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 shadow-sm overflow-hidden appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Fondo</span>
                                            <input type="color" value={bodyBg} onChange={(e) => setBodyBg(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 shadow-sm overflow-hidden appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Texto</span>
                                            <input type="color" value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 shadow-sm overflow-hidden appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Resaltado</span>
                                            <input type="color" value={highlightBg} onChange={(e) => setHighlightBg(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 shadow-sm overflow-hidden appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] text-zinc-400">Texto Res.</span>
                                            <input type="color" value={highlightText} onChange={(e) => setHighlightText(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer border-0 p-0 shadow-sm overflow-hidden appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                {hasCustomColors && (
                                    <div className="flex justify-end pt-2 border-t border-zinc-100">
                                         <button onClick={resetColors} className="text-[10px] text-zinc-400 hover:text-black transition-colors underline">Restablecer Colores</button>
                                    </div>
                                )}

                            </div>
                     </div>
                     )}

                 </div>
                 </div>
             </div>

             {/* MAIN CONTENT - PREVIEW */}
              <main
                ref={previewScrollRef}
                onPointerDown={startPan}
                onPointerMove={movePan}
                onPointerUp={endPan}
                onPointerCancel={endPan}
                onPointerLeave={endPan}

                className={`flex-1 bg-zinc-100/50 relative overflow-auto print:p-0 print:bg-white print:block cursor-grab ${isPanning ? 'cursor-grabbing select-none' : ''} ${activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}
              >
                  {/* Simple container with normal scrolling on mobile, infinite canvas on desktop */}
                  <div 
                    className={`flex items-center justify-center min-w-full min-h-full p-4 lg:p-[50vmin]`}
                  >
                    {zoom > 1 && <div className="shrink-0 w-8 lg:w-12" aria-hidden="true" />}
                    <div
                      ref={pageWrapperRef}
                      className="relative shrink-0"
                      style={{ width: `${scaledPageWidth}px`, height: `${scaledPageHeight}px` }}
                    >
                      <div 
                        className="origin-top-left transition-transform duration-200 ease-out"
                        style={{ 
                            transform: `scale(${zoom})`,
                            willChange: 'transform'
                        }}
                      >
                     {/* Dynamic Page Layout */}
                    <div 
                        id="quote-preview"
                        className="shadow-2xl mx-auto print:shadow-none print:w-full print:max-w-none print:min-h-0 relative flex flex-col font-inter transition-all duration-300 ease-in-out bg-white pointer-events-auto"
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
                            <div className="z-10 flex-1 pl-1">
                                <InlineEdit
                                    value={senderName}
                                    onChange={setSenderName}
                                    placeholder="Nombre del Remitente"
                                    className="text-4xl font-light tracking-[0.05em] mb-1 leading-none capitalize"
                                    style={{ color: headerText }}
                                />
                                <InlineEdit
                                    value={senderRole}
                                    onChange={setSenderRole}
                                    placeholder="Rol o Empresa"
                                    className="text-xs tracking-[0.2em] font-light uppercase opacity-80"
                                    style={{ color: headerText }}
                                />
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
                         <div
                           className="border-b border-zinc-100 p-6 flex justify-between items-start text-xs"
                           style={{ backgroundColor: bodyBg }}
                         >
                             <div className="space-y-1 flex-1 pr-6 hover-group">
                                 <h3 className="font-bold uppercase tracking-wider text-zinc-400 mb-2">Para</h3>
                                 <InlineEdit
                                    value={clientName}
                                    onChange={setClientName}
                                    placeholder="Nombre del Cliente"
                                    className="font-semibold text-lg"
                                 />
                                 <InlineEdit
                                    value={clientAddress}
                                    onChange={setClientAddress}
                                    placeholder="Dirección del Cliente"
                                    className="text-zinc-500"
                                 />
                                 <div className="flex gap-4 mt-1 text-zinc-400">
                                     <InlineEdit
                                        value={clientEmail}
                                        onChange={setClientEmail}
                                        placeholder="correo@cliente.com"
                                        className="w-48"
                                     />
                                     <InlineEdit
                                        value={clientPhone}
                                        onChange={setClientPhone}
                                        placeholder="+52 123 456"
                                        className="w-32"
                                     />
                                 </div>
                             </div>
                             <div className="text-right space-y-1 w-64 shrink-0">
                                 <h3 className="font-bold uppercase tracking-wider text-zinc-400 mb-2">Detalles</h3>
                                 <div className="flex flex-col gap-1 items-end">
                                     <div className="flex justify-between items-center w-full max-w-[200px]">
                                         <span className="text-zinc-400 whitespace-nowrap mr-2">Fecha:</span>
                                         <div className="hidden print-text-only font-medium text-right text-zinc-800">{getFormattedDate(date)}</div>
                                         <input type="date" value={date} onChange={e => setDate(e.target.value)} className="font-medium bg-transparent text-right outline-none hover:bg-black/5 focus:bg-white focus:ring-1 focus:ring-black rounded text-zinc-800 transition-colors w-32 print-input-only" />
                                     </div>
                                     <div className="flex justify-between items-center w-full max-w-[200px]">
                                         <span className="text-zinc-400 whitespace-nowrap mr-2">Cotización #:</span>
                                         <InlineEdit
                                            value={quoteNumber}
                                            onChange={setQuoteNumber}
                                            placeholder="000"
                                            className="font-medium text-right w-24"
                                         />
                                     </div>
                                     <div className="flex justify-between items-center w-full max-w-[200px]">
                                         <span className="text-zinc-400 whitespace-nowrap mr-2">Válido hasta:</span>
                                         <InlineEdit
                                            value={validUntil}
                                            onChange={setValidUntil}
                                            placeholder="30 días"
                                            className="font-medium text-right w-24"
                                         />
                                     </div>
                                 </div>
                             </div>
                         </div>

                        {/* 3. Items Table */}
                         <div className="p-8 min-h-[400px]">
                             <div className="mb-4">
                                 <div className="text-[10px] uppercase tracking-wider text-zinc-400">Proyecto</div>
                                 <div className="text-lg font-semibold">{packageName || 'Nombre del proyecto'}</div>
                             </div>
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
                                             <td className="py-4 text-center text-zinc-400 align-top">{i + 1}</td>
                                              <td className="py-2 px-2 font-medium align-top">
                                                 <div className="mb-2">
                                                     <InlineEdit
                                                        value={item.name}
                                                        onChange={(val) => updateItem(item.id, 'name', val)}
                                                        placeholder="Descripción del servicio..."
                                                        className="font-medium"
                                                     />
                                                 </div>
                                                 {((item.includes && item.includes.filter(i=>i.trim()).length > 0) || (item.excludes && item.excludes.filter(e=>e.trim()).length > 0)) && (
                                                     <div className="grid grid-cols-2 gap-4 mt-2 text-xs font-normal text-zinc-600">
                                                         {item.includes && item.includes.filter(i=>i.trim()).length > 0 && (
                                                             <div>
                                                                 <strong className="block text-zinc-700 mb-1">Incluye:</strong>
                                                                 <ul className="list-disc pl-4 space-y-0.5">
                                                                     {item.includes.filter(line => line.trim()).map((line, idx) => (
                                                                         <li key={idx}>{line.trim()}</li>
                                                                     ))}
                                                                 </ul>
                                                             </div>
                                                         )}
                                                         {item.excludes && item.excludes.filter(e=>e.trim()).length > 0 && (
                                                             <div>
                                                                 <strong className="block text-zinc-700 mb-1">No incluye:</strong>
                                                                 <ul className="list-disc pl-4 space-y-0.5">
                                                                     {item.excludes.filter(line => line.trim()).map((line, idx) => (
                                                                         <li key={idx}>{line.trim()}</li>
                                                                     ))}
                                                                 </ul>
                                                             </div>
                                                         )}
                                                     </div>
                                                 )}
                                             </td>
                                              <td className="py-2 text-center text-zinc-500 align-top">
                                                 <InlineEdit
                                                     type="number"
                                                     value={item.quantity}
                                                     onChange={(val) => updateItem(item.id, 'quantity', Number(val))}
                                                     className="text-center w-12"
                                                 />
                                              </td>
                                              <td className="py-2 text-right text-zinc-500 align-top">
                                                 <InlineEdit
                                                     type="number"
                                                     value={item.price}
                                                     onChange={(val) => updateItem(item.id, 'price', Number(val))}
                                                     className="text-right w-20"
                                                 />
                                              </td>
                                              <td className="py-2 text-right font-semibold align-top pt-3">${(item.price * item.quantity).toFixed(2)}</td>
                                          </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>

                        {/* 4. Footer / Totals */}
                         <div
                           className="mt-auto p-8 border-t border-zinc-100"
                           style={{ backgroundColor: bodyBg }}
                         >
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
                                             <InlineEdit
                                                 value={notes}
                                                 onChange={setNotes}
                                                 placeholder="Escribe aquí las condiciones del servicio, tiempos de entrega y detalles de pago..."
                                                 multiline={true}
                                                 className="text-xs text-zinc-500"
                                             />
                                          </div>
                                     )}
                                 </div>

                                 <div className="w-96 space-y-3">
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
                                              <InlineEdit
                                                 value={signatureText}
                                                 onChange={setSignatureText}
                                                 placeholder="Escribe tu firma..."
                                                 className="font-script text-xl w-48 text-center mx-auto"
                                              />
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
                    {zoom > 1 && <div className="shrink-0 w-8 lg:w-12" aria-hidden="true" />}
                  </div>
             </main>

             {/* Dynamic Form Content for config / payment / notes / system using the same mini sidebar structure.
                 The other sidebars were consolidated into the LEFT panel with the activeSidebarPanel state. */}
             
        </div>

        {/* 3. MOBILE TAB BAR (Visible only on small screens) */}
        <div className="lg:hidden bg-white border-t border-zinc-200 flex justify-around items-center h-24 pb-6 pt-3 shrink-0 z-50 print-hidden safe-area-bottom">
             <button 
                onClick={() => setActiveMobileTab('data')}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 pb-2 ${activeMobileTab === 'data' ? 'text-black' : 'text-zinc-400'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <span className="text-[10px] font-medium">Datos</span>
             </button>
             
             <button 
                onClick={() => setActiveMobileTab('preview')}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 pb-2 ${activeMobileTab === 'preview' ? 'text-black' : 'text-zinc-400'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span className="text-[10px] font-medium">Vista</span>
             </button>
             
             <button 
                onClick={() => setActiveMobileTab('config')}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 pb-2 ${activeMobileTab === 'config' ? 'text-black' : 'text-zinc-400'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span className="text-[10px] font-medium">Diseño</span>
             </button>
         </div>
      </div>
    </>
  );
}
