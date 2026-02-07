import * as HugeIcons from 'hugeicons-react';

const allExports = Object.keys(HugeIcons);
console.log('Total exports:', allExports.length);

const searchTerms = ['arrow', 'plus', 'delete', 'trash', 'download', 'print'];

searchTerms.forEach(term => {
  console.log(`\n--- Icons matching "${term}" ---`);
  const matches = allExports.filter(name => name.toLowerCase().includes(term));
  console.log(matches.join(', '));
});
