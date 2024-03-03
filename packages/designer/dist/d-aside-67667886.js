import { E as c, a as b, b as w } from "./index-a443a97f.js";
import { _ as R, a as h } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as m, toRef as E, resolveComponent as I, openBlock as s, createBlock as _, withCtx as e, createVNode as o, unref as n } from "vue";
import { R as C } from "./constants-a6c62b18.js";
import "@element-plus/icons-vue";
import "nanoid";
import "lodash-es";
import "pinia";
import "vuedraggable";
const V = /* @__PURE__ */ m({
  __name: "width-editor",
  props: {
    options: {},
    label: { default: "宽度" },
    formItemProp: { default: () => ["options", "width"] },
    formItemRules: {}
  },
  setup(p) {
    const a = E(p, "options");
    return (t, l) => {
      const i = I("my-label"), u = c, f = b;
      return s(), _(f, { prop: t.formItemProp }, {
        label: e(() => [
          o(i, { label: t.label }, null, 8, ["label"])
        ]),
        default: e(() => [
          o(u, {
            modelValue: n(a).width,
            "onUpdate:modelValue": l[0] || (l[0] = (d) => n(a).width = d),
            clearable: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
}), U = /* @__PURE__ */ m({
  __name: "d-aside",
  props: {
    formData: {}
  },
  setup(p) {
    return (r, a) => {
      const t = h, l = w;
      return s(), _(l, { gutter: n(C) }, {
        default: e(() => [
          o(t, null, {
            default: e(() => [
              o(n(R), { "form-data": r.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          o(t, null, {
            default: e(() => [
              o(n(V), {
                options: r.formData.options
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
  U as default
};
