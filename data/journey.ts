export interface JourneyEntry {
  side: "left" | "right";
  date: string;
  role: string;
  company: string;
  bullets: string[];
}

export const journeyEntries: JourneyEntry[] = [
  {
    side: "left",
    date: "JAN 2026 — PRESENT",
    role: "Software Developer",
    company: "Astrea IT Services",
    bullets: [
      "Deliver production Salesforce solutions for clients using Apex, LWC, Flow, and platform capabilities, including a US-based Marketing Cloud Next migration.",
      "Lead requirement-gathering calls with clients and present solutions through live and recorded demos.",
      "Build Lightning interfaces connected to Apex and Salesforce records; troubleshoot component state, navigation, and data retrieval.",
      "Build AI-enabled solutions with Agentforce and Prompt Builder, including contextual recommendations and conversational workflows.",
      "Work with Data Cloud/Data 360 for data ingestion, mapping, identity resolution, calculated insights, segmentation, and activation.",
      "Investigate platform and integration issues involving OAuth configuration, permissions, data flow, and component behavior.",
    ],
  },
  {
    side: "right",
    date: "COMMUNITY LEADERSHIP & MENTORSHIP",
    role: "Technical Trainer & Community Speaker",
    company: "Salesforce Community • Summer Training Program",
    bullets: [
      "Trained 400+ students virtually through the company's Summer Training Program, and trained interns and developers.",
      "Delivered 3 in-person sessions at Salesforce Community events.",
      "Covered Salesforce Admin and Development, LWC, Flow, Agentforce, Data Cloud, Custom Lightning Types, and Agent Scripts.",
      "Presented demos and facilitated quizzes explaining Salesforce platform capabilities and AI integration concepts.",
    ],
  },
  {
    side: "left",
    date: "CREDENTIALS & DISTINCTIONS",
    role: "4x Salesforce Certifications & Ranger",
    company: "Salesforce Verified Credentials",
    bullets: [
      "4 Salesforce Certifications: Platform Developer I • Agentforce Specialist • Platform Administrator • Platform App Builder.",
      "Trailhead 5-Star Ranger: Completed the 100 Days of Trailhead Challenge and 38 Superbadges.",
      "Distinctions: Agentblazer Champion, Innovator, and Legend.",
      "Awards: Winner in Salesforce community challenges, including Agentforce 360 League and 30 Days of Slack Challenge.",
    ],
  },
  {
    side: "right",
    date: "2021 — 2025",
    role: "B.Tech in Computer Science & Engineering",
    company: "Allenhouse Institute of Technology • CGPA: 8.01 / 10",
    bullets: [
      "Rigorous foundation in Computer Science, Software Engineering, Database Systems, Object-Oriented Design, and Distributed Computing.",
      "Graduated with first-class honors (CGPA 8.01 / 10).",
    ],
  },
];
