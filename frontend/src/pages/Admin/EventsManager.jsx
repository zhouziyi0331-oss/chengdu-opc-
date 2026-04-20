import { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    type: 'online',
    description: '',
    event_date: '',
    location: ''
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('获取活动失败:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateEvent(editing, form);
      } else {
        await createEvent(form);
      }
      setForm({ title: '', type: 'online', description: '', event_date: '', location: '' });
      setEditing(null);
      fetchEvents();
    } catch (error) {
      alert('操作失败');
    }
  };

  const handleEdit = (event) => {
    setForm({
      ...event,
      event_date: new Date(event.event_date).toISOString().slice(0, 16)
    });
    setEditing(event.id);
  };

  const handleDelete = async (id) => {
    if (confirm('确定删除？')) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">活动管理</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="活动标题"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="online">线上活动</option>
          <option value="offline">线下活动</option>
        </select>
        <textarea
          placeholder="活动描述"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          rows="3"
        />
        <input
          type="datetime-local"
          value={form.event_date}
          onChange={(e) => setForm({ ...form, event_date: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="地点（线下活动）"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {editing ? '更新' : '添加'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ title: '', type: 'online', description: '', event_date: '', location: '' });
            }}
            className="ml-2 bg-gray-300 px-4 py-2 rounded"
          >
            取消
          </button>
        )}
      </form>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded">
            <h3 className="font-bold">{event.title}</h3>
            <p className="text-sm">{event.description}</p>
            <p className="text-sm text-gray-600">
              {new Date(event.event_date).toLocaleString()} | {event.type === 'online' ? '线上' : '线下'}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(event)}
                className="text-blue-600 hover:underline"
              >
                编辑
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-600 hover:underline"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
