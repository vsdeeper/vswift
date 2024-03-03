import { a as D, E as S, B as ao, g as W, b as j, f as no } from "./index-a443a97f.js";
import { a as X, _ as po } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { R as J } from "./constants-a6c62b18.js";
import { defineComponent as v, toRef as E, resolveComponent as I, openBlock as f, createBlock as V, withCtx as e, createVNode as o, unref as a, createElementBlock as z, Fragment as B, renderList as A, createTextVNode as h, ref as ro, isRef as uo, createElementVNode as mo, toDisplayString as so, withModifiers as N, createCommentVNode as $ } from "vue";
import { Minus as _o, Plus as q } from "@element-plus/icons-vue";
import { nanoid as G } from "nanoid";
import { first as io, last as fo } from "lodash-es";
import { A as F } from "./api-config-editor-6fa91307.js";
import { E as Q, a as Z } from "./index-01903178.js";
import { b as R, a as k } from "./index-e315910c.js";
import { E as co, a as bo } from "./index-d25df912.js";
import "pinia";
import "vuedraggable";
import "./index-db10a94d.js";
const yo = [
  { label: "固定", value: "fixed" },
  { label: "自动", value: "auto" }
], Vo = /* @__PURE__ */ v({
  __name: "table-layout-editor",
  props: {
    options: {},
    label: { default: "表格的布局方式" },
    formItemProp: { default: () => ["options", "tableLayout"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = Q, c = Z, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).tableLayout,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).tableLayout = b),
            placeholder: "请选择",
            clearable: ""
          }, {
            default: e(() => [
              (f(!0), z(B, null, A(a(yo), (b) => (f(), V(r, {
                key: b.value,
                label: `${b.label} - ${b.value}`,
                value: b.value
              }, null, 8, ["label", "value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), ho = /* @__PURE__ */ v({
  __name: "show-checkbox-editor",
  props: {
    options: {},
    label: { default: "显示复选框" },
    formItemProp: { default: () => ["options", "showCheckbox"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = R, c = k, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).showCheckbox,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).showCheckbox = b)
          }, {
            default: e(() => [
              o(r, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(r, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), Io = /* @__PURE__ */ v({
  __name: "show-pagination-editor",
  props: {
    options: {},
    label: { default: "显示分页" },
    formItemProp: { default: () => ["options", "showPagination"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = R, c = k, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).showPagination,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).showPagination = b)
          }, {
            default: e(() => [
              o(r, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(r, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), go = /* @__PURE__ */ v({
  __name: "highlight-current-row-editor",
  props: {
    options: {},
    label: { default: "高亮当前行" },
    formItemProp: { default: () => ["options", "highlightCurrentRow"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = R, c = k, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).highlightCurrentRow,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).highlightCurrentRow = b)
          }, {
            default: e(() => [
              o(r, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(r, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), vo = /* @__PURE__ */ v({
  __name: "auto-calc-max-height-editor",
  props: {
    options: {},
    label: { default: "自动计算最大高度" },
    formItemProp: { default: () => ["options", "autoCalcMaxHeight"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = R, c = k, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).autoCalcMaxHeight,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).autoCalcMaxHeight = b)
          }, {
            default: e(() => [
              o(r, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(r, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), Co = /* @__PURE__ */ v({
  __name: "flexible-editor",
  props: {
    options: {},
    label: { default: "主轴弹性" },
    formItemProp: { default: () => ["options", "flexible"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = R, c = k, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).flexible,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).flexible = b)
          }, {
            default: e(() => [
              o(r, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(r, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), Po = /* @__PURE__ */ v({
  __name: "virtualized-editor",
  props: {
    options: {},
    label: { default: "虚拟化表格" },
    formItemProp: { default: () => ["options", "virtualized"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = R, c = k, p = D;
      return f(), V(p, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(c, {
            modelValue: a(n).virtualized,
            "onUpdate:modelValue": u[0] || (u[0] = (b) => a(n).virtualized = b)
          }, {
            default: e(() => [
              o(r, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(r, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), wo = /* @__PURE__ */ v({
  __name: "row-key-editor",
  props: {
    options: {},
    label: { default: "行数据Key" },
    formItemProp: { default: () => ["options", "rowKey"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = S, c = D;
      return f(), V(c, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(r, {
            modelValue: a(n).rowKey,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => a(n).rowKey = p),
            placeholder: "请输入",
            clearable: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), Do = /* @__PURE__ */ v({
  __name: "lazy-editor",
  props: {
    options: {},
    label: { default: "懒加载子节点数据" },
    formItemProp: { default: () => ["options", "lazy"] },
    formItemRules: {}
  },
  emits: ["change"],
  setup(y, { emit: d }) {
    const l = E(y, "options");
    function u(_, r) {
      _ && (r.loadApiMethod = "GET");
    }
    return (_, r) => {
      const c = I("my-label"), p = R, b = k, T = D;
      return f(), V(T, { prop: _.formItemProp }, {
        label: e(() => [
          o(c, { label: _.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(b, {
            modelValue: a(l).lazy,
            "onUpdate:modelValue": r[0] || (r[0] = (t) => a(l).lazy = t),
            onChange: r[1] || (r[1] = (t) => u(t, a(l)))
          }, {
            default: e(() => [
              o(p, { label: !0 }, {
                default: e(() => [
                  h("是")
                ]),
                _: 1
              }),
              o(p, { label: !1 }, {
                default: e(() => [
                  h("否")
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
}), Eo = /* @__PURE__ */ v({
  __name: "item-has-children-editor",
  props: {
    options: {},
    label: { default: "hasChildren别名" },
    formItemProp: { default: () => ["options", "itemHasChildren"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = S, c = D;
      return f(), V(c, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(r, {
            modelValue: a(n).itemHasChildren,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => a(n).itemHasChildren = p),
            placeholder: "请输入",
            clearable: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), Uo = /* @__PURE__ */ v({
  __name: "item-children-editor",
  props: {
    options: {},
    label: { default: "children别名" },
    formItemProp: { default: () => ["options", "itemChildren"] },
    formItemRules: {}
  },
  setup(y) {
    const n = E(y, "options");
    return (l, u) => {
      const _ = I("my-label"), r = S, c = D;
      return f(), V(c, { prop: l.formItemProp }, {
        label: e(() => [
          o(_, { label: l.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(r, {
            modelValue: a(n).itemChildren,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => a(n).itemChildren = p),
            placeholder: "请输入",
            clearable: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), Ro = [
  { label: "左侧", value: "left" },
  { label: "右侧", value: "right" }
], ko = [
  { label: "静态数据回显", value: "displayByStaticData" },
  { label: "动态数据回显", value: "displayByDynamicData" },
  { label: "格式化日期", value: "dateFormat" }
], To = { style: { display: "flex", "justify-content": "flex-start", flex: "1" } }, $o = /* @__PURE__ */ v({
  __name: "table-column-items-editor",
  props: {
    options: {},
    formItemProp: {},
    label: {},
    isSubLevel: { type: Boolean }
  },
  setup(y) {
    var T;
    const n = E(y, "options"), l = ro((T = io(n.value.tableColumnItems)) == null ? void 0 : T.id);
    function u() {
      var t, i;
      (t = n.value.tableColumnItems) == null || t.push({ id: G(5) }), l.value = (i = fo(n.value.tableColumnItems)) == null ? void 0 : i.id;
    }
    function _(t) {
      t.tableColumnItems || (t.tableColumnItems = []), t.tableColumnItems.push({ id: G(5) });
    }
    function r(t, i) {
      i.splice(t, 1), i.length && (i[t] ? l.value = i[t].id : l.value = i[t - 1].id);
    }
    function c(t, i) {
      i.api = void 0, i.apiMethod = void 0, i.apiParams = void 0, i.staticDataKey = void 0, i.format = void 0, t === "displayByDynamicData" ? i.apiMethod = "GET" : t === "dateFormat" && (i.format = "YYYY-MM-DD HH:mm:ss");
    }
    function p(t, i) {
      return Array.isArray(i) ? [...i, "tableColumnItems", t + ""] : ["options", "tableColumnItems", t + ""];
    }
    function b(t, i) {
      return i ? `${i} / ${t ?? ""}` : `${t ?? ""}`;
    }
    return (t, i) => {
      var Y;
      const M = ao, C = I("my-label"), U = S, P = D, w = X, H = Q, K = Z, O = R, L = k, x = W, oo = j, eo = I("table-column-items-editor", !0), lo = co, to = bo;
      return f(), z(B, null, [
        (Y = a(n).tableColumnItems) != null && Y.length ? (f(), V(to, {
          key: 0,
          modelValue: a(l),
          "onUpdate:modelValue": i[0] || (i[0] = (m) => uo(l) ? l.value = m : null),
          accordion: ""
        }, {
          default: e(() => [
            (f(!0), z(B, null, A(a(n).tableColumnItems, (m, g) => (f(), V(lo, {
              key: m.id,
              name: m.id
            }, {
              title: e(() => [
                mo("div", To, "表列 - " + so(b(m.label, t.label)), 1),
                o(M, {
                  type: "danger",
                  icon: a(_o),
                  circle: "",
                  plain: "",
                  size: "small",
                  onClick: N((s) => r(g, a(n).tableColumnItems), ["stop"])
                }, null, 8, ["icon", "onClick"]),
                o(M, {
                  type: "primary",
                  icon: a(q),
                  circle: "",
                  plain: "",
                  size: "small",
                  style: { "margin-right": "10px" },
                  onClick: N((s) => _(m), ["stop"])
                }, null, 8, ["icon", "onClick"])
              ]),
              default: e(() => [
                o(oo, { gutter: a(J) }, {
                  default: e(() => [
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "prop"],
                          rules: [{ required: !0, message: "必填项" }]
                        }, {
                          label: e(() => [
                            o(C, { label: "字段名称" })
                          ]),
                          default: e(() => [
                            o(U, {
                              modelValue: m.prop,
                              "onUpdate:modelValue": (s) => m.prop = s,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "label"],
                          rules: [{ required: !0, message: "必填项" }]
                        }, {
                          label: e(() => [
                            o(C, { label: "列名称" })
                          ]),
                          default: e(() => [
                            o(U, {
                              modelValue: m.label,
                              "onUpdate:modelValue": (s) => m.label = s,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "width"]
                        }, {
                          label: e(() => [
                            o(C, { label: "列宽度" })
                          ]),
                          default: e(() => [
                            o(U, {
                              modelValue: m.width,
                              "onUpdate:modelValue": (s) => m.width = s,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "minWidth"]
                        }, {
                          label: e(() => [
                            o(C, { label: "列最小宽度" })
                          ]),
                          default: e(() => [
                            o(U, {
                              modelValue: m.minWidth,
                              "onUpdate:modelValue": (s) => m.minWidth = s,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "fixed"]
                        }, {
                          label: e(() => [
                            o(C, { label: "固定列" })
                          ]),
                          default: e(() => [
                            o(K, {
                              modelValue: m.fixed,
                              "onUpdate:modelValue": (s) => m.fixed = s,
                              placeholder: "请选择",
                              clearable: ""
                            }, {
                              default: e(() => [
                                (f(!0), z(B, null, A(a(Ro), (s) => (f(), V(H, {
                                  key: s.value,
                                  label: `${s.label} - ${s.value}`,
                                  value: s.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024),
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "showOverflowTooltip"]
                        }, {
                          label: e(() => [
                            o(C, { label: "内容超长tooltip" })
                          ]),
                          default: e(() => [
                            o(L, {
                              modelValue: m.showOverflowTooltip,
                              "onUpdate:modelValue": (s) => m.showOverflowTooltip = s
                            }, {
                              default: e(() => [
                                o(O, { label: !0 }, {
                                  default: e(() => [
                                    h("是")
                                  ]),
                                  _: 1
                                }),
                                o(O, { label: !1 }, {
                                  default: e(() => [
                                    h("否")
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
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "sortable"]
                        }, {
                          label: e(() => [
                            o(C, { label: "开启排序" })
                          ]),
                          default: e(() => [
                            o(L, {
                              modelValue: m.sortable,
                              "onUpdate:modelValue": (s) => m.sortable = s
                            }, {
                              default: e(() => [
                                o(O, { label: !0 }, {
                                  default: e(() => [
                                    h("是")
                                  ]),
                                  _: 1
                                }),
                                o(O, { label: !1 }, {
                                  default: e(() => [
                                    h("否")
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
                    o(w, null, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "formatterType"]
                        }, {
                          label: e(() => [
                            o(C, { label: "格式化类型" })
                          ]),
                          default: e(() => [
                            o(K, {
                              modelValue: m.formatterType,
                              "onUpdate:modelValue": (s) => m.formatterType = s,
                              placeholder: "请选择",
                              clearable: "",
                              onChange: (s) => c(s, m)
                            }, {
                              default: e(() => [
                                (f(!0), z(B, null, A(a(ko), (s) => (f(), V(H, {
                                  key: s.value,
                                  label: s.label,
                                  value: s.value
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
                    m.formatterType === "displayByStaticData" ? (f(), V(w, { key: 0 }, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "staticDataKey"]
                        }, {
                          label: e(() => [
                            o(C, { label: "静态数据Key" })
                          ]),
                          default: e(() => [
                            o(U, {
                              modelValue: m.staticDataKey,
                              "onUpdate:modelValue": (s) => m.staticDataKey = s,
                              placeholder: "请输入",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024)) : $("", !0),
                    m.formatterType === "dateFormat" ? (f(), V(w, { key: 1 }, {
                      default: e(() => [
                        o(P, {
                          prop: [...p(g, t.formItemProp), "format"]
                        }, {
                          label: e(() => [
                            o(C, { label: "格式化日期" })
                          ]),
                          default: e(() => [
                            o(U, {
                              modelValue: m.format,
                              "onUpdate:modelValue": (s) => m.format = s,
                              placeholder: "YYYY-MM-DD HH:mm:ss",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["prop"])
                      ]),
                      _: 2
                    }, 1024)) : $("", !0),
                    o(x, { span: 24 }, {
                      default: e(() => [
                        m.formatterType === "displayByDynamicData" ? (f(), V(a(F), {
                          key: 0,
                          options: m,
                          "form-item-prop": [...p(g, t.formItemProp)],
                          "form-item-rules": [{ required: !0 }]
                        }, null, 8, ["options", "form-item-prop"])) : $("", !0)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["gutter"]),
                o(eo, {
                  options: m,
                  "form-item-prop": p(g, t.formItemProp),
                  label: b(m.label, t.label),
                  "is-sub-level": ""
                }, null, 8, ["options", "form-item-prop", "label"])
              ]),
              _: 2
            }, 1032, ["name"]))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])) : $("", !0),
        t.isSubLevel ? $("", !0) : (f(), V(M, {
          key: 1,
          type: "primary",
          plain: "",
          icon: a(q),
          onClick: u,
          style: { width: "100%", "margin-top": "10px" }
        }, {
          default: e(() => [
            h(" 新增表列 ")
          ]),
          _: 1
        }, 8, ["icon"]))
      ], 64);
    };
  }
}), Mo = /* @__PURE__ */ no($o, [["__scopeId", "data-v-66a71a89"]]), jo = /* @__PURE__ */ v({
  __name: "d-table",
  props: {
    formData: {}
  },
  setup(y) {
    return (d, n) => {
      const l = X, u = Vo, _ = Eo, r = Uo, c = wo, p = Do, b = Po, T = vo, t = ho, i = go, M = Io, C = Co, U = W, P = I("my-divider-title"), w = Mo, H = j;
      return f(), V(H, { gutter: a(J) }, {
        default: e(() => [
          o(l, null, {
            default: e(() => [
              o(a(po), { "form-data": d.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(u, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(_, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(r, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(c, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(p, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(b, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(T, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(t, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(i, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(M, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(l, null, {
            default: e(() => [
              o(C, {
                options: d.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(U, { span: 24 }, {
            default: e(() => [
              o(a(F), {
                options: d.formData.options,
                "form-item-rules": [{ required: !0 }],
                "api-label": "列表接口",
                "params-label": "接口参数"
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          d.formData.options.lazy ? (f(), V(U, {
            key: 0,
            span: 24
          }, {
            default: e(() => [
              o(a(F), {
                options: d.formData.options,
                "form-item-rules": [{ required: !0 }],
                map: { api: "loadApi", apiMethod: "loadApiMethod", apiParams: "loadApiParams" },
                "api-label": "懒加载子节点接口",
                "params-label": "接口参数"
              }, null, 8, ["options"])
            ]),
            _: 1
          })) : $("", !0),
          o(U, { span: 24 }, {
            default: e(() => [
              o(P, { label: "表列设置" }),
              o(w, {
                options: d.formData.options
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
  jo as default
};
