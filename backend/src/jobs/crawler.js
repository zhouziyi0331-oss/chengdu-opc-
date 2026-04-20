const cron = require('node-cron');
const { crawlAllNews } = require('../services/crawler');

// 每天凌晨2点执行爬取任务
function startCrawlerJob() {
  cron.schedule('0 2 * * *', async () => {
    console.log('定时任务：开始爬取AI资讯');
    try {
      await crawlAllNews();
    } catch (error) {
      console.error('爬取任务失败:', error);
    }
  });

  console.log('爬虫定时任务已启动（每天凌晨2点执行）');
}

module.exports = { startCrawlerJob };
