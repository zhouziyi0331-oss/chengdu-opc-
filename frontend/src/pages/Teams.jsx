import { useEffect, useState } from 'react';
import { getTeams, getTeamPosts } from '../services/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response.data);
      } catch (error) {
        console.error('获取团队失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = async (team) => {
    setSelectedTeam(team);
    try {
      const response = await getTeamPosts(team.id);
      setPosts(response.data);
    } catch (error) {
      console.error('获取团队动态失败:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-8">团队协作</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">活跃团队</h2>
          <div className="space-y-4">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => handleTeamClick(team)}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition ${
                  selectedTeam?.id === team.id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <h3 className="font-bold mb-2">{team.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{team.project_description}</p>
                {team.members && team.members.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {team.members.map((member, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedTeam ? (
            <>
              <h2 className="text-xl font-bold mb-4">{selectedTeam.name} - 团队动态</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-3 py-1 rounded text-sm ${
                          post.type === 'resource'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {post.type === 'resource' ? '资源分享' : '招募需求'}
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-600">{post.content}</p>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    暂无团队动态
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              请选择一个团队查看详情
            </div>
          )}
        </div>
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无活跃团队
        </div>
      )}
    </div>
  );
}
