import { PrismaClient } from '../generated/prisma/client';
import { logger } from './logging';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

type LogEvent = {
  timestamp: Date;
  message: string;
  target: string;
};

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on('error', (e: LogEvent) => {
  logger.error(e);
});

prisma.$on('warn', (e: LogEvent) => {
  logger.warn(e);
});

prisma.$on('info', (e: LogEvent) => {
  logger.info(e);
});

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({});

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
