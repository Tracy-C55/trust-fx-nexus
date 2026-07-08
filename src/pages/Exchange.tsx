import { useState } from "react";
import { ArrowUpDown, Info, ShieldCheck, ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

const providers = [
  { name: "TrustFX Direct", rate: 1540.20, fee: 0, score: 98, time: "Instant", badge: "Secure" },
  { name: "Wise", rate: 1538.40, fee: 12.50, score: 95, time: "2-4 hours", badge: "Verified" },
  { name: "Lemfi", rate: 1532.10, fee: 5.00, score: 92, time: "1 hour", badge: "Verified" },
  { name: "Local Agent", rate: 1555.00, fee: 0, score: 45, time: "Instant", badge: "Unverified" },
];

export function Exchange() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");

  const currentRate = 1540.20;
  const result = parseFloat(amount || "0") * currentRate;

  return (
    <div className="space-y-8 pb-4">
      <header>
        <h1 className="text-2xl font-bold">Exchange</h1>
        <p className="text-muted-foreground text-sm">Convert and compare rates from verified providers.</p>
      </header>

      {/* Converter Card */}
      <div className="glass-card rounded-[2.5rem] p-6 space-y-4 shadow-xl border-primary/10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">You Send</label>
          <div className="bg-background/50 rounded-2xl p-4 flex items-center justify-between border border-border/50 focus-within:border-primary/50 transition-colors">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold outline-none w-full"
              placeholder="0.00"
            />
            <button className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">🇺🇸</span>
              {fromCurrency}
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-6 relative z-10">
          <button 
            onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}
            className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg hover:rotate-180 transition-transform duration-500"
          >
            <ArrowUpDown className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Recipient Gets</label>
          <div className="bg-background/50 rounded-2xl p-4 flex items-center justify-between border border-border/50">
            <div className="text-2xl font-bold">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <button className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">🇳🇬</span>
              {toCurrency}
            </button>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-medium px-2">
          <span className="text-muted-foreground flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            1 USD = {currentRate} NGN
          </span>
          <span className="text-primary flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Interbank rate
          </span>
        </div>
      </div>

      {/* Provider Comparison */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold">Provider Comparison</h2>
          <div className="flex items-center gap-2">
            <Link to="/compare" className="text-xs font-bold text-primary hover:underline">View All</Link>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">AI Verified</span>
          </div>
        </div>

        <div className="space-y-3">
          {providers.map((p, i) => (
            <div 
              key={i} 
              className={cn(
                "glass-card p-4 rounded-3xl border transition-all cursor-pointer group",
                p.score < 50 ? "border-rose-100 bg-rose-50/10" : "hover:border-primary/40"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center",
                    p.score >= 90 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{p.name}</h4>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                      p.score >= 90 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                      {p.badge}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-bold">TRUST SCORE</span>
                    <span className={cn(
                      "text-xs font-bold",
                      p.score >= 90 ? "text-emerald-600" : p.score >= 70 ? "text-amber-600" : "text-rose-600"
                    )}>
                      {p.score}/100
                    </span>
                  </div>
                  <div className="w-16 h-1 bg-muted rounded-full mt-1 overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        p.score >= 90 ? "bg-emerald-500" : p.score >= 70 ? "bg-amber-500" : "bg-rose-500"
                      )}
                      style={{ width: `${p.score}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs px-1">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">They Get</p>
                  <p className="font-bold text-sm">{(parseFloat(amount || "0") * p.rate).toLocaleString()} {toCurrency}</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Fee</p>
                  <p className="font-bold text-sm">{p.fee === 0 ? "FREE" : `$${p.fee}`}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">Delivery</p>
                  <p className="font-bold text-sm">{p.time}</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 rounded-2xl bg-muted font-bold text-xs flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                Select Provider
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
