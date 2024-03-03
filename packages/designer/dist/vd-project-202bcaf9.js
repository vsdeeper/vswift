import { _ as r } from "./index-a443a97f.js";
import { defineComponent as e, openBlock as p, createBlock as n, unref as _ } from "vue";
import { S as s } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const N = /* @__PURE__ */ e({
  __name: "vd-project",
  props: {
    data: {}
  },
  setup(a) {
    return (o, m) => {
      const t = r;
      return p(), n(t, {
        "class-list": ["vd-project"],
        data: o.data,
        "shortcut-key-options": _(s)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  N as default
};
