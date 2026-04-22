-- AI探索营3月活动数据 + 4月19日成都社造大会

-- 4月19日成都社造大会AI工作坊和主题分享论坛
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, registration_url, original_url, key_points, tags, is_featured
) VALUES (
  'activity',
  '成都社造大会 - AI工作坊与主题分享论坛',
  'AI探索营',
  '2026-04-01',
  '2026-04-19',
  '成都社造大会特别活动，包含AI工作坊实践环节和主题分享论坛，探讨AI在社区营造中的应用',
  'https://example.com/shezao-ai-workshop',
  'https://example.com/shezao-conference-2026',
  ARRAY['AI工作坊：动手实践AI工具在社区场景的应用', '主题分享论坛：AI赋能社区营造的案例分享', '面向社区工作者、设计师、AI爱好者', '提供现场交流和项目展示机会'],
  ARRAY['成都', '社造大会', 'AI工作坊', '主题论坛', '社区营造'],
  true
) ON CONFLICT DO NOTHING;

-- 3月重点活动记录

-- 3.7 AI Talk 线下工作坊
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  'AI Talk 线下工作坊',
  'AI探索营',
  '2026-03-01',
  '2026-03-07',
  '第一次线下活动/典藏版，20余人参与，探讨AI工具实践应用',
  'https://example.com/ai-talk-march',
  ARRAY['20余人参与', '第一次线下活动', 'AI工具实践分享'],
  ARRAY['成都', 'AI工作坊', '线下活动']
) ON CONFLICT DO NOTHING;

-- 3.13 AI玩法集-体验测评会
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  'AI玩法集-体验测评会',
  'AI探索营',
  '2026-03-01',
  '2026-03-13',
  '主题内容：Prompt、养好猫猫、社群化论、田园、三条川。周子璇、三条川学长、康宁参与分享',
  'https://example.com/ai-playbook-march',
  ARRAY['Prompt工程实践', '社群化运营讨论', '多位嘉宾分享'],
  ARRAY['成都', 'AI应用', '测评会']
) ON CONFLICT DO NOTHING;

-- 3.22 疑难·故事节：AI都能当导演
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '疑难·故事节：AI都能当导演',
  'AI探索营',
  '2026-03-01',
  '2026-03-22',
  '行舟1000元、群联共创参与。0-1小白视频制作手把手教学工作坊',
  'https://example.com/ai-director-workshop',
  ARRAY['视频制作工作坊', '0-1小白教学', '行舟1000元奖励'],
  ARRAY['成都', 'AI视频', '工作坊', '故事节']
) ON CONFLICT DO NOTHING;

-- 3.28 成都OPC路演
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '成都OPC路演',
  'AI探索营',
  '2026-03-01',
  '2026-03-28',
  '连接资源、见群友、谢思琪、周美、子颖话多参加。OPC项目路演展示活动',
  'https://example.com/chengdu-opc-roadshow-march',
  ARRAY['OPC项目展示', '资源对接', '社群成员交流'],
  ARRAY['成都', 'OPC', '路演', '项目展示']
) ON CONFLICT DO NOTHING;

-- 3.30 培训部内部第一次线上会
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '培训部内部第一次线上会',
  'AI探索营',
  '2026-03-01',
  '2026-03-30',
  '社群规划讨论会，规划未来活动方向和培训计划',
  'https://example.com/training-meeting-march',
  ARRAY['社群规划', '培训计划讨论', '内部会议'],
  ARRAY['成都', '社群运营', '规划会']
) ON CONFLICT DO NOTHING;

-- 其他重点活动

-- 3.1 传信分享会
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '传信分享会',
  'AI探索营',
  '2026-02-25',
  '2026-03-01',
  '张大炼米米、何倩、李宇、阿团、林怀恩等17人参与的AI技术分享会',
  'https://example.com/chuanxin-sharing',
  ARRAY['17人参与', '多位嘉宾分享', 'AI技术交流'],
  ARRAY['成都', 'AI分享会', '技术交流']
) ON CONFLICT DO NOTHING;

-- 3.9 群下讲文档建立
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '群下讲文档建立',
  'AI探索营',
  '2026-03-01',
  '2026-03-09',
  '信息副部长、耿爽组织的文档建设活动',
  'https://example.com/doc-building',
  ARRAY['文档体系建设', '知识管理'],
  ARRAY['成都', '文档建设', '知识管理']
) ON CONFLICT DO NOTHING;

-- 3.15 社群指挥部成立
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '社群指挥部成立',
  'AI探索营',
  '2026-03-01',
  '2026-03-15',
  '佛佛社群新事，10人参与的社群组织架构建设会议',
  'https://example.com/community-hq',
  ARRAY['10人参与', '组织架构建设', '社群治理'],
  ARRAY['成都', '社群建设', '组织架构']
) ON CONFLICT DO NOTHING;

-- 3.16 编辑团建立
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '编辑团建立',
  'AI探索营',
  '2026-03-01',
  '2026-03-16',
  '子颖发一众人等发起，15人参与的编辑团队组建活动',
  'https://example.com/editor-team',
  ARRAY['15人参与', '编辑团队组建', '内容生产'],
  ARRAY['成都', '编辑团队', '内容创作']
) ON CONFLICT DO NOTHING;

-- 3.20 编辑团第一次线下会
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '编辑团第一次线下会',
  'AI探索营',
  '2026-03-01',
  '2026-03-20',
  '头颅真、并组进小辉（像爱这样联系到我取个名字）/像子小辉群社，7人参与',
  'https://example.com/editor-offline-meeting',
  ARRAY['7人参与', '编辑团队线下会', '内容规划'],
  ARRAY['成都', '编辑团队', '线下会议']
) ON CONFLICT DO NOTHING;

-- 3.27 换群计划
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '换群计划',
  'AI探索营',
  '2026-03-01',
  '2026-03-27',
  '三条川学长组织的社群迁移和重组计划',
  'https://example.com/group-migration',
  ARRAY['社群迁移', '组织重构'],
  ARRAY['成都', '社群运营', '组织变革']
) ON CONFLICT DO NOTHING;

-- 3.29 成都集会论
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  '成都集会论',
  'AI探索营',
  '2026-03-01',
  '2026-03-29',
  '线下分享活动/模拟论坛七人参与',
  'https://example.com/chengdu-forum',
  ARRAY['线下分享', '模拟论坛', '7人参与'],
  ARRAY['成都', '线下活动', '论坛']
) ON CONFLICT DO NOTHING;

-- 社群统计信息（作为一个特殊的记录）
INSERT INTO chengdu_ai_events (
  type, title, source, publish_date, event_date,
  description, original_url, key_points, tags
) VALUES (
  'activity',
  'AI探索营3月社群数据报告',
  'AI探索营',
  '2026-03-31',
  '2026-03-31',
  'AI探索营3月社群运营数据总结：新增102人，目前205人；兴趣进阶群39人，指挥部10人，编辑团15人，赛马选拔赛钱包不全名：7人',
  'https://example.com/march-report',
  ARRAY['社群规模：大群新增102人，目前205人', '兴趣进阶群39人，指挥部10人，编辑团15人', '财务：群收入500（黄凯鹏）+ 50（不愿透露姓名人士）+ 188（不愿透露姓名人士）', '慕湖故事节工作坊赞收入1000，群联金收入150', '总收入1738，支出1350（第一次线下工作坊500，故事节工作坊成本及分红850），剩余388'],
  ARRAY['成都', 'AI探索营', '社群数据', '月报']
) ON CONFLICT DO NOTHING;
