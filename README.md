# 牧之安 MUZHIAN · 官网改版

以「设计工作室」为主体、软件作为设计能力延伸的静态网站。

- 首页：品牌定位、精选作品、设计能力、数字产品、工作方式、工作室、联系
- 案例：独立案例页，支持分类
- 服务：品牌、视觉、数字体验、软件与工具、空间
- 软件与工具：作为「服务」子目录，包含丁丁看图产品页
- 后台：Pages CMS，内容落在 `src/data/`
- 构建：Astro 静态生成，Netlify 自动部署

## 品牌标志

主标志为「牧之 + 朱砂印（安）」，闭环版用于页眉/页脚，开角版用于大尺寸与首页。

- 标志文件：`public/assets/brand/`
- 页眉/页脚组件：`src/components/Logo.astro`
- 小尺寸印章：`src/components/Mark.astro`
- 字标以思源宋体（OFL）为骨架转成 SVG 路径，不依赖网页字体
- favicon / apple-touch-icon / og-cover 已同步更新

## 本地运行

```powershell
# Node 22+
npm install
npm run dev
```

构建：

```powershell
npm run build
npm run preview
```

## 目录

```text
src/
├─ pages/
│  ├─ index.astro
│  ├─ work/index.astro
│  ├─ work/[slug].astro
│  ├─ services/index.astro
│  ├─ services/software/index.astro
│  ├─ services/software/[slug].astro
│  ├─ studio/index.astro
│  ├─ contact/index.astro
│  ├─ company/index.astro
│  ├─ privacy/index.astro
│  └─ 404.astro
├─ components/
│  ├─ Header.astro
│  ├─ Footer.astro
│  ├─ Mark.astro
│  └─ ProjectCard.astro
├─ layouts/BaseLayout.astro
├─ styles/global.css
├─ scripts/
│  ├─ site.js
│  └─ work-filter.js
└─ data/
   ├─ cases.json
   ├─ software.json
   └─ site.json
```

## 内容更新

后台入口：

```text
https://www.shmuzhian.cn/admin.html
```

后台可编辑：

- 公司案例
- 软件产品
- 站点设置（首页标题、邮箱、状态）

保存后 GitHub 会收到提交，Netlify 自动 `npm run build`，生成新的静态页面。

## 案例字段

```text
title, slug, category, client, year, services[],
summary, cover, challenge, approach, result,
gallery[], featured, order, published
```

- `category`：文博 / 公共文化 / 会展 / 企业 / 品牌 / 视觉 / 数字 / 空间 / 软件
- `slug` 唯一，生成 `/work/<slug>/`
- `featured` 控制首页推荐
- `order` 越小越靠前

## 软件字段

```text
name, slug, tagline, summary, platform, version,
releaseDate, status, cover, screenshots[], features[],
proFeatures[], proNote, proPrice, proPriceNote, proShot,
installerUrl, portableUrl, readmeUrl,
installerSize, portableSize, installerBytes, portableBytes, changelog,
featured, order, published
```

生成 `/services/software/<slug>/`。安装包仍放在 `public/downloads/`，后台负责版本、文案、截图和下载路径。

## 部署

1. 把本目录内容提交到 GitHub 仓库。
2. Netlify 连接仓库。
3. 构建设置：

```text
Build command: npm run build
Publish directory: dist
```

仓库已包含 `netlify.toml`，会使用 `dist`。

旧地址重定向：

```text
/work.html       → /work/
/dingding.html   → /services/software/dingding/
/company.html    → /company/
/privacy.html    → /privacy/
```

## 设计约束

- 软件不进入一级导航，只在「服务 → 软件与工具」下出现。
- 案例和软件内容必须真实；没有内容时显示空状态，不编造客户。
- 页面保持纸色、墨黑、朱砂红；软件页只作为同一系统的深色子类型。
- 桌面 1440px、移动 390px 为验收基准。
- 不修改 DNS、证书或邮箱 MX。
