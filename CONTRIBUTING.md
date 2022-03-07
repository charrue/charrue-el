# charrue el 贡献指南

感谢你使用 charrue el。

## 项目起步
将项目clone后下载依赖。
``` bash
pnpm install
```

依赖下载完毕后可以运行演示实例，实例分为Vue2版本和Vue3版本。
``` bash
# Vue2
pnpm run start:examples

# Vue3
pnpm run start:examples-next
```


## Issue 规范

- issue 仅用于提交 Bug 或 Feature 以及设计相关的内容，其它内容可能会被直接关闭。

- 在提交 issue 之前，请搜索相关内容是否已被提出。


## Pull Request 规范

- 请先 fork 一份到自己的项目下，不要直接在仓库下建分支。

- commit 信息要以 `type(scope): 描述信息` 的形式填写，例如 `fix(layout-internal): fix xxx bug`。

  1. type: 必须是 build, chore, ci, docs, feat, fix, perf, refactor, revert, release, style, test, improvement 其中的一个。

  2. scope: 必须是 components, directives, element-plus, hooks, locale, test-utils, theme-chalk, tokens, utils, project, core, style, docs, ci, dev, build, deploy, other, typography, color, border, var 其中的一个。

  3. header: 描述信息不要超过 72 个字符。

- 打包后的文件。

- 提交 PR 前请 rebase，确保 commit 记录的整洁。

- 确保 PR 是提交到 `dev` 分支，而不是 `master` 分支。

- 如果是修复 bug，请在 PR 中给出描述信息。
