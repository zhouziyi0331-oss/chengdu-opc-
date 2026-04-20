import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [featuredCompetitions, setFeaturedCompetitions] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchFeaturedCompetitions();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  const fetchFeaturedCompetitions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/competitions?is_featured=true');
      const data = await response.json();
      setFeaturedCompetitions(data.slice(0, 3));
    } catch (error) {
      console.error('获取推荐赛事失败:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-20 px-4">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[4px] font-bold text-gray-500 mb-4">
            CHENGDU OPC CENTER
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            成都OPC中心
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            一个专注于AI技能学习、资讯分享和活动组织的社群
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="btn-primary">
              <i className="fas fa-compass mr-2"></i>
              了解我们
            </Link>
            <Link to="/competitions" className="btn-secondary">
              <i className="fas fa-trophy mr-2"></i>
              查看赛事
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="relative rounded-[48px] overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-rocket text-8xl text-indigo-300 mb-4"></i>
                <p className="text-2xl font-bold text-gray-400">成都OPC中心</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三大核心价值 */}
      <section className="mb-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">我们的核心价值</h2>
          <p className="text-xl text-gray-600">有意思 · 有成长 · 有体系</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <i className="fas fa-smile-beam text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">有意思</h3>
            <p className="text-gray-600 leading-relaxed">
              不枯燥的学习方式，有趣的活动形式，让AI学习变得轻松愉快
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <i className="fas fa-chart-line text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">有成长</h3>
            <p className="text-gray-600 leading-relaxed">
              从零基础到进阶，清晰的成长路径，看得见的技能提升
            </p>
          </div>

          <div className="card text-center group hover:scale-105 transition-transform">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <i className="fas fa-sitemap text-3xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">有体系</h3>
            <p className="text-gray-600 leading-relaxed">
              完整的学习体系，系统的知识架构，科学的进阶航道
            </p>
          </div>
        </div>
      </section>

      {/* 三条进阶航道 */}
      <section className="mb-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">三条进阶航道</h2>
          <p className="text-xl text-gray-600">选择适合你的成长路径</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 探索者号 */}
          <div className="card group hover:shadow-2xl transition-all">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🚢</div>
              <h3 className="text-2xl font-bold mb-2">探索者号</h3>
              <p className="text-sm text-gray-500">新手入门</p>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                <span>了解AI基础概念</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                <span>学习常用AI工具</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                <span>完成新手任务</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                <span>参与社群活动</span>
              </p>
            </div>
          </div>

          {/* 生产者号 */}
          <div className="card group hover:shadow-2xl transition-all bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🛳️</div>
              <h3 className="text-2xl font-bold mb-2">生产者号</h3>
              <p className="text-sm text-gray-500">进阶实践</p>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mr-2 mt-1"></i>
                <span>创作AI作品</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mr-2 mt-1"></i>
                <span>参与项目协作</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mr-2 mt-1"></i>
                <span>分享学习经验</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mr-2 mt-1"></i>
                <span>参加AI竞赛</span>
              </p>
            </div>
          </div>

          {/* 领航员号 */}
          <div className="card group hover:shadow-2xl transition-all">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-2xl font-bold mb-2">领航员号</h3>
              <p className="text-sm text-gray-500">高级进阶</p>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start">
                <i className="fas fa-check-circle text-purple-500 mr-2 mt-1"></i>
                <span>组织社群活动</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-purple-500 mr-2 mt-1"></i>
                <span>指导新手成长</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-purple-500 mr-2 mt-1"></i>
                <span>输出优质内容</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-purple-500 mr-2 mt-1"></i>
                <span>推动社群发展</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/about" className="btn-secondary">
            <i className="fas fa-info-circle mr-2"></i>
            了解更多航道详情
          </Link>
        </div>
      </section>

      {/* 推荐赛事 */}
      {featuredCompetitions.length > 0 && (
        <section className="mb-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">推荐赛事</h2>
            <p className="text-xl text-gray-600">不要错过这些精彩的AI竞赛</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredCompetitions.map((competition) => (
              <Link
                key={competition.id}
                to="/competitions"
                className="card group hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                    <i className="fas fa-star mr-1"></i>推荐
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {competition.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {competition.description}
                </p>
                <p className="text-xs text-gray-500">
                  <i className="fas fa-clock mr-1"></i>
                  截止：{formatDate(competition.registration_deadline)}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/competitions" className="btn-primary">
              <i className="fas fa-trophy mr-2"></i>
              查看所有赛事
            </Link>
          </div>
        </section>
      )}

      {/* 统计数据 */}
      {stats && (
        <section className="mb-20 px-4">
          <div className="card max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  {stats.member_count || 0}+
                </div>
                <div className="text-gray-600">社群成员</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-purple-600 mb-2">
                  {stats.project_count || 0}+
                </div>
                <div className="text-gray-600">协作项目</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-pink-600 mb-2">
                  {stats.activity_count || 0}+
                </div>
                <div className="text-gray-600">举办活动</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-orange-600 mb-2">
                  {stats.resource_count || 0}+
                </div>
                <div className="text-gray-600">学习资源</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-center mb-20 px-4">
        <div className="card max-w-3xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
          <h2 className="text-4xl font-extrabold mb-4">准备好开始你的AI之旅了吗？</h2>
          <p className="text-xl mb-8 opacity-90">
            加入成都OPC中心，与志同道合的伙伴一起探索AI的无限可能
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition-colors">
              <i className="fas fa-rocket mr-2"></i>
              立即加入
            </Link>
            <Link to="/past-activities" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/30 transition-colors">
              <i className="fas fa-images mr-2"></i>
              查看往期活动
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
