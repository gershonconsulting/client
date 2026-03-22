#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { chdir } from 'process';

// Get the directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Change to the project root directory
chdir(__dirname);

console.log('Starting Gershon CRM Dashboard...');
console.log('Working directory:', process.cwd());

// Import and run the app
await import('./dist/index.js');
