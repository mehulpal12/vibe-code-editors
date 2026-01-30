import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
// IMPORT FROM YOUR NEW CUSTOM PATH
import { PrismaClient } from '../prisma/generated/main/client'; 

if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is missing");

  // FIX: Prisma 7 Neon adapter now accepts the connection string directly in many cases
  const adapter = new PrismaNeon({ connectionString });
  
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;