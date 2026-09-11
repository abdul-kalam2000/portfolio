/*
 * projects-data.js
 * ─────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW PROJECT:
 * Copy any object below, paste it into the PROJECTS array, and
 * edit the fields. That's it — no HTML or CSS changes needed.
 * The site re-renders this list automatically on load.
 *
 * Field guide:
 *   id        - unique, lowercase, no spaces (used internally)
 *   title     - project title as it should display
 *   category  - one of: "security" | "networking" | "database" | "hardware" | "research"
 *               (controls the accent dot color — see css/style.css :root variables)
 *   date      - short date label, e.g. "Dec 2025"
 *   summary   - one sentence, shows collapsed
 *   stack     - array of short strings (languages/tools), shown as tags
 *   bullets   - array of strings, shown when expanded
 *   links     - array of {label, url} — e.g. GitHub, live demo, paper
 * ─────────────────────────────────────────────────────────────
 */

const PROJECTS = [
  {
    id: "retbleed",
    title: "Retbleed: Speculative Code Execution via RSB Underflow",
    category: "security",
    date: "Dec 2025",
    summary: "Reproduced a real 2022 CPU vulnerability in a gem5 simulation, leaked a secret byte-by-byte, then closed the hole.",
    stack: ["C", "gem5", "x86 intrinsics", "Flush+Reload"],
    bullets: [
      "Reproduced the Retbleed (CVE-2022-29900/29901) CPU vulnerability in a gem5 out-of-order CPU simulation, demonstrating Return Stack Buffer (RSB) underflow leading to Branch Target Buffer hijacking.",
      "Implemented a full attack chain in C, leaking secret data byte-by-byte via a Flush+Reload cache side-channel with ~49-cycle cache-hit timing precision.",
      "Designed and validated a software mitigation (LFENCE speculation barrier), confirming it closed the side-channel by driving all access timing above 150 cycles."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/abdul-kalam2000/retbleed-speculative-execution-poc" }
    ]
  },
  {
    id: "secure-os",
    title: "Memory-Assisted Secure Operating System",
    category: "security",
    date: "Apr 2025",
    summary: "A runtime monitor and hash-based integrity checker that catches memory abuse and file tampering as they happen.",
    stack: ["C", "Bash", "Linux /proc", "SHA-256"],
    bullets: [
      "Designed and implemented a /proc-based runtime memory monitoring system in Bash to detect anomalous process behavior indicative of memory abuse or code injection.",
      "Simulated and analyzed a race-condition privilege-escalation exploit in C using unsynchronized multithreading, demonstrating the security impact of missing mutex locks on shared state.",
      "Built a cryptographic hash-based integrity verification system (SHA-256 baseline/diff) as a TPM substitute, detecting unauthorized file tampering with a working detection-and-alerting pipeline."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/abdul-kalam2000/secure-os-runtime-monitoring" }
    ]
  },
  {
    id: "congestion-control",
    title: "AI-Assisted Congestion Control in High-Speed Networks",
    category: "networking",
    date: "May 2026",
    summary: "Simulated five TCP variants fighting over one bottleneck link to measure what actually helps AI-era networks stay fast.",
    stack: ["ns-3", "Python", "pandas", "matplotlib"],
    bullets: [
      "Simulated and benchmarked TCP Reno, Cubic, and BBR under a congested 5-flow dumbbell topology in ns-3, measuring throughput, delay, and packet loss across 5 randomized seeds per protocol.",
      "Conducted comparative analysis showing AI-assisted congestion control (DRL, PCC Vivace) reduced packet loss by over 96% and end-to-end delay by 46% relative to TCP Cubic.",
      "Co-authored findings motivating proactive, learning-based congestion control as a requirement for terabit-scale networking."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/abdul-kalam2000/ai-congestion-control-ns3" }
    ]
  },
  {
    id: "vpp-datacenters",
    title: "Virtual Power Plants for AI Data Centers",
    category: "research",
    date: "May 2026",
    summary: "Researched how AI data centers can plug into the power grid as active, cyber-secure participants instead of passive loads.",
    stack: ["Research", "Grid Systems", "SCADA/DNP3"],
    bullets: [
      "Analyzed Virtual Power Plant (VPP) architecture, including hierarchical multi-timescale control and the economic case for VPP capacity over gas peaker plants.",
      "Authored the cybersecurity section identifying False Data Injection Attack (FDIA) vectors and legacy SCADA/DNP3/Modbus protocol vulnerabilities in VPP–data center integration.",
      "Proposed a zero-trust, quantum-safe mitigation strategy for VPP control channels."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/abdul-kalam2000/Virtual-Power-Plants-for-AI-Data-Centers" }
    ]
  },
  {
    id: "sql-logistics",
    title: "Database System Project — Logistics & Delivery Management",
    category: "database",
    date: "Dec 2025",
    summary: "A normalized SQL Server schema running a fictional delivery fleet, complete with triggers and reporting procedures.",
    stack: ["SQL Server", "T-SQL", "Azure Data Studio"],
    bullets: [
      "Designed and implemented a normalized SQL Server schema for a logistics/delivery operation, covering customers, employees, trucks, routes, orders, and deliveries with full referential integrity.",
      "Built an AFTER INSERT trigger to auto-generate formatted accident reports and a stored procedure to send customer-facing order-status notifications based on live delivery state.",
      "Optimized query performance with foreign-key indexing and validated the system end-to-end using analytical queries."
    ],
    links: []
  },
  {
    id: "sql-bookstore",
    title: "Database System Project — Bookstore Database",
    category: "database",
    date: "Dec 2025",
    summary: "A bookstore's sales and inventory schema, with stored procedures that turn raw sales data into revenue reports.",
    stack: ["SQL Server", "T-SQL"],
    bullets: [
      "Designed and populated a SQL Server bookstore database (publishers, customers, authors, sales) with NOT NULL constraints enforcing data integrity.",
      "Wrote stored procedures for automated sales reporting, including per-customer sales totals and city-level revenue ranking by state.",
      "Extended the schema with a normalized order-details layer and an AFTER INSERT trigger to auto-calculate order totals."
    ],
    links: []
  },
  {
    id: "smart-streetlight",
    title: "Smart Streetlight System",
    category: "hardware",
    date: "2023",
    summary: "A street light that powers itself from sunlight and passing traffic, and only shines as bright as it needs to.",
    stack: ["Arduino", "LDR/IR Sensors", "Solar", "Embedded C"],
    bullets: [
      "Co-designed a solar- and kinetic-energy-powered street lighting system using Arduino, LDR, and IR sensors to enable traffic-aware automatic dimming.",
      "Engineered a mechanical dynamo integrated into a speed breaker to convert vehicle-induced kinetic energy into stored electrical power, reducing dependence on grid electricity."
    ],
    links: []
  }
];

// Category metadata: label + accent color (used by main.js to render dots/badges)
const CATEGORIES = {
  security:   { label: "Security",   color: "var(--accent-security)" },
  networking: { label: "Networking", color: "var(--accent-networking)" },
  database:   { label: "Database",   color: "var(--accent-database)" },
  hardware:   { label: "Hardware",   color: "var(--accent-hardware)" },
  research:   { label: "Research",   color: "var(--accent-research)" }
};
