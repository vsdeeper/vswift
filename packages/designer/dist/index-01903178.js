import { defineComponent as Y, computed as d, openBlock as v, createElementBlock as I, normalizeClass as u, unref as M, normalizeStyle as x, createElementVNode as T, renderSlot as D, createBlock as B, withModifiers as F, withCtx as $, createVNode as N, createCommentVNode as V, Transition as ll, inject as he, getCurrentInstance as Ve, toRaw as at, watch as Q, reactive as Se, toRefs as it, onBeforeUnmount as nl, nextTick as G, withDirectives as ie, toDisplayString as A, vShow as ke, ref as E, onMounted as $e, watchEffect as ol, provide as rt, resolveComponent as U, resolveDirective as sl, Fragment as _e, renderList as et, withKeys as ae, vModelText as al, resolveDynamicComponent as Ie } from "vue";
import { a3 as il, a4 as ut, a5 as rl, h as dt, a6 as ul, p as ct, u as _, e as Te, c as re, w as pt, Q as X, a2 as ft, H as j, a7 as dl, i as Z, l as cl, a8 as pl, m as fl, R as vl, O as z, a9 as ml, o as gl, n as bl, k as hl, aa as Ee, U as P, L as yl, ab as Sl, C as vt, r as Cl, j as Ol, F as be, ac as wl, Y as tt, ad as Il, E as El, ae as Tl, af as Vl, ag as kl, d as mt } from "./index-a443a97f.js";
import { Close as lt, CircleClose as $l, ArrowDown as Rl } from "@element-plus/icons-vue";
import { get as q, isEqual as ye, isNil as Ml, debounce as Dl, findLastIndex as Bl } from "lodash-es";
const Ll = (e = "") => e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d"), cn = (e) => il(e), K = /* @__PURE__ */ new Map();
let nt;
ut && (document.addEventListener("mousedown", (e) => nt = e), document.addEventListener("mouseup", (e) => {
  for (const n of K.values())
    for (const { documentHandler: s } of n)
      s(e, nt);
}));
function ot(e, n) {
  let s = [];
  return Array.isArray(n.arg) ? s = n.arg : rl(n.arg) && s.push(n.arg), function(b, r) {
    const f = n.instance.popperRef, l = b.target, p = r == null ? void 0 : r.target, i = !n || !n.instance, h = !l || !p, c = e.contains(l) || e.contains(p), w = e === l, C = s.length && s.some((y) => y == null ? void 0 : y.contains(l)) || s.length && s.includes(p), g = f && (f.contains(l) || f.contains(p));
    i || h || c || w || C || g || n.value(b, r);
  };
}
const Fl = {
  beforeMount(e, n) {
    K.has(e) || K.set(e, []), K.get(e).push({
      documentHandler: ot(e, n),
      bindingFn: n.value
    });
  },
  updated(e, n) {
    K.has(e) || K.set(e, []);
    const s = K.get(e), b = s.findIndex((f) => f.bindingFn === n.oldValue), r = {
      documentHandler: ot(e, n),
      bindingFn: n.value
    };
    b >= 0 ? s.splice(b, 1, r) : s.push(r);
  },
  unmounted(e) {
    K.delete(e);
  }
}, gt = dt({
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger"],
    default: "primary"
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: String,
  size: {
    type: String,
    values: ul
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  round: Boolean
}), zl = {
  close: (e) => e instanceof MouseEvent,
  click: (e) => e instanceof MouseEvent
}, Nl = Y({
  name: "ElTag"
}), Wl = /* @__PURE__ */ Y({
  ...Nl,
  props: gt,
  emits: zl,
  setup(e, { emit: n }) {
    const s = e, b = ct(), r = _("tag"), f = d(() => {
      const { type: i, hit: h, effect: c, closable: w, round: C } = s;
      return [
        r.b(),
        r.is("closable", w),
        r.m(i || "primary"),
        r.m(b.value),
        r.m(c),
        r.is("hit", h),
        r.is("round", C)
      ];
    }), l = (i) => {
      n("close", i);
    }, p = (i) => {
      n("click", i);
    };
    return (i, h) => i.disableTransitions ? (v(), I("span", {
      key: 0,
      class: u(M(f)),
      style: x({ backgroundColor: i.color }),
      onClick: p
    }, [
      T("span", {
        class: u(M(r).e("content"))
      }, [
        D(i.$slots, "default")
      ], 2),
      i.closable ? (v(), B(M(Te), {
        key: 0,
        class: u(M(r).e("close")),
        onClick: F(l, ["stop"])
      }, {
        default: $(() => [
          N(M(lt))
        ]),
        _: 1
      }, 8, ["class", "onClick"])) : V("v-if", !0)
    ], 6)) : (v(), B(ll, {
      key: 1,
      name: `${M(r).namespace.value}-zoom-in-center`,
      appear: ""
    }, {
      default: $(() => [
        T("span", {
          class: u(M(f)),
          style: x({ backgroundColor: i.color }),
          onClick: p
        }, [
          T("span", {
            class: u(M(r).e("content"))
          }, [
            D(i.$slots, "default")
          ], 2),
          i.closable ? (v(), B(M(Te), {
            key: 0,
            class: u(M(r).e("close")),
            onClick: F(l, ["stop"])
          }, {
            default: $(() => [
              N(M(lt))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : V("v-if", !0)
        ], 6)
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
var Pl = /* @__PURE__ */ re(Wl, [["__file", "tag.vue"]]);
const Kl = pt(Pl), bt = Symbol("ElSelectGroup"), Ce = Symbol("ElSelect");
function Al(e, n) {
  const s = he(Ce), b = he(bt, { disabled: !1 }), r = d(() => s.props.multiple ? c(s.props.modelValue, e.value) : c([s.props.modelValue], e.value)), f = d(() => {
    if (s.props.multiple) {
      const g = s.props.modelValue || [];
      return !r.value && g.length >= s.props.multipleLimit && s.props.multipleLimit > 0;
    } else
      return !1;
  }), l = d(() => e.label || (X(e.value) ? "" : e.value)), p = d(() => e.value || e.label || ""), i = d(() => e.disabled || n.groupDisabled || f.value), h = Ve(), c = (g = [], y) => {
    if (X(e.value)) {
      const a = s.props.valueKey;
      return g && g.some((R) => at(q(R, a)) === q(y, a));
    } else
      return g && g.includes(y);
  }, w = () => {
    !e.disabled && !b.disabled && (s.states.hoveringIndex = s.optionsArray.indexOf(h.proxy));
  }, C = (g) => {
    const y = new RegExp(Ll(g), "i");
    n.visible = y.test(l.value) || e.created;
  };
  return Q(() => l.value, () => {
    !e.created && !s.props.remote && s.setSelected();
  }), Q(() => e.value, (g, y) => {
    const { remote: a, valueKey: R } = s.props;
    if (ye(g, y) || (s.onOptionDestroy(y, h.proxy), s.onOptionCreate(h.proxy)), !e.created && !a) {
      if (R && X(g) && X(y) && g[R] === y[R])
        return;
      s.setSelected();
    }
  }), Q(() => b.disabled, () => {
    n.groupDisabled = b.disabled;
  }, { immediate: !0 }), {
    select: s,
    currentLabel: l,
    currentValue: p,
    itemSelected: r,
    isDisabled: i,
    hoverItem: w,
    updateOption: C
  };
}
const Hl = Y({
  name: "ElOption",
  componentName: "ElOption",
  props: {
    value: {
      required: !0,
      type: [String, Number, Boolean, Object]
    },
    label: [String, Number],
    created: Boolean,
    disabled: Boolean
  },
  setup(e) {
    const n = _("select"), s = ft(), b = d(() => [
      n.be("dropdown", "item"),
      n.is("disabled", M(p)),
      n.is("selected", M(l)),
      n.is("hovering", M(C))
    ]), r = Se({
      index: -1,
      groupDisabled: !1,
      visible: !0,
      hover: !1
    }), {
      currentLabel: f,
      itemSelected: l,
      isDisabled: p,
      select: i,
      hoverItem: h,
      updateOption: c
    } = Al(e, r), { visible: w, hover: C } = it(r), g = Ve().proxy;
    i.onOptionCreate(g), nl(() => {
      const a = g.value, { selected: R } = i.states, ue = (i.props.multiple ? R : [R]).some((de) => de.value === g.value);
      G(() => {
        i.states.cachedOptions.get(a) === g && !ue && i.states.cachedOptions.delete(a);
      }), i.onOptionDestroy(a, g);
    });
    function y() {
      e.disabled !== !0 && r.groupDisabled !== !0 && i.handleOptionSelect(g);
    }
    return {
      ns: n,
      id: s,
      containerKls: b,
      currentLabel: f,
      itemSelected: l,
      isDisabled: p,
      select: i,
      hoverItem: h,
      updateOption: c,
      visible: w,
      hover: C,
      selectOptionClick: y,
      states: r
    };
  }
}), Ul = ["id", "aria-disabled", "aria-selected"];
function Gl(e, n, s, b, r, f) {
  return ie((v(), I("li", {
    id: e.id,
    class: u(e.containerKls),
    role: "option",
    "aria-disabled": e.isDisabled || void 0,
    "aria-selected": e.itemSelected,
    onMouseenter: n[0] || (n[0] = (...l) => e.hoverItem && e.hoverItem(...l)),
    onClick: n[1] || (n[1] = F((...l) => e.selectOptionClick && e.selectOptionClick(...l), ["stop"]))
  }, [
    D(e.$slots, "default", {}, () => [
      T("span", null, A(e.currentLabel), 1)
    ])
  ], 42, Ul)), [
    [ke, e.visible]
  ]);
}
var Re = /* @__PURE__ */ re(Hl, [["render", Gl], ["__file", "option.vue"]]);
const jl = Y({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const e = he(Ce), n = _("select"), s = d(() => e.props.popperClass), b = d(() => e.props.multiple), r = d(() => e.props.fitInputWidth), f = E("");
    function l() {
      var p;
      f.value = `${(p = e.selectRef) == null ? void 0 : p.offsetWidth}px`;
    }
    return $e(() => {
      l(), j(e.selectRef, l);
    }), {
      ns: n,
      minWidth: f,
      popperClass: s,
      isMultiple: b,
      isFitInputWidth: r
    };
  }
});
function ql(e, n, s, b, r, f) {
  return v(), I("div", {
    class: u([e.ns.b("dropdown"), e.ns.is("multiple", e.isMultiple), e.popperClass]),
    style: x({ [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth })
  }, [
    e.$slots.header ? (v(), I("div", {
      key: 0,
      class: u(e.ns.be("dropdown", "header"))
    }, [
      D(e.$slots, "header")
    ], 2)) : V("v-if", !0),
    D(e.$slots, "default"),
    e.$slots.footer ? (v(), I("div", {
      key: 1,
      class: u(e.ns.be("dropdown", "footer"))
    }, [
      D(e.$slots, "footer")
    ], 2)) : V("v-if", !0)
  ], 6);
}
var Ql = /* @__PURE__ */ re(jl, [["render", ql], ["__file", "select-dropdown.vue"]]);
function Yl(e) {
  const n = E(!1);
  return {
    handleCompositionStart: () => {
      n.value = !0;
    },
    handleCompositionUpdate: (f) => {
      const l = f.target.value, p = l[l.length - 1] || "";
      n.value = !dl(p);
    },
    handleCompositionEnd: (f) => {
      n.value && (n.value = !1, Z(e) && e(f));
    }
  };
}
const Jl = 11, Xl = (e, n) => {
  const { t: s } = cl(), b = ft(), r = _("select"), f = _("input"), l = Se({
    inputValue: "",
    options: /* @__PURE__ */ new Map(),
    cachedOptions: /* @__PURE__ */ new Map(),
    disabledOptions: /* @__PURE__ */ new Map(),
    optionValues: [],
    selected: e.multiple ? [] : {},
    selectionWidth: 0,
    calculatorWidth: 0,
    collapseItemWidth: 0,
    selectedLabel: "",
    hoveringIndex: -1,
    previousQuery: null,
    inputHovering: !1,
    menuVisibleOnFocus: !1,
    isBeforeHide: !1
  }), p = E(null), i = E(null), h = E(null), c = E(null), w = E(null), C = E(null), g = E(null), y = E(null), a = E(null), R = E(null), ee = E(null), ue = E(null), { wrapperRef: de, isFocused: Me, handleFocus: yt, handleBlur: De } = pl(w, {
    afterFocus() {
      e.automaticDropdown && !O.value && (O.value = !0, l.menuVisibleOnFocus = !0);
    },
    beforeBlur(t) {
      var o, m;
      return ((o = h.value) == null ? void 0 : o.isFocusInsideContent(t)) || ((m = c.value) == null ? void 0 : m.isFocusInsideContent(t));
    },
    afterBlur() {
      O.value = !1, l.menuVisibleOnFocus = !1;
    }
  }), O = E(!1), te = E(), { form: Be, formItem: le } = fl(), { inputId: St } = vl(e, {
    formItemContext: le
  }), ce = d(() => e.disabled || (Be == null ? void 0 : Be.disabled)), Ct = d(() => k.value.some((t) => t.value === "")), Oe = d(() => e.multiple ? z(e.modelValue) && e.modelValue.length > 0 : !Ml(e.modelValue) && (e.modelValue !== "" || Ct.value)), Ot = d(() => e.clearable && !ce.value && l.inputHovering && Oe.value), Le = d(() => e.remote && e.filterable && !e.remoteShowSuffix ? "" : e.suffixIcon), wt = d(() => r.is("reverse", Le.value && O.value)), Fe = d(() => (le == null ? void 0 : le.validateState) || ""), It = d(() => ml[Fe.value]), Et = d(() => e.remote ? 300 : 0), ze = d(() => e.loading ? e.loadingText || s("el.select.loading") : e.remote && !l.inputValue && l.options.size === 0 ? !1 : e.filterable && l.inputValue && l.options.size > 0 && ne.value === 0 ? e.noMatchText || s("el.select.noMatch") : l.options.size === 0 ? e.noDataText || s("el.select.noData") : null), ne = d(() => k.value.filter((t) => t.visible).length), k = d(() => {
    const t = Array.from(l.options.values()), o = [];
    return l.optionValues.forEach((m) => {
      const S = t.findIndex((W) => W.value === m);
      S > -1 && o.push(t[S]);
    }), o.length >= t.length ? o : t;
  }), Tt = d(() => Array.from(l.cachedOptions.values())), Vt = d(() => {
    const t = k.value.filter((o) => !o.created).some((o) => o.currentLabel === l.inputValue);
    return e.filterable && e.allowCreate && l.inputValue !== "" && !t;
  }), Ne = () => {
    e.filterable && Z(e.filterMethod) || e.filterable && e.remote && Z(e.remoteMethod) || k.value.forEach((t) => {
      t.updateOption(l.inputValue);
    });
  }, We = ct(), kt = d(() => ["small"].includes(We.value) ? "small" : "default"), $t = d({
    get() {
      return O.value && ze.value !== !1;
    },
    set(t) {
      O.value = t;
    }
  }), Rt = d(() => z(e.modelValue) ? e.modelValue.length === 0 && !l.inputValue : e.filterable ? !l.inputValue : !0), Mt = d(() => {
    var t;
    const o = (t = e.placeholder) != null ? t : s("el.select.placeholder");
    return e.multiple || !Oe.value ? o : l.selectedLabel;
  });
  Q(() => e.modelValue, (t, o) => {
    e.multiple && e.filterable && !e.reserveKeyword && (l.inputValue = "", pe("")), fe(), !ye(t, o) && e.validateEvent && (le == null || le.validate("change").catch((m) => gl(m)));
  }, {
    flush: "post",
    deep: !0
  }), Q(() => O.value, (t) => {
    t ? pe(l.inputValue) : (l.inputValue = "", l.previousQuery = null, l.isBeforeHide = !0), n("visible-change", t);
  }), Q(() => l.options.entries(), () => {
    var t;
    if (!ut)
      return;
    const o = ((t = p.value) == null ? void 0 : t.querySelectorAll("input")) || [];
    (!e.filterable && !e.defaultFirstOption && !bl(e.modelValue) || !Array.from(o).includes(document.activeElement)) && fe(), e.defaultFirstOption && (e.filterable || e.remote) && ne.value && Pe();
  }, {
    flush: "post"
  }), Q(() => l.hoveringIndex, (t) => {
    hl(t) && t > -1 ? te.value = k.value[t] || {} : te.value = {}, k.value.forEach((o) => {
      o.hover = te.value === o;
    });
  }), ol(() => {
    l.isBeforeHide || Ne();
  });
  const pe = (t) => {
    l.previousQuery !== t && (l.previousQuery = t, e.filterable && Z(e.filterMethod) ? e.filterMethod(t) : e.filterable && e.remote && Z(e.remoteMethod) && e.remoteMethod(t), e.defaultFirstOption && (e.filterable || e.remote) && ne.value ? G(Pe) : G(Dt));
  }, Pe = () => {
    const t = k.value.filter((S) => S.visible && !S.disabled && !S.states.groupDisabled), o = t.find((S) => S.created), m = t[0];
    l.hoveringIndex = Ye(k.value, o || m);
  }, fe = () => {
    if (e.multiple)
      l.selectedLabel = "";
    else {
      const o = Ke(e.modelValue);
      l.selectedLabel = o.currentLabel, l.selected = o;
      return;
    }
    const t = [];
    z(e.modelValue) && e.modelValue.forEach((o) => {
      t.push(Ke(o));
    }), l.selected = t;
  }, Ke = (t) => {
    let o;
    const m = Ee(t).toLowerCase() === "object", S = Ee(t).toLowerCase() === "null", W = Ee(t).toLowerCase() === "undefined";
    for (let H = l.cachedOptions.size - 1; H >= 0; H--) {
      const L = Tt.value[H];
      if (m ? q(L.value, e.valueKey) === q(t, e.valueKey) : L.value === t) {
        o = {
          value: t,
          currentLabel: L.currentLabel,
          isDisabled: L.isDisabled
        };
        break;
      }
    }
    if (o)
      return o;
    const J = m ? t.label : !S && !W ? t : "";
    return {
      value: t,
      currentLabel: J
    };
  }, Dt = () => {
    e.multiple ? l.hoveringIndex = k.value.findIndex((t) => l.selected.some((o) => se(o) === se(t))) : l.hoveringIndex = k.value.findIndex((t) => se(t) === se(l.selected));
  }, Bt = () => {
    l.selectionWidth = i.value.getBoundingClientRect().width;
  }, Ae = () => {
    l.calculatorWidth = C.value.getBoundingClientRect().width;
  }, Lt = () => {
    l.collapseItemWidth = ee.value.getBoundingClientRect().width;
  }, we = () => {
    var t, o;
    (o = (t = h.value) == null ? void 0 : t.updatePopper) == null || o.call(t);
  }, He = () => {
    var t, o;
    (o = (t = c.value) == null ? void 0 : t.updatePopper) == null || o.call(t);
  }, Ue = () => {
    l.inputValue.length > 0 && !O.value && (O.value = !0), pe(l.inputValue);
  }, Ge = (t) => {
    if (l.inputValue = t.target.value, e.remote)
      je();
    else
      return Ue();
  }, je = Dl(() => {
    Ue();
  }, Et.value), oe = (t) => {
    ye(e.modelValue, t) || n(vt, t);
  }, Ft = (t) => Bl(t, (o) => !l.disabledOptions.has(o)), zt = (t) => {
    if (e.multiple && t.code !== yl.delete && t.target.value.length <= 0) {
      const o = e.modelValue.slice(), m = Ft(o);
      if (m < 0)
        return;
      o.splice(m, 1), n(P, o), oe(o);
    }
  }, Nt = (t, o) => {
    const m = l.selected.indexOf(o);
    if (m > -1 && !ce.value) {
      const S = e.modelValue.slice();
      S.splice(m, 1), n(P, S), oe(S), n("remove-tag", o.value);
    }
    t.stopPropagation(), me();
  }, qe = (t) => {
    t.stopPropagation();
    const o = e.multiple ? [] : void 0;
    if (e.multiple)
      for (const m of l.selected)
        m.isDisabled && o.push(m.value);
    n(P, o), oe(o), l.hoveringIndex = -1, O.value = !1, n("clear"), me();
  }, Qe = (t) => {
    if (e.multiple) {
      const o = (e.modelValue || []).slice(), m = Ye(o, t.value);
      m > -1 ? o.splice(m, 1) : (e.multipleLimit <= 0 || o.length < e.multipleLimit) && o.push(t.value), n(P, o), oe(o), t.created && pe(""), e.filterable && !e.reserveKeyword && (l.inputValue = "");
    } else
      n(P, t.value), oe(t.value), O.value = !1;
    me(), !O.value && G(() => {
      ve(t);
    });
  }, Ye = (t = [], o) => {
    if (!X(o))
      return t.indexOf(o);
    const m = e.valueKey;
    let S = -1;
    return t.some((W, J) => at(q(W, m)) === q(o, m) ? (S = J, !0) : !1), S;
  }, ve = (t) => {
    var o, m, S, W, J;
    const ge = z(t) ? t[0] : t;
    let H = null;
    if (ge != null && ge.value) {
      const L = k.value.filter((xe) => xe.value === ge.value);
      L.length > 0 && (H = L[0].$el);
    }
    if (h.value && H) {
      const L = (W = (S = (m = (o = h.value) == null ? void 0 : o.popperRef) == null ? void 0 : m.contentRef) == null ? void 0 : S.querySelector) == null ? void 0 : W.call(S, `.${r.be("dropdown", "wrap")}`);
      L && Sl(L, H);
    }
    (J = ue.value) == null || J.handleScroll();
  }, Wt = (t) => {
    l.options.set(t.value, t), l.cachedOptions.set(t.value, t), t.disabled && l.disabledOptions.set(t.value, t);
  }, Pt = (t, o) => {
    l.options.get(t) === o && l.options.delete(t);
  }, {
    handleCompositionStart: Kt,
    handleCompositionUpdate: At,
    handleCompositionEnd: Ht
  } = Yl((t) => Ge(t)), Ut = d(() => {
    var t, o;
    return (o = (t = h.value) == null ? void 0 : t.popperRef) == null ? void 0 : o.contentRef;
  }), Gt = () => {
    G(() => ve(l.selected));
  }, me = () => {
    var t;
    (t = w.value) == null || t.focus();
  }, jt = () => {
    Je();
  }, qt = (t) => {
    qe(t);
  }, Je = (t) => {
    if (O.value = !1, Me.value) {
      const o = new FocusEvent("focus", t);
      G(() => De(o));
    }
  }, Qt = () => {
    l.inputValue.length > 0 ? l.inputValue = "" : O.value = !1;
  }, Xe = () => {
    ce.value || (l.menuVisibleOnFocus ? l.menuVisibleOnFocus = !1 : O.value = !O.value);
  }, Yt = () => {
    O.value ? k.value[l.hoveringIndex] && Qe(k.value[l.hoveringIndex]) : Xe();
  }, se = (t) => X(t.value) ? q(t.value, e.valueKey) : t.value, Jt = d(() => k.value.filter((t) => t.visible).every((t) => t.disabled)), Xt = d(() => e.multiple ? e.collapseTags ? l.selected.slice(0, e.maxCollapseTags) : l.selected : []), Zt = d(() => e.multiple ? e.collapseTags ? l.selected.slice(e.maxCollapseTags) : [] : []), Ze = (t) => {
    if (!O.value) {
      O.value = !0;
      return;
    }
    if (!(l.options.size === 0 || ne.value === 0) && !Jt.value) {
      t === "next" ? (l.hoveringIndex++, l.hoveringIndex === l.options.size && (l.hoveringIndex = 0)) : t === "prev" && (l.hoveringIndex--, l.hoveringIndex < 0 && (l.hoveringIndex = l.options.size - 1));
      const o = k.value[l.hoveringIndex];
      (o.disabled === !0 || o.states.groupDisabled === !0 || !o.visible) && Ze(t), G(() => ve(te.value));
    }
  }, xt = () => {
    if (!i.value)
      return 0;
    const t = window.getComputedStyle(i.value);
    return Number.parseFloat(t.gap || "6px");
  }, _t = d(() => {
    const t = xt();
    return { maxWidth: `${ee.value && e.maxCollapseTags === 1 ? l.selectionWidth - l.collapseItemWidth - t : l.selectionWidth}px` };
  }), el = d(() => ({ maxWidth: `${l.selectionWidth}px` })), tl = d(() => ({
    width: `${Math.max(l.calculatorWidth, Jl)}px`
  }));
  return e.multiple && !z(e.modelValue) && n(P, []), !e.multiple && z(e.modelValue) && n(P, ""), j(i, Bt), j(C, Ae), j(a, we), j(de, we), j(R, He), j(ee, Lt), $e(() => {
    fe();
  }), {
    inputId: St,
    contentId: b,
    nsSelect: r,
    nsInput: f,
    states: l,
    isFocused: Me,
    expanded: O,
    optionsArray: k,
    hoverOption: te,
    selectSize: We,
    filteredOptionsCount: ne,
    resetCalculatorWidth: Ae,
    updateTooltip: we,
    updateTagTooltip: He,
    debouncedOnInputChange: je,
    onInput: Ge,
    deletePrevTag: zt,
    deleteTag: Nt,
    deleteSelected: qe,
    handleOptionSelect: Qe,
    scrollToOption: ve,
    hasModelValue: Oe,
    shouldShowPlaceholder: Rt,
    currentPlaceholder: Mt,
    showClose: Ot,
    iconComponent: Le,
    iconReverse: wt,
    validateState: Fe,
    validateIcon: It,
    showNewOption: Vt,
    updateOptions: Ne,
    collapseTagSize: kt,
    setSelected: fe,
    selectDisabled: ce,
    emptyText: ze,
    handleCompositionStart: Kt,
    handleCompositionUpdate: At,
    handleCompositionEnd: Ht,
    onOptionCreate: Wt,
    onOptionDestroy: Pt,
    handleMenuEnter: Gt,
    handleFocus: yt,
    focus: me,
    blur: jt,
    handleBlur: De,
    handleClearClick: qt,
    handleClickOutside: Je,
    handleEsc: Qt,
    toggleMenu: Xe,
    selectOption: Yt,
    getValueKey: se,
    navigateOptions: Ze,
    dropdownMenuVisible: $t,
    showTagList: Xt,
    collapseTagList: Zt,
    tagStyle: _t,
    collapseTagStyle: el,
    inputStyle: tl,
    popperRef: Ut,
    inputRef: w,
    tooltipRef: h,
    tagTooltipRef: c,
    calculatorRef: C,
    prefixRef: g,
    suffixRef: y,
    selectRef: p,
    wrapperRef: de,
    selectionRef: i,
    scrollbarRef: ue,
    menuRef: a,
    tagMenuRef: R,
    collapseItemRef: ee
  };
};
var Zl = Y({
  name: "ElOptions",
  setup(e, { slots: n }) {
    const s = he(Ce);
    let b = [];
    return () => {
      var r, f;
      const l = (r = n.default) == null ? void 0 : r.call(n), p = [];
      function i(h) {
        z(h) && h.forEach((c) => {
          var w, C, g, y;
          const a = (w = (c == null ? void 0 : c.type) || {}) == null ? void 0 : w.name;
          a === "ElOptionGroup" ? i(!Cl(c.children) && !z(c.children) && Z((C = c.children) == null ? void 0 : C.default) ? (g = c.children) == null ? void 0 : g.default() : c.children) : a === "ElOption" ? p.push((y = c.props) == null ? void 0 : y.value) : z(c.children) && i(c.children);
        });
      }
      return l.length && i((f = l[0]) == null ? void 0 : f.children), ye(p, b) || (b = p, s && (s.states.optionValues = p)), l;
    };
  }
});
const xl = dt({
  name: String,
  id: String,
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: void 0
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  automaticDropdown: Boolean,
  size: Ol,
  effect: {
    type: be(String),
    default: "light"
  },
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: {
    type: String,
    default: ""
  },
  popperOptions: {
    type: be(Object),
    default: () => ({})
  },
  remote: Boolean,
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: Function,
  filterMethod: Function,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String
  },
  defaultFirstOption: Boolean,
  reserveKeyword: {
    type: Boolean,
    default: !0
  },
  valueKey: {
    type: String,
    default: "value"
  },
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  teleported: wl.teleported,
  persistent: {
    type: Boolean,
    default: !0
  },
  clearIcon: {
    type: tt,
    default: $l
  },
  fitInputWidth: Boolean,
  suffixIcon: {
    type: tt,
    default: Rl
  },
  tagType: { ...gt.type, default: "info" },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  remoteShowSuffix: Boolean,
  placement: {
    type: be(String),
    values: Il,
    default: "bottom-start"
  },
  fallbackPlacements: {
    type: be(Array),
    default: ["bottom-start", "top-start", "right", "left"]
  },
  ariaLabel: {
    type: String,
    default: void 0
  }
}), st = "ElSelect", _l = Y({
  name: st,
  componentName: st,
  components: {
    ElInput: El,
    ElSelectMenu: Ql,
    ElOption: Re,
    ElOptions: Zl,
    ElTag: Kl,
    ElScrollbar: Tl,
    ElTooltip: Vl,
    ElIcon: Te
  },
  directives: { ClickOutside: Fl },
  props: xl,
  emits: [
    P,
    vt,
    "remove-tag",
    "clear",
    "visible-change",
    "focus",
    "blur"
  ],
  setup(e, { emit: n }) {
    const s = Xl(e, n);
    return rt(Ce, Se({
      props: e,
      states: s.states,
      optionsArray: s.optionsArray,
      handleOptionSelect: s.handleOptionSelect,
      onOptionCreate: s.onOptionCreate,
      onOptionDestroy: s.onOptionDestroy,
      selectRef: s.selectRef,
      setSelected: s.setSelected
    })), {
      ...s
    };
  }
}), en = ["id", "disabled", "autocomplete", "readonly", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label"], tn = ["textContent"];
function ln(e, n, s, b, r, f) {
  const l = U("el-tag"), p = U("el-tooltip"), i = U("el-icon"), h = U("el-option"), c = U("el-options"), w = U("el-scrollbar"), C = U("el-select-menu"), g = sl("click-outside");
  return ie((v(), I("div", {
    ref: "selectRef",
    class: u([e.nsSelect.b(), e.nsSelect.m(e.selectSize)]),
    onMouseenter: n[14] || (n[14] = (y) => e.states.inputHovering = !0),
    onMouseleave: n[15] || (n[15] = (y) => e.states.inputHovering = !1),
    onClick: n[16] || (n[16] = F((...y) => e.toggleMenu && e.toggleMenu(...y), ["stop"]))
  }, [
    N(p, {
      ref: "tooltipRef",
      visible: e.dropdownMenuVisible,
      placement: e.placement,
      teleported: e.teleported,
      "popper-class": [e.nsSelect.e("popper"), e.popperClass],
      "popper-options": e.popperOptions,
      "fallback-placements": e.fallbackPlacements,
      effect: e.effect,
      pure: "",
      trigger: "click",
      transition: `${e.nsSelect.namespace.value}-zoom-in-top`,
      "stop-popper-mouse-event": !1,
      "gpu-acceleration": !1,
      persistent: e.persistent,
      onBeforeShow: e.handleMenuEnter,
      onHide: n[13] || (n[13] = (y) => e.states.isBeforeHide = !1)
    }, {
      default: $(() => {
        var y;
        return [
          T("div", {
            ref: "wrapperRef",
            class: u([
              e.nsSelect.e("wrapper"),
              e.nsSelect.is("focused", e.isFocused),
              e.nsSelect.is("hovering", e.states.inputHovering),
              e.nsSelect.is("filterable", e.filterable),
              e.nsSelect.is("disabled", e.selectDisabled)
            ])
          }, [
            e.$slots.prefix ? (v(), I("div", {
              key: 0,
              ref: "prefixRef",
              class: u(e.nsSelect.e("prefix"))
            }, [
              D(e.$slots, "prefix")
            ], 2)) : V("v-if", !0),
            T("div", {
              ref: "selectionRef",
              class: u([
                e.nsSelect.e("selection"),
                e.nsSelect.is("near", e.multiple && !e.$slots.prefix && !!e.states.selected.length)
              ])
            }, [
              e.multiple ? D(e.$slots, "tag", { key: 0 }, () => [
                (v(!0), I(_e, null, et(e.showTagList, (a) => (v(), I("div", {
                  key: e.getValueKey(a),
                  class: u(e.nsSelect.e("selected-item"))
                }, [
                  N(l, {
                    closable: !e.selectDisabled && !a.isDisabled,
                    size: e.collapseTagSize,
                    type: e.tagType,
                    "disable-transitions": "",
                    style: x(e.tagStyle),
                    onClose: (R) => e.deleteTag(R, a)
                  }, {
                    default: $(() => [
                      T("span", {
                        class: u(e.nsSelect.e("tags-text"))
                      }, A(a.currentLabel), 3)
                    ]),
                    _: 2
                  }, 1032, ["closable", "size", "type", "style", "onClose"])
                ], 2))), 128)),
                e.collapseTags && e.states.selected.length > e.maxCollapseTags ? (v(), B(p, {
                  key: 0,
                  ref: "tagTooltipRef",
                  disabled: e.dropdownMenuVisible || !e.collapseTagsTooltip,
                  "fallback-placements": ["bottom", "top", "right", "left"],
                  effect: e.effect,
                  placement: "bottom",
                  teleported: e.teleported
                }, {
                  default: $(() => [
                    T("div", {
                      ref: "collapseItemRef",
                      class: u(e.nsSelect.e("selected-item"))
                    }, [
                      N(l, {
                        closable: !1,
                        size: e.collapseTagSize,
                        type: e.tagType,
                        "disable-transitions": "",
                        style: x(e.collapseTagStyle)
                      }, {
                        default: $(() => [
                          T("span", {
                            class: u(e.nsSelect.e("tags-text"))
                          }, " + " + A(e.states.selected.length - e.maxCollapseTags), 3)
                        ]),
                        _: 1
                      }, 8, ["size", "type", "style"])
                    ], 2)
                  ]),
                  content: $(() => [
                    T("div", {
                      ref: "tagMenuRef",
                      class: u(e.nsSelect.e("selection"))
                    }, [
                      (v(!0), I(_e, null, et(e.collapseTagList, (a) => (v(), I("div", {
                        key: e.getValueKey(a),
                        class: u(e.nsSelect.e("selected-item"))
                      }, [
                        N(l, {
                          class: "in-tooltip",
                          closable: !e.selectDisabled && !a.isDisabled,
                          size: e.collapseTagSize,
                          type: e.tagType,
                          "disable-transitions": "",
                          onClose: (R) => e.deleteTag(R, a)
                        }, {
                          default: $(() => [
                            T("span", {
                              class: u(e.nsSelect.e("tags-text"))
                            }, A(a.currentLabel), 3)
                          ]),
                          _: 2
                        }, 1032, ["closable", "size", "type", "onClose"])
                      ], 2))), 128))
                    ], 2)
                  ]),
                  _: 1
                }, 8, ["disabled", "effect", "teleported"])) : V("v-if", !0)
              ]) : V("v-if", !0),
              e.selectDisabled ? V("v-if", !0) : (v(), I("div", {
                key: 1,
                class: u([
                  e.nsSelect.e("selected-item"),
                  e.nsSelect.e("input-wrapper"),
                  e.nsSelect.is("hidden", !e.filterable)
                ])
              }, [
                ie(T("input", {
                  id: e.inputId,
                  ref: "inputRef",
                  "onUpdate:modelValue": n[0] || (n[0] = (a) => e.states.inputValue = a),
                  type: "text",
                  class: u([e.nsSelect.e("input"), e.nsSelect.is(e.selectSize)]),
                  disabled: e.selectDisabled,
                  autocomplete: e.autocomplete,
                  style: x(e.inputStyle),
                  role: "combobox",
                  readonly: !e.filterable,
                  spellcheck: "false",
                  "aria-activedescendant": ((y = e.hoverOption) == null ? void 0 : y.id) || "",
                  "aria-controls": e.contentId,
                  "aria-expanded": e.dropdownMenuVisible,
                  "aria-label": e.ariaLabel,
                  "aria-autocomplete": "none",
                  "aria-haspopup": "listbox",
                  onFocus: n[1] || (n[1] = (...a) => e.handleFocus && e.handleFocus(...a)),
                  onBlur: n[2] || (n[2] = (...a) => e.handleBlur && e.handleBlur(...a)),
                  onKeydown: [
                    n[3] || (n[3] = ae(F((a) => e.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
                    n[4] || (n[4] = ae(F((a) => e.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
                    n[5] || (n[5] = ae(F((...a) => e.handleEsc && e.handleEsc(...a), ["stop", "prevent"]), ["esc"])),
                    n[6] || (n[6] = ae(F((...a) => e.selectOption && e.selectOption(...a), ["stop", "prevent"]), ["enter"])),
                    n[7] || (n[7] = ae(F((...a) => e.deletePrevTag && e.deletePrevTag(...a), ["stop"]), ["delete"]))
                  ],
                  onCompositionstart: n[8] || (n[8] = (...a) => e.handleCompositionStart && e.handleCompositionStart(...a)),
                  onCompositionupdate: n[9] || (n[9] = (...a) => e.handleCompositionUpdate && e.handleCompositionUpdate(...a)),
                  onCompositionend: n[10] || (n[10] = (...a) => e.handleCompositionEnd && e.handleCompositionEnd(...a)),
                  onInput: n[11] || (n[11] = (...a) => e.onInput && e.onInput(...a)),
                  onClick: n[12] || (n[12] = F((...a) => e.toggleMenu && e.toggleMenu(...a), ["stop"]))
                }, null, 46, en), [
                  [al, e.states.inputValue]
                ]),
                e.filterable ? (v(), I("span", {
                  key: 0,
                  ref: "calculatorRef",
                  "aria-hidden": "true",
                  class: u(e.nsSelect.e("input-calculator")),
                  textContent: A(e.states.inputValue)
                }, null, 10, tn)) : V("v-if", !0)
              ], 2)),
              e.shouldShowPlaceholder ? (v(), I("div", {
                key: 2,
                class: u([
                  e.nsSelect.e("selected-item"),
                  e.nsSelect.e("placeholder"),
                  e.nsSelect.is("transparent", !e.hasModelValue || e.expanded && !e.states.inputValue)
                ])
              }, [
                T("span", null, A(e.currentPlaceholder), 1)
              ], 2)) : V("v-if", !0)
            ], 2),
            T("div", {
              ref: "suffixRef",
              class: u(e.nsSelect.e("suffix"))
            }, [
              e.iconComponent && !e.showClose ? (v(), B(i, {
                key: 0,
                class: u([e.nsSelect.e("caret"), e.nsSelect.e("icon"), e.iconReverse])
              }, {
                default: $(() => [
                  (v(), B(Ie(e.iconComponent)))
                ]),
                _: 1
              }, 8, ["class"])) : V("v-if", !0),
              e.showClose && e.clearIcon ? (v(), B(i, {
                key: 1,
                class: u([e.nsSelect.e("caret"), e.nsSelect.e("icon")]),
                onClick: e.handleClearClick
              }, {
                default: $(() => [
                  (v(), B(Ie(e.clearIcon)))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : V("v-if", !0),
              e.validateState && e.validateIcon ? (v(), B(i, {
                key: 2,
                class: u([e.nsInput.e("icon"), e.nsInput.e("validateIcon")])
              }, {
                default: $(() => [
                  (v(), B(Ie(e.validateIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : V("v-if", !0)
            ], 2)
          ], 2)
        ];
      }),
      content: $(() => [
        N(C, { ref: "menuRef" }, {
          default: $(() => [
            e.$slots.header ? (v(), I("div", {
              key: 0,
              class: u(e.nsSelect.be("dropdown", "header"))
            }, [
              D(e.$slots, "header")
            ], 2)) : V("v-if", !0),
            ie(N(w, {
              id: e.contentId,
              ref: "scrollbarRef",
              tag: "ul",
              "wrap-class": e.nsSelect.be("dropdown", "wrap"),
              "view-class": e.nsSelect.be("dropdown", "list"),
              class: u([e.nsSelect.is("empty", e.filteredOptionsCount === 0)]),
              role: "listbox",
              "aria-label": e.ariaLabel,
              "aria-orientation": "vertical"
            }, {
              default: $(() => [
                e.showNewOption ? (v(), B(h, {
                  key: 0,
                  value: e.states.inputValue,
                  created: !0
                }, null, 8, ["value"])) : V("v-if", !0),
                N(c, null, {
                  default: $(() => [
                    D(e.$slots, "default")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class", "class", "aria-label"]), [
              [ke, e.states.options.size > 0 && !e.loading]
            ]),
            e.$slots.loading && e.loading ? (v(), I("div", {
              key: 1,
              class: u(e.nsSelect.be("dropdown", "loading"))
            }, [
              D(e.$slots, "loading")
            ], 2)) : e.loading || e.filteredOptionsCount === 0 ? (v(), I("div", {
              key: 2,
              class: u(e.nsSelect.be("dropdown", "empty"))
            }, [
              D(e.$slots, "empty", {}, () => [
                T("span", null, A(e.emptyText), 1)
              ])
            ], 2)) : V("v-if", !0),
            e.$slots.footer ? (v(), I("div", {
              key: 3,
              class: u(e.nsSelect.be("dropdown", "footer"))
            }, [
              D(e.$slots, "footer")
            ], 2)) : V("v-if", !0)
          ]),
          _: 3
        }, 512)
      ]),
      _: 3
    }, 8, ["visible", "placement", "teleported", "popper-class", "popper-options", "fallback-placements", "effect", "transition", "persistent", "onBeforeShow"])
  ], 34)), [
    [g, e.handleClickOutside, e.popperRef]
  ]);
}
var nn = /* @__PURE__ */ re(_l, [["render", ln], ["__file", "select.vue"]]);
const on = Y({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(e) {
    const n = _("select"), s = E(null), b = Ve(), r = E([]);
    rt(bt, Se({
      ...it(e)
    }));
    const f = d(() => r.value.some((i) => i.visible === !0)), l = (i) => {
      const h = [];
      return z(i.children) && i.children.forEach((c) => {
        var w, C;
        c.type && c.type.name === "ElOption" && c.component && c.component.proxy ? h.push(c.component.proxy) : (w = c.children) != null && w.length ? h.push(...l(c)) : (C = c.component) != null && C.subTree && h.push(...l(c.component.subTree));
      }), h;
    }, p = () => {
      r.value = l(b.subTree);
    };
    return $e(() => {
      p();
    }), kl(s, p, {
      attributes: !0,
      subtree: !0,
      childList: !0
    }), {
      groupRef: s,
      visible: f,
      ns: n
    };
  }
});
function sn(e, n, s, b, r, f) {
  return ie((v(), I("ul", {
    ref: "groupRef",
    class: u(e.ns.be("group", "wrap"))
  }, [
    T("li", {
      class: u(e.ns.be("group", "title"))
    }, A(e.label), 3),
    T("li", null, [
      T("ul", {
        class: u(e.ns.b("group"))
      }, [
        D(e.$slots, "default")
      ], 2)
    ])
  ], 2)), [
    [ke, e.visible]
  ]);
}
var ht = /* @__PURE__ */ re(on, [["render", sn], ["__file", "option-group.vue"]]);
const pn = pt(nn, {
  Option: Re,
  OptionGroup: ht
}), fn = mt(Re);
mt(ht);
export {
  fn as E,
  pn as a,
  cn as c
};
