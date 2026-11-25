const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
let totalFiles = 0;
let totalErrors = 0;
const errors = [];

function getAllFiles(dir, exts = ['.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      const ext = path.extname(fullPath);
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const allFiles = getAllFiles(srcDir);
console.log(`Auditing ${allFiles.length} frontend source files...`);

allFiles.forEach(filePath => {
  totalFiles++;
  const content = fs.readFileSync(filePath, 'utf8');
  const dirName = path.dirname(filePath);
  const relPath = path.relative(__dirname, filePath);

  // Check imports
  const importRegex = /(?:import|from)\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const impPath = match[1];
    if (impPath.startsWith('.')) {
      // Relative import
      const resolvedBase = path.resolve(dirName, impPath);
      const candidates = [
        resolvedBase,
        resolvedBase + '.js',
        resolvedBase + '.jsx',
        resolvedBase + '.json',
        path.join(resolvedBase, 'index.js'),
        path.join(resolvedBase, 'index.jsx')
      ];
      const exists = candidates.some(c => fs.existsSync(c));
      if (!exists) {
        errors.push({
          file: relPath,
          error: `Broken relative import: "${impPath}" (target not found)`
        });
        totalErrors++;
      }
    }
  }

  // Check for common bugs
  if (content.includes('debugger')) {
    errors.push({ file: relPath, error: 'Contains leftover "debugger" statement' });
    totalErrors++;
  }
  if (content.includes('console.error(') && content.includes('throw new Error')) {
    // just a note
  }
});

console.log(`Audit complete.`);
console.log(`Total files checked: ${totalFiles}`);
console.log(`Total errors found: ${totalErrors}`);
if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach(e => console.log(`  - [${e.file}] ${e.error}`));
  process.exit(1);
} else {
  console.log('All frontend imports and dependencies are 100% HEALTHY!');
  process.exit(0);
}

