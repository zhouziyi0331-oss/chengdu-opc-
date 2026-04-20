import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import AccessCodeModal from '../components/AccessCodeModal';

export default function Works() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorks();
    } else {
      setShowModal(true);
    }
  }, [isAuthenticated, filter]);

  const fetchWorks = async () => {
    try {
      let url = 'http://localhost:3000/api/works';
      if (filter !== 'all') {
        url += `?type=${filter}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setWorks(data);
    } catch (error) {
      console.error('获取作品失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category) => {
    const names = {
      'ai-art': 'AI艺术',
      'ai-tool': 'AI工具',
      'ai-app': 'AI应用',
      'ai-research': 'AI研究',
      'other': '其他'
    };
    return names[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'ai-art': 'bg-pink-100 text-pink-800',
      'ai-tool': 'bg-blue-100 text-blue-800',
      'ai-app': 'bg-green-100 text-green-800',
      'ai-research': 'bg-purple-100 text-purple-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
          MEMBER WORKS
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          成员作品
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          展示社群成员的优秀AI作品 · 激发创作灵感
        </p>
      </div>

      {/* 作品分类说明 */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-lg font-bold mb-2">AI艺术</h3>
            <p className="text-sm text-gray-600">
              AI绘画、视频、音乐等创意作品
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="text-lg font-bold mb-2">AI工具</h3>
            <p className="text-sm text-gray-600">
              提升效率的AI工具和插件
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-bold mb-2">AI应用</h3>
            <p className="text-sm text-gray-600">
              完整的AI应用程序和系统
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🔬</div>
            <h3 className="text-lg font-bold mb-2">AI研究</h3>
            <p className="text-sm text-gray-600">
              技术研究和实验性项目
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
          全部作品
        </button>
        <button
          onClick={() => setFilter('ai-art')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'ai-art'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-palette mr-2"></i>
          AI艺术
        </button>
        <button
          onClick={() => setFilter('ai-tool')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'ai-tool'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-tools mr-2"></i>
          AI工具
        </button>
        <button
          onClick={() => setFilter('ai-app')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'ai-app'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-mobile-alt mr-2"></i>
          AI应用
        </button>
        <button
          onClick={() => setFilter('ai-research')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'ai-research'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-flask mr-2"></i>
          AI研究
        </button>
      </div>

      {/* 作品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {works.map((work) => (
          <div key={work.id} className="card group hover:scale-105 transition-transform">
            {/* 作品封面 */}
            <div className="mb-4 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 aspect-video flex items-center justify-center">
              {work.image_url ? (
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <i className="fas fa-image text-5xl text-indigo-300 mb-2"></i>
                  <p className="text-sm text-gray-400">暂无封面</p>
                </div>
              )}
            </div>

            {/* 分类标签 */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(work.category)}`}>
                {getCategoryName(work.category)}
              </span>
              {work.status === 'completed' && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  <i className="fas fa-check-circle mr-1"></i>已完成
                </span>
              )}
            </div>

            {/* 作品标题 */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
              {work.title}
            </h3>

            {/* 作品描述 */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {work.description}
            </p>

            {/* 作者信息 */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {work.author_name ? work.author_name[0] : '?'}
                </div>
                <span className="text-gray-700 font-semibold">
                  {work.author_name || '匿名'}
                </span>
              </div>

              {work.github_url && (
                <a
                  href={work.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              )}
            </div>

            {/* 技术标签 */}
            {work.tech_stack && work.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {work.tech_stack.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {work.tech_stack.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    +{work.tech_stack.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {works.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无作品展示
        </div>
      )}

      {/* 提交作品CTA */}
      <div className="card max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl font-extrabold mb-4">展示你的AI作品</h2>
        <p className="text-xl mb-6 opacity-90">
          完成了一个有趣的AI项目？分享给社群成员，获得反馈和认可
        </p>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition-colors">
          <i className="fas fa-upload mr-2"></i>
          提交作品
        </button>
      </div>
    </div>
  );
}
