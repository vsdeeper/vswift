import * as e from "xlsx-js-style";
function w(i, a, c) {
  try {
    const o = e.utils.book_new(), t = e.utils.json_to_sheet(i, { cellStyles: !0, cellDates: !0 });
    if (c)
      c(e, t);
    else {
      const r = e.utils.decode_range(t["!ref"]), f = r.s.r, u = r.e.r;
      for (let s = f; s <= u; s++)
        for (let l = r.s.c; l <= r.e.c; l++) {
          const n = e.utils.encode_cell({ c: l, r: s });
          t[n] || (t[n] = {}), t[n].s = {
            font: {
              sz: 10,
              name: "Arial"
            },
            alignment: { horizontal: "left", vertical: "center" }
          };
        }
    }
    e.utils.book_append_sheet(o, t, "Sheet1"), e.writeFile(o, a ?? "output.xlsx");
  } catch (o) {
    console.error(o);
  }
}
export {
  w as xlsxExport
};
