import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// In-memory newsletter subscribers list
const subscribers = [];
const interactionLogs = [];

// Data endpoints
const productData = {
  name: "AirPods Max",
  generation: "2",
  subtitle: "Sound in Form",
  heroEyebrow: "APPLE AIRPODS MAX",
  heroEdition: "A study in sound & form / 01",
  heroTitle: {
    line1: "Sound.",
    line2: "Beyond."
  },
  heroNote: "Every detail. Every dimension. Entirely immersive.",
  heroPunchline: {
    lead: "Beautifully considered.",
    sub: "Extraordinarily heard."
  },
  price: {
    amount: "₹74,900",
    formatted: "₹74,900",
    currency: "INR",
    market: "APPLE INDIA",
    caption: "Listed price · INR",
    fineprint: "Price checked September 2026. Final price, payment options, and availability are confirmed by Apple.",
    officialUrl: "https://www.apple.com/in/shop/buy-airpods/airpods-max-2",
    included: [
      "AirPods Max 2",
      "Smart Case",
      "USB-C Charge Cable"
    ]
  },
  battery: {
    hours: 20,
    headline: "Up to 20 hrs",
    description: "Listening time on a single charge with Active Noise Cancellation enabled.",
    features: [
      {
        title: "USB-C charging",
        description: "One familiar connection to power your next listen."
      },
      {
        title: "Smart Case",
        description: "An ultra-low-power state when the music takes a break."
      }
    ]
  }
};

const modesData = {
  focus: {
    id: "focus",
    name: "Noise Cancellation",
    shortName: "ANC",
    title: "Let the outside fade.",
    text: "Active Noise Cancellation reduces unwanted background sound with inverse anti-noise, so your music can take centre stage.",
    caption: "JUST YOU. AND THE MUSIC.",
    activeDecibels: "-32dB ambient attenuation",
    color: "#c9eac0",
    orbitScale: 1.0,
    accentGlow: "rgba(201, 234, 192, 0.25)"
  },
  aware: {
    id: "aware",
    name: "Transparency",
    shortName: "Transparency",
    title: "Keep a little world in.",
    text: "Transparency mode lets outside sound through naturally, so you can hear what’s around you while listening without removing your headphones.",
    caption: "YOUR MUSIC. YOUR SURROUNDINGS.",
    activeDecibels: "Natural acoustic pass-through",
    color: "#b2d7e6",
    orbitScale: 1.25,
    accentGlow: "rgba(178, 215, 230, 0.3)"
  },
  spatial: {
    id: "spatial",
    name: "Spatial Audio",
    shortName: "Spatial 3D",
    title: "Sound that moves with you.",
    text: "Personalised Spatial Audio with dynamic head tracking transforms stereo into a theatre-grade soundstage.",
    caption: "360-DEGREE SOUNDFIELD.",
    activeDecibels: "Dynamic Head Tracking",
    color: "#d4b8f0",
    orbitScale: 1.4,
    accentGlow: "rgba(212, 184, 240, 0.3)"
  }
};

const finishesData = [
  {
    id: "midnight",
    name: "Midnight",
    hex: "#343b44",
    accent: "#64748b",
    tagline: "Deep, celestial darkness with subtle obsidian undertones.",
    textColor: "#ffffff"
  },
  {
    id: "starlight",
    name: "Starlight",
    hex: "#d9d1bf",
    accent: "#e2ded2",
    tagline: "Warm, lustrous metallic champagne inspired by ambient glow.",
    textColor: "#17211f"
  },
  {
    id: "blue",
    name: "Blue",
    hex: "#8ea9c2",
    accent: "#b0c6db",
    tagline: "Ethereal, calming sky mist with anodised aluminum lustre.",
    textColor: "#17211f"
  },
  {
    id: "purple",
    name: "Purple",
    hex: "#b7a4cb",
    accent: "#cfc1de",
    tagline: "Soft lavender hue designed to catch architectural light.",
    textColor: "#17211f"
  },
  {
    id: "orange",
    name: "Orange",
    hex: "#ed9674",
    accent: "#f4b7a1",
    tagline: "Vibrant coral warmth reminiscent of golden hour dusk.",
    textColor: "#17211f"
  }
];

const gesturesData = [
  {
    number: "01",
    label: "Turn it up.",
    tag: "TURN THE DIGITAL CROWN",
    description: "Rotate the Digital Crown with micro-click precision to make continuous volume adjustments, from a soft whisper to your favourite crescendo."
  },
  {
    number: "02",
    label: "Press pause.",
    tag: "PRESS ONCE",
    description: "Press the Digital Crown once to pause audio or answer/end a phone call. Press again seamlessly when you are ready to resume."
  },
  {
    number: "03",
    label: "Find the next track.",
    tag: "PRESS TWICE / THRICE",
    description: "Double-press the Digital Crown to skip forward. Triple-press to skip back. Seamless rhythmic control without touching your pocket device."
  },
  {
    number: "04",
    label: "Let the world in.",
    tag: "NOISE CONTROL BUTTON",
    description: "Switch seamlessly between Active Noise Cancellation and Transparency mode at a single tactile click of the dedicated button."
  }
];

const craftData = [
  {
    index: "01",
    title: "A softer landing.",
    description: "Acoustically engineered memory foam ear cushions surround your ears for exceptional seal and pillow-soft comfort.",
    highlight: "Memory Foam & Custom Fabric"
  },
  {
    index: "02",
    title: "A lighter touch.",
    description: "The breathable knit-mesh canopy spans the headband to distribute weight evenly, reducing on-head pressure.",
    highlight: "Breathable Knit-Mesh Canopy"
  },
  {
    index: "03",
    title: "A little more control.",
    description: "Turn the Digital Crown to adjust volume with surgical precision. Press to control playback, manage calls, and activate Siri.",
    highlight: "Anodised Digital Crown"
  }
];

const galleryData = [
  {
    id: "gallery-1",
    index: "01 / ARCHITECTURAL SILHOUETTE",
    title: "Form meets acoustic stillness.",
    image: "/assets/gallery-new-1.jpg",
    width: 2800,
    height: 1575,
    isWide: true,
    aspect: "2.1"
  },
  {
    id: "gallery-2",
    index: "02 / THE TENSIONED CANOPY",
    title: "Breathable knit-mesh engineering.",
    image: "/assets/gallery-new-2.jpg",
    width: 1660,
    height: 1245,
    isWide: false,
    aspect: "1.33"
  },
  {
    id: "gallery-3",
    index: "03 / ACOUSTIC MEMORY FOAM",
    title: "Calculated contouring & plush seal.",
    image: "/assets/gallery-new-3.jpg",
    width: 1660,
    height: 1245,
    isWide: false,
    aspect: "1.33"
  },
  {
    id: "gallery-4",
    index: "04 / PRECISION DIGITAL CROWN",
    title: "Tactile micro-ridges & haptic mastery.",
    image: "/assets/gallery-new-4.jpg",
    width: 2800,
    height: 1575,
    isWide: true,
    aspect: "2.1"
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AirPods Max Sound in Form API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    framework: 'Express.js 5'
  });
});

// APIs
app.get('/api/product', (req, res) => {
  res.json(productData);
});

app.get('/api/modes', (req, res) => {
  res.json(modesData);
});

app.get('/api/finishes', (req, res) => {
  res.json(finishesData);
});

app.get('/api/gestures', (req, res) => {
  res.json(gesturesData);
});

app.get('/api/craft', (req, res) => {
  res.json(craftData);
});

app.get('/api/gallery', (req, res) => {
  res.json(galleryData);
});

// Interactive state/telemetry tracking
app.post('/api/interaction', (req, res) => {
  const { event, details } = req.body;
  const entry = {
    id: interactionLogs.length + 1,
    event,
    details,
    timestamp: new Date().toISOString()
  };
  interactionLogs.push(entry);
  if (interactionLogs.length > 200) interactionLogs.shift();
  res.status(201).json({ success: true, entry });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email, finish } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const existing = subscribers.find(s => s.email === email);
  if (existing) {
    return res.json({ message: 'You are already registered for acoustic updates!', subscribed: true });
  }

  const subscriber = {
    id: subscribers.length + 1,
    email,
    finish: finish || 'midnight',
    createdAt: new Date().toISOString()
  };
  subscribers.push(subscriber);

  res.status(201).json({
    message: 'Welcome to the inner circle of sound.',
    subscriber
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`[Express.js Server] Running on http://localhost:${PORT}`);
  console.log(`[Express.js Server] Node.js ${process.version} - Status: Ready`);
});
