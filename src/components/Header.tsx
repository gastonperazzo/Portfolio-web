import React from 'react';
import { ThemePaletteSwitcher } from './ThemePaletteSwitcher';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          className="flex flex-col leading-tight cursor-pointer group"
        >
          <span className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Gastón Perazzo
          </span>
          <span className="text-xs text-muted-foreground">
            UX &amp; Product Research Specialist
          </span>
        </a>

        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4 sm:gap-6 text-sm">
            <li>
              <a
                href="/#work"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection('work');
                }}
                className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Case Studies
              </a>
            </li>
            <li>
              <a
                href="/#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection('about');
                }}
                className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                About me
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection('contact');
                }}
                className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>

          <ThemePaletteSwitcher />
        </nav>
      </div>
    </header>
  );
};
