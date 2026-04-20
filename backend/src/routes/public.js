const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 获取社群信息
router.get('/community-info', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM community_info LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (error) {
    console.error('Error fetching community info:', error);
    res.status(500).json({ error: 'Failed to fetch community info' });
  }
});

// 获取统计数据
router.get('/stats', async (req, res) => {
  try {
    const [members, activities, projects, works] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM members'),
      pool.query('SELECT COUNT(*) FROM activities WHERE status = $1', ['completed']),
      pool.query('SELECT COUNT(*) FROM collaboration_projects'),
      pool.query('SELECT COUNT(*) FROM member_works')
    ]);

    res.json({
      memberCount: parseInt(members.rows[0].count),
      activityCount: parseInt(activities.rows[0].count),
      projectCount: parseInt(projects.rows[0].count),
      workCount: parseInt(works.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// 访问码登录
router.post('/login', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Access code is required' });
    }

    const result = await pool.query(
      'SELECT * FROM access_codes WHERE code = $1 AND (expires_at IS NULL OR expires_at > NOW())',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired access code' });
    }

    const accessCode = result.rows[0];

    // 标记为已使用
    if (!accessCode.is_used) {
      await pool.query(
        'UPDATE access_codes SET is_used = true, used_at = NOW() WHERE id = $1',
        [accessCode.id]
      );
    }

    // 生成JWT token (7天有效期)
    const token = jwt.sign(
      { codeId: accessCode.id, memberName: accessCode.member_name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      memberName: accessCode.member_name,
      expiresIn: 7 * 24 * 60 * 60 // 7天（秒）
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 管理员登录
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 生成JWT token
    const token = jwt.sign(
      { adminId: admin.id, username: admin.username, isAdmin: true },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      username: admin.username,
      isAdmin: true
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 获取赛事列表（公开）
router.get('/competitions', async (req, res) => {
  try {
    const { type, region } = req.query;
    let query = 'SELECT * FROM competitions WHERE 1=1';
    const params = [];

    if (type) {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }

    if (region) {
      params.push(region);
      query += ` AND region = $${params.length}`;
    }

    query += ' ORDER BY deadline ASC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
});

// 获取单个赛事详情
router.get('/competitions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM competitions WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching competition:', error);
    res.status(500).json({ error: 'Failed to fetch competition' });
  }
});

module.exports = router;
