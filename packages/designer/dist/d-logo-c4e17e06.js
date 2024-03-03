import { E as h, a as I, e as D, f as R, b as w } from "./index-a443a97f.js";
import { _ as $, a as k } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as b, toRef as y, resolveComponent as d, openBlock as m, createBlock as c, withCtx as l, createVNode as o, unref as n, createElementBlock as v, Fragment as P, renderList as S, resolveDynamicComponent as g, createElementVNode as C, toDisplayString as z } from "vue";
import { R as B } from "./constants-a6c62b18.js";
import { _ as U } from "./height-editor.vue_vue_type_script_setup_true_lang-5fa30407.js";
import { _ as A } from "./name-editor.vue_vue_type_script_setup_true_lang-5d305b85.js";
import * as E from "@element-plus/icons-vue";
import { E as F, a as N } from "./index-01903178.js";
import "nanoid";
import "lodash-es";
import "pinia";
import "vuedraggable";
const O = /* @__PURE__ */ b({
  __name: "font-size-editor",
  props: {
    options: {},
    label: { default: "字体大小" },
    formItemProp: { default: () => ["options", "fontSize"] },
    formItemRules: {}
  },
  setup(s) {
    const p = y(s, "options");
    return (e, t) => {
      const _ = d("my-label"), f = h, u = I;
      return m(), c(u, { prop: e.formItemProp }, {
        label: l(() => [
          o(_, { label: e.label }, null, 8, ["label"])
        ]),
        default: l(() => [
          o(f, {
            modelValue: n(p).fontSize,
            "onUpdate:modelValue": t[0] || (t[0] = (i) => n(p).fontSize = i),
            placeholder: "请输入",
            clearable: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), T = /* @__PURE__ */ b({
  __name: "color-editor",
  props: {
    options: {},
    label: { default: "颜色" },
    formItemProp: { default: () => ["options", "color"] },
    formItemRules: {},
    showAlpha: { type: Boolean }
  },
  setup(s) {
    const p = y(s, "options");
    return (e, t) => {
      const _ = d("my-label"), f = d("my-color-picker"), u = I;
      return m(), c(u, { prop: e.formItemProp }, {
        label: l(() => [
          o(_, { label: e.label }, null, 8, ["label"])
        ]),
        default: l(() => [
          o(f, {
            modelValue: n(p).color,
            "onUpdate:modelValue": t[0] || (t[0] = (i) => n(p).color = i),
            "show-alpha": e.showAlpha
          }, null, 8, ["modelValue", "show-alpha"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), G = /* @__PURE__ */ b({
  __name: "suffix-icon-editor",
  props: {
    options: {},
    label: { default: "后缀图标" },
    formItemProp: { default: () => ["options", "suffixIcon"] },
    formItemRules: {}
  },
  setup(s) {
    const p = y(s, "options");
    return (e, t) => {
      const _ = d("my-label"), f = D, u = F, i = N, V = I;
      return m(), c(V, { prop: e.formItemProp }, {
        label: l(() => [
          o(_, { label: e.label }, null, 8, ["label"])
        ]),
        default: l(() => [
          o(i, {
            modelValue: n(p).suffixIcon,
            "onUpdate:modelValue": t[0] || (t[0] = (r) => n(p).suffixIcon = r),
            placeholder: "请选择",
            clearable: "",
            filterable: ""
          }, {
            default: l(() => [
              (m(), v(P, null, S(E, (r) => o(u, {
                key: r.name,
                label: r.name,
                value: r.name
              }, {
                default: l(() => [
                  o(f, null, {
                    default: l(() => [
                      (m(), c(g(E[r.name])))
                    ]),
                    _: 2
                  }, 1024),
                  C("span", null, z(r.name), 1)
                ]),
                _: 2
              }, 1032, ["label", "value"])), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), L = /* @__PURE__ */ R(G, [["__scopeId", "data-v-36188eb5"]]), x = /* @__PURE__ */ b({
  __name: "d-logo",
  props: {
    formData: {}
  },
  setup(s) {
    return (a, p) => {
      const e = k, t = w;
      return m(), c(t, { gutter: n(B) }, {
        default: l(() => [
          o(e, null, {
            default: l(() => [
              o(n($), { "form-data": a.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          o(e, null, {
            default: l(() => [
              o(n(A), {
                options: a.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(e, null, {
            default: l(() => [
              o(n(T), {
                options: a.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(e, null, {
            default: l(() => [
              o(n(U), {
                options: a.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(e, null, {
            default: l(() => [
              o(n(O), {
                options: a.formData.options
              }, null, 8, ["options"])
            ]),
            _: 1
          }),
          o(e, null, {
            default: l(() => [
              o(n(L), {
                options: a.formData.options
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
  x as default
};
