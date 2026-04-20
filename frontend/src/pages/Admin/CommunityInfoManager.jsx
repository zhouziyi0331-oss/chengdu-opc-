import { useState, useEffect } from 'react';
import { getCommunityInfo, updateCommunityInfo } from '../../services/api';

export default function CommunityInfoManager() {
  const [form, setForm] = useState({
    introduction: '',
    email: '',
    wechat: ''
  });

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await getCommunityInfo();
      const data = response.data;
      setForm({
        introduction: data.introduction || '',
        email: data.contact_info?.email || '',
        wechat: data.contact_info?.wechat || ''
      });
    } catch (error) {
      console.error('获取社群信息失败:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCommunityInfo({
        introduction: form.introduction,
        contact_info: {
          email: form.email,
          wechat: form.wechat
        }
      });
      alert('更新成功');
    } catch (error) {
      alert('更新失败');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">社群信息管理</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">社群介绍</label>
          <textarea
            value={form.introduction}
            onChange={(e) => setForm({ ...form, introduction: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">联系邮箱</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">微信号</label>
          <input
            type="text"
            value={form.wechat}
            onChange={(e) => setForm({ ...form, wechat: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          保存更新
        </button>
      </form>
    </div>
  );
}
