# 🚀 快速开始 - 5分钟部署成都OPC中心网站

## 你需要准备的账户（全部免费）

1. **GitHub账户** - https://github.com
2. **Supabase账户** - https://supabase.com
3. **Render账户** - https://render.com
4. **Vercel账户** - https://vercel.com

> 💡 提示：所有账户都可以用GitHub登录，非常方便！

---

## 第一步：推送代码到GitHub（2分钟）

### 1. 创建GitHub仓库

访问 https://github.com/new

- Repository name: `chengdu-opc`
- Visibility: **Public**
- 不要勾选任何初始化选项
- 点击 "Create repository"

### 2. 推送代码

复制GitHub显示的仓库URL，然后在终端运行：

```bash
cd /Users/alwan/chengdu-ai-community
git remote add origin https://github.com/你的用户名/chengdu-opc.git
git push -u origin main
```

✅ 完成！代码已上传到GitHub

---

## 第二步：部署数据库（3分钟）

### 1. 创建Supabase项目

访问 https://supabase.com → 点击 "New Project"

- Name: `chengdu-opc`
- Database Password: 设置一个强密码（**记住它！**）
- Region: **Northeast Asia (Seoul)**
- 点击 "Create new project"

等待2-3分钟...

### 2. 初始化数据库

项目创建完成后：

1. 左侧菜单点击 "SQL Editor"
2. 点击 "New query"
3. 打开本地文件 `backend/schema.sql`
4. 复制全部内容，粘贴到SQL编辑器
5. 点击 "Run" 执行

✅ 数据库表已创建！

### 3. 获取连接字符串

1. 左侧菜单点击 "Settings" → "Database"
2. 找到 "Connection string" 部分
3. 选择 "URI" 模式
4. 复制连接字符串（类似这样）：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
5. **保存这个字符串**，下一步会用到

---

## 第三步：部署后端（5分钟）

### 1. 创建Render服务

访问 https://render.com → 点击 "New +" → "Web Service"

### 2. 连接GitHub

- 选择你的GitHub仓库 `chengdu-opc`
- 点击 "Connect"

### 3. 配置服务

填写以下信息：

- **Name**: `chengdu-opc-backend`
- **Region**: **Singapore**
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: **Free**

### 4. 添加环境变量

点击 "Advanced" → "Add Environment Variable"，添加以下变量：

| Key | Value |
|-----|-------|
| `PORT` | `3000` |
| `DATABASE_URL` | 你的Supabase连接字符串 |
| `JWT_SECRET` | 运行命令生成：`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NODE_ENV` | `production` |

### 5. 部署

点击 "Create Web Service"，等待5-10分钟...

✅ 后端部署完成！记下你的后端URL（例如：`https://chengdu-opc-backend.onrender.com`）

---

## 第四步：部署前端（3分钟）

### 1. 创建Vercel项目

访问 https://vercel.com → 点击 "Add New..." → "Project"

### 2. 导入仓库

- 选择你的GitHub仓库 `chengdu-opc`
- 点击 "Import"

### 3. 配置项目

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4. 添加环境变量

点击 "Environment Variables"，添加：

| Name | Value |
|------|-------|
| `VITE_API_URL` | `你的Render后端URL/api` |

例如：`https://chengdu-opc-backend.onrender.com/api`

### 5. 部署

点击 "Deploy"，等待2-3分钟...

✅ 前端部署完成！记下你的前端URL（例如：`https://chengdu-opc.vercel.app`）

---

## 第五步：配置CORS（1分钟）

### 回到Render

1. 打开你的Render Dashboard
2. 找到 `chengdu-opc-backend` 服务
3. 点击 "Environment"
4. 添加新的环境变量：

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | 你的Vercel前端URL |

例如：`https://chengdu-opc.vercel.app`

5. 保存后会自动重新部署（等待2分钟）

✅ CORS配置完成！

---

## 🎉 完成！测试你的网站

访问你的Vercel前端URL，例如：`https://chengdu-opc.vercel.app`

### 测试清单

- [ ] 首页正常显示
- [ ] 点击"关于我们"查看社群介绍
- [ ] 点击"赛事信息"查看赛事列表
- [ ] 点击"学习资源"查看资源
- [ ] 点击"成员作品"会提示需要访问码（正常）

### 创建第一个访问码

1. 访问 `你的网站/admin`
2. 使用默认账户登录：
   - 用户名：`admin`
   - 密码：`admin123`
3. 在管理后台创建访问码
4. 使用访问码登录查看受保护内容

---

## 📝 你的网站信息

部署完成后，记录以下信息：

```
前端网站: https://chengdu-opc.vercel.app
后端API: https://chengdu-opc-backend.onrender.com
数据库: Supabase托管

管理员账户:
- 用户名: admin
- 密码: admin123 (请尽快修改！)
```

---

## 🔧 可选：防止后端休眠

Render免费版15分钟无请求会休眠，首次访问需要30秒唤醒。

### 使用cron-job.org保持唤醒

1. 访问 https://cron-job.org 注册
2. 创建新任务：
   - Title: `Keep chengdu-opc alive`
   - URL: `你的后端URL/api/stats`
   - Schedule: 每10分钟
3. 保存并启用

✅ 现在你的网站会一直保持活跃！

---

## 🎯 下一步

1. **修改管理员密码**
2. **创建访问码**分享给社群成员
3. **添加内容**：
   - 上传活动照片
   - 添加成员信息
   - 发布赛事信息
   - 分享学习资源
4. **自定义域名**（可选）：
   - 在Vercel项目设置中添加自定义域名

---

## 💰 成本

**总成本：$0/月** 🎉

所有服务都在免费额度内！

---

## 📚 需要帮助？

- 详细部署指南：[DEPLOYMENT_FREE.md](DEPLOYMENT_FREE.md)
- 项目说明：[README.md](README.md)
- 部署检查清单：[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

**恭喜！你的成都OPC中心官网已经上线了！🚀**
