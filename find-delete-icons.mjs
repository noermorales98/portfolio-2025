import * as HugeIcons from 'hugeicons-react';

const allExports = Object.keys(HugeIcons);
const deleteIcons = allExports.filter(name => name.toLowerCase().includes('delete') || name.toLowerCase().includes('trash') || name.toLowerCase().includes('remove'));

console.log('Available Delete/Trash/Remove icons:');
console.log(deleteIcons.join(', '));
