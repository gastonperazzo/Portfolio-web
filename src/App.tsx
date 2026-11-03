import React, { useState, useEffect } from 'react';
import { personalProfile, caseStudiesList } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { scrollToElement, scrollToY } from './utils/smoothScroll';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'case-study'>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Always land on Home page when the application mounts / refreshes
  useEffect(() => {
    if (window.location.hash.includes('case-studies')) {
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch {
        // ignore
      }
    }

    setActiveView('home');
    setSelectedSlug(null);

    const initialHash = window.location.hash.replace('#', '');
    if (['work', 'about', 'contact'].includes(initialHash)) {
      setTimeout(() => {
        scrollToElement(initialHash, 80, 750);
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }

    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash.startsWith('case-studies/')) {
        const targetSlug = currentHash.replace('case-studies/', '');
        const found = caseStudiesList.find((c) => c.slug === targetSlug);
        if (found) {
          setSelectedSlug(found.slug);
          setActiveView('case-study');
          window.scrollTo(0, 0);
        }
      } else if (['work', 'about', 'contact', 'top'].includes(currentHash)) {
        setActiveView('home');
        setSelectedSlug(null);
        setTimeout(() => {
          scrollToElement(currentHash, 80, 750);
        }, 120);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSelectProject = (slug: string) => {
    setSelectedSlug(slug);
    setActiveView('case-study');
    try {
      history.pushState(null, '', `#case-studies/${slug}`);
    } catch {
      window.location.hash = `case-studies/${slug}`;
    }
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    try {
      history.pushState(null, '', window.location.pathname);
    } catch {
      // ignore
    }

    if (activeView !== 'home') {
      setActiveView('home');
      setSelectedSlug(null);
      setTimeout(() => {
        scrollToY(0, 650);
      }, 50);
    } else {
      scrollToY(0, 650);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'top') {
      handleNavigateHome();
      return;
    }

    try {
      history.pushState(null, '', '#' + sectionId);
    } catch {
      // ignore
    }

    if (activeView !== 'home') {
      setActiveView('home');
      setSelectedSlug(null);
      // Wait for DOM to mount home sections, then smoothly glide to target
      setTimeout(() => {
        scrollToElement(sectionId, 80, 750);
      }, 60);
    } else {
      scrollToElement(sectionId, 80, 750);
    }
  };

  const currentIndex = caseStudiesList.findIndex((c) => c.slug === selectedSlug);
  const selectedCaseStudy = currentIndex >= 0 ? caseStudiesList[currentIndex] : null;
  const prevCaseStudy = currentIndex > 0 ? caseStudiesList[currentIndex - 1] : undefined;
  const nextCaseStudy =
    currentIndex >= 0 && currentIndex < caseStudiesList.length - 1
      ? caseStudiesList[currentIndex + 1]
      : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Top Header */}
      <Header
        onNavigateHome={handleNavigateHome}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main View: Either Individual Case Study Landing or Home */}
      {activeView === 'case-study' && selectedCaseStudy ? (
        <>
          <CaseStudyDetail
            caseStudy={selectedCaseStudy}
            onBack={() => handleNavigateSection('work')}
            onSelectProject={handleSelectProject}
            prevCaseStudy={prevCaseStudy}
            nextCaseStudy={nextCaseStudy}
          />
          <Footer onBackToTop={handleNavigateHome} />
        </>
      ) : (
        <>
          {/* Hero Section */}
          <Hero
            onExploreWork={() => handleNavigateSection('work')}
            onContact={() => handleNavigateSection('contact')}
          />

          {/* Case Studies Section */}
          <CaseStudiesSection
            caseStudies={caseStudiesList}
            onSelectProject={handleSelectProject}
          />

          {/* About Section */}
          <AboutSection />

          {/* Footer Section */}
          <Footer onBackToTop={handleNavigateHome} />
        </>
      )}
    </div>
  );
}
