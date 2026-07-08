import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <main className="max-w-lg mx-auto min-h-screen px-4 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}
