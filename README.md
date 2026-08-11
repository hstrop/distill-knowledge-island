# DISTILL · 蒸馏我自己

这是一个以个人知识库为核心的单页网站。它不是简历页，而是把学习、实践、关系、健康、交易与知识系统整理成一座可以漫游的“知识岛”。

## 已包含的功能

- Pyisland 风格的悬浮胶囊导航与黑色 Hero 岛屿
- 六个知识分支与 15 张可打开的知识卡片
- Featured Build 项目区：云雀创作台实机界面、功能说明、源码与 Windows 下载入口
- 项目实验、灵感想法、生活收集、复盘清单和联系我的收纳架
- 联系邮箱：`3366046376zwj@gmail.com`
- 全文搜索、分类筛选和 `/` 快捷键聚焦搜索框
- 笔记详情弹窗（Esc 或点击背景关闭）
- 蒸馏方法论、当前维护节奏和关于页面
- 移动端响应式布局、键盘焦点和减少动效支持
- 首屏分层入场、鼠标光影跟随、滚动渐入、阅读进度和卡片微交互
- Vite 构建、Docker + Nginx 静态部署配置
- SVG 站点图标与基础分享信息
- `/healthz` 健康检查和 `deploy.sh` / `deploy.ps1` 一键启动脚本

## 本地预览（只用于编辑和检查）

在 `D:\蒸馏我自己\distill-site` 目录打开终端：

```bash
npm install
npm run dev
```

浏览器打开终端提示的地址即可。发布前运行：

```bash
npm run build
```

构建产物会生成在 `dist` 文件夹。

## 云服务器部署

服务器安装 Docker 后，将整个 `distill-site` 文件夹上传到服务器，进入该目录执行：

```bash
docker build -t distill-site .
docker run -d --name distill-site --restart unless-stopped -p 80:80 distill-site
```

也可以使用项目自带的 Compose 配置：

```bash
docker compose up -d --build
```

Linux 服务器也可以直接执行：

```bash
sh deploy.sh
```

部署完成后访问 `http://服务器公网IP/healthz`，返回 `ok` 就代表网站容器运行正常。

## GitHub Pages 发布

项目已经包含 `.github/workflows/deploy-pages.yml`，上传到 GitHub 后：

1. 仓库默认分支使用 `main`。
2. 打开仓库的 `Settings` → `Pages`。
3. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
4. 推送代码后等待 Actions 完成，Pages 地址就会出现。
5. 在 Pages 设置的 `Custom domain` 中填写自己的域名并保存。

项目使用相对资源路径，因此部署在 `用户名.github.io/仓库名/` 或独立域名下都不会白屏。

之后用服务器公网 IP 访问。域名和 HTTPS 可以在服务器上用 Caddy、Nginx Proxy Manager 或现有反向代理接入；本项目的 Nginx 已经配置好 Vite 单页路由回退和静态资源缓存。

## 修改内容

- 页面文案和知识卡片：`src/App.jsx`
- 全部视觉样式与响应式：`src/styles.css`
- 页面标题、描述和分享基础信息：`index.html`

改完后重新运行 `npm run build`，再重新构建 Docker 镜像即可。
