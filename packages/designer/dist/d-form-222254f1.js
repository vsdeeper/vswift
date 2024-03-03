import { u as d, c as p, w as k, d as v } from "./index-a443a97f.js";
import { defineComponent as n, useSlots as B, computed as $, openBlock as i, createElementBlock as f, normalizeClass as m, unref as o, renderSlot as h, normalizeStyle as y, createBlock as N, withCtx as c, createVNode as u, createTextVNode as g } from "vue";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const V = n({
  name: "ElContainer"
}), b = /* @__PURE__ */ n({
  ...V,
  props: {
    direction: {
      type: String
    }
  },
  setup(r) {
    const t = r, e = B(), s = d("container"), a = $(() => t.direction === "vertical" ? !0 : t.direction === "horizontal" ? !1 : e && e.default ? e.default().some((_) => {
      const E = _.type.name;
      return E === "ElHeader" || E === "ElFooter";
    }) : !1);
    return (l, _) => (i(), f("section", {
      class: m([o(s).b(), o(s).is("vertical", o(a))])
    }, [
      h(l.$slots, "default")
    ], 2));
  }
});
var H = /* @__PURE__ */ p(b, [["__file", "container.vue"]]);
const A = n({
  name: "ElAside"
}), F = /* @__PURE__ */ n({
  ...A,
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(r) {
    const t = r, e = d("aside"), s = $(() => t.width ? e.cssVarBlock({ width: t.width }) : {});
    return (a, l) => (i(), f("aside", {
      class: m(o(e).b()),
      style: y(o(s))
    }, [
      h(a.$slots, "default")
    ], 6));
  }
});
var w = /* @__PURE__ */ p(F, [["__file", "aside.vue"]]);
const M = n({
  name: "ElFooter"
}), z = /* @__PURE__ */ n({
  ...M,
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(r) {
    const t = r, e = d("footer"), s = $(() => t.height ? e.cssVarBlock({ height: t.height }) : {});
    return (a, l) => (i(), f("footer", {
      class: m(o(e).b()),
      style: y(o(s))
    }, [
      h(a.$slots, "default")
    ], 6));
  }
});
var x = /* @__PURE__ */ p(z, [["__file", "footer.vue"]]);
const I = n({
  name: "ElHeader"
}), D = /* @__PURE__ */ n({
  ...I,
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(r) {
    const t = r, e = d("header"), s = $(() => t.height ? e.cssVarBlock({
      height: t.height
    }) : {});
    return (a, l) => (i(), f("header", {
      class: m(o(e).b()),
      style: y(o(s))
    }, [
      h(a.$slots, "default")
    ], 6));
  }
});
var C = /* @__PURE__ */ p(D, [["__file", "header.vue"]]);
const T = n({
  name: "ElMain"
}), j = /* @__PURE__ */ n({
  ...T,
  setup(r) {
    const t = d("main");
    return (e, s) => (i(), f("main", {
      class: m(o(t).b())
    }, [
      h(e.$slots, "default")
    ], 2));
  }
});
var S = /* @__PURE__ */ p(j, [["__file", "main.vue"]]);
const q = k(H, {
  Aside: w,
  Footer: x,
  Header: C,
  Main: S
}), G = v(w);
v(x);
const J = v(C), K = v(S);
const X = /* @__PURE__ */ n({
  __name: "d-form",
  props: {
    formData: {}
  },
  setup(r) {
    return (t, e) => {
      const s = G, a = J, l = K, _ = q;
      return i(), N(_, null, {
        default: c(() => [
          u(s, { width: "250px" }, {
            default: c(() => [
              g(" 左侧边栏 ")
            ]),
            _: 1
          }),
          u(_, null, {
            default: c(() => [
              u(a, { height: "50px" }, {
                default: c(() => [
                  g(" 顶部 ")
                ]),
                _: 1
              }),
              u(l, null, {
                default: c(() => [
                  g(" 主体 ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          u(s, { width: "250px" }, {
            default: c(() => [
              g(" 右侧边栏 ")
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  X as default
};
