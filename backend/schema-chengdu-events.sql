-- 成都AI事件表（赛事、政策、活动、创投）
CREATE TABLE IF NOT EXISTS chengdu_ai_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL, -- 'competition', 'policy', 'investment', 'activity'
  title VARCHAR(300) NOT NULL,
  source VARCHAR(200) NOT NULL, -- 来源公众号或机构
  publish_date DATE NOT NULL, -- 发布日期

  -- 赛事/活动相关字段
  registration_deadline DATE, -- 报名截止时间
  event_date DATE, -- 活动/比赛日期

  -- 政策相关字段
  effective_date DATE, -- 政策生效日期

  -- 常态活动相关字段
  frequency VARCHAR(100), -- 活动频率（如"每月第二个周六"）
  next_event_date DATE, -- 下次活动日期

  -- 通用字段
  description TEXT NOT NULL, -- 详细描述
  prize_pool VARCHAR(100), -- 奖金池/补贴金额
  registration_url TEXT, -- 报名地址
  original_url TEXT NOT NULL, -- 原文链接
  key_points TEXT[], -- 重要要点（数组）
  tags TEXT[], -- 标签

  -- 标记字段
  is_featured BOOLEAN DEFAULT false, -- 是否推荐
  is_important BOOLEAN DEFAULT false, -- 是否重要（用于政策）
  is_regular BOOLEAN DEFAULT false, -- 是否常态活动

  -- 统计字段
  view_count INTEGER DEFAULT 0,

  -- 时间戳
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_chengdu_events_type ON chengdu_ai_events(type);
CREATE INDEX IF NOT EXISTS idx_chengdu_events_publish_date ON chengdu_ai_events(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_chengdu_events_featured ON chengdu_ai_events(is_featured);
CREATE INDEX IF NOT EXISTS idx_chengdu_events_tags ON chengdu_ai_events USING GIN(tags);

-- 插入示例数据
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, registration_deadline, event_date,
  description, prize_pool, registration_url, original_url, key_points, tags,
  is_featured
) VALUES (
  'competition',
  '2026成都市人工智能创新应用大赛',
  '成都市经济和信息化局',
  '2026-04-15',
  '2026-06-30',
  '2026-07-15',
  '面向成都市企业、高校、科研机构征集AI创新应用项目，聚焦智慧城市、智能制造、智慧医疗等领域',
  '总奖金50万元',
  'https://example.com/chengdu-ai-2026',
  'https://example.com/jxj/announcement/2026-04-15',
  ARRAY['面向成都市注册企业和高校', '项目需在成都落地实施', '提供后续孵化支持', '优秀项目可获得政府采购订单'],
  ARRAY['成都', 'AI应用', '创新大赛', '政府主办'],
  true
) ON CONFLICT DO NOTHING;

INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, effective_date,
  description, original_url, key_points, tags, is_important
) VALUES (
  'policy',
  '成都市支持人工智能产业发展若干政策措施',
  '成都市科学技术局',
  '2026-03-20',
  '2026-04-01',
  '为加快推进人工智能产业发展，成都市出台系列扶持政策，包括研发补贴、人才引进、场景应用等方面',
  'https://example.com/kjj/policy/2026-03-20',
  ARRAY['AI企业研发投入最高补贴500万元', 'AI人才落户成都给予最高50万元安家费', '支持AI场景应用，单个项目最高补贴200万元', '设立10亿元AI产业发展基金'],
  ARRAY['成都', 'AI政策', '产业扶持', '政府文件'],
  true
) ON CONFLICT DO NOTHING;

INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, registration_url, original_url, key_points, tags, is_featured
) VALUES (
  'investment',
  '成都高新区AI创业项目路演活动',
  '高新天使投资协会',
  '2026-04-18',
  '2026-05-10',
  '面向AI创业团队的投融资路演活动，邀请20+知名投资机构，提供融资对接服务',
  'https://example.com/gaoxin-roadshow',
  'https://example.com/gaoxin/event/2026-04-18',
  ARRAY['参与项目需为AI相关领域', '团队需在成都注册或计划落户成都', '提供免费BP辅导', '优秀项目可获得直投机会'],
  ARRAY['成都', '创投', '路演', 'AI创业'],
  true
) ON CONFLICT DO NOTHING;

INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, frequency, next_event_date,
  description, registration_url, original_url, key_points, tags, is_regular
) VALUES (
  'activity',
  '成都OPC人工智能技术沙龙',
  '成都OPC中心',
  '2026-04-01',
  '每月第二个周六',
  '2026-05-14',
  'OPC社群常态化技术交流活动，每月邀请AI领域专家分享最新技术和实践经验',
  'https://example.com/opc-salon',
  'https://example.com/opc/activity/salon',
  ARRAY['免费参加，需提前报名', '每期不同主题（大模型、AI绘画、AI应用开发等）', '提供现场交流和项目展示机会', '优秀参与者可获得OPC认证'],
  ARRAY['成都', 'OPC', '技术沙龙', '常态活动'],
  true
) ON CONFLICT DO NOTHING;
