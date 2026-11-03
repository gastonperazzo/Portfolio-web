import React, { useState, useEffect } from 'react';
import { Edit3, Check, Copy, RotateCcw } from 'lucide-react';

interface ResultsSectionProps {
  slug: string;
  defaultResult: string;
  editorUnlocked: boolean;
}

const resolveResult = (slug: string, defaultVal: string): string => {
  if (typeof window === 'undefined') return defaultVal || '';
  const saved = localStorage.getItem(`results_${slug}`);
  if (!saved) return defaultVal || '';
  const hasSpanish = /[áéíóúñÁÉÍÓÚÑ]/i.test(saved);
  const defaultHasSpanish = /[áéíóúñÁÉÍÓÚÑ]/i.test(defaultVal);
  if (hasSpanish && !defaultHasSpanish) {
    localStorage.setItem(`results_${slug}`, defaultVal);
    return defaultVal || '';
  }
  return saved;
};

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  slug,
  defaultResult,
  editorUnlocked,
}) => {
  const [result, setResult] = useState<string>(() => {
    return resolveResult(slug, defaultResult);
  });

  const [isEditing, setIsEditing] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync state if slug or defaultResult changes
  useEffect(() => {
    setResult(resolveResult(slug, defaultResult));
  }, [slug, defaultResult]);

  const saveResult = (newResult: string) => {
    setResult(newResult);
    try {
      localStorage.setItem(`results_${slug}`, newResult);
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(`results_${slug}`);
    } catch {
      // ignore
    }
    setResult(defaultResult || '');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Results
          </h2>
          {editorUnlocked && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                isEditing
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              title={isEditing ? 'Listo / Guardar' : 'Editar texto de Results'}
              aria-label="Toggle edit mode for Results"
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {editorUnlocked && isEditing && (
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors cursor-pointer w-fit"
              title="Copiar texto al portapapeles"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'Copiado!' : 'Copiar texto'}</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit"
              title="Restaurar al texto original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 max-w-2xl md:mt-0">
        {!isEditing ? (
          <div className="space-y-4 text-lg leading-relaxed text-foreground whitespace-pre-line">
            {result}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground mb-4">
              <p className="font-semibold text-foreground">✏️ Modo Edición: Results</p>
              <p className="mt-0.5">
                Redacta o ajusta el resumen de impacto y resultados del caso. Puedes usar saltos de línea para separar párrafos. Los cambios se guardan automáticamente.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-3 shadow-xs focus-within:border-primary/60 transition-all">
              <textarea
                rows={6}
                value={result}
                onChange={(e) => saveResult(e.target.value)}
                placeholder="Describe el impacto, métricas alcanzadas y resultados clave..."
                className="w-full rounded-md border border-border/60 bg-background px-3 py-2.5 text-base text-foreground focus:border-primary focus:outline-none resize-y leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar y salir</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
