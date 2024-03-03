import { b as n } from "./index-a443a97f.js";
import { _ as p, a as _ } from "./table-column-items-editor.vue_vue_type_style_index_0_scoped_66a71a89_lang-973f87ba.js";
import { defineComponent as s, openBlock as f, createBlock as i, unref as t, withCtx as r, createVNode as o } from "vue";
import { R as l } from "./constants-a6c62b18.js";
import { _ as c } from "./height-editor.vue_vue_type_script_setup_true_lang-5fa30407.js";
import "@element-plus/icons-vue";
import "nanoid";
import "lodash-es";
import "pinia";
import "vuedraggable";
const T = /* @__PURE__ */ s({
  __name: "d-header",
  props: {
    formData: {}
  },
  setup(u) {
    return (a, d) => {
      const e = _, m = n;
      return f(), i(m, { gutter: t(l) }, {
        default: r(() => [
          o(e, null, {
            default: r(() => [
              o(t(p), { "form-data": a.formData }, null, 8, ["form-data"])
            ]),
            _: 1
          }),
          o(e, null, {
            default: r(() => [
              o(t(c), {
                options: a.formData.options
              }, null, 8, ["options"])
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
  T as default
};
