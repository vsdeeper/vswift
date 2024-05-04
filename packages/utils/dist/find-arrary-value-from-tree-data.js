function h(l, r, t) {
  try {
    const { returnType: n = "ids" } = t ?? {};
    return n === "labels" ? u(l, f(r), t) : n === "ids" ? s(l, f(r), t) : p(l, f(r), t);
  } catch (n) {
    console.error("findArraryValuesFromTreeData: ", n);
  }
}
function f(l, r) {
  try {
    const { id: t = "id", children: n = "children", parentId: d } = r ?? {};
    return l.reduce((e, i) => {
      var o;
      return [
        ...e,
        typeof d > "u" ? i : { ...i, parentId: d },
        ...(o = i[n]) != null && o.length ? f(i[n], i[t]) : []
      ];
    }, []);
  } catch (t) {
    return console.error("toFlatten: ", t), [];
  }
}
function s(l, r, t) {
  const { id: n = "id" } = t ?? {};
  let d = [l], e = r.find((i) => i[n] === l);
  for (; e && typeof e.parentId < "u"; )
    d = [e.parentId, ...d], e = r.find((i) => i[n] === e.parentId);
  return d;
}
function u(l, r, t) {
  const { id: n = "id", label: d = "label" } = t ?? {};
  let e = r.find((o) => o[n] === l), i = e && e[d] ? [e[d]] : [];
  for (; e && typeof e.parentId < "u"; )
    i = [r.find((c) => c[n] === e.parentId)[d], ...i], e = r.find((c) => c[n] === e.parentId);
  return i;
}
function p(l, r, t) {
  const { id: n = "id" } = t ?? {};
  let d = r.find((i) => i[n] === l), e = d ? [d] : [];
  for (; d && typeof d.parentId < "u"; )
    e = [r.find((o) => o[n] === d.parentId), ...e], d = r.find((o) => o[n] === d.parentId);
  return e;
}
export {
  h as findArraryValueFromTreeData,
  f as toFlatten
};
