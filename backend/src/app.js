const express = require('express');
const cors = require('cors');
require('dotenv').config();

const publicRoutes = require('./routes/public');
const protectedRoutes = require('./routes/protected');
const adminRoutes = require('./routes/admin');

const app = express();

// 中间件
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// 路由
app.use('/api', publicRoutes);
app.use('/api', protectedRoutes);
app.use('/api/admin', adminRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// Vercel Serverless 函数导出
module.exports = app;

// 本地开发时启动服务器
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}
