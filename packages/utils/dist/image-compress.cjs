"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function h(n,c){return new Promise((g,d)=>{try{console.log("imageCompress压缩前文件信息: ",n);const t=new FileReader;t.onload=l=>{var i;const a=new Image;a.src=(i=l.target)==null?void 0:i.result,a.onload=()=>{const e=document.createElement("canvas"),r=e.getContext("2d");let o=a.width,s=a.height;o>1500&&(s=Math.ceil(1500*s/o),o=1500),e.width=o,e.height=s,r==null||r.drawImage(a,0,0,e.width,e.height);const m=e.toDataURL("image/jpeg",c??.5);g(m)}},t.readAsDataURL(n)}catch(t){console.error("imageCompress: ",t),d(t)}})}exports.imageCompress=h;