import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ChengduEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await axios.get('/api/chengdu-events', { params });
      setEvents(response.data);
    } catch (error) {
      console.error('获取成都AI事件失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      competition: '赛事',
      policy: '政策',
      investment: '创投',
      activity: '活动'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      competition: 'tag-red',
      policy: 'tag-blue',
      investment: 'tag-yellow',
      activity: 'tag-green'
    };
    return colors[type] || 'tag-blue';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      {/* 页头 */}
      <section className="text-center mb-16">
        <h1 className="text-6xl font-black mb-6 text-black">成都AI资讯</h1>
        <p className="text-2xl font-bold text-gray-700 mb-10">
          最新赛事、政策、创投和活动信息
        </p>

        {/* 筛选按钮 */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('competition')}
            className={`btn ${filter === 'competition' ? 'btn-primary' : 'btn-secondary'}`}
          >
            赛事
          </button>
          <button
            onClick={() => setFilter('policy')}
            className={`btn ${filter === 'policy' ? 'btn-primary' : 'btn-secondary'}`}
          >
            政策
          </button>
          <button
            onClick={() => setFilter('investment')}
            className={`btn ${filter === 'investment' ? 'btn-primary' : 'btn-secondary'}`}
          >
            创投
          </button>
          <button
            onClick={() => setFilter('activity')}
            className={`btn ${filter === 'activity' ? 'btn-primary' : 'btn-secondary'}`}
          >
            活动
          </button>
        </div>
      </section>

      {/* 事件列表 */}
      <section className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-2xl font-bold text-gray-500">加载中...</div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-2xl font-bold text-gray-500">暂无数据</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {events.map((event) => (
              <div key={event.id} className="card-white hover:scale-102 transition-transform">
                {/* 标签和日期 */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={getTypeColor(event.type)}>
                    {getTypeLabel(event.type)}
                  </span>
                  {event.is_featured && (
                    <span className="tag-orange">推荐</span>
                  )}
                  {event.is_important && (
                    <span className="tag-red">重要</span>
                  )}
                  {event.is_regular && (
                    <span className="tag-green">常态活动</span>
                  )}
                  <span className="text-gray-500 font-semibold">
                    发布于 {formatDate(event.publish_date)}
                  </span>
                </div>

                {/* 标题 */}
                <h2 className="text-3xl font-black mb-3 text-black">
                  {event.title}
                </h2>

                {/* 来源 */}
                <div className="text-lg font-bold text-gray-600 mb-4">
                  来源：{event.source}
                </div>

                {/* 描述 */}
                <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
                  {event.description}
                </p>

                {/* 关键信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {event.registration_deadline && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-clock text-[#FF6B6B]"></i>
                      <span className="font-bold">报名截止：</span>
                      <span className="text-gray-700">{formatDate(event.registration_deadline)}</span>
                    </div>
                  )}
                  {event.event_date && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar text-[#4ECDC4]"></i>
                      <span className="font-bold">活动日期：</span>
                      <span className="text-gray-700">{formatDate(event.event_date)}</span>
                    </div>
                  )}
                  {event.effective_date && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-file-alt text-[#FFD93D]"></i>
                      <span className="font-bold">生效日期：</span>
                      <span className="text-gray-700">{formatDate(event.effective_date)}</span>
                    </div>
                  )}
                  {event.prize_pool && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-trophy text-[#FF9F66]"></i>
                      <span className="font-bold">奖金/补贴：</span>
                      <span className="text-gray-700">{event.prize_pool}</span>
                    </div>
                  )}
                  {event.frequency && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-redo text-[#6BCF7F]"></i>
                      <span className="font-bold">活动频率：</span>
                      <span className="text-gray-700">{event.frequency}</span>
                    </div>
                  )}
                </div>

                {/* 关键要点 */}
                {event.key_points && event.key_points.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-black mb-3 text-black">关键要点</h3>
                    <ul className="space-y-2">
                      {event.key_points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <i className="fas fa-check-circle text-[#6BCF7F] mt-1"></i>
                          <span className="text-gray-700 font-semibold">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 标签 */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="tag-blue">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 链接 */}
                <div className="flex flex-wrap gap-4">
                  {event.original_url && (
                    <a
                      href={event.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      查看原文
                    </a>
                  )}
                  {event.registration_url && (
                    <a
                      href={event.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      立即报名
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
