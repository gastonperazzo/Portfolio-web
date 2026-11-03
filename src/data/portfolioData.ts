import { CaseStudyData, CareerMilestone, CapabilityCard } from '../types/portfolio';

export const personalProfile = {
  name: 'Gastón Perazzo',
  title: 'UX & Product Research Specialist',
  headline: 'Research that makes people the starting point of every product.',
  subheadline: 'I help product teams make better decisions by combining qualitative and quantitative research, product strategy, and experimentation. I turn user needs, behavioral patterns, and business goals into clearer product decisions.',
  portraitImage: '/gaston-perazzo-portrait.png',
  location: 'Buenos Aires, Argentina',
  phone: '+54 11 6472 0021',
  whatsappUrl: 'https://wa.me/5491164720021?text=Hola%20Gast%C3%B3n,%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20contactarte',
  email: 'gaston2115@gmail.com',
  gmailUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=gaston2115@gmail.com&su=Inquiry%20from%20Portfolio%20%E2%80%94%20Gast%C3%B3n%20Perazzo',
  linkedinUrl: 'https://linkedin.com/in/gaston-perazzo/',
  awards: '2019 Webby Award Winner · Health & Fitness (Chat Crecer)',
  stats: [
    {
      value: '10+ Years',
      label: 'Experience',
      description: 'Across research, product strategy and service design.'
    },
    {
      value: '6',
      label: 'Industries',
      description: 'Government, fintech, health, education, social impact and B2B SaaS.'
    },
    {
      value: '4',
      label: 'Company types',
      description: 'Public institutions, product companies, consultancies and startups.'
    }
  ],
  aboutBio: [
    "I'm a Product & UX Research Specialist and Social Anthropologist with 10+ years of experience across digital products and public services. I work at the intersection of research, product strategy, experimentation and behavioral science.",
    "My experience spans financial services, health, education, social impact, government and B2B SaaS, working with startups, consultancies, product companies and public institutions. I use interviews, ethnography, usability testing, surveys, analytics, experimentation and behavioral research to turn evidence into decisions."
  ],
  capabilities: [
    {
      title: 'Generative research',
      description: 'In-depth and in-situ interviews, ethnography, personas, and product canvases to uncover real user needs and underlying behavioral drivers.'
    },
    {
      title: 'Evaluative research & usability',
      description: 'Concept validation, rapid prototyping, and moderated usability testing to refine onboarding, complex flows, and core features.'
    },
    {
      title: 'Product discovery & strategy',
      description: 'End-to-end discovery pairing qualitative insights with Product Analytics (Amplitude/Mixpanel), metrics, and behavioral experimentation (A/B testing) to align roadmaps.'
    },
    {
      title: 'Synthesis & insights',
      description: 'Journey mapping, competitive benchmarks, quantitative data analysis, and insight clusterization that translate complex data into actionable product recommendations.'
    }
  ] as CapabilityCard[],
  experience: [
    {
      period: '2025–2026',
      role: 'Senior Researcher and Product Strategist',
      company: 'Itti',
      description: 'Leading product research, user discovery, and product strategy across enterprise systems, digital banking architectures, and the Ueno Bank ecosystem.'
    },
    {
      period: '2022–2025',
      role: 'Product & UX Research Specialist',
      company: 'Rootstrap',
      description: 'Led discovery, evaluative research, product strategy, and user experience roadmapping for global clients including Santander Uruguay, Connect Teletherapy, and Verizon.'
    },
    {
      period: '2020–2022',
      role: 'UX Research Lead',
      company: 'Ualá',
      description: 'Spearheaded research strategy combining qualitative research, product analytics, and experimentation across fintech onboarding, cards, loans, and investment journeys.'
    },
    {
      period: '2016–2020',
      role: 'UX Researcher',
      company: 'Government of Argentina',
      description: 'Researched, designed, and evaluated nationwide public digital services and healthcare initiatives at the Ministry of Modernization, including the Webby Award-winning Chat Crecer virtual assistant.'
    }
  ] as CareerMilestone[]
};

export const caseStudiesList: CaseStudyData[] = [
  {
    slug: 'chat-crecer',
    kicker: "Sub-secretary of Motherhood & Infancy · Ministry of Health, Argentina",
    title: "Chat Crecer",
    subtitle: "A virtual assistant for pregnancy and early years, created to increase timely prenatal check-ups and make trusted health information easier to access.",
    impact: "4,000+ active users · NPS 78 · Webby Award Winner",
    image: "/chat-crecer-cover.png",
    liveUrl: "https://www.argentina.gob.ar/salud/crecerconsalud",
    galleryTitle: "A Visual Story",
    sections: {
      challenge: "Increase the number of timely medical check-ups among pregnant women while providing quality information about maternity, early childhood, rights and government benefits.",
      objectives: [
        "Increase prenatal check-ups and ensure they are timely",
        "Provide quality information about maternity and early childhood",
        "Facilitate access to government support and benefits",
        "Support women during pregnancy and the baby’s first year"
      ],
      whatIDid: [
        "Conducted in-situ ethnographic observations and deep interviews with low-income pregnant mothers, adolescent women, and healthcare professionals in public maternity wards across Pilar.",
        "Built empirically derived personas (e.g. Jesica, 14-year-old adolescent pregnancy, and Lourdes, 25-year-old first-time mother) capturing digital habits, emotional barriers, healthcare access fears, and information-seeking behaviors.",
        "Synthesized qualitative findings into a Product Canvas linking Ministry health resources with real-world maternal needs.",
        "Benchmarked communication channels (SMS, native apps, social media) to identify Facebook Messenger as the zero-barrier platform already installed on basic smartphones.",
        "Architected the conversational dialogue tree, automated check-up reminder loops, and gestational milestone content adapted for low digital literacy.",
        "Prototyped and executed a 3-month live pilot study in Pilar maternity hospitals, continuously testing onboarding usability and message comprehension directly with target mothers."
      ],
      whatWeLearned: [
        "Users often had low- or mid-range phones, limited data and little available storage",
        "Facebook was already familiar and accessible on their mobile phones",
        "Many women searched online for pregnancy information but often found unofficial sources",
        "A conversational experience could turn official information into timely, caring guidance"
      ],
      results: "Chat Crecer directly reached over 4,000 pregnant women and young mothers. Pilot evaluation demonstrated high usability and real behavioral change: 97% of users rated the chatbot as easy to navigate, 79% discovered critical health information they did not previously know, and 89% reported remembering and attending a scheduled prenatal check-up directly because of the automated reminders. Hospital administrators and doctors in Pilar reported a measurable rise in timely check-ups, and the initiative earned global recognition as a 2019 Webby Award Winner in Health & Fitness."
    },
    tags: ["In-situ interviews", "Personas & product canvas", "Prototyping", "Usability testing", "Pilot study"],
    galleryImages: [
      {
        src: "/chat-crecer-launch.png",
        caption: "Official presentation at the National Ministry of Health and Ministry of Modernization with Dr. Adolfo Rubinstein and leadership team.",
        tag: "Ministry Presentation"
      },
      {
        src: "/chat-crecer-portal.png",
        caption: "Chat Crecer featured on the national government portal (Argentina.gob.ar) as a key public health initiative for maternity and early childhood.",
        tag: "Argentina.gob.ar Portal"
      },
      {
        src: "/chat-crecer-infographic.png",
        caption: "Official step-by-step campaign infographic explaining how mothers can access Chat Crecer on Messenger.",
        tag: "How It Works Flyer"
      },
      {
        src: "/chat-crecer-flowchart.png",
        caption: "End-to-end conversational flowchart mapping gestational milestones, FPP checks, automated reminders, and appointment confirmation logic.",
        tag: "Dialogue Architecture"
      },
      {
        src: "/chat-crecer-ux-schematic.png",
        caption: "Detailed UX schematic illustrating chatbot screen states, location permissions, and nearby healthcare center maps.",
        tag: "UX & Location Flow"
      },
      {
        src: "/chat-crecer-messenger.png",
        caption: "Conversational interface in Facebook Messenger providing automated assistance for prenatal checkups, maternal health tips, and government benefits.",
        tag: "Facebook Messenger UI"
      },
      {
        src: "/chat-crecer-persona-jesica.png",
        caption: "User persona developed through field research in Pilar, detailing goals, fears, and digital preferences.",
        tag: "User Persona — Jesica"
      },
      {
        src: "/chat-crecer-persona-lourdes.png",
        caption: "User persona developed through field research in Pilar, detailing goals, fears, and digital preferences.",
        tag: "User Persona — Lourdes"
      }
    ]
  },
  {
    slug: 'special-olympics',
    kicker: "Special Olympics · Young Athletes Program",
    title: "Special Olympics",
    subtitle: "Helping families through their child’s development with an inclusive mobile experience built around connection, guidance and community.",
    impact: "Community-First Strategy · Family-Centered\u00A0Experience",
    image: "/special-olympics-cover.png",
    liveUrl: "https://resources.specialolympics.org/sports-essentials/young-athletes",
    galleryTitle: "A Visual Story",
    sections: {
      challenge: "Following the pandemic, many families of children with intellectual and developmental disabilities (IDD) lost direct contact with Special Olympics programs and peer support networks. The team needed to build an inclusive digital platform to guide caregivers through child development while re-establishing a supportive, empowering community.",
      objectives: [
        "Understand emotional and practical needs of caregivers of children with intellectual disabilities",
        "Identify touchpoints to connect families, health providers, and athletic coaches",
        "Define an evidence-backed MVP scope and 4-phase launch architecture",
        "Reduce caregiver isolation through shared milestones and inclusive play activities"
      ],
      whatIDid: [
        "Conducted 20 in-depth qualitative interviews with caregivers, physical therapists, coaches, and family members across the USA.",
        "Segmented the research sample across formal and informal IDD diagnoses and children aged 2–7 to capture diverse developmental stages.",
        "Evaluated prototype concepts for personalized play activities, health information distribution, and family-to-provider connections.",
        "Facilitated co-creation alignment sessions with Special Olympics program leaders and health administrators.",
        "Synthesized qualitative research findings into a 4-Phase Launch Architecture (Event Tracking -> Launch MVP -> Stage 2 Testing -> V1 Launch)."
      ],
      whatWeLearned: [
        "Community connection was the single most vital feature: caregivers needed peer empathy, not just professional advice.",
        "Accessible, everyday play activities reduced the barrier to home-based developmental therapy.",
        "Local events and shared stories were essential for rebuilding trust after pandemic isolation.",
        "Clear, non-stigmatizing language empowered parents to track milestones comfortably at their own pace."
      ],
      results: "The research completely reshaped the Special Olympics Young Athletes digital roadmap around community and peer connection. It defined the MVP feature set, established event tracking and metrics, and laid out a multi-stage testing rollout embraced by caregivers and program directors nationwide."
    },
    tags: ["20 in-depth interviews", "Usability testing", "Roadmap prioritization", "MVP definition"],
    galleryImages: [
      {
        src: "https://img.youtube.com/vi/2mRaGsHzaCU/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=2mRaGsHzaCU",
        caption: "Special Olympics Young Athletes official video overview: Empowering families through play.",
        tag: "Featured Video"
      },
      {
        src: "/special-olympics-portal-resources.png",
        caption: "Special Olympics Young Athletes core resources and educational materials portal.",
        tag: "Resources Portal"
      },
      {
        src: "/special-olympics-cover.png",
        caption: "Special Olympics Young Athletes in action: fostering inclusive play, movement, and confidence.",
        tag: "Community & Play"
      },
      {
        src: "/special-olympics-app-flyer.svg",
        caption: "Special Olympics Young Athletes app promotional system: 'EMPOWER FAMILIES THROUGH PLAY' with personalized developmental activities and care connections.",
        tag: "Product Flyer & Scope"
      },
      {
        src: "/assets/cases/p025.png",
        caption: "Qualitative sample breakdown: 20 in-depth individual interviews sliced across professions and child IDD diagnoses.",
        tag: "Sample Matrix"
      },
      {
        src: "/assets/cases/p028.png",
        caption: "Core qualitative testimony: the emotional necessity of community connection for overcoming caregiver isolation.",
        tag: "User Voice"
      },
      {
        src: "/assets/cases/p030.png",
        caption: "Our Next Steps 4-phase launch architecture: Event Tracking -> Launch MVP -> Testing Stage 2 -> Design & Launch V1.",
        tag: "Launch Architecture"
      }
    ]
  },
  {
    slug: 'santander-uruguay',
    kicker: "Santander Uruguay · Strategic UX & Product Discovery",
    title: "Santander Uruguay",
    subtitle: "A comprehensive strategic discovery for a next-generation digital bank, aligning customer needs, product opportunities, and business strategy across retail and affluent client segments.",
    impact: "72+ Interviews Across Segments · Strategic UX Discovery",
    image: "/santander-cover.png",
    detailImage: "/santander-hero-mobile.png",
    liveUrl: "https://www.santander.com.uy",
    galleryTitle: "A Visual Story",
    sections: {
      challenge: "Santander Uruguay needed to modernize its core digital banking experience and mobile app architecture to address shifting customer expectations, reduce friction in daily banking, and stay ahead of agile fintech competitors while catering to diverse customer profiles.",
      objectives: [
        "Uncover unmet financial needs, friction points, and behavioral drivers across retail, affluent, and institutional client segments",
        "Align cross-functional stakeholders and executive product owners across bank verticals around a unified digital vision",
        "Perform deep competitive benchmarking against international fintech pioneers (Revolut, Mercury, N26)",
        "Develop empirically grounded customer personas and end-to-end user journey maps for everyday and wealth management tasks",
        "Deliver an actionable digital transformation roadmap with prioritized product backlog items and telemetry metrics"
      ],
      whatIDid: [
        "Co-led the UX research strategy and discovery lifecycle in close partnership with Rootstrap's Lead Product Manager and Santander executive stakeholders.",
        "Conducted over 72 in-depth qualitative interviews with bank clients, product owners, compliance officers, and senior banking executives in Uruguay.",
        "Facilitated multi-disciplinary co-creation workshops with subject-matter experts to map operational constraints and technical feasibility.",
        "Synthesized research data into detailed user personas (e.g. Mariana, digital-first retail user; Santiago, affluent multi-currency investor) and end-to-end journey maps.",
        "Built a strategic market benchmark analyzing global value propositions, business models, and UX patterns (e.g. Revolut multi-currency vaults, Mercury corporate onboarding).",
        "Formulated UX recommendations for real-time balance transparency, simplified navigation architecture, and self-service support workflows."
      ],
      whatWeLearned: [
        "Customers required instant, real-time transaction updates and clear multi-currency categorization to feel in complete control of their personal finances.",
        "Complex navigation hierarchies created unnecessary friction for everyday tasks like bill payments and peer-to-peer transfers.",
        "Transparent product conditions and self-service troubleshooting drastically decreased low-value support calls and branch visits.",
        "Affluent clients prioritized unified wealth management dashboards with rapid foreign exchange execution and integrated investment tools.",
        "Establishing continuous data telemetry across every funnel stage was essential for validating future feature releases."
      ],
      results: "The 5-week discovery produced a strategic digital banking transformation blueprint that directly shaped Santander Uruguay's product backlog and mobile redesign. It aligned internal leadership across departments, replaced stakeholder assumptions with empirical customer evidence, and established a user-centered foundation for the bank's digital evolution."
    },
    tags: ["72+ qualitative interviews", "Fintech benchmarking", "Stakeholder alignment", "Personas & journey mapping", "Information architecture", "Product strategy"],
    galleryImages: [
      {
        src: "/santander-masivo-base.png",
        caption: "Customer persona research board for the entry-level retail segment (Masivo Base), mapping financial behaviors, barriers, low-maintenance expectations, and product opportunities.",
        tag: "Segment Profile — Masivo Base"
      },
      {
        src: "/santander-workshop-presentation.png",
        caption: "Co-creation workshop with Santander Uruguay leadership and cross-functional teams aligning product strategy and research insights.",
        tag: "Stakeholder Alignment Workshop"
      },
      {
        src: "/santander-gaston-presenting.png",
        caption: "Gastón presenting research methodologies and proto-persona frameworks to Santander stakeholders during the discovery phase.",
        tag: "Research Training & Methodology"
      },
      {
        src: "/santander-co-creation-breakout.png",
        caption: "Collaborative breakout session with Santander product managers mapping customer habits, expectations, and pain points.",
        tag: "Co-Creation Working Session"
      },
      {
        src: "/assets/cases/p038.png",
        caption: "Persona development and journey mapping boards for key customer segments: Mariana (digital retail) and Santiago (affluent wealth management).",
        tag: "Personas & Journeys"
      },
      {
        src: "/santander-benchmark-revolut-standard.png",
        caption: "Fintech competitive benchmark: Revolut Standard Plan flexible investment account offering 3%–4% APY with on-demand funds, daily interest payouts, and competitive 36-currency exchange rates.",
        tag: "Benchmark: Revolut Standard Plan"
      },
      {
        src: "/santander-benchmark-itau.png",
        caption: "Local market competitive analysis evaluating Itaú Uruguay's low-barrier investment access, 7-step risk profiler, and embedded simulator.",
        tag: "Benchmark: Itaú Uruguay"
      },
      {
        src: "/santander-benchmark-nubank.png",
        caption: "Neobank strategy benchmark dissecting Nubank's community forum, gamified loyalty mechanics, and youth demographic engagement.",
        tag: "Benchmark: Comunidad Nu"
      },
      {
        src: "/assets/cases/p041.png",
        caption: "Competitive benchmark analysis: Mercury corporate onboarding, automated treasury workflows, and friction-free user experience.",
        tag: "Benchmark: Mercury"
      },
      {
        src: "/assets/cases/p042.png",
        caption: "Delivered findings: UX improvements through real-time balance information, simpler IA, and measurement systems.",
        tag: "Strategic UX Roadmap"
      }
    ]
  },
  {
    slug: 'connect-teletherapy',
    kicker: "Connect Teletherapy · Strategic UX & Product Discovery",
    title: "Connect Teletherapy",
    subtitle: "Discovery and validation for an all-in-one virtual therapy platform connecting children, families, schools, and multidisciplinary clinicians.",
    impact: "Schools, Families & Clinicians · Multi-Segment Product\u00A0Scope",
    image: "/connect-teletherapy-logo.png",
    detailImage: "/case-connect.png",
    liveUrl: "https://cteletherapy.com/",
    galleryTitle: "A Visual Story",
    sections: {
      challenge: "Connect Teletherapy needed to expand virtual therapy across speech, occupational, physical, and mental health. The team needed to understand operational workflows across schools and families, validate user needs against requested features, and define a feasible MVP launch scope.",
      objectives: [
        "Identify pain points parents, schools, and therapists face when accessing virtual therapy",
        "Understand the clinical and developmental goals families and clinicians aim to achieve",
        "Evaluate service workflows to improve therapist onboarding, allocation, and retention",
        "Define technical feasibility and a prioritized MVP release roadmap"
      ],
      whatIDid: [
        "Structured a 5-week discovery lifecycle across Product Vision, Explorative Research, and Product Definition.",
        "Conducted 25 in-depth qualitative interviews across OTs, SLPs, School Counselors, and Families.",
        "Facilitated collaborative alignment workshops with clinical leadership and subject-matter experts.",
        "Synthesized findings through insight clusterization by user segment and operational pain points.",
        "Mapped end-to-end service journeys in Miro and designed wireframes for onboarding and session scheduling."
      ],
      whatWeLearned: [
        "School and family workflows were fundamentally different and required distinct operational paths.",
        "Building genuine rapport between child and therapist was the core driver of clinical progress.",
        "Scheduling friction and manual handoffs were the main source of therapist administrative fatigue.",
        "Direct validation of user needs allowed the team to trim feature bloat and focus on a lean launch."
      ],
      results: "The 5-week discovery defined a user-centered product scope and prioritized technical roadmap grounded in 25 qualitative interviews. It aligned stakeholders across clinical disciplines, eliminated non-essential features, and established clear requirements for launch."
    },
    tags: ["25 in-depth interviews", "Discovery framework", "Journey mapping", "Wireframing", "Multi-segment research"],
    galleryImages: [
      {
        src: "/connect-discovery-framework.png",
        caption: "Our 3-stage discovery approach: Product Vision (1 week) -> Explorative Research (2 weeks) -> Product Definition (2 weeks).",
        tag: "Discovery Framework"
      },
      {
        src: "/connect-onboarding-journey.png",
        caption: "Onboarding and service workflow mapping in Miro: therapist assignment, kid profile setup, and rescheduling loops.",
        tag: "Journey Mapping"
      },
      {
        src: "/connect-teletherapy-logo.png",
        caption: "Connect Teletherapy brand identity: symbolizing growth, multidisciplinary care, and authentic human connection.",
        tag: "Brand Identity"
      },
      {
        src: "/assets/cases/p051.png",
        caption: "Qualitative research breakdown: 25 in-depth interviews across OTs, SLPs, School Counselors, and Families.",
        tag: "Qualitative Sample"
      },
      {
        src: "/assets/cases/p050.png",
        caption: "Wireframe flow exploring core platform mechanics: therapist allocation, kid profile setup, and session notifications.",
        tag: "Workflow Wireframes"
      },
      {
        src: "/case-connect.png",
        caption: "Child-centered teletherapy session: empowering children to build trust and engage naturally with specialists.",
        tag: "Clinical Experience"
      }
    ]
  },
  {
    slug: 'ueno-loans',
    kicker: "ueno bank · Loans & Behavioral Design · 2025–2026",
    title: "ueno bank: Loans",
    subtitle: "Diagnosing loan funnel drop-off and driving conversion through comparative usability testing and behavioral science experimentation across customer segments.",
    impact: "Usability Testing & Behavioral Experiments · Multi-Segment Conversion",
    image: "/ueno-cover.png",
    liveUrl: "https://www.ueno.com.py/",
    galleryTitle: "A Visual Story",
    sections: {
      challenge: "The Loans team at ueno bank identified a low conversion rate in the loan application journey. Many users entered the loan simulation, but only a small proportion moved forward to complete an application. The team needed to understand where users were dropping off, what was preventing them from progressing, and which opportunities could help improve conversion.",
      objectives: [
        "Diagnose end-to-end drop-off by triangulating Amplitude funnels, CSAT metrics, and CX tickets",
        "Conduct comparative usability testing evaluating both the current flow and an iterated flow with the same user sample",
        "Design a randomized behavioral experiment testing cognitive framing principles (Social Norm, Exclusivity, Loss Aversion, Control)",
        "Measure both top-of-funnel engagement (open rates) and downstream business conversion (completed applications and renewals) in Amplitude"
      ],
      whatIDid: [
        "Mapped funnel telemetry in Amplitude across Base, Plus, Black, and Executive segments, locating peak drop-offs during simulation (58% drop) and data review (92% drop).",
        "Triangulated quantitative funnel data with Qualtrics CSAT health metrics and CX support tickets, distinguishing system bugs from financial terms comprehension barriers.",
        "Conducted qualitative usability testing evaluating both the current live simulation flow and an iterated prototype within the exact same participant sample across all four segments.",
        "Formulated a behavioral science experiment via push notifications testing four psychological angles: Control (standard offer), Social Norm (peer adoption proof), Exclusivity (pre-approved status), and Loss Aversion (avoiding missed terms).",
        "Connected experimental assignments to user IDs in Amplitude, tracking both immediate notification open rates and downstream loan applications and renewals under statistical significance criteria."
      ],
      whatWeLearned: [
        "Testing both the current flow and the iterated flow with the same sample proved that clarifying total repayment and simplifying installment toggles immediately removed cognitive hesitation.",
        "The behavioral experiment confirmed that one-size-fits-all messaging fails: distinct psychological drivers activated distinct customer segments.",
        "Social Norm generated the highest open rate for Base and Plus users, effectively normalizing credit evaluation and lowering psychological resistance.",
        "Exclusivity achieved the strongest open rate in the affluent Black tier, where pre-approved recognition and selective access resonated most.",
        "Crucially in the Plus segment, initial behavioral engagement translated into bottom-of-funnel business results: Social Norm produced the highest rate of completed loan applications and renewals."
      ],
      results: "The combination of diagnostic analytics, comparative usability testing (current vs. iterated flow), and behavioral science experimentation gave ueno bank an empirical roadmap to unlock lending growth. By demonstrating that Social Norm messaging drove both higher open rates and completed loan originations in core segments, the research replaced organizational assumptions with validated behavioral strategy."
    },
    tags: ["Funnel analytics (Amplitude)", "CX & CSAT diagnosis", "Usability testing (current vs iterated)", "Behavioral experimentation", "Segmented decision architecture"],
    galleryImages: [
      {
        src: "/ueno-amplitude-funnel.png",
        caption: "Amplitude funnel analysis: 100,000 viewed loan section → 42,000 started simulation (58% drop-off) → 9,600 started data review (77.1% drop-off) → 768 submitted loan application (92% final drop-off). Total conversion: 0.77%.",
        tag: "Amplitude Funnel"
      },
      {
        src: "/ueno-csat-metrics.png",
        caption: "Qualtrics Health Metrics: Product and service customer satisfaction trends (Q4 2025 - Q2 2026). Dúo Card CSAT reached 4.49, while Loans and TED highlighted crucial opportunity areas for UX optimization.",
        tag: "Health Metrics (CSAT)"
      },
      {
        src: "/ueno-loan-demand-trends.png",
        caption: "Customer feedback trends on product availability: Loan requests surged to 58% in Q2 2026 compared to credit cards (27%), highlighting strong latent borrower demand blocked by funnel friction.",
        tag: "Feedback & Demand"
      },
      {
        src: "/assets/cases/p064.png",
        caption: "Dual-workstream methodological framework: diagnostic UX evaluation and usability testing on current vs. iterated flows, conducted alongside the behavioral messaging experiment.",
        tag: "Dual Workstreams"
      },
      {
        src: "/assets/cases/p065.png",
        caption: "Comparative usability evaluation of the 'Mini Loan' simulator: testing the current flow vs. an iterated flow with the exact same participant sample across Base, Plus, Black, and Executive segments.",
        tag: "Usability Testing"
      },
      {
        src: "/ueno-push-variants.png",
        caption: "Behavioral push notification experiment testing cognitive biases: Control (standard availability), Social Norm ('More and more customers...'), Exclusivity ('Exclusive pre-approved offer...'), and Loss Aversion ('Don't miss the chance...').",
        tag: "Behavioral Variants"
      },
      {
        src: "/assets/cases/p069.png",
        caption: "Open rate performance by segment: Social Norm achieved the highest open rate across Base and Plus tiers, while Exclusivity proved most effective for Black tier customers.",
        tag: "Segment Engagement"
      },
      {
        src: "/assets/cases/p070.png",
        caption: "Beyond open rates: in the Plus segment, the Social Norm variant generated the highest observed rate of completed loan applications and renewals in Amplitude.",
        tag: "Business Conversion"
      }
    ]
  },
  {
    slug: 'ueno-upay',
    kicker: "ueno bank · Upay · 2026",
    title: "ueno bank: Upay",
    subtitle: "Using product analytics and generative field research to understand merchant checkout behavior and rethink the subscription value proposition.",
    impact: "Product Analytics & Generative Field Research · From POS Distribution to Recurring Usage",
    image: "/upay-cover.jpg",
    detailImage: "/upay-pos-cover.png",
    liveUrl: "https://upay.com.py",
    galleryTitle: "A Visual Story",
    sections: {
      challenge: "Upay had distributed POS terminals to independent merchants, small businesses (PYMEs), and larger commercial networks. However, product analytics revealed a stark gap: while terminals were physically present, many merchants processed few or no transactions, with volume concentrated in a small minority. As the bank prepared a hardware terminal upgrade and the introduction of a tiered monthly subscription model (Base, Pro, Enterprise), the product team needed to uncover what truly drove merchant provider choice at the checkout counter.",
      objectives: [
        "Analyze transaction frequency and monetary volume across merchant segments using Amplitude",
        "Conduct in-person field interviews and contextual observation across merchant counters in Asunción",
        "Map the end-to-end service journey and technical touchpoints in a comprehensive service blueprint",
        "Evaluate merchant willingness to pay for tiered subscriptions and define a recurring adoption measurement framework"
      ],
      whatIDid: [
        "Segmented merchant transaction activity in Amplitude across Q1–Q2 2026, distinguishing active, light, heavy, and dormant users among autonomous workers, retail businesses, and multi-location operations.",
        "Conducted contextual field research and in-person interviews across Asunción businesses, directly observing checkout payment dynamics and physical POS counter positioning.",
        "Co-created an end-to-end Figma Service Blueprint spanning 6 operational stages: Awareness, Pre-Sale Agreement, Onboarding, Integration & Delivery, First Use, and Post-Transaction Reconciliation.",
        "Mapped detailed merchant archetypes (Farmacias with multi-cashier cash wheels, Feriantes, Kioskos, and Hipermercados) and facilitated workshops addressing default incumbent terminal displacement.",
        "Evaluated merchant perception of the web portal and synthesized counter friction risks (terminal latency, card rejections, tipping leakage, and QR interoperability)."
      ],
      whatWeLearned: [
        "Terminal distribution did not equal terminal adoption: merchants progressed through distinct stages (Availability → Activation → Recurring Usage → Primary Usage).",
        "Merchants prioritized completing the sale above provider loyalty: counter choices were governed by device reliability, promotions, customer bank preferences, and QR interoperability.",
        "'Principality' was an internal expectation rather than a merchant reality: merchants kept competing POS terminals side-by-side to ensure zero missed transactions.",
        "A monthly subscription was viable only with tangible business upside: without differentiated promotional power or clear fee offsets, standalone terminal fees faced merchant resistance.",
        "The web portal served only a partial slice of merchant operations: merchants sought unified multi-provider reconciliation rather than an isolated terminal report."
      ],
      results: "The research fundamentally reoriented Upay's commercial and product strategy from terminal distribution to recurring merchant usage. By grounding the tiered subscription model in field realities and establishing an empirical measurement framework (tracking activation velocity, plan retention, and checkout share), the team shifted focus to the operational conditions that actually make merchants choose Upay at the counter."
    },
    tags: ["Product analytics (Amplitude)", "Generative field research", "Figma service blueprint", "Merchant adoption framework", "Subscription design"],
    galleryImages: [
      {
        src: "/upay-qr-checkout.png",
        caption: "In-store checkout reality: merchants balancing customer QR smartphone scanning and physical POS hardware at the point of sale.",
        tag: "Field Observation"
      },
      {
        src: "/upay-subscription-plans.png",
        caption: "Upay tiered monthly subscription plans (Upay Base, Upay Pro, and Upay Enterprise) tested with merchants to evaluate willingness to pay.",
        tag: "Subscription Plans"
      },
      {
        src: "/upay-org-structure.png",
        caption: "Figma Service Blueprint: Organizational hierarchy and operational touchpoints connecting merchant roles (Owner, Supervisor, Cashier) with bank infrastructure (Sales, Ops, ITTI).",
        tag: "Service Blueprint"
      },
      {
        src: "/upay-service-stages.png",
        caption: "6 Service Blueprint Stages: 1. Awareness, 2. Pre-Sale Agreement, 3. Onboarding, 4. Integration & Delivery, 5. First Use, and 6. Reconciliation.",
        tag: "Service Stages"
      },
      {
        src: "/upay-first-transaction-flow.png",
        caption: "Detailed 'First Transaction' (Primer Transacción) cashier workflow and operational fallback logic at the payment counter.",
        tag: "Transaction Flow"
      },
      {
        src: "/upay-merchant-pharmacy.png",
        caption: "Merchant Archetype: Farmacia (medium business, multi-register structure, financial cash wheel, and reconciliation needs).",
        tag: "Merchant Profile"
      },
      {
        src: "/assets/cases/p084.png",
        caption: "Merchant Profiles: Feriante (street vendor), Kiosko (corner store), and Retailer: Hipermercado.",
        tag: "Segmentation"
      },
      {
        src: "/assets/cases/p086.png",
        caption: "Collaborative workshop on checkout counter placement: Bancard as default incumbent vs. Upay positioning.",
        tag: "Counter Dynamics"
      },
      {
        src: "/assets/cases/p089.png",
        caption: "4 Stages of Product Adoption Model: Availability -> Activation -> Recurring Usage -> Primary Usage.",
        tag: "Adoption Model"
      },
      {
        src: "/assets/cases/p091.png",
        caption: "Risk and Impact Matrix: Classifying card rejection, duplicated charges, lack of promotions, hibernation lag, and tipping leakage.",
        tag: "Risk Matrix"
      },
      {
        src: "/upay-product-catalog.png",
        caption: "Product catalog matrix by subscription tier: feature availability across In-App, standalone POS, dynamic QR, and value-added VAS services.",
        tag: "Product Catalog"
      },
      {
        src: "/upay-counter-reality.png",
        caption: "Counter reality captured during Asunción field research: multiple competing POS terminals (Bancard, Upay, Dinelco) positioned side-by-side on the cashier counter.",
        tag: "Field Evidence"
      }
    ]
  },
];
