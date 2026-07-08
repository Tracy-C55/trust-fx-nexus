import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Star,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Zap,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

interface Provider {
  id: string;
  name: string;
  logo: string;
  exchangeRate: number;
  estimatedFees: number;
  feeType: string;
  userRating: number;
  reviewCount: number;
  trustScore: number;
  securityBadge: "Verified" | "Premium" | "Standard" | "Unverified";
  recommendation: string;
  deliveryTime: string;
  minAmount: number;
  maxAmount: number;
  supportedCurrencies: number;
  pros: string[];
  cons: string[];
  isBestOverall?: boolean;
  bestFor?: string;
}

const providers: Provider[] = [
  {
    id: "trustfx",
    name: "TrustFX Direct",
    logo: "🏦",
    exchangeRate: 1540.20,
    estimatedFees: 0,
    feeType: "No hidden fees",
    userRating: 4.9,
    reviewCount: 12840,
    trustScore: 98,
    securityBadge: "Premium",
    recommendation: "Best overall value with zero fees and highest trust score. Recommended for transfers of any size.",
    deliveryTime: "Instant",
    minAmount: 10,
    maxAmount: 100000,
    supportedCurrencies: 45,
    pros: ["Zero fees", "Instant delivery", "Highest trust score", "24/7 support"],
    cons: ["Limited to major currencies"],
    isBestOverall: true,
    bestFor: "Best Overall",
  },
  {
    id: "wise",
    name: "Wise",
    logo: "💱",
    exchangeRate: 1538.40,
    estimatedFees: 12.50,
    feeType: "Flat fee",
    userRating: 4.7,
    reviewCount: 28500,
    trustScore: 95,
    securityBadge: "Verified",
    recommendation: "Great mid-range option with transparent pricing and strong global presence.",
    deliveryTime: "2-4 hours",
    minAmount: 5,
    maxAmount: 50000,
    supportedCurrencies: 55,
    pros: ["Transparent pricing", "Wide currency support", "Strong reputation"],
    cons: ["Flat fee on small transfers", "Not instant"],
    bestFor: "Best for Large Transfers",
  },
  {
    id: "lemfi",
    name: "Lemfi",
    logo: "🌍",
    exchangeRate: 1532.10,
    estimatedFees: 5.00,
    feeType: "Low fee",
    userRating: 4.5,
    reviewCount: 8200,
    trustScore: 92,
    securityBadge: "Verified",
    recommendation: "Solid choice for African corridor transfers with competitive rates and local expertise.",
    deliveryTime: "1 hour",
    minAmount: 20,
    maxAmount: 25000,
    supportedCurrencies: 30,
    pros: ["Africa-focused", "Low fees", "Fast delivery", "Local support"],
    cons: ["Fewer currencies", "Lower max limit"],
    bestFor: "Best for Africa",
  },
  {
    id: "remly",
    name: "Remitly",
    logo: "🔄",
    exchangeRate: 1528.50,
    estimatedFees: 8.99,
    feeType: "Variable fee",
    userRating: 4.4,
    reviewCount: 45000,
    trustScore: 89,
    securityBadge: "Verified",
    recommendation: "Popular choice with express options. Good for urgent transfers with competitive express rates.",
    deliveryTime: "Minutes (Express)",
    minAmount: 10,
    maxAmount: 30000,
    supportedCurrencies: 40,
    pros: ["Express delivery", "Mobile app", "Promo rates for new users"],
    cons: ["Variable fees", "Promo rates expire"],
    bestFor: "Best for Speed",
  },
  {
    id: "localagent",
    name: "Local Agent",
    logo: "🏪",
    exchangeRate: 1555.00,
    estimatedFees: 0,
    feeType: "No fee",
    userRating: 3.2,
    reviewCount: 340,
    trustScore: 45,
    securityBadge: "Unverified",
    recommendation: "Not recommended. Despite attractive rates, low trust score and no verification pose significant risk.",
    deliveryTime: "Instant",
    minAmount: 50,
    maxAmount: 5000,
    supportedCurrencies: 3,
    pros: ["No fees", "In-person option"],
    cons: ["Unverified", "Low trust score", "Limited currencies", "No buyer protection"],
  },
];

function getSecurityBadgeColor(badge: Provider["securityBadge"]) {
  switch (badge) {
    case "Premium":
      return { bg: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20", text: "text-amber-700", border: "border-amber-300/50" };
    case "Verified":
      return { bg: "bg-emerald-500/10", text: "text-emerald-700", border: "border-emerald-300/50" };
    case "Standard":
      return { bg: "bg-blue-500/10", text: "text-blue-700", border: "border-blue-300/50" };
    case "Unverified":
      return { bg: "bg-rose-500/10", text: "text-rose-700", border: "border-rose-300/50" };
  }
}

function getTrustScoreColor(score: number) {
  if (score >= 90) return { text: "text-emerald-600", bg: "bg-emerald-500", ring: "ring-emerald-500/20" };
  if (score >= 70) return { text: "text-amber-600", bg: "bg-amber-500", ring: "ring-amber-500/20" };
  return { text: "text-rose-600", bg: "bg-rose-500", ring: "ring-rose-500/20" };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-3.5 h-3.5",
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star <= rating
              ? "fill-amber-400/50 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

export function ProviderComparison() {
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"trust" | "rate" | "fees" | "rating">("trust");

  const sortedProviders = [...providers].sort((a, b) => {
    switch (sortBy) {
      case "trust":
        return b.trustScore - a.trustScore;
      case "rate":
        return b.exchangeRate - a.exchangeRate;
      case "fees":
        return a.estimatedFees - b.estimatedFees;
      case "rating":
        return b.userRating - a.userRating;
      default:
        return 0;
    }
  });

  const bestProvider = providers.find((p) => p.isBestOverall);

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <header className="space-y-1 pt-2">
        <h1 className="text-2xl font-bold tracking-tight">Compare Providers</h1>
        <p className="text-sm text-muted-foreground">
          Find the best exchange provider based on rates, fees, and trust.
        </p>
      </header>

      {/* Best Overall Highlight */}
      {bestProvider && (
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          <div className="relative p-5 text-white space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">Best Overall Pick</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{bestProvider.logo}</span>
                  <h3 className="text-xl font-bold">{bestProvider.name}</h3>
                </div>
                <p className="text-sm opacity-80">{bestProvider.recommendation}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Rate</p>
                <p className="text-sm font-bold">{bestProvider.exchangeRate.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Fees</p>
                <p className="text-sm font-bold">FREE</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Trust</p>
                <p className="text-sm font-bold">{bestProvider.trustScore}/100</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Rating</p>
                <p className="text-sm font-bold">{bestProvider.userRating}★</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex-shrink-0">Sort by:</span>
        {[
          { key: "trust" as const, label: "Trust Score", icon: ShieldCheck },
          { key: "rate" as const, label: "Best Rate", icon: TrendingUp },
          { key: "fees" as const, label: "Lowest Fees", icon: Zap },
          { key: "rating" as const, label: "Top Rated", icon: Star },
        ].map((sort) => (
          <button
            key={sort.key}
            onClick={() => setSortBy(sort.key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0",
              sortBy === sort.key
                ? "bg-primary text-white shadow-md"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            <sort.icon className="w-3.5 h-3.5" />
            {sort.label}
          </button>
        ))}
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        {sortedProviders.map((provider) => {
          const isExpanded = expandedProvider === provider.id;
          const badgeColors = getSecurityBadgeColor(provider.securityBadge);
          const trustColors = getTrustScoreColor(provider.trustScore);
          const isBest = provider.isBestOverall;

          return (
            <div
              key={provider.id}
              className={cn(
                "glass-card rounded-3xl border transition-all overflow-hidden",
                isBest
                  ? "border-emerald-300/50 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/10"
                  : provider.trustScore < 50
                  ? "border-rose-200/50 bg-rose-50/5"
                  : "hover:border-primary/30"
              )}
            >
              {/* Best Overall Badge */}
              {isBest && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-1.5 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    ★ Best Overall — Recommended
                  </span>
                </div>
              )}

              {/* Best For Badge (non-best-overall) */}
              {provider.bestFor && !isBest && (
                <div className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 px-4 py-1.5 flex items-center gap-2 border-b border-border/30">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {provider.bestFor}
                  </span>
                </div>
              )}

              <div className="p-5 space-y-4">
                {/* Provider Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl",
                      isBest ? "bg-emerald-500/10 ring-2 ring-emerald-500/20" : "bg-muted/50"
                    )}>
                      {provider.logo}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-base">{provider.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                          badgeColors.bg,
                          badgeColors.text,
                          badgeColors.border
                        )}>
                          {provider.securityBadge === "Premium" && <BadgeCheck className="w-3 h-3" />}
                          {provider.securityBadge === "Verified" && <ShieldCheck className="w-3 h-3" />}
                          {provider.securityBadge === "Unverified" && <AlertTriangle className="w-3 h-3" />}
                          {provider.securityBadge}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {provider.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score Circle */}
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center ring-4",
                      trustColors.ring
                    )}>
                      <div className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center",
                        provider.trustScore >= 90 ? "bg-emerald-50" : provider.trustScore >= 70 ? "bg-amber-50" : "bg-rose-50"
                      )}>
                        <span className={cn("text-sm font-black", trustColors.text)}>
                          {provider.trustScore}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">
                      Trust
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted/30 rounded-2xl p-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Exchange Rate</p>
                    <p className="text-lg font-black">{provider.exchangeRate.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">USD → NGN</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Est. Fees</p>
                    <p className={cn(
                      "text-lg font-black",
                      provider.estimatedFees === 0 ? "text-emerald-600" : "text-foreground"
                    )}>
                      {provider.estimatedFees === 0 ? "FREE" : `$${provider.estimatedFees}`}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{provider.feeType}</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">User Rating</p>
                    <p className="text-lg font-black">{provider.userRating}</p>
                    <div className="flex justify-center mt-0.5">
                      <StarRating rating={provider.userRating} />
                    </div>
                    <p className="text-[10px] text-muted-foreground">{provider.reviewCount.toLocaleString()} reviews</p>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className={cn(
                  "rounded-2xl p-3 border",
                  isBest
                    ? "bg-emerald-50/50 border-emerald-200/50"
                    : provider.trustScore < 50
                    ? "bg-rose-50/50 border-rose-200/50"
                    : "bg-primary/5 border-primary/10"
                )}>
                  <div className="flex items-start gap-2">
                    <Sparkles className={cn(
                      "w-4 h-4 flex-shrink-0 mt-0.5",
                      isBest ? "text-emerald-600" : provider.trustScore < 50 ? "text-rose-500" : "text-primary"
                    )} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">AI Recommendation</p>
                      <p className="text-xs leading-relaxed">{provider.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <button
                  onClick={() => setExpandedProvider(isExpanded ? null : provider.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Show less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Compare details <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>

                {isExpanded && (
                  <div className="space-y-4 pt-2 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strengths</p>
                        {provider.pros.map((pro, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{pro}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Limitations</p>
                        {provider.cons.map((con, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-muted/20 rounded-xl">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Min</p>
                        <p className="text-xs font-bold">${provider.minAmount}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/20 rounded-xl">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Max</p>
                        <p className="text-xs font-bold">${provider.maxAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/20 rounded-xl">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Currencies</p>
                        <p className="text-xs font-bold">{provider.supportedCurrencies}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Compare / Select Button */}
                <button
                  className={cn(
                    "w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    isBest
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                      : provider.trustScore < 50
                      ? "bg-muted text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                      : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                  )}
                >
                  {provider.trustScore < 50 ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Not Recommended
                    </>
                  ) : (
                    <>
                      Compare & Select
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Summary Footer */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-sm">Comparison Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50/50 rounded-2xl p-3 border border-emerald-200/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Best Rate</p>
            <p className="text-sm font-bold">Local Agent</p>
            <p className="text-xs text-muted-foreground">1,555.00 NGN</p>
            <p className="text-[10px] text-rose-500 font-medium mt-1">⚠ Low trust — risky</p>
          </div>
          <div className="bg-primary/5 rounded-2xl p-3 border border-primary/10">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Best Value</p>
            <p className="text-sm font-bold">TrustFX Direct</p>
            <p className="text-xs text-muted-foreground">1,540.20 + Zero fees</p>
            <p className="text-[10px] text-emerald-600 font-medium mt-1">✓ Highest trust</p>
          </div>
          <div className="bg-blue-50/50 rounded-2xl p-3 border border-blue-200/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">Most Reviewed</p>
            <p className="text-sm font-bold">Remitly</p>
            <p className="text-xs text-muted-foreground">45,000 reviews</p>
          </div>
          <div className="bg-violet-50/50 rounded-2xl p-3 border border-violet-200/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600 mb-1">Most Currencies</p>
            <p className="text-sm font-bold">Wise</p>
            <p className="text-xs text-muted-foreground">55 currencies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
