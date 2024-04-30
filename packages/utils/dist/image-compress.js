function m(s, c) {
  return new Promise((g, h) => {
    try {
      console.log("imageCompress压缩前文件信息: ", s);
      const t = new FileReader();
      t.onload = (d) => {
        var i;
        const a = new Image();
        a.src = (i = d.target) == null ? void 0 : i.result, a.onload = () => {
          const e = document.createElement("canvas"), r = e.getContext("2d");
          let o = a.width, n = a.height;
          o > 1500 && (n = Math.ceil(1500 * n / o), o = 1500), e.width = o, e.height = n, r == null || r.drawImage(a, 0, 0, e.width, e.height);
          const l = e.toDataURL(
            "image/jpeg",
            c ?? 0.5
            /**质量压缩为原来的50% */
          );
          g(l);
        };
      }, t.readAsDataURL(s);
    } catch (t) {
      console.error("imageCompress: ", t), h(t);
    }
  });
}
export {
  m as imageCompress
};
