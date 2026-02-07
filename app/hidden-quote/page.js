'use client';

import { useState, useEffect } from 'react';
import QuoteLogin from '@/components/QuoteLogin';
import QuoteDashboard from '@/components/QuoteDashboard';

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
    <QuoteDashboard onLogout={handleLogout} />
  ) : (
    <QuoteLogin onLogin={handleLogin} />
  );
}
