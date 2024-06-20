import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPatient extends Document {
  patientName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  dateSignedUpForSurgery: Date;
  procedure: {
    procedureName: string;
    cptCode: string;
  };
  equipmentList: string[];
  surgeryStatus: {
    scheduled?: boolean;
    cancelled?: boolean;
    rescheduled?: boolean;
    unableToReach?: boolean;
    hold?: boolean;
    holdReason?: string;
    holdMessageDates?: Date[];
  };
  surgeryDateTime?: Date;
  tasksBar: {
    authorizationFromInsurance?: boolean;
    surgeryScheduled?: boolean;
    clearance: {
      ordered?: boolean;
      inProgress?: boolean;
      done?: boolean;
      documented?: boolean;
    };
    labs?: boolean;
    cardiology?: boolean;
    primaryCareProvider?: boolean;
    protocols?: string[];
    representativesContacted?: boolean;
    ascHospitalPacketsSent?: boolean;
    firstAssist?: string;
  };
  authorizationStatus?: 'pending' | 'pending referral' | 'approved' | 'denied' | 'peer review';
  patientResponsibility: {
    amountDue?: number;
    installments?: number;
    paidInFull?: boolean;
  };
}

const patientSchema: Schema = new Schema({
    patientName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    dateSignedUpForSurgery: { type: Date, required: true },
    procedure: {
      procedureName: { type: String, required: true },
      cptCode: { type: String, required: true },
    },
    equipmentList: [String],
    surgeryStatus: {
      scheduled: Boolean,
      cancelled: Boolean,
      rescheduled: Boolean,
      unableToReach: Boolean,
      hold: { type: Boolean, default: false },
      holdReason: String,
      holdMessageDates: [Date],
    },
    surgeryDateTime: Date,
    tasksBar: {
      authorizationFromInsurance: Boolean,
      surgeryScheduled: Boolean,
      clearance: {
        ordered: Boolean,
        inProgress: Boolean,
        done: Boolean,
        documented: Boolean,
      },
      labs: Boolean,
      cardiology: Boolean,
      primaryCareProvider: Boolean,
      protocols: [String],
      representativesContacted: Boolean,
      ascHospitalPacketsSent: Boolean,
      firstAssist: String,
    },
    authorizationStatus: {
      type: String,
      enum: ['pending', 'pending referral', 'approved', 'denied', 'peer review'],
    },
    patientResponsibility: {
      amountDue: Number,
      installments: Number,
      paidInFull: Boolean,
    },
  });

export default mongoose.model('patients', patientSchema);