import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', creator: '', description: '', url: '', image_url: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('获取项目失败:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProject(editing, form);
      } else {
        await createProject(form);
      }
      setForm({ name: '', creator: '', description: '', url: '', image_url: '' });
      setEditing(null);
      fetchProjects();
    } catch (error) {
      alert('操作失败');
    }
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditing(project.id);
  };

  const handleDelete = async (id) => {
    if (confirm('确定删除？')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        alert('删除失败');
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">项目管理</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="项目名称"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="创建者"
          value={form.creator}
          onChange={(e) => setForm({ ...form, creator: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          placeholder="项目描述"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          rows="3"
        />
        <input
          type="url"
          placeholder="项目链接"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="url"
          placeholder="图片链接"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
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
              setForm({ name: '', creator: '', description: '', url: '', image_url: '' });
            }}
            className="ml-2 bg-gray-300 px-4 py-2 rounded"
          >
            取消
          </button>
        )}
      </form>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded">
            <h3 className="font-bold">{project.name}</h3>
            <p className="text-sm text-gray-600">创建者: {project.creator}</p>
            <p className="text-sm">{project.description}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="text-blue-600 hover:underline"
              >
                编辑
              </button>
              <button
                onClick={() => handleDelete(project.id)}
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
