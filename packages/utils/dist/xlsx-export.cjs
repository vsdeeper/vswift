"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("xlsx-js-style");function b(e){const l=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const o=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(l,t,o.get?o:{enumerable:!0,get:()=>e[t]})}}return l.default=e,Object.freeze(l)}const r=b(p);function d(e,l,t){try{const o=r.utils.book_new(),n=r.utils.json_to_sheet(e,{cellStyles:!0,cellDates:!0});if(t)t(r,n);else{const c=r.utils.decode_range(n["!ref"]),a=c.s.r,f=c.e.r;for(let s=a;s<=f;s++)for(let i=c.s.c;i<=c.e.c;i++){const u=r.utils.encode_cell({c:i,r:s});n[u]||(n[u]={}),n[u].s={font:{sz:10,name:"Arial"},alignment:{horizontal:"left",vertical:"center"}}}}r.utils.book_append_sheet(o,n,"Sheet1"),r.writeFile(o,l??"output.xlsx")}catch(o){console.error(o)}}exports.xlsxExport=d;