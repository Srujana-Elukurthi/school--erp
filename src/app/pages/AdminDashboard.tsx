import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { TopNavbar } from '../components/TopNavbar';
import { QuickActionCard } from '../components/QuickActionCard';
import { AlertCard } from '../components/AlertCard';
import { ActivityFeed } from '../components/ActivityFeed';
import { AIInsightCard } from '../components/AIInsightCard';
import {
  LayoutDashboard, Users, UserCheck, ClipboardList,
  Calendar, BarChart3, FileText, Bell, Settings,
  TrendingUp, AlertCircle, Award, UserPlus, Megaphone, CalendarPlus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { dashboardService } from '../../services/dashboardService';
import { useAuth } from '../context/AuthContext';

export function AdminDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const responseData = await dashboardService.getAdminDashboard();
        setData(responseData);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={20} />, label: 'Students', path: '/admin/students' },
    { icon: <Users size={20} />, label: 'Teachers', path: '/admin/teachers' },
    { icon: <UserCheck size={20} />, label: 'Attendance', path: '/admin/attendance' },
    { icon: <ClipboardList size={20} />, label: 'Assignments', path: '/admin/assignments' },
    { icon: <Calendar size={20} />, label: 'Timetable', path: '/admin/timetable' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <FileText size={20} />, label: 'Reports', path: '/admin/reports' },
    { icon: <Bell size={20} />, label: 'Notifications', path: '/admin/notifications' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' }
  ];

  const attendanceData = [
    { name: 'Mon', value: 95 },
    { name: 'Tue', value: 92 },
    { name: 'Wed', value: 88 },
    { name: 'Thu', value: 94 },
    { name: 'Fri', value: 90 }
  ];

  const performanceData = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 88 }
  ];

  const alerts = [
    { message: 'Class 10A attendance below 85% this week', severity: 'warning' },
    { message: '15 pending assignment reviews', severity: 'info' },
    { message: '3 students showing declining performance', severity: 'warning' }
  ];

  const aiInsights = [
    { message: 'Overall school performance improved by 8% this month', trend: 'up' as const },
    { message: 'Mathematics department needs additional support resources', trend: 'down' as const },
    { message: 'Teacher attendance rate is stable at 96%', trend: 'neutral' as const }
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <Sidebar items={sidebarItems} role="Admin" />
      <TopNavbar userName={`${user?.firstName} ${user?.lastName}`} role="Admin" />

      <div className="ml-64 mt-16 flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.firstName}</p>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <h3 className="text-base mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickActionCard icon={<UserPlus size={24} />} title="Add Student" />
            <QuickActionCard icon={<UserPlus size={24} />} title="Add Teacher" />
            <QuickActionCard icon={<CalendarPlus size={24} />} title="Create Timetable" />
            <QuickActionCard icon={<Megaphone size={24} />} title="Send Announcement" />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Users size={24} />}
            label="Total Students"
            value={data?.stats?.totalStudents || 0}
            color="blue"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Total Teachers"
            value={data?.stats?.totalTeachers || 0}
            color="green"
          />
          <StatCard
            icon={<UserCheck size={24} />}
            label="Today's Attendance"
            value={`${data?.stats?.attendancePercentage || 0}%`}
            color="purple"
          />
          <StatCard
            icon={<Award size={24} />}
            label="Total Classes"
            value={data?.stats?.totalClasses || 0}
            color="orange"
          />
        </div>

        {/* AI Insights */}
        <div className="mb-6">
          <AIInsightCard title="AI Analytics & Insights" insights={aiInsights} />
        </div>

        {/* Alerts Section */}
        <div className="mb-6">
          <h3 className="text-base mb-3">System Alerts</h3>
          <div className="grid gap-3">
            {alerts.map((alert, i) => (
              <AlertCard key={i} type={alert.severity as any} message={alert.message} action="View Details" />
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card className="shadow-md">
            <h3 className="text-base mb-4">Weekly Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="shadow-md">
            <h3 className="text-base mb-4">Overall Performance Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base">Recent Activities</h3>
            <button className="text-xs text-blue-600 hover:underline">View All</button>
          </div>
          <ActivityFeed activities={data?.activities || []} />
        </Card>
      </div>
    </div>
  );
}
