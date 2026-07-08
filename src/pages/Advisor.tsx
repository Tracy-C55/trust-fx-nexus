import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, AlertTriangle, TrendingDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "default" | "alert" | "prediction" | "budget";
  data?: any;
}

const PRESET_PROMPTS = [
  "Should I exchange USD to NGN now?",
  "Analyze this exchange offer for me.",
  "Create a 7-day budget for Lagos.",
  "Check for recent NGN scams."
];

export function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your TrustFX AI Advisor. I can help you with rate predictions, fraud detection, and travel budgeting. What's on your mind?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateAI = async (text: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    
    let response: Message = { role: "assistant", content: "" };

    if (text.toLowerCase().includes("now") || text.toLowerCase().includes("exchange")) {
      response = {
        role: "assistant",
        content: "I recommend waiting for 48 hours. The USD/NGN pair is currently seeing high volatility due to upcoming policy announcements. My analysis suggests a potential 1.5% dip in the interbank rate by Thursday.",
        type: "prediction",
        data: { trend: "down", change: "-1.5%" }
      };
    } else if (text.toLowerCase().includes("budget") || text.toLowerCase().includes("lagos")) {
      response = {
        role: "assistant",
        content: "Here's a mid-range 7-day budget for Lagos, Nigeria (per person):",
        type: "budget",
        data: {
          total: "$850",
          breakdown: [
            { item: "Accommodation (Lekki/VI)", cost: "$420" },
            { item: "Transport (Uber/Bolt)", cost: "$120" },
            { item: "Dining & Drinks", cost: "$250" },
            { item: "Sightseeing", cost: "$60" }
          ]
        }
      };
    } else if (text.toLowerCase().includes("scam") || text.toLowerCase().includes("analyze")) {
      response = {
        role: "assistant",
        content: "WARNING: I've detected characteristics of a 'Ghost Liquidity' scam in that offer. The provider is offering 1,750 NGN/USD which is 12% above market. High-yield offers like this usually lead to wallet drainers.",
        type: "alert"
      };
    } else {
      response = {
        role: "assistant",
        content: "That's an interesting question! Based on my current financial database, I'd suggest looking into local verified P2P providers with high Trust Scores (90+). Would you like me to list them for you?"
      };
    }

    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    simulateAI(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <header className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">AI Advisor</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Intelligence</span>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={cn(
              "flex flex-col",
              msg.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed",
              msg.role === "user" 
                ? "bg-primary text-white rounded-tr-none shadow-md" 
                : "glass-card rounded-tl-none shadow-sm"
            )}>
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">TrustFX AI</span>
                </div>
              )}
              
              <p>{msg.content}</p>

              {msg.type === "prediction" && (
                <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-rose-800 uppercase">AI Forecast</p>
                      <p className="text-sm font-bold text-rose-900">Wait to Buy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-rose-600">{msg.data.change}</p>
                    <p className="text-[10px] text-rose-800/60">Estimated</p>
                  </div>
                </div>
              )}

              {msg.type === "budget" && (
                <div className="mt-4 space-y-2">
                  {msg.data.breakdown.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-xl bg-muted/50">
                      <span className="text-muted-foreground">{item.item}</span>
                      <span className="font-bold">{item.cost}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t flex justify-between items-center">
                    <span className="font-bold">Total Estimate</span>
                    <span className="text-primary font-black">{msg.data.total}</span>
                  </div>
                </div>
              )}

              {msg.type === "alert" && (
                <div className="mt-4 p-3 rounded-2xl bg-rose-600 text-white flex gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Danger Detected</p>
                    <p className="text-[11px] opacity-90 mt-0.5">Scam characteristics found. Do not proceed with this transaction.</p>
                  </div>
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex items-center gap-1.5 mt-1 mr-2">
                <span className="text-[10px] font-medium text-muted-foreground uppercase">You</span>
                <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="glass-card rounded-3xl rounded-tl-none p-4 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preset Prompts */}
      <div className="pb-4 overflow-x-auto flex gap-2 no-scrollbar mt-4">
        {PRESET_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(prompt);
              setMessages(prev => [...prev, { role: "user", content: prompt }]);
              setInput("");
              simulateAI(prompt);
            }}
            className="whitespace-nowrap px-4 py-2 rounded-2xl glass border border-primary/10 text-[11px] font-bold text-primary hover:bg-primary/5 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="glass p-2 rounded-3xl flex items-center gap-2 border-primary/20 shadow-lg">
        <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
          <Sparkles className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent outline-none text-sm font-medium"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:scale-95 transition-all active:scale-90"
        >
          {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
