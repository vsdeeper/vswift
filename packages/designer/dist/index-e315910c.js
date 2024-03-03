import { ref as V, inject as W, computed as v, defineComponent as E, openBlock as _, createElementBlock as I, normalizeClass as b, unref as e, createElementVNode as g, withDirectives as h, isRef as F, withModifiers as S, vModelRadio as D, renderSlot as k, createTextVNode as x, toDisplayString as A, nextTick as T, normalizeStyle as J, onMounted as Q, provide as X, reactive as Y, toRefs as Z, watch as ee } from "vue";
import { h as R, j as U, U as G, r as N, k as z, N as w, C as oe, P, p as ae, q as le, S as te, u as $, c as C, a2 as se, m as ne, R as re, o as ie, w as de, d as K } from "./index-a443a97f.js";
const M = R({
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  size: U,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  name: {
    type: String,
    default: void 0
  }
}), ue = R({
  ...M,
  border: Boolean
}), L = {
  [G]: (a) => N(a) || z(a) || w(a),
  [oe]: (a) => N(a) || z(a) || w(a)
}, j = Symbol("radioGroupKey"), q = (a, c) => {
  const n = V(), o = W(j, void 0), u = v(() => !!o), f = v(() => P(a.value) ? a.label : a.value), i = v({
    get() {
      return u.value ? o.modelValue : a.modelValue;
    },
    set(t) {
      u.value ? o.changeEvent(t) : c && c(G, t), n.value.checked = a.modelValue === f.value;
    }
  }), p = ae(v(() => o == null ? void 0 : o.size)), l = le(v(() => o == null ? void 0 : o.disabled)), d = V(!1), m = v(() => l.value || u.value && i.value !== f.value ? -1 : 0);
  return te({
    from: "label act as value",
    replacement: "value",
    version: "3.0.0",
    scope: "el-radio",
    ref: "https://element-plus.org/en-US/component/radio.html"
  }, v(() => u.value && P(a.value))), {
    radioRef: n,
    isGroup: u,
    radioGroup: o,
    focus: d,
    size: p,
    disabled: l,
    tabIndex: m,
    modelValue: i,
    actualValue: f
  };
}, pe = ["value", "name", "disabled"], ce = E({
  name: "ElRadio"
}), fe = /* @__PURE__ */ E({
  ...ce,
  props: ue,
  emits: L,
  setup(a, { emit: c }) {
    const n = a, o = $("radio"), { radioRef: u, radioGroup: f, focus: i, size: p, disabled: l, modelValue: d, actualValue: m } = q(n, c);
    function t() {
      T(() => c("change", d.value));
    }
    return (s, r) => {
      var y;
      return _(), I("label", {
        class: b([
          e(o).b(),
          e(o).is("disabled", e(l)),
          e(o).is("focus", e(i)),
          e(o).is("bordered", s.border),
          e(o).is("checked", e(d) === e(m)),
          e(o).m(e(p))
        ])
      }, [
        g("span", {
          class: b([
            e(o).e("input"),
            e(o).is("disabled", e(l)),
            e(o).is("checked", e(d) === e(m))
          ])
        }, [
          h(g("input", {
            ref_key: "radioRef",
            ref: u,
            "onUpdate:modelValue": r[0] || (r[0] = (B) => F(d) ? d.value = B : null),
            class: b(e(o).e("original")),
            value: e(m),
            name: s.name || ((y = e(f)) == null ? void 0 : y.name),
            disabled: e(l),
            type: "radio",
            onFocus: r[1] || (r[1] = (B) => i.value = !0),
            onBlur: r[2] || (r[2] = (B) => i.value = !1),
            onChange: t,
            onClick: r[3] || (r[3] = S(() => {
            }, ["stop"]))
          }, null, 42, pe), [
            [D, e(d)]
          ]),
          g("span", {
            class: b(e(o).e("inner"))
          }, null, 2)
        ], 2),
        g("span", {
          class: b(e(o).e("label")),
          onKeydown: r[4] || (r[4] = S(() => {
          }, ["stop"]))
        }, [
          k(s.$slots, "default", {}, () => [
            x(A(s.label), 1)
          ])
        ], 34)
      ], 2);
    };
  }
});
var me = /* @__PURE__ */ C(fe, [["__file", "radio.vue"]]);
const ve = R({
  ...M
}), be = ["value", "name", "disabled"], ye = E({
  name: "ElRadioButton"
}), ge = /* @__PURE__ */ E({
  ...ye,
  props: ve,
  setup(a) {
    const c = a, n = $("radio"), { radioRef: o, focus: u, size: f, disabled: i, modelValue: p, radioGroup: l, actualValue: d } = q(c), m = v(() => ({
      backgroundColor: (l == null ? void 0 : l.fill) || "",
      borderColor: (l == null ? void 0 : l.fill) || "",
      boxShadow: l != null && l.fill ? `-1px 0 0 0 ${l.fill}` : "",
      color: (l == null ? void 0 : l.textColor) || ""
    }));
    return (t, s) => {
      var r;
      return _(), I("label", {
        class: b([
          e(n).b("button"),
          e(n).is("active", e(p) === e(d)),
          e(n).is("disabled", e(i)),
          e(n).is("focus", e(u)),
          e(n).bm("button", e(f))
        ])
      }, [
        h(g("input", {
          ref_key: "radioRef",
          ref: o,
          "onUpdate:modelValue": s[0] || (s[0] = (y) => F(p) ? p.value = y : null),
          class: b(e(n).be("button", "original-radio")),
          value: e(d),
          type: "radio",
          name: t.name || ((r = e(l)) == null ? void 0 : r.name),
          disabled: e(i),
          onFocus: s[1] || (s[1] = (y) => u.value = !0),
          onBlur: s[2] || (s[2] = (y) => u.value = !1),
          onClick: s[3] || (s[3] = S(() => {
          }, ["stop"]))
        }, null, 42, be), [
          [D, e(p)]
        ]),
        g("span", {
          class: b(e(n).be("button", "inner")),
          style: J(e(p) === e(d) ? e(m) : {}),
          onKeydown: s[4] || (s[4] = S(() => {
          }, ["stop"]))
        }, [
          k(t.$slots, "default", {}, () => [
            x(A(t.label), 1)
          ])
        ], 38)
      ], 2);
    };
  }
});
var H = /* @__PURE__ */ C(ge, [["__file", "radio-button.vue"]]);
const Ee = R({
  id: {
    type: String,
    default: void 0
  },
  size: U,
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  fill: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: void 0
  },
  textColor: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: void 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), Se = L, Re = ["id", "aria-label", "aria-labelledby"], Be = E({
  name: "ElRadioGroup"
}), Ve = /* @__PURE__ */ E({
  ...Be,
  props: Ee,
  emits: Se,
  setup(a, { emit: c }) {
    const n = a, o = $("radio"), u = se(), f = V(), { formItem: i } = ne(), { inputId: p, isLabeledByFormItem: l } = re(n, {
      formItemContext: i
    }), d = (t) => {
      c(G, t), T(() => c("change", t));
    };
    Q(() => {
      const t = f.value.querySelectorAll("[type=radio]"), s = t[0];
      !Array.from(t).some((r) => r.checked) && s && (s.tabIndex = 0);
    });
    const m = v(() => n.name || u.value);
    return X(j, Y({
      ...Z(n),
      changeEvent: d,
      name: m
    })), ee(() => n.modelValue, () => {
      n.validateEvent && (i == null || i.validate("change").catch((t) => ie(t)));
    }), (t, s) => (_(), I("div", {
      id: e(p),
      ref_key: "radioGroupRef",
      ref: f,
      class: b(e(o).b("group")),
      role: "radiogroup",
      "aria-label": e(l) ? void 0 : t.label || "radio-group",
      "aria-labelledby": e(l) ? e(i).labelId : void 0
    }, [
      k(t.$slots, "default")
    ], 10, Re));
  }
});
var O = /* @__PURE__ */ C(Ve, [["__file", "radio-group.vue"]]);
const ke = de(me, {
  RadioButton: H,
  RadioGroup: O
}), Ge = K(O), $e = K(H);
export {
  ke as E,
  Ge as a,
  $e as b
};
