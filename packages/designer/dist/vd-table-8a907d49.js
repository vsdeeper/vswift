import { _ as e } from "./index-a443a97f.js";
import { defineComponent as n, openBlock as r, createBlock as p, unref as a } from "vue";
import { a as _ } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const E = /* @__PURE__ */ n({
  __name: "vd-table",
  props: {
    data: {}
  },
  setup(s) {
    return (t, m) => {
      const o = e;
      return r(), p(o, {
        "class-list": ["vd-table"],
        data: t.data,
        "shortcut-key-options": a(_)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  E as default
};
