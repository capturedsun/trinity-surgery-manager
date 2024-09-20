import { drizzle } from 'drizzle-orm/postgres-js';
import { 
    networkProviders, 
    organizations, 
    patients, 
    patientActivity, 
    users, 
    statuses, 
    surgeryOrders 
} from './schema';

let client: any;

if (typeof window === 'undefined') {
  const postgres = require('postgres');
  const connectionString = process.env.DATABASE_URL;

  client = postgres(connectionString as string, {
    prepare: false,
  });
}

export const db = client ? drizzle(
  client, { 
    schema: { 
      users, 
      patients, 
      patientActivity, 
      organizations, 
      networkProviders, 
      statuses, 
      surgeryOrders 
    } 
  }
) : null;
