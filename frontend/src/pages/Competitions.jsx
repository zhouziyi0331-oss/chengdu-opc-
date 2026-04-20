import { useEffect, useState } from 'react';

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCompetitions();
  }, [filter, statusFilter]);

  const fetchCompetitions = async () => {
    try {
      let url = 'http://localhost:3000/api/competitions?';
      if (filter !== 'all') url += `category=${filter}&`;
      if (statusFilter !== 'all') url += `status=${statusFilter}`;

      const response = await fetch(url);
      const data = await response.json();
      setCompetitions(data);
    } catch (error) {
      console.error('获取赛事失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category) => {
    const names = {
      'opc_sichuan': '四川OPC',
      'opc_chengdu': '成都OPC',
      'ai_innovation': 'AI创新',
      'ai_national': 'AI全国赛'
    };
    return names[category] || category;
  };

  const getStatusName = (status) => {
    const names = {
      'upcoming': '即将开始',
      'ongoing': '进行中',
      'ended': '已结束'
    };
    return names[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'upcoming': 'bg-blue-100 text-blue-800',
      'ongoing': 'bg-green-100 text-green-800',
      'ended': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <div className="text-sm uppercase tracking-[4px] font-bold text-gray-500 mb-4">
          COMPETITIONS
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          赛事信息
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          四川/成都OPC赛事 · AI创新创意赛 · 全国AI大赛
        </p>
      </div>

      {/* 筛选按钮 */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部赛事
          </button>
          <button
            onClick={() => setFilter('opc_sichuan')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'opc_sichuan'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            四川OPC
          </button>
          <button
            onClick={() => setFilter('opc_chengdu')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'opc_chengdu'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            成都OPC
          </button>
          <button
            onClick={() => setFilter('ai_innovation')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'ai_innovation'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            AI创新赛
          </button>
          <button
            onClick={() => setFilter('ai_national')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === 'ai_national'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            AI全国赛
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部状态
          </button>
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              statusFilter === 'upcoming'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            即将开始
          </button>
          <button
            onClick={() => setStatusFilter('ongoing')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              statusFilter === 'ongoing'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            进行中
          </button>
        </div>
      </div>

      {/* 赛事列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        {competitions.map((competition) => {
          const daysUntil = getDaysUntilDeadline(competition.registration_deadline);
          const isUrgent = daysUntil <= 7 && daysUntil > 0;

          return (
            <div
              key={competition.id}
              onClick={() => setSelectedCompetition(competition)}
              className="card cursor-pointer group relative overflow-hidden"
            >
              {/* 紧急标签 */}
              {isUrgent && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 animate-pulse">
                  即将截止
                </div>
              )}

              {/* 封面图 */}
              {competition.cover_image ? (
                <img
                  src={competition.cover_image}
                  alt={competition.title}
                  className="w-full h-48 object-cover rounded-3xl mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl mb-4 flex items-center justify-center">
                  <i className="fas fa-trophy text-6xl text-indigo-200"></i>
                </div>
              )}

              {/* 标签 */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                  {getCategoryName(competition.category)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(competition.status)}`}>
                  {getStatusName(competition.status)}
                </span>
                {competition.is_featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                    <i className="fas fa-star mr-1"></i>推荐
                  </span>
                )}
              </div>

              {/* 标题 */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                {competition.title}
              </h3>

              {/* 主办方 */}
              {competition.organizer && (
                <p className="text-sm text-gray-600 mb-3">
                  <i className="fas fa-building mr-2"></i>
                  {competition.organizer}
                </p>
              )}

              {/* 描述 */}
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {competition.description}
              </p>

              {/* 时间信息 */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-calendar-alt w-5 mr-2"></i>
                  <span>比赛时间：{formatDate(competition.start_date)} - {formatDate(competition.end_date)}</span>
                </div>
                <div className={`flex items-center font-semibold ${isUrgent ? 'text-red-600' : 'text-gray-700'}`}>
                  <i className="fas fa-clock w-5 mr-2"></i>
                  <span>
                    报名截止：{formatDate(competition.registration_deadline)}
                    {daysUntil > 0 && ` (还剩${daysUntil}天)`}
                    {daysUntil === 0 && ' (今天截止)'}
                    {daysUntil < 0 && ' (已截止)'}
                  </span>
                </div>
                {competition.location && (
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-map-marker-alt w-5 mr-2"></i>
                    <span>{competition.location}</span>
                  </div>
                )}
              </div>

              {/* 底部按钮 */}
              <div className="flex gap-3">
                <button className="flex-1 btn-primary text-sm">
                  查看详情
                </button>
                {competition.registration_url && daysUntil >= 0 && (
                  <a
                    href={competition.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 btn-secondary text-sm text-center"
                  >
                    立即报名
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {competitions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无赛事信息
        </div>
      )}

      {/* 赛事详情弹窗 */}
      {selectedCompetition && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] p-8 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold mb-3">{selectedCompetition.title}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                    {getCategoryName(selectedCompetition.category)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCompetition.status)}`}>
                    {getStatusName(selectedCompetition.status)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompetition(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl ml-4"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* 封面图 */}
            {selectedCompetition.cover_image && (
              <img
                src={selectedCompetition.cover_image}
                alt={selectedCompetition.title}
                className="w-full h-64 object-cover rounded-3xl mb-6"
              />
            )}

            {/* 基本信息 */}
            <div className="mb-6 space-y-3">
              {selectedCompetition.organizer && (
                <p className="text-gray-700">
                  <i className="fas fa-building w-6 mr-2"></i>
                  <strong>主办方：</strong>{selectedCompetition.organizer}
                </p>
              )}
              <p className="text-gray-700">
                <i className="fas fa-calendar-alt w-6 mr-2"></i>
                <strong>比赛时间：</strong>{formatDate(selectedCompetition.start_date)} - {formatDate(selectedCompetition.end_date)}
              </p>
              <p className="text-gray-700 font-semibold">
                <i className="fas fa-clock w-6 mr-2"></i>
                <strong>报名截止：</strong>{formatDate(selectedCompetition.registration_deadline)}
              </p>
              {selectedCompetition.location && (
                <p className="text-gray-700">
                  <i className="fas fa-map-marker-alt w-6 mr-2"></i>
                  <strong>举办地点：</strong>{selectedCompetition.location}
                </p>
              )}
            </div>

            {/* 赛事描述 */}
            {selectedCompetition.description && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">赛事介绍</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedCompetition.description}
                </p>
              </div>
            )}

            {/* 奖项信息 */}
            {selectedCompetition.prize_info && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">
                  <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                  奖项设置
                </h3>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedCompetition.prize_info}
                  </p>
                </div>
              </div>
            )}

            {/* 参赛要求 */}
            {selectedCompetition.requirements && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">参赛要求</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedCompetition.requirements}
                </p>
              </div>
            )}

            {/* 联系方式 */}
            {selectedCompetition.contact_info && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">联系方式</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedCompetition.contact_info}
                </p>
              </div>
            )}

            {/* 底部按钮 */}
            <div className="flex gap-4">
              {selectedCompetition.registration_url && (
                <a
                  href={selectedCompetition.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-center"
                >
                  <i className="fas fa-edit mr-2"></i>
                  立即报名
                </a>
              )}
              {selectedCompetition.official_url && (
                <a
                  href={selectedCompetition.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-secondary text-center"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  官方网站
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
