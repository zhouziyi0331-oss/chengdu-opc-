const axios = require('axios');
const cheerio = require('cheerio');

class WechatOfficialAccountMonitor {
  constructor() {
    // 重点关注的公众号列表
    this.officialAccounts = {
      government: [
        { name: '成都经信局', keywords: ['AI', '人工智能', 'OPC', '创新', '赛事'] },
        { name: '成都科技局', keywords: ['AI', '人工智能', '科技', '创新', '政策'] },
        { name: '成都高新区数字经济产业', keywords: ['AI', '数字经济', '创投', '路演'] }
      ],
      associations: [
        { name: '四川人工智能协会', keywords: ['AI', '人工智能', 'OPC', '赛事'] },
        { name: '高新天使投资协会', keywords: ['创投', '路演', '投资'] }
      ],
      media: [
        { name: '数字生命卡兹克', keywords: ['AI教程', 'ChatGPT', 'Stable Diffusion'] },
        { name: '极客公园', keywords: ['AI', '人工智能', '技术'] },
        { name: '量子位', keywords: ['AI', '人工智能', '深度学习'] },
        { name: '新智元', keywords: ['AI', '人工智能', 'AGI'] },
        { name: '智东西', keywords: ['AI', '人工智能', '智能硬件'] },
        { name: 'AI大模型工厂', keywords: ['大模型', 'LLM', 'GPT'] },
        { name: '机器之心', keywords: ['AI', '机器学习', '深度学习'] },
        { name: 'AppSo', keywords: ['AI工具', '效率', '应用'] },
        { name: 'AIBase', keywords: ['AI', '人工智能', '工具'] },
        { name: '袋鼠帝AI客栈', keywords: ['AI', '教程', '工具'] }
      ]
    };
  }

  // 手动录入的成都/四川AI赛事和政策
  async getChengduAIEvents() {
    const events = [
      {
        type: 'competition',
        title: '2026成都市人工智能创新应用大赛',
        source: '成都市经济和信息化局',
        publish_date: '2026-04-15',
        registration_deadline: '2026-06-30',
        event_date: '2026-07-15',
        description: '面向成都市企业、高校、科研机构征集AI创新应用项目，聚焦智慧城市、智能制造、智慧医疗等领域',
        prize_pool: '总奖金50万元',
        registration_url: 'https://example.com/chengdu-ai-2026',
        original_url: 'https://example.com/jxj/announcement/2026-04-15',
        key_points: [
          '面向成都市注册企业和高校',
          '项目需在成都落地实施',
          '提供后续孵化支持',
          '优秀项目可获得政府采购订单'
        ],
        tags: ['成都', 'AI应用', '创新大赛', '政府主办'],
        is_featured: true
      },
      {
        type: 'policy',
        title: '成都市支持人工智能产业发展若干政策措施',
        source: '成都市科学技术局',
        publish_date: '2026-03-20',
        effective_date: '2026-04-01',
        description: '为加快推进人工智能产业发展，成都市出台系列扶持政策，包括研发补贴、人才引进、场景应用等方面',
        original_url: 'https://example.com/kjj/policy/2026-03-20',
        key_points: [
          'AI企业研发投入最高补贴500万元',
          'AI人才落户成都给予最高50万元安家费',
          '支持AI场景应用，单个项目最高补贴200万元',
          '设立10亿元AI产业发展基金'
        ],
        tags: ['成都', 'AI政策', '产业扶持', '政府文件'],
        is_important: true
      },
      {
        type: 'investment',
        title: '成都高新区AI创业项目路演活动',
        source: '高新天使投资协会',
        publish_date: '2026-04-18',
        event_date: '2026-05-10',
        description: '面向AI创业团队的投融资路演活动，邀请20+知名投资机构，提供融资对接服务',
        registration_url: 'https://example.com/gaoxin-roadshow',
        original_url: 'https://example.com/gaoxin/event/2026-04-18',
        key_points: [
          '参与项目需为AI相关领域',
          '团队需在成都注册或计划落户成都',
          '提供免费BP辅导',
          '优秀项目可获得直投机会'
        ],
        tags: ['成都', '创投', '路演', 'AI创业'],
        is_featured: true
      },
      {
        type: 'activity',
        title: '成都OPC人工智能技术沙龙（常态化活动）',
        source: '成都OPC中心',
        publish_date: '2026-04-01',
        frequency: '每月第二个周六',
        next_event_date: '2026-05-14',
        description: 'OPC社群常态化技术交流活动，每月邀请AI领域专家分享最新技术和实践经验',
        registration_url: 'https://example.com/opc-salon',
        original_url: 'https://example.com/opc/activity/salon',
        key_points: [
          '免费参加，需提前报名',
          '每期不同主题（大模型、AI绘画、AI应用开发等）',
          '提供现场交流和项目展示机会',
          '优秀参与者可获得OPC认证'
        ],
        tags: ['成都', 'OPC', '技术沙龙', '常态活动'],
        is_regular: true
      }
    ];

    return events;
  }

  // 从公众号文章中提取赛事信息（需要手动录入或使用第三方API）
  async extractCompetitionInfo(article) {
    // 这里需要实现文章解析逻辑
    // 由于微信公众号爬虫的限制，建议采用手动录入 + 定期更新的方式
    return {
      title: article.title,
      source: article.source,
      publish_date: article.publish_date,
      registration_deadline: this.extractDate(article.content, '报名截止'),
      event_date: this.extractDate(article.content, '比赛时间|活动时间'),
      registration_url: this.extractUrl(article.content, '报名链接|报名地址'),
      original_url: article.url,
      description: this.extractDescription(article.content),
      key_points: this.extractKeyPoints(article.content),
      tags: this.extractTags(article.content)
    };
  }

  // 提取日期
  extractDate(content, pattern) {
    // 简单的日期提取逻辑
    const dateRegex = /(\d{4})[年\-\/](\d{1,2})[月\-\/](\d{1,2})/g;
    const matches = content.match(dateRegex);
    return matches ? matches[0] : null;
  }

  // 提取URL
  extractUrl(content, pattern) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = content.match(urlRegex);
    return matches ? matches[0] : null;
  }

  // 提取描述
  extractDescription(content) {
    // 提取前200字作为描述
    return content.substring(0, 200).replace(/\s+/g, ' ').trim();
  }

  // 提取关键点
  extractKeyPoints(content) {
    const points = [];
    // 查找带有数字编号或项目符号的内容
    const patterns = [
      /[一二三四五六七八九十、]\s*[、.．]\s*([^\n]+)/g,
      /\d+[、.．]\s*([^\n]+)/g,
      /[•·]\s*([^\n]+)/g
    ];

    patterns.forEach(pattern => {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && match[1].length > 10 && match[1].length < 100) {
          points.push(match[1].trim());
        }
      }
    });

    return points.slice(0, 5); // 最多返回5个关键点
  }

  // 提取标签
  extractTags(content) {
    const tags = [];
    const keywords = ['成都', '四川', 'AI', '人工智能', 'OPC', '创新', '创投', '路演', '政策', '补贴'];

    keywords.forEach(keyword => {
      if (content.includes(keyword)) {
        tags.push(keyword);
      }
    });

    return tags;
  }

  // 获取所有监控的公众号列表
  getAllAccounts() {
    return {
      ...this.officialAccounts,
      total: Object.values(this.officialAccounts).flat().length
    };
  }
}

module.exports = WechatOfficialAccountMonitor;
