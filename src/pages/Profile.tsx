import { Settings, Shield, CreditCard, Bell, LogOut, ChevronRight } from "lucide-react";

export function Profile() {
  const menuItems = [
    { icon: Settings, label: "Account Settings", desc: "Security, privacy, and personal info" },
    { icon: Shield, label: "Security Center", desc: "Two-factor and login history" },
    { icon: CreditCard, label: "Payment Methods", desc: "Managed linked cards and banks" },
    { icon: Bell, label: "Notifications", desc: "Manage price alerts and security tips" },
  ];

  return (
    <div className="space-y-8">
      <header className="text-center pt-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-background shadow-2xl mx-auto">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/88c0a7e5-8e9f-431d-a09f-42cd3fd3a9f3/user-avatar-55b72a51-1783468111548.webp" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
            <Settings className="w-4 h-4" />
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold">John Doe</h2>
        <p className="text-sm text-muted-foreground">Premium Travel Member</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-4 rounded-3xl text-center space-y-1">
          <p className="text-2xl font-bold">12</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Exchanges</p>
        </div>
        <div className="glass-card p-4 rounded-3xl text-center space-y-1">
          <p className="text-2xl font-bold">842</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Trust Points</p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Settings</h3>
        <div className="glass-card rounded-3xl overflow-hidden divide-y divide-border/10">
          {menuItems.map((item, i) => (
            <button key={i} className="w-full p-4 flex items-center gap-4 hover:bg-primary/5 transition-colors text-left group">
              <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{item.label}</h4>
                <p className="text-[10px] text-muted-foreground truncate">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <button className="w-full p-4 rounded-3xl bg-rose-50 text-rose-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors">
        <LogOut className="w-4 h-4" />
        Log Out
      </button>
    </div>
  );
}
