import { Home, Repeat, Sparkles, ShieldCheck, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Repeat, label: "Exchange", path: "/exchange" },
  { icon: Sparkles, label: "AI Advisor", path: "/advisor" },
  { icon: ShieldCheck, label: "Trust Score", path: "/trust" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bottom-nav-blur">
      <div className="mx-auto max-w-lg glass rounded-2xl shadow-xl flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary bg-primary/10 scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive && "scale-110"
              )} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
