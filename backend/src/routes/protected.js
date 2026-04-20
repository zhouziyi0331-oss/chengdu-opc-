const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const { verifyAccessCode } = require('../middleware/auth');

// 获取过往活动列表
router.get('/activities/past', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM activities
       WHERE status = 'completed'
       ORDER BY event_date DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching past activities:', error);
    res.status(500).json({ error: 'Failed to fetch past activities' });
  }
});

// 获取活动照片
router.get('/activities/:id/photos', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM activity_photos WHERE activity_id = $1 ORDER BY sort_order ASC',
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching activity photos:', error);
    res.status(500).json({ error: 'Failed to fetch activity photos' });
  }
});

// 获取即将举办的活动（需要访问码）
router.get('/activities/upcoming', verifyAccessCode, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM activities
       WHERE status = 'upcoming' AND event_date >= NOW()
       ORDER BY event_date ASC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching upcoming activities:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming activities' });
  }
});

// 获取成员列表（需要访问码）
router.get('/members', verifyAccessCode, async (req, res) => {
  try {
    const { role } = req.query;
    let query = 'SELECT * FROM members WHERE 1=1';
    const params = [];

    if (role && role !== 'all') {
      params.push(role);
      query += ` AND role_type = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// 获取成员作品（需要访问码）
router.get('/works', verifyAccessCode, async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM member_works WHERE 1=1';
    const params = [];

    if (type && type !== 'all') {
      params.push(type);
      query += ` AND work_type = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching works:', error);
    res.status(500).json({ error: 'Failed to fetch works' });
  }
});

// 作品点赞（需要访问码）
router.post('/works/:id/like', verifyAccessCode, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      'UPDATE member_works SET likes_count = likes_count + 1 WHERE id = $1',
      [id]
    );
    res.json({ message: 'Liked successfully' });
  } catch (error) {
    console.error('Error liking work:', error);
    res.status(500).json({ error: 'Failed to like work' });
  }
});

// 获取学习资源
router.get('/resources', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM learning_resources WHERE 1=1';
    const params = [];

    if (type && type !== 'all') {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// 获取协作项目（需要访问码）
router.get('/projects', verifyAccessCode, async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM collaboration_projects WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

module.exports = router;
