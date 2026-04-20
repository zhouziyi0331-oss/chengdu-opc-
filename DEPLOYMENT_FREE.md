# 成都OPC中心 - 免费部署指南

本指南将帮助你将项目部署到完全免费的云服务上。

## 部署架构

- **前端**: Vercel (免费)
- **后端**: Render (免费)
- **数据库**: Supabase (免费)

## 第一步：部署数据库 (Supabase)

### 1. 创建Supabase账户

1. 访问 https://supabase.com
2. 点击 "Start your project"
3. 使用GitHub账户登录

### 2. 创建新项目

1. 点击 "New Project"
2. 填写项目信息：
   - Name: `chengdu-opc`
   - Database Password: 设置一个强密码（记住它！）
   - Region: Northeast Asia (Seoul) - 最接近中国
3. 点击 "Create new project"
4. 等待2-3分钟项目创建完成

### 3. 获取数据库连接信息

1. 在项目页面，点击左侧 "Settings" → "Database"
2. 找到 "Connection string" 部分
3. 选择 "URI" 模式
4. 复制连接字符串（类似这样）：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
5. 保存这个连接字符串，后面会用到

### 4. 初始化数据库

1. 在Supabase项目页面，点击左侧 "SQL Editor"
2. 点击 "New query"
3. 打开本地的 `backend/schema.sql` 文件
4. 复制所有内容粘贴到SQL编辑器
5. 点击 "Run" 执行
6. 确认所有表都创建成功

## 第二步：部署后端 (Render)

### 1. 准备代码

确保你的代码已经推送到GitHub仓库。如果还没有：

```bash
cd chengdu-ai-community
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/chengdu-opc.git
git push -u origin main
```

### 2. 创建Render账户

1. 访问 https://render.com
2. 点击 "Get Started"
3. 使用GitHub账户登录

### 3. 部署后端服务

1. 在Render Dashboard，点击 "New +" → "Web Service"
2. 连接你的GitHub仓库
3. 选择 `chengdu-ai-community` 仓库
4. 填写配置：
   - **Name**: `chengdu-opc-backend`
   - **Region**: Singapore (最接近中国)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. 添加环境变量（点击 "Advanced" → "Add Environment Variable"）：
   ```
   PORT=3000
   DATABASE_URL=你的Supabase连接字符串
   JWT_SECRET=生成一个随机字符串（至少32位）
   NODE_ENV=production
   ```

6. 点击 "Create Web Service"
7. 等待5-10分钟部署完成
8. 记下你的后端URL（类似 `https://chengdu-opc-backend.onrender.com`）

### 生成JWT_SECRET

在终端运行：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 第三步：部署前端 (Vercel)

### 1. 创建Vercel账户

1. 访问 https://vercel.com
2. 点击 "Sign Up"
3. 使用GitHub账户登录

### 2. 部署前端

1. 在Vercel Dashboard，点击 "Add New..." → "Project"
2. 导入你的GitHub仓库 `chengdu-ai-community`
3. 配置项目：
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. 添加环境变量：
   ```
   VITE_API_URL=你的Render后端URL/api
   ```
   例如：`https://chengdu-opc-backend.onrender.com/api`

5. 点击 "Deploy"
6. 等待2-3分钟部署完成

### 3. 配置自定义域名（可选）

1. 在Vercel项目页面，点击 "Settings" → "Domains"
2. 添加域名：`chengdu-opc.vercel.app`（免费）
3. 或者绑定你自己的域名

## 第四步：配置CORS

### 更新后端CORS设置

1. 在Render Dashboard，找到你的后端服务
2. 点击 "Environment" → "Add Environment Variable"
3. 添加：
   ```
   FRONTEND_URL=你的Vercel前端URL
   ```
   例如：`https://chengdu-opc.vercel.app`

4. 更新 `backend/src/app.js` 中的CORS配置：

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

5. 提交代码并推送到GitHub
6. Render会自动重新部署

## 第五步：测试部署

1. 访问你的Vercel前端URL
2. 测试以下功能：
   - ✅ 首页加载
   - ✅ 查看赛事信息
   - ✅ 查看过往活动
   - ✅ 查看学习资源
   - ✅ 使用访问码登录
   - ✅ 查看成员作品
   - ✅ 管理员登录

## 部署后的URL

- **前端**: https://chengdu-opc.vercel.app
- **后端**: https://chengdu-opc-backend.onrender.com
- **数据库**: Supabase托管

## 免费额度说明

### Vercel (前端)
- ✅ 100GB带宽/月
- ✅ 无限部署
- ✅ 自动HTTPS
- ✅ 全球CDN

### Render (后端)
- ✅ 750小时/月（足够一个服务全月运行）
- ⚠️ 15分钟无请求后会休眠
- ⚠️ 首次访问可能需要30秒唤醒
- ✅ 自动HTTPS

### Supabase (数据库)
- ✅ 500MB数据库存储
- ✅ 1GB文件存储
- ✅ 50,000次数据库请求/月
- ✅ 自动备份

## 优化建议

### 1. 防止Render休眠

创建一个定时任务每10分钟ping一次后端：

使用 https://cron-job.org (免费)：
1. 注册账户
2. 创建新任务
3. URL: `你的后端URL/api/stats`
4. 间隔: 每10分钟
5. 启用任务

### 2. 加速中国访问

如果需要更快的中国访问速度，可以考虑：
- 使用Cloudflare CDN（免费）
- 或者使用国内服务（需要备案）

## 常见问题

### Q: 后端访问很慢？
A: Render免费版会在15分钟无请求后休眠，首次访问需要30秒唤醒。使用cron-job.org保持唤醒。

### Q: 数据库连接失败？
A: 检查Supabase连接字符串是否正确，确保包含正确的密码。

### Q: CORS错误？
A: 确保后端的FRONTEND_URL环境变量设置正确。

### Q: 前端无法连接后端？
A: 检查前端的VITE_API_URL环境变量是否正确。

## 更新部署

### 更新前端
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel会自动重新部署。

### 更新后端
```bash
git add .
git commit -m "Update backend"
git push
```
Render会自动重新部署。

### 更新数据库
1. 在Supabase SQL Editor中执行新的SQL语句
2. 或者使用迁移工具

## 监控和日志

### Vercel日志
1. 在Vercel项目页面
2. 点击 "Deployments"
3. 查看每次部署的日志

### Render日志
1. 在Render服务页面
2. 点击 "Logs"
3. 实时查看服务器日志

### Supabase日志
1. 在Supabase项目页面
2. 点击 "Logs"
3. 查看数据库查询日志

## 成本估算

**总成本**: $0/月 🎉

所有服务都在免费额度内，足够支撑一个中小型社群网站。

---

**部署完成后，你将拥有一个完全免费、全球可访问的专业网站！**
