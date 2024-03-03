import { E as u, a as _ } from "./index-a443a97f.js";
import "./constants-a6c62b18.js";
import { defineComponent as c, toRef as f, resolveComponent as d, openBlock as h, createBlock as b, withCtx as l, createVNode as n, unref as p } from "vue";
const E = /* @__PURE__ */ c({
  __name: "height-editor",
  props: {
    options: {},
    label: { default: "高度" },
    formItemProp: { default: () => ["options", "height"] },
    formItemRules: {}
  },
  setup(r) {
    const e = f(r, "options");
    return (o, t) => {
      const m = d("my-label"), a = u, s = _;
      return h(), b(s, { prop: o.formItemProp }, {
        label: l(() => [
          n(m, { label: o.label }, null, 8, ["label"])
        ]),
        default: l(() => [
          n(a, {
            modelValue: p(e).height,
            "onUpdate:modelValue": t[0] || (t[0] = (i) => p(e).height = i),
            placeholder: "请输入",
            clearable: ""
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["prop"]);
    };
  }
});
export {
  E as _
};
