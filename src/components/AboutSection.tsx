import React from 'react';
import { MapPin } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="border-t border-border bg-secondary/40 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          {/* Portrait Image & Quick Meta */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={personalProfile.portraitImage}
                alt={`Portrait of ${personalProfile.name}`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Parque Chas, Buenos Aires, Argentina</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Available for remote &amp; hybrid roles worldwide
            </p>
          </div>

          {/* Bio & Details */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              About me
            </h2>

            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              {personalProfile.aboutBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* How I can help */}
            <h3 className="mt-12 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              How I can help
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {personalProfile.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h4 className="font-medium text-foreground">{cap.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <h3 className="mt-12 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Experience
            </h3>
            <ul className="mt-6 space-y-6">
              {personalProfile.experience.map((item, idx) => (
                <li
                  key={idx}
                  className="experience-item group grid gap-1 border-l-2 border-border pl-5 sm:grid-cols-[160px_1fr] sm:gap-4 hover:border-primary transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold text-primary">
                    {item.period}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.role}{' '}
                      <span className="text-muted-foreground font-normal">
                        · {item.company}
                      </span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
