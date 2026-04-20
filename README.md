# 成都OPC中心官方网站

一个功能完整的社群管理网站，包含前端展示、访问码认证系统和管理员后台。

## 项目简介

成都OPC中心官网是一个专注于AI技能学习、资讯分享和活动组织的社群平台。网站采用现代化的技术栈和圆润的设计风格，提供完整的内容管理和用户访问控制功能。

### 核心功能

- 🏠 **公开页面**：首页、关于我们、赛事信息、过往活动、学习资源
- 🔒 **受保护页面**：成员作品、成员信息、活动预告（需访问码）
- 👨‍💼 **管理员后台**：完整的内容管理系统（CRUD操作）
- 🎫 **访问码系统**：一次登录7天有效，全站通用
- 📱 **响应式设计**：完美适配移动端和桌面端

## 技术栈

### 前端
- **框架**: React 18 + Vite
- **样式**: TailwindCSS（Minerva圆润风格）
- **路由**: React Router v6
- **状态管理**: Zustand
- **HTTP客户端**: Axios

### 后端
- **框架**: Express.js
- **数据库**: PostgreSQL
- **认证**: JWT (JSON Web Tokens)
- **密码加密**: bcrypt

## 项目结构

```
chengdu-ai-community/
├── backend/                    # 后端服务
│   ├── src/
│   │   ├── app.js             # Express主应用
│   │   ├── models/
│   │   │   └── db.js          # 数据库连接
│   │   ├── middleware/
│   │   │   └── auth.js        # 认证中间件
│   │   └── routes/            # API路由
│   │       ├── public.js      # 公开API
│   │       ├── protected.js   # 受保护API
│   │       └── admin.js       # 管理员API
│   ├── schema.sql             # 数据库结构
│   ├── package.json
│   └── .env                   # 环境变量
│
├── frontend/                   # 前端应用
│   ├── src/
│   │   ├── App.jsx            # 主应用
│   │   ├── components/        # 组件
│   │   ├── pages/             # 页面
│   │   ├── services/          # API服务
│   │   └── store/             # 状态管理
│   ├── package.json
│   └── .env                   # 环境变量
│
└── README.md                   # 本文件
```

## 快速开始

### 前置要求

- Node.js >= 16.x
- PostgreSQL >= 13.x
- npm 或 yarn

### 1. 克隆项目

```bash
git clone <repository-url>
cd chengdu-ai-community
```

### 2. 数据库设置

#### 创建数据库

```bash
# 登录PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE opc_center;

# 退出
\q
```

#### 导入数据库结构

```bash
psql -U postgres -d opc_center -f backend/schema.sql
```

### 3. 后端设置

```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 创建.env文件
cat > .env << EOF
PORT=3000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/opc_center
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
EOF

# 启动后端服务
npm start
```

后端服务将运行在 `http://localhost:3000`

### 4. 前端设置

```bash
# 打开新终端，进入前端目录
cd frontend

# 安装依赖
npm install

# 创建.env文件
cat > .env << EOF
VITE_API_URL=http://localhost:3000/api
EOF

# 启动开发服务器
npm run dev
```

前端应用将运行在 `http://localhost:5173`

### 5. 访问应用

- **前端**: http://localhost:5173
- **后端API**: http://localhost:3000/api

### 默认账户

#### 管理员账户
- 用户名: `admin`
- 密码: `admin123`

#### 测试访问码
- `DEMO2024` - 演示用户
- `TEST2024` - 测试用户

## API文档

### 公开API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/stats` | 获取统计数据 |
| GET | `/api/competitions` | 获取赛事列表 |
| GET | `/api/competitions/:id` | 获取赛事详情 |
| GET | `/api/activities/past` | 获取过往活动 |
| GET | `/api/activities/:id/photos` | 获取活动照片 |
| GET | `/api/resources` | 获取学习资源 |
| POST | `/api/login` | 访问码登录 |
| POST | `/api/admin/login` | 管理员登录 |

### 受保护API（需要访问码token）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/works` | 获取成员作品 |
| POST | `/api/works/:id/like` | 作品点赞 |
| GET | `/api/members` | 获取成员列表 |
| GET | `/api/activities/upcoming` | 获取即将举办的活动 |
| GET | `/api/projects` | 获取协作项目 |

### 管理员API（需要管理员token）

所有管理员API都在 `/api/admin` 路径下，支持完整的CRUD操作：

- **活动管理**: `/admin/activities`
- **成员管理**: `/admin/members`
- **作品管理**: `/admin/works`
- **项目管理**: `/admin/projects`
- **赛事管理**: `/admin/competitions`
- **资源管理**: `/admin/resources`
- **访问码管理**: `/admin/access-codes`
- **社群信息**: `/admin/community-info`

## 数据库表结构

### 核心表

1. **access_codes** - 访问码管理
2. **activities** - 活动信息
3. **activity_photos** - 活动照片
4. **members** - 成员信息
5. **member_works** - 成员作品
6. **learning_resources** - 学习资源
7. **collaboration_projects** - 协作项目
8. **competitions** - 赛事信息
9. **admins** - 管理员账户
10. **community_info** - 社群信息

详细表结构请查看 `backend/schema.sql`

## 开发指南

### 添加新页面

1. 在 `frontend/src/pages/` 创建新页面组件
2. 在 `frontend/src/App.jsx` 添加路由
3. 在 `frontend/src/components/Layout.jsx` 添加导航链接

### 添加新API

1. 在 `backend/src/routes/` 对应文件中添加路由
2. 在 `frontend/src/services/api.js` 添加API调用函数
3. 在页面组件中使用API函数

### 样式规范

项目采用Minerva圆润设计风格：

- **圆角**: `rounded-3xl` (卡片), `rounded-full` (按钮)
- **阴影**: `shadow-sm`, `hover:shadow-lg`
- **渐变**: `bg-gradient-to-br`, `bg-gradient-to-r`
- **动画**: `hover:scale-105`, `transition-all`
- **色彩**: 蓝紫渐变主题

## 部署

### 环境变量配置

#### 生产环境后端 (.env)
```env
PORT=3000
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

#### 生产环境前端 (.env)
```env
VITE_API_URL=https://your-api-domain.com/api
```

### 部署选项

1. **Vercel** (前端) + **Render** (后端) + **Supabase** (数据库)
2. **Netlify** (前端) + **Railway** (后端+数据库)
3. **自建服务器** (Nginx + PM2)

详细部署步骤请参考 `DEPLOYMENT.md`

## 常见问题

### 1. 数据库连接失败

检查：
- PostgreSQL服务是否运行
- 数据库URL是否正确
- 数据库用户权限是否足够

### 2. 前端无法连接后端

检查：
- 后端服务是否启动
- CORS配置是否正确
- 前端.env中的API_URL是否正确

### 3. 访问码登录失败

检查：
- 访问码是否存在于数据库
- 访问码是否已过期
- JWT_SECRET是否配置正确

## 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

MIT License

## 联系方式

- 邮箱: contact@chengdu-opc.com
- 微信: chengdu_opc

---

**Made with ❤️ by 成都OPC中心**
