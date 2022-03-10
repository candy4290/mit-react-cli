export interface RouterConfigType {
  path: string /* 页面访问url */;
  url: any /* 页面文件地址url，用来动态引入组件 */;
  element?: (props: any) => JSX.Element /* 如果是具体组件请直接传入组件 */;
  title: string /* 浏览器页签title */;
  exact: boolean;
  auth: boolean;
  children?: RouterConfigType[] /* 子路由 */;
}
