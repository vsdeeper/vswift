function m(n, r) {
  try {
    const t = window.URL.createObjectURL(new Blob([n])), e = document.createElement("a");
    return e.style.display = "none", e.href = t, e.download = r, document.body.appendChild(e), e.click(), document.body.removeChild(e), window.URL.revokeObjectURL(t), !0;
  } catch (t) {
    console.error("fileDownload: ", t);
  }
}
function A(n, r, t) {
  try {
    const { returnType: e = "ids" } = t ?? {};
    return e === "labels" ? w(n, f(r), t) : e === "ids" ? p(n, f(r), t) : b(n, f(r), t);
  } catch (e) {
    console.error("findArraryValuesFromTreeData: ", e);
  }
}
function f(n, r) {
  try {
    const { id: t = "id", children: e = "children", parentId: o } = r ?? {};
    return n.reduce((c, i) => {
      var l;
      return [
        ...c,
        typeof o > "u" ? i : { ...i, parentId: o },
        ...(l = i[e]) != null && l.length ? f(i[e], i[t]) : []
      ];
    }, []);
  } catch (t) {
    return console.error("toFlatten: ", t), [];
  }
}
function p(n, r, t) {
  const { id: e = "id" } = t ?? {};
  let o = [n], c = r.find((i) => i[e] === n);
  for (; c && typeof c.parentId < "u"; )
    o = [c.parentId, ...o], c = r.find((i) => i[e] === c.parentId);
  return o;
}
function w(n, r, t) {
  const { id: e = "id", label: o = "label" } = t ?? {};
  let c = r.find((l) => l[e] === n), i = c && c[o] ? [c[o]] : [];
  for (; c && typeof c.parentId < "u"; )
    i = [r.find((d) => d[e] === c.parentId)[o], ...i], c = r.find((d) => d[e] === c.parentId);
  return i;
}
function b(n, r, t) {
  const { id: e = "id" } = t ?? {};
  let o = r.find((i) => i[e] === n), c = o ? [o] : [];
  for (; o && typeof o.parentId < "u"; )
    c = [r.find((l) => l[e] === o.parentId), ...c], o = r.find((l) => l[e] === o.parentId);
  return c;
}
function I(n, r, t) {
  try {
    return h(n, r, t);
  } catch (e) {
    console.error("findNodeFromTreeData: ", e);
  }
}
function h(n, r, t) {
  var i;
  const { id: e = "id", children: o = "children" } = t ?? {};
  let c;
  for (const l of r) {
    if (l[e] === n) {
      c = l;
      break;
    }
    (i = l[o]) != null && i.length && h(n, l[o], t);
  }
  return c;
}
function R(n, r, t) {
  try {
    const { label: e = "label", value: o = "value", emptyText: c = "--" } = t ?? {}, i = r.find((l) => l[o] === n);
    return (i && i[e]) ?? c;
  } catch (e) {
    console.error("getLabelByValue: ", e);
  }
}
function T(n) {
  try {
    if (Array.isArray(n)) {
      if (n.length)
        return !!n[0] && n[0].constructor === Object;
      throw new Error("data.length === 0, unable to judge.");
    }
    return !1;
  } catch (r) {
    console.error("isArraryObject: ", r);
  }
}
function L(n) {
  try {
    return Object.prototype.toString.call(n) === "[object AsyncFunction]";
  } catch (r) {
    console.error("isAsyncFunction: ", r);
  }
}
function U(n, r) {
  return new Promise((t, e) => {
    try {
      console.log("imageCompress压缩前文件信息: ", n);
      const o = new FileReader();
      o.onload = (c) => {
        var l;
        const i = new Image();
        i.src = (l = c.target) == null ? void 0 : l.result, i.onload = () => {
          const d = document.createElement("canvas"), a = d.getContext("2d");
          let s = i.width, u = i.height;
          s > 1500 && (u = Math.ceil(1500 * u / s), s = 1500), d.width = s, d.height = u, a == null || a.drawImage(i, 0, 0, d.width, d.height);
          const y = d.toDataURL(
            "image/jpeg",
            r ?? 0.5
            /**质量压缩为原来的50% */
          );
          t(y);
        };
      }, o.readAsDataURL(n);
    } catch (o) {
      console.error("imageCompress: ", o), e(o);
    }
  });
}
function j(n) {
  try {
    const r = ";base64,";
    if (n.indexOf(r) === -1) {
      const d = n.split(","), a = d[0].split(":")[1], s = decodeURIComponent(d[1]);
      return new Blob([s], { type: a });
    }
    const t = n.split(r), e = t[0].split(":")[1], o = window.atob(t[1]), c = o.length, i = new Uint8Array(c);
    for (let d = 0; d < c; ++d)
      i[d] = o.charCodeAt(d);
    const l = new Blob([i], { type: e });
    return console.log("dataURLToBlob转换后: ", l), l;
  } catch (r) {
    console.error("dataURLToBlob: ", r);
  }
}
function g(n, r, t) {
  const { children: e = "children" } = t ?? {};
  return n.forEach((o) => {
    var c;
    r(o), (c = o[e]) != null && c.length && g(o[e], r, t);
  }), n;
}
function v(n, r, t) {
  const e = setInterval(() => {
    n-- ? r(n) : (t && t(), clearInterval(e));
  }, 1e3);
}
export {
  v as countDown,
  j as dataURLToBlob,
  m as fileDownload,
  A as findArraryValuesFromTreeData,
  I as findNodeFromTreeData,
  R as getLabelByValue,
  U as imageCompress,
  T as isArraryObject,
  L as isAsyncFunction,
  g as recursiveTreeData,
  f as toFlatten
};
