import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  DollarSign,
  Plane,
  Lightbulb,
  CreditCard,
  Clock,
  ArrowRight,
  CheckCircle2,
  Info,
  Zap,
  Target,
  Activity,
} from "lucide-react";

interface Insight {
  id: string;
  category: "timing" | "fees" | "trust" | "scam" | "currency" | "travel" | "personal" | "payment";
  priority: "high" | "medium" | "low";
  title: string;
  message: string;
  reasoning: string;
  action?: string;
  actionLink?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  timestamp: string;
}

const insights: Insight[] = [
  {
    id: "1",
    category: "timing",
    priority: "high",
    title: "Exchange USD to NGN Now",
    message: "The USD/NGN rate is at a 30-day high. This is an excellent time to exchange.",
    reasoning: "Based on 30-day trend analysis, the current rate of 1,540.20 NGN is 2.3% higher than the monthly average. Historical patterns suggest rates may stabilize or decline in the next 7-10 days due to expected central bank interventions.",
    action: "Exchange Now",
    actionLink: "/exchange",
    icon: TrendingUp,
    color: "emerald",
    timestamp: "Just now",
  },
  {
    id: "2",
    category: "fees",
    priority: "medium",
    title: "You Could Save $12.50 on Your Next Transfer",
    message: "TrustFX Direct offers zero fees for transfers under $5,000. Wise charges a $12.50 flat fee.",
    reasoning: "Comparing your typical transfer amount of $2,000: TrustFX Direct = $0 fees, Wise = $12.50, Lemfi = $5.00. Over 12 transfers per year, you'd save $150 by choosing TrustFX Direct for smaller amounts.",
    action: "Compare Providers",
    actionLink: "/compare",
    icon: DollarSign,
    color: "blue",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    category: "trust",
    priority: "medium",
    title: "Trust Score Update: Wise Improved to 95/100",
    message: "Wise has strengthened its security measures and customer support response times.",
    reasoning: "Wise recently implemented enhanced encryption protocols and reduced average support response time from 4 hours to 45 minutes. Their user satisfaction score increased from 4.5 to 4.7 stars. This makes them even more reliable for larger transfers.",
    action: "View Trust Score",
    actionLink: "/trust",
    icon: ShieldCheck,
    color: "violet",
    timestamp: "5 hours ago",
  },
  {
    id: "4",
    category: "scam",
    priority: "high",
    title: "Warning: New Phishing Scam Targeting NGN Transfers",
    message: "Fraudsters are sending fake SMS messages pretending to be from TrustFX. Do not click suspicious links.",
    reasoning: "We've detected 47 reports in the last 24 hours of fake SMS messages claiming to be from TrustFX, asking users to 'verify their account' via a malicious link. Legitimate TrustFX messages never ask for account verification via SMS links. Always access TrustFX through the official app or website.",
    action: "Learn More",
    actionLink: "/security",
    icon: AlertTriangle,
    color: "rose",
    timestamp: "1 hour ago",
  },
  {
    id: "5",
    category: "currency",
    priority: "medium",
    title: "NGN Health Score: 72/100 (Stable)",
    message: "The Nigerian Naira is showing stability with moderate volatility. Good for planning.",
    reasoning: "The NGN Health Score considers inflation rate (3.2%), central bank reserves (adequate), foreign exchange liquidity (moderate), and political stability (stable). A score of 72/100 indicates the currency is relatively stable for short-term planning, though long-term holders should monitor oil price fluctuations.",
    icon: Activity,
    color: "amber",
    timestamp: "Today",
  },
  {
    id: "6",
    category: "travel",
    priority: "low",
    title: "Planning a Trip to Ghana? Budget Smarter",
    message: "Based on current rates, you'll get 14.2 GHS per USD. Daily budget recommendation: $80-120.",
    reasoning: "Analyzing typical traveler expenses in Accra: accommodation ($40-60), meals ($20-30), transport ($10-15), activities ($10-15). The Ghanaian Cedi is stable against USD this month. Consider exchanging 70% before your trip and 30% locally for better rates. Use a no-foreign-transaction-fee card for flexibility.",
    action: "Plan Trip",
    actionLink: "/travel",
    icon: Plane,
    color: "cyan",
    timestamp: "Yesterday",
  },
  {
    id: "7",
    category: "personal",
    priority: "medium",
    title: "Your Exchange Pattern: You're Leaving Money on the Table",
    message: "You've made 8 transfers this year, averaging $1,500 each. You paid $67 in total fees.",
    reasoning: "Analysis of your transfer history shows you used Wise 5 times ($12.50 fee each = $62.50) and Lemfi 3 times ($5 fee each = $15). If you had used TrustFX Direct for all transfers under $5,000, you would have paid $0 in fees. Consider consolidating smaller transfers or switching providers for amounts under $5,000.",
    icon: Target,
    color: "primary",
    timestamp: "2 days ago",
  },
  {
    id: "8",
    category: "payment",
    priority: "low",
    title: "Secure Payment Recommendation for Online Purchases",
    message: "For international online shopping, use virtual cards with spending limits.",
    reasoning: "Virtual cards protect your actual card number from merchants. Set spending limits to prevent unauthorized charges. TrustFX offers virtual cards with customizable limits and real-time transaction alerts. This is especially important for unfamiliar websites or one-time purchases. Your current setup uses a physical card, which exposes your actual card details.",
    icon: CreditCard,
    color: "indigo",
    timestamp: "3 days ago",
  },
];

function getPriorityStyles(priority: Insight["priority"]) {
  switch (priority) {
    case "high":
      return {
        bg: "bg-gradient-to-br from-rose-50 to-orange-50",
        border: "border-rose-200/50",
        badge: "bg-rose-500 text-white",
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-600",
      };
    case "medium":
      return {
        bg: "bg-gradient-to-br from-blue-50 to-violet-50",
        border: "border-blue-200/50",
        badge: "bg-blue-500 text-white",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600",
      };
    case "low":
      return {
        bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
        border: "border-emerald-200/50",
        badge: "bg-emerald-500 text-white",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600",
      };
  }
}

function getColorClasses(color: string) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-200/50" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-200/50" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-200/50" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-200/50" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-200/50" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-600", border: "border-cyan-200/50" },
    primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "border-indigo-200/50" },
  };
  return colorMap[color] || colorMap.primary;
}

export function AIFinancialAssistant() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredInsights = filter === "all" 
    ? insights 
    : insights.filter(i => i.priority === filter);

  const highPriorityCount = insights.filter(i => i.priority === "high").length;

  return (
    <div className="space-y-6 pb-4">
      {/* Header with AI Assistant Persona */}
      <header className="space-y-4 pt-2">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-purple-700 flex items-center justify-center text-white shadow-xl flex-shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Your AI Financial Advisor</h1>
            <p className="text-sm text-muted-foreground">
              I'm here to help you make smarter financial decisions. Here's what I've noticed:
            </p>
          </div>
        </div>

        {/* Status Banner */}
        {highPriorityCount > 0 && (
          <div className="glass-card rounded-2xl p-4 border-rose-200/50 bg-rose-50/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-rose-900">
                  {highPriorityCount} Important {highPriorityCount === 1 ? "Alert" : "Alerts"}
                </p>
                <p className="text-xs text-rose-700">
                  Requires your attention for optimal financial decisions
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold">
                {highPriorityCount}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Filter Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex-shrink-0">Priority:</span>
        {[
          { key: "all" as const, label: "All Insights", count: insights.length },
          { key: "high" as const, label: "High", count: insights.filter(i => i.priority === "high").length },
          { key: "medium" as const, label: "Medium", count: insights.filter(i => i.priority === "medium").length },
          { key: "low" as const, label: "Low", count: insights.filter(i => i.priority === "low").length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0",
              filter === f.key
                ? "bg-primary text-white shadow-md"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {f.label}
            <span className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full",
              filter === f.key ? "bg-white/20" : "bg-muted"
            )}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* AI Insights Feed */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          const isExpanded = expandedInsight === insight.id;
          const priorityStyles = getPriorityStyles(insight.priority);
          const colorClasses = getColorClasses(insight.color);
          const IconComponent = insight.icon;

          return (
            <div
              key={insight.id}
              className={cn(
                "rounded-3xl border transition-all overflow-hidden",
                priorityStyles.bg,
                priorityStyles.border
              )}
            >
              <div className="p-5 space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0",
                    colorClasses.bg
                  )}>
                    <IconComponent className={cn("w-6 h-6", colorClasses.text)} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm">{insight.title}</h3>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        priorityStyles.badge
                      )}>
                        {insight.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {insight.timestamp}
                    </p>
                  </div>
                </div>

                {/* Main Message */}
                <p className="text-sm leading-relaxed">{insight.message}</p>

                {/* Expandable Reasoning */}
                <button
                  onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    {isExpanded ? "Hide reasoning" : "Why am I seeing this?"}
                  </span>
                  <ArrowRight className={cn(
                    "w-4 h-4 transition-transform",
                    isExpanded && "rotate-90"
                  )} />
                </button>

                {isExpanded && (
                  <div className="space-y-3 pt-2 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-background/50 rounded-2xl p-4 border border-border/30">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            AI Reasoning
                          </p>
                          <p className="text-xs leading-relaxed">{insight.reasoning}</p>
                        </div>
                      </div>
                    </div>

                    {insight.action && (
                      <a
                        href={insight.actionLink}
                        className={cn(
                          "w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all",
                          colorClasses.bg,
                          colorClasses.text,
                          "hover:opacity-80"
                        )}
                      >
                        {insight.action}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}

                {/* Quick Action (if not expanded) */}
                {!isExpanded && insight.action && (
                  <a
                    href={insight.actionLink}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-bold transition-colors",
                      colorClasses.text,
                      "hover:opacity-70"
                    )}
                  >
                    {insight.action}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Footer */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-sm">How I Help You</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Proactive Alerts</p>
            <p className="text-xs">I monitor markets 24/7 and alert you to opportunities and risks before they happen.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Simple Explanations</p>
            <p className="text-xs">Every recommendation comes with clear reasoning so you understand the 'why'.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Personalized Advice</p>
            <p className="text-xs">I learn from your patterns to give advice tailored to your financial goals.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Security First</p>
            <p className="text-xs">I warn you about scams and help you choose only verified, trustworthy providers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
