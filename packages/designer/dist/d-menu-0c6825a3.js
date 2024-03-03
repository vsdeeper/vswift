import { a as b, g as O, b as g } from "./index-a443a97f.js";
import { R as C } from "./constants-a6c62b18.js";
import { _ as D, a as T } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as d, toRef as E, resolveComponent as v, openBlock as s, createBlock as c, withCtx as e, createVNode as o, unref as n, createElementBlock as I, Fragment as P, renderList as V, createTextVNode as R } from "vue";
import { E as $, a as y } from "./index-01903178.js";
import { b as k, a as B } from "./index-e315910c.js";
import "@element-plus/icons-vue";
import { A as F } from "./api-config-editor-6fa91307.js";
import "nanoid";
import "lodash-es";
import "pinia";
import "vuedraggable";
import "./index-db10a94d.js";
const N = [
  { label: "水平方向", value: "horizontal" },
  { label: "垂直方向", value: "vertical" }
], U = /* @__PURE__ */ d({
  __name: "mode-editor",
  props: {
    options: {},
    label: { default: "菜单展示模式" },
    formItemProp: { default: () => ["options", "mode"] },
    formItemRules: {}
  },
  setup(i) {
    const r = E(i, "options");
    return (t, a) => {
      const u = v("my-label"), m = $, _ = y, f = b;
      return s(), c(f, { prop: t.formItemProp }, {
        label: e(() => [
          o(u, { label: t.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(_, {
            modelValue: n(r).mode,
            "onUpdate:modelValue": a[0] || (a[0] = (l) => n(r).mode = l),
            placeholder: "请选择",
            clearable: ""
          }, {
            default: e(() => [
              (s(!0), I(P, null, V(n(N), (l) => (s(), c(m, {
                key: l.value,
                label: `${l.label} - ${l.value}`,
                value: l.value
              }, null, 8, ["label", "value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), h = /* @__PURE__ */ d({
  __name: "router-editor",
  props: {
    options: {},
    label: { default: "启用 vue-router 模式" },
    formItemProp: { default: () => ["options", "router"] },
    formItemRules: {}
  },
  setup(i) {
    const r = E(i, "options");
    return (t, a) => {
      const u = v("my-label"), m = k, _ = B, f = b;
      return s(), c(f, { prop: t.formItemProp }, {
        label: e(() => [
          o(u, { label: t.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(_, {
            modelValue: n(r).router,
            "onUpdate:modelValue": a[0] || (a[0] = (l) => n(r).router = l)
          }, {
            default: e(() => [
              o(m, { label: !0 }, {
                default: e(() => [
                  R("是")
                ]),
                _: 1
              }),
              o(m, { label: !1 }, {
                default: e(() => [
                  R("否")
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
}), w = [
  { label: "暗黑", value: "dark" },
  { label: "明亮", value: "light" }
], S = /* @__PURE__ */ d({
  __name: "popper-effect-editor",
  props: {
    options: {},
    label: { default: "Tooltip 主题" },
    formItemProp: { default: () => ["options", "popperEffect"] },
    formItemRules: {}
  },
  setup(i) {
    const r = E(i, "options");
    return (t, a) => {
      const u = v("my-label"), m = $, _ = y, f = b;
      return s(), c(f, { prop: t.formItemProp }, {
        label: e(() => [
          o(u, { label: t.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(_, {
            modelValue: n(r).popperEffect,
            "onUpdate:modelValue": a[0] || (a[0] = (l) => n(r).popperEffect = l),
            placeholder: "请选择",
            clearable: ""
          }, {
            default: e(() => [
              (s(!0), I(P, null, V(n(w), (l) => (s(), c(m, {
                key: l.value,
                label: `${l.label} - ${l.value}`,
                value: l.value
              }, null, 8, ["label", "value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), Y = /* @__PURE__ */ d({
  __name: "d-menu",
  props: {
    formData: {}
  },
  setup(i) {
    return (p, r) => {
      const t = T, a = U, u = h, m = S, _ = O, f = g;
      return s(), c(f, { gutter: n(C) }, {
        default: e(() => [
          o(t, null, {
            default: e(() => [
              o(n(D), { "form-data": p.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          o(t, null, {
            default: e(() => [
              o(a, {
                options: p.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(t, null, {
            default: e(() => [
              o(u, {
                options: p.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(t, null, {
            default: e(() => [
              o(m, {
                options: p.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(_, { span: 24 }, {
            default: e(() => [
              o(n(F), {
                options: p.formData.options,
                "form-item-rules": [{ required: !0 }],
                "api-label": "菜单接口",
                "params-label": "接口参数"
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
  Y as default
};
