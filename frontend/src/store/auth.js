import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('access_token'),
  memberName: localStorage.getItem('member_name'),
  token: localStorage.getItem('access_token'),

  login: (token, memberName) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('member_name', memberName || '');
    set({ isAuthenticated: true, token, memberName });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('member_name');
    set({ isAuthenticated: false, token: null, memberName: null });
  },
}));

export const useAdminStore = create((set) => ({
  isAdmin: !!localStorage.getItem('admin_token'),
  adminUsername: localStorage.getItem('admin_username'),
  adminToken: localStorage.getItem('admin_token'),

  adminLogin: (token, username) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_username', username);
    set({ isAdmin: true, adminToken: token, adminUsername: username });
  },

  adminLogout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    set({ isAdmin: false, adminToken: null, adminUsername: null });
  },
}));
