import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Search,
  Globe,
  Lightbulb,
  BadgeCheck,
  Phone,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Lock,
  Eye,
  FileWarning,
  Send,
  ExternalLink,
  ArrowLeft,
  Shield,
  Siren,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

type SectionId =
  | "scam-checker"
  | "fraud-alerts"
  | "report-scam"
  | "phishing-detector"
  | "secure-website"
  | "safety-tips"
  | "trusted-providers"
  | "emergency-help";

interface SectionConfig {
  id: SectionId;
  title: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const sections: SectionConfig[] = [
  {
    id: "scam-checker",
    title: "Scam Checker",
    description: "Verify if a provider or service is legitimate",
    icon: ShieldCheck,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    id: "fraud-alerts",
    title: "Fraud Alerts",
    description: "Stay informed about latest threats",
    icon: AlertTriangle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    id: "report-scam",
    title: "Report Scam",
    description: "Report suspicious activity to protect others",
    icon: FileWarning,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
  {
    id: "phishing-detector",
    title: "Phishing Detector",
    description: "Check URLs and messages for phishing attempts",
    icon: Eye,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "secure-website",
    title: "Secure Website Checker",
    description: "Verify website security before entering details",
    icon: Globe,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    id: "safety-tips",
    title: "Financial Safety Tips",
    description: "Learn how to protect your money",
    icon: Lightbulb,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    id: "trusted-providers",
    title: "Trusted Providers",
    description: "Verified and recommended exchange services",
    icon: BadgeCheck,
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-600",
  },
  {
    id: "emergency-help",
    title: "Emergency Help",
    description: "Immediate assistance if you've been scammed",
    icon: Siren,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
];

const fraudAlerts = [
  {
    id: 1,
    severity: "high" as const,
    title: "Fake WhatsApp Exchange Groups",
    description: "Scammers are posing as exchange agents in WhatsApp groups, offering unrealistically low rates. Never send money to unverified contacts.",
    date: "Dec 18, 2024",
    region: "West Africa",
  },
  {
    id: 2,
    severity: "medium" as const,
    title: "Clone Website Alert",
    description: "A clone of a popular exchange platform has been detected at a similar URL. Always verify the domain before logging in.",
    date: "Dec 15, 2024",
    region: "Global",
  },
  {
    id: 3,
    severity: "low" as const,
    title: "Email Phishing Campaign",
    description: "Fake emails impersonating bank notifications are circulating. Check sender addresses carefully and never click suspicious links.",
    date: "Dec 12, 2024",
    region: "Global",
  },
];

const safetyTips = [
  {
    title: "Verify Before You Trust",
    description: "Always check a provider's Trust Score before exchanging. Look for verified badges and read recent reviews.",
    icon: ShieldCheck,
  },
  {
    title: "Use Secure Connections",
    description: "Only use exchange platforms over HTTPS. Check for the padlock icon in your browser's address bar.",
    icon: Lock,
  },
  {
    title: "Never Share OTP Codes",
    description: "Legitimate services will never ask for your one-time password. Keep your 2FA codes private at all times.",
    icon: Eye,
  },
  {
    title: "Start with Small Amounts",
    description: "When trying a new provider, exchange a small amount first to test their service before committing larger sums.",
    icon: CheckCircle2,
  },
  {
    title: "Document Everything",
    description: "Keep screenshots of transactions, receipts, and communications. This evidence is crucial if you need to report fraud.",
    icon: FileWarning,
  },
  {
    title: "Trust Your Instincts",
    description: "If a deal seems too good to be true, it probably is. Unrealistic rates are often a sign of scams.",
    icon: Lightbulb,
  },
];

const trustedProviders = [
  {
    name: "Wise",
    score: 95,
    specialty: "Low fees, mid-market rates",
    verified: true,
    regions: "Global",
  },
  {
    name: "Revolut",
    score: 91,
    specialty: "Fast transfers, multi-currency",
    verified: true,
    regions: "Europe, Americas",
  },
  {
    name: "Remitly",
    score: 89,
    specialty: "Remittances to developing nations",
    verified: true,
    regions: "Global",
  },
  {
    name: "Payoneer",
    score: 87,
    specialty: "Business payments, freelancers",
    verified: true,
    regions: "Global",
  },
];

function getSeverityStyles(severity: "high" | "medium" | "low") {
  switch (severity) {
    case "high":
      return {
        bg: "bg-rose-50",
        border: "border-rose-200",
        badge: "bg-rose-100 text-rose-700",
        icon: "text-rose-600",
        label: "High Priority",
      };
    case "medium":
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700",
        icon: "text-amber-600",
        label: "Medium",
      };
    case "low":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        icon: "text-blue-600",
        label: "Low",
      };
  }
}

export function SecurityCenter() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [scamCheckUrl, setScamCheckUrl] = useState("");
  const [scamCheckResult, setScamCheckResult] = useState<"safe" | "unsafe" | null>(null);
  const [phishingUrl, setPhishingUrl] = useState("");
  const [phishingResult, setPhishingResult] = useState<"safe" | "phishing" | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteResult, setWebsiteResult] = useState<"secure" | "insecure" | null>(null);
  const [reportForm, setReportForm] = useState({
    type: "",
    provider: "",
    description: "",
    amount: "",
  });
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleScamCheck = () => {
    if (!scamCheckUrl.trim()) return;
    setScamCheckResult(scamCheckUrl.toLowerCase().includes("scam") ? "unsafe" : "safe");
  };

  const handlePhishingCheck = () => {
    if (!phishingUrl.trim()) return;
    setPhishingResult(
      phishingUrl.toLowerCase().includes("phish") || phishingUrl.toLowerCase().includes("fake")
        ? "phishing"
        : "safe"
    );
  };

  const handleWebsiteCheck = () => {
    if (!websiteUrl.trim()) return;
    setWebsiteResult(
      websiteUrl.startsWith("https") || !websiteUrl.includes("http")
        ? "secure"
        : "insecure"
    );
  };

  const handleReportSubmit = () => {
    if (!reportForm.type || !reportForm.description) return;
    setReportSubmitted(true);
  };

  // Section detail views
  const renderSectionDetail = () => {
    switch (activeSection) {
      case "scam-checker":
        return (
          <div className="space-y-4">
            <button
              onClick={() => { setActiveSection(null); setScamCheckResult(null); setScamCheckUrl(""); }}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Scam Checker</h3>
                  <p className="text-xs text-muted-foreground">Enter a provider name or URL to verify</p>
                </div>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={scamCheckUrl}
                  onChange={(e) => { setScamCheckUrl(e.target.value); setScamCheckResult(null); }}
                  placeholder="e.g., wise.com, QuickExchange..."
                  className="w-full px-4 py-3.5 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  onClick={handleScamCheck}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Check Now
                </button>
              </div>
              {scamCheckResult === "safe" && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-700 text-sm">Looks Safe</span>
                  </div>
                  <p className="text-xs text-emerald-600 leading-relaxed">No scam reports found for this provider. Always verify with the full Trust Score for complete confidence.</p>
                </div>
              )}
              {scamCheckResult === "unsafe" && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-rose-700 text-sm">Warning: Potential Scam</span>
                  </div>
                  <p className="text-xs text-rose-600 leading-relaxed">Multiple scam reports found. We recommend avoiding this provider and reporting any interactions.</p>
                </div>
              )}
            </div>
          </div>
        );

      case "fraud-alerts":
        return (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Fraud Alerts</h3>
                  <p className="text-xs text-muted-foreground">{fraudAlerts.length} active alerts</p>
                </div>
              </div>
              {fraudAlerts.map((alert) => {
                const styles = getSeverityStyles(alert.severity);
                return (
                  <div key={alert.id} className={cn("p-4 rounded-2xl border space-y-2", styles.bg, styles.border)}>
                    <div className="flex items-center justify-between">
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full", styles.badge)}>
                        {styles.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium">{alert.date}</span>
                    </div>
                    <h4 className="font-bold text-sm">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                    <div className="flex items-center gap-1 pt-1">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground font-medium">{alert.region}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "report-scam":
        return (
          <div className="space-y-4">
            <button
              onClick={() => { setActiveSection(null); setReportSubmitted(false); setReportForm({ type: "", provider: "", description: "", amount: "" }); }}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                  <FileWarning className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Report a Scam</h3>
                  <p className="text-xs text-muted-foreground">Help protect others by reporting fraud</p>
                </div>
              </div>
              {!reportSubmitted ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Scam Type</label>
                    <select
                      value={reportForm.type}
                      onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium focus:outline-none focus:border-rose-500/50 transition-colors appearance-none"
                    >
                      <option value="">Select type...</option>
                      <option value="fake-provider">Fake Exchange Provider</option>
                      <option value="phishing">Phishing Attempt</option>
                      <option value="rate-scam">Unrealistic Rate Scam</option>
                      <option value="identity-theft">Identity Theft</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Provider / Platform Name</label>
                    <input
                      type="text"
                      value={reportForm.provider}
                      onChange={(e) => setReportForm({ ...reportForm, provider: e.target.value })}
                      placeholder="e.g., QuickExchange, WhatsApp group..."
                      className="w-full px-4 py-3 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Amount Lost (optional)</label>
                    <input
                      type="text"
                      value={reportForm.amount}
                      onChange={(e) => setReportForm({ ...reportForm, amount: e.target.value })}
                      placeholder="e.g., $500, ₦385,000..."
                      className="w-full px-4 py-3 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Description</label>
                    <textarea
                      value={reportForm.description}
                      onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                      placeholder="Describe what happened in detail..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={handleReportSubmit}
                    className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Report
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-emerald-800">Report Submitted</h4>
                  <p className="text-xs text-emerald-600 leading-relaxed">Thank you for helping keep our community safe. Our security team will review your report within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        );

      case "phishing-detector":
        return (
          <div className="space-y-4">
            <button
              onClick={() => { setActiveSection(null); setPhishingResult(null); setPhishingUrl(""); }}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phishing Detector</h3>
                  <p className="text-xs text-muted-foreground">Paste a URL or message to analyze</p>
                </div>
              </div>
              <div className="space-y-3">
                <textarea
                  value={phishingUrl}
                  onChange={(e) => { setPhishingUrl(e.target.value); setPhishingResult(null); }}
                  placeholder="Paste URL or suspicious message here..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
                <button
                  onClick={handlePhishingCheck}
                  className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Analyze
                </button>
              </div>
              {phishingResult === "safe" && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-700 text-sm">No Phishing Detected</span>
                  </div>
                  <p className="text-xs text-emerald-600 leading-relaxed">This content appears safe. However, always exercise caution with links from unknown sources.</p>
                </div>
              )}
              {phishingResult === "phishing" && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-rose-700 text-sm">Phishing Detected!</span>
                  </div>
                  <p className="text-xs text-rose-600 leading-relaxed">This content shows signs of a phishing attempt. Do not click any links or provide personal information.</p>
                </div>
              )}
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/30 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Common Phishing Signs</h4>
                <ul className="space-y-1.5">
                  {["Urgent language pressuring immediate action", "Misspelled domain names (e.g., paypa1.com)", "Requests for personal or financial information", "Unexpected attachments or links"].map((sign, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case "secure-website":
        return (
          <div className="space-y-4">
            <button
              onClick={() => { setActiveSection(null); setWebsiteResult(null); setWebsiteUrl(""); }}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Secure Website Checker</h3>
                  <p className="text-xs text-muted-foreground">Verify a website's security before entering details</p>
                </div>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => { setWebsiteUrl(e.target.value); setWebsiteResult(null); }}
                  placeholder="Enter website URL (e.g., wise.com)..."
                  className="w-full px-4 py-3.5 rounded-2xl glass-card border border-border/50 bg-background/50 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button
                  onClick={handleWebsiteCheck}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Check Security
                </button>
              </div>
              {websiteResult === "secure" && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-700 text-sm">Website Appears Secure</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "SSL Certificate", status: true },
                      { label: "Valid Domain", status: true },
                      { label: "Known Safe", status: true },
                    ].map((check, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-muted-foreground">{check.label}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {websiteResult === "insecure" && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-rose-700 text-sm">Security Concerns Found</span>
                  </div>
                  <p className="text-xs text-rose-600 leading-relaxed">This website may not be secure. Avoid entering personal or financial information.</p>
                </div>
              )}
            </div>
          </div>
        );

      case "safety-tips":
        return (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Financial Safety Tips</h3>
                <p className="text-xs text-muted-foreground">Essential knowledge to stay protected</p>
              </div>
            </div>
            <div className="space-y-3">
              {safetyTips.map((tip, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "trusted-providers":
        return (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trusted Providers</h3>
                <p className="text-xs text-muted-foreground">Verified exchange services you can rely on</p>
              </div>
            </div>
            <div className="space-y-3">
              {trustedProviders.map((provider, i) => (
                <Link to="/trust" key={i} className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-teal-500/30 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {provider.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm truncate">{provider.name}</h4>
                      <BadgeCheck className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{provider.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Score: {provider.score}/100</span>
                      <span className="text-[10px] text-muted-foreground">{provider.regions}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-teal-600 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        );

      case "emergency-help":
        return (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Security Center
            </button>
            <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 text-white space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Emergency Help</h3>
                  <p className="text-xs opacity-80">Immediate steps if you've been scammed</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <h4 className="font-bold text-sm">Immediate Steps</h4>
              <div className="space-y-3">
                {[
                  { step: 1, title: "Stop All Transactions", desc: "Immediately halt any pending transfers or payments to the scammer." },
                  { step: 2, title: "Contact Your Bank", desc: "Call your bank's fraud hotline to freeze accounts and attempt to reverse transactions." },
                  { step: 3, title: "Document Everything", desc: "Screenshot all communications, transaction records, and the scammer's details." },
                  { step: 4, title: "Report to Authorities", desc: "File a report with your local police and national fraud reporting center." },
                  { step: 5, title: "Report on TrustFX", desc: "Use our Report Scam feature to warn other users about this threat." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-rose-700">{item.step}</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-xs">{item.title}</h5>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <h4 className="font-bold text-sm">Emergency Contacts</h4>
              <div className="space-y-2">
                {[
                  { label: "TrustFX Security Team", number: "support@trustfx.app", icon: Shield },
                  { label: "IC3 (Internet Crime)", number: "ic3.gov", icon: Globe },
                  { label: "FTC Fraud Reporting", number: "reportfraud.ftc.gov", icon: FileWarning },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/30">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{contact.label}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{contact.number}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <header className="space-y-1 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
            <p className="text-sm text-muted-foreground">Your safety is our priority</p>
          </div>
        </div>
      </header>

      {/* Protection Status Banner */}
      <div className="glass-card rounded-3xl p-5 border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-emerald-700">You're Protected</p>
            <p className="text-xs text-muted-foreground">All security features are active and monitoring</p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {activeSection ? (
        renderSectionDetail()
      ) : (
        <>
          {/* Feature Grid */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Security Tools</h2>
            <div className="grid grid-cols-2 gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="glass-card p-4 rounded-2xl flex flex-col items-start gap-3 hover:border-primary/30 transition-all group text-left"
                >
                  <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", section.iconBg)}>
                    <section.icon className={cn("w-5 h-5", section.iconColor)} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm leading-tight">{section.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-snug">{section.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Quick Fraud Alert Preview */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Latest Alerts</h2>
              <button
                onClick={() => setActiveSection("fraud-alerts")}
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-2">
              {fraudAlerts.slice(0, 2).map((alert) => {
                const styles = getSeverityStyles(alert.severity);
                return (
                  <div key={alert.id} className={cn("p-4 rounded-2xl border space-y-1", styles.bg, styles.border)}>
                    <div className="flex items-center justify-between">
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", styles.badge)}>
                        {styles.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{alert.date}</span>
                    </div>
                    <h4 className="font-bold text-sm">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
