import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyData } from '../types/portfolio';
import { EditableProjectTags } from './EditableProjectTags';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudyData[];
  onSelectProject: (slug: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
  onSelectProject,
}) => {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 pt-4 pb-16 md:pt-6 md:pb-24 scroll-mt-20">
      <div className="border-t border-border/40 pt-10 md:pt-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Featured Portfolio
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Case studies
          </h2>
          <p className="mt-1 text-muted-foreground">
            {caseStudies.length} selected projects
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-12 sm:grid-cols-2 md:gap-14">
        {caseStudies.map((project) => (
          <article key={project.slug} className="group flex flex-col">
            {/* Visual Cover Container */}
            <button
              onClick={() => onSelectProject(project.slug)}
              aria-label={`Open case study: ${project.title}`}
              className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-border text-left cursor-pointer ${
                project.slug === 'connect-teletherapy' ? 'bg-white' : 'bg-muted'
              }`}
            >
              <img
                src={project.image}
                alt={`Cover image for ${project.title}`}
                className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                  project.slug === 'connect-teletherapy'
                    ? 'object-contain p-8'
                    : 'object-cover'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 shadow-sm">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>

            {/* Title */}
            <h3
              onClick={() => onSelectProject(project.slug)}
              className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors cursor-pointer"
            >
              {project.title}
            </h3>

            {/* Subtitle / Lead */}
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {project.subtitle}
            </p>

            {/* Read Case Study Link */}
            <button
              onClick={() => onSelectProject(project.slug)}
              className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer"
            >
              <span>Read case study</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* Editable Tags / Methodologies Component */}
            <EditableProjectTags
              slug={project.slug}
              defaultTags={project.tags}
            />
          </article>
        ))}
      </div>
    </section>
  );
};
