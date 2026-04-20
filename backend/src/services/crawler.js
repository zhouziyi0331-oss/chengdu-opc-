const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models/db');

// 爬取掘金AI文章
async function crawlJuejin() {
  try {
    const response = await axios.get('https://juejin.cn/tag/人工智能', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles = [];

    // 注意：实际的选择器需要根据掘金的实际HTML结构调整
    $('.entry-list .item').slice(0, 10).each((i, elem) => {
      const title = $(elem).find('.title').text().trim();
      const url = $(elem).find('a').attr('href');
      const likes = parseInt($(elem).find('.like-count').text()) || 0;

      if (title && url) {
        articles.push({
          title,
          url: url.startsWith('http') ? url : `https://juejin.cn${url}`,
          source: '掘金',
          category: 'tutorial',
          likes_count: likes
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('爬取掘金失败:', error.message);
    return [];
  }
}

// 爬取GitHub Trending
async function crawlGithubTrending() {
  try {
    const response = await axios.get('https://github.com/trending?spoken_language_code=zh', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const repos = [];

    $('article.Box-row').slice(0, 10).each((i, elem) => {
      const title = $(elem).find('h2 a').text().trim().replace(/\s+/g, ' ');
      const url = 'https://github.com' + $(elem).find('h2 a').attr('href');
      const stars = $(elem).find('.float-sm-right').text().trim();

      if (title && url) {
        repos.push({
          title,
          url,
          source: 'GitHub',
          category: 'project',
          likes_count: parseInt(stars.replace(/,/g, '')) || 0
        });
      }
    });

    return repos;
  } catch (error) {
    console.error('爬取GitHub失败:', error.message);
    return [];
  }
}

// 爬取知乎AI话题
async function crawlZhihu() {
  try {
    // 注意：知乎需要登录和复杂的反爬机制，这里提供简化版本
    // 实际使用时可能需要使用API或其他方法
    const response = await axios.get('https://www.zhihu.com/topic/19551275/hot', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const questions = [];

    $('.List-item').slice(0, 10).each((i, elem) => {
      const title = $(elem).find('.ContentItem-title').text().trim();
      const url = $(elem).find('.ContentItem-title a').attr('href');

      if (title && url) {
        questions.push({
          title,
          url: url.startsWith('http') ? url : `https://www.zhihu.com${url}`,
          source: '知乎',
          category: 'discussion',
          likes_count: 0
        });
      }
    });

    return questions;
  } catch (error) {
    console.error('爬取知乎失败:', error.message);
    return [];
  }
}

// 保存资讯到数据库
async function saveNews(newsItems) {
  for (const item of newsItems) {
    try {
      // 检查是否已存在
      const existing = await db.query('SELECT id FROM ai_news WHERE url = $1', [item.url]);

      if (existing.rows.length === 0) {
        await db.query(
          'INSERT INTO ai_news (title, url, source, category, likes_count) VALUES ($1, $2, $3, $4, $5)',
          [item.title, item.url, item.source, item.category, item.likes_count]
        );
      }
    } catch (error) {
      console.error('保存资讯失败:', error.message);
    }
  }
}

// 主爬取函数
async function crawlAllNews() {
  console.log('开始爬取AI资讯...');

  const [juejinNews, githubNews, zhihuNews] = await Promise.all([
    crawlJuejin(),
    crawlGithubTrending(),
    crawlZhihu()
  ]);

  const allNews = [...juejinNews, ...githubNews, ...zhihuNews];

  await saveNews(allNews);

  console.log(`爬取完成，共获取 ${allNews.length} 条资讯`);

  // 清理30天前的旧数据
  await db.query("DELETE FROM ai_news WHERE created_at < NOW() - INTERVAL '30 days'");
}

module.exports = { crawlAllNews };
