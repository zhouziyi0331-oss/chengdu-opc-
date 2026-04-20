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
      {/* Hero Section - Minerva风格 */}
      <section className="text-center mb-20 px-4 py-12">
        <div className="mb-12">
          {/* 彩色标签 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="tag-red">AI社群</span>
            <span className="tag-orange">技能学习</span>
            <span className="tag-yellow">活动组织</span>
            <span className="tag-green">资讯分享</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-6 text-black leading-tight">
            成都OPC中心
          </h1>
          <p className="text-3xl font-bold text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            一个专注于AI技能学习、资讯分享和活动组织的社群
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="btn-primary">
              <i className="fas fa-compass"></i>
              了解我们
            </Link>
            <Link to="/competitions" className="btn-secondary">
              <i className="fas fa-trophy"></i>
              查看赛事
            </Link>
          </div>
        </div>

        {/* Hero Image - 圆角卡片 */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="relative rounded-[60px] overflow-hidden shadow-2xl border-4 border-black">
            <div className="aspect-video bg-gradient-to-br from-[#FFD93D] via-[#FF9F66] to-[#FF6B6B] flex items-center justify-center">
              <div className="text-center">
                <div className="badge-circle mx-auto mb-6">
                  <i className="fas fa-rocket text-4xl"></i>
                </div>
                <p className="text-4xl font-black text-white drop-shadow-lg">成都OPC中心</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三大核心价值 - Minerva风格 */}
      <section className="mb-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 text-black">我们的核心价值</h2>
          <p className="text-2xl font-bold text-gray-700">有意思 · 有成长 · 有体系</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="card-white text-center group hover:scale-105 transition-transform">
            <div className="icon-circle-yellow mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <i className="fas fa-smile-beam text-4xl text-white"></i>
            </div>
            <h3 className="text-3xl font-black mb-4 text-black">有意思</h3>
            <p className="text-gray-700 leading-relaxed text-lg font-semibold">
              不枯燥的学习方式，有趣的活动形式，让AI学习变得轻松愉快
            </p>
          </div>

          <div className="card-white text-center group hover:scale-105 transition-transform">
            <div className="icon-circle-green mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <i className="fas fa-chart-line text-4xl text-white"></i>
            </div>
            <h3 className="text-3xl font-black mb-4 text-black">有成长</h3>
            <p className="text-gray-700 leading-relaxed text-lg font-semibold">
              系统化的学习路径，实战项目经验，助力个人技能持续提升
            </p>
          </div>

          <div className="card-white text-center group hover:scale-105 transition-transform">
            <div className="icon-circle-blue mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <i className="fas fa-layer-group text-4xl text-white"></i>
            </div>
            <h3 className="text-3xl font-black mb-4 text-black">有体系</h3>
            <p className="text-gray-700 leading-relaxed text-lg font-semibold">
              完整的知识体系，规范的组织架构，打造专业的AI学习社群
            </p>
          </div>
        </div>
      </section>

      {/* 三条进阶航道 - Minerva风格 */}
      <section className="mb-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 text-black">三条进阶航道</h2>
          <p className="text-2xl font-bold text-gray-700">选择适合你的成长路径</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* 探索者号 */}
          <div className="card-white group hover:scale-105 transition-all">
            <div className="text-center mb-8">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🚢</div>
              <h3 className="text-3xl font-black mb-2 text-black">探索者号</h3>
              <span className="tag-blue">新手入门</span>
            </div>
            <div className="space-y-4 text-gray-700 font-semibold">
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#6BCF7F] mr-3 mt-1 text-xl"></i>
                <span>了解AI基础概念</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#6BCF7F] mr-3 mt-1 text-xl"></i>
                <span>学习常用AI工具</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#6BCF7F] mr-3 mt-1 text-xl"></i>
                <span>完成新手任务</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#6BCF7F] mr-3 mt-1 text-xl"></i>
                <span>参与社群活动</span>
              </p>
            </div>
          </div>

          {/* 生产者号 */}
          <div className="card-white group hover:scale-105 transition-all bg-gradient-to-br from-[#FFD93D]/20 to-[#FF9F66]/20">
            <div className="text-center mb-8">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🛳️</div>
              <h3 className="text-3xl font-black mb-2 text-black">生产者号</h3>
              <span className="tag-orange">进阶实践</span>
            </div>
            <div className="space-y-4 text-gray-700 font-semibold">
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#FF9F66] mr-3 mt-1 text-xl"></i>
                <span>创作AI作品</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#FF9F66] mr-3 mt-1 text-xl"></i>
                <span>参与项目协作</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#FF9F66] mr-3 mt-1 text-xl"></i>
                <span>分享学习经验</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#FF9F66] mr-3 mt-1 text-xl"></i>
                <span>参加AI竞赛</span>
              </p>
            </div>
          </div>

          {/* 领航员号 */}
          <div className="card-white group hover:scale-105 transition-all">
            <div className="text-center mb-8">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-3xl font-black mb-2 text-black">领航员号</h3>
              <span className="tag-purple">高级进阶</span>
            </div>
            <div className="space-y-4 text-gray-700 font-semibold">
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#9B7EDE] mr-3 mt-1 text-xl"></i>
                <span>组织社群活动</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#9B7EDE] mr-3 mt-1 text-xl"></i>
                <span>指导新手成长</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#9B7EDE] mr-3 mt-1 text-xl"></i>
                <span>输出优质内容</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-check-circle text-[#9B7EDE] mr-3 mt-1 text-xl"></i>
                <span>推动社群发展</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/about" className="btn-secondary">
            <i className="fas fa-info-circle"></i>
            了解更多航道详情
          </Link>
        </div>
      </section>

      {/* 推荐赛事 - Minerva风格 */}
      {featuredCompetitions.length > 0 && (
        <section className="mb-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-black">推荐赛事</h2>
            <p className="text-2xl font-bold text-gray-700">不要错过这些精彩的AI竞赛</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredCompetitions.map((competition, index) => {
              const colors = ['red', 'yellow', 'green'];
              const color = colors[index % colors.length];

              return (
                <Link
                  key={competition.id}
                  to="/competitions"
                  className="card-white group hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`tag-${color}`}>
                      <i className="fas fa-star"></i>
                      推荐
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-black group-hover:text-gray-700 transition-colors line-clamp-2">
                    {competition.title}
                  </h3>
                  <p className="text-gray-700 font-semibold mb-4 line-clamp-2">
                    {competition.description}
                  </p>
                  <p className={`tag-${color} inline-flex items-center`}>
                    <i className="fas fa-clock mr-1"></i>
                    截止：{formatDate(competition.registration_deadline)}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/competitions" className="btn-primary">
              <i className="fas fa-trophy"></i>
              查看所有赛事
            </Link>
          </div>
        </section>
      )}

      {/* 统计数据 - Minerva风格 */}
      {stats && (
        <section className="mb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card bg-gradient-to-br from-[#FFD93D] to-[#FF9F66] border-black">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 text-black">社群数据</h2>
                <p className="text-2xl font-bold text-gray-800">我们一起成长的足迹</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="stat-box bg-white">
                  <div className="badge-circle mx-auto mb-4 bg-[#FF6B6B]">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="text-5xl font-black mb-2 text-black">{stats.member_count || 0}+</div>
                  <div className="text-lg font-bold text-gray-700">社群成员</div>
                </div>

                <div className="stat-box bg-white">
                  <div className="badge-circle mx-auto mb-4 bg-[#FF9F66]">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <div className="text-5xl font-black mb-2 text-black">{stats.project_count || 0}+</div>
                  <div className="text-lg font-bold text-gray-700">协作项目</div>
                </div>

                <div className="stat-box bg-white">
                  <div className="badge-circle mx-auto mb-4 bg-[#FFD93D]">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="text-5xl font-black mb-2 text-black">{stats.activity_count || 0}+</div>
                  <div className="text-lg font-bold text-gray-700">举办活动</div>
                </div>

                <div className="stat-box bg-white">
                  <div className="badge-circle mx-auto mb-4 bg-[#6BCF7F]">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="text-5xl font-black mb-2 text-black">{stats.resource_count || 0}+</div>
                  <div className="text-lg font-bold text-gray-700">学习资源</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Minerva风格 */}
      <section className="mb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-black text-white text-center relative overflow-hidden">
            {/* 装饰性圆圈 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD93D] rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF6B6B] rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"></div>

            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-6">准备好开始你的AI之旅了吗？</h2>
              <p className="text-2xl mb-10 font-bold text-gray-300">
                加入成都OPC中心，与志同道合的伙伴一起探索AI的无限可能
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/about" className="btn-primary bg-white text-black hover:bg-gray-100">
                  <i className="fas fa-rocket"></i>
                  立即加入
                </Link>
                <Link to="/past-activities" className="btn-secondary border-white text-white hover:bg-white hover:text-black">
                  <i className="fas fa-images"></i>
                  查看往期活动
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
