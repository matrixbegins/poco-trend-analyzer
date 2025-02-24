import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
export function Header() {
  return (
    <header className="bg-purple-900 border-b border-purple-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="18" cy="18" r="18" fill="#F4B556"/>
                <circle cx="12" cy="15" r="2.5" fill="#4A2B1D"/>
                <circle cx="24" cy="15" r="2.5" fill="#4A2B1D"/>
                <path
                  d="M18 26C20.2091 26 22 24.2091 22 22H14C14 24.2091 15.7909 26 18 26Z"
                  fill="#4A2B1D"
                />
                <path
                  d="M11 12C11 8.13401 14.134 5 18 5C21.866 5 25 8.13401 25 12V17C25 17.5523 24.5523 18 24 18H12C11.4477 18 11 17.5523 11 17V12Z"
                  fill="#8B572A"
                />
                <path
                  d="M8 14C8 13.4477 8.44772 13 9 13H11V17H9C8.44772 17 8 16.5523 8 16V14Z"
                  fill="#8B572A"
                />
                <path
                  d="M28 14C28 13.4477 27.5523 13 27 13H25V17H27C27.5523 17 28 16.5523 28 16V14Z"
                  fill="#8B572A"
                />
              </svg>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-white">POCO</span>
              <span className="text-purple-300 text-sm ml-2">Trend Analytics</span>
            </div>
          </Link>

          <Navigation />
        </div>
      </div>
    </header>
  );
}