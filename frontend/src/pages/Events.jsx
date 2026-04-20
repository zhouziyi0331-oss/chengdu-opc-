import { useEffect, useState } from 'react';
import { getUpcomingActivities } from '../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getUpcomingActivities();
        setEvents(response.data);
      } catch (error) {
        console.error('获取活动失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-8">活动预告</h1>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      event.type === 'online'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {event.type === 'online' ? '线上活动' : '线下活动'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📅 {new Date(event.event_date).toLocaleString('zh-CN')}</span>
                  {event.location && <span>📍 {event.location}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无活动预告
        </div>
      )}
    </div>
  );
}
