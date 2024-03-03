import { _ as e } from "./index-a443a97f.js";
import { defineComponent as n, openBlock as r, createBlock as p, unref as _ } from "vue";
import { S as s } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const N = /* @__PURE__ */ n({
  __name: "vd-view",
  props: {
    data: {}
  },
  setup(a) {
    return (o, i) => {
      const t = e;
      return r(), p(t, {
        "class-list": ["vd-view"],
        data: o.data,
        "shortcut-key-options": _(s)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  N as default
};
