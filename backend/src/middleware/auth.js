const jwt = require('jsonwebtoken');

const verifyAccessCode = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '需要访问令牌' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: '无效或过期的访问令牌' });
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '需要管理员令牌' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // 检查是否是管理员
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: '需要管理员权限' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: '无效或过期的管理员令牌' });
  }
};

module.exports = { verifyAccessCode, verifyAdmin };
