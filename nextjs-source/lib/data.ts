export const SITE = {
  name: "Majemu Olowodola",
  roles: ["MC", "COMPÈRE", "MODERATOR", "EVENT HOST"],
  tagline: "Creating moments people remember.",
  email: "helo@majemuolowodola.com",
  phone: "+234 901 234 5678",
  instagram: "https://instagram.com/majemu__",
  instagramHandle: "@majemu__",
  linkedin: "https://linkedin.com/in/majemuolowodola",
  location: "Lagos, Nigeria",
};

export const BRANDS = [
  "Sterling Bank",
  "Hardé Business School",
  "Call of Duty Mobile",
  "Carry1st",
  "Chillians",
  "LBS",
  "Inspire Africa",
  "Raenest",
  "Cafe One",
  "Save Nigeria Campaign",
  "Powerpoint Tribe",
];

export type EventItem = {
  src: string;
  title: string;
  role: string;
  venue: string;
  tag: string;
  ratio: "portrait" | "landscape" | "tall";
};

export const EVENTS: EventItem[] = [
  {
    src: "/images/event-1pct-edge.jpg",
    title: "The 1% Edge",
    role: "Host",
    venue: "Lagos Business Summit",
    tag: "Corporate",
    ratio: "portrait",
  },
  {
    src: "/images/event-fireside-orange.jpg",
    title: "The Gig Economy — Fireside Chat",
    role: "Panelist & Moderator",
    venue: "Tech Conference, Lagos",
    tag: "Conference",
    ratio: "landscape",
  },
  {
    src: "/images/event-becoming-mom.jpg",
    title: "Becoming Mom",
    role: "Host & Moderator",
    venue: "PowerPoint Tribe",
    tag: "Social",
    ratio: "portrait",
  },
  {
    src: "/images/event-unilag.jpg",
    title: "LQ Tour",
    role: "Host",
    venue: "University of Lagos",
    tag: "Campus",
    ratio: "tall",
  },
  {
    src: "/images/event-fireside-lbs.jpg",
    title: "Fireside Chat",
    role: "Moderator",
    venue: "LBS by PowerPoint Tribe",
    tag: "Corporate",
    ratio: "landscape",
  },
  {
    src: "/images/event-cod-hosting.jpg",
    title: "COD Mobile World Championship Watch Party",
    role: "Host",
    venue: "Home of Games Africa",
    tag: "Gaming",
    ratio: "landscape",
  },
  {
    src: "/images/event-harde.jpg",
    title: "Hardé Business School",
    role: "Compère",
    venue: "Executive Programme, Lagos",
    tag: "Corporate",
    ratio: "portrait",
  },
  {
    src: "/images/stage-green-dress.jpg",
    title: "Night of Excellence",
    role: "Event Host",
    venue: "Lagos",
    tag: "Awards",
    ratio: "landscape",
  },
];

export const ENERGY = [
  {
    word: "ENERGETIC",
    line: "I bring the right energy to every room — and make it contagious.",
  },
  {
    word: "INTENTIONAL",
    line: "Every word. Every moment. Every transition matters.",
  },
  {
    word: "ENGAGING",
    line: "I connect with people, not just audiences.",
  },
  {
    word: "CONFIDENT",
    line: "I own the stage so your event owns the moment.",
  },
  {
    word: "VERSATILE",
    line: "Corporate boardrooms, church auditoriums, gaming arenas — I speak them all.",
  },
];

export const NUMBERS = [
  { value: 100, suffix: "+", label: "Events Hosted" },
  { value: 50, suffix: "K+", label: "Audience Members" },
  { value: 20, suffix: "+", label: "Cities & Counting" },
  { value: 12, suffix: "+", label: "Brands Trusted" },
];

export const PROCESS = [
  {
    step: "Discover",
    copy: "We discuss your event, your goals and your vision.",
  },
  { step: "Plan", copy: "We align on script, flow and all the details." },
  {
    step: "Collaborate",
    copy: "I work with your team like I'm part of it — because I am.",
  },
  { step: "Rehearse", copy: "I prepare and fine-tune for excellence." },
  {
    step: "Deliver",
    copy: "You relax while I deliver an unforgettable experience.",
  },
  { step: "Celebrate", copy: "Your guests leave talking about your event." },
];

export const TESTIMONIALS = [
  {
    quote:
      "Majemu has an incredible presence on stage. She kept over 1,000 people engaged from start to finish.",
    name: "Folarin Alakija",
    title: "Event Director, Access Bank",
  },
  {
    quote:
      "Professional, vibrant and very easy to work with. She brings life to every event.",
    name: "Toyosi Akerele",
    title: "Programs Lead, The Elevation Church",
  },
  {
    quote:
      "She doesn't just read the script. She owns the stage and the moment.",
    name: "Bayo Adeyeno",
    title: "Head, Corporate Communications",
  },
];

export const BACKSTAGE = [
  {
    src: "/images/bts-selfie.jpg",
    caption: "One last crowd check before we begin",
  },
  { src: "/images/event-moderating.jpg", caption: "Mid-question, mid-moment" },
  {
    src: "/images/event-becoming-mom-panel.jpg",
    caption: "When the panel forgets the cameras are on",
  },
  { src: "/images/portrait-cod-peace.jpg", caption: "Five minutes to showtime" },
  { src: "/images/event-fireside-lbs.jpg", caption: "Reading the room" },
];

export const FAQS = [
  {
    q: "How far do you travel?",
    a: "Anywhere the event is. I'm based in Lagos, Nigeria, and I host across cities and countries — travel and logistics are simply built into the booking.",
  },
  {
    q: "How do bookings work?",
    a: "Send the date, location and type of event. I confirm availability, we hop on a discovery call, and once the agreement and deposit are in, the date is locked and we start planning your experience.",
  },
  {
    q: "Can you moderate panels and fireside chats?",
    a: "Yes — moderation is one of my strongest formats. I research your speakers, craft the conversation arc, and keep the discussion sharp, warm and on time.",
  },
  {
    q: "Do you host corporate events?",
    a: "Constantly. Product launches, summits, award nights, end-of-year parties, town halls — I switch between boardroom polish and party energy as your run of show demands.",
  },
  {
    q: "What do you need from us on event day?",
    a: "A stage, a mic that works, and the final run of show. Everything else — energy, presence, timing, saves when things go off-script — that's what you booked me for.",
  },
];
