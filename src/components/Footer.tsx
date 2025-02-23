import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-purple-800/10 border-t border-purple-100">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full opacity-80"
              >
                <circle cx="18" cy="18" r="18" fill="#9b87f5"/>
                <circle cx="12" cy="15" r="2.5" fill="#4A2B1D"/>
                <circle cx="24" cy="15" r="2.5" fill="#4A2B1D"/>
                <path d="M18 26C20.2091 26 22 24.2091 22 22H14C14 24.2091 15.7909 26 18 26Z" fill="#4A2B1D"/>
                <path d="M11 12C11 8.13401 14.134 5 18 5C21.866 5 25 8.13401 25 12V17C25 17.5523 24.5523 18 24 18H12C11.4477 18 11 17.5523 11 17V12Z" fill="#8B572A"/>
              </svg>
            </div>
            <span className="text-purple-900 font-medium">POCO</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-purple-800">
            <Link to="/privacy" className="hover:text-purple-900">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-purple-900">Terms of Service</Link>
            <a href="mailto:contact@example.com" className="hover:text-purple-900">Contact</a>
          </div>

          <div className="text-sm text-purple-800">
            © {currentYear} Ankur Pandey. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}