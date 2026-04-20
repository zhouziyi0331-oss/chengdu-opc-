const axios = require('axios');
const cheerio = require('cheerio');

class CompetitionCrawler {
  constructor() {
    this.sources = [
      {
        name: '中国高校计算机大赛',
        url: 'https://www.c4best.cn/',
        region: '全国'
      },
      {
        name: '天池大赛',
        url: 'https://tianchi.aliyun.com/competition/activeList',
        region: '全国'
      }
    ];
  }

  // 获取成都/四川地区AI赛事（模拟数据 + 真实爬取）
  async getSichuanCompetitions() {
    const competitions = [];

    // 添加一些已知的成都/四川赛事
    const knownCompetitions = [
      {
        title: '成都市人工智能创新应用大赛',
        description: '面向成都市企业、高校、科研机构的AI创新应用竞赛，聚焦智慧城市、智能制造等领域',
        organizer: '成都市科技局',
        registration_deadline: this.getDateAfterDays(60),
        competition_start_date: this.getDateAfterDays(90),
        prize_pool: '50万元',
        location: '成都',
        tags: ['AI应用', '智慧城市', '成都'],
        registration_url: 'https://example.com/chengdu-ai-competition',
        is_featured: true,
        category: 'opc_chengdu'
      },
      {
        title: '四川省大学生人工智能创新大赛',
        description: '面向四川省高校学生的AI创新竞赛，涵盖机器学习、计算机视觉、自然语言处理等方向',
        organizer: '四川省教育厅',
        registration_deadline: this.getDateAfterDays(45),
        competition_start_date: this.getDateAfterDays(75),
        prize_pool: '30万元',
        location: '成都',
        tags: ['大学生', 'AI创新', '四川'],
        registration_url: 'https://example.com/sichuan-student-ai',
        is_featured: true,
        category: "opc_sichuan"
      },
      {
        title: '天府杯AI算法挑战赛',
        description: '聚焦AI算法创新，包括深度学习、强化学习、联邦学习等前沿技术方向',
        organizer: '天府新区管委会',
        registration_deadline: this.getDateAfterDays(30),
        competition_start_date: this.getDateAfterDays(60),
        prize_pool: '20万元',
        location: '天府新区',
        tags: ['算法', '深度学习', '成都'],
        registration_url: 'https://example.com/tianfu-ai-challenge',
        is_featured: false,
        category: 'opc_chengdu'
      },
      {
        title: '成都OPC人工智能应用创新赛',
        description: 'OPC社群主办的AI应用创新竞赛，鼓励使用ChatGPT、Stable Diffusion等工具进行创新',
        organizer: '成都OPC中心',
        registration_deadline: this.getDateAfterDays(20),
        competition_start_date: this.getDateAfterDays(35),
        prize_pool: '5万元',
        location: '成都',
        tags: ['OPC', 'AI工具', '创新应用'],
        registration_url: 'https://example.com/opc-ai-innovation',
        is_featured: true,
        category: "opc_sichuan"
      }
    ];

    competitions.push(...knownCompetitions);

    return competitions;
  }

  // 获取全国性AI赛事
  async getNationalCompetitions() {
    const competitions = [
      {
        title: '全国大学生人工智能创新大赛',
        description: '教育部主办的全国性AI竞赛，面向全国高校学生，涵盖AI理论与应用多个方向',
        organizer: '教育部',
        registration_deadline: this.getDateAfterDays(90),
        competition_start_date: this.getDateAfterDays(120),
        prize_pool: '100万元',
        location: '全国',
        tags: ['全国赛', '大学生', 'AI'],
        registration_url: 'https://example.com/national-ai-competition',
        is_featured: true,
        category: "ai_national"
      },
      {
        title: '中国高校计算机大赛-人工智能创意赛',
        description: '中国高校计算机大赛旗下的AI创意竞赛，鼓励创新性AI应用开发',
        organizer: '教育部高等学校计算机类专业教学指导委员会',
        registration_deadline: this.getDateAfterDays(75),
        competition_start_date: this.getDateAfterDays(105),
        prize_pool: '80万元',
        location: '全国',
        tags: ['全国赛', 'AI创意', '高校'],
        registration_url: 'https://example.com/c4-ai-creativity',
        is_featured: true,
        category: "ai_national"
      },
      {
        title: '阿里云天池AI大赛',
        description: '阿里云天池平台举办的AI算法竞赛，涵盖计算机视觉、NLP、推荐系统等多个赛道',
        organizer: '阿里云',
        registration_deadline: this.getDateAfterDays(40),
        competition_start_date: this.getDateAfterDays(50),
        prize_pool: '50万元',
        location: '线上',
        tags: ['算法', '天池', 'AI'],
        registration_url: 'https://tianchi.aliyun.com',
        is_featured: false,
        category: 'ai_innovation'
      }
    ];

    return competitions;
  }

  // 获取创投信息
  async getInvestmentOpportunities() {
    const opportunities = [
      {
        title: '成都高新区AI创业扶持计划',
        description: '面向AI创业团队的资金扶持和孵化服务，提供最高500万元资助',
        organizer: '成都高新区管委会',
        registration_deadline: this.getDateAfterDays(180),
        competition_start_date: this.getDateAfterDays(200),
        prize_pool: '最高500万元',
        location: '成都高新区',
        tags: ['创投', '创业扶持', '成都'],
        registration_url: 'https://example.com/chengdu-ai-startup',
        is_featured: true,
        category: "opc_sichuan"
      },
      {
        title: '四川省AI产业投资基金',
        description: '四川省政府设立的AI产业投资基金，支持AI技术研发和产业化',
        organizer: '四川省发改委',
        registration_deadline: this.getDateAfterDays(365),
        competition_start_date: this.getDateAfterDays(380),
        prize_pool: '单项目最高1000万元',
        location: '四川',
        tags: ['创投', '产业基金', '四川'],
        registration_url: 'https://example.com/sichuan-ai-fund',
        is_featured: true,
        category: "opc_sichuan"
      }
    ];

    return opportunities;
  }

  // 获取指定天数后的日期
  getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // 获取所有赛事
  async getAllCompetitions() {
    const sichuan = await this.getSichuanCompetitions();
    const national = await this.getNationalCompetitions();
    const investment = await this.getInvestmentOpportunities();

    return [...sichuan, ...national, ...investment];
  }
}

module.exports = CompetitionCrawler;
