function u(t, r, a) {
  try {
    const { label: e = "label", value: n = "value", emptyText: o = "--" } = a ?? {}, l = r.find((c) => c[n] === t);
    return (l && l[e]) ?? o;
  } catch (e) {
    console.error("getLabelByValue: ", e);
  }
}
export {
  u as getLabelByValue
};
