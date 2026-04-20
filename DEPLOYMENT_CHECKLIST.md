# 成都OPC中心 - 部署检查清单

## ✅ 已完成的准备工作

- [x] 创建完整的前后端项目结构
- [x] 配置CORS支持生产环境
- [x] 创建.gitignore文件
- [x] 创建.env.example示例文件
- [x] 添加Vercel配置文件
- [x] 初始化Git仓库
- [x] 提交所有代码到本地仓库
- [x] 创建详细的部署文档

## 📋 接下来的部署步骤

### 第一步：创建GitHub仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `chengdu-opc`
   - **Description**: `成都OPC中心官方网站`
   - **Visibility**: Public
   - **不要勾选**: Initialize this repository with a README
3. 点击 "Create repository"
4. 复制仓库URL（例如：`https://github.com/你的用户名/chengdu-opc.git`）

### 第二步：推送代码到GitHub

在终端运行以下命令：

```bash
cd /Users/alwan/chengdu-ai-community
git remote add origin https://github.com/你的用户名/chengdu-opc.git
git push -u origin main
```

### 第三步：部署数据库到Supabase

1. 访问 https://supabase.com 并登录
2. 创建新项目：
   - Name: `chengdu-opc`
   - Database Password: 设置强密码（记住它！）
   - Region: Northeast Asia (Seoul)
3. 等待项目创建完成（2-3分钟）
4. 进入 SQL Editor
5. 复制 `backend/schema.sql` 的内容
6. 粘贴并执行
7. 获取数据库连接字符串：
   - Settings → Database → Connection string → URI
   - 保存这个字符串

### 第四步：部署后端到Render

1. 访问 https://render.com 并登录
2. 点击 "New +" → "Web Service"
3. 连接GitHub仓库 `chengdu-opc`
4. 配置：
   - Name: `chengdu-opc-backend`
   - Region: Singapore
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. 添加环境变量：
   ```
   PORT=3000
   DATABASE_URL=你的Supabase连接字符串
   JWT_SECRET=运行命令生成: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   NODE_ENV=production
   ```
6. 点击 "Create Web Service"
7. 等待部署完成（5-10分钟）
8. 记下后端URL（例如：`https://chengdu-opc-backend.onrender.com`）

### 第五步：部署前端到Vercel

1. 访问 https://vercel.com 并登录
2. 点击 "Add New..." → "Project"
3. 导入GitHub仓库 `chengdu-opc`
4. 配置：
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. 添加环境变量：
   ```
   VITE_API_URL=你的Render后端URL/api
   ```
   例如：`https://chengdu-opc-backend.onrender.com/api`
6. 点击 "Deploy"
7. 等待部署完成（2-3分钟）
8. 记下前端URL（例如：`https://chengdu-opc.vercel.app`）

### 第六步：配置后端CORS

1. 回到Render Dashboard
2. 找到你的后端服务
3. 点击 "Environment"
4. 添加环境变量：
   ```
   FRONTEND_URL=你的Vercel前端URL
   ```
   例如：`https://chengdu-opc.vercel.app`
5. 保存后会自动重新部署

### 第七步：测试网站

访问你的Vercel前端URL，测试以下功能：

- [ ] 首页正常加载
- [ ] 查看赛事信息
- [ ] 查看过往活动
- [ ] 查看学习资源
- [ ] 使用访问码登录（需要先在管理后台创建访问码）
- [ ] 查看成员作品
- [ ] 管理员登录（用户名和密码在.env中设置）

### 第八步：防止Render休眠（可选）

使用 https://cron-job.org 创建定时任务：

1. 注册账户
2. 创建新任务
3. URL: `你的后端URL/api/stats`
4. 间隔: 每10分钟
5. 启用任务

## 🎯 部署后的URL

部署完成后，你将拥有：

- **前端网站**: `https://chengdu-opc.vercel.app`
- **后端API**: `https://chengdu-opc-backend.onrender.com`
- **数据库**: Supabase托管

## 📝 管理员账户设置

在Render后端环境变量中添加：

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的强密码
```

然后就可以访问 `你的前端URL/admin` 登录管理后台。

## 🔧 常见问题

### 后端访问慢？
Render免费版15分钟无请求会休眠，使用cron-job.org保持唤醒。

### 数据库连接失败？
检查Supabase连接字符串格式和密码是否正确。

### CORS错误？
确保后端FRONTEND_URL环境变量设置正确。

### 前端无法连接后端？
检查前端VITE_API_URL环境变量是否正确。

## 📚 详细文档

更多详细信息请查看：
- [DEPLOYMENT_FREE.md](DEPLOYMENT_FREE.md) - 完整部署指南
- [README.md](README.md) - 项目说明
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - 项目状态

---

**准备好了吗？开始部署吧！🚀**
