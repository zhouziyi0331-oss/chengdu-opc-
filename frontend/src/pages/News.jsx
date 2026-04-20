import { useEffect, useState } from 'react';
import { getNews } from '../services/api';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        setNews(response.data);
      } catch (error) {
        console.error('获取资讯失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = filter === 'all'
    ? news
    : news.filter((item) => item.category === filter);

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-8">AI资讯</h1>

      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('tutorial')}
          className={`px-4 py-2 rounded ${
            filter === 'tutorial'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          教程
        </button>
        <button
          onClick={() => setFilter('project')}
          className={`px-4 py-2 rounded ${
            filter === 'project'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          项目
        </button>
        <button
          onClick={() => setFilter('discussion')}
          className={`px-4 py-2 rounded ${
            filter === 'discussion'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          讨论
        </button>
      </div>

      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
                >
                  {item.title}
                </a>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">{item.source}</span>
                  {item.likes_count > 0 && <span>👍 {item.likes_count}</span>}
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无资讯
        </div>
      )}
    </div>
  );
}
