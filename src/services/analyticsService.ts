import api from './api';

export const analyticsService = {
  getAttendanceTrends: async () => {
    const response = await api.get('/analytics/attendance');
    return response.data.data;
  }
};
