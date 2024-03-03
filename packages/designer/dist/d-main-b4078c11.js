import { b as n } from "./index-a443a97f.js";
import { _ as p, a as _ } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as f, openBlock as i, createBlock as s, unref as o, withCtx as t, createVNode as r } from "vue";
import { R as c } from "./constants-a6c62b18.js";
import "@element-plus/icons-vue";
import "nanoid";
import "lodash-es";
import "pinia";
import "vuedraggable";
const D = /* @__PURE__ */ f({
  __name: "d-main",
  props: {
    formData: {}
  },
  setup(l) {
    return (e, u) => {
      const a = _, m = n;
      return i(), s(m, { gutter: o(c) }, {
        default: t(() => [
          r(a, null, {
            default: t(() => [
              r(o(p), { "form-data": e.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["gutter"]);
    };
  }
});
export {
  D as default
};
