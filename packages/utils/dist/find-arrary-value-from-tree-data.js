import "xlsx-js-style";
function y(l, d, t) {
  try {
    const { returnType: n = "ids" } = t ?? {};
    return n === "labels" ? u(l, f(d), t) : n === "ids" ? s(l, f(d), t) : p(l, f(d), t);
  } catch (n) {
    console.error("findArraryValuesFromTreeData: ", n);
  }
}
function f(l, d) {
  try {
    const { id: t = "id", children: n = "children", parentId: r } = d ?? {};
    return l.reduce((e, i) => {
      var o;
      return [
        ...e,
        typeof r > "u" ? i : { ...i, parentId: r },
        ...(o = i[n]) != null && o.length ? f(i[n], i[t]) : []
      ];
    }, []);
  } catch (t) {
    return console.error("toFlatten: ", t), [];
  }
}
function s(l, d, t) {
  const { id: n = "id" } = t ?? {};
  let r = [l], e = d.find((i) => i[n] === l);
  for (; e && typeof e.parentId < "u"; )
    r = [e.parentId, ...r], e = d.find((i) => i[n] === e.parentId);
  return r;
}
function u(l, d, t) {
  const { id: n = "id", label: r = "label" } = t ?? {};
  let e = d.find((o) => o[n] === l), i = e && e[r] ? [e[r]] : [];
  for (; e && typeof e.parentId < "u"; )
    i = [d.find((c) => c[n] === e.parentId)[r], ...i], e = d.find((c) => c[n] === e.parentId);
  return i;
}
function p(l, d, t) {
  const { id: n = "id" } = t ?? {};
  let r = d.find((i) => i[n] === l), e = r ? [r] : [];
  for (; r && typeof r.parentId < "u"; )
    e = [d.find((o) => o[n] === r.parentId), ...e], r = d.find((o) => o[n] === r.parentId);
  return e;
}
export {
  y as findArraryValueFromTreeData,
  f as toFlatten
};