import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TopNavbar } from '../components/TopNavbar';
import { QuickActionCard } from '../components/QuickActionCard';
import { AlertCard } from '../components/AlertCard';
import { AIInsightCard } from '../components/AIInsightCard';
import {
  LayoutDashboard, UserCheck, ClipboardList, Calendar,
  Bell, Upload, Users, CheckCircle, Clock, AlertCircle, BookOpen, TrendingUp, Megaphone
} from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import { useAuth } from '../context/AuthContext';

export function TeacherDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const responseData = await dashboardService.getTeacherDashboard();
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
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/teacher' },
    { icon: <BookOpen size={20} />, label: 'My Classes', path: '/teacher/classes' },
    { icon: <Users size={20} />, label: 'Students', path: '/teacher/students' },
    { icon: <UserCheck size={20} />, label: 'Attendance', path: '/teacher/attendance' },
    { icon: <ClipboardList size={20} />, label: 'Assignments', path: '/teacher/assignments' },
    { icon: <TrendingUp size={20} />, label: 'Performance', path: '/teacher/performance' },
    { icon: <Calendar size={20} />, label: 'Timetable', path: '/teacher/timetable' },
    { icon: <Bell size={20} />, label: 'Notifications', path: '/teacher/notifications' }
  ];

  const classes = [
    { name: 'Class 10A - Mathematics', students: 42, attendance: '95%' },
    { name: 'Class 10B - Mathematics', students: 38, attendance: '88%' },
    { name: 'Class 9A - Mathematics', students: 45, attendance: '92%' }
  ];

  const assignments = [
    { title: 'Algebra Assignment 3', class: '10A', submitted: 38, total: 42, deadline: 'May 18' },
    { title: 'Geometry Problems', class: '10B', submitted: 35, total: 38, deadline: 'May 20' },
    { title: 'Trigonometry Quiz', class: '9A', submitted: 45, total: 45, deadline: 'May 15' }
  ];

  const todaySchedule = [
    { time: '08:00 AM', class: 'Class 10A - Mathematics', room: 'Room 201' },
    { time: '10:00 AM', class: 'Class 10B - Mathematics', room: 'Room 201' },
    { time: '02:00 PM', class: 'Class 9A - Mathematics', room: 'Room 203' }
  ];

  const aiInsights = [
    { message: 'Class 10A showing excellent progress in Algebra', trend: 'up' as const },
    { message: 'Class 10B needs additional support in Geometry', trend: 'down' as const },
    { message: 'Overall assignment submission rate is 92%', trend: 'neutral' as const }
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
      <Sidebar items={sidebarItems} role="Teacher" />
      <TopNavbar userName={`Prof. ${user?.lastName}`} role="Teacher" />

      <div className="ml-64 mt-16 flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-1">Teacher Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.firstName} {user?.lastName}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Users size={24} />}
            label="Total Students"
            value={data?.stats?.myStudents || 0}
            color="blue"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            label="Upcoming Classes"
            value={data?.stats?.upcomingClasses || 0}
            color="green"
          />
          <StatCard
            icon={<ClipboardList size={24} />}
            label="Active Assignments"
            value="8"
            color="purple"
          />
          <StatCard
            icon={<Clock size={24} />}
            label="Pending Reviews"
            value={data?.stats?.pendingAssignments || 0}
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <h3 className="text-base mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickActionCard icon={<UserCheck size={24} />} title="Mark Attendance" />
            <QuickActionCard icon={<Upload size={24} />} title="Upload Assignment" />
            <QuickActionCard icon={<ClipboardList size={24} />} title="Grade Submissions" />
            <QuickActionCard icon={<Megaphone size={24} />} title="Send Announcement" />
          </div>
        </Card>

        {/* Alerts Section */}
        {data?.alerts && data.alerts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base mb-3">Priority Alerts</h3>
            <div className="grid gap-3">
              {data.alerts.map((alert: any) => (
                <AlertCard key={alert.id} type="warning" message={alert.text} action="View" />
              ))}
            </div>
          </div>
        )}

        {/* AI Insights */}
        <div className="mb-6">
          <AIInsightCard title="AI Teaching Insights" insights={aiInsights} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* My Classes */}
          <Card className="shadow-md">
            <h3 className="text-base mb-4">My Classes</h3>
            <div className="space-y-3">
              {classes.map((cls, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm">{cls.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      parseInt(cls.attendance) >= 90 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {cls.attendance}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{cls.students} students</span>
                    <Button size="sm" variant="ghost">View Class</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Schedule */}
          <Card className="shadow-md">
            <h3 className="text-base mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {todaySchedule.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 text-sm min-w-20">{item.time}</div>
                  <div className="flex-1">
                    <p className="text-sm">{item.class}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Assignments */}
        <Card className="shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base">Assignment Status</h3>
            <Button size="sm">Create New</Button>
          </div>
          <div className="space-y-3">
            {assignments.map((assignment, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm mb-1">{assignment.title}</h4>
                    <p className="text-xs text-gray-500">{assignment.class}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Due: {assignment.deadline}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {assignment.submitted}/{assignment.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
