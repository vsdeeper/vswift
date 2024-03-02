import { AddComponentGroupOptionItem, Method } from '.';

export const METHOD_OPTIONS: Method[] = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];

/**
 * 添加组件选项数据
 */
export const ADD_COMPONENT_OPTIONS = [
  {
    id: 'ProjectContainer',
    name: '项目容器',
    children: [{ label: '项目', value: 'Project' }],
  },
  {
    id: 'GlobalComponents',
    name: '全局组件',
    children: [
      { label: '标识', value: 'Logo' },
      { label: '搜索', value: 'Search' },
      { label: '表格', value: 'Table' },
      { label: '表单', value: 'Form' },
      { label: '菜单', value: 'Menu' },
    ],
  },
  {
    id: 'LayoutContainer',
    name: '布局容器',
    children: [
      { label: '容器', value: 'Container' },
      { label: '侧栏', value: 'Aside' },
      { label: '头部', value: 'Header' },
      { label: '主体', value: 'Main' },
      { label: '底部', value: 'Footer' },
      { label: '布局', value: 'RowCol' },
    ],
  },
  {
    id: 'MainContainer',
    name: '主体容器',
    children: [
      { label: '路由', value: 'RouterView' },
      { label: '视图', value: 'View' },
    ],
  },
  // {
  //   id: 'NavigationComponents',
  //   name: '导航组件',
  //   children: [{ label: '下拉菜单', value: 'Dropdown', disabled: true }],
  // },
  // {
  //   id: 'BasicComponents',
  //   name: '基础组件',
  //   children: [
  //     { label: '按钮', value: 'Button', disabled: true },
  //     { label: '图标', value: 'Icon', disabled: true },
  //   ],
  // },
  // {
  //   id: 'DataDisplayComponents',
  //   name: '数据展示组件',
  //   children: [{ label: '图片', value: 'Image', disabled: true }],
  // },
  {
    id: 'OtherComponents',
    name: '其他组件',
    children: [{ label: '分割线', value: 'Divider' }],
  },
] as AddComponentGroupOptionItem[];
