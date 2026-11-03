import React, { useState, useEffect } from 'react';
import {
  Edit3,
  Check,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  RotateCcw,
} from 'lucide-react';

interface WhatIDidSectionProps {
  slug: string;
  defaultItems: string[];
  editorUnlocked: boolean;
}

const resolveItems = (slug: string, defaults: string[]): string[] => {
  if (typeof window === 'undefined') return defaults || [];
  const saved = localStorage.getItem(`what_i_did_${slug}`);
  if (!saved) return defaults || [];
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const hasSpanish = parsed.some((s) => /[áéíóúñÁÉÍÓÚÑ]/i.test(s));
      const defaultHasSpanish = (defaults || []).some((s) => /[áéíóúñÁÉÍÓÚÑ]/i.test(s));
      if (hasSpanish && !defaultHasSpanish) {
        localStorage.setItem(`what_i_did_${slug}`, JSON.stringify(defaults));
        return defaults || [];
      }
      return parsed;
    }
  } catch {
    // fallback
  }
  return defaults || [];
};

export const WhatIDidSection: React.FC<WhatIDidSectionProps> = ({
  slug,
  defaultItems,
  editorUnlocked,
}) => {
  const [items, setItems] = useState<string[]>(() => {
    return resolveItems(slug, defaultItems);
  });

  const [isEditing, setIsEditing] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync state if slug or defaultItems changes
  useEffect(() => {
    setItems(resolveItems(slug, defaultItems));
  }, [slug, defaultItems]);

  const saveItems = (newItems: string[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(`what_i_did_${slug}`, JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const handleUpdateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    saveItems(updated);
  };

  const handleAddItem = () => {
    const updated = [...items, ''];
    saveItems(updated);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length <= 1) return;
    const updated = items.filter((_, i) => i !== index);
    saveItems(updated);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    saveItems(updated);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(`what_i_did_${slug}`);
    } catch {
      // ignore
    }
    setItems(defaultItems || []);
  };

  const handleCopy = () => {
    const jsonStr = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <section className="border-t border-border py-10 md:grid md:grid-cols-[180px_1fr] md:gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What I did
          </h2>
          {editorUnlocked && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                isEditing
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              title={isEditing ? 'Listo / Guardar' : 'Editar puntos de What I did'}
              aria-label="Toggle edit mode for What I did"
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
              title="Copiar lista como JSON"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'Copiado!' : 'Copiar JSON'}</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit"
              title="Restaurar a la versión original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 max-w-2xl md:mt-0">
        {!isEditing ? (
          <ul className="space-y-4">
            {items.map((item, idx) => (
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
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground mb-4">
              <p className="font-semibold text-foreground">✏️ Modo Edición: What I did</p>
              <p className="mt-0.5">
                Modifica directamente el texto de cada punto, usa las flechas para reordenar o elimina/agrega ítems. Los cambios se guardan automáticamente.
              </p>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 shadow-xs transition-all focus-within:border-primary/60"
                >
                  <span className="mt-2.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-mono font-bold text-primary">
                    {idx + 1}
                  </span>

                  <textarea
                    rows={2}
                    value={item}
                    onChange={(e) => handleUpdateItem(idx, e.target.value)}
                    placeholder="Describe una actividad o responsabilidad..."
                    className="flex-1 rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none resize-y leading-relaxed"
                  />

                  <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                    <button
                      onClick={() => handleMoveItem(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                      title="Mover arriba"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveItem(idx, 'down')}
                      disabled={idx === items.length - 1}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                      title="Mover abajo"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(idx)}
                      disabled={items.length <= 1}
                      className="p-1 rounded text-red-400 hover:bg-red-500/20 disabled:opacity-30 cursor-pointer"
                      title="Eliminar ítem"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-primary/50 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar nuevo punto</span>
              </button>

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
