import * as HugeIcons from 'hugeicons-react';
import fs from 'fs';

const allExports = Object.keys(HugeIcons);
const deleteIcons = allExports.filter(name => name.toLowerCase().includes('delete') || name.toLowerCase().includes('trash') || name.toLowerCase().includes('remove'));

fs.writeFileSync('available_icons.txt', deleteIcons.join('\n'));
console.log('Icons written to available_icons.txt');
