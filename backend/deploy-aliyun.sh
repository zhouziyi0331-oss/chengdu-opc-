#!/bin/bash

# 成都OPC中心 - 阿里云服务器部署脚本
# 在阿里云服务器上运行此脚本

echo "🚀 成都OPC中心 - 后端部署脚本"
echo "================================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否为root用户
if [ "$EUID" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  请不要使用root用户运行此脚本${NC}"
    echo "建议使用普通用户，脚本会在需要时使用sudo"
    exit 1
fi

# 步骤1：更新系统
echo -e "${BLUE}步骤 1/7: 更新系统${NC}"
echo "------------------------------------------------"
sudo apt update
sudo apt upgrade -y
echo -e "${GREEN}✅ 系统更新完成${NC}"
echo ""

# 步骤2：安装Node.js
echo -e "${BLUE}步骤 2/7: 安装Node.js 18${NC}"
echo "------------------------------------------------"
if command -v node &> /dev/null; then
    echo "Node.js 已安装: $(node -v)"
else
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    echo -e "${GREEN}✅ Node.js 安装完成: $(node -v)${NC}"
fi
echo ""

# 步骤3：安装PM2
echo -e "${BLUE}步骤 3/7: 安装PM2${NC}"
echo "------------------------------------------------"
if command -v pm2 &> /dev/null; then
    echo "PM2 已安装: $(pm2 -v)"
else
    sudo npm install -g pm2
    echo -e "${GREEN}✅ PM2 安装完成${NC}"
fi
echo ""

# 步骤4：克隆代码
echo -e "${BLUE}步骤 4/7: 克隆代码${NC}"
echo "------------------------------------------------"
if [ -d "chengdu-opc-" ]; then
    echo "代码目录已存在，正在更新..."
    cd chengdu-opc-
    git pull
else
    echo "正在克隆代码..."
    git clone https://github.com/zhouziyi0331-oss/chengdu-opc-.git
    cd chengdu-opc-
fi
echo -e "${GREEN}✅ 代码准备完成${NC}"
echo ""

# 步骤5：安装依赖
echo -e "${BLUE}步骤 5/7: 安装后端依赖${NC}"
echo "------------------------------------------------"
cd backend
npm install
echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 步骤6：配置环境变量
echo -e "${BLUE}步骤 6/7: 配置环境变量${NC}"
echo "------------------------------------------------"
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env 文件已存在${NC}"
    read -p "是否覆盖？(y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "跳过环境变量配置"
        echo ""
    else
        rm .env
    fi
fi

if [ ! -f ".env" ]; then
    echo "请输入以下信息："
    echo ""
    read -p "Supabase数据库连接URL: " DATABASE_URL
    read -p "前端域名（例如：https://成都opc.top）: " FRONTEND_URL

    cat > .env << EOF
DATABASE_URL=$DATABASE_URL
JWT_SECRET=chengdu-opc-jwt-secret-2024
ADMIN_JWT_SECRET=chengdu-opc-admin-jwt-secret-2024
NODE_ENV=production
PORT=3000
FRONTEND_URL=$FRONTEND_URL
EOF

    echo -e "${GREEN}✅ 环境变量配置完成${NC}"
fi
echo ""

# 步骤7：启动服务
echo -e "${BLUE}步骤 7/7: 启动后端服务${NC}"
echo "------------------------------------------------"

# 停止旧服务（如果存在）
pm2 stop chengdu-opc-backend 2>/dev/null
pm2 delete chengdu-opc-backend 2>/dev/null

# 启动新服务
pm2 start src/app.js --name chengdu-opc-backend

# 设置开机自启
pm2 startup | tail -n 1 | sudo bash
pm2 save

echo -e "${GREEN}✅ 后端服务启动完成${NC}"
echo ""

# 显示服务状态
echo "================================================"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo "================================================"
echo ""
pm2 status
echo ""
echo "后端服务信息："
echo "- 运行状态: $(pm2 jlist | jq -r '.[0].pm2_env.status')"
echo "- 访问地址: http://$(curl -s ifconfig.me):3000"
echo "- 健康检查: http://$(curl -s ifconfig.me):3000/api/health"
echo ""
echo "常用命令："
echo "- 查看日志: pm2 logs chengdu-opc-backend"
echo "- 重启服务: pm2 restart chengdu-opc-backend"
echo "- 停止服务: pm2 stop chengdu-opc-backend"
echo "- 查看状态: pm2 status"
echo ""
echo -e "${YELLOW}⚠️  重要提示：${NC}"
echo "1. 请在阿里云控制台开放3000端口"
echo "2. 建议配置Nginx反向代理和SSL证书"
echo "3. 定期备份数据库"
echo ""
echo -e "${GREEN}祝使用愉快！🚀${NC}"
