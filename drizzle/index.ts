import { createClient } from "@supabase/supabase-js"
import { drizzle } from "drizzle-orm/supabase";
import { 
    networkProviders, 
    organizations, 
    patients, 
    patientActivity, 
    users, 
    statuses, 
    surgeryOrders 
}   from "./schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const client = createClient({
    url: process.env.DATABASE_URL,
    auth: process.env.SUPABASE_SERVICE_KEY
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
export const luciaAdapter = new DrizzleSQLiteAdapter(db, sessions, users);
