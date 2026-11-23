# CMS 配置说明

后台使用 Pages CMS，登录后编辑 `src/data/` 中的 JSON，Netlify 自动构建。

## 页面

```text
https://www.shmuzhian.cn/admin.html
```

## 内容集合

### 公司案例

文件：`src/data/cases.json`

字段：

- 项目名称、链接标识、类别、客户、年份、服务内容
- 一句话介绍、封面图
- 项目背景、我们做了什么、项目结果
- 项目图片
- 在首页推荐、排序、发布

### 软件产品

文件：`src/data/software.json`

字段：

- 产品名称、链接标识、标语、介绍
- 平台、版本、更新日期、状态
- 主图、截图、专业版截图
- 免费版功能、专业版功能（名称 + 说明）
- 专业版价格与说明
- 安装版 / 便携版 / 使用说明地址
- 大小、字节数、更新说明
- 在首页推荐、排序、发布

### 站点设置

文件：`src/data/site.json`

包含首页标题、介绍、联系邮箱、地址、当前状态与默认 SEO。

## 图片

Pages CMS 有两个图片库：

```text
public/assets/work/      案例图片
public/assets/software/  软件产品图片
```

网站路径分别为 `/assets/work/...` 和 `/assets/software/...`。

## 新增功能后

如果新增了产品，保存后：

1. GitHub 自动提交
2. Netlify 自动运行 `npm run build`
3. 生成 `/services/software/<slug>/`
4. 首页和作品页按 `featured` / `order` 显示

未勾选「发布」的内容不会出现在页面和 sitemap 中。
