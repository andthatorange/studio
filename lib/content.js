// Studio copy lives here. Package scopes, timelines, and prices are editable.
export const site = {
  name: "WebsitesbyKhaula Studio",
  tagline: "For brands that want their sites to feel like them",
  email: "websitesbykhaula@gmail.com",
  instagram: "https://www.instagram.com/websitesbykhaula/",
  pinterest: "https://www.pinterest.com/websitesbykhaula/",
  bookingStatus: "Bookings open for December onwards",
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Packages", href: "/packages" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export const beforeAfter = {
  heading: "From a little scattered to a little more you.",
  beforeLabel: "Before",
  afterLabel: "After",
  rows: [
    {
      before: "everything's buried in my feed…",
      after: "Your work, all in one place.",
    },
    {
      before: "prices? details? DM me again",
      after: "Clear services and helpful answers.",
    },
    {
      before: "this doesn't really feel like me",
      after: "A website with your personality.",
    },
    {
      before: "wait, how do people book?",
      after: "An easy next step to work with you.",
    },
  ],
};

export const process = [
  {
    title: "Call + questionnaire",
    time: "Week 1",
    text: "We talk about your brand, your people, and how you want visitors to feel. A short questionnaire makes sure nothing gets lost.",
  },
  {
    title: "Moodboard",
    time: "Weeks 1-2",
    text: "Before I build anything, I share a moodboard and style direction: colors, type, and feel. We agree on it first.",
  },
  {
    title: "Design + build",
    time: "Weeks 2-4",
    text: "I design and build your custom site, mobile included, and keep you updated along the way.",
  },
  {
    title: "Launch",
    time: "Weeks 4-5",
    text: "We go live. You get a handover guide so you know how to look after your site.",
  },
  {
    title: "Support",
    time: "2-6 weeks after",
    text: "I’m still around after launch for tweaks and questions, depending on your package.",
  },
];

export const faq = [
  {
    q: "What does it cost, and why?",
    a: "A single home page starts at $500, and full websites start at $900. The price depends on how many pages and features you need. Good design takes real time and care, and what you invest goes into the thought, the details, and the support after launch. If your budget is below my Home Page package, I’d rather tell you honestly than cut corners on your brand. If you’re unsure which package fits, send an enquiry and I’ll point you to the right one.",
  },
  {
    q: "How does payment work?",
    a: "50% to book your slot and start the project, and the remaining 50% before launch. Your site goes live once the final payment is made. Your slot is held for you once the deposit is in.",
  },
  {
    q: "How many revisions are included?",
    a: "Two rounds of revisions on the design, plus a final round of small tweaks after the build. You’ll see everything at each stage, so there are no surprises. Bigger changes after we’ve agreed on the direction can be quoted separately.",
  },
  {
    q: "Who owns the website, domain and hosting?",
    a: "You do. Your domain and hosting are set up in your name, and I’ll walk you through it in the handover guide. Domain and hosting fees are paid directly to the providers and aren’t included in my package price.",
  },
  {
    q: "Do you work with clients in other countries and time zones?",
    a: "Yes. I work with people in Europe, the Middle East, America, and Asia. Most of the project happens over email and shared documents, so you can reply when it suits you. We find a call time that works for both of us, and I’ll ask for your preferred slot in the enquiry form.",
  },
  {
    q: "How long does a project take?",
    a: "Most sites take about 3-5 weeks, depending on the package and how quickly we can go back and forth. The biggest factor is how soon I receive your content, so the sooner you send it, the sooner we launch.",
  },
  {
    q: "What do you need from me?",
    a: "Your answers to the questionnaire, any logo or brand colors you already have, and your photos and text, if you have them. If you don’t, we’ll plan that together. A Pinterest board of things you love is very welcome.",
  },
  {
    q: "How do I know you’re the right fit?",
    a: "I take on a small number of clients at a time, so each project gets my full attention. You’ll see the work first, you’ll know what happens at every step, and you’ll get documents and regular updates along the way. I stay in touch after launch too. If we’re not the right fit, I’ll tell you honestly.",
  },
];

export const enquire = {
  nextSteps: [
    {
      title: "Tell me a little",
      text: "Your idea, your goals, and where you are now.",
    },
    {
      title: "Hear from me",
      text: "I read every enquiry and reply within 2 working days.",
    },
    {
      title: "Find a direction",
      text: "We arrange a conversation and see what makes sense for your project.",
    },
  ],
  successHeading: "Your idea has landed.",
  heading: "Let’s make something that feels like you",
  sub: "Tell me a little about you and your project. It takes about 3 minutes.",
  afterSubmit:
    "I read every enquiry myself and reply within 2 working days with a few times for a call. If we’re a good fit, we start with a short questionnaire.",
};

export const hero = {
  headline: "The world is but a canvas to our imagination.",
  subheadline: "— Henry David Thoreau",
  sub: "Websites for brands that want their sites to truly feel like them",
  cta: "Tell me about your project",
};

// Case studies: 3-5 only. Each gets its own page at /work/<slug>.
// Rameown, OrganicxPure and FocusLearn were removed to keep this to five.
// Add real results (more enquiries, first sales, launch date) to "outcome" when you have them.
export const projects = [
  {
    slug: "kayecanvas",
    title: "KayeCanvas",
    tagline: "An artist that wanted her work to have a home",
    image: "/kayecanvas-cover.png",
    video: "/kaye-canvas-demo.mp4",
    services: ["Web design", "Development", "SEO"],
    year: "2026",
    brief:
      "Kaye wanted a home for her art: a place where people could explore her work, get to know the artist, and find out how to book her.",
    approach:
      "The design direction puts the artwork first, with space around each piece and a clear path from exploring the portfolio to making an enquiry.",
    outcome:
      "A dedicated portfolio brings her work and booking information together, giving visitors one place to discover KayeCanvas.",
    quote: "",
    liveUrl: "kayecanvas.com",
    // Add meeting photos, moodboards, and sketches here.
    gallery: [],
  },
  {
    slug: "krochetsk",
    title: "Krochetsk",
    tagline: "Kalpna's dream of selling her crochet online",
    image: "/krochetsk-cover.png",
    services: [],
    year: "",
    brief:
      "Kalpna had a dream of selling her crochet online. Krochetsk needed a home on the web for her handmade work.",
    approach:
      "A warm, personal direction keeps the handmade work at the heart of the experience. Product imagery and straightforward information help introduce each piece.",
    outcome:
      "An online home for Kalpna to share her crochet, tell its story, and guide visitors towards the next step.",
    quote: "",
    liveUrl: "",
    // Add meeting photos, moodboards, and sketches here.
    gallery: [],
  },
  {
    slug: "asksunnah",
    title: "Ask Sunnah",
    tagline: "A considered space for Islamic questions and answers",
    image: "/asksunnah.png",
    services: [],
    year: "",
    brief:
      "Ask Sunnah is a question-and-answer website centered on helping visitors explore Islamic topics.",
    approach:
      "The design direction favors readable text, clear sections, and simple navigation so the questions and answers can take priority.",
    outcome:
      "A focused space for browsing questions and finding relevant reading without a busy interface.",
    quote: "",
    liveUrl: "",
    // Add meeting photos, moodboards, and sketches here.
    gallery: [],
  },
  {
    slug: "aurelian-gems",
    title: "Aurelian Gems",
    tagline: "An online home for a new jewellery business",
    image: "/aureliangems-cover.png",
    services: [],
    year: "",
    brief:
      "She had just started her jewellery business. Aurelian Gems needed an online home to introduce the brand and its pieces.",
    approach:
      "A product-led direction gives each piece room to be noticed, with a clear introduction to the brand and a consistent visual language.",
    outcome:
      "A dedicated space to introduce Aurelian Gems and present its jewellery collection as the business takes shape.",
    quote: "",
    liveUrl: "",
    // Add meeting photos, moodboards, and sketches here.
    gallery: [],
  },
  {
    slug: "knitella",
    title: "Knitella",
    tagline: "A cozy home for handmade crochet",
    image: "/knitella.png",
    services: [],
    year: "",
    brief:
      "Knitella brings handmade crochet pieces into an online shop, from flowers to small creations with plenty of character.",
    approach:
      "Soft greens, generous product imagery, and clear product details create a warm setting for exploring the collection.",
    outcome:
      "A product-focused home where visitors can get a closer look at the handmade pieces and their details.",
    quote: "",
    liveUrl: "",
    // Add meeting photos, moodboards, and sketches here.
    gallery: [],
  },
];

export const packagesIntro =
  "Good design takes time and care, and you’ll always know exactly what’s included. Prices are starting points and depend on the pages and features you need.";

export const packages = [
  {
    id: "home",
    name: "Home Page",
    price: "$450",
    tagline: "One beautiful page that gets you online.",
    forWho:
      "Creators and service providers who just need a clear, well-designed home page to start with.",
    timeline: "1-2 weeks",
    pages: "1 page",
    includes: [
      "Discovery call and brand questionnaire",
      "Moodboard and style direction before I build",
      "Custom-designed one-page site, made for mobile",
      "Enquiry or booking link built in",
      "Basic SEO setup",
      "Handover guide so you can update it yourself",
      "1 round of design revisions",
      "2 weeks of support after launch",
    ],
    notIncluded: ["Extra pages", "Online store", "Photography", "Logo design"],
    addOns: [
      "Upgrade to a full site later: you only pay the difference",
      "Extra page: $150",
    ],
    featured: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$1000",
    tagline: "A full website, designed around you.",
    forWho:
      "Creators and small businesses who need a complete site: home, about, services, and a clear way to get in touch.",
    timeline: "3-4 weeks",
    pages: "Up to 5 pages",
    includes: [
      "Discovery call and brand questionnaire",
      "Moodboard and style direction before I build",
      "Custom-designed pages, made for mobile",
      "Enquiry form built in",
      "Basic SEO setup",
      "Handover guide so you can update it yourself",
      "2 rounds of design revisions",
      "2 weeks of support after launch",
    ],
    notIncluded: ["Photography", "Logo design"],
    addOns: ["Extra page: $150"],
    featured: false,
  },
  {
    id: "signature",
    name: "Signature",
    price: "Starting at $1,500",
    tagline: "A fuller website that tells your whole story.",
    forWho:
      "Small businesses ready for a larger, more considered site with room to grow.",
    timeline: "4-5 weeks",
    pages: "Up to 8 pages",
    includes: [
      "Everything in Starter",
      "Blog setup",
      "Booking or newsletter setup",
      "An extra round of design revisions",
      "4 weeks of support after launch",
    ],
    notIncluded: ["Photography", "Logo design"],
    addOns: ["Extra page: $150"],
    featured: true,
  },
  {
    id: "shop",
    name: "Shop",
    price: "Starting at $2,400",
    tagline: "A website that sells, and still feels like you.",
    forWho:
      "Makers and brands selling products who want a store that looks like their own, not a marketplace.",
    timeline: "4-6 weeks",
    pages: "Home, shop, product pages, and up to 3 more pages",
    includes: [
      "Everything in Starter",
      "Online store with up to 20 products set up",
      "Secure checkout set up",
      "Handover guide, including how to add products",
      "6 weeks of support after launch",
    ],
    notIncluded: ["Product photography", "Copywriting"],
    addOns: ["Extra products setup: $10 per product after the first 20"],
    featured: false,
  },
];

export const about = {
  eyebrow: "A little about the person behind the studio",
  photoAlt: "Khaula outdoors beneath the trees",
  photoCaption: "The person behind the pixels.",
  note: "A small studio. A personal kind of process.",
  principles: [
    {
      title: "Listening comes first",
      text: "A conversation and a shared direction before the design begins.",
    },
    {
      title: "You are part of the process",
      text: "Room for questions, feedback, and the details that matter to you.",
    },
    {
      title: "Care beyond launch",
      text: "A clear handover and support while you settle into your new site.",
    },
  ],

  heading: "Hi, I’m Khaula.",
  body: [
    "I’m a web designer working with small businesses and creators who want their website to feel like them: calm, considered, and not one bit generic.",
    "I work slowly on purpose. Every project starts with listening: a call, a questionnaire, and a moodboard before I design anything. And after launch I don’t disappear. I stay in touch and help you keep it going.",
    "When i'm not working, i'm either reading a really good book or going for a walk and doomscrolling but we don't talk about that",
  ],
  photo: "/me.jpeg", // a desk shot works if you’d rather not use a portrait
};

export const formOptions = {
  need: [
    "New website",
    "Rebrand + website",
    "Redesign of my current site",
    "Not sure yet",
  ],
  timeline: [
    "As soon as possible",
    "Within 1-2 months",
    "Later this year",
    "Just exploring",
  ],
  budget: [
    "$500 - $900",
    "$900 - $1,500",
    "$1,500 - $3,000",
    "$3,000+",
    "Not sure yet",
  ],
};

// Link entries to case studies with projectSlug. See README for examples.
export const instagram = {
  heading: "Little squares from my world.",
  sub: "New work, little discoveries, and the making of it all.",
  posts: [
    {
      id: "post-1",
      url: "https://www.instagram.com/p/DZXPgZSiD4f/?img_index=1",
      title: "KayeCanvas",
      image: "/instagram/post-1.jpg",
      projectSlug: "kayecanvas",
    },
    {
      id: "post-2",
      url: "https://www.instagram.com/p/Dfk0fpuAZO3/?img_index=1",
      title: "A little studio update",
      image: "/instagram/post-2.jpg",
    },
    {
      id: "post-3",
      url: "https://www.instagram.com/p/De4Q7K8uAg8/",
      title: "From the studio",
      image: "/instagram/post-3.jpg",
    },
  ],
};

// Only add genuine client words with permission to share them.
export const reviews = {
  heading: "Kind words, lovely people.",
  sub: "The experience of building something together, in their own words.",
  items: [
    {
      id: "kaye-review",
      projectSlug: "kayecanvas",
      quote:
        "I recommend her and would emphasize how patient she was, and still is, as I develop my website more. I am not ready to let go of her yet as I thread the online world so I would definitely continue with her services and learn from her some more.Grateful for you Khaula!",
      name: "Kaye",
      role: "Artist, KayeCanvas",
      showOnHome: true,
    },
    {
      id: "aurelian-review",
      projectSlug: "aurelian-gems",
      quote:
        "Khaula I was looking for a jewellery website that looked cute, trendy, and elegant and you fulfilled all of that perfectly.My website turned out so beautiful and I absolutely love it.My favourite part about working with you was how sweet and friendly you were. It never felt like a formal work meeting, it was always fun and comfortable. ",
      name: "Ayesha",
      role: "Owner, Aurelian Gems",
      showOnHome: true,
    },
    {
      id: "knitella-review",
      projectSlug: "knitella",
      quote:
        "I'm so glad i got to work with you!!! I freakin love the website 🥹👉🏻👈🏻 Khaula is so calm and patiently listened to all my demands. She created it exactly as i wanted. Totally recommended💯!!!",
      name: "Arfa",
      role: "Owner, Knitella",
      showOnHome: true,
    },
    {
      id: "krochetsk-review",
      projectSlug: "krochetsk",
      quote:
        "Alsoo i will definitely definitely recommend you to everyone andd i did🫶 And what I loved about working with youu was you were always there for me even after the website was done and i asked you to correct a few things and you did it on timee andd you’re v sweet andd v easy to work with🎀 thankyouu thankyousomuchhh for making my lil dream come true🫶🏻💗🌷!!!",
      name: "Kalpna",
      role: "Owner, Krochetsk",
      showOnHome: true,
    },
  ],
};

// Homepage overview: detailed scope and prices stay on /packages.
export const servicesOverview = {
  heading: "What kind of home does your idea need?",
  intro:
    "A first website, room to grow, or a shop for the things you make. There is a thoughtful way to bring each one to life.",
  items: [
    {
      title: "A little beginning",
      description:
        "A clear, considered page that introduces your work and gives people an easy way to get in touch.",
      href: "/packages#home",
    },
    {
      title: "The fuller picture",
      description:
        "A website with space for your story, your services, and the work you want the world to see.",
      href: "/packages#starter",
    },
    {
      title: "A shop of your own",
      description:
        "An online storefront that brings your products together and feels like the brand behind them.",
      href: "/packages#shop",
    },
  ],
};
