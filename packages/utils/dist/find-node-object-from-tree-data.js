import "xlsx-js-style";
function l(r, o, e) {
  try {
    return f(r, o, e);
  } catch (i) {
    console.error("findNodeFromTreeData: ", i);
  }
}
function f(r, o, e) {
  var c;
  const { id: i = "id", children: t = "children" } = e ?? {};
  let d;
  for (const n of o) {
    if (n[i] === r) {
      d = n;
      break;
    }
    (c = n[t]) != null && c.length && f(r, n[t], e);
  }
  return d;
}
export {
  l as findNodeObjectFromTreeData
};
