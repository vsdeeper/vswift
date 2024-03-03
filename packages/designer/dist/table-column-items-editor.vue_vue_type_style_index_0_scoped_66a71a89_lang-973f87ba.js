import { g as f, E as g, a as x } from "./index-a443a97f.js";
import { defineComponent as p, openBlock as r, createBlock as c, withCtx as t, renderSlot as y, toRef as b, resolveComponent as v, createVNode as _, unref as a } from "vue";
import "./constants-a6c62b18.js";
const R = /* @__PURE__ */ p({
  __name: "responsive-col",
  props: {
    xs: {},
    sm: {},
    md: { default: 12 },
    lg: { default: 8 },
    xl: { default: 6 }
  },
  setup(n) {
    return (e, o) => {
      const l = f;
      return r(), c(l, {
        span: 24,
        xs: e.xs,
        sm: e.sm,
        md: e.md,
        lg: e.lg,
        xl: e.xl
      }, {
        default: t(() => [
          y(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["xs", "sm", "md", "lg", "xl"]);
    };
  }
}), T = /* @__PURE__ */ p({
  __name: "id-editor",
  props: {
    formData: {}
  },
  setup(n) {
    const o = b(n, "formData");
    return (l, s) => {
      const m = v("my-label"), d = g, u = x;
      return r(), c(u, {
        prop: "id",
        rules: [{ required: !0, message: "必填项" }]
      }, {
        label: t(() => [
          _(m, { label: "唯一标识符" })
        ]),
        default: t(() => [
          _(d, {
            modelValue: a(o).id,
            "onUpdate:modelValue": s[0] || (s[0] = (i) => a(o).id = i),
            readonly: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
export {
  T as _,
  R as a
};
