# 后台使用说明 · Pages CMS

这个版本在原来的静态网站上增加了一个「案例后台」。  
后台使用 **Pages CMS**（GitHub 上的内容管理工具），不需要服务器、数据库，也没有月费。

编辑流程：

```text
Pages CMS 后台填写案例
→ 保存到 GitHub
→ Netlify 自动重新部署
→ 网站更新
```

---

## 一、注册 GitHub

1. 打开 https://github.com
2. 点右上角 **Sign up**
3. 用公司邮箱注册（可以使用 `lishihong@muzhian.cn`），设置用户名和密码
4. 去邮箱点验证链接
5. 建议开启两步验证（2FA）

> GitHub 是英文界面，但注册一次后，平时只在 Pages CMS 后台操作。

---

## 二、创建仓库并上传网站

1. 登录 GitHub，点右上角 **+ → New repository**
2. 仓库名填：

```text
muzhian-site
```

3. 选择 **Private**（私有仓库），点 **Create repository**
4. 进入仓库，点 **uploading an existing file**
5. 解压 `muzhian-cms.zip`，把 `muzhian-cms` 文件夹**里面的全部内容**拖进去：

```text
index.html
dingding.html
company.html
privacy.html
404.html
work.html
admin.html
assets/
content/
downloads/
.pages.yml
netlify.toml
```

注意：不要把 `muzhian-cms` 文件夹本身再套一层。仓库根目录必须直接看到 `index.html`。

6. 点 **Commit changes** 保存。

> `.pages.yml` 是后台配置文件，文件名前面有一个点，不要漏传。

---

## 三、把 Netlify 接到 GitHub

你现在的 Netlify 站点是拖拽上传的。接入 GitHub 后，后台保存的内容会自动部署。

1. 打开 Netlify 的现有项目
2. 进入 **Site configuration / Project configuration → Build & deploy**
3. 找到 **Link repository** / **Link site to Git**
4. 选择 GitHub，授权 Netlify 访问
5. 选择仓库 `muzhian-site`，分支 `main`
6. 构建设置：

```text
Build command: 留空
Publish directory: .
```

7. 保存并部署

`netlify.toml` 里已经写好了：

```toml
[build]
  publish = "."
```

如果 Netlify 不能给现有站点直接接 Git，就新建一个 Git 站点，再把 `www.shmuzhian.cn` 从旧站点移到新站点。操作前先确认旧站点的域名和证书。

---

## 四、打开后台

后台入口：

```text
https://www.shmuzhian.cn/admin.html
```

它会跳转到：

```text
https://app.pagescms.org
```

第一次使用：

1. 用 GitHub 账号登录
2. 按提示安装 GitHub App（只授权给 `muzhian-site` 仓库）
3. 选择 `muzhian-site` 仓库
4. 左侧会出现「公司案例」
5. 点 **New / 新建**，填写案例

---

## 五、添加一个案例

每个案例填写：

```text
项目名称
链接标识（英文、数字、短横线，例如 brand-redesign）
客户 / 品牌
年份
服务内容
一句话介绍
封面图
项目背景 / 问题
我们做了什么
项目结果
项目图片（可多张）
在首页推荐
发布
排序（数字越小越靠前）
```

图片会自动上传到：

```text
assets/work/
```

保存后：

- 案例会出现在 `https://www.shmuzhian.cn/work.html`
- 勾选「在首页推荐」的案例会出现在首页「精选案例」
- 勾选「发布」才会公开

> 首页最多显示 3 个推荐案例。建议先做 2–3 个案例，再打开首页推荐。

---

## 六、更新流程

以后每次修改：

1. 打开 `https://www.shmuzhian.cn/admin.html`
2. 登录 Pages CMS
3. 编辑或新增案例
4. 点保存 / Publish
5. 等 1–2 分钟
6. 刷新网站查看

不需要再拖文件夹，也不需要改 DNS 或证书。

---

## 七、注意事项

- **案例内容是浏览器加载的**，不是每个案例单独的静态页面。SEO 会弱一些；如果以后需要每个案例被百度/Google 单独收录，可以再做静态生成。
- Pages CMS 的界面按钮可能还有英文，但字段名都是中文。
- GitHub 账号一定要用公司控制的邮箱，并开启 2FA。
- 不要把 GitHub 密码发给任何人。
- 如果 GitHub 打不开，后台无法使用；这种情况下可以继续用「手动更新」的方式。
- `content/cases.json` 是后台的数据文件，不建议手动改；用 Pages CMS 编辑。
- 图片建议 1600px 宽、200–300KB，JPG/WebP，文件名英文。

---

## 八、如果后台配置失败

把下面信息发给开发者：

```text
GitHub 仓库：muzhian-site
Netlify 项目：muzhian-site
后台地址：https://www.shmuzhian.cn/admin.html
CMS 平台：Pages CMS
配置文件：.pages.yml
```

需要检查：

- `.pages.yml` 是否在仓库根目录
- Netlify 是否已经连接到 GitHub
- Pages CMS 是否安装了 GitHub App
- GitHub App 是否选中了正确的仓库
