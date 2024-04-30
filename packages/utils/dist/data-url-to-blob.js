function b(n) {
  try {
    const o = ";base64,";
    if (n.indexOf(o) === -1) {
      const t = n.split(","), p = t[0].split(":")[1], i = decodeURIComponent(t[1]);
      return new Blob([i], { type: p });
    }
    const e = n.split(o), l = e[0].split(":")[1], r = window.atob(e[1]), c = r.length, s = new Uint8Array(c);
    for (let t = 0; t < c; ++t)
      s[t] = r.charCodeAt(t);
    const a = new Blob([s], { type: l });
    return console.log("dataURLToBlob转换后: ", a), a;
  } catch (o) {
    console.error("dataURLToBlob: ", o);
  }
}
export {
  b as dataURLToBlob
};
