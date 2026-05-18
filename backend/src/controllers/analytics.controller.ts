import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/apiResponse';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAttendanceTrends = catchAsync(async (_req: AuthRequest, res: Response) => {
  // Fetch last 30 days of attendance
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const attendances = await prisma.attendance.findMany({
    where: {
      date: { gte: thirtyDaysAgo }
    },
    orderBy: { date: 'asc' }
  });

  // Group by date to build a chart-ready response
  const trendsMap = new Map<string, { present: number; absent: number; late: number }>();

  attendances.forEach(record => {
    const dateStr = record.date.toISOString().split('T')[0]; // YYYY-MM-DD
    if (!trendsMap.has(dateStr)) {
      trendsMap.set(dateStr, { present: 0, absent: 0, late: 0 });
    }
    const dayStats = trendsMap.get(dateStr)!;
    
    if (record.status === 'PRESENT') dayStats.present++;
    else if (record.status === 'ABSENT') dayStats.absent++;
    else if (record.status === 'LATE') dayStats.late++;
    else if (record.status === 'HALF_DAY') dayStats.present++; // count half day as present for simplicity
  });

  const labels: string[] = [];
  const datasets = {
    present: [] as number[],
    absent: [] as number[],
    late: [] as number[]
  };

  trendsMap.forEach((stats, date) => {
    labels.push(date);
    datasets.present.push(stats.present);
    datasets.absent.push(stats.absent);
    datasets.late.push(stats.late);
  });

  const chartData = {
    labels,
    datasets: [
      { label: 'Present', data: datasets.present },
      { label: 'Absent', data: datasets.absent },
      { label: 'Late', data: datasets.late }
    ]
  };

  res.status(200).json(ApiResponse.success(chartData, 'Attendance trends fetched successfully'));
});
