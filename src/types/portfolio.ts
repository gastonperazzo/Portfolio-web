export interface CaseStudyData {
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  impact: string;
  image: string;
  detailImage?: string;
  sections: {
    challenge: string;
    objectives: string[];
    whatIDid: string[];
    whatWeLearned: string[];
    results: string;
  };
  tags: string[];
  liveUrl?: string;
  galleryTitle?: string;
  galleryImages?: {
    src: string;
    caption: string;
    tag?: string;
    videoUrl?: string;
  }[];
}

export interface CareerMilestone {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface CapabilityCard {
  title: string;
  description: string;
}
