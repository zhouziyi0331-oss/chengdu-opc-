import { useState } from 'react';
import { useAdminStore } from '../../store/auth';
import ProjectsManager from './ProjectsManager';
import MembersManager from './MembersManager';
import TeamsManager from './TeamsManager';
import EventsManager from './EventsManager';
import AccessCodesManager from './AccessCodesManager';
import CommunityInfoManager from './CommunityInfoManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const { adminLogout, adminUsername } = useAdminStore();

  const tabs = [
    { id: 'projects', label: '项目管理' },
    { id: 'members', label: '成员管理' },
    { id: 'teams', label: '团队管理' },
    { id: 'events', label: '活动管理' },
    { id: 'codes', label: '访问码管理' },
    { id: 'info', label: '社群信息' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">管理后台</h1>
              <span className="ml-4 text-gray-500">欢迎, {adminUsername}</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={adminLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'members' && <MembersManager />}
          {activeTab === 'teams' && <TeamsManager />}
          {activeTab === 'events' && <EventsManager />}
          {activeTab === 'codes' && <AccessCodesManager />}
          {activeTab === 'info' && <CommunityInfoManager />}
        </div>
      </div>
    </div>
  );
}
