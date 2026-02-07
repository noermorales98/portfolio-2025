'use client';

import QuoteDashboard from '@/components/QuoteDashboard';

const GENERIC_DATA = {
  senderName: 'Tu Nombre',
  senderRole: 'Tu Puesto / Servicio',
  senderEmail: 'correo@ejemplo.com',
  senderWebsite: 'tusitio.com',
  paymentLink: 'https://paypal.me/usuario',
  bankName: 'Banco Ejemplo',
  bankAccount: '0000 0000 0000',
  bankClabe: '000000000000000000',
  bankHolder: 'Nombre del Titular',
  defaultNotes: 'Gracias por tu preferencia. Esta cotización es válida por 15 días.',
  signatureImage: null // No signature by default for public
};

export default function PublicQuotePage() {
  return (
    <QuoteDashboard initialData={GENERIC_DATA} />
  );
}
