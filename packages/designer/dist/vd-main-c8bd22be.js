import { _ as n } from "./index-a443a97f.js";
import { defineComponent as r, openBlock as e, createBlock as p, unref as a } from "vue";
import { S as _ } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const N = /* @__PURE__ */ r({
  __name: "vd-main",
  props: {
    data: {}
  },
  setup(m) {
    return (o, s) => {
      const t = n;
      return e(), p(t, {
        "class-list": ["vd-main"],
        data: o.data,
        "shortcut-key-options": a(_)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  N as default
};
