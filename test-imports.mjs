import { motion, AnimatePresence } from 'framer-motion';
import { CustomerSupport, Invoice03, Mail01, Cancel01 } from 'hugeicons-react';

console.log('--- Testing framer-motion ---');
console.log('motion:', typeof motion);
if (motion) console.log('motion.div:', typeof motion.div);
console.log('AnimatePresence:', typeof AnimatePresence);

console.log('--- Testing hugeicons-react ---');
console.log('CustomerSupport:', typeof CustomerSupport);
console.log('Invoice03:', typeof Invoice03);
console.log('Mail01:', typeof Mail01);
console.log('Cancel01:', typeof Cancel01);
