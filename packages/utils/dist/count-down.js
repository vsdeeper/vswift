function l(t, n, e) {
  const r = setInterval(() => {
    t-- ? n(t) : (e && e(), clearInterval(r));
  }, 1e3);
}
export {
  l as countDown
};
