const axios = require('axios');

class GitHubCrawler {
  constructor() {
    this.baseUrl = 'https://api.github.com';
  }

  // 获取GitHub热门AI仓库
  async getTrendingAIRepos() {
    try {
      const response = await axios.get(`${this.baseUrl}/search/repositories`, {
        params: {
          q: 'AI OR machine-learning OR deep-learning OR LLM OR GPT stars:>1000',
          sort: 'stars',
          order: 'desc',
          per_page: 30
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Chengdu-OPC-Community'
        }
      });

      return response.data.items.map(repo => ({
        title: repo.name,
        description: repo.description || '暂无描述',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || '未知',
        topics: repo.topics || [],
        updated_at: repo.updated_at
      }));
    } catch (error) {
      console.error('GitHub爬虫错误:', error.message);
      return [];
    }
  }

  // 获取最近更新的热门AI仓库
  async getRecentlyUpdatedAIRepos() {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const dateStr = oneWeekAgo.toISOString().split('T')[0];

      const response = await axios.get(`${this.baseUrl}/search/repositories`, {
        params: {
          q: `AI OR ChatGPT OR Stable-Diffusion OR LLM pushed:>${dateStr} stars:>500`,
          sort: 'updated',
          order: 'desc',
          per_page: 20
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Chengdu-OPC-Community'
        }
      });

      return response.data.items.map(repo => ({
        title: repo.name,
        description: repo.description || '暂无描述',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || '未知',
        topics: repo.topics || [],
        updated_at: repo.updated_at
      }));
    } catch (error) {
      console.error('GitHub最近更新爬虫错误:', error.message);
      return [];
    }
  }

  // 获取AI工具和教程
  async getAITutorials() {
    try {
      const response = await axios.get(`${this.baseUrl}/search/repositories`, {
        params: {
          q: 'AI tutorial OR machine-learning tutorial OR ChatGPT guide stars:>100',
          sort: 'stars',
          order: 'desc',
          per_page: 20
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Chengdu-OPC-Community'
        }
      });

      return response.data.items.map(repo => ({
        title: repo.name,
        description: repo.description || '暂无描述',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || '未知',
        topics: repo.topics || [],
        category: this.categorizeRepo(repo)
      }));
    } catch (error) {
      console.error('GitHub教程爬虫错误:', error.message);
      return [];
    }
  }

  // 分类仓库
  categorizeRepo(repo) {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const topics = repo.topics || [];

    if (topics.includes('chatgpt') || name.includes('chatgpt') || desc.includes('chatgpt')) {
      return 'ChatGPT';
    }
    if (topics.includes('stable-diffusion') || name.includes('stable-diffusion') || desc.includes('stable-diffusion')) {
      return 'Stable Diffusion';
    }
    if (topics.includes('llm') || name.includes('llm') || desc.includes('large language model')) {
      return 'LLM';
    }
    if (topics.includes('computer-vision') || desc.includes('computer vision')) {
      return '计算机视觉';
    }
    if (topics.includes('nlp') || desc.includes('natural language')) {
      return 'NLP';
    }
    return 'AI通用';
  }
}

module.exports = GitHubCrawler;
