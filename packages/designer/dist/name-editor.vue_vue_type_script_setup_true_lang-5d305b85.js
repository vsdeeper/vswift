import { E as _, a as c } from "./index-a443a97f.js";
import "./constants-a6c62b18.js";
import { defineComponent as f, toRef as i, resolveComponent as d, openBlock as b, createBlock as I, withCtx as t, createVNode as n, unref as m } from "vue";
const y = /* @__PURE__ */ f({
  __name: "name-editor",
  props: {
    options: {},
    label: { default: "名称" },
    formItemProp: { default: () => ["options", "name"] },
    formItemRules: {}
  },
  setup(p) {
    const e = i(p, "options");
    return (o, l) => {
      const r = d("my-label"), a = _, s = c;
      return b(), I(s, { prop: o.formItemProp }, {
        label: t(() => [
          n(r, { label: o.label }, null, 8, ["label"])
        ]),
        default: t(() => [
          n(a, {
            modelValue: m(e).name,
            "onUpdate:modelValue": l[0] || (l[0] = (u) => m(e).name = u),
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
  y as _
};
