-- 成都OPC中心完整数据库结构

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

-- 活动表
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

-- 成员表
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  skills TEXT[],
  role VARCHAR(50), -- 'atmosphere', 'action', 'recorder', 'advisor'
  ship VARCHAR(50), -- 'explorer', 'producer', 'navigator'
  github VARCHAR(200),
  email VARCHAR(200),
  wechat VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 成员作品表
CREATE TABLE IF NOT EXISTS member_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'ai-art', 'ai-tool', 'ai-app', 'ai-research', 'other'
  author_name VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  tech_stack TEXT[],
  likes_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 学习资源表
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50), -- 'tutorial', 'tool', 'article', 'video', 'book'
  url VARCHAR(500),
  description TEXT,
  author VARCHAR(100),
  source VARCHAR(50), -- 'juejin', 'github', 'zhihu', 'other'
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 协作项目表
CREATE TABLE IF NOT EXISTS collaboration_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'recruiting', -- 'recruiting', 'in_progress', 'completed'
  initiator VARCHAR(100),
  team_members TEXT[],
  required_skills TEXT[],
  github_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 赛事信息表
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(50), -- 'opc_sichuan', 'opc_chengdu', 'ai_innovation', 'ai_national'
  organizer VARCHAR(200),
  location VARCHAR(200),
  registration_url VARCHAR(500),
  official_url VARCHAR(500),
  start_date DATE,
  end_date DATE,
  registration_deadline DATE,
  prize_info TEXT,
  prize_pool VARCHAR(100), -- 奖金池
  requirements TEXT,
  contact_info TEXT,
  cover_image VARCHAR(500),
  tags TEXT[], -- 标签数组
  status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'ended'
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
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
  slogan TEXT DEFAULT '探索AI的无限可能',
  description TEXT,
  wechat VARCHAR(100),
  email VARCHAR(200),
  member_count INTEGER DEFAULT 0,
  project_count INTEGER DEFAULT 0,
  activity_count INTEGER DEFAULT 0,
  resource_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_member_works_created ON member_works(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_collaboration_status ON collaboration_projects(status);
CREATE INDEX IF NOT EXISTS idx_competitions_deadline ON competitions(registration_deadline ASC);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);

-- 插入默认管理员 (用户名: admin, 密码: admin123)
-- 注意：实际部署时请修改密码
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2b$10$rKvVJH9xhX7qP8qYvZ5zKOYxJ5qX5qX5qX5qX5qX5qX5qX5qX5qX5')
ON CONFLICT (username) DO NOTHING;

-- 插入默认社群信息
INSERT INTO community_info (name, slogan, description, wechat, email)
VALUES (
  '成都OPC中心',
  '探索AI的无限可能',
  '成都OPC中心是一个专注于AI技能学习、资讯分享和活动组织的社群。我们致力于为成都及周边地区的AI爱好者提供一个学习、交流和成长的平台。',
  'chengdu_opc',
  'contact@chengdu-opc.com'
)
ON CONFLICT DO NOTHING;

-- 插入示例访问码
INSERT INTO access_codes (code, member_name)
VALUES
  ('DEMO2024', '演示用户'),
  ('TEST2024', '测试用户')
ON CONFLICT (code) DO NOTHING;

-- 插入示例活动
INSERT INTO activities (title, type, description, event_date, location, status)
VALUES
  ('AI工具入门工作坊', 'workshop', '学习如何使用ChatGPT、Midjourney等AI工具提升工作效率', '2024-03-15 14:00:00', '成都市高新区', 'completed'),
  ('AI创作分享会', 'sharing', '社群成员分享自己的AI创作经验和作品', '2024-04-20 19:00:00', '线上', 'completed'),
  ('OPC赛前集训营', 'workshop', '针对即将到来的OPC比赛进行集中培训', '2024-05-10 14:00:00', '成都市武侯区', 'upcoming')
ON CONFLICT DO NOTHING;

-- 插入示例赛事
INSERT INTO competitions (title, description, category, organizer, registration_url, start_date, end_date, registration_deadline, status, is_featured)
VALUES
  ('2024成都OPC挑战赛', '面向成都地区的AI应用创新大赛，鼓励参赛者使用AI技术解决实际问题', 'opc_chengdu', '成都市科技局', 'https://example.com/register', '2024-06-01', '2024-08-31', '2024-05-25', 'upcoming', true),
  ('四川省AI创新创意大赛', '全省范围的AI创新大赛，涵盖多个应用领域', 'ai_innovation', '四川省科技厅', 'https://example.com/register', '2024-07-01', '2024-09-30', '2024-06-20', 'upcoming', true)
ON CONFLICT DO NOTHING;
