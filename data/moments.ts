export interface MomentImage {
  src: string;
  alt: string;
}

export interface Moment {
  id: number;
  title: string;
  subtitle?: string;
  category: "Events" | "Speaking" | "Organising" | "Community" | "Learning" | string;
  date: string; 
  place: string;
  video?: string;
  caption: string;
  images: MomentImage[];
}

export const moments: Moment[] = [
  {
    id: 1,
    title: "First Event as a Speaker",
    subtitle: "Custom Lightning Types",
    category: "Speaking",
    date: "Dec 2025", 
    place: "Noida",
    video: "https://www.youtube.com/watch?v=JyYYEahR5cA",
    caption: "My first time on stage, talking about Custom Lightning Types.",
    images: [
      { src: "/images/firstEvent/1.png", alt: "Accepting Swag from Arun Goel Sir" },
      { src: "/images/firstEvent/2.png", alt: "Session on Custom Lightning Type" },
      { src: "/images/firstEvent/3.png", alt: "Audience" },
      { src: "/images/firstEvent/4.png", alt: "Group Photo" },
    ],
  },
  {
    id: 2,
    title: "Second Event as a Speaker",
    subtitle: "LWC State Management",
    category: "Speaking",
    date: "Feb 2026",
    place: "Noida",
    caption: "Sharing how to manage state in Lightning Web Components.",
    images: [
      { src: "/images/secondEvent/1.jpeg", alt: "Accepting Swag from Naveen Gabrani Sir" },
      { src: "/images/secondEvent/2.jpeg", alt: "Session on LWC State Management" },
      { src: "/images/secondEvent/3.jpeg", alt: "Group Photo" },
      { src: "/images/secondEvent/4.jpeg", alt: "Photo with Amit(Salesforce Panther) Sir" },
      { src: "/images/secondEvent/5.jpeg", alt: "Accepting Swag from Amit Sir" },
    ],
  },
  {
    id: 3,
    title: "Third Event as a Speaker",
    subtitle: "Agent Script",
    category: "Speaking",
    date: "May 2026",
    place: "Ghaziabad",
    caption: "Talking about Agent Script in Agentforce.",
    images: [
      { src: "/images/thirdEvent/1.jpeg", alt: "Explaining Agent Script" },
      { src: "/images/thirdEvent/2.jpeg", alt: "Accepting Swag from Gaurav Kala Sir" },
      { src: "/images/thirdEvent/3.jpeg", alt: "Group Photo 1" },
      { src: "/images/thirdEvent/4.jpeg", alt: "Group Photo 2" },
    ],
  },
  {
    id: 4,
    title: "Managing the Monsoon Event",
    subtitle: "Astrea IT Services",
    category: "Organising",
    date: "August 2026", 
    place: "Astrea IT Services",
    caption: "Managing the Monsoon event.",
    images: [
      { src: "/images/monsoonEvent/1.jpeg", alt: "Accepting Swag from Naveen Gabrani Sir" },
      { src: "/images/monsoonEvent/2.jpeg", alt: "Managing the event" },
      { src: "/images/monsoonEvent/3.jpeg", alt: "Session on Storytelling in IT" },
      { src: "/images/monsoonEvent/4.jpeg", alt: "Session on Agentforce Grid" },
      { src: "/images/monsoonEvent/5.jpeg", alt: "Group Photo" },
    ],
  },
  {
    id: 5,
    title: "Delhi Dreamin",
    category: "Community",
    date: "April 2026", 
    place: "Delhi",
    caption: "Community day with the Salesforce ecosystem.",
    images: [
      { src: "/images/delhiDreamin/1.jpeg", alt: "Photo with Charlie Isaac(CTO)" },
      { src: "/images/delhiDreamin/2.jpeg", alt: "Group Photo" },
      { src: "/images/delhiDreamin/3.jpeg", alt: "Gifts and Swags" },
      { src: "/images/delhiDreamin/4.jpeg", alt: "Photo with Gaurav Kheterpal Sir" },
      { src: "/images/delhiDreamin/5.jpeg", alt: "Photo with Piyusha Pilania" },
      { src: "/images/delhiDreamin/6.jpeg", alt: "Closing celebrations" },
    ],
  },
  {
    id: 6,
    title: "Attending an event at Nagarro",
    category: "Events",
    date: "July 2026",
    place: "Gurugram",
    caption: "Learning hands-on with the community.",
    images: [
      { src: "/images/nagarroEvent/1.jpeg", alt: "Nagarro Office" },
      { src: "/images/nagarroEvent/2.jpeg", alt: "Office Picture" },
      { src: "/images/nagarroEvent/3.jpeg", alt: "Session on Automotive Cloud" },
      { src: "/images/nagarroEvent/4.jpeg", alt: "Rishab Seth Sir" },
      { src: "/images/nagarroEvent/5.jpeg", alt: "Session on Headless" },
    ],
  },
  {
    id: 7,
    title: "Event at 91SpringBoard",
    category: "Learning",
    date: "Oct 2025", 
    place: "Gurugram",
    caption: "Learning hands-on Claude",
    images: [
      { src: "/images/springBoardEvent/1.jpeg", alt: "Group Photo 1" },
      { src: "/images/springBoardEvent/2.jpeg", alt: "Group Photo Hall 2" },
    ],
  },
];
