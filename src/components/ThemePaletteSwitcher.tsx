import React, { useState, useEffect } from 'react';
import { Palette, Check, RotateCcw, X, Moon, Sun } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  group: 'dark' | 'light';
  badge?: string;
  bgHex: string;
  cardHex: string;
  primaryHex: string;
}

export const THEME_PALETTES: ThemeOption[] = [
  // 🌙 MODO OSCURO VARIANTES
  {
    id: 'palette-1',
    name: 'Paleta #1 — Original Gold',
    group: 'dark',
    badge: 'ORIGINAL',
    bgHex: '#151410',
    cardHex: '#1e1d19',
    primaryHex: '#e7a200',
  },
  {
    id: 'palette-2',
    name: 'Paleta #2 — Warm Terracotta',
    group: 'dark',
    bgHex: '#181210',
    cardHex: '#241b18',
    primaryHex: '#f97316',
  },
  {
    id: 'palette-3',
    name: 'Paleta #3 — Slate Sky',
    group: 'dark',
    bgHex: '#0e0f12',
    cardHex: '#181a20',
    primaryHex: '#38bdf8',
  },
  {
    id: 'palette-4',
    name: 'Paleta #4 — Deep Bronze',
    group: 'dark',
    bgHex: '#13110e',
    cardHex: '#1f1c17',
    primaryHex: '#d97706',
  },
  {
    id: 'palette-5',
    name: 'Paleta #5 — Navy Executive',
    group: 'dark',
    bgHex: '#0a0e17',
    cardHex: '#131a29',
    primaryHex: '#6366f1',
  },

  // ☀️ MODO CLARO VARIANTES
  {
    id: 'palette-6',
    name: 'Paleta #6 — Studio Paper Light',
    group: 'light',
    bgHex: '#f8fafc',
    cardHex: '#ffffff',
    primaryHex: '#2563eb',
  },
  {
    id: 'palette-7',
    name: 'Paleta #7 — Warm Sand & Charcoal',
    group: 'light',
    bgHex: '#f7f5f0',
    cardHex: '#ffffff',
    primaryHex: '#1c1917',
  },
  {
    id: 'palette-8',
    name: 'Paleta #8 — Soft Sage Forest',
    group: 'light',
    bgHex: '#f4f6f4',
    cardHex: '#ffffff',
    primaryHex: '#059669',
  },
  {
    id: 'palette-9',
    name: 'Paleta #9 — Warm Ivory Terracotta',
    group: 'light',
    bgHex: '#faf6f0',
    cardHex: '#ffffff',
    primaryHex: '#ea580c',
  },
];

export const ThemePaletteSwitcher: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_theme_palette') || 'palette-1';
    }
    return 'palette-1';
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', activeTheme);
      try {
        localStorage.setItem('active_theme_palette', activeTheme);
      } catch {
        // ignore
      }
    }
  }, [activeTheme]);

  const handleSelectTheme = (id: string) => {
    setActiveTheme(id);
  };

  const handleResetOriginal = () => {
    setActiveTheme('palette-1');
  };

  const darkPalettes = THEME_PALETTES.filter((p) => p.group === 'dark');
  const lightPalettes = THEME_PALETTES.filter((p) => p.group === 'light');

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-all cursor-pointer shadow-sm"
        title="Cambiar paleta de colores de la web"
        aria-label="Abrir selector de paleta de colores"
      >
        <Palette className="w-3.5 h-3.5 text-primary" />
        <span className="hidden sm:inline font-mono">Paletas</span>
        <span
          className="h-2.5 w-2.5 rounded-full border border-white/30"
          style={{
            backgroundColor:
              THEME_PALETTES.find((p) => p.id === activeTheme)?.primaryHex ||
              '#e7a200',
          }}
        />
      </button>

      {/* Floating Panel Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-84 rounded-2xl border border-border bg-card p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-primary" />
                  <span>Explorador de Paletas</span>
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Alterna entre variaciones en modo oscuro y claro
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Options List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {/* MODO OSCURO SECTION */}
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                  <Moon className="w-3 h-3 text-primary" />
                  <span>Modo Oscuro (5 Variantes)</span>
                </p>
                <div className="space-y-1.5">
                  {darkPalettes.map((theme) => {
                    const isSelected = activeTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleSelectTheme(theme.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-xs'
                            : 'border-border/50 hover:border-border hover:bg-secondary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Color Swatches */}
                          <div className="flex items-center -space-x-1">
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                              style={{ backgroundColor: theme.bgHex }}
                            />
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs z-10"
                              style={{ backgroundColor: theme.cardHex }}
                            />
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs z-20"
                              style={{ backgroundColor: theme.primaryHex }}
                            />
                          </div>

                          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <span>{theme.name}</span>
                            {theme.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-primary/20 text-primary font-bold">
                                {theme.badge}
                              </span>
                            )}
                          </span>
                        </div>

                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MODO CLARO SECTION */}
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>Modo Claro (4 Variantes)</span>
                </p>
                <div className="space-y-1.5">
                  {lightPalettes.map((theme) => {
                    const isSelected = activeTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleSelectTheme(theme.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-xs'
                            : 'border-border/50 hover:border-border hover:bg-secondary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Color Swatches */}
                          <div className="flex items-center -space-x-1">
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                              style={{ backgroundColor: theme.bgHex }}
                            />
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs z-10"
                              style={{ backgroundColor: theme.cardHex }}
                            />
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs z-20"
                              style={{ backgroundColor: theme.primaryHex }}
                            />
                          </div>

                          <span className="text-xs font-semibold text-foreground">
                            {theme.name}
                          </span>
                        </div>

                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reset to Original Button */}
            {activeTheme !== 'palette-1' && (
              <div className="mt-3 pt-3 border-t border-border flex justify-end">
                <button
                  onClick={handleResetOriginal}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Paleta #1 (Original)</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
