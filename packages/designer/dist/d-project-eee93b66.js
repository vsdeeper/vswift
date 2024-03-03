import { E as u, a as i, g as s, b as d } from "./index-a443a97f.js";
import { R as f } from "./constants-a6c62b18.js";
import { defineComponent as _, openBlock as c, createBlock as V, unref as g, withCtx as o, createVNode as e } from "vue";
import "pinia";
import "lodash-es";
import "@element-plus/icons-vue";
import "nanoid";
import "vuedraggable";
const I = /* @__PURE__ */ _({
  __name: "d-project",
  props: {
    formData: {}
  },
  setup(b) {
    return (t, l) => {
      const r = u, p = i, n = s, m = d;
      return c(), V(m, { gutter: g(f) }, {
        default: o(() => [
          e(n, { span: 24 }, {
            default: o(() => [
              e(p, {
                label: "项目名称",
                prop: "name",
                rules: [{ required: !0, message: "必填项" }]
              }, {
                default: o(() => [
                  e(r, {
                    modelValue: t.formData.options.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (a) => t.formData.options.name = a),
                    placeholder: "请输入",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          e(n, { span: 24 }, {
            default: o(() => [
              e(p, {
                label: "git地址",
                prop: "git"
              }, {
                default: o(() => [
                  e(r, {
                    modelValue: t.formData.options.git,
                    "onUpdate:modelValue": l[1] || (l[1] = (a) => t.formData.options.git = a),
                    placeholder: "请输入",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          e(n, { span: 24 }, {
            default: o(() => [
              e(p, {
                label: "项目描述",
                prop: "description"
              }, {
                default: o(() => [
                  e(r, {
                    modelValue: t.formData.options.description,
                    "onUpdate:modelValue": l[2] || (l[2] = (a) => t.formData.options.description = a),
                    type: "textarea",
                    autosize: "",
                    placeholder: "请输入",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
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
  I as default
};
