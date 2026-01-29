import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#0b1220] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div className="space-y-4">
            <p className="text-xl font-semibold tracking-[0.2em]">AESTHETIQUE</p>
            <p className="max-w-xs text-sm leading-6 text-white/70">
              Premium fashion for the modern individual. Quality, style, and
              sustainability.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
              Shop
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/shop" className="transition hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-white">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-white">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-white">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
              Company
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/" className="transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="transition hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="transition hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
              Newsletter
            </p>
            <p className="text-sm leading-6 text-white/70">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex w-full max-w-md items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-lg bg-white px-4 text-sm font-semibold text-[#0b1220] transition hover:brightness-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs uppercase tracking-[0.3em] text-white/50">
          © {new Date().getFullYear()} Aesthetique. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
