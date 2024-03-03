import { _ as r } from "./index-a443a97f.js";
import { defineComponent as n, openBlock as e, createBlock as p, unref as _ } from "vue";
import { a } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const E = /* @__PURE__ */ n({
  __name: "vd-form",
  props: {
    data: {}
  },
  setup(m) {
    return (o, s) => {
      const t = r;
      return e(), p(t, {
        "class-list": ["vd-form"],
        data: o.data,
        "shortcut-key-options": _(a)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  E as default
};
