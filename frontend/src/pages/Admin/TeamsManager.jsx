import { useState, useEffect } from 'react';
import { getTeams, createTeam, createTeamPost } from '../../services/api';

export default function TeamsManager() {
  const [teams, setTeams] = useState([]);
  const [teamForm, setTeamForm] = useState({ name: '', project_description: '', members: '' });
  const [postForm, setPostForm] = useState({ team_id: '', type: 'resource', title: '', content: '' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await getTeams();
      setTeams(response.data);
    } catch (error) {
      console.error('获取团队失败:', error);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTeam({
        ...teamForm,
        members: teamForm.members.split(',').map(m => m.trim()).filter(Boolean)
      });
      setTeamForm({ name: '', project_description: '', members: '' });
      fetchTeams();
    } catch (error) {
      alert('创建团队失败');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTeamPost(postForm.team_id, {
        type: postForm.type,
        title: postForm.title,
        content: postForm.content
      });
      setPostForm({ team_id: '', type: 'resource', title: '', content: '' });
      alert('发布成功');
    } catch (error) {
      alert('发布失败');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">团队管理</h2>

      <div className="mb-8">
        <h3 className="font-bold mb-2">创建团队</h3>
        <form onSubmit={handleTeamSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="团队名称"
            value={teamForm.name}
            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="项目描述"
            value={teamForm.project_description}
            onChange={(e) => setTeamForm({ ...teamForm, project_description: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            rows="2"
          />
          <input
            type="text"
            placeholder="成员（逗号分隔）"
            value={teamForm.members}
            onChange={(e) => setTeamForm({ ...teamForm, members: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            创建团队
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-2">发布团队动态</h3>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <select
            value={postForm.team_id}
            onChange={(e) => setPostForm({ ...postForm, team_id: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">选择团队</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <select
            value={postForm.type}
            onChange={(e) => setPostForm({ ...postForm, type: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="resource">资源分享</option>
            <option value="recruitment">招募需求</option>
          </select>
          <input
            type="text"
            placeholder="标题"
            value={postForm.title}
            onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="内容"
            value={postForm.content}
            onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            rows="3"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            发布动态
          </button>
        </form>
      </div>

      <div>
        <h3 className="font-bold mb-2">现有团队</h3>
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="border p-4 rounded">
              <h4 className="font-bold">{team.name}</h4>
              <p className="text-sm">{team.project_description}</p>
              <p className="text-sm text-gray-600">成员: {team.members?.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
