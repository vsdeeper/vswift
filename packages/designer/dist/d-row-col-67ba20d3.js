import { i as re, h as Se, j as Ce, k as C, C as ve, I as G, U as F, l as Re, u as $e, m as Ae, n as L, o as H, p as ke, q as Te, e as se, E as Fe, c as Ue, t as Be, r as Me, w as Oe, a as E, s as Le, v as ze, x as ue, y as Ge, z as Ke, b as Xe, A as xe, B as Je, f as We } from "./index-a443a97f.js";
import { _ as Q, a as Ye } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as N, ref as je, reactive as qe, computed as T, watch as He, onMounted as Qe, onUpdated as Ze, openBlock as f, createElementBlock as R, normalizeClass as Z, unref as e, withModifiers as ee, withDirectives as ie, withKeys as z, createVNode as l, withCtx as a, createBlock as I, createCommentVNode as K, toRef as h, resolveComponent as P, Fragment as A, renderList as le, createTextVNode as X, createElementVNode as eo, toDisplayString as oo } from "vue";
import { ArrowDown as lo, Minus as no, ArrowUp as to, Plus as Ie, SemiSelect as ao } from "@element-plus/icons-vue";
import { R as oe } from "./constants-a6c62b18.js";
import { isNil as U } from "lodash-es";
import { E as ye, a as Ve } from "./index-01903178.js";
import { b as ro, a as so } from "./index-e315910c.js";
import "nanoid";
import { E as uo, a as io } from "./index-d25df912.js";
import "pinia";
import "vuedraggable";
import "./index-db10a94d.js";
const po = 100, mo = 600, pe = {
  beforeMount(m, y) {
    const u = y.value, { interval: t = po, delay: n = mo } = re(u) ? {} : u;
    let i, r;
    const s = () => re(u) ? u() : u.handler(), d = () => {
      r && (clearTimeout(r), r = void 0), i && (clearInterval(i), i = void 0);
    };
    m.addEventListener("mousedown", (_) => {
      _.button === 0 && (d(), s(), document.addEventListener("mouseup", () => d(), {
        once: !0
      }), r = setTimeout(() => {
        i = setInterval(() => {
          s();
        }, t);
      }, n));
    });
  }
}, co = Se({
  id: {
    type: String,
    default: void 0
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: Boolean,
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },
  modelValue: Number,
  readonly: Boolean,
  disabled: Boolean,
  size: Ce,
  controls: {
    type: Boolean,
    default: !0
  },
  controlsPosition: {
    type: String,
    default: "",
    values: ["", "right"]
  },
  valueOnClear: {
    type: [String, Number, null],
    validator: (m) => m === null || C(m) || ["min", "max"].includes(m),
    default: null
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (m) => m >= 0 && m === Number.parseInt(`${m}`, 10)
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), fo = {
  [ve]: (m, y) => y !== m,
  blur: (m) => m instanceof FocusEvent,
  focus: (m) => m instanceof FocusEvent,
  [G]: (m) => C(m) || U(m),
  [F]: (m) => C(m) || U(m)
}, _o = ["aria-label", "onKeydown"], bo = ["aria-label", "onKeydown"], vo = N({
  name: "ElInputNumber"
}), Io = /* @__PURE__ */ N({
  ...vo,
  props: co,
  emits: fo,
  setup(m, { expose: y, emit: u }) {
    const t = m, { t: n } = Re(), i = $e("input-number"), r = je(), s = qe({
      currentValue: t.modelValue,
      userInput: null
    }), { formItem: d } = Ae(), _ = T(() => C(t.modelValue) && t.modelValue <= t.min), k = T(() => C(t.modelValue) && t.modelValue >= t.max), x = T(() => {
      const o = ne(t.step);
      return L(t.precision) ? Math.max(ne(t.modelValue), o) : (o > t.precision && H("InputNumber", "precision should not be less than the decimal places of step"), t.precision);
    }), D = T(() => t.controls && t.controlsPosition === "right"), V = ke(), S = Te(), J = T(() => {
      if (s.userInput !== null)
        return s.userInput;
      let o = s.currentValue;
      if (U(o))
        return "";
      if (C(o)) {
        if (Number.isNaN(o))
          return "";
        L(t.precision) || (o = o.toFixed(t.precision));
      }
      return o;
    }), W = (o, p) => {
      if (L(p) && (p = x.value), p === 0)
        return Math.round(o);
      let c = String(o);
      const b = c.indexOf(".");
      if (b === -1 || !c.replace(".", "").split("")[b + p])
        return o;
      const M = c.length;
      return c.charAt(M - 1) === "5" && (c = `${c.slice(0, Math.max(0, M - 1))}6`), Number.parseFloat(Number(c).toFixed(p));
    }, ne = (o) => {
      if (U(o))
        return 0;
      const p = o.toString(), c = p.indexOf(".");
      let b = 0;
      return c !== -1 && (b = p.length - c - 1), b;
    }, te = (o, p = 1) => C(o) ? W(o + t.step * p) : s.currentValue, Y = () => {
      if (t.readonly || S.value || k.value)
        return;
      const o = Number(J.value) || 0, p = te(o);
      B(p), u(G, s.currentValue), q();
    }, j = () => {
      if (t.readonly || S.value || _.value)
        return;
      const o = Number(J.value) || 0, p = te(o, -1);
      B(p), u(G, s.currentValue), q();
    }, ae = (o, p) => {
      const { max: c, min: b, step: v, precision: w, stepStrictly: M, valueOnClear: O } = t;
      c < b && Be("InputNumber", "min should not be greater than max.");
      let g = Number(o);
      if (U(o) || Number.isNaN(g))
        return null;
      if (o === "") {
        if (O === null)
          return null;
        g = Me(O) ? { min: b, max: c }[O] : O;
      }
      return M && (g = W(Math.round(g / v) * v, w)), L(w) || (g = W(g, w)), (g > c || g < b) && (g = g > c ? c : b, p && u(F, g)), g;
    }, B = (o, p = !0) => {
      var c;
      const b = s.currentValue, v = ae(o);
      if (!p) {
        u(F, v);
        return;
      }
      b === v && o || (s.userInput = null, u(F, v), b !== v && u(ve, v, b), t.validateEvent && ((c = d == null ? void 0 : d.validate) == null || c.call(d, "change").catch((w) => H(w))), s.currentValue = v);
    }, Ne = (o) => {
      s.userInput = o;
      const p = o === "" ? null : Number(o);
      u(G, p), B(p, !1);
    }, ge = (o) => {
      const p = o !== "" ? Number(o) : "";
      (C(p) && !Number.isNaN(p) || o === "") && B(p), q(), s.userInput = null;
    }, we = () => {
      var o, p;
      (p = (o = r.value) == null ? void 0 : o.focus) == null || p.call(o);
    }, Ee = () => {
      var o, p;
      (p = (o = r.value) == null ? void 0 : o.blur) == null || p.call(o);
    }, he = (o) => {
      u("focus", o);
    }, Pe = (o) => {
      var p;
      s.userInput = null, u("blur", o), t.validateEvent && ((p = d == null ? void 0 : d.validate) == null || p.call(d, "blur").catch((c) => H(c)));
    }, q = () => {
      s.currentValue !== t.modelValue && (s.currentValue = t.modelValue);
    }, De = (o) => {
      document.activeElement === o.target && o.preventDefault();
    };
    return He(() => t.modelValue, (o, p) => {
      const c = ae(o, !0);
      s.userInput === null && c !== p && (s.currentValue = c);
    }, { immediate: !0 }), Qe(() => {
      var o;
      const { min: p, max: c, modelValue: b } = t, v = (o = r.value) == null ? void 0 : o.input;
      if (v.setAttribute("role", "spinbutton"), Number.isFinite(c) ? v.setAttribute("aria-valuemax", String(c)) : v.removeAttribute("aria-valuemax"), Number.isFinite(p) ? v.setAttribute("aria-valuemin", String(p)) : v.removeAttribute("aria-valuemin"), v.setAttribute("aria-valuenow", s.currentValue || s.currentValue === 0 ? String(s.currentValue) : ""), v.setAttribute("aria-disabled", String(S.value)), !C(b) && b != null) {
        let w = Number(b);
        Number.isNaN(w) && (w = null), u(F, w);
      }
    }), Ze(() => {
      var o, p;
      const c = (o = r.value) == null ? void 0 : o.input;
      c == null || c.setAttribute("aria-valuenow", `${(p = s.currentValue) != null ? p : ""}`);
    }), y({
      focus: we,
      blur: Ee
    }), (o, p) => (f(), R("div", {
      class: Z([
        e(i).b(),
        e(i).m(e(V)),
        e(i).is("disabled", e(S)),
        e(i).is("without-controls", !o.controls),
        e(i).is("controls-right", e(D))
      ]),
      onDragstart: p[0] || (p[0] = ee(() => {
      }, ["prevent"]))
    }, [
      o.controls ? ie((f(), R("span", {
        key: 0,
        role: "button",
        "aria-label": e(n)("el.inputNumber.decrease"),
        class: Z([e(i).e("decrease"), e(i).is("disabled", e(_))]),
        onKeydown: z(j, ["enter"])
      }, [
        l(e(se), null, {
          default: a(() => [
            e(D) ? (f(), I(e(lo), { key: 0 })) : (f(), I(e(no), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, _o)), [
        [e(pe), j]
      ]) : K("v-if", !0),
      o.controls ? ie((f(), R("span", {
        key: 1,
        role: "button",
        "aria-label": e(n)("el.inputNumber.increase"),
        class: Z([e(i).e("increase"), e(i).is("disabled", e(k))]),
        onKeydown: z(Y, ["enter"])
      }, [
        l(e(se), null, {
          default: a(() => [
            e(D) ? (f(), I(e(to), { key: 0 })) : (f(), I(e(Ie), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, bo)), [
        [e(pe), Y]
      ]) : K("v-if", !0),
      l(e(Fe), {
        id: o.id,
        ref_key: "input",
        ref: r,
        type: "number",
        step: o.step,
        "model-value": e(J),
        placeholder: o.placeholder,
        readonly: o.readonly,
        disabled: e(S),
        size: e(V),
        max: o.max,
        min: o.min,
        name: o.name,
        label: o.label,
        "validate-event": !1,
        onWheel: De,
        onKeydown: [
          z(ee(Y, ["prevent"]), ["up"]),
          z(ee(j, ["prevent"]), ["down"])
        ],
        onBlur: Pe,
        onFocus: he,
        onInput: Ne,
        onChange: ge
      }, null, 8, ["id", "step", "model-value", "placeholder", "readonly", "disabled", "size", "max", "min", "name", "label", "onKeydown"])
    ], 34));
  }
});
var yo = /* @__PURE__ */ Ue(Io, [["__file", "input-number.vue"]]);
const $ = Oe(yo), Vo = /* @__PURE__ */ N({
  __name: "row-gutter-editor",
  props: {
    options: {},
    label: { default: "栅格间隔" },
    formItemProp: { default: () => ["options", "rowGutter"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).rowGutter,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).rowGutter = d),
            "controls-position": "right"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), No = [
  { label: "开始", value: "start" },
  { label: "末尾", value: "end" },
  { label: "居中", value: "center" },
  { label: "周围留空", value: "space-around" },
  { label: "中间留空", value: "space-between" },
  { label: "均匀留空", value: "space-evenly" }
], go = /* @__PURE__ */ N({
  __name: "row-justify-editor",
  props: {
    options: {},
    label: { default: "水平排列方式" },
    formItemProp: { default: () => ["options", "rowJustify"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = ye, s = Ve, d = E;
      return f(), I(d, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(s, {
            modelValue: e(u).rowJustify,
            "onUpdate:modelValue": n[0] || (n[0] = (_) => e(u).rowJustify = _),
            clearable: "",
            placeholder: "请选择"
          }, {
            default: a(() => [
              (f(!0), R(A, null, le(e(No), (_) => (f(), I(r, {
                key: _.value,
                label: `${_.label} - ${_.value}`,
                value: _.value
              }, null, 8, ["label", "value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), wo = [
  { label: "顶部", value: "top" },
  { label: "居中", value: "middle" },
  { label: "底部", value: "bottom" }
], Eo = /* @__PURE__ */ N({
  __name: "row-align-editor",
  props: {
    options: {},
    label: { default: "垂直排列方式" },
    formItemProp: { default: () => ["options", "rowAlign"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = ye, s = Ve, d = E;
      return f(), I(d, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(s, {
            modelValue: e(u).rowAlign,
            "onUpdate:modelValue": n[0] || (n[0] = (_) => e(u).rowAlign = _),
            clearable: "",
            placeholder: "请选择"
          }, {
            default: a(() => [
              (f(!0), R(A, null, le(e(wo), (_) => (f(), I(r, {
                key: _.value,
                label: `${_.label} - ${_.value}`,
                value: _.value
              }, null, 8, ["label", "value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), me = /* @__PURE__ */ N({
  __name: "col-span-editor",
  props: {
    options: {},
    label: { default: "栅格占据的列数" },
    formItemProp: { default: () => ["options", "colSpan"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).colSpan,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).colSpan = d),
            "controls-position": "right",
            min: 1,
            max: 24
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), de = /* @__PURE__ */ N({
  __name: "col-xs-editor",
  props: {
    options: {},
    label: { default: "<768px 响应式栅格数" },
    formItemProp: { default: () => ["options", "colXs"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).colXs,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).colXs = d),
            "controls-position": "right",
            min: 1,
            max: 24
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), ce = /* @__PURE__ */ N({
  __name: "col-sm-editor",
  props: {
    options: {},
    label: { default: "≥768px 响应式栅格数" },
    formItemProp: { default: () => ["options", "colSm"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).colSm,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).colSm = d),
            "controls-position": "right",
            min: 1,
            max: 24
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), fe = /* @__PURE__ */ N({
  __name: "col-md-editor",
  props: {
    options: {},
    label: { default: "≥992px 响应式栅格数" },
    formItemProp: { default: () => ["options", "colMd"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).colMd,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).colMd = d),
            "controls-position": "right",
            min: 1,
            max: 24
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), _e = /* @__PURE__ */ N({
  __name: "col-lg-editor",
  props: {
    options: {},
    label: { default: "≥1200px 响应式栅格数" },
    formItemProp: { default: () => ["options", "colLg"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).colLg,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).colLg = d),
            "controls-position": "right",
            min: 1,
            max: 24
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), be = /* @__PURE__ */ N({
  __name: "col-xl-editor",
  props: {
    options: {},
    label: { default: "≥1920px 响应式栅格数" },
    formItemProp: { default: () => ["options", "colXl"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = $, s = E;
      return f(), I(s, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(r, {
            modelValue: e(u).colXl,
            "onUpdate:modelValue": n[0] || (n[0] = (d) => e(u).colXl = d),
            "controls-position": "right",
            min: 1,
            max: 24
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), ho = /* @__PURE__ */ N({
  __name: "inline-editor",
  props: {
    options: {},
    label: { default: "内联模式" },
    formItemProp: { default: () => ["options", "inline"] },
    formItemRules: {}
  },
  setup(m) {
    const u = h(m, "options");
    return (t, n) => {
      const i = P("my-label"), r = ro, s = so, d = E;
      return f(), I(d, { prop: t.formItemProp }, {
        label: a(() => [
          l(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: a(() => [
          l(s, {
            modelValue: e(u).inline,
            "onUpdate:modelValue": n[0] || (n[0] = (_) => e(u).inline = _)
          }, {
            default: a(() => [
              l(r, { label: !0 }, {
                default: a(() => [
                  X("是")
                ]),
                _: 1
              }),
              l(r, { label: !1 }, {
                default: a(() => [
                  X("否")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), Po = { class: "divider-box" }, Do = /* @__PURE__ */ N({
  __name: "d-row-col",
  props: {
    formData: {}
  },
  setup(m) {
    function y(n) {
      var i;
      !((i = n.options) != null && i.components) && (n.options.components = []), n.options.components.push({
        id: Ge(`${n.type}col`),
        type: n.type,
        label: n.label,
        options: {
          components: [],
          colSpan: 24
        }
      });
    }
    function u(n, i) {
      const r = i.findIndex((s) => s.id === n);
      i.splice(r, 1);
    }
    function t(n, i) {
      return Ke(n, i);
    }
    return (n, i) => {
      const r = Ye, s = Xe, d = uo, _ = xe, k = Je, x = io;
      return e(Le)(n.formData) ? (f(), I(x, {
        key: 0,
        "model-value": ["row", "col"]
      }, {
        default: a(() => [
          l(d, {
            title: "布局-Row",
            name: "row"
          }, {
            default: a(() => [
              l(s, { gutter: e(oe) }, {
                default: a(() => [
                  l(r, null, {
                    default: a(() => [
                      l(e(Q), { "form-data": n.formData }, null, 8, ["form-data"])
                    ]),
                    _: 1
                  }),
                  l(r, null, {
                    default: a(() => [
                      l(e(Vo), {
                        options: n.formData.options
                      }, null, 8, ["options"])
                    ]),
                    _: 1
                  }),
                  l(r, null, {
                    default: a(() => [
                      l(e(go), {
                        options: n.formData.options
                      }, null, 8, ["options"])
                    ]),
                    _: 1
                  }),
                  l(r, null, {
                    default: a(() => [
                      l(e(Eo), {
                        options: n.formData.options
                      }, null, 8, ["options"])
                    ]),
                    _: 1
                  }),
                  l(r, null, {
                    default: a(() => [
                      l(e(ho), {
                        options: n.formData.options
                      }, null, 8, ["options"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["gutter"])
            ]),
            _: 1
          }),
          l(d, {
            title: "布局-Row-Cols",
            name: "col"
          }, {
            default: a(() => {
              var D;
              return [
                (f(!0), R(A, null, le((D = n.formData.options) == null ? void 0 : D.components, (V) => (f(), R(A, {
                  key: V.id
                }, [
                  eo("div", Po, [
                    l(_, {
                      "content-position": "left",
                      "border-style": "dashed"
                    }, {
                      default: a(() => [
                        X("布局-Col-" + oo(e(ze)(V, e(ue)().designData) + 1), 1)
                      ]),
                      _: 2
                    }, 1024),
                    l(k, {
                      type: "danger",
                      icon: e(ao),
                      circle: "",
                      size: "small",
                      onClick: (S) => u(V.id, n.formData.options.components)
                    }, null, 8, ["icon", "onClick"])
                  ]),
                  l(s, { gutter: e(oe) }, {
                    default: a(() => {
                      var S;
                      return [
                        l(r, null, {
                          default: a(() => [
                            l(e(Q), { "form-data": V }, null, 8, ["form-data"])
                          ]),
                          _: 2
                        }, 1024),
                        (S = n.formData.options) != null && S.inline ? K("", !0) : (f(), R(A, { key: 0 }, [
                          l(r, null, {
                            default: a(() => [
                              l(e(me), {
                                options: V.options
                              }, null, 8, ["options"])
                            ]),
                            _: 2
                          }, 1024),
                          l(r, null, {
                            default: a(() => [
                              l(e(de), {
                                options: V.options
                              }, null, 8, ["options"])
                            ]),
                            _: 2
                          }, 1024),
                          l(r, null, {
                            default: a(() => [
                              l(e(ce), {
                                options: V.options
                              }, null, 8, ["options"])
                            ]),
                            _: 2
                          }, 1024),
                          l(r, null, {
                            default: a(() => [
                              l(e(fe), {
                                options: V.options
                              }, null, 8, ["options"])
                            ]),
                            _: 2
                          }, 1024),
                          l(r, null, {
                            default: a(() => [
                              l(e(_e), {
                                options: V.options
                              }, null, 8, ["options"])
                            ]),
                            _: 2
                          }, 1024),
                          l(r, null, {
                            default: a(() => [
                              l(e(be), {
                                options: V.options
                              }, null, 8, ["options"])
                            ]),
                            _: 2
                          }, 1024)
                        ], 64))
                      ];
                    }),
                    _: 2
                  }, 1032, ["gutter"])
                ], 64))), 128)),
                l(k, {
                  class: "add-btn",
                  type: "primary",
                  plain: "",
                  icon: e(Ie),
                  onClick: i[0] || (i[0] = (V) => y(n.formData))
                }, {
                  default: a(() => [
                    X("新增Col")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ];
            }),
            _: 1
          })
        ]),
        _: 1
      })) : (f(), I(s, {
        key: 1,
        gutter: e(oe)
      }, {
        default: a(() => {
          var D;
          return [
            l(r, null, {
              default: a(() => [
                l(e(Q), { "form-data": n.formData }, null, 8, ["form-data"])
              ]),
              _: 1
            }),
            (D = t(n.formData, e(ue)().designData).options) != null && D.inline ? K("", !0) : (f(), R(A, { key: 0 }, [
              l(r, null, {
                default: a(() => [
                  l(e(me), {
                    options: n.formData.options
                  }, null, 8, ["options"])
                ]),
                _: 1
              }),
              l(r, null, {
                default: a(() => [
                  l(e(de), {
                    options: n.formData.options
                  }, null, 8, ["options"])
                ]),
                _: 1
              }),
              l(r, null, {
                default: a(() => [
                  l(e(ce), {
                    options: n.formData.options
                  }, null, 8, ["options"])
                ]),
                _: 1
              }),
              l(r, null, {
                default: a(() => [
                  l(e(fe), {
                    options: n.formData.options
                  }, null, 8, ["options"])
                ]),
                _: 1
              }),
              l(r, null, {
                default: a(() => [
                  l(e(_e), {
                    options: n.formData.options
                  }, null, 8, ["options"])
                ]),
                _: 1
              }),
              l(r, null, {
                default: a(() => [
                  l(e(be), {
                    options: n.formData.options
                  }, null, 8, ["options"])
                ]),
                _: 1
              })
            ], 64))
          ];
        }),
        _: 1
      }, 8, ["gutter"]));
    };
  }
});
const zo = /* @__PURE__ */ We(Do, [["__scopeId", "data-v-022ddbea"]]);
export {
  zo as default
};
