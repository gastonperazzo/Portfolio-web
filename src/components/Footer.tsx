import React from 'react';
import { ArrowUpRight, ArrowUp, MapPin, Mail, Phone } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

interface FooterProps {
  onBackToTop?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer id="contact" className="border-t border-border bg-card/40 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span>Available for remote &amp; hybrid roles worldwide</span>
          </div>
        </div>

        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Have a research challenge? I'd love to hear about it.
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={personalProfile.gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-105 cursor-pointer shadow-sm"
            title="Send email via Gmail"
          >
            <Mail className="h-4 w-4" />
            <span>{personalProfile.email}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a
            href={personalProfile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary cursor-pointer"
            title="Chat on WhatsApp"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>{personalProfile.phone}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>

        {/* Contact & Location Detail Grid */}
        <ul className="mt-14 grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-3">
          {/* Location */}
          <li className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Location</span>
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">
              {personalProfile.location}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Argentina · GMT-3 (ART)
            </p>
          </li>

          {/* LinkedIn */}
          <li className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
            <a
              href={personalProfile.linkedinUrl}
              className="group flex flex-col h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                /in/gaston-perazzo
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Connect &amp; network
              </p>
            </a>
          </li>

          {/* Direct Email */}
          <li className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
            <a
              href={personalProfile.gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full"
            >
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span>Email (Gmail)</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {personalProfile.email}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Compose in Gmail
              </p>
            </a>
          </li>
        </ul>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Located in Buenos Aires, Argentina · Working globally</span>
          </div>
          <div className="flex items-center gap-6">
            <span>© 2026 Gastón Perazzo. All rights reserved.</span>
            {onBackToTop && (
              <button
                onClick={onBackToTop}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title="Back to top"
              >
                <span>Top</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
