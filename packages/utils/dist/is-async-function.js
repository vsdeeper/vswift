function c(n) {
  try {
    return Object.prototype.toString.call(n) === "[object AsyncFunction]";
  } catch (t) {
    console.error("isAsyncFunction: ", t);
  }
}
export {
  c as isAsyncFunction
};
