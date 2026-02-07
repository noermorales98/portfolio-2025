import * as hugeIcons from 'hugeicons-react';

const keys = Object.keys(hugeIcons);

const targetBaseNames = ['CustomerSupport', 'Invoice03', 'Mail01', 'Cancel01'];
const targetNames = [];
targetBaseNames.forEach(base => {
    targetNames.push(base);
    targetNames.push(base + 'Icon');
});

console.log('Available icons:', keys.filter(k => targetNames.includes(k)));
