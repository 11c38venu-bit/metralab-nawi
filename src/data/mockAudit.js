// Mock audit trail data for prototype
export const MOCK_AUDIT_EVENTS = [
  { id: "a1", timestamp: "2026-09-28 10:30", user: "Venu Prasath", module: "Instrument Registry", action: "Instrument registered", object: "NMTL-INS-00241", details: "Added new instrument PWI-500" },
  { id: "a2", timestamp: "2026-09-28 10:45", user: "Venu Prasath", module: "Evaluation", action: "Evaluation created", object: "NAWI-2026-00131", details: "Configured test plan for instrument NMTL-INS-00241" },
  { id: "a3", timestamp: "2026-09-28 10:50", user: "Venu Prasath", module: "Test Execution", action: "Test saved", object: "NAWI-2026-00131", details: "All 7 test observations recorded" },
  { id: "a4", timestamp: "2026-09-28 10:52", user: "Venu Prasath", module: "Review", action: "Evaluation submitted for technical review", object: "NAWI-2026-00131", details: "Awaiting reviewer Dr. Rajesh Kumar" },
  { id: "a5", timestamp: "2026-09-28 11:00", user: "Dr. Rajesh Kumar", module: "Review", action: "Review comment added", object: "NAWI-2026-00131", details: "Technical observation on eccentricity" },
  { id: "a6", timestamp: "2026-09-28 11:15", user: "Dr. Rajesh Kumar", module: "Review", action: "Evaluation accepted for reporting", object: "NAWI-2026-00131", details: "Ready to generate report" },
  { id: "a7", timestamp: "2026-09-28 11:20", user: "Venu Prasath", module: "Report", action: "Report preview generated", object: "NAWI-2026-00131", details: "User opened report preview page" }
];
