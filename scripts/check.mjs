import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const required = [
  'index.html',
  'club/index.html',
  'equips/index.html',
  'equips/escoleta/index.html',
  'equips/sub14/index.html',
  'equips/sub16/index.html',
  'equips/sub19/index.html',
  'equips/senior-femeni/index.html',
  'equips/senior-masculi/index.html',
  'escoleta/index.html',
  'socis/index.html',
  'sponsors/index.html',
  'contacte/index.html',
  'area-privada/index.html',
  'legal/politica-privacitat/index.html',
  'legal/politica-cookies/index.html',
  'legal/avis-legal/index.html',
  'legal/registre-menor/index.html'
];

let errors = [];
for (const file of required) {
  if (!existsSync(file)) {
    errors.push(`Falta la ruta requerida: ${file}`);
    continue;
  }
  const html = await readFile(file, 'utf8');
  if (!/<h1[\s>]/i.test(html)) {
    errors.push(`La pàgina no té H1: ${file}`);
  }
  if (!/<meta name="description"/i.test(html)) {
    errors.push(`Falta meta description: ${file}`);
  }
}

if (errors.length) {
  console.error('S\'han detectat errors de validació:');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log('Validació correcta de rutes i metadades bàsiques.');
