import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="flex space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium text-white ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`
        }
      >
        All Trends
      </NavLink>
      <NavLink
        to="/news"
        className={({ isActive }) =>
          `text-sm font-medium text-white ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`
        }
      >
        News Feed
      </NavLink>
      <NavLink
        to="/compare"
        className={({ isActive }) =>
          `text-sm font-medium text-white ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`
        }
      >
        Compare Trends
      </NavLink>
    </nav>
  );
}