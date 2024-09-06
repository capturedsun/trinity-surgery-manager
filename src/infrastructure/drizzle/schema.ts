import { pgTable, text, timestamp, uuid, jsonb, integer } from 'drizzle-orm/pg-core'

// Network Providers Table
export const networkProviders = pgTable('network_providers', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  organizationPracticeName: text('organization_practice_name'),
  networkTags: text('network_tags'),
  hubTags: text('hub_tags'),
  phone: text('phone'),
  fax: text('fax'),
  website: text('website'),
  providers: text('providers'),
  locations: text('locations'),
  referralsReceived: integer('referrals_received'),
  referralsSent: integer('referrals_sent'),
  status: text('status'),
})

// Organizations Table
export const organizations = pgTable('organizations', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  name: text('name'),
  orgCode: text('org_code'),
  phone: integer('phone'), // Changed to integer for consistency
  fax: integer('fax'), // Changed to integer for consistency
  website: text('website'),
  npi: integer('npi'), // Changed to integer for consistency
  locations: jsonb('locations'),
})

// Patient Activity Table
export const patientActivity = pgTable('patient_activity', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  activityType: text('activity_type'),
  activityDetail: text('activity_detail'),
  patientId: integer('patient_id'),
  surgeryOrderId: integer('surgery_order_id'),
})

// Patients Table
export const patients = pgTable('patients', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  account: text('account'),
  firstName: text('first_name'),
  middleName: text('middle_name'),
  lastName: text('last_name'),
  dob: timestamp('dob', { withTimezone: false }), // Use timestamp for date of birth
  personalEmail: text('personal_email'),
  mobilePhone: text('mobile_phone'),
  mainPhone: text('main_phone'),
  homePhone: text('home_phone'),
  workPhone: text('work_phone'),
  orgCode: text('org_code'),
})

// Statuses Table
export const statuses = pgTable('statuses', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  name: text('name'),
  description: text('description'),
  orgCode: text('org_code'),
  category: text('category'),
  nextStatusId: integer('next_status_id'),
  label: text('label'),
  styleVariant: text('style_variant'),
})

// Surgery Orders Table
export const surgeryOrders = pgTable('surgery_orders', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  patientName: text('patient_name'),
  dateOfBirth: text('date_of_birth'), // Consider changing to date type if appropriate
  surgeon: text('surgeon'),
  surgicalProcedure: text('surgical_procedure'),
  lengthOfSurgery: text('length_of_surgery'),
  classification: text('classification'),
  preOpDiagnosis: text('pre_op_diagnosis'),
  anesthesiaType: text('anesthesia_type'),
  preAdmissionTesting: text('pre_admisson_testing'),
  facility: text('facility'),
  postSurgicalDme: text('post_surgical_dme'),
  specialEquipment: text('special_equipment'),
  dateScheduled: text('date_scheduled'),
  insuranceAuth: text('insurance_auth'),
  surgicalAssistant: text('surgical_assistant'),
  txt: text('txt'),
})

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  firstName: text('first_name'),
  lastName: text('last_name'),
  orgCode: text('org_code'),
  role: text('role'),
})