import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import AccessCodeModal from '../components/AccessCodeModal';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMembers();
    } else {
      setShowModal(true);
    }
  }, [isAuthenticated, filter]);

  const fetchMembers = async () => {
    try {
      let url = 'http://localhost:3000/api/members';
      if (filter !== 'all') {
        url += `?role=${filter}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('获取成员失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleName = (role) => {
    const names = {
      'atmosphere': '氛围组',
      'action': '行动派',
      'recorder': '记录官',
      'advisor': '参谋官'
    };
    return names[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      'atmosphere': 'bg-yellow-100 text-yellow-800',
      'action': 'bg-red-100 text-red-800',
      'recorder': 'bg-blue-100 text-blue-800',
      'advisor': 'bg-green-100 text-green-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role) => {
    const icons = {
      'atmosphere': '🎉',
      'action': '⚡',
      'recorder': '📝',
      'advisor': '🧠'
    };
    return icons[role] || '👤';
  };

  const getShipName = (ship) => {
    const names = {
      'explorer': '探索者号',
      'producer': '生产者号',
      'navigator': '领航员号'
    };
    return names[ship] || ship;
  };

  const getShipIcon = (ship) => {
    const icons = {
      'explorer': '🚢',
      'producer': '🛳️',
      'navigator': '🚀'
    };
    return icons[ship] || '⛵';
  };

  if (!isAuthenticated) {
    return <AccessCodeModal isOpen={showModal} onClose={() => setShowModal(false)} />;
  }

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <div className="text-sm uppercase tracking-[4px] font-bold text-gray-500 mb-4">
          OUR MEMBERS
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          社群成员
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          认识我们的伙伴 · 一起探索AI的世界
        </p>
      </div>

      {/* 角色说明 */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-bold mb-2">氛围组</h3>
            <p className="text-sm text-gray-600">
              活跃社群氛围
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-bold mb-2">行动派</h3>
            <p className="text-sm text-gray-600">
              积极实践探索
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-lg font-bold mb-2">记录官</h3>
            <p className="text-sm text-gray-600">
              记录知识沉淀
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-lg font-bold mb-2">参谋官</h3>
            <p className="text-sm text-gray-600">
              提供专业指导
            </p>
          </div>
        </div>
      </div>

      {/* 筛选按钮 */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          全部成员
        </button>
        <button
          onClick={() => setFilter('atmosphere')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'atmosphere'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎉 氛围组
        </button>
        <button
          onClick={() => setFilter('action')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'action'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ⚡ 行动派
        </button>
        <button
          onClick={() => setFilter('recorder')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'recorder'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📝 记录官
        </button>
        <button
          onClick={() => setFilter('advisor')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'advisor'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🧠 参谋官
        </button>
      </div>

      {/* 成员列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {members.map((member) => (
          <div key={member.id} className="card group hover:scale-105 transition-transform">
            {/* 头像 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {member.name ? member.name[0] : '?'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 group-hover:text-indigo-600 transition-colors">
                  {member.name}
                </h3>
                {member.bio && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.role && (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(member.role)}`}>
                  {getRoleIcon(member.role)} {getRoleName(member.role)}
                </span>
              )}
              {member.ship && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                  {getShipIcon(member.ship)} {getShipName(member.ship)}
                </span>
              )}
            </div>

            {/* 技能标签 */}
            {member.skills && member.skills.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">擅长领域：</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 社交链接 */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              )}
              {member.wechat && (
                <span className="text-gray-500 text-sm">
                  <i className="fab fa-weixin mr-1"></i>
                  {member.wechat}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无成员信息
        </div>
      )}

      {/* 加入CTA */}
      <div className="card max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl font-extrabold mb-4">成为我们的一员</h2>
        <p className="text-xl mb-6 opacity-90">
          加入成都OPC中心，与优秀的伙伴一起学习成长
        </p>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition-colors">
          <i className="fas fa-user-plus mr-2"></i>
          立即加入
        </button>
      </div>
    </div>
  );
}
