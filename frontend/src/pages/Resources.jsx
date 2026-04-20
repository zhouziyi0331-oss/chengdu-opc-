import { useEffect, useState } from 'react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchResources();
  }, [filter]);

  const fetchResources = async () => {
    try {
      let url = 'http://localhost:3000/api/resources';
      if (filter !== 'all') {
        url += `?type=${filter}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('获取学习资源失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSourceName = (source) => {
    const names = {
      'juejin': '掘金',
      'github': 'GitHub',
      'zhihu': '知乎'
    };
    return names[source] || source;
  };

  const getSourceColor = (source) => {
    const colors = {
      'juejin': 'bg-blue-100 text-blue-800',
      'github': 'bg-gray-800 text-white',
      'zhihu': 'bg-blue-600 text-white'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <div className="text-sm uppercase tracking-[4px] font-bold text-gray-500 mb-4">
          LEARNING RESOURCES
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          学习资源
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          精选AI学习资料 · 最新技术资讯 · 优质教程推荐
        </p>
      </div>

      {/* 资源分类 */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">入门教程</h3>
            <p className="text-gray-600 text-sm">
              从零开始学习AI，掌握基础概念和工具使用
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-2">实战项目</h3>
            <p className="text-gray-600 text-sm">
              通过实际项目提升技能，积累实战经验
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🔥</div>
            <h3 className="text-xl font-bold mb-2">前沿资讯</h3>
            <p className="text-gray-600 text-sm">
              了解AI最新动态，把握技术发展趋势
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
          全部资源
        </button>
        <button
          onClick={() => setFilter('juejin')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'juejin'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-book mr-2"></i>
          掘金教程
        </button>
        <button
          onClick={() => setFilter('github')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'github'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fab fa-github mr-2"></i>
          GitHub项目
        </button>
        <button
          onClick={() => setFilter('zhihu')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'zhihu'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-lightbulb mr-2"></i>
          知乎讨论
        </button>
      </div>

      {/* 推荐学习路径 */}
      <div className="mb-12">
        <div className="card max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <i className="fas fa-route text-indigo-600 mr-2"></i>
            推荐学习路径
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6">
              <div className="text-3xl mb-3">1️⃣</div>
              <h3 className="font-bold mb-2">基础入门</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• AI基本概念</li>
                <li>• 常用工具介绍</li>
                <li>• Prompt工程基础</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <div className="text-3xl mb-3">2️⃣</div>
              <h3 className="font-bold mb-2">进阶实践</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 项目实战演练</li>
                <li>• API接口调用</li>
                <li>• 模型微调技巧</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <div className="text-3xl mb-3">3️⃣</div>
              <h3 className="font-bold mb-2">高级应用</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 复杂系统设计</li>
                <li>• 性能优化</li>
                <li>• 商业化落地</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 资源列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card group hover:scale-105 transition-transform"
          >
            {/* 来源标签 */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSourceColor(resource.source)}`}>
                {getSourceName(resource.source)}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(resource.published_at)}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-lg font-bold mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {resource.title}
            </h3>

            {/* 摘要 */}
            {resource.summary && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {resource.summary}
              </p>
            )}

            {/* 作者 */}
            {resource.author && (
              <p className="text-xs text-gray-500 mb-3">
                <i className="fas fa-user mr-1"></i>
                {resource.author}
              </p>
            )}

            {/* 底部信息 */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                <i className="fas fa-eye mr-1"></i>
                {resource.view_count || 0} 次浏览
              </span>
              <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                查看详情 <i className="fas fa-arrow-right ml-1"></i>
              </span>
            </div>
          </a>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无学习资源
        </div>
      )}

      {/* 推荐工具 */}
      <section className="mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-4">推荐AI工具</h2>
          <p className="text-gray-600">提升效率的必备工具</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold mb-2">ChatGPT</h3>
            <p className="text-sm text-gray-600">强大的对话AI助手</p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold mb-2">Midjourney</h3>
            <p className="text-sm text-gray-600">AI图像生成工具</p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-bold mb-2">GitHub Copilot</h3>
            <p className="text-sm text-gray-600">AI编程助手</p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🎵</div>
            <h3 className="font-bold mb-2">Suno</h3>
            <p className="text-sm text-gray-600">AI音乐创作</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="card max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl font-extrabold mb-4">需要更多学习资源？</h2>
        <p className="text-xl mb-6 opacity-90">
          加入成都OPC中心，获取更多独家学习资料和实战项目
        </p>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition-colors">
          <i className="fas fa-rocket mr-2"></i>
          立即加入
        </button>
      </div>
    </div>
  );
}
