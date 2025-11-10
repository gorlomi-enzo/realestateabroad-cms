const fs = require('fs');
const path = require('path');
const glob = require('glob');

const schemaFiles = glob.sync('src/api/*/content-types/*/schema.json');

console.log(`Found ${schemaFiles.length} schema files\n`);

let hasErrors = false;

schemaFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    JSON.parse(content);
    console.log(`✓ ${file}`);
  } catch (e) {
    console.error(`✗ ${file}`);
    console.error(`  Error: ${e.message}\n`);
    hasErrors = true;
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log('\nAll schema files are valid!');
}
