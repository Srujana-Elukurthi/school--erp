import api from './api';

export const dashboardService = {
  getAdminDashboard: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data.data;
  },
  getTeacherDashboard: async () => {
    const response = await api.get('/dashboard/teacher');
    return response.data.data;
  },
  getStudentDashboard: async () => {
    const response = await api.get('/dashboard/student');
    return response.data.data;
  },
  getParentDashboard: async () => {
    const response = await api.get('/dashboard/parent');
    return response.data.data;
  }
};
