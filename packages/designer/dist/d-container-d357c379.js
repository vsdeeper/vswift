import { a as b, b as R } from "./index-a443a97f.js";
import { _ as E, a as v } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as _, toRef as I, resolveComponent as g, openBlock as n, createBlock as s, withCtx as o, createVNode as e, unref as t, createElementBlock as C, Fragment as D, renderList as T, createTextVNode as V, toDisplayString as k } from "vue";
import { R as y } from "./constants-a6c62b18.js";
import { E as N, a as O } from "./index-e315910c.js";
import "@element-plus/icons-vue";
import "nanoid";
import "lodash-es";
import "pinia";
import "vuedraggable";
const w = [
  { label: "水平", value: "horizontal" },
  { label: "垂直", value: "vertical" }
], B = /* @__PURE__ */ _({
  __name: "direction-editor",
  props: {
    options: {},
    label: { default: "子元素的排列方向" },
    formItemProp: { default: () => ["options", "direction"] },
    formItemRules: {}
  },
  setup(i) {
    const m = I(i, "options");
    return (l, a) => {
      const u = g("my-label"), c = N, f = O, d = b;
      return n(), s(d, { prop: l.formItemProp }, {
        label: o(() => [
          e(u, { label: l.label }, null, 8, ["label"])
        ]),
        default: o(() => [
          e(f, {
            modelValue: t(m).direction,
            "onUpdate:modelValue": a[0] || (a[0] = (r) => t(m).direction = r)
          }, {
            default: o(() => [
              (n(!0), C(D, null, T(t(w), (r) => (n(), s(c, {
                key: r.value,
                label: r.value
              }, {
                default: o(() => [
                  V(k(r.label), 1)
                ]),
                _: 2
              }, 1032, ["label"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), W = /* @__PURE__ */ _({
  __name: "d-container",
  props: {
    formData: {}
  },
  setup(i) {
    return (p, m) => {
      const l = v, a = R;
      return n(), s(a, { gutter: t(y) }, {
        default: o(() => [
          e(l, null, {
            default: o(() => [
              e(t(E), { "form-data": p.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          e(l, null, {
            default: o(() => [
              e(t(B), {
                options: p.formData.options
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
  W as default
};
