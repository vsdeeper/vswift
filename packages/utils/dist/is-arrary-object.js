function t(r) {
  try {
    if (Array.isArray(r)) {
      if (r.length)
        return !!r[0] && r[0].constructor === Object;
      throw new Error("data.length === 0, unable to judge.");
    }
    return !1;
  } catch (e) {
    console.error("isArraryObject: ", e);
  }
}
export {
  t as isArraryObject
};
