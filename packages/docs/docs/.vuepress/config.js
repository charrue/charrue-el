const basicComponents = [
  ['/components/', '开始使用'],
  ['/components/basic/', '基础组件'],
  ['/components/basic/button', 'Button'],
]

const proComponents = [
  ['/components/pro/', 'pro组件'],
  ['/components/pro/layout', 'layout'],
]

const componentStyles = [
  "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
  "https://unpkg.com/@charrue/layout/dist/style/index.css"
]

const Scripts = [
  "https://unpkg.com/vue/dist/vue.js",
  "https://unpkg.com/element-ui/lib/index.js",
  "https://unpkg.com/@charrue/layout/dist/umd/index.js"
]

module.exports = {
  base: "/pro-components/",
  title: "pro-components",
  description: "pro-components",
  theme: "antdocs",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    ...componentStyles.map(link => {
      return [
        "link",
        {
          href: link,
          rel: "stylesheet",
        }
      ]
    }),
    ...Scripts.map(link => {
      return [
        "script",
        {
          src: link,
        }
      ]
    })
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
      "/components/": [
        ...basicComponents,
        ...proComponents,
      ],
    },
    nav: [
      {
        text: "组件",
        link: "/components/",
      },
      {
        text: "案例",
        link: "https://codesandbox.io/s/github/charrue/pro-components/tree/master/packages/examples",
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
