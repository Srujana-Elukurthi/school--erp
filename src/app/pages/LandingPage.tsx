import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Users, Award, TrendingUp, Bell, Calendar, Megaphone } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const stats = [
    { icon: <Users size={24} />, value: '1200+', label: 'Students' },
    { icon: <Users size={24} />, value: '75+', label: 'Teachers' },
    { icon: <Award size={24} />, value: '98%', label: 'Results' }
  ];

  const notifications = [
    'Mid exams start next Monday',
    'Assignment submissions open',
    'School closed on Friday',
    'Parent meeting this weekend'
  ];

  const events = [
    { name: 'Annual Day', date: 'May 20, 2026' },
    { name: 'Sports Meet', date: 'May 25, 2026' },
    { name: 'Science Fair', date: 'June 5, 2026' }
  ];

  const quickLogins = [
    { role: 'Admin', path: '/admin' },
    { role: 'Teacher', path: '/teacher' },
    { role: 'Student', path: '/student' },
    { role: 'Parent', path: '/parent' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              S
            </div>
            <span className="text-lg">Smart School ERP</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Screen */}
      <div className="pt-20 min-h-screen grid md:grid-cols-2">
        {/* Left Side - Image Background */}
        <div
          className="relative text-white p-12 flex flex-col justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1759092912891-9f52486bb059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-purple-900/90"></div>

          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <TrendingUp size={16} />
              <span className="text-xs">AI Powered Smart School ERP</span>
            </div>

            <h1 className="text-5xl mb-4">Greenwood International School</h1>
            <p className="text-xl mb-3 text-blue-100">Excellence in Education Since 1985</p>
            <p className="text-sm mb-8 text-blue-50/90 leading-relaxed">
              Welcome to Greenwood International School, where innovation meets education.
              We nurture young minds with world-class facilities and dedicated faculty.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex justify-center mb-2 opacity-90">{stat.icon}</div>
                  <div className="text-3xl mb-1">{stat.value}</div>
                  <div className="text-xs text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <h3 className="text-sm mb-3 text-blue-100">Platform Features</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Smart Attendance & Analytics</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm">AI-Powered Performance Predictions</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Automated Timetable Generation</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Real-time Parent Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-md mx-auto w-full space-y-5">
            {/* Login Card */}
            <Card className="shadow-lg">
              <h3 className="text-xl mb-4">Quick Access Portal</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickLogins.map((login, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(login.path)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all group"
                  >
                    <Users size={28} className="mb-2 text-blue-600 mx-auto group-hover:scale-110 transition-transform" />
                    <div className="text-sm">{login.role}</div>
                  </button>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100">
                <Button onClick={() => navigate('/login')} className="w-full">
                  Sign In to Portal
                </Button>
              </div>
            </Card>

            {/* Notifications and Events Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Notifications */}
              <Card className="shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Bell size={18} className="text-blue-600" />
                  <h4 className="text-sm">Alerts</h4>
                </div>
                <div className="space-y-2">
                  {notifications.slice(0, 3).map((notif, idx) => (
                    <div key={idx} className="p-2 bg-blue-50 rounded-lg text-xs text-gray-700 leading-snug">
                      {notif}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Events */}
              <Card className="shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-purple-600" />
                  <h4 className="text-sm">Events</h4>
                </div>
                <div className="space-y-2">
                  {events.map((event, idx) => (
                    <div key={idx} className="pb-2 border-b border-gray-100 last:border-0">
                      <p className="text-xs">{event.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Scrolling Announcement */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white p-4 rounded-xl shadow-lg animate-gradient">
              <div className="flex items-center gap-2 mb-2">
                <Megaphone size={18} />
                <span className="text-sm">Important Announcement</span>
              </div>
              <p className="text-sm">Summer vacation begins June 15th. Final exams scheduled for June 1-10. Have a great break!</p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Award size={24} className="text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Accredited</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <TrendingUp size={24} className="text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">AI Powered</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Users size={24} className="text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Trusted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; 2026 Greenwood International School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
