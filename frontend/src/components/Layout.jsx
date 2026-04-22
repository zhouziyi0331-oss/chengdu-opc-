import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function Layout({ children }) {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { path: '/', label: '首页', public: true },
    { path: '/about', label: '关于我们', public: true },
    { path: '/competitions', label: '赛事信息', public: true },
    { path: '/activities', label: '活动回顾', public: true },
    { path: '/works', label: '成员作品', public: false },
    { path: '/resources', label: '学习资源', public: true },
    { path: '/members', label: '成员信息', public: false },
    { path: '/events', label: '活动预告', public: false },
  ];

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                ✦ 成都OPC中心
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                  {!item.public && !isAuthenticated && (
                    <span className="ml-1 text-xs">🔒</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  退出登录
                </button>
              ) : null}
              <Link
                to="/admin"
                className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
              >
                管理员
              </Link>
            </div>
          </div>

          {/* 移动端菜单 */}
          <div className="md:hidden pb-4 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  location.pathname === item.path
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
                {!item.public && !isAuthenticated && (
                  <span className="ml-1 text-xs">🔒</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2026 成都OPC中心 — AI技能学习 · 资讯分享 · 活动组织. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              ✦ 探索AI的无限可能 · 与志同道合的伙伴一起成长 ✦
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
