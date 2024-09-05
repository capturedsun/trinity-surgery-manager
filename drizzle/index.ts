
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { 
    networkProviders, 
    organizations, 
    patients, 
    patientActivity, 
    users, 
    statuses, 
    surgeryOrders 
}   from "./schema";

const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString as string, {
    prepare: false
});

export const db = drizzle(
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
);
