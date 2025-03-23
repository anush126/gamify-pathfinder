
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TechSelection from "./pages/TechSelection";
import LearningPath from "./pages/LearningPath";
import HtmlBlueprint from "./pages/games/HtmlBlueprint";
import CssStyler from "./pages/games/CssStyler";
import JsCommander from "./pages/games/JsCommander";
import ReactNativeRanger from "./pages/games/ReactNativeRanger";
import FlutterForge from "./pages/games/FlutterForge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tech-selection" element={<TechSelection />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/games/html-blueprint" element={<HtmlBlueprint />} />
          <Route path="/games/css-styler" element={<CssStyler />} />
          <Route path="/games/js-commander" element={<JsCommander />} />
          <Route path="/games/react-native-ranger" element={<ReactNativeRanger />} />
          <Route path="/games/flutter-forge" element={<FlutterForge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
