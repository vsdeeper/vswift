import { D as Me, h as Q, F as ue, G as ve, t as re, u as Z, H as _e, c as he, J as Ae, K as Le, e as W, L as j, U as ye, n as fe, r as xe, k as De, M as me, w as Fe, d as qe, E as Ve, a as Ce, B as ge, b as de, f as Ye, g as Te } from "./index-a443a97f.js";
import { a as Ee, _ as Ke } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { shallowRef as Ge, isVNode as He, defineComponent as A, getCurrentInstance as ee, inject as ie, ref as N, watch as M, nextTick as ce, openBlock as k, createElementBlock as z, normalizeClass as Se, unref as C, normalizeStyle as We, computed as X, onMounted as ke, onUpdated as je, createVNode as e, provide as Je, renderSlot as se, useSlots as Xe, reactive as Qe, onUnmounted as Ze, withDirectives as el, vShow as ll, createCommentVNode as Y, mergeModels as al, useModel as tl, Fragment as x, renderList as J, createBlock as q, withCtx as l, createElementVNode as Ue, createTextVNode as O, toRef as ol, resolveComponent as we, isRef as nl, toDisplayString as sl, withModifiers as ul } from "vue";
import { R as Ne } from "./constants-a6c62b18.js";
import { ArrowLeft as rl, ArrowRight as dl, Close as il, Plus as pe, Minus as $e, Refresh as cl } from "@element-plus/icons-vue";
import { nanoid as pl } from "nanoid";
import { first as fl, last as ml } from "lodash-es";
import { A as bl } from "./api-config-editor-6fa91307.js";
import { c as D, E as vl, a as _l } from "./index-01903178.js";
import { b as hl, a as yl } from "./index-e315910c.js";
import { E as Vl, a as Cl } from "./index-d25df912.js";
import "pinia";
import "vuedraggable";
import "./index-db10a94d.js";
const gl = (n, c, d) => Me(n.subTree).filter((s) => {
  var p;
  return He(s) && ((p = s.type) == null ? void 0 : p.name) === c && !!s.component;
}).map((s) => s.component.uid).map((s) => d[s]).filter((s) => !!s), Tl = (n, c) => {
  const d = {}, S = Ge([]);
  return {
    children: S,
    addChild: (p) => {
      d[p.uid] = p, S.value = gl(n, c, d);
    },
    removeChild: (p) => {
      delete d[p], S.value = S.value.filter((I) => I.uid !== p);
    }
  };
}, le = Symbol("tabsRootContextKey"), El = Q({
  tabs: {
    type: ue(Array),
    default: () => ve([])
  }
}), Pe = "ElTabBar", Sl = A({
  name: Pe
}), kl = /* @__PURE__ */ A({
  ...Sl,
  props: El,
  setup(n, { expose: c }) {
    const d = n, S = ee(), b = ie(le);
    b || re(Pe, "<el-tabs><el-tab-bar /></el-tabs>");
    const s = Z("tabs"), p = N(), I = N(), g = () => {
      let y = 0, r = 0;
      const o = ["top", "bottom"].includes(b.props.tabPosition) ? "width" : "height", f = o === "width" ? "x" : "y", m = f === "x" ? "left" : "top";
      return d.tabs.every((u) => {
        var i, v;
        const $ = (v = (i = S.parent) == null ? void 0 : i.refs) == null ? void 0 : v[`tab-${u.uid}`];
        if (!$)
          return !1;
        if (!u.active)
          return !0;
        y = $[`offset${D(m)}`], r = $[`client${D(o)}`];
        const B = window.getComputedStyle($);
        return o === "width" && (d.tabs.length > 1 && (r -= Number.parseFloat(B.paddingLeft) + Number.parseFloat(B.paddingRight)), y += Number.parseFloat(B.paddingLeft)), !1;
      }), {
        [o]: `${r}px`,
        transform: `translate${D(f)}(${y}px)`
      };
    }, E = () => I.value = g();
    return M(() => d.tabs, async () => {
      await ce(), E();
    }, { immediate: !0 }), _e(p, () => E()), c({
      ref: p,
      update: E
    }), (y, r) => (k(), z("div", {
      ref_key: "barRef",
      ref: p,
      class: Se([C(s).e("active-bar"), C(s).is(C(b).props.tabPosition)]),
      style: We(I.value)
    }, null, 6));
  }
});
var Ul = /* @__PURE__ */ he(kl, [["__file", "tab-bar.vue"]]);
const wl = Q({
  panes: {
    type: ue(Array),
    default: () => ve([])
  },
  currentName: {
    type: [String, Number],
    default: ""
  },
  editable: Boolean,
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  stretch: Boolean
}), Nl = {
  tabClick: (n, c, d) => d instanceof Event,
  tabRemove: (n, c) => c instanceof Event
}, be = "ElTabNav", $l = A({
  name: be,
  props: wl,
  emits: Nl,
  setup(n, {
    expose: c,
    emit: d
  }) {
    const S = ee(), b = ie(le);
    b || re(be, "<el-tabs><tab-nav /></el-tabs>");
    const s = Z("tabs"), p = Ae(), I = Le(), g = N(), E = N(), y = N(), r = N(), o = N(!1), f = N(0), m = N(!1), u = N(!0), i = X(() => ["top", "bottom"].includes(b.props.tabPosition) ? "width" : "height"), v = X(() => ({
      transform: `translate${i.value === "width" ? "X" : "Y"}(-${f.value}px)`
    })), $ = () => {
      if (!g.value)
        return;
      const V = g.value[`offset${D(i.value)}`], T = f.value;
      if (!T)
        return;
      const _ = T > V ? T - V : 0;
      f.value = _;
    }, B = () => {
      if (!g.value || !E.value)
        return;
      const V = E.value[`offset${D(i.value)}`], T = g.value[`offset${D(i.value)}`], _ = f.value;
      if (V - _ <= T)
        return;
      const P = V - _ > T * 2 ? _ + T : V - T;
      f.value = P;
    }, R = async () => {
      const V = E.value;
      if (!o.value || !y.value || !g.value || !V)
        return;
      await ce();
      const T = y.value.querySelector(".is-active");
      if (!T)
        return;
      const _ = g.value, P = ["top", "bottom"].includes(b.props.tabPosition), U = T.getBoundingClientRect(), a = _.getBoundingClientRect(), h = P ? V.offsetWidth - a.width : V.offsetHeight - a.height, t = f.value;
      let w = t;
      P ? (U.left < a.left && (w = t - (a.left - U.left)), U.right > a.right && (w = t + U.right - a.right)) : (U.top < a.top && (w = t - (a.top - U.top)), U.bottom > a.bottom && (w = t + (U.bottom - a.bottom))), w = Math.max(w, 0), f.value = Math.min(w, h);
    }, L = () => {
      var V;
      if (!E.value || !g.value)
        return;
      n.stretch && ((V = r.value) == null || V.update());
      const T = E.value[`offset${D(i.value)}`], _ = g.value[`offset${D(i.value)}`], P = f.value;
      _ < T ? (o.value = o.value || {}, o.value.prev = P, o.value.next = P + _ < T, T - P < _ && (f.value = T - _)) : (o.value = !1, P > 0 && (f.value = 0));
    }, G = (V) => {
      const T = V.code, {
        up: _,
        down: P,
        left: U,
        right: a
      } = j;
      if (![_, P, U, a].includes(T))
        return;
      const h = Array.from(V.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")), t = h.indexOf(V.target);
      let w;
      T === U || T === _ ? t === 0 ? w = h.length - 1 : w = t - 1 : t < h.length - 1 ? w = t + 1 : w = 0, h[w].focus({
        preventScroll: !0
      }), h[w].click(), H();
    }, H = () => {
      u.value && (m.value = !0);
    }, K = () => m.value = !1;
    return M(p, (V) => {
      V === "hidden" ? u.value = !1 : V === "visible" && setTimeout(() => u.value = !0, 50);
    }), M(I, (V) => {
      V ? setTimeout(() => u.value = !0, 50) : u.value = !1;
    }), _e(y, L), ke(() => setTimeout(() => R(), 0)), je(() => L()), c({
      scrollToActiveTab: R,
      removeFocus: K
    }), M(() => n.panes, () => S.update(), {
      flush: "post",
      deep: !0
    }), () => {
      const V = o.value ? [e("span", {
        class: [s.e("nav-prev"), s.is("disabled", !o.value.prev)],
        onClick: $
      }, [e(W, null, {
        default: () => [e(rl, null, null)]
      })]), e("span", {
        class: [s.e("nav-next"), s.is("disabled", !o.value.next)],
        onClick: B
      }, [e(W, null, {
        default: () => [e(dl, null, null)]
      })])] : null, T = n.panes.map((_, P) => {
        var U, a, h, t;
        const w = _.uid, ae = _.props.disabled, te = (a = (U = _.props.name) != null ? U : _.index) != null ? a : `${P}`, oe = !ae && (_.isClosable || n.editable);
        _.index = `${P}`;
        const Be = oe ? e(W, {
          class: "is-icon-close",
          onClick: (F) => d("tabRemove", _, F)
        }, {
          default: () => [e(il, null, null)]
        }) : null, Oe = ((t = (h = _.slots).label) == null ? void 0 : t.call(h)) || _.props.label, ze = !ae && _.active ? 0 : -1;
        return e("div", {
          ref: `tab-${w}`,
          class: [s.e("item"), s.is(b.props.tabPosition), s.is("active", _.active), s.is("disabled", ae), s.is("closable", oe), s.is("focus", m.value)],
          id: `tab-${te}`,
          key: `tab-${w}`,
          "aria-controls": `pane-${te}`,
          role: "tab",
          "aria-selected": _.active,
          tabindex: ze,
          onFocus: () => H(),
          onBlur: () => K(),
          onClick: (F) => {
            K(), d("tabClick", _, te, F);
          },
          onKeydown: (F) => {
            oe && (F.code === j.delete || F.code === j.backspace) && d("tabRemove", _, F);
          }
        }, [Oe, Be]);
      });
      return e("div", {
        ref: y,
        class: [s.e("nav-wrap"), s.is("scrollable", !!o.value), s.is(b.props.tabPosition)]
      }, [V, e("div", {
        class: s.e("nav-scroll"),
        ref: g
      }, [e("div", {
        class: [s.e("nav"), s.is(b.props.tabPosition), s.is("stretch", n.stretch && ["top", "bottom"].includes(b.props.tabPosition))],
        ref: E,
        style: v.value,
        role: "tablist",
        onKeydown: G
      }, [n.type ? null : e(Ul, {
        ref: r,
        tabs: [...n.panes]
      }, null), T])])]);
    };
  }
}), Pl = Q({
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number]
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ["top", "right", "bottom", "left"],
    default: "top"
  },
  beforeLeave: {
    type: ue(Function),
    default: () => !0
  },
  stretch: Boolean
}), ne = (n) => xe(n) || De(n), Il = {
  [ye]: (n) => ne(n),
  tabClick: (n, c) => c instanceof Event,
  tabChange: (n) => ne(n),
  edit: (n, c) => ["remove", "add"].includes(c),
  tabRemove: (n) => ne(n),
  tabAdd: () => !0
}, Rl = A({
  name: "ElTabs",
  props: Pl,
  emits: Il,
  setup(n, {
    emit: c,
    slots: d,
    expose: S
  }) {
    var b;
    const s = Z("tabs"), {
      children: p,
      addChild: I,
      removeChild: g
    } = Tl(ee(), "ElTabPane"), E = N(), y = N((b = n.modelValue) != null ? b : "0"), r = async (u, i = !1) => {
      var v, $, B;
      if (!(y.value === u || fe(u)))
        try {
          await ((v = n.beforeLeave) == null ? void 0 : v.call(n, u, y.value)) !== !1 && (y.value = u, i && (c(ye, u), c("tabChange", u)), (B = ($ = E.value) == null ? void 0 : $.removeFocus) == null || B.call($));
        } catch {
        }
    }, o = (u, i, v) => {
      u.props.disabled || (r(i, !0), c("tabClick", u, v));
    }, f = (u, i) => {
      u.props.disabled || fe(u.props.name) || (i.stopPropagation(), c("edit", u.props.name, "remove"), c("tabRemove", u.props.name));
    }, m = () => {
      c("edit", void 0, "add"), c("tabAdd");
    };
    return M(() => n.modelValue, (u) => r(u)), M(y, async () => {
      var u;
      await ce(), (u = E.value) == null || u.scrollToActiveTab();
    }), Je(le, {
      props: n,
      currentName: y,
      registerPane: I,
      unregisterPane: g
    }), S({
      currentName: y
    }), () => {
      const u = d["add-icon"], i = n.editable || n.addable ? e("span", {
        class: s.e("new-tab"),
        tabindex: "0",
        onClick: m,
        onKeydown: (B) => {
          B.code === j.enter && m();
        }
      }, [u ? se(d, "add-icon") : e(W, {
        class: s.is("icon-plus")
      }, {
        default: () => [e(pe, null, null)]
      })]) : null, v = e("div", {
        class: [s.e("header"), s.is(n.tabPosition)]
      }, [i, e($l, {
        ref: E,
        currentName: y.value,
        editable: n.editable,
        type: n.type,
        panes: p.value,
        stretch: n.stretch,
        onTabClick: o,
        onTabRemove: f
      }, null)]), $ = e("div", {
        class: s.e("content")
      }, [se(d, "default")]);
      return e("div", {
        class: [s.b(), s.m(n.tabPosition), {
          [s.m("card")]: n.type === "card",
          [s.m("border-card")]: n.type === "border-card"
        }]
      }, [...n.tabPosition !== "bottom" ? [v, $] : [$, v]]);
    };
  }
}), Bl = Q({
  label: {
    type: String,
    default: ""
  },
  name: {
    type: [String, Number]
  },
  closable: Boolean,
  disabled: Boolean,
  lazy: Boolean
}), Ol = ["id", "aria-hidden", "aria-labelledby"], Ie = "ElTabPane", zl = A({
  name: Ie
}), Ml = /* @__PURE__ */ A({
  ...zl,
  props: Bl,
  setup(n) {
    const c = n, d = ee(), S = Xe(), b = ie(le);
    b || re(Ie, "usage: <el-tabs><el-tab-pane /></el-tabs/>");
    const s = Z("tab-pane"), p = N(), I = X(() => c.closable || b.props.closable), g = me(() => {
      var f;
      return b.currentName.value === ((f = c.name) != null ? f : p.value);
    }), E = N(g.value), y = X(() => {
      var f;
      return (f = c.name) != null ? f : p.value;
    }), r = me(() => !c.lazy || E.value || g.value);
    M(g, (f) => {
      f && (E.value = !0);
    });
    const o = Qe({
      uid: d.uid,
      slots: S,
      props: c,
      paneName: y,
      active: g,
      index: p,
      isClosable: I
    });
    return ke(() => {
      b.registerPane(o);
    }), Ze(() => {
      b.unregisterPane(o.uid);
    }), (f, m) => C(r) ? el((k(), z("div", {
      key: 0,
      id: `pane-${C(y)}`,
      class: Se(C(s).b()),
      role: "tabpanel",
      "aria-hidden": !C(g),
      "aria-labelledby": `tab-${C(y)}`
    }, [
      se(f.$slots, "default")
    ], 10, Ol)), [
      [ll, C(g)]
    ]) : Y("v-if", !0);
  }
});
var Re = /* @__PURE__ */ he(Ml, [["__file", "tab-pane.vue"]]);
const Al = Fe(Rl, {
  TabPane: Re
}), Ll = qe(Re), xl = { class: "option-items-config" }, Dl = { class: "btns" }, Fl = /* @__PURE__ */ A({
  __name: "option-items-config",
  props: /* @__PURE__ */ al({
    index: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const c = tl(n, "modelValue"), d = N();
    M(c, (p) => {
      d.value = p;
    }), M(d, (p) => {
      c.value = p;
    });
    function S(p) {
      d.value.splice(p, 1);
    }
    function b() {
      d.value || (d.value = []), d.value.push({});
    }
    function s() {
      d.value = [{}];
    }
    return (p, I) => {
      const g = Ve, E = Ce, y = ge, r = de;
      return k(), z("div", xl, [
        (k(!0), z(x, null, J(C(d), (o, f) => (k(), q(r, {
          key: o.value,
          align: "middle"
        }, {
          default: l(() => [
            e(E, {
              prop: ["options", "searchConditionItems", p.index + "", "options", f + "", "value"],
              rules: [{ required: !0, message: "必填项" }],
              "show-message": !1,
              style: { width: "100px", "margin-right": "5px" }
            }, {
              default: l(() => [
                e(g, {
                  modelValue: o.value,
                  "onUpdate:modelValue": (m) => o.value = m,
                  class: "input",
                  placeholder: "选项值"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["prop"]),
            e(E, {
              prop: ["options", "searchConditionItems", p.index + "", "options", f + "", "label"],
              rules: [{ required: !0, message: "必填项" }],
              "show-message": !1,
              style: { flex: "1" }
            }, {
              default: l(() => [
                e(g, {
                  modelValue: o.label,
                  "onUpdate:modelValue": (m) => o.label = m,
                  placeholder: "选项名称"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1032, ["prop"]),
            e(y, {
              type: "danger",
              size: "small",
              icon: C($e),
              plain: "",
              circle: "",
              onClick: I[0] || (I[0] = (m) => S(p.index)),
              style: { "margin-left": "8px" }
            }, null, 8, ["icon"])
          ]),
          _: 2
        }, 1024))), 128)),
        Ue("div", Dl, [
          e(y, {
            type: "primary",
            plain: "",
            icon: C(pe),
            onClick: b
          }, {
            default: l(() => [
              O(" 新增选项 ")
            ]),
            _: 1
          }, 8, ["icon"]),
          e(y, {
            type: "primary",
            plain: "",
            icon: C(cl),
            onClick: s
          }, {
            default: l(() => [
              O(" 重设选择项 ")
            ]),
            _: 1
          }, 8, ["icon"])
        ])
      ]);
    };
  }
}), ql = /* @__PURE__ */ Ye(Fl, [["__scopeId", "data-v-e31551d0"]]), Yl = [
  { label: "输入框", value: "Input" },
  { label: "数字输入框", value: "InputNumber" },
  { label: "选择器", value: "Select" },
  { label: "级联选择器", value: "Cascader" },
  { label: "日期选择器", value: "DatePicker" }
], Kl = [
  { label: "年份", value: "year" },
  { label: "月份", value: "month" },
  { label: "日期", value: "date" },
  { label: "星期", value: "week" },
  { label: "多选日期", value: "dates" },
  { label: "日期时间", value: "datetime" },
  { label: "日期范围", value: "daterange" },
  { label: "日期时间范围", value: "datetimerange" },
  { label: "月范围", value: "monthrange" }
], Gl = { style: { display: "flex", "justify-content": "flex-start", flex: "1" } }, Hl = /* @__PURE__ */ A({
  __name: "search-condition-items-editor",
  props: {
    options: {}
  },
  setup(n) {
    var y;
    const d = ol(n, "options"), S = N([]), b = N((y = fl(d.value.searchConditionItems)) == null ? void 0 : y.id);
    function s() {
      var r, o;
      (r = d.value.searchConditionItems) == null || r.push({ id: pl(5) }), b.value = (o = ml(d.value.searchConditionItems)) == null ? void 0 : o.id;
    }
    function p(r, o) {
      o.splice(r, 1), o.length && (o[r] ? b.value = o[r].id : b.value = o[r - 1].id);
    }
    function I(r, o) {
      switch (g(o), r) {
        case "Select":
        case "Cascader": {
          o.dataSource = "api", o.apiMethod = "GET", o.itemValue = "id";
          break;
        }
        case "DatePicker": {
          o.dateType = "date", o.format = "YYYY-MM-DD", o.valueFormat = "x";
          break;
        }
      }
    }
    function g(r) {
      r.dataSource = void 0, r.api = void 0, r.apiMethod = void 0, r.apiParams = void 0, r.options = void 0, r.itemLabel = void 0, r.multiple = void 0, r.checkStrictly = void 0, r.lazy = void 0, r.format = void 0, r.valueFormat = void 0, r.dateType = void 0, r.virtualized = void 0;
    }
    function E(r, o, f) {
      var m, u;
      r === "custom" ? (o.dataSource = "custom", o.api = void 0, o.apiMethod = void 0, o.apiParams = void 0, o.itemValue = void 0, o.options = [{}]) : r === "api" && (o.dataSource = "api", o.apiMethod = "GET", o.options = void 0, o.itemValue = "id", (u = (m = S.value[f]) == null ? void 0 : m.formItemRef) == null || u.clearValidate(), setTimeout(() => {
        var i, v;
        return (v = (i = S.value[f]) == null ? void 0 : i.formItemRef) == null ? void 0 : v.clearValidate();
      }));
    }
    return (r, o) => {
      var U;
      const f = ge, m = we("my-label"), u = Ve, i = Ce, v = Ee, $ = vl, B = _l, R = hl, L = yl, G = Ll, H = ql, K = Al, V = Te, T = de, _ = Vl, P = Cl;
      return k(), z(x, null, [
        (U = C(d).searchConditionItems) != null && U.length ? (k(), q(P, {
          key: 0,
          modelValue: C(b),
          "onUpdate:modelValue": o[0] || (o[0] = (a) => nl(b) ? b.value = a : null),
          accordion: ""
        }, {
          default: l(() => [
            (k(!0), z(x, null, J(C(d).searchConditionItems, (a, h) => (k(), q(_, {
              key: a.id,
              name: a.id
            }, {
              title: l(() => [
                Ue("div", Gl, "搜索条件 - " + sl(a.placeholder), 1),
                e(f, {
                  type: "danger",
                  icon: C($e),
                  circle: "",
                  plain: "",
                  size: "small",
                  style: { "margin-right": "10px" },
                  onClick: ul((t) => p(h, C(d).searchConditionItems), ["stop"])
                }, null, 8, ["icon", "onClick"])
              ]),
              default: l(() => [
                e(T, { gutter: C(Ne) }, {
                  default: l(() => [
                    e(v, null, {
                      default: l(() => [
                        e(i, {
                          prop: ["options", "searchConditionItems", h + "", "placeholder"],
                          rules: [{ required: !0, message: "必填项" }]
                        }, {
                          label: l(() => [
                            e(m, { label: "搜索名称" })
                          ]),
                          default: l(() => [
                            e(u, {
                              modelValue: a.placeholder,
                              "onUpdate:modelValue": (t) => a.placeholder = t,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    e(v, null, {
                      default: l(() => [
                        e(i, {
                          prop: ["options", "searchConditionItems", h + "", "type"],
                          rules: [{ required: !0, message: "必填项" }]
                        }, {
                          label: l(() => [
                            e(m, { label: "搜索类型" })
                          ]),
                          default: l(() => [
                            e(B, {
                              modelValue: a.type,
                              "onUpdate:modelValue": (t) => a.type = t,
                              placeholder: "请选择",
                              clearable: "",
                              onChange: (t) => I(t, a)
                            }, {
                              default: l(() => [
                                (k(!0), z(x, null, J(C(Yl), (t) => (k(), q($, {
                                  key: t.value,
                                  label: `${t.label} - ${t.value}`,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    e(v, null, {
                      default: l(() => [
                        e(i, {
                          prop: ["options", "searchConditionItems", h + "", "key"],
                          rules: [{ required: !0, message: "必填项" }]
                        }, {
                          label: l(() => [
                            e(m, { label: "字段名称" })
                          ]),
                          default: l(() => [
                            e(u, {
                              modelValue: a.key,
                              "onUpdate:modelValue": (t) => a.key = t,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    a.type === "DatePicker" ? (k(), z(x, { key: 0 }, [
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "format"]
                          }, {
                            label: l(() => [
                              e(m, { label: "显示在输入框中的格式" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.format,
                                "onUpdate:modelValue": (t) => a.format = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "valueFormat"]
                          }, {
                            label: l(() => [
                              e(m, { label: "绑定值的格式" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.valueFormat,
                                "onUpdate:modelValue": (t) => a.valueFormat = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "dateType"]
                          }, {
                            label: l(() => [
                              e(m, { label: "显示类型" })
                            ]),
                            default: l(() => [
                              e(B, {
                                modelValue: a.dateType,
                                "onUpdate:modelValue": (t) => a.dateType = t,
                                placeholder: "请选择",
                                clearable: ""
                              }, {
                                default: l(() => [
                                  (k(!0), z(x, null, J(C(Kl), (t) => (k(), q($, {
                                    key: t.value,
                                    label: `${t.label} - ${t.value}`,
                                    value: t.value
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024)
                    ], 64)) : Y("", !0),
                    a.type === "Select" ? (k(), z(x, { key: 1 }, [
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "itemLabel"]
                          }, {
                            label: l(() => [
                              e(m, { label: "label别名" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.itemLabel,
                                "onUpdate:modelValue": (t) => a.itemLabel = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "itemValue"]
                          }, {
                            label: l(() => [
                              e(m, { label: "value别名" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.itemValue,
                                "onUpdate:modelValue": (t) => a.itemValue = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "multiple"]
                          }, {
                            label: l(() => [
                              e(m, { label: "多选" })
                            ]),
                            default: l(() => [
                              e(L, {
                                modelValue: a.multiple,
                                "onUpdate:modelValue": (t) => a.multiple = t
                              }, {
                                default: l(() => [
                                  e(R, { label: !0 }, {
                                    default: l(() => [
                                      O("是")
                                    ]),
                                    _: 1
                                  }),
                                  e(R, { label: !1 }, {
                                    default: l(() => [
                                      O("否")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "virtualized"]
                          }, {
                            label: l(() => [
                              e(m, { label: "虚拟化选择器" })
                            ]),
                            default: l(() => [
                              e(L, {
                                modelValue: a.virtualized,
                                "onUpdate:modelValue": (t) => a.virtualized = t
                              }, {
                                default: l(() => [
                                  e(R, { label: !0 }, {
                                    default: l(() => [
                                      O("是")
                                    ]),
                                    _: 1
                                  }),
                                  e(R, { label: !1 }, {
                                    default: l(() => [
                                      O("否")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024)
                    ], 64)) : Y("", !0),
                    a.type === "Cascader" ? (k(), z(x, { key: 2 }, [
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "itemLabel"]
                          }, {
                            label: l(() => [
                              e(m, { label: "label别名" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.itemLabel,
                                "onUpdate:modelValue": (t) => a.itemLabel = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "itemValue"]
                          }, {
                            label: l(() => [
                              e(m, { label: "value别名" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.itemValue,
                                "onUpdate:modelValue": (t) => a.itemValue = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "itemChildren"]
                          }, {
                            label: l(() => [
                              e(m, { label: "children别名" })
                            ]),
                            default: l(() => [
                              e(u, {
                                modelValue: a.itemChildren,
                                "onUpdate:modelValue": (t) => a.itemChildren = t,
                                placeholder: "请输入",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "multiple"]
                          }, {
                            label: l(() => [
                              e(m, { label: "多选" })
                            ]),
                            default: l(() => [
                              e(L, {
                                modelValue: a.multiple,
                                "onUpdate:modelValue": (t) => a.multiple = t
                              }, {
                                default: l(() => [
                                  e(R, { label: !0 }, {
                                    default: l(() => [
                                      O("是")
                                    ]),
                                    _: 1
                                  }),
                                  e(R, { label: !1 }, {
                                    default: l(() => [
                                      O("否")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "checkStrictly"]
                          }, {
                            label: l(() => [
                              e(m, { label: "父子节点不互相关联" })
                            ]),
                            default: l(() => [
                              e(L, {
                                modelValue: a.checkStrictly,
                                "onUpdate:modelValue": (t) => a.checkStrictly = t
                              }, {
                                default: l(() => [
                                  e(R, { label: !0 }, {
                                    default: l(() => [
                                      O("是")
                                    ]),
                                    _: 1
                                  }),
                                  e(R, { label: !1 }, {
                                    default: l(() => [
                                      O("否")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024),
                      e(v, null, {
                        default: l(() => [
                          e(i, {
                            prop: ["options", "searchConditionItems", h + "", "lazy"]
                          }, {
                            label: l(() => [
                              e(m, { label: "动态加载子节点" })
                            ]),
                            default: l(() => [
                              e(L, {
                                modelValue: a.lazy,
                                "onUpdate:modelValue": (t) => a.lazy = t
                              }, {
                                default: l(() => [
                                  e(R, { label: !0 }, {
                                    default: l(() => [
                                      O("是")
                                    ]),
                                    _: 1
                                  }),
                                  e(R, { label: !1 }, {
                                    default: l(() => [
                                      O("否")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["prop"])
                        ]),
                        _: 2
                      }, 1024)
                    ], 64)) : Y("", !0),
                    a.type === "Select" || a.type === "Cascader" ? (k(), q(V, {
                      key: 3,
                      span: 24,
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: l(() => [
                        e(K, {
                          modelValue: a.dataSource,
                          "onUpdate:modelValue": (t) => a.dataSource = t,
                          onTabChange: (t) => E(t, a, h)
                        }, {
                          default: l(() => [
                            e(G, {
                              label: "接口定义",
                              name: "api"
                            }, {
                              default: l(() => [
                                e(C(bl), {
                                  ref_for: !0,
                                  ref: (t) => C(S)[h] = t,
                                  options: a,
                                  "form-item-prop": ["options", "searchConditionItems", h + ""],
                                  "form-item-rules": [{ required: !0 }],
                                  "show-message": !1
                                }, null, 8, ["options", "form-item-prop"])
                              ]),
                              _: 2
                            }, 1024),
                            e(G, {
                              label: "自定义",
                              name: "custom",
                              disabled: a.type === "Cascader"
                            }, {
                              default: l(() => [
                                e(H, {
                                  modelValue: a.options,
                                  "onUpdate:modelValue": (t) => a.options = t,
                                  index: h
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "index"])
                              ]),
                              _: 2
                            }, 1032, ["disabled"])
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "onTabChange"])
                      ]),
                      _: 2
                    }, 1024)) : Y("", !0)
                  ]),
                  _: 2
                }, 1032, ["gutter"])
              ]),
              _: 2
            }, 1032, ["name"]))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])) : Y("", !0),
        e(f, {
          type: "primary",
          plain: "",
          icon: C(pe),
          onClick: s,
          style: { width: "100%", "margin-top": "10px" }
        }, {
          default: l(() => [
            O(" 新增搜索条件 ")
          ]),
          _: 1
        }, 8, ["icon"])
      ], 64);
    };
  }
}), ra = /* @__PURE__ */ A({
  __name: "d-search",
  props: {
    formData: {}
  },
  setup(n) {
    return (c, d) => {
      const S = Ee, b = we("my-divider-title"), s = Te, p = de;
      return k(), q(p, { gutter: C(Ne) }, {
        default: l(() => [
          e(S, null, {
            default: l(() => [
              e(C(Ke), { "form-data": c.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          e(s, { span: 24 }, {
            default: l(() => [
              e(b, { label: "搜索条件设置" }),
              e(C(Hl), {
                options: c.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["gutter"]);
    };
  }
});
export {
  ra as default
};
