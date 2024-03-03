import { ActiveDesignData } from '../..';
import { type ShortcutKeyOptionItem } from '.';
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    data?: ActiveDesignData | undefined;
    options?: ShortcutKeyOptionItem[] | undefined;
    showMore?: boolean | undefined;
    usedInRootComponent?: boolean | undefined;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "show-more": () => void;
}, string, import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    data?: ActiveDesignData | undefined;
    options?: ShortcutKeyOptionItem[] | undefined;
    showMore?: boolean | undefined;
    usedInRootComponent?: boolean | undefined;
}>>> & {
    "onShow-more"?: (() => any) | undefined;
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
