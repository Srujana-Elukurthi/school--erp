import dotenv from 'dotenv';

// Load environment variables before importing app and other modules
dotenv.config();

import app from './app';
import prisma from './config/prisma';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log('✅ Successfully connected to the database (Supabase PostgreSQL)');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: any) => {
      console.error('Unhandled Rejection:', err);
      // Close server & exit process
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('❌ Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();
