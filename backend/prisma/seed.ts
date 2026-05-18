import { PrismaClient, Role, AttendanceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data to prevent duplicates on multiple runs
  await prisma.attendance.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Classes
  const class10A = await prisma.class.create({
    data: { name: 'Grade 10', section: 'A' },
  });

  const class10B = await prisma.class.create({
    data: { name: 'Grade 10', section: 'B' },
  });

  // 2. Create Users (Admin, Teachers, Students)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@school.com',
      password: passwordHash,
      role: Role.ADMIN,
      firstName: 'Super',
      lastName: 'Admin',
    },
  });

  const teacher1 = await prisma.user.create({
    data: {
      email: 'teacher1@school.com',
      password: passwordHash,
      role: Role.TEACHER,
      firstName: 'Sarah',
      lastName: 'Connor',
      teacherProfile: {
        create: {
          subjectSpecialty: 'Mathematics',
          classId: class10A.id,
        },
      },
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: 'teacher2@school.com',
      password: passwordHash,
      role: Role.TEACHER,
      firstName: 'John',
      lastName: 'Smith',
      teacherProfile: {
        create: {
          subjectSpecialty: 'Science',
          classId: class10B.id,
        },
      },
    },
  });

  // Create Students for Class 10A
  const students = [];
  for (let i = 1; i <= 5; i++) {
    const student = await prisma.user.create({
      data: {
        email: `student${i}@school.com`,
        password: passwordHash,
        role: Role.STUDENT,
        firstName: `Student${i}`,
        lastName: `Test${i}`,
        studentProfile: {
          create: { classId: class10A.id },
        },
      },
    });
    students.push(student);
  }

  // Create a Parent User
  await prisma.user.create({
    data: {
      email: 'parent1@school.com',
      password: passwordHash,
      role: Role.PARENT,
      firstName: 'Robert',
      lastName: 'Smith',
    },
  });

  // 3. Create Attendance Records for Analytics
  const today = new Date();
  
  // Generate attendance for the last 30 days
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    for (const student of students) {
      // Randomize attendance: mostly present, some absent or late
      const rand = Math.random();
      let status: AttendanceStatus = AttendanceStatus.PRESENT;
      if (rand > 0.9) status = AttendanceStatus.ABSENT;
      else if (rand > 0.8) status = AttendanceStatus.LATE;

      await prisma.attendance.create({
        data: {
          userId: student.id,
          classId: class10A.id,
          date: d,
          status: status,
        },
      });
    }
  }

  console.log('Seeding completed successfully!');
  console.log('--- Test Credentials ---');
  console.log('Admin: admin@school.com / password123');
  console.log('Teacher: teacher1@school.com / password123');
  console.log('Student: student1@school.com / password123');
  console.log('Parent:  parent1@school.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
