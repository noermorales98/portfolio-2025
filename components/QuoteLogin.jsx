'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function QuoteLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'noe.rmorales98@gmail.com' && password === 'Mr@driguez98') {
      localStorage.setItem('quote_auth', 'true');
      onLogin();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-zinc-800"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Acceso Exclusivo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 text-white rounded-lg p-3 border border-zinc-800 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 text-white rounded-lg p-3 border border-zinc-800 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
