const cron = require('node-cron');
const GitHubCrawler = require('../crawlers/github-crawler');
const CompetitionCrawler = require('../crawlers/competition-crawler');
const TutorialCrawler = require('../crawlers/tutorial-crawler');
const db = require('../models/db');

class CrawlerScheduler {
  constructor() {
    this.githubCrawler = new GitHubCrawler();
    this.competitionCrawler = new CompetitionCrawler();
    this.tutorialCrawler = new TutorialCrawler();
  }

  // 启动所有定时任务
  start() {
    // 每天凌晨2点更新GitHub热门仓库
    cron.schedule('0 2 * * *', async () => {
      console.log('开始更新GitHub热门AI仓库...');
      await this.updateGitHubTrending();
    });

    // 每天早上8点更新AI教程
    cron.schedule('0 8 * * *', async () => {
      console.log('开始更新AI教程资源...');
      await this.updateAITutorials();
    });

    // 每6小时更新一次最近更新的仓库
    cron.schedule('0 */6 * * *', async () => {
      console.log('开始更新最近活跃的AI项目...');
      await this.updateRecentlyUpdated();
    });

    // 每天早上9点更新赛事信息
    cron.schedule('0 9 * * *', async () => {
      console.log('开始更新AI赛事信息...');
      await this.updateCompetitions();
    });

    // 每天下午3点更新教程库
    cron.schedule('0 15 * * *', async () => {
      console.log('开始更新教程库...');
      await this.updateTutorials();
    });

    console.log('爬虫定时任务已启动');
  }

  // 更新GitHub热门趋势
  async updateGitHubTrending() {
    try {
      const repos = await this.githubCrawler.getTrendingAIRepos();

      for (const repo of repos) {
        await db.query(`
          INSERT INTO learning_resources (title, type, url, description, author, source, tags, view_count)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (url) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            tags = EXCLUDED.tags
        `, [
          repo.title,
          'tool',
          repo.url,
          `${repo.description} (⭐ ${repo.stars})`,
          'GitHub',
          'github',
          [repo.language, ...repo.topics].filter(Boolean),
          0
        ]);
      }

      console.log(`成功更新 ${repos.length} 个GitHub热门项目`);
    } catch (error) {
      console.error('更新GitHub热门趋势失败:', error);
    }
  }

  // 更新最近活跃的项目
  async updateRecentlyUpdated() {
    try {
      const repos = await this.githubCrawler.getRecentlyUpdatedAIRepos();

      for (const repo of repos) {
        await db.query(`
          INSERT INTO learning_resources (title, type, url, description, author, source, tags, view_count)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (url) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            tags = EXCLUDED.tags
        `, [
          repo.title,
          'tool',
          repo.url,
          `${repo.description} (⭐ ${repo.stars} | 最近更新)`,
          'GitHub',
          'github',
          ['最近更新', repo.language, ...repo.topics].filter(Boolean),
          0
        ]);
      }

      console.log(`成功更新 ${repos.length} 个最近活跃的AI项目`);
    } catch (error) {
      console.error('更新最近活跃项目失败:', error);
    }
  }

  // 更新AI教程
  async updateAITutorials() {
    try {
      const tutorials = await this.githubCrawler.getAITutorials();

      for (const tutorial of tutorials) {
        await db.query(`
          INSERT INTO learning_resources (title, type, url, description, author, source, tags, view_count)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (url) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            tags = EXCLUDED.tags
        `, [
          tutorial.title,
          'tutorial',
          tutorial.url,
          `${tutorial.description} (⭐ ${tutorial.stars})`,
          'GitHub',
          'github',
          [tutorial.category, tutorial.language, ...tutorial.topics].filter(Boolean),
          0
        ]);
      }

      console.log(`成功更新 ${tutorials.length} 个AI教程`);
    } catch (error) {
      console.error('更新AI教程失败:', error);
    }
  }

  // 手动触发所有更新（用于测试）
  async runAll() {
    console.log('手动触发所有爬虫任务...');
    await this.updateGitHubTrending();
    await this.updateRecentlyUpdated();
    await this.updateAITutorials();
    await this.updateCompetitions();
    await this.updateTutorials();
    console.log('所有爬虫任务完成');
  }

  // 更新赛事信息
  async updateCompetitions() {
    try {
      const competitions = await this.competitionCrawler.getAllCompetitions();

      for (const comp of competitions) {
        await db.query(`
          INSERT INTO competitions (
            title, description, organizer, registration_deadline,
            start_date, prize_pool, location, tags,
            registration_url, is_featured, category
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (title) DO UPDATE SET
            description = EXCLUDED.description,
            registration_deadline = EXCLUDED.registration_deadline,
            start_date = EXCLUDED.start_date,
            prize_pool = EXCLUDED.prize_pool,
            is_featured = EXCLUDED.is_featured,
            updated_at = NOW()
        `, [
          comp.title,
          comp.description,
          comp.organizer,
          comp.registration_deadline,
          comp.competition_start_date,
          comp.prize_pool,
          comp.location,
          comp.tags,
          comp.registration_url,
          comp.is_featured,
          comp.category || 'ai_innovation'
        ]);
      }

      console.log(`成功更新 ${competitions.length} 个赛事信息`);
    } catch (error) {
      console.error('更新赛事信息失败:', error);
    }
  }

  // 更新教程库
  async updateTutorials() {
    try {
      const tutorials = await this.tutorialCrawler.getAllTutorials();

      for (const tutorial of tutorials) {
        await db.query(`
          INSERT INTO learning_resources (
            title, type, url, description, author, difficulty,
            tags, view_count, source
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (url) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            tags = EXCLUDED.tags
        `, [
          tutorial.title,
          'tutorial',
          tutorial.url,
          tutorial.description,
          tutorial.author,
          tutorial.difficulty,
          tutorial.tags,
          tutorial.views || 0,
          'curated'
        ]);
      }

      console.log(`成功更新 ${tutorials.length} 个教程`);
    } catch (error) {
      console.error('更新教程库失败:', error);
    }
  }
}

module.exports = CrawlerScheduler;
