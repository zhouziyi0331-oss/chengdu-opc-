import React, { useState } from 'react';
import { Calendar, Users, MapPin, TrendingUp, Award } from 'lucide-react';

const Activities = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // 即将到来的活动
  const upcomingEvents = [
    {
      id: 1,
      date: '2026-04-19',
      title: '成都社造大会 - AI工作坊与主题分享论坛',
      location: '成都',
      participants: '面向社区工作者、设计师、AI爱好者',
      description: '成都社造大会特别活动，包含AI工作坊实践环节和主题分享论坛，探讨AI在社区营造中的应用',
      highlights: [
        'AI工作坊：动手实践AI工具在社区场景的应用',
        '主题分享论坛：AI赋能社区营造的案例分享',
        '提供现场交流和项目展示机会'
      ],
      tags: ['社造大会', 'AI工作坊', '主题论坛', '社区营造'],
      featured: true
    }
  ];

  // 3月活动回顾
  const marchEvents = [
    {
      date: '2026-03-28',
      title: '成都OPC路演',
      participants: '连接资源、见群友、谢思琪、周美、子颖话多参加',
      description: 'OPC项目路演展示活动',
      highlights: ['OPC项目展示', '资源对接', '社群成员交流'],
      tags: ['OPC', '路演', '项目展示']
    },
    {
      date: '2026-03-22',
      title: '疑难·故事节：AI都能当导演',
      participants: '行舟1000元、群联共创参与',
      description: '0-1小白视频制作手把手教学工作坊',
      highlights: ['视频制作工作坊', '0-1小白教学', '行舟1000元奖励'],
      tags: ['AI视频', '工作坊', '故事节']
    },
    {
      date: '2026-03-13',
      title: 'AI玩法集-体验测评会',
      participants: '周子璇、三条川学长、康宁参与分享',
      description: '主题内容：Prompt、养好猫猫、社群化论、田园、三条川',
      highlights: ['Prompt工程实践', '社群化运营讨论', '多位嘉宾分享'],
      tags: ['AI应用', '测评会']
    },
    {
      date: '2026-03-07',
      title: 'AI Talk 线下工作坊',
      participants: '20余人参与',
      description: '第一次线下活动/典藏版，探讨AI工具实践应用',
      highlights: ['20余人参与', '第一次线下活动', 'AI工具实践分享'],
      tags: ['AI工作坊', '线下活动'],
      featured: true
    }
  ];

  // 其他重要活动
  const otherEvents = [
    {
      date: '2026-03-30',
      title: '培训部内部第一次线上会',
      description: '社群规划讨论会，规划未来活动方向和培训计划',
      tags: ['社群运营', '规划会']
    },
    {
      date: '2026-03-29',
      title: '成都集会论',
      participants: '7人参与',
      description: '线下分享活动/模拟论坛',
      tags: ['线下活动', '论坛']
    },
    {
      date: '2026-03-27',
      title: '换群计划',
      description: '三条川学长组织的社群迁移和重组计划',
      tags: ['社群运营', '组织变革']
    },
    {
      date: '2026-03-20',
      title: '编辑团第一次线下会',
      participants: '7人参与',
      description: '编辑团队线下会议，讨论内容规划',
      tags: ['编辑团队', '线下会议']
    },
    {
      date: '2026-03-16',
      title: '编辑团建立',
      participants: '15人参与',
      description: '子颖发一众人等发起的编辑团队组建活动',
      tags: ['编辑团队', '内容创作']
    },
    {
      date: '2026-03-15',
      title: '社群指挥部成立',
      participants: '10人参与',
      description: '佛佛社群新事，社群组织架构建设会议',
      tags: ['社群建设', '组织架构']
    },
    {
      date: '2026-03-09',
      title: '群下讲文档建立',
      description: '信息副部长、耿爽组织的文档建设活动',
      tags: ['文档建设', '知识管理']
    },
    {
      date: '2026-03-01',
      title: '传信分享会',
      participants: '17人参与',
      description: '张大炼米米、何倩、李宇、阿团、林怀恩等参与的AI技术分享会',
      tags: ['AI分享会', '技术交流']
    }
  ];

  // 3月社群数据
  const marchStats = {
    newMembers: 102,
    totalMembers: 205,
    advancedGroup: 39,
    hqTeam: 10,
    editorTeam: 15,
    income: 1738,
    expense: 1350,
    balance: 388,
    incomeDetails: [
      '群收入：500元（黄凯鹏）+ 50元 + 188元',
      '慕湖故事节工作坊：1000元',
      '群联金收入：150元'
    ],
    expenseDetails: [
      '第一次线下工作坊：500元',
      '故事节工作坊成本及分红：850元'
    ]
  };

  const EventCard = ({ event, featured = false }) => (
    <div className={`card ${featured ? 'border-orange-500' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{event.date}</span>
            {featured && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                重点活动
              </span>
            )}
          </div>
          <h3 className="text-xl font-black mb-2">{event.title}</h3>
          {event.participants && (
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{event.participants}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{event.location}</span>
            </div>
          )}
          <p className="text-gray-700 mb-3">{event.description}</p>
          {event.highlights && event.highlights.length > 0 && (
            <ul className="space-y-1 mb-3">
              {event.highlights.map((highlight, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CompactEventCard = ({ event }) => (
    <div className="card">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-600">{event.date}</span>
      </div>
      <h4 className="text-lg font-black mb-2">{event.title}</h4>
      {event.participants && (
        <p className="text-sm text-gray-600 mb-2">{event.participants}</p>
      )}
      <p className="text-sm text-gray-700 mb-2">{event.description}</p>
      <div className="flex flex-wrap gap-2">
        {event.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">活动回顾</h1>
          <p className="text-xl text-gray-600">
            记录每一次相聚，见证社群成长
          </p>
        </div>

        {/* 标签切换 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 font-bold rounded-full transition-all ${
              activeTab === 'upcoming'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            即将到来
          </button>
          <button
            onClick={() => setActiveTab('march')}
            className={`px-6 py-3 font-bold rounded-full transition-all ${
              activeTab === 'march'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            3月回顾
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 font-bold rounded-full transition-all ${
              activeTab === 'stats'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            社群数据
          </button>
        </div>

        {/* 即将到来的活动 */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} featured={event.featured} />
            ))}
          </div>
        )}

        {/* 3月活动回顾 */}
        {activeTab === 'march' && (
          <div>
            {/* 重点活动 */}
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-6">重点活动</h2>
              <div className="space-y-6">
                {marchEvents.map((event, idx) => (
                  <EventCard key={idx} event={event} featured={event.featured} />
                ))}
              </div>
            </div>

            {/* 其他活动 */}
            <div>
              <h2 className="text-3xl font-black mb-6">其他活动</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherEvents.map((event, idx) => (
                  <CompactEventCard key={idx} event={event} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 社群数据 */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-3xl font-black mb-6">3月社群数据报告</h2>

              {/* 成员数据 */}
              <div className="mb-8">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  成员增长
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-blue-600 mb-1">+{marchStats.newMembers}</div>
                    <div className="text-sm text-gray-600">新增成员</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-green-600 mb-1">{marchStats.totalMembers}</div>
                    <div className="text-sm text-gray-600">总成员数</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-purple-600 mb-1">{marchStats.advancedGroup}</div>
                    <div className="text-sm text-gray-600">兴趣进阶群</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-orange-600 mb-1">{marchStats.hqTeam}</div>
                    <div className="text-sm text-gray-600">指挥部</div>
                  </div>
                </div>
              </div>

              {/* 财务数据 */}
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  财务概况
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-green-600 mb-1">¥{marchStats.income}</div>
                    <div className="text-sm text-gray-600">总收入</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-red-600 mb-1">¥{marchStats.expense}</div>
                    <div className="text-sm text-gray-600">总支出</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-2xl border-4 border-black">
                    <div className="text-3xl font-black text-blue-600 mb-1">¥{marchStats.balance}</div>
                    <div className="text-sm text-gray-600">结余</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border-4 border-black">
                    <h4 className="font-black mb-2">收入明细</h4>
                    <ul className="space-y-1">
                      {marchStats.incomeDetails.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border-4 border-black">
                    <h4 className="font-black mb-2">支出明细</h4>
                    <ul className="space-y-1">
                      {marchStats.expenseDetails.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
