import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TopNavbar } from '../components/TopNavbar';
import { AlertCard } from '../components/AlertCard';
import { AIInsightCard } from '../components/AIInsightCard';
import {
  LayoutDashboard, UserCheck, ClipboardList, Calendar,
  Bell, BookOpen, TrendingUp, Upload, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { dashboardService } from '../../services/dashboardService';
import { useAuth } from '../context/AuthContext';

export function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const responseData = await dashboardService.getStudentDashboard();
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
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/student' },
    { icon: <UserCheck size={20} />, label: 'Attendance', path: '/student/attendance' },
    { icon: <ClipboardList size={20} />, label: 'Assignments', path: '/student/assignments' },
    { icon: <TrendingUp size={20} />, label: 'Performance', path: '/student/performance' },
    { icon: <Calendar size={20} />, label: 'Timetable', path: '/student/timetable' },
    { icon: <Bell size={20} />, label: 'Notifications', path: '/student/notifications' }
  ];

  const subjectPerformance = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 88 },
    { subject: 'Geography', score: 82 }
  ];

  const radarData = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 88 },
    { subject: 'Geography', score: 82 }
  ];

  const assignments = [
    { title: 'Algebra Assignment 3', subject: 'Mathematics', deadline: 'May 18', status: 'pending' },
    { title: 'Essay on Climate Change', subject: 'English', deadline: 'May 20', status: 'submitted' },
    { title: 'Science Project', subject: 'Science', deadline: 'May 22', status: 'pending' }
  ];

  const upcomingTests = [
    { subject: 'Mathematics', date: 'May 20, 2026', topic: 'Trigonometry' },
    { subject: 'Science', date: 'May 25, 2026', topic: 'Physics - Motion' },
    { subject: 'English', date: 'May 28, 2026', topic: 'Literature' }
  ];

  const aiInsights = [
    { message: 'Great progress in Science! Keep up the excellent work', trend: 'up' as const },
    { message: 'English scores need attention - recommend 2hrs extra study/week', trend: 'down' as const },
    { message: 'Math performance improving steadily - predicted grade: A', trend: 'up' as const }
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const className = data?.classInfo?.name ? ` - ${data.classInfo.name}` : '';

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <Sidebar items={sidebarItems} role="Student" />
      <TopNavbar userName={`${user?.firstName} ${user?.lastName}`} role={`Student${className}`} />

      <div className="ml-64 mt-16 flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-1">Student Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.firstName} {user?.lastName}{className}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<UserCheck size={24} />}
            label="Attendance"
            value={`${data?.stats?.attendancePercentage || 0}%`}
            color="green"
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            label="Overall Grade"
            value={data?.stats?.overallGrade || 'N/A'}
            color="blue"
          />
          <StatCard
            icon={<ClipboardList size={24} />}
            label="Pending Tasks"
            value={data?.stats?.pendingAssignments || 0}
            color="orange"
          />
          <StatCard
            icon={<BookOpen size={24} />}
            label="Subjects"
            value="8"
            color="purple"
          />
        </div>

        {/* AI Insights & Alerts */}
        <div className="mb-6">
          <AIInsightCard title="AI Performance Insights" insights={aiInsights} />
        </div>

        {/* Alerts */}
        <div className="mb-6 grid gap-3">
          <AlertCard type="warning" message="Assignment due tomorrow: Algebra Assignment 3" action="Submit Now" />
          <AlertCard type="info" message="Mathematics test on May 20 - Start preparing!" />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card className="shadow-md">
            <h3 className="text-base mb-4">Subject-wise Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="shadow-md">
            <h3 className="text-base mb-4">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Assignments */}
          <Card className="lg:col-span-2 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base">My Assignments</h3>
              <Button size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {assignments.map((assignment, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm mb-1">{assignment.title}</h4>
                      <p className="text-xs text-gray-500">{assignment.subject}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      assignment.status === 'submitted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {assignment.status === 'submitted' ? <CheckCircle size={14} className="inline mr-1" /> : <Clock size={14} className="inline mr-1" />}
                      {assignment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Due: {assignment.deadline}</span>
                    {assignment.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        <Upload size={14} className="mr-1" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Tests */}
          <Card className="shadow-md">
            <h3 className="text-base mb-4">Upcoming Tests</h3>
            <div className="space-y-3">
              {upcomingTests.map((test, idx) => (
                <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <BookOpen size={16} className="text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm">{test.subject}</p>
                      <p className="text-xs text-gray-600 mt-1">{test.topic}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{test.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card className="shadow-md">
          <h3 className="text-base mb-4">This Week's Deadlines</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-orange-600" />
                <div>
                  <p className="text-sm">Algebra Assignment 3</p>
                  <p className="text-xs text-gray-500">Due: Tomorrow</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Submit</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-blue-600" />
                <div>
                  <p className="text-sm">Math Test Preparation</p>
                  <p className="text-xs text-gray-500">May 20, 2026</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Review</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
