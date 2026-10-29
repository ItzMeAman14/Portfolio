export interface BlogPost {
  id: string;
  title: string;
  url: string;
  platform: string;
  tags: string[];
  featured: boolean;
  description: string;
  date: string; 
  readTime: string;
}

export const blogs: BlogPost[] = [
  {
    id: "mcn-forms",
    title: "How to Create Forms in Marketing Cloud Next and Connect Them to Flow",
    url: "https://astreait.com/salesforce-marketing-cloud-next-forms-flow-integration-guide/",
    platform: "Astrea IT",
    tags: ["Marketing Cloud Next", "Forms", "Flow", "Lead Generation"],
    featured: true,
    description:
      "Step-by-step guide to building a form in Marketing Cloud Next, mapping fields to a Lead data source, and attaching a Flow that creates leads from webinar registrations.",
    date: "2026-10-27",
    readTime: "6 min",
  },
  {
    id: "mcn-dynamic-content-personalization",
    title: "How to Personalize Emails in Marketing Cloud Next",
    url: "https://astreait.com/salesforce-marketing-cloud-next-email-personalization-merge-fields-dynamic-content/",
    platform: "Astrea IT",
    tags: ["Marketing Cloud Next", "Personalization", "Dynamic Content", "Data Cloud"],
    featured: true,
    description:
      "Set up Personalization with a Data Graph, then use merge fields, content variables and dynamic content variations to send emails tailored to each recipient.",
    date: "2026-10-27",
    readTime: "11 min",
  },
  {
    id: "sfmc-to-mcn-migration",
    title: "SFMC to Marketing Cloud Next: Migration Guide",
    url: "https://astreait.com/sfmc-to-marketing-cloud-next-migration-guide/",
    platform: "Astrea IT",
    tags: ["Marketing Cloud Next", "Migration", "SFMC"],
    featured: true,
    description:
      "Architectural roadmap and migration strategies for transitioning from legacy Marketing Cloud to Marketing Cloud Next.",
    date: "2026-02-15",
    readTime: "6 min",
  },
  {
    id: "opportunity-notes-reporting",
    title: "Opportunity Notes Reporting Solution in Salesforce",
    url: "https://astreait.com/opportunity-notes-reporting-solution-salesforce/",
    platform: "Astrea IT",
    tags: ["Reports", "Opportunities", "Salesforce"],
    featured: false,
    description:
      "Custom reporting patterns and Apex rollups to surface historical Opportunity Notes across executive pipeline dashboards.",
    date: "2026-01-20",
    readTime: "5 min",
  },
  {
    id: "ai-digital-banking-agentforce",
    title: "AI Digital Banking with Salesforce Agentforce, FSC and Facebook Messenger",
    url: "https://astreait.com/ai-digital-banking-salesforce-agentforce-fsc-facebook-messenger/",
    platform: "Astrea IT",
    tags: ["Agentforce", "FSC", "Banking", "AI"],
    featured: false,
    description:
      "Integrating Agentforce with Financial Services Cloud and Messenger for compliant autonomous banking client workflows.",
    date: "2025-11-28",
    readTime: "7 min",
  },
  {
    id: "agentforce-automotive-cloud",
    title: "Agentforce for Salesforce Automotive Cloud",
    url: "https://astreait.com/agentforce-salesforce-automotive-cloud/",
    platform: "Astrea IT",
    tags: ["Agentforce", "Automotive Cloud"],
    featured: false,
    description:
      "Designing intelligent dealer and vehicle buyer journeys with Agentforce, Salesforce Scheduler, and asset warranty automation.",
    date: "2025-10-15",
    readTime: "5 min",
  },
  {
    id: "slack-issues-salesforce-cases-ai",
    title: "Automating Slack Issues to Salesforce Cases with AI",
    url: "https://astreait.com/automating-slack-issues-to-salesforce-cases-ai/",
    platform: "Astrea IT",
    tags: ["Slack", "Cases", "AI", "Automation"],
    featured: false,
    description:
      "Building zero-touch incident pipelines that triage Slack team threads into prioritized Salesforce Cases using AI.",
    date: "2025-08-10",
    readTime: "6 min",
  },
  {
    id: "data-transforms-data-cloud",
    title: "Data Transforms in Salesforce Data Cloud",
    url: "https://astreait.com/data-transforms-in-salesforce-data-cloud/",
    platform: "Astrea IT",
    tags: ["Data Cloud", "Data 360", "Transforms"],
    featured: false,
    description:
      "High-throughput batch and streaming transformations for harmonizing cross-system customer identity records in Data Cloud.",
    date: "2025-06-25",
    readTime: "5 min",
  },
];
