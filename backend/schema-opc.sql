-- 成都OPC中心数据库结构

-- 验证码表
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  member_name VARCHAR(100),
  is_used BOOLEAN DEFAULT false,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- 活动表（扩展）
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(20), -- 'online', 'offline', 'workshop', 'sharing'
  description TEXT,
  event_date TIMESTAMP,
  location VARCHAR(200),
  cover_image VARCHAR(500),
  participant_count INTEGER DEFAULT 0,
  achievements TEXT,
  status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'completed', 'cancelled'
  created_at TIMESTAMP DEFAULT NOW()
);

-- 活动照片表
CREATE TABLE IF NOT EXISTS activity_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  photo_url VARCHAR(500) NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 成员表（扩展）
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(500),
  skills TEXT[],
  interests TEXT[],
  role_type VARCHAR(50), -- 'atmosphere', 'action', 'recorder', 'advisor'
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 成员作品表
CREATE TABLE IF NOT EXISTS member_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  creator_name VARCHAR(100) NOT NULL,
  work_type VARCHAR(50), -- 'video', 'image', 'animation', 'text', 'other'
  preview_url VARCHAR(500),
  work_url VARCHAR(500),
  tools_used TEXT[],
  description TEXT,
  insights TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 学习资源表
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50), -- 'tool', 'tutorial', 'article', 'book'
  url VARCHAR(500),
  description TEXT,
  tags TEXT[],
  author VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 项目协作表
CREATE TABLE IF NOT EXISTS collaboration_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  initiator VARCHAR(100),
  status VARCHAR(20) DEFAULT 'recruiting', -- 'recruiting', 'in_progress', 'completed'
  required_skills TEXT[],
  team_members TEXT[],
  project_type VARCHAR(50), -- 'content', 'product', 'business', 'other'
  created_at TIMESTAMP DEFAULT NOW()
);

-- 管理员表
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 社群信息表
CREATE TABLE IF NOT EXISTS community_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) DEFAULT '成都OPC中心',
  slogan TEXT DEFAULT '用AI这个新玩具，给自己"开个挂"',
  introduction TEXT,
  contact_info JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 插入默认管理员 (密码: admin123)
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2b$10$rKvVJH9xhX7qP8qYvZ5zKOYxJ5qX5qX5qX5qX5qX5qX5qX5qX5qX5')
ON CONFLICT (username) DO NOTHING;

-- 插入默认社群信息
INSERT INTO community_info (name, slogan, introduction, contact_info)
VALUES (
  '成都OPC中心',
  '用AI这个新玩具，给自己"开个挂"',
  '我们是一个专注于AI技能学习与实践的社群。在这里，你可以像玩游戏一样用AI搞出让自己惊喜的作品，在各自领域比别人多会一点，并且有一条清晰的打怪升级路径。',
  '{"wechat": "OPC-Chengdu", "email": "contact@opc-chengdu.com"}'::jsonb
)
ON CONFLICT DO NOTHING;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_member_works_created ON member_works(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_collaboration_status ON collaboration_projects(status);
