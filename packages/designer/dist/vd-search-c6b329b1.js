import { _ as r } from "./index-a443a97f.js";
import { defineComponent as e, openBlock as n, createBlock as p, unref as a } from "vue";
import { a as s } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const k = /* @__PURE__ */ e({
  __name: "vd-search",
  props: {
    data: {}
  },
  setup(_) {
    return (o, m) => {
      const t = r;
      return n(), p(t, {
        "class-list": ["vd-search"],
        data: o.data,
        "shortcut-key-options": a(s)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  k as default
};
