export default function About() {
  return (
    <div className="px-4">
      {/* 页面标题 */}
      <div className="text-center mb-16">
        <div className="text-sm uppercase tracking-[4px] font-bold text-gray-500 mb-4">
          ABOUT US
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          关于我们
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          成都OPC中心 · 探索AI的无限可能
        </p>
      </div>

      {/* 社群介绍 */}
      <section className="mb-20">
        <div className="card max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl font-extrabold mb-4">我们是谁</h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              成都OPC中心是一个专注于<strong className="text-gray-900">AI技能学习、资讯分享和活动组织</strong>的社群。
              我们致力于为成都及周边地区的AI爱好者提供一个学习、交流和成长的平台。
            </p>
            <p>
              在这里，你可以：
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                <span><strong>学习AI技能</strong> - 从零基础到进阶，系统化的学习路径</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                <span><strong>获取AI资讯</strong> - 最新的AI行业动态和技术趋势</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                <span><strong>参与活动</strong> - 线上线下的学习活动和项目协作</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                <span><strong>组队参赛</strong> - 与志同道合的伙伴一起参加AI竞赛</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 三条进阶航道详解 */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">三条进阶航道</h2>
          <p className="text-xl text-gray-600">清晰的成长路径，陪伴你的每一步</p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* 探索者号 */}
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="text-7xl flex-shrink-0">🚢</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">探索者号</h3>
                <p className="text-gray-500 mb-4">适合零基础的AI新手</p>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">学习目标：</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-indigo-500 mr-2 mt-1"></i>
                        <span>了解AI的基本概念和应用场景</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-indigo-500 mr-2 mt-1"></i>
                        <span>掌握常用AI工具的使用方法（ChatGPT、Midjourney等）</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-indigo-500 mr-2 mt-1"></i>
                        <span>完成第一个AI小项目</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">推荐活动：</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">新手入门工作坊</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">AI工具体验会</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">每周学习打卡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 生产者号 */}
          <div className="card bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex items-start gap-6">
              <div className="text-7xl flex-shrink-0">🛳️</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">生产者号</h3>
                <p className="text-gray-500 mb-4">适合有一定基础，想要深入实践的学习者</p>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">学习目标：</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-purple-500 mr-2 mt-1"></i>
                        <span>独立完成AI项目开发</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-purple-500 mr-2 mt-1"></i>
                        <span>参与团队协作和项目管理</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-purple-500 mr-2 mt-1"></i>
                        <span>参加AI竞赛并取得成绩</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-purple-500 mr-2 mt-1"></i>
                        <span>输出学习笔记和项目总结</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">推荐活动：</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">项目实战营</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">AI竞赛组队</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">技术分享会</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 领航员号 */}
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="text-7xl flex-shrink-0">🚀</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">领航员号</h3>
                <p className="text-gray-500 mb-4">适合有丰富经验，愿意帮助他人成长的资深成员</p>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">学习目标：</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-pink-500 mr-2 mt-1"></i>
                        <span>组织和主持社群活动</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-pink-500 mr-2 mt-1"></i>
                        <span>指导新手成员学习成长</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-pink-500 mr-2 mt-1"></i>
                        <span>输出高质量的教程和内容</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-arrow-right text-pink-500 mr-2 mt-1"></i>
                        <span>推动社群的持续发展</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">推荐活动：</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">活动组织者</span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">导师计划</span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">内容创作</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 四大角色 */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">四大角色</h2>
          <p className="text-xl text-gray-600">找到你在社群中的定位</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* 氛围组 */}
          <div className="card group hover:scale-105 transition-transform">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold mb-2">氛围组</h3>
              <p className="text-sm text-gray-500">社群的活力源泉</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              负责活跃社群氛围，组织线上线下活动，让每个成员都能感受到温暖和归属感。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">活动策划</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">氛围营造</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">成员关怀</span>
            </div>
          </div>

          {/* 行动派 */}
          <div className="card group hover:scale-105 transition-transform">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="text-2xl font-bold mb-2">行动派</h3>
              <p className="text-sm text-gray-500">实践的先锋</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              积极参与项目实践，勇于尝试新技术，用行动推动社群的技术进步。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">项目实战</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">技术探索</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">快速迭代</span>
            </div>
          </div>

          {/* 记录官 */}
          <div className="card group hover:scale-105 transition-transform">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">📝</div>
              <h3 className="text-2xl font-bold mb-2">记录官</h3>
              <p className="text-sm text-gray-500">知识的传承者</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              记录社群的成长历程，整理学习资料，让知识得以沉淀和传承。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">内容创作</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">知识整理</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">活动记录</span>
            </div>
          </div>

          {/* 参谋官 */}
          <div className="card group hover:scale-105 transition-transform">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="text-2xl font-bold mb-2">参谋官</h3>
              <p className="text-sm text-gray-500">智慧的提供者</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              提供专业建议和技术指导，帮助成员解决问题，推动社群的战略发展。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">技术指导</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">战略规划</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">问题解答</span>
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="mb-20">
        <div className="card max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
          <h2 className="text-3xl font-extrabold mb-4">加入我们</h2>
          <p className="text-xl mb-8 opacity-90">
            扫描二维码或添加微信，开始你的AI学习之旅
          </p>
          <div className="bg-white rounded-3xl p-8 inline-block">
            <div className="w-48 h-48 bg-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-400">
                <i className="fas fa-qrcode text-6xl mb-2"></i>
                <p className="text-sm">微信二维码</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-lg opacity-90">
            <i className="fab fa-weixin mr-2"></i>
            微信号：chengdu_opc
          </p>
        </div>
      </section>
    </div>
  );
}
