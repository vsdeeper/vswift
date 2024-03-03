import { _ as e } from "./index-a443a97f.js";
import { defineComponent as r, openBlock as n, createBlock as p, unref as a } from "vue";
import { S as _ } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const k = /* @__PURE__ */ r({
  __name: "vd-header",
  props: {
    data: {}
  },
  setup(s) {
    return (o, m) => {
      const t = e;
      return n(), p(t, {
        "class-list": ["vd-header"],
        data: o.data,
        "shortcut-key-options": a(_)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  k as default
};
