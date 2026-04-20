const express = require('express');
const router = express.Router();
const db = require('../models/db');

// 获取所有成都AI事件（赛事、政策、活动）
router.get('/chengdu-events', async (req, res) => {
  try {
    const { type, is_featured } = req.query;

    let query = 'SELECT * FROM chengdu_ai_events WHERE 1=1';
    const params = [];

    if (type) {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }

    if (is_featured === 'true') {
      query += ' AND is_featured = true';
    }

    query += ' ORDER BY publish_date DESC, created_at DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('获取成都AI事件失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 获取单个事件详情
router.get('/chengdu-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM chengdu_ai_events WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '事件不存在' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('获取事件详情失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 创建新事件（管理员）
router.post('/chengdu-events', async (req, res) => {
  try {
    const {
      type,
      title,
      source,
      publish_date,
      registration_deadline,
      event_date,
      effective_date,
      frequency,
      next_event_date,
      description,
      prize_pool,
      registration_url,
      original_url,
      key_points,
      tags,
      is_featured,
      is_important,
      is_regular
    } = req.body;

    const result = await db.query(`
      INSERT INTO chengdu_ai_events (
        type, title, source, publish_date, registration_deadline,
        event_date, effective_date, frequency, next_event_date,
        description, prize_pool, registration_url, original_url,
        key_points, tags, is_featured, is_important, is_regular
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `, [
      type,
      title,
      source,
      publish_date,
      registration_deadline,
      event_date,
      effective_date,
      frequency,
      next_event_date,
      description,
      prize_pool,
      registration_url,
      original_url,
      key_points,
      tags,
      is_featured || false,
      is_important || false,
      is_regular || false
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('创建事件失败:', error);
    res.status(500).json({ error: '创建失败' });
  }
});

// 更新事件（管理员）
router.put('/chengdu-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      title,
      source,
      publish_date,
      registration_deadline,
      event_date,
      effective_date,
      frequency,
      next_event_date,
      description,
      prize_pool,
      registration_url,
      original_url,
      key_points,
      tags,
      is_featured,
      is_important,
      is_regular
    } = req.body;

    const result = await db.query(`
      UPDATE chengdu_ai_events
      SET
        type = $1,
        title = $2,
        source = $3,
        publish_date = $4,
        registration_deadline = $5,
        event_date = $6,
        effective_date = $7,
        frequency = $8,
        next_event_date = $9,
        description = $10,
        prize_pool = $11,
        registration_url = $12,
        original_url = $13,
        key_points = $14,
        tags = $15,
        is_featured = $16,
        is_important = $17,
        is_regular = $18,
        updated_at = NOW()
      WHERE id = $19
      RETURNING *
    `, [
      type,
      title,
      source,
      publish_date,
      registration_deadline,
      event_date,
      effective_date,
      frequency,
      next_event_date,
      description,
      prize_pool,
      registration_url,
      original_url,
      key_points,
      tags,
      is_featured,
      is_important,
      is_regular,
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '事件不存在' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('更新事件失败:', error);
    res.status(500).json({ error: '更新失败' });
  }
});

// 删除事件（管理员）
router.delete('/chengdu-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'DELETE FROM chengdu_ai_events WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '事件不存在' });
    }

    res.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除事件失败:', error);
    res.status(500).json({ error: '删除失败' });
  }
});

// 获取监控的公众号列表
router.get('/wechat-accounts', async (req, res) => {
  try {
    const WechatMonitor = require('../crawlers/wechat-monitor');
    const monitor = new WechatMonitor();
    const accounts = monitor.getAllAccounts();
    res.json(accounts);
  } catch (error) {
    console.error('获取公众号列表失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

module.exports = router;
