import { Usage } from "./schema"

export const roles: { value: string; label: string }[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "member",
    label: "Member",
  },
  {
    value: "viewer",
    label: "Viewer",
  },
  {
    value: "contributor",
    label: "Contributor",
  },
]

export const statuses: { value: string; label: string; variant: string; type: string }[] = [
  {
    value: "live",
    label: "Scheduled",
    variant: "success",
    type: "communication",
  },
  {
    value: "inactive",
    label: "Inactive",
    variant: "neutral",
    type: "communication",
  },
  {
    value: "archived",
    label: "Archived",
    variant: "warning",
    type: "communication",
  },
  {
    value: "leftMessage1",
    label: "Left Message 1",
    variant: "progress",
    type: "communication",
  },
  {
    value: "leftMessage2",
    label: "Left Message 2",
    variant: "progress",
    type: "communication",
  },
  {
    value: "leftMessage3",
    label: "Left Message 3",
    variant: "progress",
    type: "communication",
  },
  {
    value: "pendingClearance",
    label: "Pending Clearance",
    variant: "warning",
    type: "clearance",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    variant: "error",
    type: "communication",
  },
  {
    value: "reschedule",
    label: "Reschedule",
    variant: "warning",
    type: "communication",
  },
  {
    value: "declinedNoContact",
    label: "Declined - Unable to Reach Patient",
    variant: "error",
    type: "communication",
  },
  {
    value: "declinedDenied",
    label: "Declined - Patient Denied",
    variant: "error",
    type: "communication",
  },
  {
    value: "hold",
    label: "Hold - Patient will Call when Ready to Schedule",
    variant: "neutral",
    type: "communication",
  },
  {
    value: "pendingAuthorization",
    label: "Pending Authorization",
    variant: "warning",
    type: "insurance",
  },
  {
    value: "pendingReferral",
    label: "Pending Referral",
    variant: "neutral",
    type: "insurance",
  },
  {
    value: "approvedAuthorization",
    label: "Approved Authorization",
    variant: "success",
    type: "insurance",
  },
  {
    value: "deniedAuthorization",
    label: "Denied Authorization",
    variant: "error",
    type: "insurance",
  },
  {
    value: "peerReview",
    label: "Peer Review",
    variant: "neutral",
    type: "clearance",
  },
  {
    value: "collectPatientCost",
    label: "Collect Patient Cost",
    variant: "neutral",
    type: "clearance",
  },
  {
    value: "none",
    label: "+ Select",
    variant: "neutral",
    type: "insurance",
  },
  {
    value: "none",
    label: "+ Select",
    variant: "neutral",
    type: "communication",
  },
  {
    value: "none",
    label: "+ Select",
    variant: "neutral",
    type: "clearance",
  },
];

export const actionItems = {
  live: [
    "Confirm appointment details",
    "Prepare patient documentation",
    "Notify surgical team",
    "Prepare surgical room"
  ],
  inactive: [
    "Send follow-up email",
    "Update patient records",
    "Schedule next appointment"
  ],
  archived: [
    "Archive patient records",
    "Notify patient of archival",
    "Update database status"
  ],
  leftMessage1: [
    "Wait for patient response",
    "Send follow-up message if no response",
    "Log communication attempt"
  ],
  leftMessage2: [
    "Wait for patient response",
    "Send follow-up message if no response",
    "Log communication attempt"
  ],
  leftMessage3: [
    "Wait for patient response",
    "Send follow-up message if no response",
    "Log communication attempt"
  ],
  pendingClearance: [
    "Check for required documents",
    "Notify patient of missing items",
    "Schedule clearance appointment"
  ],
  cancelled: [
    "Notify surgical team of cancellation",
    "Update patient records",
    "Contact patient for rescheduling"
  ],
  reschedule: [
    "Contact patient for new date",
    "Update surgical team",
    "Update appointment calendar"
  ],
  declinedNoContact: [
    "Log attempt to contact",
    "Send follow-up email",
    "Notify primary physician"
  ],
  declinedDenied: [
    "Log patient's decision",
    "Update patient records",
    "Notify primary physician"
  ],
  hold: [
    "Log hold status",
    "Notify patient of hold status",
    "Update appointment calendar"
  ],
  pendingAuthorization: [
    "Submit authorization request",
    "Follow up with insurance",
    "Notify patient of status"
  ],
  pendingReferral: [
    "Contact referring physician",
    "Log referral status",
    "Update patient records"
  ],
  approvedAuthorization: [
    "Notify patient of approval",
    "Schedule surgery",
    "Prepare documentation"
  ],
  deniedAuthorization: [
    "Notify patient of denial",
    "Explore alternative options",
    "Update patient records"
  ],
  peerReview: [
    "Submit case for review",
    "Notify patient of review status",
    "Log review details"
  ],
  collectPatientCost: [
    "Send payment reminder",
    "Update billing records",
    "Confirm receipt of payment"
  ],
};

export const surgeries: { value: string; label: string }[] = [
  {
    value: "Hematoma",
    label: "Hematoma",
  },
  {
    value: "Diorama",
    label: "Diorama",
  },
  {
    value: "Gynocoma",
    label: "Gynocoma",
  },
  {
    value: "Myolata",
    label: "Myolata",
  },
  {
    value: "Joint Replacement",
    label: "Joint Replacement",
  },
  {
    value: "Tune Up",
    label: "Tune Up",
  },
  {
    value: "Just a Trim",
    label: "Just a Trim",
  },
]

export const conditions: { value: string; label: string }[] = [
  {
    value: "is-equal-to",
    label: "is equal to",
  },
  {
    value: "is-between",
    label: "is between",
  },
  {
    value: "is-greater-than",
    label: "is greater than",
  },
  {
    value: "is-less-than",
    label: "is less than",
  },
]

export const users: {
  name: string
  initials: string
  email: string
  role: string
}[] = [
  {
    name: "Emma Stone",
    initials: "ES",
    email: "a.stone@gmail.com",
    role: "viewer",
  },
  {
    name: "Alissia McCalister",
    initials: "AM",
    email: "a.stone@gmail.com",
    role: "viewer",
  },
  {
    name: "Emily Luisa Bernacle",
    initials: "EB",
    email: "e.luis.bernacle@gmail.com",
    role: "member",
  },
  {
    name: "Aaron Wave",
    initials: "AW",
    email: "a.flow@acme.com",
    role: "contributor",
  },
  {
    name: "Thomas Palstein",
    initials: "TP",
    email: "t.palstein@acme.com",
    role: "viewer",
  },
  {
    name: "Sarah Johnson",
    initials: "SJ",
    email: "s.johnson@gmail.com",
    role: "admin",
  },
  {
    name: "Megan Katherina Brown",
    initials: "MB",
    email: "m.lovelybrown@gmail.com",
    role: "contributor",
  },
]

export const invitedUsers: {
  initials: string
  email: string
  role: string
  expires: number
}[] = [
  {
    initials: "LP",
    email: "lydia.posh@gmail.com",
    role: "viewer",
    expires: 12,
  },
  {
    initials: "AW",
    email: "awidburg@bluewin.ch",
    role: "viewer",
    expires: 8,
  },
]

export const usage: {
  referralNumber: string;
  dateReceived: string;
  dateUpdated: string;
  fromOrganization: string;
  fromProvider: string;
  fromProviderNPI: string;
  toLocation: string;
  toProvider: string;
  toProviderNPI: string;
  name: string;
  patientDob: string;
  patientAccountId: string;
  type: string;
  referralTags: string;
  patientTags: string;
  surgery: string;
  severity: string;
  status: {
    communication: string;
    insurance: string;
    clearance: string;
  };
  requestedReferralDate: string;
  insuranceProvider: string;
  insuranceAuthCode: string;
  internalNotes: string;
  countsForRtaRatio: string;
  lrAppointmentScheduled: string;
  attachments: string;
  costs: number;
  facility: number;
  date: string;
}[] = [
  {
    referralNumber: "AHGY48",
    dateReceived: "17/06/2024 16:42",
    dateUpdated: "17/06/2024 16:42",
    fromOrganization: "Eileen Ritchie",
    fromProvider: "Eileen Ritchie",
    fromProviderNPI: "",
    toLocation: "Boerne Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384.0",
    name: "Arthur Briseno",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "Right middle finger pain",
    severity: "Normal",
    status: {
      communication: "live",
      insurance: "",
      clearance: ""
    },
    requestedReferralDate: "",
    insuranceProvider: "",
    insuranceAuthCode: "",
    internalNotes: "",
    countsForRtaRatio: "Y",
    lrAppointmentScheduled: "N",
    attachments: "N",
    costs: 5000.0,
    facility: 99,
    date: "17/06/2024 16:42"
  },
  {
    referralNumber: "AHGN31",
    dateReceived: "17/06/2024 09:47",
    dateUpdated: "17/06/2024 16:34",
    fromOrganization: "Northeast Pediatric Associates, P.A.",
    fromProvider: "",
    fromProviderNPI: "1356584544.0",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Eric R. Ritchie M.D.",
    toProviderNPI: "1972535169.0",
    name: "Elliot Rubio",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "hip click",
    severity: "Normal",
    status: {
      communication: "live",
      insurance: "",
      clearance: ""
    },
    requestedReferralDate: "",
    insuranceProvider: "",
    insuranceAuthCode: "",
    internalNotes: "",
    countsForRtaRatio: "Y",
    lrAppointmentScheduled: "N",
    attachments: "N",
    costs: 5000.0,
    facility: 91,
    date: "17/06/2024 09:47"
  },
  {
    referralNumber: "AHGW8D",
    dateReceived: "17/06/2024 15:25",
    dateUpdated: "17/06/2024 15:45",
    fromOrganization: "Richard E. Martinez, M.D.",
    fromProvider: "Richard Martinez",
    fromProviderNPI: "1245322433.0",
    toLocation: "Boerne Location",
    toProvider: "Dr. Richard E. Duey M.D.",
    toProviderNPI: "1235356442.0",
    name: "Maria Villalobos",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "acute medial meniscus tear, lt knee",
    severity: "Normal",
    status: {
      communication: "leftMessage1",
      insurance: "",
      clearance: ""
    },
    requestedReferralDate: "",
    insuranceProvider: "",
    insuranceAuthCode: "",
    internalNotes: "",
    countsForRtaRatio: "N",
    lrAppointmentScheduled: "N",
    attachments: "N",
    costs: 5000.0,
    facility: 99,
    date: "17/06/2024 15:25"
  },
];


