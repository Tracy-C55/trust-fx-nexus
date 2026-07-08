import { cn } from "@/lib/utils";
import { Search, TrendingUp, TrendingDown, Sparkles, ArrowRightLeft, ShieldCheck, Plane, ShieldAlert, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export function Home() {
  return (
    <div className="space-y-6 pb-4">
      {/* Header with Welcome */}
      <header className="space-y-1 pt-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, John 👋</h1>
        <p className="text-sm text-muted-foreground">TrustFX — Your AI-Powered Financial Confidence Companion</p>
      </header>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search currencies, providers, or ask AI..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Live Exchange Rate Card */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-violet-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="relative p-6 text-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">Live Rate</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Updated 2s ago</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black tracking-tighter">1,540.20</span>
              <span className="text-lg font-bold opacity-90">NGN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold opacity-80">USD → NGN</span>
              <span className="flex items-center gap-1 text-emerald-300 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                +1.2%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <div className="flex gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">24h High</p>
                <p className="text-sm font-bold">1,545.80</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">24h Low</p>
                <p className="text-sm font-bold">1,532.40</p>
              </div>
            </div>
            <Link to="/exchange" className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-xs font-bold backdrop-blur-sm">
              Convert
            </Link>
          </div>
        </div>
      </div>

      {/* Today's AI Insight Card */}
      <div className="glass-card rounded-3xl p-5 space-y-3 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Today's AI Insight</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">NEW</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              USD/NGN is showing <span className="font-semibold text-foreground">bullish momentum</span>. Consider exchanging within 48 hours before potential policy shifts. Trust Score analysis shows 3 verified providers offering competitive rates.
            </p>
            <Link to="/advisor" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-1">
              Get detailed analysis
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link to="/exchange" className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold">Exchange</span>
          </Link>
          
          <Link to="/advisor" className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-violet-500/5 hover:border-violet-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold">AI Advisor</span>
          </Link>
          
          <Link to="/trust" className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold">Trust Score</span>
          </Link>
          
          <button className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-blue-500/5 hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Plane className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold">Travel Mode</span>
            <span className="text-xs font-bold">Travel Mode</span>
          </button>
          
          <Link to="/security" className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-rose-500/5 hover:border-rose-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </Link>
          
          <button className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-amber-500/5 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold">Trends</span>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Recent Activity</h2>
          <button className="text-xs font-bold text-primary hover:underline">View All</button>
        </div>
        <div className="space-y-2">
          {[
            { action: "Exchanged", amount: "$500 → ₦770,100", time: "2 hours ago", icon: ArrowRightLeft, iconBg: "bg-primary/10", iconColor: "text-primary" },
            { action: "Trust Score Checked", amount: "Wise (95/100)", time: "Yesterday", icon: ShieldCheck, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
            { action: "AI Analysis", amount: "USD/NGN Forecast", time: "2 days ago", icon: Sparkles, iconBg: "bg-violet-500/10", iconColor: "text-violet-600" },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0", item.iconBg, item.iconColor)}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.action}</p>
                <p className="text-xs text-muted-foreground truncate">{item.amount}</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-medium">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
