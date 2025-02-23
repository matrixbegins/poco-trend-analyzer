import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumbs() {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;

      // Format the label (transform-slug-to-title)
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special case for trend details
      if (currentPath.includes('/trends/') && !currentPath.includes('/generate')) {
        breadcrumbs.push({ label: 'Trend Details', path: currentPath });
      }
      // Special case for content generator
      else if (currentPath.includes('/generate')) {
        breadcrumbs.push({ label: 'Content Generator', path: currentPath });
      }
      else {
        breadcrumbs.push({ label, path: currentPath });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          {index === 0 ? (
            <Link
              to="/"
              className="flex items-center hover:text-gray-900 transition-colors"
            >
              <Home className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="hover:text-gray-900 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
}