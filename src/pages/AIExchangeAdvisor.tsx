import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Lightbulb,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Brain,
  BookOpen,
  ChevronRight,
  Zap,
  Target,
  Calendar,
} from "lucide-react";

export function AIExchangeAdvisor() {
  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <header className="space-y-1 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Exchange Advisor</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Live Analysis
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Recommendation Card */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="relative p-6 text-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">
                AI Recommendation
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Just now
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-black tracking-tight">Exchange Today ✓</p>
            <p className="text-sm opacity-85 leading-relaxed">
              The USD to NGN rate is favorable right now. This is a good time to make your exchange.
            </p>
          </div>

          {/* Confidence Meter */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Confidence Level
              </span>
              <span className="text-2xl font-black">87%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/90 transition-all duration-1000"
                style={{ width: "87%" }}
              />
            </div>
            <p className="text-[11px] opacity-70">
              Based on 12 market signals and historical patterns
            </p>
          </div>
        </div>
      </div>

      {/* Current Market Trend */}
      <div className="glass-card rounded-3xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Current Market Trend</h3>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              USD / NGN Pair
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-1.5 mb-1">
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Trend</span>
            </div>
            <p className="text-lg font-black text-emerald-800">Bullish</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">Rate is climbing</p>
          </div>
          <div className="p-3 rounded-2xl bg-violet-50 border border-violet-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-4 h-4 text-violet-600" />
              <span className="text-[10px] font-bold text-violet-700 uppercase">Volatility</span>
            </div>
            <p className="text-lg font-black text-violet-800">Low</p>
            <p className="text-[11px] text-violet-600 mt-0.5">Stable movement</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">7-Day Movement</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                +2.3%
              </span>
            </div>
            {/* Mini sparkline visualization */}
            <div className="flex items-end gap-1 h-8">
              {[40, 45, 42, 55, 58, 62, 70].map((height, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-sm transition-all",
                    i === 6 ? "bg-emerald-500" : "bg-emerald-200"
                  )}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Trend Summary */}
      <div className="glass-card rounded-3xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm">Historical Trend Summary</h3>
        </div>

        <div className="space-y-3">
          {[
            { period: "Past 24 Hours", change: "+0.8%", direction: "up", detail: "Steady climb" },
            { period: "Past 7 Days", change: "+2.3%", direction: "up", detail: "Consistent growth" },
            { period: "Past 30 Days", change: "+5.1%", direction: "up", detail: "Strong uptrend" },
            { period: "Past 90 Days", change: "-1.2%", direction: "down", detail: "Slight correction" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                  item.direction === "up" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                )}
              >
                {item.direction === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{item.period}</p>
                <p className="text-[11px] text-muted-foreground">{item.detail}</p>
              </div>
              <span
                className={cn(
                  "text-sm font-black",
                  item.direction === "up" ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reasons for Recommendation */}
      <div className="glass-card rounded-3xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm">Why Exchange Today?</h3>
        </div>

        <div className="space-y-2.5">
          {[
            {
              icon: TrendingUp,
              title: "Rate is near 30-day high",
              description: "You'll get more Naira per Dollar than most days this month",
              color: "emerald",
            },
            {
              icon: BarChart3,
              title: "Low market volatility",
              description: "Prices are stable — less risk of sudden drops during your exchange",
              color: "blue",
            },
            {
              icon: AlertCircle,
              title: "Policy announcement expected Friday",
              description: "Rates may shift after the CBN meeting — lock in now to be safe",
              color: "amber",
            },
            {
              icon: CheckCircle2,
              title: "3 verified providers at great rates",
              description: "Wise (95), Remitly (91), and Grey (88) all offer competitive rates today",
              color: "violet",
            },
          ].map((reason, i) => {
            const colorMap: Record<string, { bg: string; text: string }> = {
              emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
              blue: { bg: "bg-blue-100", text: "text-blue-600" },
              amber: { bg: "bg-amber-100", text: "text-amber-600" },
              violet: { bg: "bg-violet-100", text: "text-violet-600" },
            };
            const colors = colorMap[reason.color];
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30">
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                    colors.bg,
                    colors.text
                  )}
                >
                  <reason.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight">{reason.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Financial Tip */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50" />
        <div className="relative p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-amber-900">Financial Tip of the Day</h3>
              <p className="text-[10px] text-amber-700 font-medium uppercase tracking-wider">
                Learn & Grow
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-amber-100">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-amber-900">
                  Don't watch the rate all day — set an alert!
                </p>
                <p className="text-xs text-amber-800/80 leading-relaxed">
                  Constantly checking exchange rates can lead to emotional decisions. 
                  Instead, set a target rate alert and let the market come to you. 
                  Studies show that people who use rate alerts save an average of 
                  <span className="font-bold"> 2.4% more </span>
                  on their exchanges than those who exchange impulsively.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[10px] font-bold text-amber-800">
                    💡 Smart Strategy
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">
                    ✓ Actionable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all">
        <Sparkles className="w-5 h-5" />
        Exchange Now at Best Rate
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground text-center leading-relaxed px-4">
        This analysis is generated by AI and should not be considered financial advice. 
        Always do your own research before making exchange decisions.
      </p>
    </div>
  );
}
