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
      communication: "leftMessage1",
      insurance: "approvedAuthorization",
      clearance: "pendingClearance"
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
      communication: "leftMessage1",
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
      communication: "live",
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
  {
    referralNumber: "A4YA8F",
    dateReceived: "22/06/2022 15:46",
    dateUpdated: "17/06/2024 15:09",
    fromOrganization: "Tricare",
    fromProvider: "Unspecified",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384.0",
    name: "Cynthia Rogers",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "trigger finger, unspecified",
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
    countsForRtaRatio: "N",
    lrAppointmentScheduled: "N",
    attachments: "N",
    costs: 5000.0,
    facility: 91,
    date: "22/06/2022 15:46"
  },
  {
    referralNumber: "AHGUFY",
    dateReceived: "17/06/2024 14:22",
    dateUpdated: "17/06/2024 14:22",
    fromOrganization: "Full Spectrum ER",
    fromProvider: "Unspecified",
    fromProviderNPI: "1215456789.0",
    toLocation: "Boerne Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384.0",
    name: "Conner Moore",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "Rt index finger fx",
    severity: "Normal",
    status: {
      communication: "",
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
    date: "17/06/2024 14:22"
  },
  {
    referralNumber: "AHGZZ1",
    dateReceived: "17/06/2024 10:47",
    dateUpdated: "17/06/2024 12:12",
    fromOrganization: "Acadian Ambulance",
    fromProvider: "Dr. Randall Curtis",
    fromProviderNPI: "1223567890.0",
    toLocation: "Boerne Location",
    toProvider: "Dr. Richard E. Duey M.D.",
    toProviderNPI: "1235356442.0",
    name: "Cerissa Fernandez",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "Rt clavicle fx",
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
    date: "17/06/2024 10:47"
  },
  {
    referralNumber: "AHG7DZ",
    dateReceived: "17/06/2024 13:30",
    dateUpdated: "17/06/2024 14:22",
    fromOrganization: "Pediatric Consultants of Austin",
    fromProvider: "Dr. Lisa Alford",
    fromProviderNPI: "1234567890.0",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384.0",
    name: "Estrella Gonzalez",
    patientDob: "",
    patientAccountId: "",
    type: "",
    referralTags: "",
    patientTags: "",
    surgery: "congenital foot abnormality, lt foot",
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
    facility: 91,
    date: "17/06/2024 13:30"
  },
  {
    referralNumber: "AHGPS4",
    dateReceived: "17/06/2024 11:13:07",
    dateUpdated: "17/06/2024 12:04:01",
    fromOrganization: "ABCD Pediatrics - Central Scheduling",
    fromProvider: "",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Eric R. Ritchie M.D.",
    toProviderNPI: "1972535169",
    name: "Payton Springer",
    patientDob: "05/19/2012",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Idiopathic scoliosis",
    severity: "Normal",
    status: {
      communication: "leftMessage1",
      insurance: "approvedAuthorization",
      clearance: "pendingClearance"
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
    date: "17/06/2024 11:13:07"
  },
  {
    referralNumber: "AHGLVA",
    dateReceived: "17/06/2024 9:10:33",
    dateUpdated: "17/06/2024 11:53:07",
    fromOrganization: "Aguirre Practice of Pediatrics",
    fromProvider: "",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Eric R. Ritchie M.D.",
    toProviderNPI: "1972535169",
    name: "Haley Torres",
    patientDob: "01/06/2013",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Low back pain",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    facility: 91,
    date: "17/06/2024 9:10:33"
  },
  {
    referralNumber: "AHEXWM",
    dateReceived: "11/06/2024 10:47:29",
    dateUpdated: "17/06/2024 11:50:17",
    fromOrganization: "Jose Reyes, MD",
    fromProvider: "Jose Reyes",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Lucy Ochoa",
    patientDob: "01/04/1970",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Rt shoulder pain",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    facility: 91,
    date: "11/06/2024 10:47:29"
  },
  {
    referralNumber: "AHE3E9",
    dateReceived: "07/06/2024 11:25:18",
    dateUpdated: "17/06/2024 11:48:35",
    fromOrganization: "Kelley Le Noir",
    fromProvider: "Unspecified",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Cora Taylor",
    patientDob: "02/24/1947",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "ganglion cyst, rt hand",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    facility: 91,
    date: "07/06/2024 11:25:18"
  },
  {
    referralNumber: "AHD0ON",
    dateReceived: "04/06/2024 17:52:14",
    dateUpdated: "17/06/2024 11:47:08",
    fromOrganization: "BERTHA GAYTAN MD",
    fromProvider: "Bertha Gaytan",
    fromProviderNPI: "1912162033",
    toLocation: "Boerne Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Antonio Reveles",
    patientDob: "01/17/1962",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Right Hand Deformity/Swelling",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
      insurance: "",
      clearance: ""
    },
    requestedReferralDate: "",
    insuranceProvider: "",
    insuranceAuthCode: "",
    internalNotes: "Pt est. with Dr. Duey, per Dr. Duey schedule with Dr. Nilsson for hand concern",
    countsForRtaRatio: "N",
    lrAppointmentScheduled: "N",
    attachments: "N",
    costs: 5000.0,
    facility: 99,
    date: "04/06/2024 17:52:14"
  },
  {
    referralNumber: "AHBOL0",
    dateReceived: "30/05/2024 17:10:34",
    dateUpdated: "17/06/2024 11:45:21",
    fromOrganization: "Boerne Family Medicine",
    fromProvider: "",
    fromProviderNPI: "",
    toLocation: "Boerne Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Patrick Molloy",
    patientDob: "07/08/1976",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "pain in finger of rt hand",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    date: "30/05/2024 17:10:34"
  },
  {
    referralNumber: "AHALDR",
    dateReceived: "28/05/2024 12:29:05",
    dateUpdated: "17/06/2024 11:43:39",
    fromOrganization: "Tricare",
    fromProvider: "Unspecified",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Krista Elliott",
    patientDob: "05/23/1998",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "CTS, unspecified upper limb",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    date: "28/05/2024 12:29:05"
  },
  {
    referralNumber: "AH6S07",
    dateReceived: "14/05/2024 14:26:06",
    dateUpdated: "17/06/2024 11:42:59",
    fromOrganization: "Alexander Roka, MD",
    fromProvider: "",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Andrew Jacobson",
    patientDob: "06/20/1962",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Lt hand dupuytren's contracture",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    facility: 91,
    date: "14/05/2024 14:26:06"
  },
  {
    referralNumber: "AH2ZLZ",
    dateReceived: "01/05/2024 17:27:24",
    dateUpdated: "17/06/2024 11:38:42",
    fromOrganization: "Aria Dayani, M.D.",
    fromProvider: "Aria Dayani, M.D.",
    fromProviderNPI: "1366672818",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Bree Hendrix-Peart",
    patientDob: "05/11/1972",
    patientAccountId: "",
    type: "Appointment Request",
    referralTags: "",
    patientTags: "",
    surgery: "Lt ankle pain",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    facility: 91,
    date: "01/05/2024 17:27:24"
  },
  {
    referralNumber: "A7F1WM",
    dateReceived: "30/05/2023 15:26:56",
    dateUpdated: "17/06/2024 11:33:24",
    fromOrganization: "Phone",
    fromProvider: "phone Unspecified",
    fromProviderNPI: "",
    toLocation: "Boerne Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Yajaira Garanzuay",
    patientDob: "10/23/1983",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Rt wrist pain",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
      insurance: "",
      clearance: ""
    },
    requestedReferralDate: "",
    insuranceProvider: "",
    insuranceAuthCode: "",
    internalNotes: "Balance of $70.37 sent to collections. Per pt PCP sent referral to other location. Will follow up and clarify where pt needing to be seen.",
    countsForRtaRatio: "N",
    lrAppointmentScheduled: "N",
    attachments: "N",
    costs: 5000.0,
    facility: 99,
    date: "30/05/2023 15:26:56"
  },
  {
    referralNumber: "A9CJ3M",
    dateReceived: "08/08/2023 16:45:25",
    dateUpdated: "17/06/2024 11:16:56",
    fromOrganization: "South Texas Healthcare",
    fromProvider: "Jibrail Kasperkhan",
    fromProviderNPI: "",
    toLocation: "San Antonio Location",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Edna Evans",
    patientDob: "08/17/1950",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Lt hand pain",
    severity: "Normal",
    status: {
      communication: "livw",
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
    date: "08/08/2023 16:45:25"
    },
  {
    referralNumber: "AHGP9Z",
    dateReceived: "17/06/2024 10:57:21",
    dateUpdated: "17/06/2024 10:57:38",
    fromOrganization: "Mercy Wellness Clinic",
    fromProvider: "John Spencer Scott, FNP-C",
    fromProviderNPI: "",
    toLocation: "",
    toProvider: "Dr. Joel B. Nilsson M.D.",
    toProviderNPI: "1487633384",
    name: "Matthew Love",
    patientDob: "11/06/2005",
    patientAccountId: "",
    type: "Fax",
    referralTags: "",
    patientTags: "",
    surgery: "Bilateral trigger finger, small fingers",
    severity: "Normal",
    status: {
      communication: "leftMessage2",
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
    date: "17/06/2024 10:57:21"
  },
];


