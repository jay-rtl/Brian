import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
const output=path.resolve('public/assets');await mkdir(output,{recursive:true});
const source='C:/Users/it/Downloads';
const covers=[{id:'observer',file:'image (52).png',back:[0,0,470,654],spine:[470,0,74,654],front:[544,0,479,654]},{id:'dreamwind',file:'Dreamwind Cover Page.jpg',back:[0,0,445,655],spine:[445,0,55,655],front:[500,0,483,655]}];
for(const c of covers){const file=path.join(source,c.file);const meta=await sharp(file).metadata();console.log(c.id,meta.width,meta.height);for(const face of ['front','back','spine']){const [left,top,width,height]=c[face];await sharp(file).extract({left,top,width,height}).webp({quality:92}).toFile(path.join(output,`${c.id}-${face}.webp`));}await sharp(file).webp({quality:93}).toFile(path.join(output,`${c.id}-wrap.webp`));const [left,top,width,height]=c.front;await sharp(file).extract({left,top:180,width,height:350}).resize(1400,1000,{fit:'cover'}).blur(8).webp({quality:72}).toFile(path.join(output,`${c.id}-atmosphere.webp`));await copyFile(file,path.join(output,c.id==='observer'?'observer-original.png':'dreamwind-original.jpg'));}
for(const [id,file] of [['observer','image (54).png'],['dreamwind','image (53).png']]){await sharp(path.join(source,file)).webp({quality:90}).toFile(path.join(output,`frankfurt-${id}.webp`));await copyFile(path.join(source,file),path.join(output,`frankfurt-${id}-original.png`));}
