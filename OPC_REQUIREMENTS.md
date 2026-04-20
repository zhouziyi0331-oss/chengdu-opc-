# 成都OPC中心网站 - 完整需求文档

## 一、社群定位

**名称**: 成都OPC中心（Open Prompt Community）
**定位**: AI技能学习与实践社群
**口号**: 用AI这个新玩具，给自己"开个挂"

## 二、核心功能模块

### 1. 首页
- Hero区域：社群介绍和口号
- 三大核心价值：有意思、有成长、有体系
- 统计数据：成员数、项目数、活动数
- 三条进阶航道展示
- 最新活动预告

### 2. 关于我们
- 社群介绍
- 为什么是"我们"
- 成员构成（摄影师、社区管家、大学生、产品经理、公益人、生意人等）
- 三条进阶航道详细说明：
  - 🚢 探索者号（本群）
  - 🛳️ 生产者号（二群）
  - 🚀 领航员号（三群）

### 3. 过往活动展示（新增重点页面）
- 活动列表（时间倒序）
- 每个活动包含：
  - 活动标题
  - 活动时间
  - 活动地点
  - 活动照片（多张）
  - 活动描述
  - 参与人数
  - 活动成果
- 照片墙展示
- 活动分类筛选（线上/线下/工作坊/分享会）

### 4. 成员作品展示
- 成员AI作品展示
- 作品分类：
  - AI视频
  - AI图片
  - AI动画
  - AI文案
  - 其他创意
- 每个作品包含：
  - 作品预览
  - 创作者昵称
  - 创作工具
  - 创作心得
  - 点赞数

### 5. 角色系统
- 【氛围组】👏：围观、点赞、提问、交流
- 【行动派】🚀：动手做，分享作品
- 【记录官】📝：统计优秀作品与经验
- 【参谋官】💡：提供建设性意见

### 6. 学习资源
- AI工具推荐
- 教程分享
- 经验文章
- 《行业AI实战工具书》（共创内容）

### 7. 项目协作
- 项目发起
- 组队招募
- 商业化讨论
- 流量运营交流

### 8. 活动预告
- 即将举办的活动
- 报名入口
- 活动详情

### 9. 社群规则
- 航行规则
- 鼓励用AI"打广告"
- 守护纯净海域
- 问题提问指南

## 三、需要的图片清单

### 首页
1. `hero-banner.jpg` - 主视觉横幅（1920x800px）
2. `community-intro.jpg` - 社群介绍配图（800x600px）
3. `icon-interesting.svg` - "有意思"图标
4. `icon-growth.svg` - "有成长"图标
5. `icon-system.svg` - "有体系"图标

### 过往活动页面（重点）
6. `activity-1-cover.jpg` - 活动1封面
7. `activity-1-photo-1.jpg` - 活动1照片1
8. `activity-1-photo-2.jpg` - 活动1照片2
9. `activity-1-photo-3.jpg` - 活动1照片3
10. `activity-2-cover.jpg` - 活动2封面
11. `activity-2-photo-1.jpg` - 活动2照片1
12. `activity-2-photo-2.jpg` - 活动2照片2
13. `activity-3-cover.jpg` - 活动3封面
14. `activity-3-photo-1.jpg` - 活动3照片1
15. `activity-3-photo-2.jpg` - 活动3照片2

### 三条航道
16. `ship-explorer.png` - 探索者号图标（400x400px）
17. `ship-producer.png` - 生产者号图标（400x400px）
18. `ship-navigator.png` - 领航员号图标（400x400px）

### 角色系统
19. `role-atmosphere.png` - 氛围组图标
20. `role-action.png` - 行动派图标
21. `role-recorder.png` - 记录官图标
22. `role-advisor.png` - 参谋官图标

### 成员作品
23. `work-example-1.jpg` - 作品示例1
24. `work-example-2.jpg` - 作品示例2
25. `work-example-3.jpg` - 作品示例3

### 其他
26. `logo.png` - OPC中心Logo（200x200px）
27. `default-avatar.png` - 默认头像
28. `placeholder-image.jpg` - 占位图

## 四、数据库结构更新

### 新增表

```sql
-- 活动表（扩展）
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(20), -- 'online', 'offline', 'workshop', 'sharing'
  description TEXT,
  event_date TIMESTAMP,
  location VARCHAR(200),
  cover_image VARCHAR(500),
  participant_count INTEGER DEFAULT 0,
  achievements TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 活动照片表
CREATE TABLE activity_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  photo_url VARCHAR(500) NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 成员作品表
CREATE TABLE member_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  creator_name VARCHAR(100) NOT NULL,
  work_type VARCHAR(50), -- 'video', 'image', 'animation', 'text', 'other'
  preview_url VARCHAR(500),
  tools_used TEXT[],
  description TEXT,
  insights TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 角色系统表
CREATE TABLE member_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID,
  role_type VARCHAR(50), -- 'atmosphere', 'action', 'recorder', 'advisor'
  assigned_at TIMESTAMP DEFAULT NOW()
);

-- 学习资源表
CREATE TABLE learning_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50), -- 'tool', 'tutorial', 'article', 'book'
  url VARCHAR(500),
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- 项目协作表
CREATE TABLE collaboration_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  initiator VARCHAR(100),
  status VARCHAR(20), -- 'recruiting', 'in_progress', 'completed'
  required_skills TEXT[],
  team_members TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 五、页面结构

```
成都OPC中心
├── 首页
│   ├── Hero区域
│   ├── 三大核心价值
│   ├── 统计数据
│   ├── 三条进阶航道
│   └── 最新活动
│
├── 关于我们
│   ├── 社群介绍
│   ├── 为什么是"我们"
│   ├── 成员构成
│   └── 进阶航道详情
│
├── 过往活动 ⭐（新增重点）
│   ├── 活动列表
│   ├── 活动详情
│   ├── 照片墙
│   └── 活动筛选
│
├── 成员作品
│   ├── 作品展示
│   ├── 作品分类
│   └── 作品详情
│
├── 角色系统
│   ├── 角色介绍
│   └── 角色选择
│
├── 学习资源
│   ├── AI工具
│   ├── 教程文章
│   └── 实战工具书
│
├── 项目协作
│   ├── 项目列表
│   ├── 发起项目
│   └── 组队招募
│
├── 活动预告
│   ├── 即将举办
│   └── 报名入口
│
└── 社群规则
    ├── 航行规则
    └── 新手任务
```

## 六、功能优化和补充

### 已有功能优化
1. ✅ 访问码系统 → 保留
2. ✅ 管理员后台 → 扩展功能
3. ✅ 成员管理 → 增加角色系统
4. ✅ 活动管理 → 增加照片上传
5. ✅ 项目展示 → 改为成员作品展示

### 新增功能
1. ⭐ **过往活动展示页面**（重点）
   - 活动列表
   - 照片墙
   - 活动详情
   
2. ⭐ **成员作品展示**
   - 作品上传
   - 作品点赞
   - 作品分类
   
3. ⭐ **角色系统**
   - 角色选择
   - 角色展示
   
4. ⭐ **学习资源库**
   - 工具推荐
   - 教程分享
   
5. ⭐ **项目协作平台**
   - 项目发起
   - 组队招募
   
6. ⭐ **新手任务系统**
   - 任务发布
   - 任务完成展示

## 七、设计风格

保持现代圆润风格（Minerva风格）：
- 大圆角设计
- 柔和阴影
- 渐变色背景
- 平滑动画
- 游戏化元素（航道、角色、任务）

## 八、色彩方案

- 主色：深蓝色 #1E2A5E（专业、科技）
- 辅色：橙色 #FF6B35（活力、创意）
- 强调色：紫色 #8B5CF6（AI、未来）
- 背景：浅灰 #FEFEFE
- 文字：深灰 #111827

## 九、下一步行动

1. 创建新的数据库表结构
2. 更新后端API接口
3. 创建过往活动展示页面
4. 创建成员作品展示页面
5. 创建角色系统页面
6. 创建学习资源页面
7. 创建项目协作页面
8. 更新首页内容
9. 更新关于我们页面
10. 准备图片素材
