import * as HugeIcons from 'hugeicons-react';

const iconsToCheck = ['ArrowLeftIcon', 'PlusIcon', 'TrashIcon', 'DownloadIcon', 'PrinterIcon'];

console.log('Available icons check:');
iconsToCheck.forEach(icon => {
  if (HugeIcons[icon]) {
    console.log(`✅ ${icon} is available`);
  } else {
    console.log(`❌ ${icon} is NOT available`);
    // Try to find close matches
    const allIcons = Object.keys(HugeIcons);
    const matches = allIcons.filter(name => name.toLowerCase().includes(icon.toLowerCase().replace('icon', '')));
    if (matches.length > 0) {
      console.log(`   Did you mean: ${matches.join(', ')}?`);
    }
  }
});
