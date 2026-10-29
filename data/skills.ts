export interface SkillCategory {
  title: string;
  tag: string;
  skills: string[];
}

export const marqueeTracks = {
  trackLeft: [
    "APEX",
    "LIGHTNING WEB COMPONENTS",
    "AGENTFORCE",
    "DATA CLOUD",
    "MARKETING CLOUD NEXT",
    "FLOW AUTOMATION",
  ],
  trackRight: [
    "IDENTITY RESOLUTION",
    "PROMPT BUILDER",
    "HXL LAYER",
    "CALCULATED INSIGHTS",
    "AUDIENCE FLOWS",
    "DMO MODELING",
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Salesforce Core Dev",
    tag: "CORE",
    skills: [
      "Apex",
      "Apex Triggers",
      "SOQL / SOSL",
      "LWC",
      "Salesforce Flow",
      "Experience Cloud",
      "Platform Security",
      "Integration",
    ],
  },
  {
    title: "AI & Agentic Solutions",
    tag: "AGENTIC",
    skills: [
      "Agentforce",
      "Prompt Builder",
      "Agent Scripts",
      "Custom Lightning Types",
      "Headless Experience (HXL)",
      "Headless 360",
    ],
  },
  {
    title: "Data Cloud / Data 360",
    tag: "DATA ENGINE",
    skills: [
      "Data Streams",
      "DLOs & DMOs",
      "Identity Resolution",
      "Calculated Insights",
      "Segmentations",
      "Activations",
      "Data Graphs",
    ],
  },
  {
    title: "Marketing Cloud",
    tag: "CAMPAIGNS",
    skills: [
      "Marketing Cloud Next",
      "Dynamic Content",
      "Data Extensions",
      "Journey Builder",
      "Automation Studio",
    ],
  },
  {
    title: "Integration & Delivery",
    tag: "FORWARD DEPLOYED",
    skills: [
      "REST APIs",
      "OAuth 2.0",
      "Client Demos",
      "Requirements Gathering",
      "Architecture Review",
      "Debugging & Testing",
    ],
  },
  {
    title: "Tools & Languages",
    tag: "TOOLCHAIN",
    skills: [
      "JavaScript",
      "Apex",
      "Python",
      "HTML / CSS",
      "Git",
      "VS Code",
    ],
  },
];
