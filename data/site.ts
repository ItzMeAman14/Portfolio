export interface NavItem {
  label: string;
  href: string;
  fullTitle?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
  ariaLabel: string;
}

export const siteConfig = {
  name: "Aman Rehman",
  shortName: "A. REHMAN",
  role: "Salesforce Developer • Forward Deployed Engineer",
  location: "Noida, India",
  email: "amanrehman2020@gmail.com",
  availability: "Available for Forward Deployed & Salesforce Roles",
  note: "Open to Salesforce, Agentforce and forward-deployed roles. I usually reply within 24 hours.",
  bio: "Delivering production solutions for global clients across Apex, Lightning Web Components (LWC), Flow, Agentforce, Prompt Builder, Data Cloud/Data 360, and Marketing Cloud Next.",
  pitch: "Delivering production solutions for global clients across Apex, Lightning Web Components (LWC), Flow, Agentforce, Prompt Builder, Data Cloud/Data 360, and Marketing Cloud Next.",
  statement:
    "Salesforce Developer who delivers production solutions for clients across Apex, Lightning Web Components (LWC), Flow, Agentforce, Prompt Builder, Data Cloud/Data 360, and Marketing Cloud Next. Works directly with US clients to gather requirements, present live and recorded demos, and troubleshoot platform and integration issues. Delivered an MCAE-to-Marketing Cloud Next migration and a pricing analytics dashboard handling 20,000+ records in production, and trained 400+ students on Salesforce. Four Salesforce certifications, 38 superbadges, and Agentforce League winner.",
  credentials: [
    { text: "4x Salesforce Certified", highlight: true },
    { text: "Trailhead 5-Star Ranger", highlight: false },
    { text: "38 Superbadges", highlight: false },
    { text: "Agentforce League Winner", highlight: true },
    { text: "Noida, India", highlight: false },
  ],
  stats: [
    { label: "Salesforce Certifications", value: 4, display: "4" },
    { label: "Trailhead Superbadges", value: 38, display: "38" },
    { label: "Students & Interns Trained", value: 400, display: "400+" },
    { label: "Records Analytics Dashboard", value: 20, display: "20K+" },
  ],
  navItems: [
    { label: "Summary", fullTitle: "Professional Summary", href: "/#zone-summary" },
    { label: "Skills", fullTitle: "Technical Skills", href: "/#zone-skills" },
    { label: "Projects", fullTitle: "Enterprise Projects", href: "/#zone-projects" },
    { label: "Moments", fullTitle: "Moments & Gallery", href: "/#zone-moments" },
    { label: "Journey", fullTitle: "Journey & Experience", href: "/#zone-journey" },
    { label: "Blog", fullTitle: "Engineering Blog", href: "/blog" },
    { label: "Contact", fullTitle: "Contact & Resume", href: "/#zone-contact" },
  ],
  socials: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/aman-rehman-dev",
      label: "LinkedIn Profile",
      ariaLabel: "LinkedIn Profile",
    },
    {
      name: "GitHub",
      url: "https://github.com/ItzMeAman14",
      label: "GitHub Profile",
      ariaLabel: "GitHub Profile",
    },
    {
      name: "Trailhead",
      url: "https://www.salesforce.com/trailblazer/amanrehman",
      label: "Trailhead Profile",
      ariaLabel: "Salesforce Trailhead Profile",
    },
  ],
};
