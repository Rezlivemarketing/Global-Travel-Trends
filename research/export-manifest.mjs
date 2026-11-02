import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const root=process.cwd(),files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else files.push({path:path.relative(root,f).replaceAll('\\','/'),size:fs.statSync(f).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')});}}
walk(path.join(root,'dist'));for(const f of ['index.html','.nojekyll','LICENSE','src-app.js','package.json','package-lock.json','.gitignore','README.md','ROADMAP.md'])if(fs.existsSync(f)){files.push({path:f,size:fs.statSync(f).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')});}walk(path.join(root,'research'));
console.log(JSON.stringify(files.filter(x=>!x.path.startsWith('research/cache/'))));
