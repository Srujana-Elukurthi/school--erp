import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { Card } from '../components/Card';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import {
  LayoutDashboard, UserCheck, ClipboardList, Calendar,
  Bell, Users, TrendingUp, Award, BookOpen
} from 'lucide-react';

export function TeacherClassManagement() {
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
    {
      name: 'Class 10A',
      subject: 'Mathematics',
      students: 42,
      avgScore: 85,
      attendance: '95%',
      pendingAssignments: 4
    },
    {
      name: 'Class 10B',
      subject: 'Mathematics',
      students: 38,
      avgScore: 78,
      attendance: '88%',
      pendingAssignments: 7
    },
    {
      name: 'Class 9A',
      subject: 'Mathematics',
      students: 45,
      avgScore: 92,
      attendance: '92%',
      pendingAssignments: 0
    }
  ];

  const topStudents = [
    { name: 'Emma Wilson', class: '10A', score: 98 },
    { name: 'Michael Chen', class: '10A', score: 96 },
    { name: 'Sophia Rodriguez', class: '9A', score: 95 },
    { name: 'James Johnson', class: '10B', score: 94 }
  ];

  const studentsNeedingHelp = [
    { name: 'Alex Kumar', class: '10B', score: 62, issue: 'Low test scores' },
    { name: 'Sarah Lee', class: '10A', score: 68, issue: 'Missing assignments' },
    { name: 'David Martinez', class: '9A', score: 65, issue: 'Poor attendance' }
  ];

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <Sidebar items={sidebarItems} role="Teacher" />
      <TopNavbar userName="Prof. Sarah Johnson" role="Teacher" />

      <div className="ml-64 mt-16 flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-1">Class Management</h1>
          <p className="text-sm text-gray-500">Manage your classes and students</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<BookOpen size={24} />}
            label="Total Classes"
            value="3"
            color="blue"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Total Students"
            value="125"
            color="green"
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            label="Avg Performance"
            value="85%"
            color="purple"
          />
          <StatCard
            icon={<UserCheck size={24} />}
            label="Avg Attendance"
            value="92%"
            color="orange"
          />
        </div>

        {/* Class Cards */}
        <div className="mb-6">
          <h3 className="text-base mb-4">My Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classes.map((cls, idx) => (
              <Card key={idx} className="shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg mb-1">{cls.name}</h4>
                    <p className="text-sm text-gray-500">{cls.subject}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Students</p>
                    <p className="text-xl">{cls.students}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Avg Score</p>
                    <p className="text-xl">{cls.avgScore}%</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Attendance</span>
                    <span className="text-gray-900">{cls.attendance}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending Reviews</span>
                    <span className="text-orange-600">{cls.pendingAssignments}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Manage Class
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card className="shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-yellow-600" />
              <h3 className="text-base">Top Performing Students</h3>
            </div>
            <div className="space-y-3">
              {topStudents.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-green-600">{student.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Students Needing Help */}
          <Card className="shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-orange-600" />
              <h3 className="text-base">Students Needing Attention</h3>
            </div>
            <div className="space-y-3">
              {studentsNeedingHelp.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-orange-600">{student.score}%</p>
                    <Button size="sm" variant="ghost" className="mt-1 text-xs">
                      Contact
                    </Button>
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
