import { _ as e } from "./index-a443a97f.js";
import { defineComponent as n, openBlock as r, createBlock as p, unref as s } from "vue";
import { S as a } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const N = /* @__PURE__ */ n({
  __name: "vd-aside",
  props: {
    data: {}
  },
  setup(_) {
    return (o, i) => {
      const t = e;
      return r(), p(t, {
        "class-list": ["vd-aside"],
        data: o.data,
        "shortcut-key-options": s(a)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  N as default
};
