# 成都OPC中心官方网站

> 一个现代化的社群官网，采用Minerva圆润设计风格，支持访问码登录和完整的管理后台。

## 🌟 项目特点

- ✅ **完全免费部署** - 使用Vercel + Render + Supabase，零成本运行
- ✅ **现代设计** - Minerva风格，大圆角卡片，柔和渐变
- ✅ **访问码系统** - 简单的访问控制，无需手机号/微信
- ✅ **管理后台** - 完整的内容管理系统
- ✅ **响应式设计** - 完美支持手机/平板/电脑
- ✅ **生产就绪** - 完整的前后端实现，可直接部署

## 🚀 快速开始

### 方式一：5分钟快速部署（推荐）

查看 **[QUICK_START.md](QUICK_START.md)** - 最简单的部署指南

### 方式二：详细部署指南

查看 **[DEPLOYMENT_FREE.md](DEPLOYMENT_FREE.md)** - 包含所有细节和常见问题

### 方式三：使用检查清单

查看 **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - 确保不遗漏任何步骤

## 📦 项目结构

```
chengdu-ai-community/
├── backend/          # Node.js + Express 后端
├── frontend/         # React + Vite 前端
└── 文档/             # 完整的部署和使用文档
```

## 🎯 功能列表

### 公开页面
- 首页 - 社群介绍和统计数据
- 关于我们 - 详细的社群定位
- 赛事信息 - 展示精选赛事
- 过往活动 - 活动照片和介绍
- 学习资源 - AI资讯和教程

### 受保护页面（需访问码）
- 成员作品 - 展示成员项目
- 成员列表 - 查看所有成员
- 即将活动 - 活动预告和报名

### 管理后台
- 访问码管理
- 成员管理
- 作品管理
- 活动管理
- 赛事管理
- 资源管理

## 💻 技术栈

### 前端
- React 18
- React Router 6
- TailwindCSS
- Zustand
- Axios
- Vite

### 后端
- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt

### 部署
- Vercel (前端)
- Render (后端)
- Supabase (数据库)

## 💰 成本

**总成本：$0/月** 🎉

所有服务都在免费额度内，足够支撑中小型社群网站。

## 📚 文档

- [QUICK_START.md](QUICK_START.md) - 5分钟快速部署
- [DEPLOYMENT_FREE.md](DEPLOYMENT_FREE.md) - 详细部署指南
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - 部署检查清单
- [PROJECT_COMPLETE.md](PROJECT_COMPLETE.md) - 项目完成总结
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - 项目状态
- [IMAGE_REQUIREMENTS.md](IMAGE_REQUIREMENTS.md) - 图片素材需求

## 🔧 本地开发

### 后端

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 配置数据库连接
npm start
```

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 数据库

使用PostgreSQL，执行 `backend/schema.sql` 初始化数据库。

## 🎨 设计风格

采用Minerva现代圆润设计：
- 大圆角（32px）
- 柔和阴影
- 渐变色彩
- 平滑动画
- 响应式布局

## 🔐 安全特性

- JWT Token认证
- 访问码验证
- 管理员权限控制
- CORS跨域保护
- 环境变量隔离

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

## 🎉 准备好了吗？

按照 [QUICK_START.md](QUICK_START.md) 开始部署，15分钟后你的网站就会上线！

**项目状态**: ✅ 生产就绪  
**版本**: 1.0.0
