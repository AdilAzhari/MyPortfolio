// Rebuilds public/resume/Adil_Omer_Resume.pdf whenever resume/*.tex changes.
// Requires Tectonic on PATH: https://tectonic-typesetting.github.io/
import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = 'resume/Adil_Omer_Resume.tex';

let timer;
let building = false;
let pending = false;

const build = () => {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  const started = Date.now();
  const child = spawn('tectonic', [source, '--outdir', 'public/resume'], { cwd: root, shell: true });
  let output = '';
  child.stdout.on('data', (d) => (output += d));
  child.stderr.on('data', (d) => (output += d));
  child.on('close', (code) => {
    const time = new Date().toLocaleTimeString();
    if (code === 0) {
      console.log(`[${time}] built public/resume/Adil_Omer_Resume.pdf in ${Date.now() - started} ms`);
    } else {
      // Show only the lines that explain the failure, not Tectonic's package chatter.
      const errors = output.split('\n').filter((l) => /error|^!|^l\.\d+/i.test(l) && !/Fontconfig/.test(l));
      console.error(`[${time}] build failed (exit ${code}):\n${errors.join('\n') || output}`);
    }
    building = false;
    if (pending) {
      pending = false;
      build();
    }
  });
  child.on('error', () => {
    console.error('Could not run "tectonic". Is it installed and on PATH?');
    process.exit(1);
  });
};

build();
watch(resolve(root, 'resume'), (_event, file) => {
  if (!file?.endsWith('.tex')) return;
  // Editors often write a file in several steps; wait for the last one.
  clearTimeout(timer);
  timer = setTimeout(build, 300);
});
console.log(`Watching ${source}. Press Ctrl+C to stop.`);
