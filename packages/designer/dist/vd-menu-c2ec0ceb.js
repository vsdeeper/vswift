import { _ as n } from "./index-a443a97f.js";
import { defineComponent as e, openBlock as r, createBlock as p, unref as _ } from "vue";
import { a } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const E = /* @__PURE__ */ e({
  __name: "vd-menu",
  props: {
    data: {}
  },
  setup(m) {
    return (o, s) => {
      const t = n;
      return r(), p(t, {
        "class-list": ["vd-menu"],
        data: o.data,
        "shortcut-key-options": _(a)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  E as default
};
