import { _ as r } from "./index-a443a97f.js";
import { defineComponent as e, openBlock as n, createBlock as p, unref as _ } from "vue";
import { S as s } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const N = /* @__PURE__ */ e({
  __name: "vd-router-view",
  props: {
    data: {}
  },
  setup(a) {
    return (o, i) => {
      const t = r;
      return n(), p(t, {
        "class-list": ["vd-router-view"],
        data: o.data,
        "shortcut-key-options": _(s)
      }, null, 8, ["data", "shortcut-key-options"]);
    };
  }
});
export {
  N as default
};
