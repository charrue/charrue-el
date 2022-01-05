const base = process.env.NODE_ENV === 'production' ? '/charrue-el' : '';
const { resolve } = require('path');
const sidebarConfig = require("./sidebar.json")

module.exports = {
  title: 'Charrue El',
  description: '',
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ['src'],
  alias: {
    // 为了能在demo中正确的使用  import { X } from 'docs'
    [`docs`]: resolve('./src'),
  },
  base,
  themeConfig: {
    // logo: '../logo.svg',
    nav: [{ text: '指南', link: './' }],
    sidebar: sidebarConfig,
    search: {
      searchMaxSuggestions: 10,
    },
    repo: 'charrue/charrue-el',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
};
