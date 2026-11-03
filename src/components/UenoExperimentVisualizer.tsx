import React, { useState } from 'react';
import { Users, BarChart3, MessageSquare, Compass, Check } from 'lucide-react';

export const UenoExperimentVisualizer: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'Base' | 'Plus' | 'Black'>('Plus');
  const [activeView, setActiveView] = useState<'experiment' | 'triangulation'>('experiment');

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden my-8">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-border bg-secondary/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase font-mono mb-1">
              Controlled Behavioral Experiment &amp; Evidence Triangulation
            </div>
            <h4 className="text-lg font-semibold text-foreground">
              Loan Funnel Optimization &amp; 100,000-User Cohort Trial
            </h4>
            <p className="text-sm text-muted-foreground mt-0.5">
              Testing behavioral messaging interventions across customer tiers in ueno bank.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg self-start md:self-auto text-xs font-medium">
            <button
              onClick={() => setActiveView('experiment')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'experiment'
                  ? 'bg-background text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              100k-User Trial Matrix
            </button>
            <button
              onClick={() => setActiveView('triangulation')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'triangulation'
                  ? 'bg-background text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Multi-Method Evidence
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 md:p-8">
        {activeView === 'experiment' && (
          <div className="space-y-6">
            {/* Cohort Setup Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/60 rounded-lg border border-border text-xs">
              <div>
                <span className="text-muted-foreground block">Total Cohort</span>
                <span className="font-bold text-foreground text-sm font-mono">100,000 Users</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Per-Arm Allocation</span>
                <span className="font-bold text-foreground text-sm font-mono">25,000 Users</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Testing Window</span>
                <span className="font-bold text-foreground text-sm">2-Week Active Run</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Evaluated Tiers</span>
                <span className="font-bold text-primary text-sm">Base · Plus · Black</span>
              </div>
            </div>

            {/* Segment Selector for Interactivity */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Select Customer Segment to Inspect Differential Impact:
                </span>
                <span className="text-xs text-primary font-mono font-medium">
                  Active Tier: {activeSegment}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Base', 'Plus', 'Black'] as const).map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setActiveSegment(seg)}
                    className={`py-2 px-3 text-xs rounded-lg border transition-all text-center cursor-pointer ${
                      activeSegment === seg
                        ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs'
                        : 'border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground'
                    }`}
                  >
                    <span className="block">{seg} Segment</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">
                      {seg === 'Base' ? 'Entry accounts' : seg === 'Plus' ? 'Active digital banking' : 'Premium tier'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix comparison for selected tier */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-foreground">
                Trial Arms &amp; Documented Outcomes for {activeSegment} Tier:
              </div>

              {/* Arm 1: Control */}
              <div className="p-4 rounded-lg border border-border bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground px-2 py-0.5 bg-muted rounded">
                      Arm 1 (25k)
                    </span>
                    <span className="text-sm font-medium text-foreground">Control: Standard Informational Notification</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Your pre-approved credit simulation is available. Check your monthly term in the app."
                  </p>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 sm:text-right font-mono">
                  Baseline comparator
                </div>
              </div>

              {/* Arm 2: Social Norms */}
              <div className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                activeSegment === 'Base' || activeSegment === 'Plus'
                  ? 'border-primary/60 bg-primary/10'
                  : 'border-border bg-secondary/30'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activeSegment === 'Base' || activeSegment === 'Plus'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      Arm 2 (25k)
                    </span>
                    <span className="text-sm font-medium text-foreground">Social Norms: Peer Validation Nudge</span>
                    {(activeSegment === 'Base' || activeSegment === 'Plus') && (
                      <span className="text-[11px] font-bold text-primary bg-background px-2 py-0.5 rounded-full border border-primary/30">
                        Top Open Rate Winner
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Thousands of ueno customers rely on this flexible loan to reach their personal goals."
                  </p>
                </div>
                <div className="text-xs shrink-0 sm:text-right">
                  {activeSegment === 'Base' && (
                    <span className="text-primary font-medium">Highest open rate in Base</span>
                  )}
                  {activeSegment === 'Plus' && (
                    <div>
                      <span className="text-primary font-medium block">Highest Open Rate</span>
                      <span className="text-primary font-bold text-[11px] block">
                        ★ Highest Loan Application/Renewal Conversion
                      </span>
                    </div>
                  )}
                  {activeSegment === 'Black' && (
                    <span className="text-muted-foreground">Ineffective for premium tier</span>
                  )}
                </div>
              </div>

              {/* Arm 3: Exclusivity */}
              <div className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                activeSegment === 'Black'
                  ? 'border-primary/60 bg-primary/10'
                  : 'border-border bg-secondary/30'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activeSegment === 'Black'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      Arm 3 (25k)
                    </span>
                    <span className="text-sm font-medium text-foreground">Exclusivity: Pre-Approved Privileged Access</span>
                    {activeSegment === 'Black' && (
                      <span className="text-[11px] font-bold text-primary bg-background px-2 py-0.5 rounded-full border border-primary/30">
                        Top Open Rate Winner
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Exclusive credit privilege unlocked exclusively for your verified account profile."
                  </p>
                </div>
                <div className="text-xs shrink-0 sm:text-right">
                  {activeSegment === 'Black' ? (
                    <span className="text-primary font-medium">Highest open rate in Black</span>
                  ) : (
                    <span className="text-muted-foreground">Moderate engagement</span>
                  )}
                </div>
              </div>

              {/* Arm 4: Benefit/Flexibility */}
              <div className="p-4 rounded-lg border border-border bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground px-2 py-0.5 bg-muted rounded">
                      Arm 4 (25k)
                    </span>
                    <span className="text-sm font-medium text-foreground">Benefit &amp; Flexibility: Transparent Terms</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Fixed monthly installment with zero early-cancellation penalties or hidden conditions."
                  </p>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 sm:text-right font-mono">
                  Consistent secondary performer
                </div>
              </div>
            </div>

            {/* Methodological Rigor Note */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground space-y-1">
              <div className="font-semibold text-foreground">Methodological Integrity Disclosure:</div>
              <p>
                Within the Plus customer cohort, the social-norm variant achieved the highest loan application and renewal conversion among all tested variants and the control arm. However, because a formal comparison against the historical pre-experiment baseline was not established in the available trial data, no claim of overarching bank-wide conversion lift is made.
              </p>
            </div>
          </div>
        )}

        {activeView === 'triangulation' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-border/60">
              <h5 className="font-medium text-foreground">5-Source Evidence Triangulation</h5>
              <p className="text-sm text-muted-foreground">
                How big telemetry data and thick qualitative data were unified to diagnose loan drop-off.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">Amplitude Funnel Telemetry</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Located the exact drop-off step between loan simulation calculation and entering the final personal data authorization screens.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">NPS Open-Text Mining</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Synthesized recurring complaints regarding unexpected mandatory insurance line items appearing late in the flow without prior notice.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Compass className="w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">Customer Support Tickets</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Flagged borrower anxiety concerning exact disbursement timelines and confirmation receipts before signing digital promissory notes.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">Segmented Usability Testing</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Observed customers across Base, Plus, and Black tiers attempting simulated loans, discovering that hesitation stemmed from copy ambiguity rather than interest rates.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
