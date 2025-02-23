
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrendDetails from "./pages/TrendDetails";
import ContentGenerator from "./pages/ContentGenerator";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/trends/:trendId" element={<TrendDetails />} />
        <Route path="/trends/:trendId/generate" element={<ContentGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
