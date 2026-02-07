'use client';

import { useState, useEffect } from 'react';
import QuoteLogin from '@/components/QuoteLogin';
import QuoteDashboard from '@/components/QuoteDashboard';

const NOELI_DATA = {
  senderName: 'Noelí Rodríguez',
  senderRole: 'Soluciones Digitales',
  senderEmail: 'noe.rmorales98@gmail.com',
  senderWebsite: 'noermorales.com',
  paymentLink: 'https://paypal.me/noermorales',
  bankName: 'BBVA',
  bankAccount: '1234 5678 9012',
  bankClabe: '012345678901234567',
  bankHolder: 'Noelí Rodríguez',
  defaultNotes: 'Esta es una cotización personalizada y está sujeta a cambios y acomodos si es que no está satisfecho con la propuesta inicial.',
  signatureImage: '/firma.png'
};

export default function HiddenQuotePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('quote_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('quote_auth');
    setIsAuthenticated(false);
  };

  if (loading) return null;

  return isAuthenticated ? (
    <QuoteDashboard onLogout={handleLogout} initialData={NOELI_DATA} />
  ) : (
    <QuoteLogin onLogin={handleLogin} />
  );
}
