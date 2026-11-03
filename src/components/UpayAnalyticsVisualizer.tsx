import React, { useState } from 'react';
import { Layers, Activity, Smartphone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const UpayAnalyticsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'volume' | 'lifecycle' | 'factors'>('volume');

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden my-8">
      {/* Visualizer Header */}
      <div className="p-5 md:p-6 border-b border-border bg-secondary/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase font-mono mb-1">
              Product Analytics &amp; Field Synthesis Artifact
            </div>
            <h4 className="text-lg font-semibold text-foreground">
              UPay Merchant Activity &amp; Ecosystem Diagnostic
            </h4>
            <p className="text-sm text-muted-foreground mt-0.5">
              Synthesis of Amplitude telemetry (Q1–Q2 2026) and in-person merchant field research in Paraguay.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg self-start md:self-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('volume')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'volume'
                  ? 'bg-background text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Volume Distribution
            </button>
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'lifecycle'
                  ? 'bg-background text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Activation Stages
            </button>
            <button
              onClick={() => setActiveTab('factors')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'factors'
                  ? 'bg-background text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Choice Drivers
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-8">
        {activeTab === 'volume' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <h5 className="font-medium text-foreground">The Usage Polarization Curve</h5>
                <p className="text-sm text-muted-foreground">
                  Distribution of monthly transaction counts and monetary volume across the deployed POS terminal fleet.
                </p>
              </div>
              <div className="text-xs text-primary font-mono bg-primary/10 px-3 py-1 rounded-md self-start border border-primary/20">
                Amplitude Telemetry · Q1–Q2 2026
              </div>
            </div>

            {/* Visual Bar Distribution Chart */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-foreground">Dormant / Zero-Volume Terminals</span>
                  <span className="text-muted-foreground font-mono">0 monthly transactions logged</span>
                </div>
                <div className="h-6 w-full bg-muted rounded-md overflow-hidden flex border border-border">
                  <div className="bg-muted-foreground/40 h-full w-[42%] flex items-center justify-end pr-2 text-[10px] font-bold text-foreground">
                    42% of fleet
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Terminals physically present at merchant location but unplugged, stored under counters, or inactive.
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-foreground">Low-Frequency / Backup Devices</span>
                  <span className="text-muted-foreground font-mono">1 to 15 monthly transactions</span>
                </div>
                <div className="h-6 w-full bg-muted rounded-md overflow-hidden flex border border-border">
                  <div className="bg-primary/50 h-full w-[38%] flex items-center justify-end pr-2 text-[10px] font-bold text-foreground">
                    38% of fleet
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Referred to only when a specific card brand fails on competitor POS or customer requests a specific perk.
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-primary">Intensive Recurring Merchants</span>
                  <span className="text-primary font-mono font-medium">16+ transactions (Primary counter choice)</span>
                </div>
                <div className="h-6 w-full bg-muted rounded-md overflow-hidden flex border border-border">
                  <div className="bg-primary h-full w-[20%] flex items-center justify-end pr-2 text-[10px] font-bold text-primary-foreground">
                    20% of fleet
                  </div>
                </div>
                <div className="text-[11px] text-primary mt-1 font-medium">
                  Generates the vast majority of monetary processing volume; default device on checkout counter.
                </div>
              </div>
            </div>

            {/* Insight Callout */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Analytical Takeaway:</strong> Telemetry revealed that terminal distribution metrics created a false sense of security. Because 80% of devices were either dormant or occasional backups, imposing a mandatory flat subscription would risk massive device returns without addressing the primary barrier: lack of incentive to make UPay the merchant's first-choice terminal.
            </div>
          </div>
        )}

        {activeTab === 'lifecycle' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-border/60">
              <h5 className="font-medium text-foreground">The Merchant POS Progression Model</h5>
              <p className="text-sm text-muted-foreground">
                Moving from hardware delivery to defensible everyday habit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-[11px] font-mono text-muted-foreground uppercase">Stage 01</div>
                <div className="text-sm font-medium text-foreground mt-1">Availability</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Terminal delivered and physically unboxed at the merchant's place of business.
                </p>
                <div className="mt-3 text-[11px] font-medium text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Not a proxy for usage
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-[11px] font-mono text-muted-foreground uppercase">Stage 02</div>
                <div className="text-sm font-medium text-foreground mt-1">First Activation</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  First customer transaction successfully swiped or tapped through the device.
                </p>
                <div className="mt-3 text-[11px] font-medium text-accent-foreground flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  High 14-day drop-off risk
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-[11px] font-mono text-muted-foreground uppercase">Stage 03</div>
                <div className="text-sm font-medium text-foreground mt-1">Recurring Usage</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Merchant uses terminal weekly for specific card schemes, backup, or promotions.
                </p>
                <div className="mt-3 text-[11px] font-medium text-primary flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  Subject to fee sensitivity
                </div>
              </div>

              <div className="p-4 rounded-lg border border-primary/40 bg-primary/5">
                <div className="text-[11px] font-mono text-primary uppercase">Stage 04</div>
                <div className="text-sm font-medium text-primary mt-1">Primary Choice</div>
                <p className="text-xs text-foreground/80 mt-2 leading-relaxed">
                  Permanent front-counter placement; default device grabbed by cashiers for all payments.
                </p>
                <div className="mt-3 text-[11px] font-medium text-primary flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Defensible ecosystem fit
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-secondary/40 p-4 rounded-lg border border-border">
              <strong className="text-foreground">Field Observation:</strong> Most merchants had at least two POS devices on site. Transitioning from Stage 03 to Stage 04 required solving operational friction: terminal connectivity speed, seamless tipping for waitstaff, and interoperable QR processing.
            </div>
          </div>
        )}

        {activeTab === 'factors' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-border/60">
              <h5 className="font-medium text-foreground">Key Decision Factors at Point-of-Sale</h5>
              <p className="text-sm text-muted-foreground">
                Empirical drivers identified during merchant visits in Paraguay that determined which device was selected.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium text-foreground">QR Interoperability</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Consumers in Paraguay increasingly prefer QR payments. When a POS terminal cannot seamlessly accept QR codes from all bank apps and digital wallets, merchants immediately switch to an alternative terminal.
                </p>
                <div className="text-[11px] font-mono text-primary">
                  → High-priority product requirement
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium text-foreground">Integrated Tipping Workflows</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Particularly in gastronomy and hospitality, servers and cashiers prioritize terminals that make tip calculation fast and non-awkward for patrons. Devices lacking clear tip flows are relegated to drawers.
                </p>
                <div className="text-[11px] font-mono text-primary">
                  → Vertical-specific friction point
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium text-foreground">Promotions &amp; Cashback Alignment</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Customer bank promotions directly dictate terminal usage. If a major bank offers 20% cashback on Wednesdays on a competing network, merchants exclusively pull out that competitor's POS on those days.
                </p>
                <div className="text-[11px] font-mono text-primary">
                  → Commercial co-marketing dynamic
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium text-foreground">ERP &amp; Spreadsheet Precedence</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Merchants already rely on internal management software, fiscal cash registers, or custom Excel sheets. UPay's merchant portal analytics could not succeed as a standalone value hook without automated export and reconciliation.
                </p>
                <div className="text-[11px] font-mono text-primary">
                  → Pivot from charts to settlement clarity
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visualizer Footer */}
      <div className="px-6 py-3 bg-secondary/30 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 font-mono">
        <span>Field Inquiry Location: Asunción &amp; Gran Asunción, Paraguay</span>
        <span>Scope: Retail, Gastronomy, Services, Small Businesses</span>
      </div>
    </div>
  );
};
