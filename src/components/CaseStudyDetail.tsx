import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Play,
} from 'lucide-react';
import { CaseStudyData } from '../types/portfolio';
import { getAssetUrl } from '../utils/assetUrl';

interface CaseStudyDetailProps {
  caseStudy: CaseStudyData;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
  prevCaseStudy?: CaseStudyData;
  nextCaseStudy?: CaseStudyData;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  caseStudy,
  onBack,
  onSelectProject,
  prevCaseStudy,
  nextCaseStudy,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const galleryList = caseStudy.galleryImages || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const originalTitle = document.title;
    document.title = `${caseStudy.title} — Gastón Perazzo`;
    return () => {
      document.title = originalTitle;
    };
  }, [caseStudy.slug, caseStudy.title]);

  // Reset lightbox when switching case studies
  useEffect(() => {
    setActiveLightboxIndex(null);
  }, [caseStudy.slug]);

  // Handle ESC / arrow keys for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (activeLightboxIndex !== null && galleryList.length > 0) {
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
              src={getAssetUrl(caseStudy.detailImage || caseStudy.image)}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />
            <img
              src={getAssetUrl(caseStudy.detailImage || caseStudy.image)}
              alt={`Cover image for ${caseStudy.title}`}
              className="relative z-10 h-full max-h-[440px] sm:max-h-[500px] w-auto object-contain rounded-xl shadow-2xl py-3 px-4 drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={getAssetUrl(caseStudy.detailImage || caseStudy.image)}
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

          {/* 3. What I did */}
          <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              What I did
            </h2>
            <div className="mt-5 max-w-2xl md:mt-0">
              <ul className="space-y-4">
                {caseStudy.sections.whatIDid.map((item, idx) => (
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

          {/* 5. Results */}
          <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Results
            </h2>
            <div className="mt-5 max-w-2xl md:mt-0">
              <div className="space-y-4 text-lg leading-relaxed text-foreground whitespace-pre-line">
                {caseStudy.sections.results}
              </div>
            </div>
          </section>
        </div>

        {/* Tags / Methodologies */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag, idx) => (
            <li
              key={idx}
              className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Authentic Visual Evidence & Presentation Slides Gallery */}
        {galleryList.length > 0 && (
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryList.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all cursor-pointer aspect-video"
                  onClick={() => setActiveLightboxIndex(idx)}
                >
                  <img
                    src={getAssetUrl(img.src)}
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
        if (activeLightboxIndex === null || !galleryList[activeLightboxIndex]) {
          return null;
        }
        const activeItem = galleryList[activeLightboxIndex];
        const youtubeId = activeItem.videoUrl?.includes('v=')
          ? activeItem.videoUrl.split('v=')[1]?.split('&')[0]
          : null;

        return (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-mono">
                Slide {activeLightboxIndex + 1} of {galleryList.length}
              </span>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-2 max-h-[85vh]">
              <button
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + galleryList.length) % galleryList.length
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
                    title={activeItem.caption || `Slide ${activeLightboxIndex + 1}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={getAssetUrl(activeItem.src)}
                  alt={activeItem.caption || `Slide ${activeLightboxIndex + 1}`}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              )}

              <button
                onClick={() =>
                  setActiveLightboxIndex((activeLightboxIndex + 1) % galleryList.length)
                }
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="h-4" aria-hidden="true" />
          </div>
        );
      })()}
    </main>
  );
};
