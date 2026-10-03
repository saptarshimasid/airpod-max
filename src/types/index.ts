export interface ProductData {
  name: string;
  generation: string;
  subtitle: string;
  heroEyebrow: string;
  heroEdition: string;
  heroTitle: {
    line1: string;
    line2: string;
  };
  heroNote: string;
  heroPunchline: {
    lead: string;
    sub: string;
  };
  price: {
    amount: string;
    formatted: string;
    currency: string;
    market: string;
    caption: string;
    fineprint: string;
    officialUrl: string;
    included: string[];
  };
  battery: {
    hours: number;
    headline: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
}

export interface SoundMode {
  id: string;
  name: string;
  shortName: string;
  title: string;
  text: string;
  caption: string;
  activeDecibels: string;
  color: string;
  orbitScale: number;
  accentGlow: string;
}

export interface FinishColor {
  id: string;
  name: string;
  hex: string;
  accent: string;
  tagline: string;
  textColor: string;
}

export interface GestureItem {
  number: string;
  label: string;
  tag: string;
  description: string;
}

export interface CraftFeature {
  index: string;
  title: string;
  description: string;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  index: string;
  title: string;
  image: string;
  width: number;
  height: number;
  isWide: boolean;
  aspect: string;
}
