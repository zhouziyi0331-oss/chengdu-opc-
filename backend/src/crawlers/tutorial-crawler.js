const axios = require('axios');
const cheerio = require('cheerio');

class TutorialCrawler {
  constructor() {
    this.categories = {
      beginner: '入门教程',
      tools: 'AI工具使用',
      development: '开发实战',
      theory: '理论基础'
    };
  }

  // 获取AI工具小白教程
  async getBeginnerTutorials() {
    const tutorials = [
      {
        title: 'ChatGPT完全入门指南：从注册到高效使用',
        description: '详细讲解ChatGPT的注册流程、基础使用方法、提示词技巧，以及如何用ChatGPT提升工作效率',
        author: 'AI小白课堂',
        difficulty: '入门',
        duration: '30分钟',
        category: 'AI工具使用',
        tags: ['ChatGPT', '入门', '提示词'],
        url: 'https://example.com/chatgpt-beginner-guide',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=ChatGPT',
        views: 15000,
        rating: 4.8,
        published_date: this.getDateBefore(7)
      },
      {
        title: 'Midjourney AI绘画零基础教程',
        description: '从零开始学习Midjourney，掌握AI绘画的基本操作、参数设置和创作技巧',
        author: 'AI创作者',
        difficulty: '入门',
        duration: '45分钟',
        category: 'AI工具使用',
        tags: ['Midjourney', 'AI绘画', '零基础'],
        url: 'https://example.com/midjourney-tutorial',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Midjourney',
        views: 12000,
        rating: 4.7,
        published_date: this.getDateBefore(5)
      },
      {
        title: 'Stable Diffusion本地部署完整教程',
        description: '手把手教你在本地电脑上部署Stable Diffusion，包括环境配置、模型下载和基础使用',
        author: 'AI技术分享',
        difficulty: '进阶',
        duration: '60分钟',
        category: '开发实战',
        tags: ['Stable Diffusion', '本地部署', 'AI绘画'],
        url: 'https://example.com/sd-local-setup',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=SD',
        views: 20000,
        rating: 4.9,
        published_date: this.getDateBefore(10)
      },
      {
        title: 'Claude AI使用技巧：如何写出高质量提示词',
        description: '深入讲解Claude AI的特点和优势，以及如何编写高质量提示词获得更好的回答',
        author: 'AI效率专家',
        difficulty: '入门',
        duration: '25分钟',
        category: 'AI工具使用',
        tags: ['Claude', '提示词', '效率'],
        url: 'https://example.com/claude-prompts',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Claude',
        views: 8000,
        rating: 4.6,
        published_date: this.getDateBefore(3)
      },
      {
        title: 'GitHub Copilot编程助手完全指南',
        description: '学习如何使用GitHub Copilot提升编程效率，包括安装配置、使用技巧和最佳实践',
        author: '程序员小明',
        difficulty: '入门',
        duration: '40分钟',
        category: 'AI工具使用',
        tags: ['GitHub Copilot', '编程', '效率工具'],
        url: 'https://example.com/copilot-guide',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Copilot',
        views: 18000,
        rating: 4.8,
        published_date: this.getDateBefore(12)
      },
      {
        title: 'Notion AI使用教程：让笔记更智能',
        description: '探索Notion AI的各种功能，学习如何用AI辅助写作、总结和头脑风暴',
        author: '效率工具达人',
        difficulty: '入门',
        duration: '20分钟',
        category: 'AI工具使用',
        tags: ['Notion AI', '笔记', '写作'],
        url: 'https://example.com/notion-ai',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Notion',
        views: 9000,
        rating: 4.5,
        published_date: this.getDateBefore(6)
      }
    ];

    return tutorials;
  }

  // 获取AI开发实战教程
  async getDevelopmentTutorials() {
    const tutorials = [
      {
        title: '使用LangChain构建AI应用：从入门到实战',
        description: '学习LangChain框架，构建自己的AI应用，包括聊天机器人、文档问答系统等',
        author: 'AI开发者社区',
        difficulty: '进阶',
        duration: '90分钟',
        category: '开发实战',
        tags: ['LangChain', 'Python', 'AI应用'],
        url: 'https://example.com/langchain-tutorial',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=LangChain',
        views: 25000,
        rating: 4.9,
        published_date: this.getDateBefore(15)
      },
      {
        title: '用OpenAI API开发智能客服系统',
        description: '实战项目：使用OpenAI API构建一个完整的智能客服系统，包括前后端开发',
        author: '全栈开发者',
        difficulty: '进阶',
        duration: '120分钟',
        category: '开发实战',
        tags: ['OpenAI API', '客服系统', '实战项目'],
        url: 'https://example.com/openai-customer-service',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=OpenAI',
        views: 22000,
        rating: 4.8,
        published_date: this.getDateBefore(20)
      },
      {
        title: 'Fine-tuning大语言模型：实战指南',
        description: '学习如何微调大语言模型，包括数据准备、训练流程和模型评估',
        author: 'AI研究员',
        difficulty: '高级',
        duration: '150分钟',
        category: '开发实战',
        tags: ['Fine-tuning', 'LLM', '模型训练'],
        url: 'https://example.com/llm-finetuning',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Fine-tuning',
        views: 18000,
        rating: 4.7,
        published_date: this.getDateBefore(25)
      }
    ];

    return tutorials;
  }

  // 获取AI理论基础教程
  async getTheoryTutorials() {
    const tutorials = [
      {
        title: '深度学习基础：神经网络入门',
        description: '从零开始理解神经网络的工作原理，包括前向传播、反向传播和梯度下降',
        author: 'AI理论讲师',
        difficulty: '入门',
        duration: '60分钟',
        category: '理论基础',
        tags: ['深度学习', '神经网络', '基础理论'],
        url: 'https://example.com/neural-network-basics',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Neural+Network',
        views: 30000,
        rating: 4.9,
        published_date: this.getDateBefore(30)
      },
      {
        title: 'Transformer架构详解：理解现代AI的核心',
        description: '深入讲解Transformer架构，理解注意力机制和自注意力的工作原理',
        author: 'AI架构师',
        difficulty: '进阶',
        duration: '75分钟',
        category: '理论基础',
        tags: ['Transformer', '注意力机制', 'NLP'],
        url: 'https://example.com/transformer-explained',
        thumbnail_url: 'https://via.placeholder.com/400x300?text=Transformer',
        views: 28000,
        rating: 4.8,
        published_date: this.getDateBefore(35)
      }
    ];

    return tutorials;
  }

  // 获取指定天数前的日期
  getDateBefore(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  // 获取所有教程
  async getAllTutorials() {
    const beginner = await this.getBeginnerTutorials();
    const development = await this.getDevelopmentTutorials();
    const theory = await this.getTheoryTutorials();

    return [...beginner, ...development, ...theory];
  }

  // 按分类获取教程
  async getTutorialsByCategory(category) {
    const allTutorials = await this.getAllTutorials();
    return allTutorials.filter(t => t.category === category);
  }

  // 按难度获取教程
  async getTutorialsByDifficulty(difficulty) {
    const allTutorials = await this.getAllTutorials();
    return allTutorials.filter(t => t.difficulty === difficulty);
  }
}

module.exports = TutorialCrawler;
