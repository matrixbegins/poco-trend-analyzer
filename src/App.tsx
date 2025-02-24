import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteWrapper } from "@/components/RouteWrapper";
import Index from "@/pages/Index";
import TrendDetails from "@/pages/TrendDetails";
import ContentGenerator from "@/pages/ContentGenerator";
import NotFound from "./pages/NotFound";
import TrendComparison from "@/pages/TrendComparison";
import NewsFeed from "@/pages/NewsFeed";
import CompareTrends from "@/pages/CompareTrends";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteWrapper component={Index} />,
  },
  {
    path: "/news",
    element: <RouteWrapper component={NewsFeed} />,
  },
  {
    path: "/compare",
    element: <RouteWrapper component={CompareTrends} />,
  },
  {
    path: "/trends/:trendId",
    element: <RouteWrapper component={TrendDetails} />,
  },
  {
    path: "/trends/:trendId/generate",
    element: <RouteWrapper component={ContentGenerator} />,
  },
  {
    path: "/trends/compare/:trendId1/:trendId2",
    element: <TrendComparison />
  },
  {
    path: "*",
    element: <RouteWrapper component={NotFound} />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
