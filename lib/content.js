// Studio copy lives here. Package scopes, timelines, and budget bands are editable drafts.
export const site = {
  name: "WebsitesbyKhaula Studio",
  tagline: "For brands that want their sites to feel like them",
  email: "websitesbykhaula@gmail.com",
  instagram: "https://www.instagram.com/websitesbykhaula/",
  pinterest: "https://www.pinterest.com/websitesbykhaula/",
  bookingStatus: "Bookings open for Fall 2026",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Packages", href: "/#packages" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
];

// Hero formula: [who you help] + [the outcome]. Put the outcome first, not the deliverable.
// e.g. "Websites for [who] that [outcome they care about]". Keep the "slots open" tag in site.bookingStatus.

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
    time: "2-4 weeks after",
    text: "I’m still around after launch for tweaks and questions, depending on your package.",
  },
];

export const faq = [
  {
    q: "What does it cost, and why?",
    a: "Projects start at the prices in the packages above and depend on how many pages and features you need. Good design takes real time and care, and what you invest goes into the thought, the details, and the support after launch. If you’re unsure which package fits, send an enquiry and I’ll point you to the right one.",
  },
  {
    q: "Do you work with clients in other countries and time zones?",
    a: "Yes. I work with people in Europe, the Middle East, America, and Asia. Most of the project happens over email and shared documents, so you can reply when it suits you. We find a call time that works for both of us, and I’ll ask for your preferred slot in the enquiry form.",
  },
  {
    q: "How long does a project take?",
    a: "Most sites take about [3-5 weeks], depending on the package and how quickly we can go back and forth. The biggest factor is how soon I receive your content, so the sooner you send it, the sooner we launch.",
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
  successHeading: "Your idea has landed.",

  heading: "Let’s make something that feels like you",
  sub: "Tell me a little about you and your project. It takes about [3] minutes.",
  afterSubmit:
    "I read every enquiry myself and reply within [2 working days] with a few times for a call. If we’re a good fit, we start with a short questionnaire.",
};

export const hero = {
  headline: "The world is but a canvas to our imagination.",
  subheadline: "— Henry David Thoreau",
  sub: "Websites for brands that want their sites to truly feel like them",
  cta: "Start an enquiry",
};

// Case studies: 3-5 only. Each gets its own page at /work/<slug>.
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
    slug: "focuslearn",
    title: "FocusLearn",
    tagline: "A calmer space for people who feel overwhelmed online",
    image: "/focuslearn-cover.png",
    services: [],
    year: "",
    brief:
      "FocusLearn was made for people who get overwhelmed online, with the aim of making learning feel calmer and more approachable.",
    approach:
      "The direction prioritizes breathing room, readable content, and clear choices, with fewer competing elements on the screen.",
    outcome:
      "A learning experience designed around a calmer pace, with content given room to be explored one step at a time.",
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
  {
    slug: "ramewon",
    title: "Rameown",
    tagline: "A little world with a personality of its own",
    image: "/rameown.png",
    services: [],
    year: "",
    brief:
      "Rameown explores how a distinct identity can carry through an online experience.",
    approach:
      "The draft direction centers on a recognizable visual mood and a simple journey through the content.",
    outcome:
      "A space to bring the project identity and its content together in one consistent experience.",
    quote: "",
    liveUrl: "",
    // Add meeting photos, moodboards, and sketches here.
    gallery: [],
  },
  {
    slug: "organicxpure",
    title: "OrganicxPure",
    tagline: "A fresh space for OrganicxPure",
    image: "/organicxpure.png",
    services: [],
    year: "",
    brief:
      "An online introduction to OrganicxPure, with room for its products and brand story.",
    approach:
      "The direction brings attention to the essentials: what the brand offers, the details visitors need, and where to go next.",
    outcome:
      "A considered online home for presenting the brand and exploring its offering.",
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
    id: "starter",
    name: "Starter",
    price: "Starting at $[___]",
    tagline: "A single, beautiful page for your work.",
    forWho:
      "Creators and service providers who need a clear online home to begin with.",
    timeline: "[2-3 weeks]",
    pages: "[1 page]",
    includes: [
      "Discovery call and brand questionnaire",
      "Moodboard and style direction before I build",
      "Custom-designed one-page site, made for mobile",
      "Basic SEO setup",
      "Handover guide so you can update it yourself",
      "2 weeks of support after launch",
    ],
    notIncluded: ["[Copywriting]", "[Photography]", "[Logo design]"],
    addOns: ["[Extra page: $__]"],
    featured: false,
  },
  {
    id: "signature",
    name: "Signature",
    price: "Starting at $[___]",
    tagline: "A full website that tells your whole story.",
    forWho:
      "Small businesses ready for a considered, multi-page site that feels like their brand.",
    timeline: "[3-4 weeks]",
    pages: "[Up to 5 pages]",
    includes: [
      "Discovery call and brand questionnaire",
      "Moodboard and style direction before I build",
      "Custom-designed pages, made for mobile",
      "Enquiry form built in",
      "Basic SEO setup",
      "Handover guide so you can update it yourself",
      "3 weeks of support after launch",
    ],
    notIncluded: ["[Copywriting]", "[Photography]", "[Logo design]"],
    addOns: ["[Extra page: $__]", "[Blog setup: $__]"],
    featured: true,
  },
  {
    id: "shop",
    name: "Shop",
    price: "Starting at $[___]",
    tagline: "A website that sells, and still feels like you.",
    forWho:
      "Makers and brands selling products who want a store that looks like their own, not a marketplace.",
    timeline: "[4-5 weeks]",
    pages: "[Home, shop, product pages, and more]",
    includes: [
      "Everything in Signature",
      "Online store with product pages",
      "Secure checkout set up",
      "Handover guide, including how to add products",
      "4 weeks of support after launch",
    ],
    notIncluded: ["[Product photography]", "[Copywriting]"],
    addOns: ["[Extra products setup: $__]"],
    featured: false,
  },
];

export const about = {
  heading: "Hi, I’m Khaula.",
  body: [
    "I’m a web designer working with small businesses and creators who want their website to feel like them: calm, considered, and not one bit generic.",
    "I work slowly on purpose. Every project starts with listening: a call, a questionnaire, and a moodboard before I design anything. And after launch I don’t disappear. I stay in touch and help you keep it going.",
    "[One personal line: what you love outside of design, like reading, baking, Pinterest, or walks.]",
  ],
  photo: "/me.jpg", // a desk shot works if you’d rather not use a portrait
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
    "$[900] - $[1,500]",
    "$[1,500] - $[3,000]",
    "$[3,000]+",
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
      title: "What",
      image: "/my-post-cover.jpg",
      projectSlug: "kayecanvas",
    },
    {
      id: "post-2",
      url: "https://www.instagram.com/p/Dfk0fpuAZO3/?img_index=1",
      title: "A little studio update",
      image: "/another-cover.jpg",
    },
    {
      id: "post-2",
      url: "https://www.instagram.com/p/De4Q7K8uAg8/",
      title: "A little studio update",
      image: "/another-cover.jpg",
    },
  ],
};

// Only add genuine client words with permission to share them.
export const reviews = {
  heading: "Kind words, lovely people.",
  sub: "The experience of building something together, in their own words.",
  items: [],
};
