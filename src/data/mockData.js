// METRALAB - NAWI Type Evaluation & Test Report Management
// Local Mock Data Store (Metrology & Laboratory Testing Specification)

export const LAB_INFO = {
  name: "National Metrology Test Laboratory",
  code: "NMTL-IND-DELHI",
  division: "Legal Metrology & Type Approval Division",
  accreditation: "NABL ISO/IEC 17025:2017 Accredited",
  accreditationNo: "TC-5842",
  location: "CSIR-NPL Campus, New Delhi - 110012",
  currentUser: {
    id: "USR-2024-001",
    name: "Venu Prasath",
    role: "Test Engineer",
    designation: "Senior Metrology Engineer (Class I/II NAWI)",
    lab: "National Metrology Test Laboratory",
    email: "venu.prasath@nmtl.gov.in",
    badgeId: "NMTL-ENG-8409"
  }
};

export const MOCK_USERS = [
  {
    id: "USR-2024-001",
    name: "Venu Prasath",
    role: "Test Engineer",
    department: "Precision Mass & NAWI Testing Lab",
    email: "venu.prasath@nmtl.gov.in"
  },
  {
    id: "USR-2024-002",
    name: "Dr. Rajesh Kumar",
    role: "Senior Reviewer & Metrologist",
    department: "Legal Metrology Verification Board",
    email: "rajesh.kumar@nmtl.gov.in"
  },
  {
    id: "USR-2024-003",
    name: "Ananya Sharma",
    role: "Test Engineer",
    department: "Environmental Testing Cell",
    email: "ananya.sharma@nmtl.gov.in"
  },
  {
    id: "USR-2024-004",
    name: "Vikramaditya Singh",
    role: "Quality Assurance Manager",
    department: "Standardization & Calibration Wing",
    email: "v.singh@nmtl.gov.in"
  },
  {
    id: "USR-2024-005",
    name: "Priya Nair",
    role: "Laboratory Director",
    department: "Directorate of Metrology",
    email: "priya.nair@nmtl.gov.in"
  }
];

export const MOCK_MANUFACTURERS = [
  { id: "MFG-01", name: "Precision Weighing Instruments Pvt. Ltd.", location: "Pune, Maharashtra" },
  { id: "MFG-02", name: "WeighMaster Instruments India Pvt. Ltd.", location: "Ahmedabad, Gujarat" },
  { id: "MFG-03", name: "AccuScale Technologies Pvt. Ltd.", location: "Bengaluru, Karnataka" },
  { id: "MFG-04", name: "Metra Weighing Systems", location: "Chennai, Tamil Nadu" },
  { id: "MFG-05", name: "Technoscales India Ltd.", location: "Hyderabad, Telangana" },
  { id: "MFG-06", name: "Apex Precision Instruments Pvt. Ltd.", location: "Baddi, Himachal Pradesh" }
];

export const INSTRUMENT_TYPES = [
  "Electronic Platform Weighing Instrument",
  "Analytical Balance",
  "Micro-Balance",
  "Retail Price-Computing Scale",
  "Crane & Load Cell Scale",
  "Weighbridge Indicator",
  "Dual Range Bench Scale",
  "Explosion-Proof Chemical Balance",
  "Counting & Checkweighing Scale",
  "Dynamic Hopper & Tank Scale"
];

export const MOCK_INSTRUMENTS = [
  {
    id: "NMTL-INS-00241",
    model: "PWI-500",
    name: "High Precision Electronic Analytical Balance",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    serialNumber: "PWI500-26-01842",
    accuracyClass: "Class III",
    accuracyClassCode: "III",
    maxCapacity: "500 kg",
    minCapacity: "20 kg",
    scaleInterval_e: "0.1 kg",
    scaleInterval_d: "0.01 kg",
    scaleInterval_n: "5000",
    numberOfRanges: "1",
    instrumentType: "Electronic Platform Weighing Instrument",
    status: "Active",
    lastTestDate: "28 Sep 2026",
    registrationDate: "14 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2025",
    loadCellType: "Strain Gauge Load Cell",
    numberOfLoadCells: "4",
    platformSize: "600 × 600 mm",
    displayType: "Backlit LCD Display",
    displayResolution: "0.1 kg",
    powerSupply: "230 V AC",
    frequency: "50 Hz",
    operatingTemperature: "-10 °C to +40 °C",
    softwareVersion: "v2.4.1",
    hardwareVersion: "HW-03",
    referenceEquipmentId: "NMTL-WT-017",
    calibrationCertificateNo: "CAL-2026-0178",
    calibrationDate: "12 Aug 2026",
    calibrationValidUntil: "11 Aug 2027",
    evidenceFrontDate: "28 Sep 2026",
    evidenceNameplateDate: "28 Sep 2026",
    testSummary: {
      totalEvaluations: 3,
      lastEvaluationDate: "28 Sep 2026",
      previousResult: "PASS",
      currentEvaluation: "Under Review"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00124",
        testDate: "28 Sep 2026",
        evaluationType: "Type Evaluation",
        engineer: "Venu Prasath",
        result: "Under Review",
        reportNo: "NMTL/TR/2026/0124"
      },
      {
        testId: "NAWI-2025-00087",
        testDate: "14 Aug 2025",
        evaluationType: "Type Evaluation",
        engineer: "Dr. Rajesh Kumar",
        result: "PASS",
        reportNo: "NMTL/TR/2025/0087"
      },
      {
        testId: "NAWI-2024-00052",
        testDate: "21 Jul 2024",
        evaluationType: "Initial Pattern Evaluation",
        engineer: "Ananya Sharma",
        result: "PASS",
        reportNo: "NMTL/TR/2024/0052"
      }
    ],
    activities: [
      { id: "ACT-INS-01", time: "10:42", date: "28 Sep 2026", description: "Test case NAWI-2026-00124 created", category: "Audit", user: "Venu Prasath" },
      { id: "ACT-INS-02", time: "10:15", date: "28 Sep 2026", description: "Repeatability test completed", category: "Test", user: "Venu Prasath" },
      { id: "ACT-INS-03", time: "09:30", date: "28 Sep 2026", description: "Eccentricity observation requires review", category: "Test", user: "Dr. Rajesh Kumar" },
      { id: "ACT-INS-04", time: "16:00", date: "27 Sep 2025", description: "Previous annual evaluation completed (PASS)", category: "Evaluation", user: "Dr. Rajesh Kumar" }
    ]
  },
  {
    id: "NMTL-INS-00242",
    model: "WM-1000",
    name: "Heavy Duty Industrial Platform Scale",
    manufacturer: "WeighMaster Instruments India Pvt. Ltd.",
    serialNumber: "WM1000-26-9920X",
    accuracyClass: "Class III",
    accuracyClassCode: "III",
    maxCapacity: "1000 kg",
    minCapacity: "2 kg",
    scaleInterval_e: "100 g",
    scaleInterval_d: "100 g",
    scaleInterval_n: "10000",
    numberOfRanges: "1",
    instrumentType: "Platform Scale",
    status: "Under Evaluation",
    lastTestDate: "28 Sep 2026",
    registrationDate: "28 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2026",
    loadCellType: "Shear Beam Load Cell",
    numberOfLoadCells: "4",
    platformSize: "1200 × 1200 mm",
    displayType: "Industrial Red LED Display",
    displayResolution: "100 g",
    powerSupply: "230 V AC / 12 V Battery",
    frequency: "50 Hz",
    operatingTemperature: "-10 °C to +40 °C",
    softwareVersion: "v1.0.4",
    hardwareVersion: "HW-01",
    referenceEquipmentId: "NMTL-WT-042",
    calibrationCertificateNo: "CAL-2026-0201",
    calibrationDate: "20 Sep 2026",
    calibrationValidUntil: "19 Sep 2027",
    evidenceFrontDate: "28 Sep 2026",
    evidenceNameplateDate: "28 Sep 2026",
    testSummary: {
      totalEvaluations: 1,
      lastEvaluationDate: "25 Sep 2026",
      previousResult: "PENDING",
      currentEvaluation: "Under Evaluation"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00120",
        testDate: "25 Sep 2026",
        evaluationType: "Type Evaluation",
        engineer: "Venu Prasath",
        result: "Attention",
        reportNo: "NMTL/TR/2026/0120"
      }
    ],
    activities: [
      { id: "ACT-INS-05", time: "09:54", date: "28 Sep 2026", description: "New instrument WM-1000 registered", category: "Registry", user: "Venu Prasath" },
      { id: "ACT-INS-06", time: "14:20", date: "25 Sep 2026", description: "Power mains disturbance test flagged voltage drop error", category: "Test", user: "Venu Prasath" }
    ]
  },
  {
    id: "NMTL-INS-00243",
    model: "AS-200",
    name: "Precision Micro-Balance",
    manufacturer: "AccuScale Technologies Pvt. Ltd.",
    serialNumber: "AS200-26-33041",
    accuracyClass: "Class I",
    accuracyClassCode: "I",
    maxCapacity: "220 g",
    minCapacity: "1 mg",
    scaleInterval_e: "0.1 mg",
    scaleInterval_d: "0.01 mg",
    scaleInterval_n: "2200000",
    numberOfRanges: "1",
    instrumentType: "Micro-Balance",
    status: "Under Evaluation",
    lastTestDate: "27 Sep 2026",
    registrationDate: "05 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2026",
    loadCellType: "Electromagnetic Force Restoration",
    numberOfLoadCells: "1",
    platformSize: "80 mm diameter pan",
    displayType: "Color Touch Graphic LCD",
    displayResolution: "0.01 mg",
    powerSupply: "12 V DC external adapter",
    frequency: "50 Hz",
    operatingTemperature: "+15 °C to +30 °C",
    softwareVersion: "v3.1.0",
    hardwareVersion: "HW-04",
    referenceEquipmentId: "NMTL-WT-E1-01",
    calibrationCertificateNo: "CAL-2026-0155",
    calibrationDate: "01 Aug 2026",
    calibrationValidUntil: "31 Jul 2027",
    evidenceFrontDate: "05 Sep 2026",
    evidenceNameplateDate: "05 Sep 2026",
    testSummary: {
      totalEvaluations: 2,
      lastEvaluationDate: "27 Sep 2026",
      previousResult: "PASS",
      currentEvaluation: "In Progress"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00122",
        testDate: "27 Sep 2026",
        evaluationType: "Temperature Influence Test",
        engineer: "Venu Prasath",
        result: "In Progress",
        reportNo: "NMTL/TR/2026/0122"
      },
      {
        testId: "NAWI-2026-00104",
        testDate: "14 Aug 2026",
        evaluationType: "Repeatability & Linearity",
        engineer: "Dr. Rajesh Kumar",
        result: "PASS",
        reportNo: "NMTL/TR/2026/0104"
      }
    ],
    activities: [
      { id: "ACT-INS-07", time: "08:45", date: "28 Sep 2026", description: "Temperature influence test started in Chamber #2", category: "Test", user: "Venu Prasath" },
      { id: "ACT-INS-08", time: "11:00", date: "14 Aug 2026", description: "Initial repeatability test passed with sr = 0.04 mg", category: "Evaluation", user: "Dr. Rajesh Kumar" }
    ]
  },
  {
    id: "NMTL-INS-00244",
    model: "MWB-3000",
    name: "Commercial Retail Price-Computing Scale",
    manufacturer: "Metra Weighing Systems",
    serialNumber: "MWB3000-26-5510",
    accuracyClass: "Class III",
    accuracyClassCode: "III",
    maxCapacity: "30 kg",
    minCapacity: "100 g",
    scaleInterval_e: "5 g",
    scaleInterval_d: "5 g",
    scaleInterval_n: "6000",
    numberOfRanges: "1",
    instrumentType: "Retail Price-Computing Scale",
    status: "Under Evaluation",
    lastTestDate: "28 Sep 2026",
    registrationDate: "18 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2026",
    loadCellType: "Single Point Aluminium Load Cell",
    numberOfLoadCells: "1",
    platformSize: "300 × 400 mm",
    displayType: "Dual Front/Rear VFD Display",
    displayResolution: "5 g",
    powerSupply: "230 V AC",
    frequency: "50 Hz",
    operatingTemperature: "-10 °C to +40 °C",
    softwareVersion: "v1.8.2",
    hardwareVersion: "HW-02",
    referenceEquipmentId: "NMTL-WT-M1-05",
    calibrationCertificateNo: "CAL-2026-0190",
    calibrationDate: "15 Sep 2026",
    calibrationValidUntil: "14 Sep 2027",
    evidenceFrontDate: "18 Sep 2026",
    evidenceNameplateDate: "18 Sep 2026",
    testSummary: {
      totalEvaluations: 1,
      lastEvaluationDate: "28 Sep 2026",
      previousResult: "PENDING",
      currentEvaluation: "Under Review"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00123",
        testDate: "28 Sep 2026",
        evaluationType: "Eccentricity & Repeatability",
        engineer: "Ananya Sharma",
        result: "Under Review",
        reportNo: "NMTL/TR/2026/0123"
      }
    ],
    activities: [
      { id: "ACT-INS-09", time: "10:18", date: "28 Sep 2026", description: "Report NMTL/TR/2026/0123 submitted for review", category: "Report", user: "Ananya Sharma" }
    ]
  },
  {
    id: "NMTL-INS-00245",
    model: "TSI-800",
    name: "Automatic Crane & Load Cell Scale",
    manufacturer: "Technoscales India Ltd.",
    serialNumber: "TSI800-26-1049",
    accuracyClass: "Class III",
    accuracyClassCode: "III",
    maxCapacity: "5000 kg",
    minCapacity: "20 kg",
    scaleInterval_e: "1 kg",
    scaleInterval_d: "1 kg",
    scaleInterval_n: "5000",
    numberOfRanges: "1",
    instrumentType: "Crane Scale",
    status: "Active",
    lastTestDate: "15 Sep 2026",
    registrationDate: "01 Aug 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2025",
    loadCellType: "Tension Link Alloy Steel Load Cell",
    numberOfLoadCells: "1",
    platformSize: "Heavy Duty Swivel Hook Assembly",
    displayType: "High Brightness 3-inch LED",
    displayResolution: "1 kg",
    powerSupply: "Rechargeable 6 V Battery",
    frequency: "50 Hz",
    operatingTemperature: "-20 °C to +50 °C",
    softwareVersion: "v4.0.1",
    hardwareVersion: "HW-05",
    referenceEquipmentId: "NMTL-MASS-5T",
    calibrationCertificateNo: "CAL-2026-0112",
    calibrationDate: "10 Aug 2026",
    calibrationValidUntil: "09 Aug 2027",
    evidenceFrontDate: "01 Aug 2026",
    evidenceNameplateDate: "01 Aug 2026",
    testSummary: {
      totalEvaluations: 2,
      lastEvaluationDate: "15 Sep 2026",
      previousResult: "PASS",
      currentEvaluation: "PASS"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00116",
        testDate: "15 Sep 2026",
        evaluationType: "MPE Verification at 5T",
        engineer: "Venu Prasath",
        result: "PASS",
        reportNo: "NMTL/TR/2026/0116"
      }
    ],
    activities: [
      { id: "ACT-INS-10", time: "16:45", date: "15 Sep 2026", description: "Maximum Permissible Error evaluation passed up to 5000 kg", category: "Evaluation", user: "Venu Prasath" }
    ]
  },
  {
    id: "NMTL-INS-00246",
    model: "API-MAX-50",
    name: "High-Capacity Vehicle Weighbridge Indicator",
    manufacturer: "Apex Precision Instruments Pvt. Ltd.",
    serialNumber: "APIMAX50-26-7721",
    accuracyClass: "Class III",
    accuracyClassCode: "III",
    maxCapacity: "60000 kg",
    minCapacity: "200 kg",
    scaleInterval_e: "10 kg",
    scaleInterval_d: "10 kg",
    scaleInterval_n: "6000",
    numberOfRanges: "1",
    instrumentType: "Weighbridge",
    status: "Under Evaluation",
    lastTestDate: "10 Sep 2026",
    registrationDate: "25 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2026",
    loadCellType: "Double Ended Shear Beam Load Cells",
    numberOfLoadCells: "8",
    platformSize: "18 m × 3 m Pitless Concrete Platform",
    displayType: "Industrial Industrial Graphic LCD",
    displayResolution: "10 kg",
    powerSupply: "230 V AC ±10%",
    frequency: "50 Hz",
    operatingTemperature: "-10 °C to +40 °C",
    softwareVersion: "v1.2.0",
    hardwareVersion: "HW-01",
    referenceEquipmentId: "NMTL-REF-WB-60T",
    calibrationCertificateNo: "CAL-2026-0099",
    calibrationDate: "05 Sep 2026",
    calibrationValidUntil: "04 Sep 2027",
    evidenceFrontDate: "25 Sep 2026",
    evidenceNameplateDate: "25 Sep 2026",
    testSummary: {
      totalEvaluations: 1,
      lastEvaluationDate: "10 Sep 2026",
      previousResult: "ATTENTION",
      currentEvaluation: "Attention Required"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00115",
        testDate: "10 Sep 2026",
        evaluationType: "Tilting & Level Limiting Test",
        engineer: "Venu Prasath",
        result: "Attention",
        reportNo: "NMTL/TR/2026/0115"
      }
    ],
    activities: [
      { id: "ACT-INS-11", time: "14:10", date: "10 Sep 2026", description: "Tilting at 50/1000 exceeded MPE limit on longitudinal axis", category: "Test", user: "Venu Prasath" }
    ]
  },
  {
    id: "NMTL-INS-00247",
    model: "PWI-2000-HD",
    name: "Dual Range Industrial Bench Scale",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    serialNumber: "PWI2000-26-4402",
    accuracyClass: "Class II",
    accuracyClassCode: "II",
    maxCapacity: "15 kg / 30 kg",
    minCapacity: "50 g",
    scaleInterval_e: "0.5 g / 1 g",
    scaleInterval_d: "0.5 g / 1 g",
    scaleInterval_n: "30000",
    numberOfRanges: "2",
    instrumentType: "Bench Scale",
    status: "Active",
    lastTestDate: "22 Sep 2026",
    registrationDate: "10 Aug 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2025",
    loadCellType: "Hermetically Sealed Stainless Load Cell",
    numberOfLoadCells: "1",
    platformSize: "400 × 400 mm",
    displayType: "OLED Dual Range Screen",
    displayResolution: "0.5 g",
    powerSupply: "230 V AC",
    frequency: "50 Hz",
    operatingTemperature: "+5 °C to +40 °C",
    softwareVersion: "v2.0.0",
    hardwareVersion: "HW-02",
    referenceEquipmentId: "NMTL-WT-F2-08",
    calibrationCertificateNo: "CAL-2026-0130",
    calibrationDate: "12 Aug 2026",
    calibrationValidUntil: "11 Aug 2027",
    evidenceFrontDate: "10 Aug 2026",
    evidenceNameplateDate: "10 Aug 2026",
    testSummary: {
      totalEvaluations: 2,
      lastEvaluationDate: "22 Sep 2026",
      previousResult: "PASS",
      currentEvaluation: "Approved"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00118",
        testDate: "22 Sep 2026",
        evaluationType: "Tare & Zero Setting Test",
        engineer: "Venu Prasath",
        result: "PASS",
        reportNo: "NMTL/TR/2026/0118"
      }
    ],
    activities: [
      { id: "ACT-INS-12", time: "11:30", date: "22 Sep 2026", description: "Pattern Approved for Class II commercial weighing", category: "Approval", user: "Priya Nair" }
    ]
  },
  {
    id: "NMTL-INS-00248",
    model: "WM-EX-500",
    name: "Explosion-Proof Chemical Balance",
    manufacturer: "WeighMaster Instruments India Pvt. Ltd.",
    serialNumber: "WMEX500-26-8819",
    accuracyClass: "Class II",
    accuracyClassCode: "II",
    maxCapacity: "6000 g",
    minCapacity: "2.5 g",
    scaleInterval_e: "0.1 g",
    scaleInterval_d: "0.1 g",
    scaleInterval_n: "60000",
    numberOfRanges: "1",
    instrumentType: "Explosion-Proof Chemical Balance",
    status: "Under Evaluation",
    lastTestDate: "24 Sep 2026",
    registrationDate: "20 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2026",
    loadCellType: "Intrinsically Safe Force Restoration Cell",
    numberOfLoadCells: "1",
    platformSize: "200 × 200 mm ATEX Pan",
    displayType: "Intrinsically Safe Backlit LCD",
    displayResolution: "0.1 g",
    powerSupply: "Safe Area Power Supply Unit",
    frequency: "50 Hz",
    operatingTemperature: "+10 °C to +40 °C",
    softwareVersion: "v1.1.2",
    hardwareVersion: "HW-01-EX",
    referenceEquipmentId: "NMTL-WT-F1-02",
    calibrationCertificateNo: "CAL-2026-0182",
    calibrationDate: "18 Sep 2026",
    calibrationValidUntil: "17 Sep 2027",
    evidenceFrontDate: "20 Sep 2026",
    evidenceNameplateDate: "20 Sep 2026",
    testSummary: {
      totalEvaluations: 1,
      lastEvaluationDate: "24 Sep 2026",
      previousResult: "PENDING",
      currentEvaluation: "Under Review"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00119",
        testDate: "24 Sep 2026",
        evaluationType: "Damp Heat Steady State Test",
        engineer: "Ananya Sharma",
        result: "Under Review",
        reportNo: "NMTL/TR/2026/0119"
      }
    ],
    activities: [
      { id: "ACT-INS-13", time: "16:00", date: "24 Sep 2026", description: "Zero deviation observed at 85% RH in Damp Heat Chamber", category: "Test", user: "Ananya Sharma" }
    ]
  },
  {
    id: "NMTL-INS-00249",
    model: "AS-15K",
    name: "Precision Counting & Checkweighing Scale",
    manufacturer: "AccuScale Technologies Pvt. Ltd.",
    serialNumber: "AS15K-26-9012",
    accuracyClass: "Class II",
    accuracyClassCode: "II",
    maxCapacity: "15 kg",
    minCapacity: "5 g",
    scaleInterval_e: "0.2 g",
    scaleInterval_d: "0.2 g",
    scaleInterval_n: "75000",
    numberOfRanges: "1",
    instrumentType: "Electronic Scale",
    status: "Active",
    lastTestDate: "20 Sep 2026",
    registrationDate: "22 Jul 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2025",
    loadCellType: "Precision Strain Gauge Load Cell",
    numberOfLoadCells: "1",
    platformSize: "300 × 300 mm",
    displayType: "Triple LCD Display (Weight, Unit Weight, Pcs)",
    displayResolution: "0.2 g",
    powerSupply: "230 V AC / Internal Battery",
    frequency: "50 Hz",
    operatingTemperature: "+10 °C to +40 °C",
    softwareVersion: "v2.1.0",
    hardwareVersion: "HW-02",
    referenceEquipmentId: "NMTL-WT-F1-09",
    calibrationCertificateNo: "CAL-2026-0091",
    calibrationDate: "25 Jul 2026",
    calibrationValidUntil: "24 Jul 2027",
    evidenceFrontDate: "22 Jul 2026",
    evidenceNameplateDate: "22 Jul 2026",
    testSummary: {
      totalEvaluations: 2,
      lastEvaluationDate: "20 Sep 2026",
      previousResult: "PASS",
      currentEvaluation: "Approved"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00117",
        testDate: "20 Sep 2026",
        evaluationType: "Warm-Up Time Evaluation",
        engineer: "Ananya Sharma",
        result: "PASS",
        reportNo: "NMTL/TR/2026/0117"
      }
    ],
    activities: [
      { id: "ACT-INS-14", time: "12:00", date: "20 Sep 2026", description: "Warm-up period verified at 30 minutes with zero drift within limit", category: "Evaluation", user: "Ananya Sharma" }
    ]
  },
  {
    id: "NMTL-INS-00250",
    model: "MWB-LOG-100",
    name: "Dynamic Hopper & Tank Weighing System",
    manufacturer: "Metra Weighing Systems",
    serialNumber: "MWBLOG-26-3390",
    accuracyClass: "Class III",
    accuracyClassCode: "III",
    maxCapacity: "2000 kg",
    minCapacity: "10 kg",
    scaleInterval_e: "500 g",
    scaleInterval_d: "500 g",
    scaleInterval_n: "4000",
    numberOfRanges: "1",
    instrumentType: "Weighbridge",
    status: "Archived",
    lastTestDate: "26 Sep 2026",
    registrationDate: "26 Sep 2026",
    countryOfManufacture: "India",
    yearOfManufacture: "2024",
    loadCellType: "Compression Button Load Cells",
    numberOfLoadCells: "3",
    platformSize: "1500 mm Hopper Diameter",
    displayType: "DIN Rail Mount Process Indicator",
    displayResolution: "500 g",
    powerSupply: "24 V DC Industrial",
    frequency: "50 Hz",
    operatingTemperature: "-10 °C to +50 °C",
    softwareVersion: "v1.0.0",
    hardwareVersion: "HW-01-IND",
    referenceEquipmentId: "NMTL-WT-M1-12",
    calibrationCertificateNo: "CAL-2026-0015",
    calibrationDate: "10 Jan 2026",
    calibrationValidUntil: "09 Jan 2027",
    evidenceFrontDate: "26 Sep 2026",
    evidenceNameplateDate: "26 Sep 2026",
    testSummary: {
      totalEvaluations: 1,
      lastEvaluationDate: "26 Sep 2026",
      previousResult: "PENDING",
      currentEvaluation: "In Progress"
    },
    testHistory: [
      {
        testId: "NAWI-2026-00121",
        testDate: "26 Sep 2026",
        evaluationType: "Creep & Zero Return Test",
        engineer: "Ananya Sharma",
        result: "In Progress",
        reportNo: "NMTL/TR/2026/0121"
      }
    ],
    activities: [
      { id: "ACT-INS-15", time: "15:00", date: "26 Sep 2026", description: "Creep test started under 2000 kg sustained load", category: "Test", user: "Ananya Sharma" }
    ]
  }
];

export const MOCK_TEST_CASES = [
  {
    id: "NAWI-2026-00124",
    testType: "Type Evaluation Full OIML R76 Compliance",
    instrumentId: "NMTL-INS-00241",
    instrumentModel: "PWI-500",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    engineer: "Venu Prasath",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "28 Sep 2026",
    status: "Under Review",
    progressPercent: 90,
    testsCompleted: 8,
    totalTests: 9,
    standardUsed: "E2 Class Standard Weights (Set NMTL-W-04)",
    environment: "20.2 °C | 54% RH | 101.3 kPa"
  },
  {
    id: "NAWI-2026-00123",
    testType: "Eccentricity & Repeatability Test",
    instrumentId: "NMTL-INS-00244",
    instrumentModel: "MWB-3000",
    manufacturer: "Metra Weighing Systems",
    engineer: "Ananya Sharma",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "28 Sep 2026",
    status: "Under Review",
    progressPercent: 100,
    testsCompleted: 6,
    totalTests: 6,
    standardUsed: "M1 Class Standard Weights",
    environment: "22.5 °C | 60% RH | 100.8 kPa"
  },
  {
    id: "NAWI-2026-00122",
    testType: "Temperature Influence Test (-10°C to +40°C)",
    instrumentId: "NMTL-INS-00243",
    instrumentModel: "AS-200",
    manufacturer: "AccuScale Technologies Pvt. Ltd.",
    engineer: "Venu Prasath",
    reviewer: "Vikramaditya Singh",
    testDate: "27 Sep 2026",
    status: "In Progress",
    progressPercent: 65,
    testsCompleted: 4,
    totalTests: 7,
    standardUsed: "E1 Class Standard Weights",
    environment: "Chamber Variable (-10°C to +40°C)"
  },
  {
    id: "NAWI-2026-00121",
    testType: "Creep & Zero Return Test",
    instrumentId: "NMTL-INS-00250",
    instrumentModel: "MWB-LOG-100",
    manufacturer: "Metra Weighing Systems",
    engineer: "Ananya Sharma",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "26 Sep 2026",
    status: "In Progress",
    progressPercent: 40,
    testsCompleted: 2,
    totalTests: 5,
    standardUsed: "M1 Heavy Load Weights",
    environment: "23.0 °C | 52% RH"
  },
  {
    id: "NAWI-2026-00120",
    testType: "Voltage Variation & Power Mains Disturbances",
    instrumentId: "NMTL-INS-00242",
    instrumentModel: "WM-1000",
    manufacturer: "WeighMaster Instruments India Pvt. Ltd.",
    engineer: "Venu Prasath",
    reviewer: "Vikramaditya Singh",
    testDate: "25 Sep 2026",
    status: "Attention",
    progressPercent: 80,
    testsCompleted: 4,
    totalTests: 5,
    standardUsed: "Programmable AC Power Source & F2 Weights",
    environment: "21.0 °C | 58% RH"
  },
  {
    id: "NAWI-2026-00119",
    testType: "Damp Heat Steady State Test",
    instrumentId: "NMTL-INS-00248",
    instrumentModel: "WM-EX-500",
    manufacturer: "WeighMaster Instruments India Pvt. Ltd.",
    engineer: "Ananya Sharma",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "24 Sep 2026",
    status: "Under Review",
    progressPercent: 100,
    testsCompleted: 5,
    totalTests: 5,
    standardUsed: "F1 Stainless Steel Weights",
    environment: "40.0 °C | 85% RH (Damp Heat Chamber)"
  },
  {
    id: "NAWI-2026-00118",
    testType: "Tare Balancing & Zero Setting Accuracy",
    instrumentId: "NMTL-INS-00247",
    instrumentModel: "PWI-2000-HD",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    engineer: "Venu Prasath",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "22 Sep 2026",
    status: "Completed",
    progressPercent: 100,
    testsCompleted: 6,
    totalTests: 6,
    standardUsed: "F2 Class Weights",
    environment: "20.5 °C | 50% RH"
  },
  {
    id: "NAWI-2026-00117",
    testType: "Warm-Up Time Evaluation",
    instrumentId: "NMTL-INS-00249",
    instrumentModel: "AS-15K",
    manufacturer: "AccuScale Technologies Pvt. Ltd.",
    engineer: "Ananya Sharma",
    reviewer: "Vikramaditya Singh",
    testDate: "20 Sep 2026",
    status: "Completed",
    progressPercent: 100,
    testsCompleted: 4,
    totalTests: 4,
    standardUsed: "F1 Class Weights",
    environment: "21.8 °C | 53% RH"
  },
  {
    id: "NAWI-2026-00116",
    testType: "Maximum Permissible Error (MPE) Verification",
    instrumentId: "NMTL-INS-00245",
    instrumentModel: "TSI-800",
    manufacturer: "Technoscales India Ltd.",
    engineer: "Venu Prasath",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "15 Sep 2026",
    status: "Completed",
    progressPercent: 100,
    testsCompleted: 8,
    totalTests: 8,
    standardUsed: "M1 Heavy Load Test Masses",
    environment: "24.0 °C | 62% RH"
  },
  {
    id: "NAWI-2026-00115",
    testType: "Level Limiting & Tilting Test",
    instrumentId: "NMTL-INS-00246",
    instrumentModel: "API-MAX-50",
    manufacturer: "Apex Precision Instruments Pvt. Ltd.",
    engineer: "Venu Prasath",
    reviewer: "Dr. Rajesh Kumar",
    testDate: "10 Sep 2026",
    status: "Attention",
    progressPercent: 50,
    testsCompleted: 2,
    totalTests: 4,
    standardUsed: "Precision Inclinometer & M1 Masses",
    environment: "23.5 °C | 55% RH"
  }
];

export const MOCK_REPORTS = [
  {
    reportNo: "NMTL/TR/2026/0124",
    testId: "NAWI-2026-00124",
    instrumentModel: "PWI-500",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    evaluationStandard: "OIML R 76-1:2006 / IS 9281",
    issueDate: "28 Sep 2026",
    status: "Under Review",
    signatory: "Dr. Rajesh Kumar",
    resultSummary: "Complies with Class I Maximum Permissible Errors. Hysteresis within tolerances."
  },
  {
    reportNo: "NMTL/TR/2026/0123",
    testId: "NAWI-2026-00123",
    instrumentModel: "MWB-3000",
    manufacturer: "Metra Weighing Systems",
    evaluationStandard: "OIML R 76-1:2006",
    issueDate: "28 Sep 2026",
    status: "Under Review",
    signatory: "Dr. Rajesh Kumar",
    resultSummary: "Eccentricity load shift within ±1.0 e limit at 1/3 Max."
  },
  {
    reportNo: "NMTL/TR/2026/0119",
    testId: "NAWI-2026-00119",
    instrumentModel: "WM-EX-500",
    manufacturer: "WeighMaster Instruments India Pvt. Ltd.",
    evaluationStandard: "OIML R 76-2:2007 (Environmental)",
    issueDate: "24 Sep 2026",
    status: "Under Review",
    signatory: "Vikramaditya Singh",
    resultSummary: "Zero deviation observed at 85% RH; awaiting final temperature coefficient validation."
  },
  {
    reportNo: "NMTL/TR/2026/0118",
    testId: "NAWI-2026-00118",
    instrumentModel: "PWI-2000-HD",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    evaluationStandard: "OIML R 76-1:2006 / Legal Metrology Rules 2011",
    issueDate: "22 Sep 2026",
    status: "Approved",
    signatory: "Priya Nair",
    certificateNo: "NMTL-TAC-2026-089",
    resultSummary: "Pattern Approved for Class II commercial weighing."
  },
  {
    reportNo: "NMTL/TR/2026/0117",
    testId: "NAWI-2026-00117",
    instrumentModel: "AS-15K",
    manufacturer: "AccuScale Technologies Pvt. Ltd.",
    evaluationStandard: "OIML R 76-1:2006",
    issueDate: "20 Sep 2026",
    status: "Approved",
    signatory: "Priya Nair",
    certificateNo: "NMTL-TAC-2026-084",
    resultSummary: "Warm-up period verified at 30 minutes with zero drift within limit."
  },
  {
    reportNo: "NMTL/TR/2026/0116",
    testId: "NAWI-2026-00116",
    instrumentModel: "TSI-800",
    manufacturer: "Technoscales India Ltd.",
    evaluationStandard: "OIML R 76-1:2006 / IS 9281 (Part 3)",
    issueDate: "15 Sep 2026",
    status: "Approved",
    signatory: "Dr. Rajesh Kumar",
    certificateNo: "NMTL-TAC-2026-078",
    resultSummary: "Heavy load linearity verified up to 5000 kg."
  },
  {
    reportNo: "NMTL/TR/2026/0115",
    testId: "NAWI-2026-00115",
    instrumentModel: "API-MAX-50",
    manufacturer: "Apex Precision Instruments Pvt. Ltd.",
    evaluationStandard: "OIML R 76-1 Clause 3.9",
    issueDate: "10 Sep 2026",
    status: "Attention Required",
    signatory: "Vikramaditya Singh",
    resultSummary: "Tilting at 50/1000 exceeded MPE limit on longitudinal axis."
  },
  {
    reportNo: "NMTL/TR/2026/0112",
    testId: "NAWI-2026-00112",
    instrumentModel: "PWI-500",
    manufacturer: "Precision Weighing Instruments Pvt. Ltd.",
    evaluationStandard: "OIML R 76-2 Clause 4.2",
    issueDate: "02 Sep 2026",
    status: "Approved",
    signatory: "Dr. Rajesh Kumar",
    certificateNo: "NMTL-TAC-2026-065",
    resultSummary: "Electrostatic discharge immunity test passed up to 8 kV."
  },
  {
    reportNo: "NMTL/TR/2026/0109",
    testId: "NAWI-2026-00109",
    instrumentModel: "WM-1000",
    manufacturer: "WeighMaster Instruments India Pvt. Ltd.",
    evaluationStandard: "OIML R 76-1 Clause 3.5",
    issueDate: "28 Aug 2026",
    status: "Approved",
    signatory: "Priya Nair",
    certificateNo: "NMTL-TAC-2026-059",
    resultSummary: "Metrological features verified compliant with Indian Legal Metrology Rules."
  },
  {
    reportNo: "NMTL/TR/2026/0104",
    testId: "NAWI-2026-00104",
    instrumentModel: "AS-200",
    manufacturer: "AccuScale Technologies Pvt. Ltd.",
    evaluationStandard: "OIML R 76-1 Clause 3.6",
    issueDate: "14 Aug 2026",
    status: "Approved",
    signatory: "Dr. Rajesh Kumar",
    certificateNo: "NMTL-TAC-2026-041",
    resultSummary: "Class I repeatability standard deviation sr = 0.04 mg."
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: "ACT-001",
    time: "10:42",
    date: "28 Sep 2026",
    description: "Repeatability test completed for PWI-500",
    category: "Test Execution",
    badge: "Completed",
    badgeType: "pass",
    user: "Venu Prasath"
  },
  {
    id: "ACT-002",
    time: "10:18",
    date: "28 Sep 2026",
    description: "Report NAWI-2026-00123 submitted for review",
    category: "Report Management",
    badge: "Under Review",
    badgeType: "amber",
    user: "Ananya Sharma"
  },
  {
    id: "ACT-003",
    time: "09:54",
    date: "28 Sep 2026",
    description: "New instrument WM-1000 registered",
    category: "Instrument Registry",
    badge: "Registered",
    badgeType: "blue",
    user: "Venu Prasath"
  },
  {
    id: "ACT-004",
    time: "09:31",
    date: "28 Sep 2026",
    description: "Eccentricity test marked for review",
    category: "Test Execution",
    badge: "Under Review",
    badgeType: "amber",
    user: "Dr. Rajesh Kumar"
  },
  {
    id: "ACT-005",
    time: "08:45",
    date: "28 Sep 2026",
    description: "Temperature influence test started for AS-200",
    category: "Environmental Testing",
    badge: "In Progress",
    badgeType: "blue",
    user: "Venu Prasath"
  },
  {
    id: "ACT-006",
    time: "08:15",
    date: "28 Sep 2026",
    description: "Calibration standard CS-2026-04 verified",
    category: "Standard Verification",
    badge: "Verified",
    badgeType: "pass",
    user: "Vikramaditya Singh"
  }
];

export const TESTING_ACTIVITY_STATS = {
  testsInProgress: 6,
  awaitingReview: 4,
  completed: 28,
  reportsRequiringAttention: 2
};
