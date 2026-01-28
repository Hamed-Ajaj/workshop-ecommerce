import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchIcon, ShoppingCartIcon, Menu, X } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
const Navbar = () => {
  const path = useLocation();
  const items = useCartStore((state) => state.items);
  const totalCart = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/new", label: "New Arrivals" },
    { to: "/sale", label: "Sale" },
  ];

  return (
    <nav className="w-full py-3 md:py-4 px-4 md:px-6 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/" className="text-xl md:text-2xl font-bold text-blue-500">
          LOGO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm lg:text-base transition-colors duration-200 ${
                path.pathname === link.to
                  ? "font-semibold text-blue-500"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`rounded-full border border-gray-200 px-4 py-2 pl-10 text-sm transition-all duration-200 ${
                searchFocused
                  ? "border-blue-400 ring-2 ring-blue-100 w-48 lg:w-64"
                  : "w-36 lg:w-48"
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <SearchIcon
              className={`absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 transition-colors duration-200 ${
                searchFocused ? "text-blue-400" : ""
              }`}
              size={16}
            />
          </div>
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ShoppingCartIcon size={20} className="text-gray-600" />
            {totalCart > 0 ? (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex justify-center items-center bg-black text-white">
                {totalCart}
              </div>
            ) : null}{" "}
          </Link>
          <Link
            to="/sign-in"
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-500"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-gray-600" />
          ) : (
            <Menu size={24} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-base transition-colors duration-200 ${
                  path.pathname === link.to
                    ? "font-semibold text-blue-500 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Search */}
          <div className="relative px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-gray-200 px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <SearchIcon
              className="absolute top-1/2 -translate-y-1/2 left-7 text-gray-400"
              size={16}
            />
          </div>

          {/* Mobile Icons */}
          <div className="flex justify-center gap-8 px-4">
            <Link
              to="/cart"
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCartIcon size={22} className="text-gray-600" />
            </Link>
            <Link
              to="/sign-in"
              className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
