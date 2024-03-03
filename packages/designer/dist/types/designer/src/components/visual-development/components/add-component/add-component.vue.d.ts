import { AddComponentOptionItem, AddComponentGroupOptionItem } from '.';
declare function open(): void;
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    options?: AddComponentGroupOptionItem[] | undefined;
}>, {
    open: typeof open;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (val: AddComponentOptionItem) => void;
}, string, import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    options?: AddComponentGroupOptionItem[] | undefined;
}>>> & {
    onSelect?: ((val: AddComponentOptionItem) => any) | undefined;
}, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
