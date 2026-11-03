import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContact }) => {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-8 md:pt-28 md:pb-10 scroll-mt-20">
      <div className="max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.12]">
          {personalProfile.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {personalProfile.subheadline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreWork}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105 cursor-pointer shadow-sm"
          >
            <span>View case studies</span>
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary cursor-pointer"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <dl className="mt-20 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
        {personalProfile.stats.map((stat, idx) => (
          <div key={idx}>
            <dt className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {stat.value}
            </dt>
            <dd className="mt-2 text-sm font-medium text-foreground">
              {stat.label}
            </dd>
            <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
};
