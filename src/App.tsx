import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteWrapper } from "@/components/RouteWrapper";
import Index from "@/pages/Index";
import TrendDetails from "@/pages/TrendDetails";
import ContentGenerator from "@/pages/ContentGenerator";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteWrapper component={Index} />,
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
    path: "*",
    element: <RouteWrapper component={NotFound} />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
