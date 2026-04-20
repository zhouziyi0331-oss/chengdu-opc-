import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PastActivities() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/activities/past');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('获取活动失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async (activityId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/activities/${activityId}/photos`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('获取照片失败:', error);
    }
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    fetchPhotos(activity.id);
  };

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <div className="text-sm uppercase tracking-[4px] font-bold text-gray-500 mb-4">
          PAST ACTIVITIES
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          过往活动回顾
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          记录我们一起成长的每一个精彩瞬间
        </p>
      </div>

      {/* 筛选按钮 */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          全部活动
        </button>
        <button
          onClick={() => setFilter('offline')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'offline'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          线下活动
        </button>
        <button
          onClick={() => setFilter('online')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'online'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          线上活动
        </button>
        <button
          onClick={() => setFilter('workshop')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'workshop'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          工作坊
        </button>
        <button
          onClick={() => setFilter('sharing')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'sharing'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          分享会
        </button>
      </div>

      {/* 活动列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => handleActivityClick(activity)}
            className="card cursor-pointer group"
          >
            {/* 活动封面 */}
            {activity.cover_image ? (
              <img
                src={activity.cover_image}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-3xl mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mb-4 flex items-center justify-center">
                <i className="fas fa-calendar-alt text-6xl text-gray-300"></i>
              </div>
            )}

            {/* 活动类型标签 */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                activity.type === 'offline' ? 'bg-green-100 text-green-800' :
                activity.type === 'online' ? 'bg-blue-100 text-blue-800' :
                activity.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {activity.type === 'offline' ? '线下活动' :
                 activity.type === 'online' ? '线上活动' :
                 activity.type === 'workshop' ? '工作坊' : '分享会'}
              </span>
              {activity.participant_count > 0 && (
                <span className="text-sm text-gray-500">
                  <i className="fas fa-users mr-1"></i>
                  {activity.participant_count}人参与
                </span>
              )}
            </div>

            {/* 活动标题 */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
              {activity.title}
            </h3>

            {/* 活动时间和地点 */}
            <div className="text-sm text-gray-500 mb-3">
              <p>
                <i className="fas fa-calendar mr-2"></i>
                {new Date(activity.event_date).toLocaleDateString('zh-CN')}
              </p>
              {activity.location && (
                <p>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {activity.location}
                </p>
              )}
            </div>

            {/* 活动描述 */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {activity.description}
            </p>

            {/* 查看详情按钮 */}
            <button className="font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-2 transition-all hover:gap-4">
              查看详情 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无{filter !== 'all' ? '该类型' : ''}活动记录
        </div>
      )}

      {/* 活动详情弹窗 */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] p-8 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-extrabold">{selectedActivity.title}</h2>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* 活动信息 */}
            <div className="mb-6 space-y-2 text-gray-600">
              <p>
                <i className="fas fa-calendar mr-2"></i>
                {new Date(selectedActivity.event_date).toLocaleDateString('zh-CN')}
              </p>
              {selectedActivity.location && (
                <p>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {selectedActivity.location}
                </p>
              )}
              {selectedActivity.participant_count > 0 && (
                <p>
                  <i className="fas fa-users mr-2"></i>
                  {selectedActivity.participant_count}人参与
                </p>
              )}
            </div>

            {/* 活动描述 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">活动介绍</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {selectedActivity.description}
              </p>
            </div>

            {/* 活动成果 */}
            {selectedActivity.achievements && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">活动成果</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedActivity.achievements}
                </p>
              </div>
            )}

            {/* 活动照片 */}
            {photos.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">活动照片</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="group relative">
                      <img
                        src={photo.photo_url}
                        alt={photo.caption || '活动照片'}
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                      {photo.caption && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center p-4">
                          <p className="text-white text-sm text-center">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
