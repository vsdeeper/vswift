import { _ as r } from "./index-a443a97f.js";
import { defineComponent as a, openBlock as e, createBlock as s, unref as p } from "vue";
import { S as c } from "./constants-e38693a0.js";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const v = /* @__PURE__ */ a({
  __name: "vd-container",
  props: {
    data: {}
  },
  setup(_) {
    return (o, m) => {
      var t, n;
      const i = r;
      return e(), s(i, {
        "class-list": [
          "vd-container",
          {
            "is-vertical": ((t = o.data.options) == null ? void 0 : t.direction) === "vertical",
            "is-horizontal": ((n = o.data.options) == null ? void 0 : n.direction) === "horizontal"
          }
        ],
        data: o.data,
        "shortcut-key-options": p(c)
      }, null, 8, ["class-list", "data", "shortcut-key-options"]);
    };
  }
});
export {
  v as default
};
