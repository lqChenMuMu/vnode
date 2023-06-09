import { defaultTheme } from 'vuepress';
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  title: 'DouBian',
  base: '/vnode/',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
    ],
	sidebar: [
      // SidebarItem
      {
        text: '文档',
        link: '/guide/',
        children: [
          // SidebarItem
          {
            text: 'git',
            link: '/guide/git.md',
            children: [],
          },
        ],
      },
	 ],
	 plugins: [
		autoCatalogPlugin({
      //插件选项
    }),
  ],
  }),
}