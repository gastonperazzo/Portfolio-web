import React, { useState, useEffect } from 'react';
import { Edit3, Check, Plus, X, RotateCcw, Copy } from 'lucide-react';

interface EditableProjectTagsProps {
  slug: string;
  defaultTags: string[];
  className?: string;
}

export const EditableProjectTags: React.FC<EditableProjectTagsProps> = ({
  slug,
  defaultTags,
  className = '',
}) => {
  const [tags, setTags] = useState<string[]>(() => {
    if (typeof window === 'undefined') return defaultTags;
    try {
      const saved = localStorage.getItem(`tags_${slug}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return defaultTags;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync state if defaultTags or slug changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`tags_${slug}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTags(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setTags(defaultTags);
  }, [slug, defaultTags]);

  // Listen for cross-component tag updates for this slug
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string; tags: string[] }>;
      if (customEvent.detail && customEvent.detail.slug === slug) {
        setTags(customEvent.detail.tags);
      }
    };
    window.addEventListener('portfolio_tags_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_tags_updated', handleUpdate);
  }, [slug]);

  const saveTags = (newTags: string[]) => {
    setTags(newTags);
    try {
      localStorage.setItem(`tags_${slug}`, JSON.stringify(newTags));
      window.dispatchEvent(
        new CustomEvent('portfolio_tags_updated', {
          detail: { slug, tags: newTags },
        })
      );
    } catch {
      // ignore
    }
  };

  const handleAddTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      const updated = [...tags, trimmed];
      saveTags(updated);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const updated = tags.filter((_, idx) => idx !== indexToRemove);
    saveTags(updated);
  };

  const handleEditTag = (index: number, val: string) => {
    const updated = [...tags];
    updated[index] = val;
    saveTags(updated);
  };

  const handleReset = () => {
    saveTags(defaultTags);
    try {
      localStorage.removeItem(`tags_${slug}`);
    } catch {
      // ignore
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(tags, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`mt-4 ${className}`}>
      {!isEditing ? (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border/80"
            >
              {tag}
            </span>
          ))}

          {/* Quick Edit Trigger Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border/80 px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/60 hover:text-foreground transition-colors cursor-pointer"
            title="Edit tags / methodologies"
          >
            <Edit3 className="h-3 w-3 text-primary" />
            <span>Edit tags</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-primary/30 bg-card p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Edit Tags / Methodologies
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                ({tags.length})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyJSON}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                title="Copy tags as JSON"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                title="Reset to default tags"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Done</span>
              </button>
            </div>
          </div>

          {/* Editable tag chips list */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-1.5 rounded-full border border-border bg-muted/60 pl-3 pr-1.5 py-1 text-xs text-foreground focus-within:border-primary focus-within:bg-background"
              >
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleEditTag(idx, e.target.value)}
                  className="bg-transparent text-xs text-foreground outline-none w-auto max-w-[180px] sm:max-w-[220px]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTag(idx)}
                  className="rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                  title="Remove tag"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Add new tag form */}
          <form onSubmit={handleAddTag} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Add new methodology or tag..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={!newTagInput.trim()}
              className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-40 disabled:hover:bg-secondary transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
