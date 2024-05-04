async function w(i, a, n) {
  try {
    const e = await import("xlsx-js-style"), c = e.utils.book_new(), t = e.utils.json_to_sheet(i, { cellStyles: !0, cellDates: !0 });
    if (n)
      n(e, t);
    else {
      const o = e.utils.decode_range(t["!ref"]), u = o.s.r, f = o.e.r;
      for (let r = u; r <= f; r++)
        for (let s = o.s.c; s <= o.e.c; s++) {
          const l = e.utils.encode_cell({ c: s, r });
          t[l] || (t[l] = {}), t[l].s = {
            font: {
              sz: 10,
              name: "Arial"
            },
            alignment: { horizontal: "left", vertical: "center" }
          };
        }
    }
    e.utils.book_append_sheet(c, t, "Sheet1"), e.writeFile(c, a ?? "output.xlsx");
  } catch (e) {
    console.error(e);
  }
}
export {
  w as xlsxExport
};
