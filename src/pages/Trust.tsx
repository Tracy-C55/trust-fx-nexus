import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  ShieldQuestion,
  ChevronDown,
  Star,
  Globe,
  DollarSign,
  Brain,
  Lock,
  Users,
  AlertTriangle,
  TrendingUp,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Reason {
  label: string;
  status: "success" | "warning" | "error";
  description: string;
  detail: string;
  icon: any;
}

const providerData = {
  name: "Wise (formerly TransferWise)",
  score: 92,
  trustLevel: "High" as "High" | "Medium" | "Low",
  reasons: [
    {
      label: "Verified Provider",
      status: "success" as "success" | "warning" | "error",
      description: "Licensed & regulated",
      detail: "Wise is registered with FinCEN in the US, FCA in the UK, and holds money transmitter licenses in 45+ US states. Regular audits confirm compliance with international financial regulations.",
      icon: ShieldCheck,
    },
    {
      label: "Website Security",
      status: "success" as "success" | "warning" | "error",
      description: "SSL encrypted & secure",
      detail: "Uses 256-bit TLS encryption, HSTS enabled, valid SSL certificate from DigiCert. Passes all security headers checks including CSP, X-Frame-Options, and X-Content-Type-Options.",
      icon: Lock,
    },
    {
      label: "Transparent Fees",
      status: "success" as "success" | "warning" | "error",
      description: "No hidden charges",
      detail: "Fee structure is clearly displayed before every transaction. Average fee is 0.41% — well below industry average of 1.5%. No markup on exchange rates; uses mid-market rate exclusively.",
      icon: DollarSign,
    },
    {
      label: "User Reviews",
      status: "success" as "success" | "warning" | "error",
      description: "4.7/5 from 12,847 reviews",
      detail: "Aggregated from Trustpilot (4.7★), Google Reviews (4.6★), and App Store (4.8★). 94% of reviewers report successful transfers. Common praise: speed, transparency, and fair rates.",
      icon: Star,
    },
    {
      label: "No Reported Scams",
      status: "success" as "success" | "warning" | "error",
      description: "Clean record",
      detail: "Zero scam reports in the past 12 months across major fraud databases. No entries on FTC complaint tracker or BBB scam directory. Verified by TrustFX scam detection AI.",
      icon: CheckCircle2,
    },
    {
      label: "Hidden Fee Analysis",
      status: "success" as "success" | "warning" | "error",
      description: "No hidden fees detected",
      detail: "AI analysis of 500+ transactions shows consistent pricing. No weekend surcharges, no receiving bank fees, no inactivity fees. Total cost matches displayed fee within 0.01%.",
      icon: Eye,
    },
  ],
  recommendation: "Safe to Proceed" as const,
  recommendationDesc:
    "This provider meets all security standards and has a proven track record of fair exchange rates. Highly recommended for transfers between USD and NGN.",
};

function getTrustLevelColor(level: "High" | "Medium" | "Low") {
  switch (level) {
    case "High":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        ring: "ring-emerald-500/20",
        gradient: "from-emerald-500 to-teal-600",
      };
    case "Medium":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        ring: "ring-amber-500/20",
        gradient: "from-amber-500 to-orange-600",
      };
    case "Low":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        ring: "ring-rose-500/20",
        gradient: "from-rose-500 to-red-600",
      };
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-500";
  if (score >= 50) return "text-amber-500";
  return "text-rose-500";
}

function getStatusColor(status: "success" | "warning" | "error") {
  switch (status) {
    case "success":
      return { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" };
    case "warning":
      return { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" };
    case "error":
      return { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200" };
  }
}

export function Trust() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const colors = getTrustLevelColor(providerData.trustLevel);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <header className="flex items-center gap-3 pt-2">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Trust Score</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Verification Center
          </p>
        </div>
      </header>

      {/* Trust Score Hero Card */}
      <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
        <div className={cn("absolute inset-0 bg-gradient-to-br", colors.gradient)} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="relative p-6 text-white space-y-5">
          {/* Provider Name */}
          <div className="text-center space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Provider</p>
            <h2 className="text-xl font-black tracking-tight">{providerData.name}</h2>
          </div>

          {/* Large Trust Score Circle */}
          <div className="flex justify-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-44 h-44 transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-white/20"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 76}
                  strokeDashoffset={2 * Math.PI * 76 * (1 - providerData.score / 100)}
                  strokeLinecap="round"
                  className="text-white transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black tracking-tighter">{providerData.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  out of 100
                </span>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              {providerData.trustLevel === "High" && <ShieldCheck className="w-5 h-5" />}
              {providerData.trustLevel === "Medium" && <AlertTriangle className="w-5 h-5" />}
              {providerData.trustLevel === "Low" && <XCircle className="w-5 h-5" />}
              <span className="text-sm font-black uppercase tracking-wider">
                {providerData.trustLevel} Trust
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-lg font-black">{providerData.reasons.filter(r => r.status === "success").length}/{providerData.reasons.length}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">Checks Pass</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-lg font-black">4.7★</p>
              <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">User Rating</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-lg font-black">0</p>
              <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">Scam Reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Analysis Sections */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
          Score Breakdown
        </h3>
        <div className="space-y-2">
          {providerData.reasons.map((reason, i) => {
            const statusColors = getStatusColor(reason.status);
            const isExpanded = expandedIndex === i;
            const Icon = reason.icon;

            return (
              <div
                key={i}
                className={cn(
                  "glass-card rounded-2xl overflow-hidden transition-all duration-200",
                  isExpanded && "border-primary/30 shadow-md"
                )}
              >
                {/* Header - Clickable */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors"
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                      statusColors.bg,
                      statusColors.text
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold">{reason.label}</p>
                    <p className="text-[11px] text-muted-foreground">{reason.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {reason.status === "success" && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase">
                        Pass
                      </span>
                    )}
                    {reason.status === "warning" && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold uppercase">
                        Caution
                      </span>
                    )}
                    {reason.status === "error" && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[9px] font-bold uppercase">
                        Fail
                      </span>
                    )}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {reason.detail}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Explanation Card */}
      <div className="glass-card rounded-3xl p-5 space-y-3 border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">AI Explanation</h3>
            <p className="text-[10px] text-muted-foreground font-medium">Why this score?</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Wise earns a <span className="font-bold text-foreground">92/100 Trust Score</span> because it consistently demonstrates transparency, security, and fair pricing. The platform uses real exchange rates without markup, maintains top-tier encryption, and has zero scam reports in the past year. The 8-point deduction comes from slightly slower transfer times to some African countries compared to regional specialists.
        </p>
      </div>

      {/* Recommendation Card */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className={cn("absolute inset-0 bg-gradient-to-br", colors.gradient)} />
        <div className="relative p-5 text-white space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-90">
              Recommendation
            </span>
          </div>
          <p className="text-xl font-black">{providerData.recommendation}</p>
          <p className="text-sm opacity-90 leading-relaxed">{providerData.recommendationDesc}</p>
          <button className="w-full mt-2 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-sm font-bold transition-colors">
            Proceed with Exchange
          </button>
        </div>
      </div>

      {/* Security Tools */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
          Security Tools
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 rounded-2xl space-y-2 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldQuestion className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Site Checker</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">Verify any exchange URL</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl space-y-2 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Report Scam</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">Submit suspicious activity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <div className="text-center p-5 bg-muted/30 rounded-2xl border border-dashed border-border">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          The Trust Score is generated by TrustFX AI based on live provider verification data, market transparency, and verified user reports.
        </p>
        <button className="mt-2 text-xs font-bold text-primary flex items-center gap-1 mx-auto hover:underline">
          Learn about our methodology
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
