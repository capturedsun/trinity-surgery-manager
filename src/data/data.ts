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

export const statuses: { value: string; label: string; variant: string }[] = [
  {
    value: "live",
    label: "Scheduled",
    variant: "success",
  },
  {
    value: "inactive",
    label: "Inactive",
    variant: "neutral",
  },
  {
    value: "archived",
    label: "Archived",
    variant: "warning",
  },
  {
    value: "leftMessage1",
    label: "Left Message 1",
    variant: "progress",
  },
  {
    value: "leftMessage2",
    label: "Left Message 2",
    variant: "progress",
  },
  {
    value: "leftMessage3",
    label: "Left Message 3",
    variant: "progress",
  },
  {
    value: "pendingClearance",
    label: "Pending Clearance",
    variant: "warning",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    variant: "error",
  },
  {
    value: "reschedule",
    label: "Reschedule",
    variant: "warning",
  },
  {
    value: "declinedNoContact",
    label: "Declined - Unable to Reach Patient",
    variant: "error",
  },
  {
    value: "declinedDenied",
    label: "Declined - Patient Denied",
    variant: "error",
  },
  {
    value: "hold",
    label: "Hold - Patient will Call when Ready to Schedule",
    variant: "neutral",
  },
  {
    value: "pendingAuthorization",
    label: "Pending Authorization",
    variant: "warning",
  },
  {
    value: "pendingReferral",
    label: "Pending Referral",
    variant: "warning",
  },
  {
    value: "approvedAuthorization",
    label: "Approved Authorization",
    variant: "success",
  },
  {
    value: "deniedAuthorization",
    label: "Denied Authorization",
    variant: "error",
  },
  {
    value: "peerReview",
    label: "Peer Review",
    variant: "neutral",
  },
  {
    value: "collectPatientCost",
    label: "Collect Patient Cost",
    variant: "neutral",
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

export const usage: Usage[] = [
  {
    name: "John Doe",
    status: "live",
    costs: 5422.35,
    surgery: "Gynocoma",
    facility: 99,
    date: "23/09/2023 13:00",
  },
  {
    name: "Jane Smith",
    status: "reschedule",
    costs: 6087.11,
    surgery: "Myolata",
    facility: 91,
    date: "22/09/2023 10:45",
  },
  {
    name: "Alejandro Garcia",
    status: "pendingClearance",
    costs: 7234.56,
    surgery: "Joint Replacement",
    facility: 12,
    date: "17/05/2021 08:32",
  },
  {
    name: "Wei Zhang",
    status: "inactive",
    costs: 0,
    surgery: "Diorama",
    facility: 0,
    date: "10/11/2022 15:24",
  },
  {
    name: "Maria Rossi",
    status: "live",
    costs: 8190.77,
    surgery: "Hematoma",
    facility: 8,
    date: "05/06/2023 12:16",
  },
  {
    name: "Nina Müller",
    status: "archived",
    costs: 7609.32,
    surgery: "Just a Trim",
    facility: 20,
    date: "23/01/2022 11:11",
  },
  {
    name: "Liam O'Sullivan",
    status: "leftMessage1",
    costs: 5204.98,
    surgery: "Gynocoma",
    facility: 18,
    date: "14/03/2023 14:45",
  },
  {
    name: "Amir Fleischlin",
    status: "inactive",
    costs: 0,
    surgery: "Tune Up",
    facility: 0,
    date: "12/02/2023 09:12",
  },
  {
    name: "Yuki Tanaka",
    status: "leftMessage2",
    costs: 9874.56,
    surgery: "Hematoma",
    facility: 6,
    date: "19/08/2022 16:03",
  },
  {
    name: "Fatima Al-Farsi",
    status: "leftMessage3",
    costs: 5486.99,
    surgery: "Joint Replacement",
    facility: 12,
    date: "29/11/2021 17:25",
  },
  {
    name: "Olga Ivanova",
    status: "approvedAuthorization",
    costs: 6120.45,
    surgery: "Diorama",
    facility: 9,
    date: "07/12/2023 07:14",
  },
  {
    name: "Pierre Dubois",
    status: "declinedDenied",
    costs: 4834.11,
    surgery: "Tune Up",
    facility: 15,
    date: "28/04/2023 10:45",
  },
  {
    name: "Sara Johansson",
    status: "peerReview",
    costs: 5302.22,
    surgery: "Myolata",
    facility: 97,
    date: "03/10/2022 08:33",
  },
  {
    name: "Ahmed Hassan",
    status: "collectPatientCost",
    costs: 6221.54,
    surgery: "Gynocoma",
    facility: 11,
    date: "22/07/2022 14:16",
  },
  {
    name: "Emily Brown",
    status: "archived",
    costs: 6129.99,
    surgery: "Just a Trim",
    facility: 22,
    date: "18/01/2022 12:45",
  },
  {
    name: "Carlos Sanchez",
    status: "live",
    costs: 4850.33,
    surgery: "Hematoma",
    facility: 13,
    date: "05/06/2021 18:33",
  },
  {
    name: "Hannah Kim",
    status: "live",
    costs: 7902.11,
    surgery: "Joint Replacement",
    facility: 91,
    date: "11/05/2023 11:00",
  },
  {
    name: "David Johnson",
    status: "deniedAuthorization",
    costs: 6789.77,
    surgery: "Diorama",
    facility: 10,
    date: "19/09/2023 17:17",
  },
  {
    name: "Linda Anderson",
    status: "pendingReferral",
    costs: 7434.22,
    surgery: "Myolata",
    facility: 9,
    date: "27/03/2023 14:28",
  },
  {
    name: "Michael Lee",
    status: "archived",
    costs: 7290.01,
    surgery: "Tune Up",
    facility: 12,
    date: "23/11/2022 15:13",
  },
  {
    name: "Sophia Lopez",
    status: "pendingAuthorization",
    costs: 8921.34,
    surgery: "Just a Trim",
    facility: 16,
    date: "08/05/2023 08:56",
  },
  {
    name: "Robert White",
    status: "live",
    costs: 6834.23,
    surgery: "Gynocoma",
    facility: 8,
    date: "29/04/2022 19:27",
  },
  {
    name: "Mia Wang",
    status: "inactive",
    costs: 0,
    surgery: "Diorama",
    facility: 14,
    date: "30/12/2023 13:01",
  },
  {
    name: "James Taylor",
    status: "cancelled",
    costs: 4321.56,
    surgery: "Joint Replacement",
    facility: 5,
    date: "18/06/2021 10:49",
  },
  {
    name: "Victoria Martinez",
    status: "archived",
    costs: 5120.33,
    surgery: "Hematoma",
    facility: 19,
    date: "24/02/2022 14:02",
  },
  {
    name: "William Harris",
    status: "live",
    costs: 9211.42,
    surgery: "Just a Trim",
    facility: 11,
    date: "22/07/2021 12:33",
  },
  {
    name: "Isabella Clark",
    status: "inactive",
    costs: 0,
    surgery: "Myolata",
    facility: 6,
    date: "13/09/2022 16:22",
  },
  {
    name: "Alexander Young",
    status: "live",
    costs: 4534.88,
    surgery: "Gynocoma",
    facility: 17,
    date: "09/10/2023 17:44",
  },
  {
    name: "Grace Patel",
    status: "live",
    costs: 8245.99,
    surgery: "Tune Up",
    facility: 9,
    date: "29/07/2022 11:56",
  },
  {
    name: "Daniel Wilson",
    status: "archived",
    costs: 7890.77,
    surgery: "Joint Replacement",
    facility: 14,
    date: "10/11/2021 15:08",
  },
  {
    name: "Charlotte Thompson",
    status: "live",
    costs: 8911.44,
    surgery: "Hematoma",
    facility: 10,
    date: "06/08/2021 09:17",
  },
  {
    name: "Olivia Anderson",
    status: "inactive",
    costs: 0,
    surgery: "Joint Replacement",
    facility: 12,
    date: "25/05/2022 10:05",
  },
  {
    name: "Henry Brown",
    status: "live",
    costs: 5500.12,
    surgery: "Diorama",
    facility: 15,
    date: "07/01/2023 08:33",
  },
  {
    name: "Ethan Davis",
    status: "live",
    costs: 7200.98,
    surgery: "Tune Up",
    facility: 8,
    date: "21/09/2023 13:00",
  },
  {
    name: "Amelia Wilson",
    status: "live",
    costs: 8321.56,
    surgery: "Myolata",
    facility: 18,
    date: "12/06/2021 11:45",
  },
  {
    name: "Lucas Martin",
    status: "live",
    costs: 4534.99,
    surgery: "Gynocoma",
    facility: 11,
    date: "30/03/2022 14:14",
  },
  {
    name: "Mason Clark",
    status: "live",
    costs: 6890.11,
    surgery: "Just a Trim",
    facility: 7,
    date: "14/05/2023 12:36",
  },
  {
    name: "Emma Robinson",
    status: "live",
    costs: 7990.01,
    surgery: "Hematoma",
    facility: 13,
    date: "18/10/2022 09:25",
  },
  {
    name: "Benjamin Lewis",
    status: "archived",
    costs: 5412.23,
    surgery: "Tune Up",
    facility: 20,
    date: "22/02/2022 15:55",
  },
  {
    name: "Ava Walker",
    status: "live",
    costs: 7123.98,
    surgery: "Diorama",
    facility: 9,
    date: "27/08/2023 18:33",
  },
  {
    name: "Elijah Young",
    status: "live",
    costs: 6445.33,
    surgery: "Joint Replacement",
    facility: 8,
    date: "02/07/2021 17:14",
  },
  {
    name: "Sophia Hall",
    status: "inactive",
    costs: 0,
    surgery: "Hematoma",
    facility: 10,
    date: "15/04/2023 10:45",
  },
  {
    name: "Matthew Harris",
    status: "live",
    costs: 7634.67,
    surgery: "Just a Trim",
    facility: 11,
    date: "06/09/2023 11:23",
  },
  {
    name: "Aiden Thompson",
    status: "archived",
    costs: 4900.88,
    surgery: "Gynocoma",
    facility: 14,
    date: "20/10/2021 16:05",
  },
  {
    name: "Chloe Martinez",
    status: "live",
    costs: 5234.44,
    surgery: "Myolata",
    facility: 17,
    date: "11/11/2023 08:55",
  },
  {
    name: "Oliver Davis",
    status: "inactive",
    costs: 0,
    surgery: "Joint Replacement",
    facility: 12,
    date: "18/08/2022 14:34",
  },
  {
    name: "Emily Clark",
    status: "live",
    costs: 7688.55,
    surgery: "Tune Up",
    facility: 9,
    date: "22/04/2023 12:11",
  },
  {
    name: "Jack Lewis",
    status: "archived",
    costs: 6344.89,
    surgery: "Diorama",
    facility: 19,
    date: "10/02/2021 11:45",
  },
  {
    name: "Lily Walker",
    status: "live",
    costs: 5003.78,
    surgery: "Joint Replacement",
    facility: 8,
    date: "23/07/2022 14:33",
  },
  {
    name: "Jackson Martinez",
    status: "inactive",
    costs: 0,
    surgery: "Hematoma",
    facility: 7,
    date: "07/05/2023 09:27",
  },
  {
    name: "Avery Hall",
    status: "live",
    costs: 8432.45,
    surgery: "Tune Up",
    facility: 11,
    date: "16/03/2022 15:44",
  },
  {
    name: "Logan Harris",
    status: "archived",
    costs: 7120.39,
    surgery: "Just a Trim",
    facility: 21,
    date: "01/01/2022 16:18",
  },
];

