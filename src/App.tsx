import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Exchange } from "./pages/Exchange";
import { Advisor } from "./pages/Advisor";
import { Trust } from "./pages/Trust";
import { Profile } from "./pages/Profile";
import { TravelMode } from "./pages/TravelMode";
import { AIExchangeAdvisor } from "./pages/AIExchangeAdvisor";
import { SecurityCenter } from "./pages/SecurityCenter";
import { ProviderComparison } from "./pages/ProviderComparison";
import { AIFinancialAssistant } from "./pages/AIFinancialAssistant";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/travel" element={<TravelMode />} />
          <Route path="/ai-exchange-advisor" element={<AIExchangeAdvisor />} />
          <Route path="/security" element={<SecurityCenter />} />
          <Route path="/compare" element={<ProviderComparison />} />
          <Route path="/ai-advisor" element={<AIFinancialAssistant />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
export default App;
