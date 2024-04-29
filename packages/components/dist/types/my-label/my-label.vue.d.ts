declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    label: string;
    tooltipEffect?: "dark" | "light" | undefined;
    tooltipPlacement?: "left" | "right" | "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | undefined;
    tooltipIcon?: any;
    tooltipContent?: string | undefined;
}>, {
    tooltipPlacement: string;
    tooltipIcon: () => import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {}>;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "click-tooltip-icon": () => void;
}, string, import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    label: string;
    tooltipEffect?: "dark" | "light" | undefined;
    tooltipPlacement?: "left" | "right" | "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | undefined;
    tooltipIcon?: any;
    tooltipContent?: string | undefined;
}>, {
    tooltipPlacement: string;
    tooltipIcon: () => import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<globalThis.ExtractPropTypes<{}>>, {}, {}>;
}>>> & {
    "onClick-tooltip-icon"?: (() => any) | undefined;
}, {
    tooltipPlacement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
    tooltipIcon: any;
}, {}>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
