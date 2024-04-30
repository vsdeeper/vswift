function t(e, c, h) {
  const { children: n = "children" } = h ?? {};
  return e.forEach((r) => {
    var i;
    c(r), (i = r[n]) != null && i.length && t(r[n], c, h);
  }), e;
}
export {
  t as recursiveTreeData
};
