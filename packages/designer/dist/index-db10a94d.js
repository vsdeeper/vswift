import { defineComponent as s, openBlock as n, createBlock as r, Transition as l, mergeProps as p, unref as g, toHandlers as m, withCtx as f, renderSlot as y } from "vue";
import { u as c, c as h } from "./index-a443a97f.js";
const v = s({
  name: "ElCollapseTransition"
}), x = /* @__PURE__ */ s({
  ...v,
  setup(o) {
    const d = c("collapse-transition"), e = (t) => {
      t.style.maxHeight = "", t.style.overflow = t.dataset.oldOverflow, t.style.paddingTop = t.dataset.oldPaddingTop, t.style.paddingBottom = t.dataset.oldPaddingBottom;
    }, i = {
      beforeEnter(t) {
        t.dataset || (t.dataset = {}), t.dataset.oldPaddingTop = t.style.paddingTop, t.dataset.oldPaddingBottom = t.style.paddingBottom, t.style.height && (t.dataset.elExistsHeight = t.style.height), t.style.maxHeight = 0, t.style.paddingTop = 0, t.style.paddingBottom = 0;
      },
      enter(t) {
        requestAnimationFrame(() => {
          t.dataset.oldOverflow = t.style.overflow, t.dataset.elExistsHeight ? t.style.maxHeight = t.dataset.elExistsHeight : t.scrollHeight !== 0 ? t.style.maxHeight = `${t.scrollHeight}px` : t.style.maxHeight = 0, t.style.paddingTop = t.dataset.oldPaddingTop, t.style.paddingBottom = t.dataset.oldPaddingBottom, t.style.overflow = "hidden";
        });
      },
      afterEnter(t) {
        t.style.maxHeight = "", t.style.overflow = t.dataset.oldOverflow;
      },
      enterCancelled(t) {
        e(t);
      },
      beforeLeave(t) {
        t.dataset || (t.dataset = {}), t.dataset.oldPaddingTop = t.style.paddingTop, t.dataset.oldPaddingBottom = t.style.paddingBottom, t.dataset.oldOverflow = t.style.overflow, t.style.maxHeight = `${t.scrollHeight}px`, t.style.overflow = "hidden";
      },
      leave(t) {
        t.scrollHeight !== 0 && (t.style.maxHeight = 0, t.style.paddingTop = 0, t.style.paddingBottom = 0);
      },
      afterLeave(t) {
        e(t);
      },
      leaveCancelled(t) {
        e(t);
      }
    };
    return (t, H) => (n(), r(l, p({
      name: g(d).b()
    }, m(i)), {
      default: f(() => [
        y(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["name"]));
  }
});
var a = /* @__PURE__ */ h(x, [["__file", "collapse-transition.vue"]]);
a.install = (o) => {
  o.component(a.name, a);
};
const B = a;
export {
  B as _
};
