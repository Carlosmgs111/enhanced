function m(n,t={pointRadius:5,spacing:25,backgroundColor:"#f8f9fa",pointColor:"#007bff",padding:10,character:"",makeSelectable:!0,forFont:!1,unitsPerEm:1e3,advanceWidth:600}){if(!n||!Array.isArray(n)||n.length===0)throw new Error("La matriz debe ser un array bidimensional válido");const o=n.length,a=n[0].length;if(!n.every(e=>Array.isArray(e)&&e.length===a))throw new Error("Todas las filas de la matriz deben tener la misma longitud");const s=(a-1)*t.spacing+t.pointRadius*2,g=(o-1)*t.spacing+t.pointRadius*2,l=s+t.padding*2,c=g+t.padding*2;let r=[];r.push(`<rect width="${l}" height="${c}" fill="${t.backgroundColor}"/>`),t.makeSelectable&&t.character&&r.push(`<text x="${l/2}" y="${c/2}" 
          font-size="1" 
          fill="transparent" 
          text-anchor="middle" 
          dominant-baseline="middle" 
          style="user-select: text; -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text;"
          >${t.character}</text>`);for(let e=0;e<o;e++)for(let p=0;p<a;p++)if(n[e][p]===1){const y=t.padding+t.pointRadius+p*t.spacing,i=t.padding+t.pointRadius+e*t.spacing;r.push(`<circle cx="${y}" cy="${i}" r="${t.pointRadius}" fill="${t.pointColor}"/>`)}return`<svg width="${l}" height="${c}" xmlns="http://www.w3.org/2000/svg">
        ${r.join(`
    `)}
      </svg>`}function b(n,t){if(!t.forFont)return m(n,t);const o={unitsPerEm:t.unitsPerEm||1e3,advanceWidth:t.advanceWidth||600,...t};if(!n||!Array.isArray(n)||n.length===0)throw new Error("La matriz debe ser un array bidimensional válido");const a=n.length,s=n[0].length;if(!n.every(i=>Array.isArray(i)&&i.length===s))throw new Error("Todas las filas de la matriz deben tener la misma longitud");const g=(s-1)*t.spacing+t.pointRadius*2,l=(a-1)*t.spacing+t.pointRadius*2,c=g+t.padding*2,r=l+t.padding*2,d=o.advanceWidth/c,e=o.unitsPerEm/r;let p=[];for(let i=0;i<a;i++)for(let f=0;f<s;f++)if(n[i][f]===1){const $=t.padding+t.pointRadius+f*t.spacing,v=t.padding+t.pointRadius+i*t.spacing,w=$*d,F=o.unitsPerEm-v*e;p.push(`<circle cx="${w}" cy="${F}" r="${t.pointRadius*Math.min(d,e)}" fill="${t.pointColor}"/>`)}return`<svg width="${o.advanceWidth}" height="${o.unitsPerEm}" viewBox="0 0 ${o.advanceWidth} ${o.unitsPerEm}" xmlns="http://www.w3.org/2000/svg">
    ${p.join(`
    `)}
  </svg>`}class A{glyphs=new Map;config;constructor(t={}){this.config={pointRadius:20,spacing:80,pointColor:"#000000",padding:40,character:"",ascent:800,descent:200,unitsPerEm:1e3,advanceWidth:600,backgroundColor:"#ffffff",makeSelectable:!1,...t}}addGlyph(t,o){const a=b(o,{...this.config,character:t});this.glyphs.set(t,a)}svgToPathData(t){const o=t.match(/<circle[^>]+>/g)||[];let a="";return o.forEach(s=>{const g=s.match(/cx="([^"]+)"/),l=s.match(/cy="([^"]+)"/),c=s.match(/r="([^"]+)"/);if(g&&l&&c){const r=parseFloat(g[1]),d=parseFloat(l[1]),e=parseFloat(c[1]);a+=`M ${r-e} ${d} `,a+=`A ${e} ${e} 0 0 1 ${r+e} ${d} `,a+=`A ${e} ${e} 0 0 1 ${r-e} ${d} Z `}}),a}generateTTFFont(){return`
// Para usar con opentype.js:
import opentype from 'opentype.js';

const glyphs = [
  // Glifo para espacio
  new opentype.Glyph({
    name: 'space',
    unicode: 32,
    advanceWidth: ${this.config.advanceWidth}
  }),
  
  ${Array.from(this.glyphs.entries()).map(([t,o])=>`
  // Glifo para '${t}'
  new opentype.Glyph({
    name: '${t}',
    unicode: ${t.charCodeAt(0)},
    advanceWidth: ${this.config.advanceWidth},
    path: new opentype.Path.fromPathData('${this.svgToPathData(o)}')
  })`).join(`,
  `)}
];

const font = new opentype.Font({
  familyName: 'MatrixFont',
  styleName: 'Regular',
  unitsPerEm: ${this.config.unitsPerEm},
  ascender: ${this.config.ascent},
  descender: -${this.config.descent},
  glyphs: glyphs
});

// Exportar como buffer para descarga
const buffer = font.toArrayBuffer();
`}generateFontForgeScript(){return`#!/usr/bin/env python3
# Script para FontForge para generar fuente desde SVGs
import fontforge
import os

# Crear nueva fuente
font = fontforge.font()
font.fontname = "MatrixFont"
font.familyname = "Matrix Font"
font.fullname = "Matrix Font Regular"
font.weight = "Regular"
font.encoding = "unicode"

# Configurar métricas
font.em = ${this.config.unitsPerEm}
font.ascent = ${this.config.ascent}
font.descent = ${this.config.descent}

${Array.from(this.glyphs.entries()).map(([t,o])=>`
# Glifo para '${t}'
glyph = font.createChar(${t.charCodeAt(0)}, "${t}")
glyph.importOutlines("${t}.svg")  # Necesitas guardar el SVG como archivo
glyph.width = ${this.config.advanceWidth}
`).join(`
`)}

# Generar fuente
font.generate("MatrixFont.ttf")
font.generate("MatrixFont.woff")
font.generate("MatrixFont.woff2")
print("Fuentes generadas exitosamente")
`}generateWebFontCSS(t="MatrixFont"){return`@font-face {
  font-family: '${t}';
  src: url('${t}.woff2') format('woff2'),
       url('${t}.woff') format('woff'),
       url('${t}.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.matrix-font {
  font-family: '${t}', monospace;
  font-feature-settings: "liga" off;
}

/* Ejemplo de uso */
.matrix-text {
  font-family: '${t}';
  font-size: 24px;
  line-height: 1.2;
}`}getAllSVGs(){return new Map(this.glyphs)}}const h=new A({pointRadius:5,spacing:25,unitsPerEm:1e3,advanceWidth:400,padding:10}),u=[[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],x=[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]];console.log("=== Tu función original (sin cambios) ===");const C=m(u,{pointRadius:5,spacing:25,backgroundColor:"#f8f9fa",pointColor:"#007bff",padding:10,character:"A",makeSelectable:!0});console.log("SVG original para 'A':",C);console.log(`
=== Previsualización (igual que antes) ===`);const S=h.addGlyph("A",u);console.log("Preview 'A':",S);h.addGlyph("A",u);h.addGlyph("B",x);console.log("=== CSS para fuente web ===");console.log(h.generateWebFontCSS());console.log(`
=== Script de FontForge ===`);console.log(h.generateFontForgeScript());console.log(`
=== Código para opentype.js ===`);console.log(h.generateTTFFont());
