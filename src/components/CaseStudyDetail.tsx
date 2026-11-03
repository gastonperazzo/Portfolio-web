import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Edit3,
  Check,
  RotateCcw,
  Copy,
  MoveLeft,
  MoveRight,
  Play,
  Trash2,
} from 'lucide-react';
import { CaseStudyData } from '../types/portfolio';
import { WhatIDidSection } from './WhatIDidSection';
import { ResultsSection } from './ResultsSection';
import { EditableProjectTags } from './EditableProjectTags';

interface CaseStudyDetailProps {
  caseStudy: CaseStudyData;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
  prevCaseStudy?: CaseStudyData;
  nextCaseStudy?: CaseStudyData;
}

interface GalleryImage {
  src: string;
  caption: string;
  tag?: string;
  videoUrl?: string;
}

const SPANISH_TO_ENGLISH_CAPTIONS: Record<string, { caption: string; tag?: string }> = {
  '/ueno-amplitude-funnel.png': {
    caption:
      'Amplitude funnel analysis: 100,000 viewed loan section → 42,000 started simulation (58% drop-off) → 9,600 started data review (77.1% drop-off) → 768 submitted loan application (92% final drop-off). Total conversion: 0.77%.',
    tag: 'Amplitude Funnel',
  },
  '/ueno-csat-metrics.png': {
    caption:
      'Qualtrics Health Metrics: Product and service customer satisfaction trends (Q4 2025 - Q2 2026). Dúo Card CSAT reached 4.49, while Loans and TED highlighted crucial opportunity areas for UX optimization.',
    tag: 'Health Metrics (CSAT)',
  },
  '/ueno-loan-demand-trends.png': {
    caption:
      'Customer feedback trends on product availability: Loan requests surged to 58% in Q2 2026 compared to credit cards (27%), highlighting strong latent borrower demand blocked by funnel friction.',
    tag: 'Feedback & Demand',
  },
  '/assets/cases/p064.png': {
    caption:
      'Dual-workstream methodological framework: diagnostic UX evaluation and usability testing on current vs. iterated flows, conducted alongside the behavioral messaging experiment.',
    tag: 'Dual Workstreams',
  },
  '/assets/cases/p065.png': {
    caption:
      "Comparative usability evaluation of the 'Mini Loan' simulator: testing the current flow vs. an iterated flow with the exact same participant sample across Base, Plus, Black, and Executive segments.",
    tag: 'Usability Testing',
  },
  '/ueno-push-variants.png': {
    caption:
      "Behavioral push notification experiment testing cognitive biases: Control (standard availability), Social Norm ('More and more customers...'), Exclusivity ('Exclusive pre-approved offer...'), and Loss Aversion ('Don't miss the chance...').",
    tag: 'Behavioral Variants',
  },
  '/assets/cases/p069.png': {
    caption:
      'Open rate performance by segment: Social Norm achieved the highest open rate across Base and Plus tiers, while Exclusivity proved most effective for Black tier customers.',
    tag: 'Segment Engagement',
  },
  '/assets/cases/p070.png': {
    caption:
      'Beyond open rates: in the Plus segment, the Social Norm variant generated the highest observed rate of completed loan applications and renewals in Amplitude.',
    tag: 'Business Conversion',
  },
  '/upay-qr-checkout.png': {
    caption:
      'In-store checkout reality: merchants balancing customer QR smartphone scanning and physical POS hardware at the point of sale.',
    tag: 'Field Observation',
  },
  '/upay-subscription-plans.png': {
    caption:
      'Upay tiered monthly subscription plans (Upay Base, Upay Pro, and Upay Enterprise) tested with merchants to evaluate willingness to pay.',
    tag: 'Subscription Plans',
  },
  '/upay-org-structure.png': {
    caption:
      'Figma Service Blueprint: Organizational hierarchy and operational touchpoints connecting merchant roles (Owner, Supervisor, Cashier) with bank infrastructure (Sales, Ops, ITTI).',
    tag: 'Service Blueprint',
  },
  '/upay-service-stages.png': {
    caption:
      '6 Service Blueprint Stages: 1. Awareness, 2. Pre-Sale Agreement, 3. Onboarding, 4. Integration & Delivery, 5. First Use, and 6. Reconciliation.',
    tag: 'Service Stages',
  },
  '/upay-first-transaction-flow.png': {
    caption:
      "Detailed 'First Transaction' (Primer Transacción) cashier workflow and operational fallback logic at the payment counter.",
    tag: 'Transaction Flow',
  },
  '/upay-merchant-pharmacy.png': {
    caption:
      'Merchant Archetype: Farmacia (medium business, multi-register structure, financial cash wheel, and reconciliation needs).',
    tag: 'Merchant Profile',
  },
  '/upay-product-catalog.png': {
    caption:
      'Product catalog matrix by subscription tier: feature availability across In-App, standalone POS, dynamic QR, and value-added VAS services.',
    tag: 'Product Catalog',
  },
  '/upay-counter-reality.png': {
    caption:
      'Counter reality captured during Asunción field research: multiple competing POS terminals (Bancard, Upay, Dinelco) positioned side-by-side on the cashier counter.',
    tag: 'Field Evidence',
  },
};

const UPAY_OLD_TO_NEW_SRC: Record<string, string> = {
  '/assets/cases/p073.png': '/upay-qr-checkout.png',
  '/assets/cases/p074.png': '/upay-subscription-plans.png',
  '/assets/cases/p079.png': '/upay-org-structure.png',
  '/assets/cases/p080.png': '/upay-service-stages.png',
  '/assets/cases/p081.png': '/upay-first-transaction-flow.png',
  '/assets/cases/p083.png': '/upay-merchant-pharmacy.png',
  '/assets/cases/p094.png': '/upay-product-catalog.png',
  '/assets/cases/p096.png': '/upay-counter-reality.png',
};

const resolveGalleryList = (
  slug: string,
  defaults: GalleryImage[]
): GalleryImage[] => {
  if (typeof window === 'undefined') return defaults;
  const saved = localStorage.getItem(`gallery_${slug}`);
  if (!saved) return defaults;

  try {
    const parsed: GalleryImage[] = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) return defaults;

    const defaultsBySrc = new Map(defaults.map((img) => [img.src, img]));
    let hasChanges = false;

    const updated = parsed.map((item) => {
      let currentSrc = item.src;
      if (UPAY_OLD_TO_NEW_SRC[currentSrc]) {
        currentSrc = UPAY_OLD_TO_NEW_SRC[currentSrc];
        hasChanges = true;
      }

      const translation = SPANISH_TO_ENGLISH_CAPTIONS[currentSrc] || defaultsBySrc.get(currentSrc);
      const text = `${item.caption || ''} ${item.tag || ''}`;
      const isSpanish =
        /[áéíóúñÁÉÍÓÚÑ]/i.test(text) ||
        /(Análisis|abandono|Evolución|Estrategia|Evaluación|Experimento|Resultados|Más allá|Demanda|Pruebas|Variantes|Conductuales|Conversión|disponibilidad|Norma Social|Aversión|Estructura|Etapas|Primer|Catálogo|Nuestros planes|Falta de oferta)/i.test(
          text
        );

      if (translation && (isSpanish || currentSrc !== item.src)) {
        hasChanges = true;
        return {
          ...item,
          src: currentSrc,
          caption: translation.caption,
          tag: translation.tag || item.tag,
        };
      }
      return currentSrc !== item.src ? { ...item, src: currentSrc } : item;
    });

    if (hasChanges) {
      try {
        localStorage.setItem(`gallery_${slug}`, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    return updated;
  } catch {
    return defaults;
  }
};

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  caseStudy,
  onBack,
  onSelectProject,
  prevCaseStudy,
  nextCaseStudy,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Editable gallery list with localStorage persistence per case study slug
  const [galleryList, setGalleryList] = useState<GalleryImage[]>(() => {
    return resolveGalleryList(caseStudy.slug, caseStudy.galleryImages || []);
  });

  // Check if editor controls should be visible:
  // Enabled if URL has ?edit=true, or #edit, or if unlocked via Ctrl+Shift+E, or saved in localStorage
  const [editorUnlocked, setEditorUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return (
      urlParams.get('edit') === 'true' ||
      window.location.hash.includes('edit') ||
      localStorage.getItem('editor_unlocked') === 'true'
    );
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Enable Ctrl+Shift+E shortcut to unlock/lock editor access for owner
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setEditorUnlocked((prev) => {
          const nextState = !prev;
          try {
            localStorage.setItem('editor_unlocked', String(nextState));
          } catch {
            // ignore
          }
          if (!nextState) setIsEditMode(false);
          return nextState;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const originalTitle = document.title;
    document.title = `${caseStudy.title} — Gastón Perazzo`;
    return () => {
      document.title = originalTitle;
    };
  }, [caseStudy.slug, caseStudy.title]);

  // Sync gallery list if caseStudy prop changes
  useEffect(() => {
    setGalleryList(resolveGalleryList(caseStudy.slug, caseStudy.galleryImages || []));
  }, [caseStudy.slug, caseStudy.galleryImages]);

  const saveGalleryList = (newList: typeof galleryList) => {
    setGalleryList(newList);
    try {
      localStorage.setItem(`gallery_${caseStudy.slug}`, JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  const handleUpdateItem = (index: number, field: 'tag' | 'caption', value: string) => {
    const updated = [...galleryList];
    updated[index] = { ...updated[index], [field]: value };
    saveGalleryList(updated);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === galleryList.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...galleryList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    saveGalleryList(updated);
  };

  const handleDeleteItem = (index: number) => {
    if (galleryList.length <= 1) return;
    const updated = galleryList.filter((_, i) => i !== index);
    saveGalleryList(updated);
  };

  const handleResetDefaults = () => {
    try {
      localStorage.removeItem(`gallery_${caseStudy.slug}`);
    } catch {
      // ignore
    }
    setGalleryList(caseStudy.galleryImages || []);
  };

  const handleCopyCode = () => {
    const jsonStr = JSON.stringify(galleryList, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  // Handle ESC / arrow keys for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (activeLightboxIndex !== null && galleryList) {
        if (e.key === 'ArrowRight') {
          setActiveLightboxIndex((activeLightboxIndex + 1) % galleryList.length);
        }
        if (e.key === 'ArrowLeft') {
          setActiveLightboxIndex(
            (activeLightboxIndex - 1 + galleryList.length) % galleryList.length
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, galleryList]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-8 md:pt-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to case studies</span>
        </button>

        {/* Top Header Split */}
        <div className="mt-10">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {caseStudy.kicker}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {caseStudy.title}
          </h1>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] md:items-stretch">
            <div className="flex flex-col justify-between gap-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {caseStudy.subtitle}
              </p>

              {caseStudy.liveUrl && (
                <div>
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 cursor-pointer"
                  >
                    <Globe className="h-4 w-4" />
                    <span>
                      Visit official portal ({(() => {
                        try {
                          return new URL(caseStudy.liveUrl).hostname.replace('www.', '');
                        } catch {
                          return 'website';
                        }
                      })()})
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                Impact
              </p>
              <p className="mt-2 text-xl lg:text-2xl font-bold tracking-tight text-foreground leading-snug">
                {caseStudy.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        {caseStudy.slug === 'ueno-upay' ? (
          <div className="relative mt-12 h-[460px] sm:h-[540px] overflow-hidden rounded-2xl border border-border bg-card/80 flex items-center justify-center">
            {/* Ambient blurred backdrop */}
            <img
              src={caseStudy.detailImage || caseStudy.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />
            <img
              src={caseStudy.detailImage || caseStudy.image}
              alt={`Cover image for ${caseStudy.title}`}
              className="relative z-10 h-full max-h-[440px] sm:max-h-[500px] w-auto object-contain rounded-xl shadow-2xl py-3 px-4 drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={caseStudy.detailImage || caseStudy.image}
              alt={`Cover image for ${caseStudy.title}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Structured Sections */}
        <div className="mt-16">
          {/* 1. The challenge */}
          <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              The challenge
            </h2>
            <div className="mt-5 max-w-2xl md:mt-0">
              <p className="text-lg leading-relaxed text-foreground">
                {caseStudy.sections.challenge}
              </p>
            </div>
          </section>

          {/* 2. Objectives */}
          <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Objectives
            </h2>
            <div className="mt-5 max-w-2xl md:mt-0">
              <ul className="grid gap-3 sm:grid-cols-2">
                {caseStudy.sections.objectives.map((obj, idx) => (
                  <li
                    key={idx}
                    className="rounded-lg bg-muted px-4 py-3 text-sm leading-relaxed text-foreground"
                  >
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. What I did (Editable Component) */}
          <WhatIDidSection
            slug={caseStudy.slug}
            defaultItems={caseStudy.sections.whatIDid}
            editorUnlocked={editorUnlocked}
          />

          {/* 4. What we learned */}
          <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              What we learned
            </h2>
            <div className="mt-5 max-w-2xl md:mt-0">
              <ul className="space-y-4">
                {caseStudy.sections.whatWeLearned.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-base leading-relaxed text-foreground"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    ></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 5. Results (Editable Component) */}
          <ResultsSection
            slug={caseStudy.slug}
            defaultResult={caseStudy.sections.results}
            editorUnlocked={editorUnlocked}
          />
        </div>

        {/* Editable Tags / Methodologies */}
        <EditableProjectTags
          slug={caseStudy.slug}
          defaultTags={caseStudy.tags}
          className="mt-8"
        />

        {/* Authentic Visual Evidence & Presentation Slides Gallery */}
        {galleryList && galleryList.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {caseStudy.galleryTitle || 'A Visual Story'}
                </h2>
                <span className="text-xs text-muted-foreground font-mono">
                  {galleryList.length} Slides
                </span>
              </div>

              {editorUnlocked && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      isEditMode
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditMode ? 'Done Editing' : 'Edit Slides & Captions'}</span>
                  </button>

                  {isEditMode && (
                    <>
                      <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        title="Copy JSON configuration"
                      >
                        {copiedSuccess ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSuccess ? 'Copied!' : 'Copy Config'}</span>
                      </button>

                      <button
                        onClick={handleResetDefaults}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Reset slides to original default"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {isEditMode && (
              <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">💡 Live Slide Editor Active</p>
                <p className="mt-0.5">
                  You can edit the Tag and Description for any slide directly below. Use the ← → arrows to reorder slides. Changes save automatically to your browser.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryList.map((img: GalleryImage, idx: number) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl border bg-card transition-all ${
                    isEditMode ? 'border-primary/50 p-3 shadow-md' : 'border-border cursor-pointer aspect-video'
                  }`}
                >
                  {!isEditMode ? (
                    <div onClick={() => setActiveLightboxIndex(idx)} className="relative w-full h-full">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {img.videoUrl ? (
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="p-3.5 rounded-full bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                          <span className="p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                          </span>
                        </div>
                      )}
                      {img.tag && (
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 text-[10px] font-mono text-white bg-black/70 rounded">
                            {img.tag}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent text-[11px] text-white/90 line-clamp-1">
                        {img.caption}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Image Preview & Order Controls */}
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                        <img
                          src={img.src}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-black/80 text-white rounded">
                          Slide {idx + 1} of {galleryList.length}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 p-1 rounded">
                          <button
                            onClick={() => handleMoveItem(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            title="Move left/up"
                          >
                            <MoveLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveItem(idx, 'down')}
                            disabled={idx === galleryList.length - 1}
                            className="p-1 rounded text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            title="Move right/down"
                          >
                            <MoveRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(idx)}
                            className="p-1 rounded text-red-400 hover:bg-red-500/20 cursor-pointer ml-1"
                            title="Delete slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Editable Tag */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                          Tag / Badge
                        </label>
                        <input
                          type="text"
                          value={img.tag || ''}
                          onChange={(e) => handleUpdateItem(idx, 'tag', e.target.value)}
                          placeholder="e.g. Ministry Presentation"
                          className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                        />
                      </div>

                      {/* Editable Caption */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                          Description / Caption
                        </label>
                        <textarea
                          rows={2}
                          value={img.caption || ''}
                          onChange={(e) => handleUpdateItem(idx, 'caption', e.target.value)}
                          placeholder="Enter caption for this slide..."
                          className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none resize-y"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Explore More Work / Adjacent Project Navigation */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-border pt-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            <span>Explore more work</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4 text-sm">
            {prevCaseStudy && (
              <button
                onClick={() => onSelectProject(prevCaseStudy.slug)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                ← {prevCaseStudy.title}
              </button>
            )}
            {nextCaseStudy && (
              <button
                onClick={() => onSelectProject(nextCaseStudy.slug)}
                className="text-primary hover:underline transition-colors cursor-pointer"
              >
                {nextCaseStudy.title} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {(() => {
        const gallery = galleryList;
        if (activeLightboxIndex === null || !gallery || !gallery[activeLightboxIndex]) {
          return null;
        }
        const activeItem = gallery[activeLightboxIndex];
        const youtubeId = activeItem.videoUrl?.includes('v=')
          ? activeItem.videoUrl.split('v=')[1]?.split('&')[0]
          : null;

        return (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-mono">
                Slide {activeLightboxIndex + 1} of {gallery.length}
              </span>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-2 max-h-[80vh]">
              <button
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + gallery.length) % gallery.length
                  )
                }
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {youtubeId ? (
                <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={activeItem.caption}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.caption}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              )}

              <button
                onClick={() =>
                  setActiveLightboxIndex((activeLightboxIndex + 1) % gallery.length)
                }
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-2xl mx-auto text-center text-white/90 text-xs sm:text-sm bg-black/40 backdrop-blur-md py-3 px-6 rounded-xl border border-white/10">
              {activeItem.tag && (
                <span className="inline-block text-[10px] font-mono font-bold text-primary uppercase mr-2">
                  [{activeItem.tag}]
                </span>
              )}
              <span>{activeItem.caption}</span>
            </div>
          </div>
        );
      })()}
    </main>
  );
};

