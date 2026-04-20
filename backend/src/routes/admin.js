const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const { verifyAdmin } = require('../middleware/auth');

// 所有管理员路由都需要验证
router.use(verifyAdmin);

// ==================== 活动管理 ====================

// 获取所有活动
router.get('/activities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activities ORDER BY event_date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// 创建活动
router.post('/activities', async (req, res) => {
  try {
    const { title, type, description, event_date, location, cover_image, status } = req.body;
    const result = await pool.query(
      `INSERT INTO activities (title, type, description, event_date, location, cover_image, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, type, description, event_date, location, cover_image, status || 'upcoming']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// 更新活动
router.put('/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, description, event_date, location, cover_image, participant_count, achievements, status } = req.body;
    const result = await pool.query(
      `UPDATE activities SET
       title = $1, type = $2, description = $3, event_date = $4,
       location = $5, cover_image = $6, participant_count = $7,
       achievements = $8, status = $9
       WHERE id = $10 RETURNING *`,
      [title, type, description, event_date, location, cover_image, participant_count, achievements, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// 删除活动
router.delete('/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM activities WHERE id = $1', [id]);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

// 添加活动照片
router.post('/activities/:id/photos', async (req, res) => {
  try {
    const { id } = req.params;
    const { photo_url, caption, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO activity_photos (activity_id, photo_url, caption, sort_order)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, photo_url, caption, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding photo:', error);
    res.status(500).json({ error: 'Failed to add photo' });
  }
});

// 删除活动照片
router.delete('/activities/:activityId/photos/:photoId', async (req, res) => {
  try {
    const { photoId } = req.params;
    await pool.query('DELETE FROM activity_photos WHERE id = $1', [photoId]);
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

// ==================== 成员管理 ====================

// 获取所有成员
router.get('/members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// 创建成员
router.post('/members', async (req, res) => {
  try {
    const { name, avatar_url, bio, skills, role, ship, github, email, wechat } = req.body;
    const result = await pool.query(
      `INSERT INTO members (name, avatar_url, bio, skills, role, ship, github, email, wechat)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, avatar_url, bio, skills, role, ship, github, email, wechat]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

// 更新成员
router.put('/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, avatar_url, bio, skills, role, ship, github, email, wechat } = req.body;
    const result = await pool.query(
      `UPDATE members SET
       name = $1, avatar_url = $2, bio = $3, skills = $4,
       role = $5, ship = $6, github = $7, email = $8, wechat = $9
       WHERE id = $10 RETURNING *`,
      [name, avatar_url, bio, skills, role, ship, github, email, wechat, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// 删除成员
router.delete('/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM members WHERE id = $1', [id]);
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// ==================== 作品管理 ====================

// 获取所有作品
router.get('/works', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM member_works ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching works:', error);
    res.status(500).json({ error: 'Failed to fetch works' });
  }
});

// 创建作品
router.post('/works', async (req, res) => {
  try {
    const { title, description, category, author_name, image_url, github_url, demo_url, tech_stack, status } = req.body;
    const result = await pool.query(
      `INSERT INTO member_works (title, description, category, author_name, image_url, github_url, demo_url, tech_stack, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, description, category, author_name, image_url, github_url, demo_url, tech_stack, status || 'completed']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating work:', error);
    res.status(500).json({ error: 'Failed to create work' });
  }
});

// 更新作品
router.put('/works/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, author_name, image_url, github_url, demo_url, tech_stack, status } = req.body;
    const result = await pool.query(
      `UPDATE member_works SET
       title = $1, description = $2, category = $3, author_name = $4,
       image_url = $5, github_url = $6, demo_url = $7, tech_stack = $8, status = $9
       WHERE id = $10 RETURNING *`,
      [title, description, category, author_name, image_url, github_url, demo_url, tech_stack, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Work not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating work:', error);
    res.status(500).json({ error: 'Failed to update work' });
  }
});

// 删除作品
router.delete('/works/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM member_works WHERE id = $1', [id]);
    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error('Error deleting work:', error);
    res.status(500).json({ error: 'Failed to delete work' });
  }
});

// ==================== 项目管理 ====================

// 获取所有项目
router.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM collaboration_projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// 创建项目
router.post('/projects', async (req, res) => {
  try {
    const { title, description, category, status, initiator, team_members, required_skills, github_url } = req.body;
    const result = await pool.query(
      `INSERT INTO collaboration_projects (title, description, category, status, initiator, team_members, required_skills, github_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, category, status || 'recruiting', initiator, team_members, required_skills, github_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// 更新项目
router.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status, initiator, team_members, required_skills, github_url } = req.body;
    const result = await pool.query(
      `UPDATE collaboration_projects SET
       title = $1, description = $2, category = $3, status = $4,
       initiator = $5, team_members = $6, required_skills = $7, github_url = $8
       WHERE id = $9 RETURNING *`,
      [title, description, category, status, initiator, team_members, required_skills, github_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// 删除项目
router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM collaboration_projects WHERE id = $1', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ==================== 赛事管理 ====================

// 获取所有赛事
router.get('/competitions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competitions ORDER BY registration_deadline ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
});

// 创建赛事
router.post('/competitions', async (req, res) => {
  try {
    const {
      title, description, category, organizer, location,
      registration_url, official_url, start_date, end_date,
      registration_deadline, prize_info, requirements,
      contact_info, cover_image, status, is_featured
    } = req.body;

    const result = await pool.query(
      `INSERT INTO competitions (
        title, description, category, organizer, location,
        registration_url, official_url, start_date, end_date,
        registration_deadline, prize_info, requirements,
        contact_info, cover_image, status, is_featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [
        title, description, category, organizer, location,
        registration_url, official_url, start_date, end_date,
        registration_deadline, prize_info, requirements,
        contact_info, cover_image, status || 'upcoming', is_featured || false
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating competition:', error);
    res.status(500).json({ error: 'Failed to create competition' });
  }
});

// 更新赛事
router.put('/competitions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, description, category, organizer, location,
      registration_url, official_url, start_date, end_date,
      registration_deadline, prize_info, requirements,
      contact_info, cover_image, status, is_featured
    } = req.body;

    const result = await pool.query(
      `UPDATE competitions SET
       title = $1, description = $2, category = $3, organizer = $4,
       location = $5, registration_url = $6, official_url = $7,
       start_date = $8, end_date = $9, registration_deadline = $10,
       prize_info = $11, requirements = $12, contact_info = $13,
       cover_image = $14, status = $15, is_featured = $16, updated_at = NOW()
       WHERE id = $17 RETURNING *`,
      [
        title, description, category, organizer, location,
        registration_url, official_url, start_date, end_date,
        registration_deadline, prize_info, requirements,
        contact_info, cover_image, status, is_featured, id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating competition:', error);
    res.status(500).json({ error: 'Failed to update competition' });
  }
});

// 删除赛事
router.delete('/competitions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM competitions WHERE id = $1', [id]);
    res.json({ message: 'Competition deleted successfully' });
  } catch (error) {
    console.error('Error deleting competition:', error);
    res.status(500).json({ error: 'Failed to delete competition' });
  }
});

// ==================== 学习资源管理 ====================

// 获取所有资源
router.get('/resources', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM learning_resources ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// 创建资源
router.post('/resources', async (req, res) => {
  try {
    const { title, type, url, description, author, source, tags } = req.body;
    const result = await pool.query(
      `INSERT INTO learning_resources (title, type, url, description, author, source, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, type, url, description, author, source, tags]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// 更新资源
router.put('/resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, url, description, author, source, tags } = req.body;
    const result = await pool.query(
      `UPDATE learning_resources SET
       title = $1, type = $2, url = $3, description = $4,
       author = $5, source = $6, tags = $7
       WHERE id = $8 RETURNING *`,
      [title, type, url, description, author, source, tags, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({ error: 'Failed to update resource' });
  }
});

// 删除资源
router.delete('/resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM learning_resources WHERE id = $1', [id]);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

// ==================== 访问码管理 ====================

// 获取所有访问码
router.get('/access-codes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM access_codes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching access codes:', error);
    res.status(500).json({ error: 'Failed to fetch access codes' });
  }
});

// 生成访问码
router.post('/access-codes', async (req, res) => {
  try {
    const { member_name, expires_at } = req.body;
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();

    const result = await pool.query(
      `INSERT INTO access_codes (code, member_name, expires_at)
       VALUES ($1, $2, $3) RETURNING *`,
      [code, member_name, expires_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating access code:', error);
    res.status(500).json({ error: 'Failed to create access code' });
  }
});

// 删除访问码
router.delete('/access-codes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM access_codes WHERE id = $1', [id]);
    res.json({ message: 'Access code deleted successfully' });
  } catch (error) {
    console.error('Error deleting access code:', error);
    res.status(500).json({ error: 'Failed to delete access code' });
  }
});

// ==================== 社群信息管理 ====================

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

// 更新社群信息
router.put('/community-info', async (req, res) => {
  try {
    const { name, slogan, description, wechat, email } = req.body;

    // 先检查是否存在记录
    const check = await pool.query('SELECT id FROM community_info LIMIT 1');

    let result;
    if (check.rows.length === 0) {
      // 创建新记录
      result = await pool.query(
        `INSERT INTO community_info (name, slogan, description, wechat, email)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, slogan, description, wechat, email]
      );
    } else {
      // 更新现有记录
      result = await pool.query(
        `UPDATE community_info SET
         name = $1, slogan = $2, description = $3, wechat = $4, email = $5, updated_at = NOW()
         WHERE id = $6 RETURNING *`,
        [name, slogan, description, wechat, email, check.rows[0].id]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating community info:', error);
    res.status(500).json({ error: 'Failed to update community info' });
  }
});

module.exports = router;
