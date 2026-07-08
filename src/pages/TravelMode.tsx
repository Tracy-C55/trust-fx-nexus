import { useState } from "react";
import {
  Plane,
  Calendar,
  Target,
  DollarSign,
  CreditCard,
  ArrowRight,
  MapPin,
  Wallet,
  AlertTriangle,
  Shield,
  TrendingUp,
  Home as HomeIcon,
  Utensils,
  Car,
  Banknote,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelFormData {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  budget: string;
  paymentMethod: string;
}

interface TravelDashboard {
  exchangeAmount: number;
  dailySpending: number;
  accommodation: number;
  food: number;
  transport: number;
  cashRecommendation: number;
  cardRecommendation: number;
  scamAlerts: string[];
  safetyTips: string[];
}

const destinations = [
  { value: "nigeria", label: "Nigeria", currency: "NGN", flag: "🇳🇬" },
  { value: "ghana", label: "Ghana", currency: "GHS", flag: "🇬🇭" },
  { value: "kenya", label: "Kenya", currency: "KES", flag: "🇰🇪" },
  { value: "south-africa", label: "South Africa", currency: "ZAR", flag: "🇿🇦" },
  { value: "egypt", label: "Egypt", currency: "EGP", flag: "🇪🇬" },
];

const purposes = [
  { value: "business", label: "Business", icon: "💼" },
  { value: "tourism", label: "Tourism", icon: "🏖️" },
  { value: "family", label: "Family Visit", icon: "👨‍👩‍👧" },
  { value: "study", label: "Study", icon: "📚" },
  { value: "medical", label: "Medical", icon: "🏥" },
];

const paymentMethods = [
  { value: "card", label: "Credit/Debit Card", icon: CreditCard },
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "mobile", label: "Mobile Money", icon: Wallet },
  { value: "mixed", label: "Mixed", icon: DollarSign },
];

function generateDashboard(data: TravelFormData): TravelDashboard {
  const budget = parseFloat(data.budget) || 1000;
  const days = Math.max(
    1,
    Math.ceil(
      (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  // Mock exchange rates (USD to local)
  const exchangeRates: Record<string, number> = {
    nigeria: 1540,
    ghana: 12.5,
    kenya: 153,
    "south-africa": 18.5,
    egypt: 30.9,
  };

  const rate = exchangeRates[data.destination] || 100;
  const exchangeAmount = budget * rate;

  return {
    exchangeAmount: Math.round(exchangeAmount),
    dailySpending: Math.round(budget / days),
    accommodation: Math.round(budget * 0.4),
    food: Math.round(budget * 0.25),
    transport: Math.round(budget * 0.15),
    cashRecommendation: Math.round(budget * 0.3),
    cardRecommendation: Math.round(budget * 0.7),
    scamAlerts: [
      "Avoid street money changers offering rates 10% above market",
      "Beware of 'helpful' strangers at ATMs offering assistance",
      "Only use licensed exchange offices with visible rates",
    ],
    safetyTips: [
      "Keep emergency cash separate from your main wallet",
      "Notify your bank before traveling to avoid card blocks",
      "Use hotel safes for passports and excess cash",
      "Take photos of receipts for all exchanges",
    ],
  };
}

export function TravelMode() {
  const [step, setStep] = useState<"form" | "dashboard">("form");
  const [formData, setFormData] = useState<TravelFormData>({
    destination: "",
    startDate: "",
    endDate: "",
    purpose: "",
    budget: "",
    paymentMethod: "",
  });
  const [dashboard, setDashboard] = useState<TravelDashboard | null>(null);

  const handleSubmit = () => {
    const dash = generateDashboard(formData);
    setDashboard(dash);
    setStep("dashboard");
  };

  const handleReset = () => {
    setStep("form");
    setDashboard(null);
  };

  const selectedDestination = destinations.find((d) => d.value === formData.destination);

  if (step === "dashboard" && dashboard) {
    return (
      <div className="space-y-5 pb-4">
        {/* Header */}
        <header className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Travel Dashboard</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {selectedDestination?.flag} {selectedDestination?.label}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-bold text-primary hover:underline"
          >
            Edit Trip
          </button>
        </header>

        {/* Main Exchange Card */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-violet-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          <div className="relative p-6 text-white space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">
                Recommended Exchange
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black tracking-tight">
                {dashboard.exchangeAmount.toLocaleString()}
              </p>
              <p className="text-sm opacity-85">
                {selectedDestination?.currency} ({selectedDestination?.label})
              </p>
            </div>
            <div className="pt-3 border-t border-white/20">
              <p className="text-xs opacity-80">
                Based on ${formData.budget} budget for{" "}
                {Math.ceil(
                  (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="glass-card rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm">Budget Breakdown</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <HomeIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Accommodation</p>
                <p className="text-[11px] text-muted-foreground">40% of budget</p>
              </div>
              <p className="text-sm font-black">${dashboard.accommodation}</p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Food & Dining</p>
                <p className="text-[11px] text-muted-foreground">25% of budget</p>
              </div>
              <p className="text-sm font-black">${dashboard.food}</p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Transport</p>
                <p className="text-[11px] text-muted-foreground">15% of budget</p>
              </div>
              <p className="text-sm font-black">${dashboard.transport}</p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Daily Spending</p>
                <p className="text-[11px] text-muted-foreground">Average per day</p>
              </div>
              <p className="text-sm font-black text-primary">${dashboard.dailySpending}</p>
            </div>
          </div>
        </div>

        {/* Payment Recommendations */}
        <div className="glass-card rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm">Payment Strategy</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800 uppercase">Cash</span>
              </div>
              <p className="text-2xl font-black text-emerald-900">${dashboard.cashRecommendation}</p>
              <p className="text-[11px] text-emerald-700">For markets, tips, small vendors</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-blue-800 uppercase">Card</span>
              </div>
              <p className="text-2xl font-black text-blue-900">${dashboard.cardRecommendation}</p>
              <p className="text-[11px] text-blue-700">Hotels, restaurants, shops</p>
            </div>
          </div>
        </div>

        {/* Scam Alerts */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-red-600" />
          <div className="relative p-5 text-white space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-sm">Local Scam Alerts</h3>
            </div>
            <div className="space-y-2">
              {dashboard.scamAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs leading-relaxed opacity-95">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="glass-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm">Financial Safety Tips</h3>
          </div>
          <div className="space-y-2">
            {dashboard.safetyTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-muted/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all">
          <Plane className="w-5 h-5" />
          Start Exchange Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <header className="flex items-center gap-3 pt-2">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
          <Plane className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Travel Mode</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Plan Your Trip
          </p>
        </div>
      </header>

      {/* Destination */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <label className="font-bold text-sm">Where are you traveling?</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {destinations.map((dest) => (
            <button
              key={dest.value}
              onClick={() => setFormData({ ...formData, destination: dest.value })}
              className={cn(
                "p-3 rounded-2xl border-2 transition-all text-left",
                formData.destination === dest.value
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30"
              )}
            >
              <p className="text-2xl mb-1">{dest.flag}</p>
              <p className="text-xs font-bold">{dest.label}</p>
              <p className="text-[10px] text-muted-foreground">{dest.currency}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Travel Dates */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <label className="font-bold text-sm">Travel Dates</label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Start Date</p>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-background/50 text-sm font-medium focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">End Date</p>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-border/50 bg-background/50 text-sm font-medium focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Purpose */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <label className="font-bold text-sm">Purpose of Travel</label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {purposes.map((purpose) => (
            <button
              key={purpose.value}
              onClick={() => setFormData({ ...formData, purpose: purpose.value })}
              className={cn(
                "p-3 rounded-2xl border-2 transition-all text-center",
                formData.purpose === purpose.value
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30"
              )}
            >
              <p className="text-2xl mb-1">{purpose.icon}</p>
              <p className="text-[10px] font-bold">{purpose.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <label className="font-bold text-sm">Total Budget (USD)</label>
        </div>
        <input
          type="number"
          placeholder="e.g., 2000"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50"
        />
        <div className="flex gap-2">
          {[500, 1000, 2000, 5000].map((amount) => (
            <button
              key={amount}
              onClick={() => setFormData({ ...formData, budget: amount.toString() })}
              className="flex-1 py-2 rounded-xl bg-muted/50 hover:bg-primary/10 text-xs font-bold transition-colors"
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          <label className="font-bold text-sm">Preferred Payment Method</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.value}
                onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                className={cn(
                  "p-3 rounded-2xl border-2 transition-all flex items-center gap-2",
                  formData.paymentMethod === method.value
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-primary/30"
                )}
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold">{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={
          !formData.destination ||
          !formData.startDate ||
          !formData.endDate ||
          !formData.purpose ||
          !formData.budget ||
          !formData.paymentMethod
        }
        className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        Generate Travel Plan
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Info */}
      <div className="flex items-start gap-2 p-4 rounded-2xl bg-blue-50 border border-blue-100">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 leading-relaxed">
          Your travel plan is generated using real-time exchange rates and local market data. 
          All estimates are based on average costs for mid-range travelers.
        </p>
      </div>
    </div>
  );
}
