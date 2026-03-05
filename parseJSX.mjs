import fs from 'fs';
import { parse } from '@babel/parser';

const code = fs.readFileSync('components/QuoteDashboard.jsx', 'utf8');
try {
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('SUCCESS');
} catch (e) {
  console.error('ERROR AT LINE:', e.loc.line, 'COL:', e.loc.column);
  console.error(e.message);
}
