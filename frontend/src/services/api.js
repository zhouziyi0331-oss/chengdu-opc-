import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 请求拦截器：添加token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 公开API
export const getStats = () => api.get('/stats');
export const getCompetitions = (params) => api.get('/competitions', { params });
export const getCompetitionById = (id) => api.get(`/competitions/${id}`);
export const getPastActivities = () => api.get('/activities/past');
export const getActivityPhotos = (id) => api.get(`/activities/${id}/photos`);
export const getResources = (params) => api.get('/resources', { params });

// 验证码API
export const verifyAccessCode = (code) => api.post('/auth/verify', { code });
export const adminLogin = (username, password) => api.post('/auth/admin', { username, password });

// 受保护API（需要访问码token）
export const getWorks = (params) => api.get('/works', { params });
export const likeWork = (id) => api.post(`/works/${id}/like`);
export const getMembers = (params) => api.get('/members', { params });
export const getUpcomingActivities = () => api.get('/activities/upcoming');
export const getProjects = () => api.get('/projects');

// 管理员API
export const getAccessCodes = () => api.get('/admin/access-codes');
export const createAccessCode = (data) => api.post('/admin/access-codes', data);
export const generateAccessCodes = (data) => api.post('/admin/access-codes/generate', data);
export const deleteAccessCode = (id) => api.delete(`/admin/access-codes/${id}`);

export const getAdminActivities = () => api.get('/admin/activities');
export const createActivity = (data) => api.post('/admin/activities', data);
export const updateActivity = (id, data) => api.put(`/admin/activities/${id}`, data);
export const deleteActivity = (id) => api.delete(`/admin/activities/${id}`);
export const addActivityPhoto = (id, data) => api.post(`/admin/activities/${id}/photos`, data);
export const deleteActivityPhoto = (activityId, photoId) => api.delete(`/admin/activities/${activityId}/photos/${photoId}`);

// 活动管理别名（Events）
export const getEvents = () => api.get('/admin/activities');
export const createEvent = (data) => api.post('/admin/activities', data);
export const updateEvent = (id, data) => api.put(`/admin/activities/${id}`, data);
export const deleteEvent = (id) => api.delete(`/admin/activities/${id}`);

export const getAdminMembers = () => api.get('/admin/members');
export const createMember = (data) => api.post('/admin/members', data);
export const updateMember = (id, data) => api.put(`/admin/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/admin/members/${id}`);

export const getAdminWorks = () => api.get('/admin/works');
export const createWork = (data) => api.post('/admin/works', data);
export const updateWork = (id, data) => api.put(`/admin/works/${id}`, data);
export const deleteWork = (id) => api.delete(`/admin/works/${id}`);

export const getAdminProjects = () => api.get('/admin/projects');
export const createProject = (data) => api.post('/admin/projects', data);
export const updateProject = (id, data) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);

export const getAdminCompetitions = () => api.get('/admin/competitions');
export const createCompetition = (data) => api.post('/admin/competitions', data);
export const updateCompetition = (id, data) => api.put(`/admin/competitions/${id}`, data);
export const deleteCompetition = (id) => api.delete(`/admin/competitions/${id}`);

export const getAdminResources = () => api.get('/admin/resources');
export const createResource = (data) => api.post('/admin/resources', data);
export const updateResource = (id, data) => api.put(`/admin/resources/${id}`, data);
export const deleteResource = (id) => api.delete(`/admin/resources/${id}`);

export const getCommunityInfo = () => api.get('/admin/community-info');
export const updateCommunityInfo = (data) => api.put('/admin/community-info', data);

// 团队相关API（缺失的）
export const getTeams = () => api.get('/teams');
export const getTeamPosts = (teamId) => api.get(`/teams/${teamId}/posts`);
export const createTeam = (data) => api.post('/admin/teams', data);
export const createTeamPost = (teamId, data) => api.post(`/admin/teams/${teamId}/posts`, data);

// AI资讯API（缺失的）
export const getNews = (params) => api.get('/news', { params });

export default api;
