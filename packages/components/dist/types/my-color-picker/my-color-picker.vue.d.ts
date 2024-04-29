declare const _default: import("vue").DefineComponent<{
    modelValue: globalThis.PropType<string>;
    showAlpha: {
        type: globalThis.PropType<boolean>;
    };
    placeholder: {
        type: globalThis.PropType<string>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (modelValue: string) => void;
}, string, import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<{
    modelValue: globalThis.PropType<string>;
    showAlpha: {
        type: globalThis.PropType<boolean>;
    };
    placeholder: {
        type: globalThis.PropType<string>;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((modelValue: string) => any) | undefined;
}, {
    placeholder: string;
}, {}>;
export default _default;
