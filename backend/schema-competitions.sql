-- 赛事信息表
CREATE TABLE IF NOT EXISTS competitions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'opc_sichuan', 'opc_chengdu', 'ai_innovation', 'ai_national'
  description TEXT,
  organizer VARCHAR(255), -- 主办方
  location VARCHAR(255), -- 举办地点
  registration_url TEXT, -- 报名地址
  official_url TEXT, -- 官方网站
  start_date DATE,
  end_date DATE,
  registration_deadline TIMESTAMP, -- 报名截止时间
  prize_info TEXT, -- 奖项信息
  requirements TEXT, -- 参赛要求
  contact_info TEXT, -- 联系方式
  cover_image TEXT, -- 封面图
  status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'ended'
  is_featured BOOLEAN DEFAULT false, -- 是否推荐
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_competitions_category ON competitions(category);
CREATE INDEX idx_competitions_status ON competitions(status);
CREATE INDEX idx_competitions_deadline ON competitions(registration_deadline);
CREATE INDEX idx_competitions_featured ON competitions(is_featured);

-- 插入示例数据
INSERT INTO competitions (title, category, description, organizer, location, registration_url, official_url, start_date, end_date, registration_deadline, prize_info, requirements, status, is_featured) VALUES
('2024四川省OPC创新挑战赛', 'opc_sichuan', '面向四川省大学生的AI创新应用挑战赛，聚焦AI在实际场景中的应用创新。', '四川省教育厅、四川省科技厅', '成都市', 'https://example.com/sichuan-opc-2024', 'https://sichuan-opc.com', '2024-06-01', '2024-08-31', '2024-05-20 23:59:59', '一等奖：10000元 + 证书\n二等奖：5000元 + 证书\n三等奖：2000元 + 证书', '1. 四川省在校大学生\n2. 个人或团队参赛（不超过5人）\n3. 作品需为原创', 'upcoming', true),

('成都市OPC人工智能创新大赛', 'opc_chengdu', '成都市首届OPC人工智能创新大赛，鼓励青年学生探索AI技术在城市治理、智慧生活等领域的应用。', '成都市科技局、成都市教育局', '成都市高新区', 'https://example.com/chengdu-opc-2024', 'https://chengdu-opc.com', '2024-07-01', '2024-09-30', '2024-06-15 23:59:59', '特等奖：20000元 + 证书 + 孵化支持\n一等奖：10000元 + 证书\n二等奖：5000元 + 证书\n三等奖：2000元 + 证书', '1. 成都市在校大学生或35岁以下青年\n2. 团队参赛（2-5人）\n3. 项目需具备实际应用价值', 'upcoming', true),

('全国大学生AI创新创意大赛', 'ai_innovation', '由教育部主办的全国性AI创新创意大赛，面向全国高校学生征集AI创新应用作品。', '教育部高等教育司', '全国（线上+线下）', 'https://example.com/national-ai-innovation', 'https://ai-innovation.edu.cn', '2024-05-01', '2024-10-31', '2024-04-30 23:59:59', '特等奖：50000元 + 证书 + 推荐实习\n一等奖：30000元 + 证书\n二等奖：15000元 + 证书\n三等奖：8000元 + 证书\n优秀奖：证书', '1. 全国在校大学生（本科、研究生）\n2. 团队参赛（3-6人）\n3. 作品需为原创且未获其他奖项\n4. 需提交完整项目文档和演示视频', 'ongoing', true),

('中国AI开发者大赛', 'ai_national', '面向全国AI开发者的综合性竞赛，涵盖计算机视觉、自然语言处理、机器学习等多个赛道。', '中国人工智能学会', '北京（决赛）', 'https://example.com/china-ai-dev', 'https://ai-dev-contest.org.cn', '2024-04-01', '2024-11-30', '2024-03-31 23:59:59', '总冠军：100000元 + 证书 + 企业合作机会\n各赛道一等奖：50000元 + 证书\n各赛道二等奖：30000元 + 证书\n各赛道三等奖：15000元 + 证书', '1. 不限年龄和身份\n2. 个人或团队参赛（不超过5人）\n3. 需在指定平台提交代码和模型\n4. 遵守学术诚信和竞赛规则', 'ongoing', true),

('2024"智创未来"AI应用挑战赛', 'ai_national', '聚焦AI在教育、医疗、交通等民生领域的应用创新，鼓励跨学科团队参赛。', '科技部、工信部', '上海（决赛）', 'https://example.com/ai-future-2024', 'https://ai-future.gov.cn', '2024-06-15', '2024-12-15', '2024-06-10 23:59:59', '金奖：80000元 + 证书 + 项目孵化\n银奖：50000元 + 证书\n铜奖：30000元 + 证书\n优秀奖：10000元 + 证书', '1. 不限年龄和身份\n2. 团队参赛（3-8人，鼓励跨学科）\n3. 项目需具备社会价值和落地可行性\n4. 需提交商业计划书', 'upcoming', true);

-- 更新时间触发器
CREATE OR REPLACE FUNCTION update_competitions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_competitions_updated_at
BEFORE UPDATE ON competitions
FOR EACH ROW
EXECUTE FUNCTION update_competitions_updated_at();
