import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAdminDashboard = catchAsync(async (req: AuthRequest, res: Response) => {
  // Aggregate queries for performance
  const [totalStudents, totalTeachers, totalClasses, todayAttendance] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.user.count({ where: { role: 'TEACHER' } }),
    prisma.class.count(),
    prisma.attendance.findMany({
      where: {
        date: new Date(new Date().setHours(0, 0, 0, 0)) // Today
      }
    })
  ]);

  const presentCount = todayAttendance.filter((a: any) => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePercentage = todayAttendance.length > 0 
    ? Math.round((presentCount / todayAttendance.length) * 100) 
    : 0;

  const stats = {
    totalStudents,
    totalTeachers,
    totalClasses,
    attendancePercentage,
  };

  const activities = [
    { id: 1, text: 'System update completed', time: '2 hours ago' },
    { id: 2, text: 'New student enrolled', time: '5 hours ago' }
  ];

  res.status(200).json(ApiResponse.success({ stats, activities }, 'Admin dashboard data fetched successfully'));
});

export const getTeacherDashboard = catchAsync(async (req: AuthRequest, res: Response) => {
  const teacherId = req.user?.userId;

  const teacher = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
    include: { assignedClass: { include: { _count: { select: { students: true } } } } }
  });

  const studentsCount = teacher?.assignedClass?._count.students || 0;

  const stats = {
    myStudents: studentsCount,
    upcomingClasses: 3,
    pendingAssignments: 5,
  };

  const alerts = [
    { id: 1, text: 'Submit mid-term grades by Friday' }
  ];

  res.status(200).json(ApiResponse.success({ stats, alerts }, 'Teacher dashboard data fetched successfully'));
});

export const getStudentDashboard = catchAsync(async (req: AuthRequest, res: Response) => {
  const studentId = req.user?.userId;

  const [attendanceRecords, profile] = await Promise.all([
    prisma.attendance.findMany({ where: { userId: studentId } }),
    prisma.studentProfile.findUnique({ where: { userId: studentId }, include: { class: true } })
  ]);

  const presentCount = attendanceRecords.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePercentage = attendanceRecords.length > 0
    ? Math.round((presentCount / attendanceRecords.length) * 100)
    : 0;

  const stats = {
    attendancePercentage,
    overallGrade: 'A-',
    pendingAssignments: 2,
  };

  res.status(200).json(ApiResponse.success({ stats, classInfo: profile?.class }, 'Student dashboard data fetched successfully'));
});

export const getParentDashboard = catchAsync(async (req: AuthRequest, res: Response) => {
  // In a real application, you would find the parent's linked students.
  // For Phase 2, we are mocking the dashboard stats for the Parent UI.
  
  const stats = {
    attendance: '92%',
    avgPerformance: '85%',
    completedAssignments: '28/30',
    daysPresent: '88/95'
  };

  const childInfo = {
    name: 'John Smith',
    class: '10A',
    rollNo: '2024',
    overallGrade: 'A-'
  };

  const alerts = [
    { id: 1, type: 'warning', message: 'Attendance below 90% this week - Please monitor' },
    { id: 2, type: 'info', message: 'Parent-teacher meeting scheduled on May 20' }
  ];

  res.status(200).json(ApiResponse.success({ stats, childInfo, alerts }, 'Parent dashboard data fetched successfully'));
});
