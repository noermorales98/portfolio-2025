import * as hugeIcons from 'hugeicons-react';

const keys = Object.keys(hugeIcons);

console.log('Customer support icons:', keys.filter(k => k.toLowerCase().includes('customer') || k.toLowerCase().includes('support')));
console.log('Invoice icons:', keys.filter(k => k.toLowerCase().includes('invoice')));
console.log('Mail icons:', keys.filter(k => k.toLowerCase().includes('mail')));
console.log('Cancel/Close icons:', keys.filter(k => k.toLowerCase().includes('cancel') || k.toLowerCase().includes('close') || k.toLowerCase().includes('remove')));
