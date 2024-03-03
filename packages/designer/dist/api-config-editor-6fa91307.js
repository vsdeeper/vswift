import { j as Pe, U as ue, r as me, k as Be, N as ye, n as be, q as tt, m as Ke, o as Se, O as ne, P as ke, Q as Me, p as $e, R as Fe, S as pe, u as q, c as _, h as nt, F as ot, w as at, d as ze, T as Ne, V as ve, W as lt, e as st, i as dt, X as rt, L as G, Y as it, l as ut, Z as ct, $ as ht, a0 as ft, a as pt, E as vt, B as gt, f as mt } from "./index-a443a97f.js";
import "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import "./constants-a6c62b18.js";
import { inject as F, computed as w, getCurrentInstance as ce, watch as T, nextTick as de, ref as B, toRaw as Te, defineComponent as z, useSlots as Re, openBlock as D, createBlock as P, resolveDynamicComponent as xe, unref as g, normalizeClass as S, withCtx as O, createElementVNode as Z, withDirectives as W, createElementBlock as L, isRef as re, withModifiers as V, vModelCheckbox as ie, renderSlot as oe, Fragment as he, createTextVNode as je, toDisplayString as we, createCommentVNode as M, normalizeStyle as Ue, provide as J, toRefs as yt, reactive as bt, h as Ae, resolveComponent as j, createVNode as A, renderList as Ie, vShow as Ce, shallowRef as Ve, onMounted as kt, onUpdated as Nt, toRef as Ct } from "vue";
import { Loading as Et, CaretRight as Dt, Plus as Kt, Minus as St } from "@element-plus/icons-vue";
import { nanoid as ge } from "nanoid";
import { isEqual as xt, pick as wt, throttle as It, first as Lt, isObject as Bt } from "lodash-es";
import { E as $t, a as Tt } from "./index-01903178.js";
import { _ as At } from "./index-db10a94d.js";
const qe = {
  modelValue: {
    type: [Number, String, Boolean],
    default: void 0
  },
  label: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  value: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: void 0
  },
  trueValue: {
    type: [String, Number],
    default: void 0
  },
  falseValue: {
    type: [String, Number],
    default: void 0
  },
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  id: {
    type: String,
    default: void 0
  },
  controls: {
    type: String,
    default: void 0
  },
  border: Boolean,
  size: Pe,
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: !0
  }
}, Ge = {
  [ue]: (e) => me(e) || Be(e) || ye(e),
  change: (e) => me(e) || Be(e) || ye(e)
}, ee = Symbol("checkboxGroupContextKey"), Vt = ({
  model: e,
  isChecked: t
}) => {
  const o = F(ee, void 0), a = w(() => {
    var l, r;
    const s = (l = o == null ? void 0 : o.max) == null ? void 0 : l.value, p = (r = o == null ? void 0 : o.min) == null ? void 0 : r.value;
    return !be(s) && e.value.length >= s && !t.value || !be(p) && e.value.length <= p && t.value;
  });
  return {
    isDisabled: tt(w(() => (o == null ? void 0 : o.disabled.value) || a.value)),
    isLimitDisabled: a
  };
}, Ot = (e, {
  model: t,
  isLimitExceeded: o,
  hasOwnLabel: a,
  isDisabled: n,
  isLabeledByFormItem: l
}) => {
  const r = F(ee, void 0), { formItem: s } = Ke(), { emit: p } = ce();
  function v(d) {
    var h, m;
    return [!0, e.trueValue, e.trueLabel].includes(d) ? (h = e.trueValue || e.trueLabel) != null ? h : !0 : (m = e.falseValue || e.falseLabel) != null ? m : !1;
  }
  function i(d, h) {
    p("change", v(d), h);
  }
  function u(d) {
    if (o.value)
      return;
    const h = d.target;
    p("change", v(h.checked), d);
  }
  async function c(d) {
    o.value || !a.value && !n.value && l.value && (d.composedPath().some((k) => k.tagName === "LABEL") || (t.value = v([!1, e.falseValue, e.falseLabel].includes(t.value)), await de(), i(t.value, d)));
  }
  const f = w(() => (r == null ? void 0 : r.validateEvent) || e.validateEvent);
  return T(() => e.modelValue, () => {
    f.value && (s == null || s.validate("change").catch((d) => Se(d)));
  }), {
    handleChange: u,
    onClickRoot: c
  };
}, Pt = (e) => {
  const t = B(!1), { emit: o } = ce(), a = F(ee, void 0), n = w(() => be(a) === !1), l = B(!1), r = w({
    get() {
      var s, p;
      return n.value ? (s = a == null ? void 0 : a.modelValue) == null ? void 0 : s.value : (p = e.modelValue) != null ? p : t.value;
    },
    set(s) {
      var p, v;
      n.value && ne(s) ? (l.value = ((p = a == null ? void 0 : a.max) == null ? void 0 : p.value) !== void 0 && s.length > (a == null ? void 0 : a.max.value) && s.length > r.value.length, l.value === !1 && ((v = a == null ? void 0 : a.changeEvent) == null || v.call(a, s))) : (o(ue, s), t.value = s);
    }
  });
  return {
    model: r,
    isGroup: n,
    isLimitExceeded: l
  };
}, Mt = (e, t, { model: o }) => {
  const a = F(ee, void 0), n = B(!1), l = w(() => ke(e.value) ? e.label : e.value), r = w(() => {
    const i = o.value;
    return ye(i) ? i : ne(i) ? Me(l.value) ? i.map(Te).some((u) => xt(u, l.value)) : i.map(Te).includes(l.value) : i != null ? i === e.trueValue || i === e.trueLabel : !!i;
  }), s = $e(w(() => {
    var i;
    return (i = a == null ? void 0 : a.size) == null ? void 0 : i.value;
  }), {
    prop: !0
  }), p = $e(w(() => {
    var i;
    return (i = a == null ? void 0 : a.size) == null ? void 0 : i.value;
  })), v = w(() => !!t.default || !ke(l.value));
  return {
    checkboxButtonSize: s,
    isChecked: r,
    isFocused: n,
    checkboxSize: p,
    hasOwnLabel: v,
    actualValue: l
  };
}, He = (e, t) => {
  const { formItem: o } = Ke(), { model: a, isGroup: n, isLimitExceeded: l } = Pt(e), {
    isFocused: r,
    isChecked: s,
    checkboxButtonSize: p,
    checkboxSize: v,
    hasOwnLabel: i,
    actualValue: u
  } = Mt(e, t, { model: a }), { isDisabled: c } = Vt({ model: a, isChecked: s }), { inputId: f, isLabeledByFormItem: d } = Fe(e, {
    formItemContext: o,
    disableIdGeneration: i,
    disableIdManagement: n
  }), { handleChange: h, onClickRoot: m } = Ot(e, {
    model: a,
    isLimitExceeded: l,
    hasOwnLabel: i,
    isDisabled: c,
    isLabeledByFormItem: d
  });
  return (() => {
    function y() {
      ne(a.value) && !a.value.includes(u.value) ? a.value.push(u.value) : a.value = e.trueValue || e.trueLabel || !0;
    }
    e.checked && y();
  })(), pe({
    from: "label act as value",
    replacement: "value",
    version: "3.0.0",
    scope: "el-checkbox",
    ref: "https://element-plus.org/en-US/component/checkbox.html"
  }, w(() => n.value && ke(e.value))), pe({
    from: "true-label",
    replacement: "true-value",
    version: "3.0.0",
    scope: "el-checkbox",
    ref: "https://element-plus.org/en-US/component/checkbox.html"
  }, w(() => !!e.trueLabel)), pe({
    from: "false-label",
    replacement: "false-value",
    version: "3.0.0",
    scope: "el-checkbox",
    ref: "https://element-plus.org/en-US/component/checkbox.html"
  }, w(() => !!e.falseLabel)), {
    inputId: f,
    isLabeledByFormItem: d,
    isChecked: s,
    isDisabled: c,
    isFocused: r,
    checkboxButtonSize: p,
    checkboxSize: v,
    hasOwnLabel: i,
    model: a,
    actualValue: u,
    handleChange: h,
    onClickRoot: m
  };
}, Ft = ["id", "indeterminate", "name", "tabindex", "disabled", "true-value", "false-value"], zt = ["id", "indeterminate", "disabled", "value", "name", "tabindex"], Rt = z({
  name: "ElCheckbox"
}), jt = /* @__PURE__ */ z({
  ...Rt,
  props: qe,
  emits: Ge,
  setup(e) {
    const t = e, o = Re(), {
      inputId: a,
      isLabeledByFormItem: n,
      isChecked: l,
      isDisabled: r,
      isFocused: s,
      checkboxSize: p,
      hasOwnLabel: v,
      model: i,
      actualValue: u,
      handleChange: c,
      onClickRoot: f
    } = He(t, o), d = q("checkbox"), h = w(() => [
      d.b(),
      d.m(p.value),
      d.is("disabled", r.value),
      d.is("bordered", t.border),
      d.is("checked", l.value)
    ]), m = w(() => [
      d.e("input"),
      d.is("disabled", r.value),
      d.is("checked", l.value),
      d.is("indeterminate", t.indeterminate),
      d.is("focus", s.value)
    ]);
    return (k, y) => (D(), P(xe(!g(v) && g(n) ? "span" : "label"), {
      class: S(g(h)),
      "aria-controls": k.indeterminate ? k.controls : null,
      onClick: g(f)
    }, {
      default: O(() => [
        Z("span", {
          class: S(g(m))
        }, [
          k.trueValue || k.falseValue || k.trueLabel || k.falseLabel ? W((D(), L("input", {
            key: 0,
            id: g(a),
            "onUpdate:modelValue": y[0] || (y[0] = (C) => re(i) ? i.value = C : null),
            class: S(g(d).e("original")),
            type: "checkbox",
            indeterminate: k.indeterminate,
            name: k.name,
            tabindex: k.tabindex,
            disabled: g(r),
            "true-value": k.trueValue || k.trueLabel,
            "false-value": k.falseValue || k.falseLabel,
            onChange: y[1] || (y[1] = (...C) => g(c) && g(c)(...C)),
            onFocus: y[2] || (y[2] = (C) => s.value = !0),
            onBlur: y[3] || (y[3] = (C) => s.value = !1),
            onClick: y[4] || (y[4] = V(() => {
            }, ["stop"]))
          }, null, 42, Ft)), [
            [ie, g(i)]
          ]) : W((D(), L("input", {
            key: 1,
            id: g(a),
            "onUpdate:modelValue": y[5] || (y[5] = (C) => re(i) ? i.value = C : null),
            class: S(g(d).e("original")),
            type: "checkbox",
            indeterminate: k.indeterminate,
            disabled: g(r),
            value: g(u),
            name: k.name,
            tabindex: k.tabindex,
            onChange: y[6] || (y[6] = (...C) => g(c) && g(c)(...C)),
            onFocus: y[7] || (y[7] = (C) => s.value = !0),
            onBlur: y[8] || (y[8] = (C) => s.value = !1),
            onClick: y[9] || (y[9] = V(() => {
            }, ["stop"]))
          }, null, 42, zt)), [
            [ie, g(i)]
          ]),
          Z("span", {
            class: S(g(d).e("inner"))
          }, null, 2)
        ], 2),
        g(v) ? (D(), L("span", {
          key: 0,
          class: S(g(d).e("label"))
        }, [
          oe(k.$slots, "default"),
          k.$slots.default ? M("v-if", !0) : (D(), L(he, { key: 0 }, [
            je(we(k.label), 1)
          ], 64))
        ], 2)) : M("v-if", !0)
      ]),
      _: 3
    }, 8, ["class", "aria-controls", "onClick"]));
  }
});
var Ut = /* @__PURE__ */ _(jt, [["__file", "checkbox.vue"]]);
const qt = ["name", "tabindex", "disabled", "true-value", "false-value"], Gt = ["name", "tabindex", "disabled", "value"], Ht = z({
  name: "ElCheckboxButton"
}), Wt = /* @__PURE__ */ z({
  ...Ht,
  props: qe,
  emits: Ge,
  setup(e) {
    const t = e, o = Re(), {
      isFocused: a,
      isChecked: n,
      isDisabled: l,
      checkboxButtonSize: r,
      model: s,
      actualValue: p,
      handleChange: v
    } = He(t, o), i = F(ee, void 0), u = q("checkbox"), c = w(() => {
      var d, h, m, k;
      const y = (h = (d = i == null ? void 0 : i.fill) == null ? void 0 : d.value) != null ? h : "";
      return {
        backgroundColor: y,
        borderColor: y,
        color: (k = (m = i == null ? void 0 : i.textColor) == null ? void 0 : m.value) != null ? k : "",
        boxShadow: y ? `-1px 0 0 0 ${y}` : void 0
      };
    }), f = w(() => [
      u.b("button"),
      u.bm("button", r.value),
      u.is("disabled", l.value),
      u.is("checked", n.value),
      u.is("focus", a.value)
    ]);
    return (d, h) => (D(), L("label", {
      class: S(g(f))
    }, [
      d.trueValue || d.falseValue || d.trueLabel || d.falseLabel ? W((D(), L("input", {
        key: 0,
        "onUpdate:modelValue": h[0] || (h[0] = (m) => re(s) ? s.value = m : null),
        class: S(g(u).be("button", "original")),
        type: "checkbox",
        name: d.name,
        tabindex: d.tabindex,
        disabled: g(l),
        "true-value": d.trueValue || d.trueLabel,
        "false-value": d.falseValue || d.falseLabel,
        onChange: h[1] || (h[1] = (...m) => g(v) && g(v)(...m)),
        onFocus: h[2] || (h[2] = (m) => a.value = !0),
        onBlur: h[3] || (h[3] = (m) => a.value = !1),
        onClick: h[4] || (h[4] = V(() => {
        }, ["stop"]))
      }, null, 42, qt)), [
        [ie, g(s)]
      ]) : W((D(), L("input", {
        key: 1,
        "onUpdate:modelValue": h[5] || (h[5] = (m) => re(s) ? s.value = m : null),
        class: S(g(u).be("button", "original")),
        type: "checkbox",
        name: d.name,
        tabindex: d.tabindex,
        disabled: g(l),
        value: g(p),
        onChange: h[6] || (h[6] = (...m) => g(v) && g(v)(...m)),
        onFocus: h[7] || (h[7] = (m) => a.value = !0),
        onBlur: h[8] || (h[8] = (m) => a.value = !1),
        onClick: h[9] || (h[9] = V(() => {
        }, ["stop"]))
      }, null, 42, Gt)), [
        [ie, g(s)]
      ]),
      d.$slots.default || d.label ? (D(), L("span", {
        key: 2,
        class: S(g(u).be("button", "inner")),
        style: Ue(g(n) ? g(c) : void 0)
      }, [
        oe(d.$slots, "default", {}, () => [
          je(we(d.label), 1)
        ])
      ], 6)) : M("v-if", !0)
    ], 2));
  }
});
var We = /* @__PURE__ */ _(Wt, [["__file", "checkbox-button.vue"]]);
const Yt = nt({
  modelValue: {
    type: ot(Array),
    default: () => []
  },
  disabled: Boolean,
  min: Number,
  max: Number,
  size: Pe,
  label: String,
  fill: String,
  textColor: String,
  tag: {
    type: String,
    default: "div"
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), Qt = {
  [ue]: (e) => ne(e),
  change: (e) => ne(e)
}, Xt = z({
  name: "ElCheckboxGroup"
}), Zt = /* @__PURE__ */ z({
  ...Xt,
  props: Yt,
  emits: Qt,
  setup(e, { emit: t }) {
    const o = e, a = q("checkbox"), { formItem: n } = Ke(), { inputId: l, isLabeledByFormItem: r } = Fe(o, {
      formItemContext: n
    }), s = async (v) => {
      t(ue, v), await de(), t("change", v);
    }, p = w({
      get() {
        return o.modelValue;
      },
      set(v) {
        s(v);
      }
    });
    return J(ee, {
      ...wt(yt(o), [
        "size",
        "min",
        "max",
        "disabled",
        "validateEvent",
        "fill",
        "textColor"
      ]),
      modelValue: p,
      changeEvent: s
    }), T(() => o.modelValue, () => {
      o.validateEvent && (n == null || n.validate("change").catch((v) => Se(v)));
    }), (v, i) => {
      var u;
      return D(), P(xe(v.tag), {
        id: g(l),
        class: S(g(a).b("group")),
        role: "group",
        "aria-label": g(r) ? void 0 : v.label || "checkbox-group",
        "aria-labelledby": g(r) ? (u = g(n)) == null ? void 0 : u.labelId : void 0
      }, {
        default: O(() => [
          oe(v.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
    };
  }
});
var Ye = /* @__PURE__ */ _(Zt, [["__file", "checkbox-group.vue"]]);
const Jt = at(Ut, {
  CheckboxButton: We,
  CheckboxGroup: Ye
});
ze(We);
ze(Ye);
const X = "$treeNodeId", Oe = function(e, t) {
  !t || t[X] || Object.defineProperty(t, X, {
    value: e.id,
    enumerable: !1,
    configurable: !1,
    writable: !1
  });
}, Le = function(e, t) {
  return e ? t[e] : t[X];
}, Ee = (e, t, o) => {
  const a = e.value.currentNode;
  o();
  const n = e.value.currentNode;
  a !== n && t("current-change", n ? n.data : null, n);
}, De = (e) => {
  let t = !0, o = !0, a = !0;
  for (let n = 0, l = e.length; n < l; n++) {
    const r = e[n];
    (r.checked !== !0 || r.indeterminate) && (t = !1, r.disabled || (a = !1)), (r.checked !== !1 || r.indeterminate) && (o = !1);
  }
  return { all: t, none: o, allWithoutDisable: a, half: !t && !o };
}, le = function(e) {
  if (e.childNodes.length === 0 || e.loading)
    return;
  const { all: t, none: o, half: a } = De(e.childNodes);
  t ? (e.checked = !0, e.indeterminate = !1) : a ? (e.checked = !1, e.indeterminate = !0) : o && (e.checked = !1, e.indeterminate = !1);
  const n = e.parent;
  !n || n.level === 0 || e.store.checkStrictly || le(n);
}, ae = function(e, t) {
  const o = e.store.props, a = e.data || {}, n = o[t];
  if (typeof n == "function")
    return n(a, e);
  if (typeof n == "string")
    return a[n];
  if (typeof n > "u") {
    const l = a[t];
    return l === void 0 ? "" : l;
  }
};
let _t = 0;
class H {
  constructor(t) {
    this.id = _t++, this.text = null, this.checked = !1, this.indeterminate = !1, this.data = null, this.expanded = !1, this.parent = null, this.visible = !0, this.isCurrent = !1, this.canFocus = !1;
    for (const o in t)
      Ne(t, o) && (this[o] = t[o]);
    this.level = 0, this.loaded = !1, this.childNodes = [], this.loading = !1, this.parent && (this.level = this.parent.level + 1);
  }
  initialize() {
    const t = this.store;
    if (!t)
      throw new Error("[Node]store is required!");
    t.registerNode(this);
    const o = t.props;
    if (o && typeof o.isLeaf < "u") {
      const l = ae(this, "isLeaf");
      typeof l == "boolean" && (this.isLeafByUser = l);
    }
    if (t.lazy !== !0 && this.data ? (this.setData(this.data), t.defaultExpandAll && (this.expanded = !0, this.canFocus = !0)) : this.level > 0 && t.lazy && t.defaultExpandAll && this.expand(), Array.isArray(this.data) || Oe(this, this.data), !this.data)
      return;
    const a = t.defaultExpandedKeys, n = t.key;
    n && a && a.includes(this.key) && this.expand(null, t.autoExpandParent), n && t.currentNodeKey !== void 0 && this.key === t.currentNodeKey && (t.currentNode = this, t.currentNode.isCurrent = !0), t.lazy && t._initDefaultCheckedNode(this), this.updateLeafState(), this.parent && (this.level === 1 || this.parent.expanded === !0) && (this.canFocus = !0);
  }
  setData(t) {
    Array.isArray(t) || Oe(this, t), this.data = t, this.childNodes = [];
    let o;
    this.level === 0 && Array.isArray(this.data) ? o = this.data : o = ae(this, "children") || [];
    for (let a = 0, n = o.length; a < n; a++)
      this.insertChild({ data: o[a] });
  }
  get label() {
    return ae(this, "label");
  }
  get key() {
    const t = this.store.key;
    return this.data ? this.data[t] : null;
  }
  get disabled() {
    return ae(this, "disabled");
  }
  get nextSibling() {
    const t = this.parent;
    if (t) {
      const o = t.childNodes.indexOf(this);
      if (o > -1)
        return t.childNodes[o + 1];
    }
    return null;
  }
  get previousSibling() {
    const t = this.parent;
    if (t) {
      const o = t.childNodes.indexOf(this);
      if (o > -1)
        return o > 0 ? t.childNodes[o - 1] : null;
    }
    return null;
  }
  contains(t, o = !0) {
    return (this.childNodes || []).some((a) => a === t || o && a.contains(t));
  }
  remove() {
    const t = this.parent;
    t && t.removeChild(this);
  }
  insertChild(t, o, a) {
    if (!t)
      throw new Error("InsertChild error: child is required.");
    if (!(t instanceof H)) {
      if (!a) {
        const n = this.getChildren(!0);
        n.includes(t.data) || (typeof o > "u" || o < 0 ? n.push(t.data) : n.splice(o, 0, t.data));
      }
      Object.assign(t, {
        parent: this,
        store: this.store
      }), t = bt(new H(t)), t instanceof H && t.initialize();
    }
    t.level = this.level + 1, typeof o > "u" || o < 0 ? this.childNodes.push(t) : this.childNodes.splice(o, 0, t), this.updateLeafState();
  }
  insertBefore(t, o) {
    let a;
    o && (a = this.childNodes.indexOf(o)), this.insertChild(t, a);
  }
  insertAfter(t, o) {
    let a;
    o && (a = this.childNodes.indexOf(o), a !== -1 && (a += 1)), this.insertChild(t, a);
  }
  removeChild(t) {
    const o = this.getChildren() || [], a = o.indexOf(t.data);
    a > -1 && o.splice(a, 1);
    const n = this.childNodes.indexOf(t);
    n > -1 && (this.store && this.store.deregisterNode(t), t.parent = null, this.childNodes.splice(n, 1)), this.updateLeafState();
  }
  removeChildByData(t) {
    let o = null;
    for (let a = 0; a < this.childNodes.length; a++)
      if (this.childNodes[a].data === t) {
        o = this.childNodes[a];
        break;
      }
    o && this.removeChild(o);
  }
  expand(t, o) {
    const a = () => {
      if (o) {
        let n = this.parent;
        for (; n.level > 0; )
          n.expanded = !0, n = n.parent;
      }
      this.expanded = !0, t && t(), this.childNodes.forEach((n) => {
        n.canFocus = !0;
      });
    };
    this.shouldLoadData() ? this.loadData((n) => {
      Array.isArray(n) && (this.checked ? this.setChecked(!0, !0) : this.store.checkStrictly || le(this), a());
    }) : a();
  }
  doCreateChildren(t, o = {}) {
    t.forEach((a) => {
      this.insertChild(Object.assign({ data: a }, o), void 0, !0);
    });
  }
  collapse() {
    this.expanded = !1, this.childNodes.forEach((t) => {
      t.canFocus = !1;
    });
  }
  shouldLoadData() {
    return this.store.lazy === !0 && this.store.load && !this.loaded;
  }
  updateLeafState() {
    if (this.store.lazy === !0 && this.loaded !== !0 && typeof this.isLeafByUser < "u") {
      this.isLeaf = this.isLeafByUser;
      return;
    }
    const t = this.childNodes;
    if (!this.store.lazy || this.store.lazy === !0 && this.loaded === !0) {
      this.isLeaf = !t || t.length === 0;
      return;
    }
    this.isLeaf = !1;
  }
  setChecked(t, o, a, n) {
    if (this.indeterminate = t === "half", this.checked = t === !0, this.store.checkStrictly)
      return;
    if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
      const { all: r, allWithoutDisable: s } = De(this.childNodes);
      !this.isLeaf && !r && s && (this.checked = !1, t = !1);
      const p = () => {
        if (o) {
          const v = this.childNodes;
          for (let c = 0, f = v.length; c < f; c++) {
            const d = v[c];
            n = n || t !== !1;
            const h = d.disabled ? d.checked : n;
            d.setChecked(h, o, !0, n);
          }
          const { half: i, all: u } = De(v);
          u || (this.checked = u, this.indeterminate = i);
        }
      };
      if (this.shouldLoadData()) {
        this.loadData(() => {
          p(), le(this);
        }, {
          checked: t !== !1
        });
        return;
      } else
        p();
    }
    const l = this.parent;
    !l || l.level === 0 || a || le(l);
  }
  getChildren(t = !1) {
    if (this.level === 0)
      return this.data;
    const o = this.data;
    if (!o)
      return null;
    const a = this.store.props;
    let n = "children";
    return a && (n = a.children || "children"), o[n] === void 0 && (o[n] = null), t && !o[n] && (o[n] = []), o[n];
  }
  updateChildren() {
    const t = this.getChildren() || [], o = this.childNodes.map((l) => l.data), a = {}, n = [];
    t.forEach((l, r) => {
      const s = l[X];
      !!s && o.findIndex((v) => v[X] === s) >= 0 ? a[s] = { index: r, data: l } : n.push({ index: r, data: l });
    }), this.store.lazy || o.forEach((l) => {
      a[l[X]] || this.removeChildByData(l);
    }), n.forEach(({ index: l, data: r }) => {
      this.insertChild({ data: r }, l);
    }), this.updateLeafState();
  }
  loadData(t, o = {}) {
    if (this.store.lazy === !0 && this.store.load && !this.loaded && (!this.loading || Object.keys(o).length)) {
      this.loading = !0;
      const a = (n) => {
        this.childNodes = [], this.doCreateChildren(n, o), this.loaded = !0, this.loading = !1, this.updateLeafState(), t && t.call(this, n);
      };
      this.store.load(this, a);
    } else
      t && t.call(this);
  }
}
class en {
  constructor(t) {
    this.currentNode = null, this.currentNodeKey = null;
    for (const o in t)
      Ne(t, o) && (this[o] = t[o]);
    this.nodesMap = {};
  }
  initialize() {
    if (this.root = new H({
      data: this.data,
      store: this
    }), this.root.initialize(), this.lazy && this.load) {
      const t = this.load;
      t(this.root, (o) => {
        this.root.doCreateChildren(o), this._initDefaultCheckedNodes();
      });
    } else
      this._initDefaultCheckedNodes();
  }
  filter(t) {
    const o = this.filterNodeMethod, a = this.lazy, n = function(l) {
      const r = l.root ? l.root.childNodes : l.childNodes;
      if (r.forEach((s) => {
        s.visible = o.call(s, t, s.data, s), n(s);
      }), !l.visible && r.length) {
        let s = !0;
        s = !r.some((p) => p.visible), l.root ? l.root.visible = s === !1 : l.visible = s === !1;
      }
      t && l.visible && !l.isLeaf && (!a || l.loaded) && l.expand();
    };
    n(this);
  }
  setData(t) {
    t !== this.root.data ? (this.root.setData(t), this._initDefaultCheckedNodes()) : this.root.updateChildren();
  }
  getNode(t) {
    if (t instanceof H)
      return t;
    const o = Me(t) ? Le(this.key, t) : t;
    return this.nodesMap[o] || null;
  }
  insertBefore(t, o) {
    const a = this.getNode(o);
    a.parent.insertBefore({ data: t }, a);
  }
  insertAfter(t, o) {
    const a = this.getNode(o);
    a.parent.insertAfter({ data: t }, a);
  }
  remove(t) {
    const o = this.getNode(t);
    o && o.parent && (o === this.currentNode && (this.currentNode = null), o.parent.removeChild(o));
  }
  append(t, o) {
    const a = o ? this.getNode(o) : this.root;
    a && a.insertChild({ data: t });
  }
  _initDefaultCheckedNodes() {
    const t = this.defaultCheckedKeys || [], o = this.nodesMap;
    t.forEach((a) => {
      const n = o[a];
      n && n.setChecked(!0, !this.checkStrictly);
    });
  }
  _initDefaultCheckedNode(t) {
    (this.defaultCheckedKeys || []).includes(t.key) && t.setChecked(!0, !this.checkStrictly);
  }
  setDefaultCheckedKey(t) {
    t !== this.defaultCheckedKeys && (this.defaultCheckedKeys = t, this._initDefaultCheckedNodes());
  }
  registerNode(t) {
    const o = this.key;
    !t || !t.data || (o ? t.key !== void 0 && (this.nodesMap[t.key] = t) : this.nodesMap[t.id] = t);
  }
  deregisterNode(t) {
    !this.key || !t || !t.data || (t.childNodes.forEach((a) => {
      this.deregisterNode(a);
    }), delete this.nodesMap[t.key]);
  }
  getCheckedNodes(t = !1, o = !1) {
    const a = [], n = function(l) {
      (l.root ? l.root.childNodes : l.childNodes).forEach((s) => {
        (s.checked || o && s.indeterminate) && (!t || t && s.isLeaf) && a.push(s.data), n(s);
      });
    };
    return n(this), a;
  }
  getCheckedKeys(t = !1) {
    return this.getCheckedNodes(t).map((o) => (o || {})[this.key]);
  }
  getHalfCheckedNodes() {
    const t = [], o = function(a) {
      (a.root ? a.root.childNodes : a.childNodes).forEach((l) => {
        l.indeterminate && t.push(l.data), o(l);
      });
    };
    return o(this), t;
  }
  getHalfCheckedKeys() {
    return this.getHalfCheckedNodes().map((t) => (t || {})[this.key]);
  }
  _getAllNodes() {
    const t = [], o = this.nodesMap;
    for (const a in o)
      Ne(o, a) && t.push(o[a]);
    return t;
  }
  updateChildren(t, o) {
    const a = this.nodesMap[t];
    if (!a)
      return;
    const n = a.childNodes;
    for (let l = n.length - 1; l >= 0; l--) {
      const r = n[l];
      this.remove(r.data);
    }
    for (let l = 0, r = o.length; l < r; l++) {
      const s = o[l];
      this.append(s, a.data);
    }
  }
  _setCheckedKeys(t, o = !1, a) {
    const n = this._getAllNodes().sort((p, v) => p.level - v.level), l = /* @__PURE__ */ Object.create(null), r = Object.keys(a);
    n.forEach((p) => p.setChecked(!1, !1));
    const s = (p) => {
      p.childNodes.forEach((v) => {
        var i;
        l[v.data[t]] = !0, (i = v.childNodes) != null && i.length && s(v);
      });
    };
    for (let p = 0, v = n.length; p < v; p++) {
      const i = n[p], u = i.data[t].toString();
      if (!r.includes(u)) {
        i.checked && !l[u] && i.setChecked(!1, !1);
        continue;
      }
      if (i.childNodes.length && s(i), i.isLeaf || this.checkStrictly) {
        i.setChecked(!0, !1);
        continue;
      }
      if (i.setChecked(!0, !0), o) {
        i.setChecked(!1, !1);
        const f = function(d) {
          d.childNodes.forEach((m) => {
            m.isLeaf || m.setChecked(!1, !1), f(m);
          });
        };
        f(i);
      }
    }
  }
  setCheckedNodes(t, o = !1) {
    const a = this.key, n = {};
    t.forEach((l) => {
      n[(l || {})[a]] = !0;
    }), this._setCheckedKeys(a, o, n);
  }
  setCheckedKeys(t, o = !1) {
    this.defaultCheckedKeys = t;
    const a = this.key, n = {};
    t.forEach((l) => {
      n[l] = !0;
    }), this._setCheckedKeys(a, o, n);
  }
  setDefaultExpandedKeys(t) {
    t = t || [], this.defaultExpandedKeys = t, t.forEach((o) => {
      const a = this.getNode(o);
      a && a.expand(null, this.autoExpandParent);
    });
  }
  setChecked(t, o, a) {
    const n = this.getNode(t);
    n && n.setChecked(!!o, a);
  }
  getCurrentNode() {
    return this.currentNode;
  }
  setCurrentNode(t) {
    const o = this.currentNode;
    o && (o.isCurrent = !1), this.currentNode = t, this.currentNode.isCurrent = !0;
  }
  setUserCurrentNode(t, o = !0) {
    const a = t[this.key], n = this.nodesMap[a];
    this.setCurrentNode(n), o && this.currentNode.level > 1 && this.currentNode.parent.expand(null, !0);
  }
  setCurrentNodeKey(t, o = !0) {
    if (t == null) {
      this.currentNode && (this.currentNode.isCurrent = !1), this.currentNode = null;
      return;
    }
    const a = this.getNode(t);
    a && (this.setCurrentNode(a), o && this.currentNode.level > 1 && this.currentNode.parent.expand(null, !0));
  }
}
const tn = z({
  name: "ElTreeNodeContent",
  props: {
    node: {
      type: Object,
      required: !0
    },
    renderContent: Function
  },
  setup(e) {
    const t = q("tree"), o = F("NodeInstance"), a = F("RootTree");
    return () => {
      const n = e.node, { data: l, store: r } = n;
      return e.renderContent ? e.renderContent(Ae, { _self: o, node: n, data: l, store: r }) : oe(a.ctx.slots, "default", { node: n, data: l }, () => [
        Ae("span", { class: t.be("node", "label") }, [n.label])
      ]);
    };
  }
});
var nn = /* @__PURE__ */ _(tn, [["__file", "tree-node-content.vue"]]);
function Qe(e) {
  const t = F("TreeNodeMap", null), o = {
    treeNodeExpand: (a) => {
      e.node !== a && e.node.collapse();
    },
    children: []
  };
  return t && t.children.push(o), J("TreeNodeMap", o), {
    broadcastExpanded: (a) => {
      if (e.accordion)
        for (const n of o.children)
          n.treeNodeExpand(a);
    }
  };
}
const Xe = Symbol("dragEvents");
function on({ props: e, ctx: t, el$: o, dropIndicator$: a, store: n }) {
  const l = q("tree"), r = B({
    showDropIndicator: !1,
    draggingNode: null,
    dropNode: null,
    allowDrop: !0,
    dropType: null
  });
  return J(Xe, {
    treeNodeDragStart: ({ event: i, treeNode: u }) => {
      if (typeof e.allowDrag == "function" && !e.allowDrag(u.node))
        return i.preventDefault(), !1;
      i.dataTransfer.effectAllowed = "move";
      try {
        i.dataTransfer.setData("text/plain", "");
      } catch {
      }
      r.value.draggingNode = u, t.emit("node-drag-start", u.node, i);
    },
    treeNodeDragOver: ({ event: i, treeNode: u }) => {
      const c = u, f = r.value.dropNode;
      f && f.node.id !== c.node.id && ve(f.$el, l.is("drop-inner"));
      const d = r.value.draggingNode;
      if (!d || !c)
        return;
      let h = !0, m = !0, k = !0, y = !0;
      typeof e.allowDrop == "function" && (h = e.allowDrop(d.node, c.node, "prev"), y = m = e.allowDrop(d.node, c.node, "inner"), k = e.allowDrop(d.node, c.node, "next")), i.dataTransfer.dropEffect = m || h || k ? "move" : "none", (h || m || k) && (f == null ? void 0 : f.node.id) !== c.node.id && (f && t.emit("node-drag-leave", d.node, f.node, i), t.emit("node-drag-enter", d.node, c.node, i)), h || m || k ? r.value.dropNode = c : r.value.dropNode = null, c.node.nextSibling === d.node && (k = !1), c.node.previousSibling === d.node && (h = !1), c.node.contains(d.node, !1) && (m = !1), (d.node === c.node || d.node.contains(c.node)) && (h = !1, m = !1, k = !1);
      const C = c.$el.querySelector(`.${l.be("node", "content")}`).getBoundingClientRect(), U = o.value.getBoundingClientRect();
      let $;
      const Y = h ? m ? 0.25 : k ? 0.45 : 1 : -1, K = k ? m ? 0.75 : h ? 0.55 : 0 : 1;
      let R = -9999;
      const N = i.clientY - C.top;
      N < C.height * Y ? $ = "before" : N > C.height * K ? $ = "after" : m ? $ = "inner" : $ = "none";
      const x = c.$el.querySelector(`.${l.be("node", "expand-icon")}`).getBoundingClientRect(), I = a.value;
      $ === "before" ? R = x.top - U.top : $ === "after" && (R = x.bottom - U.top), I.style.top = `${R}px`, I.style.left = `${x.right - U.left}px`, $ === "inner" ? lt(c.$el, l.is("drop-inner")) : ve(c.$el, l.is("drop-inner")), r.value.showDropIndicator = $ === "before" || $ === "after", r.value.allowDrop = r.value.showDropIndicator || y, r.value.dropType = $, t.emit("node-drag-over", d.node, c.node, i);
    },
    treeNodeDragEnd: (i) => {
      const { draggingNode: u, dropType: c, dropNode: f } = r.value;
      if (i.preventDefault(), i.dataTransfer.dropEffect = "move", u && f) {
        const d = { data: u.node.data };
        c !== "none" && u.node.remove(), c === "before" ? f.node.parent.insertBefore(d, f.node) : c === "after" ? f.node.parent.insertAfter(d, f.node) : c === "inner" && f.node.insertChild(d), c !== "none" && n.value.registerNode(d), ve(f.$el, l.is("drop-inner")), t.emit("node-drag-end", u.node, f.node, c, i), c !== "none" && t.emit("node-drop", u.node, f.node, c, i);
      }
      u && !f && t.emit("node-drag-end", u.node, null, c, i), r.value.showDropIndicator = !1, r.value.draggingNode = null, r.value.dropNode = null, r.value.allowDrop = !0;
    }
  }), {
    dragState: r
  };
}
const an = z({
  name: "ElTreeNode",
  components: {
    ElCollapseTransition: At,
    ElCheckbox: Jt,
    NodeContent: nn,
    ElIcon: st,
    Loading: Et
  },
  props: {
    node: {
      type: H,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    },
    accordion: Boolean,
    renderContent: Function,
    renderAfterExpand: Boolean,
    showCheckbox: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["node-expand"],
  setup(e, t) {
    const o = q("tree"), { broadcastExpanded: a } = Qe(e), n = F("RootTree"), l = B(!1), r = B(!1), s = B(null), p = B(null), v = B(null), i = F(Xe), u = ce();
    J("NodeInstance", u), n || Se("Tree", "Can not find node's tree."), e.node.expanded && (l.value = !0, r.value = !0);
    const c = n.props.props.children || "children";
    T(() => {
      const N = e.node.data[c];
      return N && [...N];
    }, () => {
      e.node.updateChildren();
    }), T(() => e.node.indeterminate, (N) => {
      h(e.node.checked, N);
    }), T(() => e.node.checked, (N) => {
      h(N, e.node.indeterminate);
    }), T(() => e.node.expanded, (N) => {
      de(() => l.value = N), N && (r.value = !0);
    });
    const f = (N) => Le(n.props.nodeKey, N.data), d = (N) => {
      const x = e.props.class;
      if (!x)
        return {};
      let I;
      if (dt(x)) {
        const { data: fe } = N;
        I = x(fe, N);
      } else
        I = x;
      return me(I) ? { [I]: !0 } : I;
    }, h = (N, x) => {
      (s.value !== N || p.value !== x) && n.ctx.emit("check-change", e.node.data, N, x), s.value = N, p.value = x;
    }, m = (N) => {
      Ee(n.store, n.ctx.emit, () => n.store.value.setCurrentNode(e.node)), n.currentNode.value = e.node, n.props.expandOnClickNode && y(), n.props.checkOnClickNode && !e.node.disabled && C(null, {
        target: { checked: !e.node.checked }
      }), n.ctx.emit("node-click", e.node.data, e.node, u, N);
    }, k = (N) => {
      n.instance.vnode.props.onNodeContextmenu && (N.stopPropagation(), N.preventDefault()), n.ctx.emit("node-contextmenu", N, e.node.data, e.node, u);
    }, y = () => {
      e.node.isLeaf || (l.value ? (n.ctx.emit("node-collapse", e.node.data, e.node, u), e.node.collapse()) : (e.node.expand(), t.emit("node-expand", e.node.data, e.node, u)));
    }, C = (N, x) => {
      e.node.setChecked(x.target.checked, !n.props.checkStrictly), de(() => {
        const I = n.store.value;
        n.ctx.emit("check", e.node.data, {
          checkedNodes: I.getCheckedNodes(),
          checkedKeys: I.getCheckedKeys(),
          halfCheckedNodes: I.getHalfCheckedNodes(),
          halfCheckedKeys: I.getHalfCheckedKeys()
        });
      });
    };
    return {
      ns: o,
      node$: v,
      tree: n,
      expanded: l,
      childNodeRendered: r,
      oldChecked: s,
      oldIndeterminate: p,
      getNodeKey: f,
      getNodeClass: d,
      handleSelectChange: h,
      handleClick: m,
      handleContextMenu: k,
      handleExpandIconClick: y,
      handleCheckChange: C,
      handleChildNodeExpand: (N, x, I) => {
        a(x), n.ctx.emit("node-expand", N, x, I);
      },
      handleDragStart: (N) => {
        n.props.draggable && i.treeNodeDragStart({ event: N, treeNode: e });
      },
      handleDragOver: (N) => {
        N.preventDefault(), n.props.draggable && i.treeNodeDragOver({
          event: N,
          treeNode: { $el: v.value, node: e.node }
        });
      },
      handleDrop: (N) => {
        N.preventDefault();
      },
      handleDragEnd: (N) => {
        n.props.draggable && i.treeNodeDragEnd(N);
      },
      CaretRight: Dt
    };
  }
}), ln = ["aria-expanded", "aria-disabled", "aria-checked", "draggable", "data-key"], sn = ["aria-expanded"];
function dn(e, t, o, a, n, l) {
  const r = j("el-icon"), s = j("el-checkbox"), p = j("loading"), v = j("node-content"), i = j("el-tree-node"), u = j("el-collapse-transition");
  return W((D(), L("div", {
    ref: "node$",
    class: S([
      e.ns.b("node"),
      e.ns.is("expanded", e.expanded),
      e.ns.is("current", e.node.isCurrent),
      e.ns.is("hidden", !e.node.visible),
      e.ns.is("focusable", !e.node.disabled),
      e.ns.is("checked", !e.node.disabled && e.node.checked),
      e.getNodeClass(e.node)
    ]),
    role: "treeitem",
    tabindex: "-1",
    "aria-expanded": e.expanded,
    "aria-disabled": e.node.disabled,
    "aria-checked": e.node.checked,
    draggable: e.tree.props.draggable,
    "data-key": e.getNodeKey(e.node),
    onClick: t[1] || (t[1] = V((...c) => e.handleClick && e.handleClick(...c), ["stop"])),
    onContextmenu: t[2] || (t[2] = (...c) => e.handleContextMenu && e.handleContextMenu(...c)),
    onDragstart: t[3] || (t[3] = V((...c) => e.handleDragStart && e.handleDragStart(...c), ["stop"])),
    onDragover: t[4] || (t[4] = V((...c) => e.handleDragOver && e.handleDragOver(...c), ["stop"])),
    onDragend: t[5] || (t[5] = V((...c) => e.handleDragEnd && e.handleDragEnd(...c), ["stop"])),
    onDrop: t[6] || (t[6] = V((...c) => e.handleDrop && e.handleDrop(...c), ["stop"]))
  }, [
    Z("div", {
      class: S(e.ns.be("node", "content")),
      style: Ue({ paddingLeft: (e.node.level - 1) * e.tree.props.indent + "px" })
    }, [
      e.tree.props.icon || e.CaretRight ? (D(), P(r, {
        key: 0,
        class: S([
          e.ns.be("node", "expand-icon"),
          e.ns.is("leaf", e.node.isLeaf),
          {
            expanded: !e.node.isLeaf && e.expanded
          }
        ]),
        onClick: V(e.handleExpandIconClick, ["stop"])
      }, {
        default: O(() => [
          (D(), P(xe(e.tree.props.icon || e.CaretRight)))
        ]),
        _: 1
      }, 8, ["class", "onClick"])) : M("v-if", !0),
      e.showCheckbox ? (D(), P(s, {
        key: 1,
        "model-value": e.node.checked,
        indeterminate: e.node.indeterminate,
        disabled: !!e.node.disabled,
        onClick: t[0] || (t[0] = V(() => {
        }, ["stop"])),
        onChange: e.handleCheckChange
      }, null, 8, ["model-value", "indeterminate", "disabled", "onChange"])) : M("v-if", !0),
      e.node.loading ? (D(), P(r, {
        key: 2,
        class: S([e.ns.be("node", "loading-icon"), e.ns.is("loading")])
      }, {
        default: O(() => [
          A(p)
        ]),
        _: 1
      }, 8, ["class"])) : M("v-if", !0),
      A(v, {
        node: e.node,
        "render-content": e.renderContent
      }, null, 8, ["node", "render-content"])
    ], 6),
    A(u, null, {
      default: O(() => [
        !e.renderAfterExpand || e.childNodeRendered ? W((D(), L("div", {
          key: 0,
          class: S(e.ns.be("node", "children")),
          role: "group",
          "aria-expanded": e.expanded
        }, [
          (D(!0), L(he, null, Ie(e.node.childNodes, (c) => (D(), P(i, {
            key: e.getNodeKey(c),
            "render-content": e.renderContent,
            "render-after-expand": e.renderAfterExpand,
            "show-checkbox": e.showCheckbox,
            node: c,
            accordion: e.accordion,
            props: e.props,
            onNodeExpand: e.handleChildNodeExpand
          }, null, 8, ["render-content", "render-after-expand", "show-checkbox", "node", "accordion", "props", "onNodeExpand"]))), 128))
        ], 10, sn)), [
          [Ce, e.expanded]
        ]) : M("v-if", !0)
      ]),
      _: 1
    })
  ], 42, ln)), [
    [Ce, e.node.visible]
  ]);
}
var rn = /* @__PURE__ */ _(an, [["render", dn], ["__file", "tree-node.vue"]]);
function un({ el$: e }, t) {
  const o = q("tree"), a = Ve([]), n = Ve([]);
  kt(() => {
    r();
  }), Nt(() => {
    a.value = Array.from(e.value.querySelectorAll("[role=treeitem]")), n.value = Array.from(e.value.querySelectorAll("input[type=checkbox]"));
  }), T(n, (s) => {
    s.forEach((p) => {
      p.setAttribute("tabindex", "-1");
    });
  }), rt(e, "keydown", (s) => {
    const p = s.target;
    if (!p.className.includes(o.b("node")))
      return;
    const v = s.code;
    a.value = Array.from(e.value.querySelectorAll(`.${o.is("focusable")}[role=treeitem]`));
    const i = a.value.indexOf(p);
    let u;
    if ([G.up, G.down].includes(v)) {
      if (s.preventDefault(), v === G.up) {
        u = i === -1 ? 0 : i !== 0 ? i - 1 : a.value.length - 1;
        const f = u;
        for (; !t.value.getNode(a.value[u].dataset.key).canFocus; ) {
          if (u--, u === f) {
            u = -1;
            break;
          }
          u < 0 && (u = a.value.length - 1);
        }
      } else {
        u = i === -1 ? 0 : i < a.value.length - 1 ? i + 1 : 0;
        const f = u;
        for (; !t.value.getNode(a.value[u].dataset.key).canFocus; ) {
          if (u++, u === f) {
            u = -1;
            break;
          }
          u >= a.value.length && (u = 0);
        }
      }
      u !== -1 && a.value[u].focus();
    }
    [G.left, G.right].includes(v) && (s.preventDefault(), p.click());
    const c = p.querySelector('[type="checkbox"]');
    [G.enter, G.space].includes(v) && c && (s.preventDefault(), c.click());
  });
  const r = () => {
    var s;
    a.value = Array.from(e.value.querySelectorAll(`.${o.is("focusable")}[role=treeitem]`)), n.value = Array.from(e.value.querySelectorAll("input[type=checkbox]"));
    const p = e.value.querySelectorAll(`.${o.is("checked")}[role=treeitem]`);
    if (p.length) {
      p[0].setAttribute("tabindex", "0");
      return;
    }
    (s = a.value[0]) == null || s.setAttribute("tabindex", "0");
  };
}
const cn = z({
  name: "ElTree",
  components: { ElTreeNode: rn },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String
    },
    renderAfterExpand: {
      type: Boolean,
      default: !0
    },
    nodeKey: String,
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: !0
    },
    checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: !1
    },
    autoExpandParent: {
      type: Boolean,
      default: !0
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: !1
    },
    draggable: {
      type: Boolean,
      default: !1
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      type: Object,
      default: () => ({
        children: "children",
        label: "label",
        disabled: "disabled"
      })
    },
    lazy: {
      type: Boolean,
      default: !1
    },
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 18
    },
    icon: {
      type: it
    }
  },
  emits: [
    "check-change",
    "current-change",
    "node-click",
    "node-contextmenu",
    "node-collapse",
    "node-expand",
    "check",
    "node-drag-start",
    "node-drag-end",
    "node-drop",
    "node-drag-leave",
    "node-drag-enter",
    "node-drag-over"
  ],
  setup(e, t) {
    const { t: o } = ut(), a = q("tree"), n = B(new en({
      key: e.nodeKey,
      data: e.data,
      lazy: e.lazy,
      props: e.props,
      load: e.load,
      currentNodeKey: e.currentNodeKey,
      checkStrictly: e.checkStrictly,
      checkDescendants: e.checkDescendants,
      defaultCheckedKeys: e.defaultCheckedKeys,
      defaultExpandedKeys: e.defaultExpandedKeys,
      autoExpandParent: e.autoExpandParent,
      defaultExpandAll: e.defaultExpandAll,
      filterNodeMethod: e.filterNodeMethod
    }));
    n.value.initialize();
    const l = B(n.value.root), r = B(null), s = B(null), p = B(null), { broadcastExpanded: v } = Qe(e), { dragState: i } = on({
      props: e,
      ctx: t,
      el$: s,
      dropIndicator$: p,
      store: n
    });
    un({ el$: s }, n);
    const u = w(() => {
      const { childNodes: b } = l.value;
      return !b || b.length === 0 || b.every(({ visible: E }) => !E);
    });
    T(() => e.currentNodeKey, (b) => {
      n.value.setCurrentNodeKey(b);
    }), T(() => e.defaultCheckedKeys, (b) => {
      n.value.setDefaultCheckedKey(b);
    }), T(() => e.defaultExpandedKeys, (b) => {
      n.value.setDefaultExpandedKeys(b);
    }), T(() => e.data, (b) => {
      n.value.setData(b);
    }, { deep: !0 }), T(() => e.checkStrictly, (b) => {
      n.value.checkStrictly = b;
    });
    const c = (b) => {
      if (!e.filterNodeMethod)
        throw new Error("[Tree] filterNodeMethod is required when filter");
      n.value.filter(b);
    }, f = (b) => Le(e.nodeKey, b.data), d = (b) => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in getNodePath");
      const E = n.value.getNode(b);
      if (!E)
        return [];
      const Q = [E.data];
      let te = E.parent;
      for (; te && te !== l.value; )
        Q.push(te.data), te = te.parent;
      return Q.reverse();
    }, h = (b, E) => n.value.getCheckedNodes(b, E), m = (b) => n.value.getCheckedKeys(b), k = () => {
      const b = n.value.getCurrentNode();
      return b ? b.data : null;
    }, y = () => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in getCurrentKey");
      const b = k();
      return b ? b[e.nodeKey] : null;
    }, C = (b, E) => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCheckedNodes");
      n.value.setCheckedNodes(b, E);
    }, U = (b, E) => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCheckedKeys");
      n.value.setCheckedKeys(b, E);
    }, $ = (b, E, Q) => {
      n.value.setChecked(b, E, Q);
    }, Y = () => n.value.getHalfCheckedNodes(), K = () => n.value.getHalfCheckedKeys(), R = (b, E = !0) => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCurrentNode");
      Ee(n, t.emit, () => n.value.setUserCurrentNode(b, E));
    }, N = (b, E = !0) => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCurrentKey");
      Ee(n, t.emit, () => n.value.setCurrentNodeKey(b, E));
    }, x = (b) => n.value.getNode(b), I = (b) => {
      n.value.remove(b);
    }, fe = (b, E) => {
      n.value.append(b, E);
    }, Ze = (b, E) => {
      n.value.insertBefore(b, E);
    }, Je = (b, E) => {
      n.value.insertAfter(b, E);
    }, _e = (b, E, Q) => {
      v(E), t.emit("node-expand", b, E, Q);
    }, et = (b, E) => {
      if (!e.nodeKey)
        throw new Error("[Tree] nodeKey is required in updateKeyChild");
      n.value.updateChildren(b, E);
    };
    return J("RootTree", {
      ctx: t,
      props: e,
      store: n,
      root: l,
      currentNode: r,
      instance: ce()
    }), J(ct, void 0), {
      ns: a,
      store: n,
      root: l,
      currentNode: r,
      dragState: i,
      el$: s,
      dropIndicator$: p,
      isEmpty: u,
      filter: c,
      getNodeKey: f,
      getNodePath: d,
      getCheckedNodes: h,
      getCheckedKeys: m,
      getCurrentNode: k,
      getCurrentKey: y,
      setCheckedNodes: C,
      setCheckedKeys: U,
      setChecked: $,
      getHalfCheckedNodes: Y,
      getHalfCheckedKeys: K,
      setCurrentNode: R,
      setCurrentKey: N,
      t: o,
      getNode: x,
      remove: I,
      append: fe,
      insertBefore: Ze,
      insertAfter: Je,
      handleNodeExpand: _e,
      updateKeyChildren: et
    };
  }
});
function hn(e, t, o, a, n, l) {
  const r = j("el-tree-node");
  return D(), L("div", {
    ref: "el$",
    class: S([
      e.ns.b(),
      e.ns.is("dragging", !!e.dragState.draggingNode),
      e.ns.is("drop-not-allow", !e.dragState.allowDrop),
      e.ns.is("drop-inner", e.dragState.dropType === "inner"),
      { [e.ns.m("highlight-current")]: e.highlightCurrent }
    ]),
    role: "tree"
  }, [
    (D(!0), L(he, null, Ie(e.root.childNodes, (s) => (D(), P(r, {
      key: e.getNodeKey(s),
      node: s,
      props: e.props,
      accordion: e.accordion,
      "render-after-expand": e.renderAfterExpand,
      "show-checkbox": e.showCheckbox,
      "render-content": e.renderContent,
      onNodeExpand: e.handleNodeExpand
    }, null, 8, ["node", "props", "accordion", "render-after-expand", "show-checkbox", "render-content", "onNodeExpand"]))), 128)),
    e.isEmpty ? (D(), L("div", {
      key: 0,
      class: S(e.ns.e("empty-block"))
    }, [
      oe(e.$slots, "empty", {}, () => {
        var s;
        return [
          Z("span", {
            class: S(e.ns.e("empty-text"))
          }, we((s = e.emptyText) != null ? s : e.t("el.tree.emptyText")), 3)
        ];
      })
    ], 2)) : M("v-if", !0),
    W(Z("div", {
      ref: "dropIndicator$",
      class: S(e.ns.e("drop-indicator"))
    }, null, 2), [
      [Ce, e.dragState.showDropIndicator]
    ])
  ], 2);
}
var se = /* @__PURE__ */ _(cn, [["render", hn], ["__file", "tree.vue"]]);
se.install = (e) => {
  e.component(se.name, se);
};
const fn = se, pn = fn, vn = ["GET", "POST", "PATCH", "PUT", "DELETE"], gn = { class: "api-editor" }, mn = {
  key: 0,
  class: "params-config"
}, yn = { class: "custom-tree-node" }, bn = /* @__PURE__ */ z({
  __name: "api-config-editor",
  props: {
    options: {},
    apiLabel: { default: "接口" },
    paramsLabel: { default: "参数" },
    formItemProp: { default: () => ["options"] },
    formItemRules: {},
    showMessage: { type: Boolean },
    showParams: { type: Boolean, default: !0 },
    map: { default: () => ({}) }
  },
  setup(e, { expose: t }) {
    const o = e, { api: a = "api", apiMethod: n = "apiMethod", apiParams: l = "apiParams" } = o.map, r = Ct(o, "options"), s = B([]), p = B();
    T(
      () => r.value[l],
      (f) => {
        u(f ?? {}, s.value);
      },
      { once: !0 }
    ), T(
      s,
      It((f) => {
        c(f, r.value);
      }, 800),
      { deep: !0 }
    );
    function v(f) {
      f.push({
        id: ge(5),
        key: "id",
        value: "123"
      });
    }
    function i(f, d) {
      const h = d.findIndex((m) => m.id === f.id);
      if (h > -1)
        d.splice(h, 1);
      else {
        const m = ht(f.id, d), k = ft(Lt(m), d), y = k.children.findIndex((C) => C.id === f.id);
        k.children.splice(y, 1);
      }
    }
    function u(f, d) {
      const h = (m, k) => {
        for (const y in m)
          if (Object.prototype.hasOwnProperty.call(m, y))
            if (Bt(m[y])) {
              const C = { id: ge(5), key: y, value: m[y], children: [] };
              k.push(C), h(m[y], C.children);
            } else
              k.push({ id: ge(5), key: y, value: m[y] });
      };
      h(f, []);
    }
    function c(f, d) {
      const h = (m, k) => {
        m.forEach((y) => {
          var C;
          (C = y.children) != null && C.length ? (k[y.key] = {}, h(y.children ?? [], k[y.key])) : k[y.key] = y.value;
        });
      };
      h(f, d[l] = {});
    }
    return t({
      formItemRef: p
    }), (f, d) => {
      const h = j("my-label"), m = $t, k = Tt, y = pt, C = vt, U = j("my-divider-title"), $ = gt, Y = pn;
      return D(), L("div", gn, [
        A(y, {
          ref_key: "formItemRef",
          ref: p,
          prop: [...f.formItemProp, g(a)],
          rules: f.formItemRules,
          "show-message": f.showMessage
        }, {
          label: O(() => [
            A(h, { label: f.apiLabel }, null, 8, ["label"])
          ]),
          default: O(() => [
            A(C, {
              modelValue: g(r)[g(a)],
              "onUpdate:modelValue": d[1] || (d[1] = (K) => g(r)[g(a)] = K),
              clearable: "",
              placeholder: "请输入"
            }, {
              prepend: O(() => [
                A(y, {
                  prop: [...f.formItemProp, g(n)],
                  rules: f.formItemRules,
                  "show-message": f.showMessage
                }, {
                  default: O(() => [
                    A(k, {
                      modelValue: g(r)[g(n)],
                      "onUpdate:modelValue": d[0] || (d[0] = (K) => g(r)[g(n)] = K),
                      placeholder: "选择",
                      style: { width: "100px" }
                    }, {
                      default: O(() => [
                        (D(!0), L(he, null, Ie(g(vn), (K) => (D(), P(m, {
                          key: K,
                          label: K,
                          value: K
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["prop", "rules", "show-message"])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["prop", "rules", "show-message"]),
        f.showParams ? (D(), L("div", mn, [
          A(U, {
            label: f.paramsLabel,
            "suffix-icon": g(Kt),
            onClickSuffixIcon: d[2] || (d[2] = (K) => v(g(s)))
          }, null, 8, ["label", "suffix-icon"]),
          A(Y, {
            data: g(s),
            "node-key": "id",
            "default-expand-all": "",
            "expand-on-click-node": !1,
            "empty-text": "暂无配置"
          }, {
            default: O(({ data: K }) => {
              var R;
              return [
                Z("span", yn, [
                  A(C, {
                    modelValue: K.key,
                    "onUpdate:modelValue": (N) => K.key = N,
                    placeholder: "字段名称",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  (R = K.children) != null && R.length ? M("", !0) : (D(), P(C, {
                    key: 0,
                    modelValue: K.value,
                    "onUpdate:modelValue": (N) => K.value = N,
                    placeholder: "字段值",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])),
                  A($, {
                    type: "danger",
                    size: "small",
                    icon: g(St),
                    plain: "",
                    circle: "",
                    onClick: (N) => i(K, g(s))
                  }, null, 8, ["icon", "onClick"])
                ])
              ];
            }),
            _: 1
          }, 8, ["data"])
        ])) : M("", !0)
      ]);
    };
  }
}), In = /* @__PURE__ */ mt(bn, [["__scopeId", "data-v-558dc6f6"]]);
export {
  In as A
};
