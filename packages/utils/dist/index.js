function p(n) {
  try {
    return n.charAt(0).toUpperCase() + n.slice(1);
  } catch (t) {
    throw new Error(JSON.stringify(t));
  }
}
function w(n, t) {
  try {
    return n = n.charAt(0).toLowerCase() + n.slice(1), n.replace(/([A-Z])/g, `${t ?? "-"}$1`).toLowerCase();
  } catch (o) {
    throw new Error(JSON.stringify(o));
  }
}
function y(n) {
  try {
    return n.charAt(0).toLowerCase() + n.slice(1);
  } catch (t) {
    throw new Error(JSON.stringify(t));
  }
}
const I = (n, t, o) => {
  const { id: i = "id", label: r = "label", children: e = "children", returnType: d = "ids" } = o ?? {};
  return d === "names" ? h(n, l(t, { id: i, children: e }), { id: i, label: r }) : d === "ids" ? s(n, l(t, { id: i, children: e }), { id: i }) : u(n, l(t, { id: i, children: e }), { id: i });
};
function l(n, t) {
  const { id: o = "id", children: i = "children", parentId: r } = t ?? {};
  return n.reduce((e, d) => [
    ...e,
    typeof r > "u" ? d : { ...d, parentId: r },
    ...d[i] && d[i].length ? l(d[i], { id: o, children: i, parentId: d[o] }) : []
  ], []);
}
function s(n, t, o) {
  const { id: i = "id" } = o ?? {};
  let r = [n], e = t.find((d) => d[i] === n);
  for (; e && typeof e.parentId < "u"; )
    r = [e.parentId, ...r], e = t.find((d) => d[i] === e.parentId);
  return r;
}
function h(n, t, o) {
  const { id: i = "id", label: r = "label" } = o ?? {};
  let e = t.find((c) => c[i] === n), d = e && [e[r]] || [];
  for (; e && typeof e.parentId < "u"; )
    d = [t.find((f) => f[i] === e.parentId)[r], ...d], e = t.find((f) => f[i] === e.parentId);
  return d;
}
function u(n, t, o) {
  const { id: i = "id" } = o ?? {};
  let r = t.find((d) => d[i] === n), e = r && [r] || [];
  for (; r && typeof r.parentId < "u"; )
    e = [t.find((c) => c[i] === r.parentId), ...e], r = t.find((c) => c[i] === r.parentId);
  return e;
}
const b = (n, t, o) => {
  const { id: i = "id", children: r = "children" } = o ?? {};
  return a(n, t, { id: i, children: r });
};
function a(n, t, o) {
  const { id: i = "id", children: r = "children" } = o ?? {};
  for (const e of t) {
    if (e[i] === n)
      return e;
    e[r] && e[r].length && a(n, e[r], { id: i, children: r });
  }
}
export {
  w as camelToSeparator,
  p as capitalizeFirstLetter,
  I as findArraryValuesFromTreeData,
  b as findObjectFromTreeData,
  y as uncapitalizeFirstLetter
};
