function d(n, t) {
  try {
    const o = window.URL.createObjectURL(new Blob([n])), e = document.createElement("a");
    return e.style.display = "none", e.href = o, e.download = t, document.body.appendChild(e), e.click(), document.body.removeChild(e), window.URL.revokeObjectURL(o), !0;
  } catch (o) {
    console.error("fileDownload: ", o);
  }
}
export {
  d as fileDownload
};
