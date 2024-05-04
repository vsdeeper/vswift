function a(r, o, e) {
  try {
    return f(r, o, e);
  } catch (d) {
    console.error("findNodeFromTreeData: ", d);
  }
}
function f(r, o, e) {
  var c;
  const { id: d = "id", children: i = "children" } = e ?? {};
  let t;
  for (const n of o) {
    if (n[d] === r) {
      t = n;
      break;
    }
    (c = n[i]) != null && c.length && f(r, n[i], e);
  }
  return t;
}
export {
  a as findNodeObjectFromTreeData
};
