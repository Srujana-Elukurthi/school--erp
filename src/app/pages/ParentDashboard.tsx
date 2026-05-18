import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { TopNavbar } from '../components/TopNavbar';
import { AlertCard } from '../components/AlertCard';
import { AIInsightCard } from '../components/AIInsightCard';
import {
  LayoutDashboard, UserCheck, TrendingUp, Bell,
  FileText, User, BookOpen, Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { dashboardService } from '../../services/dashboardService';
import { analyticsService } from '../../services/analyticsService';
import { useAuth } from '../context/AuthContext';

export function ParentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, analyticsRes] = await Promise.all([
          dashboardService.getParentDashboard(),
          analyticsService.getAttendanceTrends()
        ]);
        
        setData(dashRes);

        // Format analytics data for Recharts
        if (analyticsRes?.labels && analyticsRes?.datasets) {
          const formattedData = analyticsRes.labels.map((label: string, index: number) => {
            return {
              date: label.substring(5), // Keep only MM-DD for x-axis
              present: analyticsRes.datasets[0].data[index],
              absent: analyticsRes.datasets[1].data[index],
              late: analyticsRes.datasets[2].data[index],
            };
          });
          setAttendanceData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch parent dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/parent' },
    { icon: <User size={20} />, label: 'Child Profile', path: '/parent/profile' },
    { icon: <UserCheck size={20} />, label: 'Attendance', path: '/parent/attendance' },
    { icon: <TrendingUp size={20} />, label: 'Performance', path: '/parent/performance' },
    { icon: <FileText size={20} />, label: 'Reports', path: '/parent/reports' },
    { icon: <Bell size={20} />, label: 'Notifications', path: '/parent/notifications' }
  ];

  const subjectScores = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 88 }
  ];

  const recentTests = [
    { subject: 'Mathematics', score: 85, total: 100, date: 'May 10' },
    { subject: 'Science', score: 92, total: 100, date: 'May 12' },
    { subject: 'English', score: 78, total: 100, date: 'May 14' }
  ];

  const aiInsights = [
    { message: 'Strong aptitude in Science subjects - consider STEM programs', trend: 'up' as const },
    { message: 'English requires additional practice - 30min daily reading recommended', trend: 'down' as const },
    { message: 'Overall trajectory suggests A grade achievement by year end', trend: 'up' as const }
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const child = data?.childInfo;

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <Sidebar items={sidebarItems} role="Parent" />
      <TopNavbar userName={`${user?.firstName} ${user?.lastName}`} role="Parent" />

      <div className="ml-64 mt-16 flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-1">Parent Dashboard</h1>
          <p className="text-sm text-gray-500">Monitoring: {child?.name || 'Student'}</p>
        </div>

        {/* Child Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
              {child?.name ? child.name.split(' ').map((n: string) => n[0]).join('') : 'JS'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">{child?.name || 'John Smith'}</h2>
              <div className="flex gap-6 text-sm text-gray-600">
                <span>Class: {child?.class || '10A'}</span>
                <span>Roll No: {child?.rollNo || '2024'}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Overall Grade</p>
              <p className="text-3xl text-blue-600">{child?.overallGrade || 'A-'}</p>
            </div>
          </div>
        </Card>

        {/* Priority Alerts */}
        <div className="mb-6">
          <h3 className="text-base mb-3">Priority Alerts & Reminders</h3>
          <div className="grid gap-3">
            {data?.alerts?.map((alert: any) => (
              <AlertCard key={alert.id} type={alert.type as any} message={alert.message} action="View" />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<UserCheck size={24} />}
            label="Attendance"
            value={data?.stats?.attendance || '0%'}
            color="green"
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            label="Avg Performance"
            value={data?.stats?.avgPerformance || '0%'}
            color="blue"
          />
          <StatCard
            icon={<BookOpen size={24} />}
            label="Completed Assignments"
            value={data?.stats?.completedAssignments || '0/0'}
            color="purple"
          />
          <StatCard
            icon={<Calendar size={24} />}
            label="Days Present"
            value={data?.stats?.daysPresent || '0/0'}
            color="orange"
          />
        </div>

        {/* AI Insights */}
        <div className="mb-6">
          <AIInsightCard title="AI Learning Insights" insights={aiInsights} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card className="shadow-md">
            <h3 className="text-base mb-4">Attendance Trend (30 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} name="Present" />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent" />
                <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} name="Late" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="shadow-md">
            <h3 className="text-base mb-4">Subject Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Test Results */}
          <Card className="lg:col-span-2 shadow-md">
            <h3 className="text-base mb-4">Recent Test Results</h3>
            <div className="space-y-3">
              {recentTests.map((test, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm mb-1">{test.subject}</h4>
                      <p className="text-xs text-gray-500">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl">{test.score}/{test.total}</p>
                      <p className="text-xs text-gray-500">{((test.score / test.total) * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (test.score / test.total) * 100 >= 90 ? 'bg-green-500' :
                        (test.score / test.total) * 100 >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${(test.score / test.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="shadow-md">
            <h3 className="text-base mb-4">Recent Updates</h3>
            <div className="space-y-3">
              {notifications.map((notif, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${
                  notif.type === 'warning' ? 'bg-orange-50' :
                  notif.type === 'event' ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-start gap-2">
                    <Bell size={16} className={`mt-0.5 ${
                      notif.type === 'warning' ? 'text-orange-600' :
                      notif.type === 'event' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <div>
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
