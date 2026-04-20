# 部署指南

## 数据库设置（Supabase）

### 1. 创建Supabase项目

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 记录数据库连接信息

### 2. 执行数据库初始化

在Supabase SQL编辑器中执行 `backend/schema.sql` 的内容

### 3. 创建管理员账号

默认管理员密码需要手动生成bcrypt哈希：

```bash
# 在本地运行
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your_password', 10, (err, hash) => console.log(hash));"
```

然后在Supabase SQL编辑器中更新：

```sql
UPDATE admins SET password_hash = '你生成的哈希' WHERE username = 'admin';
```

## 后端部署（Railway）

### 1. 准备工作

确保 `backend/package.json` 中有正确的启动脚本：

```json
{
  "scripts": {
    "start": "node src/app.js"
  }
}
```

### 2. 部署到Railway

1. 访问 [railway.app](https://railway.app)
2. 创建新项目
3. 选择 "Deploy from GitHub repo"
4. 选择你的仓库
5. 设置根目录为 `backend`

### 3. 配置环境变量

在Railway项目设置中添加：

```
PORT=3000
DATABASE_URL=你的Supabase连接字符串
JWT_SECRET=生成一个随机字符串
ADMIN_JWT_SECRET=生成另一个随机字符串
NODE_ENV=production
```

生成随机密钥：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. 部署

Railway会自动检测并部署。记录生成的URL（例如：`https://your-app.railway.app`）

## 前端部署（Vercel）

### 1. 准备工作

确保 `frontend/package.json` 中有构建脚本：

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 2. 部署到Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 导入GitHub仓库
3. 配置项目：
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. 配置环境变量

在Vercel项目设置中添加：

```
VITE_API_URL=https://your-backend.railway.app/api
```

### 4. 部署

Vercel会自动构建和部署。

## 后端CORS配置

确保后端允许前端域名访问。在 `backend/src/app.js` 中：

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## 验证部署

1. 访问前端URL
2. 检查首页是否正常显示
3. 尝试管理员登录（`/admin`）
4. 生成访问码
5. 使用访问码访问受保护页面

## 常见问题

### 数据库连接失败

检查：
- DATABASE_URL格式是否正确
- Supabase项目是否激活
- 防火墙设置

### CORS错误

确保：
- 后端CORS配置包含前端域名
- 环境变量VITE_API_URL正确

### 爬虫不工作

- 检查目标网站是否可访问
- 可能需要调整爬虫选择器
- 考虑使用代理或API替代

## 维护

### 定期任务

1. 检查爬虫任务是否正常运行
2. 清理过期的访问码
3. 备份数据库
4. 更新依赖包

### 监控

建议设置：
- 服务器健康检查
- 错误日志监控
- 数据库性能监控

## 安全建议

1. 定期更新所有依赖
2. 使用强密码和密钥
3. 启用HTTPS
4. 限制API请求频率
5. 定期审查访问日志
