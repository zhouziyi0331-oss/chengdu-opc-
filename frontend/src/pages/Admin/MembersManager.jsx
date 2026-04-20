import { useState, useEffect } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../../services/api';

export default function MembersManager() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    nickname: '',
    skills: '',
    interests: '',
    advantages: '',
    collaboration_needs: ''
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('获取成员失败:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: form.interests.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editing) {
        await updateMember(editing, data);
      } else {
        await createMember(data);
      }
      setForm({ nickname: '', skills: '', interests: '', advantages: '', collaboration_needs: '' });
      setEditing(null);
      fetchMembers();
    } catch (error) {
      alert('操作失败');
    }
  };

  const handleEdit = (member) => {
    setForm({
      ...member,
      skills: member.skills?.join(', ') || '',
      interests: member.interests?.join(', ') || ''
    });
    setEditing(member.id);
  };

  const handleDelete = async (id) => {
    if (confirm('确定删除？')) {
      try {
        await deleteMember(id);
        fetchMembers();
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">成员管理</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="昵称"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="擅长领域（逗号分隔）"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="想做的方向（逗号分隔）"
          value={form.interests}
          onChange={(e) => setForm({ ...form, interests: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="优势特长"
          value={form.advantages}
          onChange={(e) => setForm({ ...form, advantages: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          rows="2"
        />
        <textarea
          placeholder="寻求协作"
          value={form.collaboration_needs}
          onChange={(e) => setForm({ ...form, collaboration_needs: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          rows="2"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {editing ? '更新' : '添加'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ nickname: '', skills: '', interests: '', advantages: '', collaboration_needs: '' });
            }}
            className="ml-2 bg-gray-300 px-4 py-2 rounded"
          >
            取消
          </button>
        )}
      </form>

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="border p-4 rounded">
            <h3 className="font-bold">{member.nickname}</h3>
            <p className="text-sm">擅长: {member.skills?.join(', ')}</p>
            <p className="text-sm">兴趣: {member.interests?.join(', ')}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(member)}
                className="text-blue-600 hover:underline"
              >
                编辑
              </button>
              <button
                onClick={() => handleDelete(member.id)}
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
