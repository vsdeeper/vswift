import { _ as n } from "./index-a443a97f.js";
import { defineComponent as r, openBlock as e, createBlock as p, unref as _ } from "vue";
import { a } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const g = /* @__PURE__ */ r({
  __name: "vd-logo",
  props: {
    data: {}
  },
  setup(s) {
    return (o, m) => {
      const t = n;
      return e(), p(t, {
        "class-list": ["vd-logo"],
        data: o.data,
        "shortcut-key-options": _(a)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  g as default
};
