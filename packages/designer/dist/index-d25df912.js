import { ref as K, watch as M, provide as j, computed as r, defineComponent as _, openBlock as V, createElementBlock as A, normalizeClass as m, unref as e, renderSlot as N, inject as G, createElementVNode as I, withKeys as U, withModifiers as W, createTextVNode as z, toDisplayString as L, createVNode as y, withCtx as g, withDirectives as R, vShow as q } from "vue";
import { h as S, F as T, G as J, U as D, C as F, k as Q, r as X, O as Y, u as w, c as H, a1 as Z, e as ee, w as se, d as te } from "./index-a443a97f.js";
import { castArray as $ } from "lodash-es";
import { _ as le } from "./index-db10a94d.js";
import { ArrowRight as ae } from "@element-plus/icons-vue";
const x = (s) => Q(s) || X(s) || Y(s), oe = S({
  accordion: Boolean,
  modelValue: {
    type: T([Array, String, Number]),
    default: () => J([])
  }
}), ne = {
  [D]: x,
  [F]: x
}, B = Symbol("collapseContextKey"), ie = (s, n) => {
  const l = K($(s.modelValue)), i = (a) => {
    l.value = a;
    const o = s.accordion ? l.value[0] : l.value;
    n(D, o), n(F, o);
  }, t = (a) => {
    if (s.accordion)
      i([l.value[0] === a ? "" : a]);
    else {
      const o = [...l.value], c = o.indexOf(a);
      c > -1 ? o.splice(c, 1) : o.push(a), i(o);
    }
  };
  return M(() => s.modelValue, () => l.value = $(s.modelValue), { deep: !0 }), j(B, {
    activeNames: l,
    handleItemClick: t
  }), {
    activeNames: l,
    setActiveNames: i
  };
}, ce = () => {
  const s = w("collapse");
  return {
    rootKls: r(() => s.b())
  };
}, re = _({
  name: "ElCollapse"
}), de = /* @__PURE__ */ _({
  ...re,
  props: oe,
  emits: ne,
  setup(s, { expose: n, emit: l }) {
    const i = s, { activeNames: t, setActiveNames: a } = ie(i, l), { rootKls: o } = ce();
    return n({
      activeNames: t,
      setActiveNames: a
    }), (c, u) => (V(), A("div", {
      class: m(e(o))
    }, [
      N(c.$slots, "default")
    ], 2));
  }
});
var ue = /* @__PURE__ */ H(de, [["__file", "collapse.vue"]]);
const pe = S({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: T([String, Number]),
    default: void 0
  },
  disabled: Boolean
}), me = (s) => {
  const n = G(B), { namespace: l } = w("collapse"), i = K(!1), t = K(!1), a = Z(), o = r(() => a.current++), c = r(() => {
    var b;
    return (b = s.name) != null ? b : `${l.value}-id-${a.prefix}-${e(o)}`;
  }), u = r(() => n == null ? void 0 : n.activeNames.value.includes(e(c)));
  return {
    focusing: i,
    id: o,
    isActive: u,
    handleFocus: () => {
      setTimeout(() => {
        t.value ? t.value = !1 : i.value = !0;
      }, 50);
    },
    handleHeaderClick: () => {
      s.disabled || (n == null || n.handleItemClick(e(c)), i.value = !1, t.value = !0);
    },
    handleEnterClick: () => {
      n == null || n.handleItemClick(e(c));
    }
  };
}, ve = (s, { focusing: n, isActive: l, id: i }) => {
  const t = w("collapse"), a = r(() => [
    t.b("item"),
    t.is("active", e(l)),
    t.is("disabled", s.disabled)
  ]), o = r(() => [
    t.be("item", "header"),
    t.is("active", e(l)),
    { focusing: e(n) && !s.disabled }
  ]), c = r(() => [
    t.be("item", "arrow"),
    t.is("active", e(l))
  ]), u = r(() => t.be("item", "wrap")), v = r(() => t.be("item", "content")), f = r(() => t.b(`content-${e(i)}`)), C = r(() => t.b(`head-${e(i)}`));
  return {
    arrowKls: c,
    headKls: o,
    rootKls: a,
    itemWrapperKls: u,
    itemContentKls: v,
    scopedContentId: f,
    scopedHeadId: C
  };
}, fe = ["id", "aria-expanded", "aria-controls", "aria-describedby", "tabindex"], Ce = ["id", "aria-hidden", "aria-labelledby"], be = _({
  name: "ElCollapseItem"
}), he = /* @__PURE__ */ _({
  ...be,
  props: pe,
  setup(s, { expose: n }) {
    const l = s, {
      focusing: i,
      id: t,
      isActive: a,
      handleFocus: o,
      handleHeaderClick: c,
      handleEnterClick: u
    } = me(l), {
      arrowKls: v,
      headKls: f,
      rootKls: C,
      itemWrapperKls: b,
      itemContentKls: P,
      scopedContentId: E,
      scopedHeadId: k
    } = ve(l, { focusing: i, isActive: a, id: t });
    return n({
      isActive: a
    }), (h, d) => (V(), A("div", {
      class: m(e(C))
    }, [
      I("button", {
        id: e(k),
        class: m(e(f)),
        "aria-expanded": e(a),
        "aria-controls": e(E),
        "aria-describedby": e(E),
        tabindex: h.disabled ? -1 : 0,
        type: "button",
        onClick: d[0] || (d[0] = (...p) => e(c) && e(c)(...p)),
        onKeydown: d[1] || (d[1] = U(W((...p) => e(u) && e(u)(...p), ["stop", "prevent"]), ["space", "enter"])),
        onFocus: d[2] || (d[2] = (...p) => e(o) && e(o)(...p)),
        onBlur: d[3] || (d[3] = (p) => i.value = !1)
      }, [
        N(h.$slots, "title", {}, () => [
          z(L(h.title), 1)
        ]),
        y(e(ee), {
          class: m(e(v))
        }, {
          default: g(() => [
            y(e(ae))
          ]),
          _: 1
        }, 8, ["class"])
      ], 42, fe),
      y(e(le), null, {
        default: g(() => [
          R(I("div", {
            id: e(E),
            role: "region",
            class: m(e(b)),
            "aria-hidden": !e(a),
            "aria-labelledby": e(k)
          }, [
            I("div", {
              class: m(e(P))
            }, [
              N(h.$slots, "default")
            ], 2)
          ], 10, Ce), [
            [q, e(a)]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
});
var O = /* @__PURE__ */ H(he, [["__file", "collapse-item.vue"]]);
const Ne = se(ue, {
  CollapseItem: O
}), we = te(O);
export {
  we as E,
  Ne as a
};
