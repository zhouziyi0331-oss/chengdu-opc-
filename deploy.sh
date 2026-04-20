#!/bin/bash

echo "🚀 成都OPC中心 - 快速部署脚本"
echo "================================"
echo ""

# 检查是否在项目根目录
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查Git
if ! command -v git &> /dev/null; then
    echo "❌ 错误：未安装Git"
    exit 1
fi

echo "📝 步骤1: 初始化Git仓库"
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git仓库已初始化"
else
    echo "✅ Git仓库已存在"
fi

echo ""
echo "📝 步骤2: 添加所有文件"
git add .
git status

echo ""
echo "📝 步骤3: 创建提交"
read -p "请输入提交信息 (默认: Initial commit): " commit_msg
commit_msg=${commit_msg:-"Initial commit"}
git commit -m "$commit_msg"

echo ""
echo "📝 步骤4: 设置主分支"
git branch -M main

echo ""
echo "✅ 本地准备完成！"
echo ""
echo "接下来的步骤："
echo "1. 在GitHub创建新仓库: https://github.com/new"
echo "   - 仓库名: chengdu-opc"
echo "   - 可见性: Public"
echo "   - 不要初始化README"
echo ""
echo "2. 复制仓库URL，然后运行："
echo "   git remote add origin https://github.com/你的用户名/chengdu-opc.git"
echo "   git push -u origin main"
echo ""
echo "3. 按照 DEPLOYMENT_FREE.md 文档部署到云服务"
echo ""
echo "📚 详细部署指南: DEPLOYMENT_FREE.md"
