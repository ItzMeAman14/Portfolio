export interface Project {
  id: string;
  index: string;
  badge: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  mockupUrl: string;
  svgType: "mcn" | "coca-cola" | "automotive" | "timesheet";
  inquireUrl: string;
  connectUrl: string;
}

export const projects: Project[] = [
  {
    id: "mcn-migration",
    index: "01",
    badge: "US Client • Production",
    title: "Marketing Cloud Next — MCAE Migration",
    description:
      "Migrated 3 segments, 3 forms, and 3 automations from Account Engagement to Marketing Cloud Next in production.",
    problem:
      "Legacy Account Engagement dynamic lists and siloed automation rules needed modernization into Unified Individual Data Cloud models without downtime.",
    solution:
      "Rebuilt dynamic lists as Data Cloud segments (Lead Source filters, assigned-user exclusions, Unified Individual logic) and designed multi-step Audience Flows.",
    result:
      "Production rollout of 3 segments, 3 forms, and 3 automations with personalized Zoom Scheduler links by sales rep and custom DLOs (Lead_Home, Contact_Home).",
    tags: [
      "Marketing Cloud Next",
      "Account Engagement",
      "Data 360",
      "Audience Flow",
      "Dynamic Content",
    ],
    mockupUrl: "datacloud.marketingcloud/audience-flows",
    svgType: "mcn",
    inquireUrl: "#zone-contact",
    connectUrl: "https://linkedin.com/in/aman-rehman-dev",
  },
  {
    id: "coca-cola-pricing",
    index: "02",
    badge: "Client • Production",
    title: "Coca-Cola Pricing Analytics & AI Recommendations",
    description:
      "Built and deployed an LWC dashboard in production, visualizing pricing and product insights from 20,000+ records using Chart.js.",
    problem:
      "Triage and anomaly detection across 20,000+ pricing records and product lines were manual, slow, and lacked grouped visual drill-downs.",
    solution:
      "Apex queries grouped by brand and product attributes powering a high-speed LWC dashboard with interactive Chart.js graphs.",
    result:
      "Production dashboard connected to a Prompt Builder workflow generating automated AI recommendations for business decision makers.",
    tags: [
      "Apex",
      "LWC",
      "Chart.js",
      "Prompt Builder",
      "20,000+ Records",
    ],
    mockupUrl: "pricing.analytics/20k-records",
    svgType: "coca-cola",
    inquireUrl: "#zone-contact",
    connectUrl: "https://linkedin.com/in/aman-rehman-dev",
  },
  {
    id: "automotive-cloud-agent",
    index: "03",
    badge: "Agentforce Solution",
    title: "Automotive Cloud Agent — Agentforce",
    description:
      "Agentforce-powered automotive assistant that recommends vehicles based on customer preferences and books test drives for the car-buying journey.",
    problem:
      "Vehicle buyers experienced drop-offs during test-drive booking and post-purchase asset warranty configuration.",
    solution:
      "Mapped Agentforce to Salesforce Scheduler concepts (work type groups, territories, resources, vehicles, available time slots).",
    result:
      "Seamless test-drive booking plus automated Flow-based warranty setup linking vehicle assets to warranty terms (dates, type, coverage).",
    tags: [
      "Automotive Cloud",
      "Agentforce",
      "Salesforce Scheduler",
      "Salesforce Flow",
      "Asset Warranty",
    ],
    mockupUrl: "agentforce.automotive/scheduler",
    svgType: "automotive",
    inquireUrl: "#zone-contact",
    connectUrl: "https://linkedin.com/in/aman-rehman-dev",
  },
  {
    id: "timesheet-management",
    index: "04",
    badge: "Internal Enterprise App",
    title: "Timesheet Management with Attendance Verification",
    description:
      "Rebuilt an existing timesheet tool as an LWC and Apex app on Experience Cloud, adding task edit/delete and automated attendance verification.",
    problem:
      "Previous tool lacked task modification, verifiable attendance tracking, and alerts for incomplete work durations.",
    solution:
      "LWC application with picture capture punch-in/out to external drive storage, duration tracking, weekly attendance reports, and HR alerts.",
    result:
      "Automated HR email alerts for punch-outs under 9 hours, laptop-only access restrictions, email verification, and password reset.",
    tags: [
      "LWC",
      "Apex",
      "Experience Cloud",
      "Camera Photo Capture",
      "HR Flow Alerts",
    ],
    mockupUrl: "experience-cloud.timesheet/portal",
    svgType: "timesheet",
    inquireUrl: "#zone-contact",
    connectUrl: "https://linkedin.com/in/aman-rehman-dev",
  },
];
