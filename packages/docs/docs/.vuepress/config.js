const sidebarRoutes = [
  ['/components/basic/', '基础组件'],
  ['/components/basic/button', 'Button'],
  ['/components/pro/', 'pro组件'],
  ['/components/pro/layout', 'layout'],
]

module.exports = {
  title: "pro-component", //左上角的博客标题以及网站显示的标题
  description: "pro-components",
  theme: "antdocs",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],

    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
      },
    ],
  ],
  themeConfig: {
    //主题配置项
    logo: "/logo.png",
    smoothScroll: true, //平滑滚动
    sidebarDepth: 1,
    repo: "charrue/pro-components",
    docsRepo: "charrue/pro-components",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "帮助我改善这个页面",
    lastUpdated: "最后更新时间",
    backToTop: true,
    sidebar: {
      "/components/": sidebarRoutes,
    },
    nav: [
      {
        text: "组件",
        link: "/components/",
      },
      {
        text: "案例",
        link: "/examples/",
      },
      {
        text: "联系",
        items: [
          {
            text: "Github",
            link: "https://github.com/charrue",
          },
        ],
      },
    ],
  },

  plugins: [
    //顶部进度条
    ["vuepress-plugin-reading-progress"],
    [
      "vuepress-plugin-code-copy",
      {
        color: "#6D7EAD",
        successText: "复制成功！",
      },
    ],
    //显示文章最后更新时间
    "@vuepress/last-updated",
     // 悬挂猫返回顶部
    ["go-top"],
    'demo-container'
  ],
};
