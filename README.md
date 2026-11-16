# 牧之安 MUZHIAN · 官网（带案例后台）

一个以「设计工作室」为主体的静态官网，附带自研 Windows 产品「丁丁看图」的独立产品页，以及可编辑公司案例的 Pages CMS 后台。

- 视觉方向：暖纸白、墨黑、朱砂红；宋体大标题 + 克制的网格与留白。
- 页面：首页、案例、丁丁看图、公司信息、隐私政策、404。
- 技术：纯 HTML / CSS / JavaScript，无构建步骤、无外部字体、无第三方统计。
- 下载：`downloads/` 内含丁丁看图 1.0 的安装包、便携版与 SHA-256 校验文件。
- 后台：Pages CMS + GitHub，入门步骤见 [`CMS-SETUP.md`](CMS-SETUP.md)。

## 本地预览

直接双击 `index.html` 即可浏览大部分内容。为了测试下载和相对路径，建议用本地服务器：

```powershell
cd muzhian-site
python -m http.server 8765
```

然后访问 `http://127.0.0.1:8765/`。

## 文件结构

```text
muzhian-site/
├─ index.html              首页
├─ work.html               案例列表
├─ admin.html              后台跳转入口
├─ dingding.html           丁丁看图产品页
├─ company.html            公司登记信息
├─ privacy.html            隐私政策
├─ 404.html                404 页面
├─ CMS-SETUP.md            后台配置与使用说明
├─ .pages.yml              Pages CMS 内容模型
├─ netlify.toml            Netlify 静态发布配置
├─ content/
│  └─ cases.json           案例数据（由后台维护）
├─ assets/
│  ├─ cases.js             案例列表与详情交互
│  ├─ work/                案例图片上传目录
│  ├─ site.css             全站视觉系统与响应式
│  ├─ site.js              菜单、滚动动效、复制邮箱
│  ├─ favicon.svg / .ico   公司标识
│  ├─ apple-touch-icon.png
│  ├─ og-cover.jpg         首页社交分享图
│  ├─ og-dingding.jpg      产品页社交分享图
│  ├─ dingding-main.jpg    产品界面截图
│  ├─ dingding-pdf.jpg
│  └─ dingding-welcome.jpg
├─ downloads/
│  ├─ dingding-viewer-1.0-setup.exe
│  ├─ dingding-viewer-1.0-portable.zip
│  ├─ dingding-viewer-1.0-readme.txt
│  └─ SHA256SUMS.txt
├─ robots.txt
├─ sitemap.xml
├─ _headers                Cloudflare Pages / Netlify 的响应头配置
└─ .nojekyll               GitHub Pages 用
```

## 上线前必须确认

### 1. 域名

当前所有 canonical、Open Graph、sitemap 与页脚链接都按下面这个域名填写：

```text
https://www.shmuzhian.cn
```

如果实际申请的域名不同，请全局替换 `shmuzhian.cn`。可以用编辑器的「在文件中替换」处理整个目录：

- `index.html`
- `dingding.html`
- `company.html`
- `privacy.html`
- `robots.txt`
- `sitemap.xml`
- `README.md`

根域名跳转建议在托管平台或 DNS 层把 `shmuzhian.cn` 301 到 `https://www.shmuzhian.cn`，二选一保持一致即可。

### 2. 邮箱

页面使用：

```text
lishihong@muzhian.cn
```

请确认该邮箱真实可收信；如果使用 `hello@` 或其他地址，替换 `index.html`、`company.html`、`privacy.html` 中的邮箱，并同步修改 `index.html` 的 JSON-LD。

> 注意：网站域名是 `shmuzhian.cn`，邮箱域名是 `muzhian.cn`，两者不是同一个域名。邮箱的 MX 解析在另一个 DNS 服务商，绑定网站时不要动它。

### 3. ICP 备案

页脚目前显示「ICP 备案办理中」，这是真实状态，没有编造备案号。备案通过后，把页脚替换为实际备案号，例如：

```html
<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">沪ICP备XXXXXXXX号-1</a>
```

同时建议在页脚保留公司全称与统一社会信用代码。中国大陆服务器通常要求备案；使用境外托管（如 Cloudflare Pages）时也建议在网站上线后尽快完成备案。

### 4. 产品版本与下载

`downloads/` 中的文件来自 `AuroraView/dist`：

- `丁丁看图-1.0-安装包.exe` → `dingding-viewer-1.0-setup.exe`（403 KB，2026.11 更新版）
- `丁丁看图-1.0-便携版.zip` → `dingding-viewer-1.0-portable.zip`（186 KB，2026.11 更新版）
- `使用说明.txt` → `dingding-viewer-1.0-readme.txt`

产品页标注了「暂未进行商业代码签名，SmartScreen 可能提示未知发布者」。这是实际情况，不建议删除。如果后续购买代码签名证书，更新产品页的安装提示即可。

替换安装包后，重新生成校验文件：

```powershell
cd downloads
Get-ChildItem *.exe, *.zip | ForEach-Object {
  $hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLower()
  "$hash  $($_.Name)"
} | Set-Content SHA256SUMS.txt -Encoding utf8
```

### 5. 网站内容

服务分类是根据营业执照经营范围整理的：

- 品牌策略与识别
- 视觉设计与内容
- 数字体验与网站
- 展览与空间叙事
- 文化项目与策划

页面没有虚构客户案例、客户 Logo 或项目数据。后续如果要加作品集，建议使用真实项目；没有图片时，用项目说明 + 设计过程图也可以，但不要编造品牌客户。

## 部署

### 从今天开始：推荐上线顺序

域名还没下来也可以先上线预览，不用等备案或 DNS：

1. 解压 `muzhian-site.zip`，得到 `index.html`、`assets/`、`downloads/` 等文件。
2. 把 `muzhian-site` 文件夹拖到 Netlify Drop，或登录 Netlify 后从 Projects 页面拖入。
3. 先得到一个 `https://你的项目.netlify.app` 的临时地址，完整点一遍。
4. 域名可用后，在 Netlify 的 Domain management 绑定 `www.shmuzhian.cn`。
5. 按控制台提示加一条 `www` 的 CNAME；如果邮箱在用，不要改 NS、不要删 MX。
6. 把 `www.shmuzhian.cn` 设为主域名；根域名 `shmuzhian.cn` 做 301 跳转。
7. 备案通过后，把页脚的「ICP 备案办理中」替换成真实备案号。

### 方案对比

| 方案 | 是否需要 ICP | 适合 | 上线时间 |
| --- | --- | --- | --- |
| Netlify | 不需要 | 快速上线、预览、海外访问 | 约 10 分钟 |
| Cloudflare Pages | 不需要 | 快速上线、预览、海外访问 | 约 10 分钟 |
| 阿里云 / 腾讯云轻量服务器 | 需要 | 主要面向国内、需要备案 | 备案约 1–3 周 |
| 对象存储 OSS / COS + CDN | 需要 | 纯静态站、国内加速 | 备案后 1 天 |

> Netlify 和 Cloudflare Pages 都是境外托管，不能用来完成中国大陆 ICP 备案。备案与接入服务商绑定；如果以后从境外托管迁到国内服务器，需要按新接入商要求办理备案。

### Netlify（当前推荐，无需 Cloudflare 账号）

1. 打开 [Netlify Drop](https://app.netlify.com/drop)，用邮箱注册一个免费账号。免费计划不需要信用卡。
2. 解压 `muzhian-site.zip`。
3. 把 `muzhian-site` 文件夹拖到 Netlify Drop。  
   这个文件夹里必须直接有 `index.html`，不要拖它外面再套一层的父文件夹。
4. 等待上传完成，得到 `https://随机名字.netlify.app`。
   > 如果页面提示 **visible only to your team** 或项目默认是 private，先点 **Make public**。不公开的话，绑定自定义域名后也会被访问限制拦住。
5. 在站点的 **Site configuration / Project configuration → Site details** 里可以改成 `muzhian-site`，地址会变成 `https://muzhian-site.netlify.app`。
6. 依次检查：首页、实验室、产品页、两个下载、公司信息、隐私政策、404。
7. 进入 **Domain management → Add a domain**，输入 `www.shmuzhian.cn`。  
   注意：域名右侧的 **Edit** 只是修改 `netlify.app` 子域名，不是绑定自己的域名；绑定要按 **+ Add a domain**。
   > 如果之前误加了 `muzhian.cn` 或 `www.muzhian.cn`，先在域名右侧的 **Options → Remove domain** 移除。你的实际域名是 `shmuzhian.cn`，两者不是同一个域名。
8. 在域名 DNS 服务商（阿里云/腾讯云等）添加：

```text
记录类型：CNAME
主机记录：www
记录值：你的项目.netlify.app
```

9. 绑定 `www` 后，Netlify 会自动把根域名 `shmuzhian.cn` 也加入同一个站点。按控制台 **Pending DNS verification** 里给出的提示配置根域名：
   - 如果 DNS 服务商支持 ALIAS / ANAME，指向 `apex-loadbalancer.netlify.com`。
   - 如果不支持，使用 A 记录指向 `75.2.60.5`；或者不改根域名，直接在注册商处做 URL 转发到 `https://www.shmuzhian.cn`。
10. 把 `www.shmuzhian.cn` 设为主域名（Primary domain）。如果控制台没有自动把根域名 301 到 www，就加一条 Domain redirect，或在注册商处做 URL 转发。
11. 等 DNS 生效后，在 Netlify 的 HTTPS 设置里确认证书已经签发。Netlify 会自动申请 Let's Encrypt 证书。
12. 如果证书一直不签发，检查域名 DNS 是否已经生效，以及是否存在限制 `letsencrypt.org` 的 CAA 记录。

> 如果邮箱正在使用，只加 `www` 的 CNAME 和根域名的 A/ALIAS 记录即可；不要改 NS，不要删除 MX、SPF、DKIM、DMARC 记录。

更新网站时，回到该站点的 **Deploys** 页面，把新的 `muzhian-site` 文件夹拖到页面底部的拖拽区域，即可生成新版本。没有接 Git 时，Netlify 不会执行构建命令，上传即发布。

### Cloudflare Pages（备选）

1. 登录 Cloudflare Dashboard → Workers & Pages → Create → Pages → Upload assets。
2. 项目名填 `muzhian-site`。
3. 打开解压后的目录，选中里面的全部文件上传。
4. Deploy 后得到 `https://muzhian-site.pages.dev`。
5. 依次检查：首页、实验室、产品下载、公司信息、隐私政策、404。
6. Custom domains → Set up a custom domain → 输入 `www.shmuzhian.cn`。
7. 如果域名 DNS 在阿里云/腾讯云，按控制台给出的目标添加：

```text
记录类型：CNAME
主机记录：www
记录值：你的项目.pages.dev
```

8. 如果域名已经托管在 Cloudflare，根域名 `shmuzhian.cn` 也可以直接添加为 Custom domain；否则在域名注册商处设置「URL 转发」，把根域名 301 到 `https://www.shmuzhian.cn`。
9. SSL/TLS 选择 Full (strict)，打开 Always Use HTTPS。
10. 绑定成功后，访问 `https://www.shmuzhian.cn`，确认没有证书警告。

> 不要把根域名直接 A 记录到某个固定 IP。Cloudflare Pages 不提供固定源站 IP，根域名应使用 CNAME/ALIAS 或 URL 转发。

### 如果必须使用中国大陆服务器 / 要 ICP 备案

1. 域名完成注册与实名认证。
2. 购买一台中国大陆的轻量应用服务器（阿里云/腾讯云等），取得备案服务码。
3. 通过服务商的备案系统提交公司主体、网站负责人、网站信息，等待管局审核，通常 1–3 周。
4. 备案通过后，把站点放到服务器 Nginx，或上传到 OSS/COS 静态托管并绑定已备案域名。
5. 配置 HTTPS 证书，把 HTTP 301 到 HTTPS。
6. 页脚替换真实备案号，并链接到 `https://beian.miit.gov.cn/`。

网站内容、公司名称与经营范围需要与营业执照保持一致；当前站点已经按营业执照信息组织。备案期间不要关闭网站，也不要在审核期间大幅改动公司主体信息。

### GitHub Pages（备选）

1. 新建仓库，上传本目录全部文件。
2. Settings → Pages → Deploy from a branch → `main` / root。
3. 自定义域名填 `www.shmuzhian.cn`，并配置 CNAME。
4. `.nojekyll` 已经放好，避免以下划线开头的 `_headers` 被 Jekyll 忽略。

GitHub Pages 同样属于境外托管，国内访问速度不稳定；`_headers` 在 GitHub Pages 上不会生效。

### 任意静态托管

把整个目录上传到 Nginx、OSS、COS、Vercel、Netlify 等静态托管即可。没有后端、没有数据库、没有构建命令。`_headers` 在 Netlify 和 Cloudflare Pages 上生效；`404.html` 会被 Netlify 自动用作出错页面。

### 部署后检查清单

- `https://www.shmuzhian.cn/` 能打开，证书有效。
- 手机端菜单、页面滚动、下载按钮正常。
- `downloads/dingding-viewer-1.0-setup.exe` 和便携版 ZIP 返回 200。
- 404 页面由主机关联到 `404.html`。
- `robots.txt` 和 `sitemap.xml` 可以访问。
- 根域名 301 到 `www`，只保留一个主域名。
- 页脚公司名称、统一社会信用代码、备案号正确。
- 邮箱 `lishihong@muzhian.cn` 可以正常收信。
- 如果启用百度/Google 收录，提交 `https://www.shmuzhian.cn/sitemap.xml`。

## 关于隐私与统计

当前网站：

- 不加载 Google Analytics、百度统计等第三方脚本。
- 不设置 Cookie。
- 不引入外部字体或 CDN，页面离线也能完整显示。
- 联系表单没有后端，统一使用 `mailto:` 邮件联系。

如果以后接入统计、表单、客服或字体 CDN，请同步更新 `privacy.html`，说明第三方名称、用途与数据处理方式。

## 可访问性

- 语义化标题层级、跳转到主内容的 skip link。
- 键盘可操作菜单，Esc 关闭，打开时焦点进入菜单，关闭后回到菜单按钮。
- 所有装饰图使用 `aria-hidden`；内容图有中文 alt。
- 支持 `prefers-reduced-motion`，关闭滚动动效与轮播动画。
- 颜色对比以正文可读性为优先；极小字号只用于装饰性标签。

## 维护提示

- 页脚年份由 `site.js` 自动取当前年份。
- 首页的产品入口、产品页下载按钮都指向真实相对路径；部署后不需要改链接。
- 产品页的「非主营业务」表述是刻意保留的，避免把公司定位成软件公司。
- 公司信息页依据 2025-02-11 核发的营业执照整理，如登记信息变更请同步更新。
