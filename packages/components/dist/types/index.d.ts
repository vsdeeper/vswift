import type { MyColorPickerInstance, MyDividerTitleInstance, MyLabelInstance } from '.';
export * from './my-color-picker';
export * from './my-divider-title';
export * from './my-label';
type ComponentsMap = {
    MyColorPicker?: MyColorPickerInstance;
    MyDividerTitle?: MyDividerTitleInstance;
    MyLabel?: MyLabelInstance;
};
declare const MyComponents: ComponentsMap;
export default MyComponents;
