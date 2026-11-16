import { useState } from 'react';
import { CalendarClock, Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Ratings', href: '#ratings' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ cartCount, onOpenCart, onOpenReservation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 pt-3">
      <div className="mx-auto max-w-6xl glass-surface rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9531E] rounded"
        >
          Akshara
        </a>

        {/* Zone 2: 5 Clean Single-Line Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#1C1917] transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#D9531E] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9531E] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Book Table + Live Cart Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-[#1C1917] bg-white/80 hover:bg-white border border-[#1C1917]/10 rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531E]"
          >
            <CalendarClock className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
            <span>Book Table</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open order cart with ${cartCount} items`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#C24515] rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531E]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Cart</span>
            <span className="tabular-nums inline-flex items-center justify-center min-w-[1.35rem] h-5 px-1.5 text-xs font-bold bg-white/20 rounded-md">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/75 border border-[#1C1917]/10 text-[#1C1917] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9531E]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-auto max-w-6xl mt-2 glass-surface-strong rounded-2xl p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#1C1917] hover:bg-[#D9531E]/8 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="mt-1 sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1C1917] bg-white/90 border border-[#1C1917]/10 rounded-xl cursor-pointer"
          >
            <CalendarClock className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
            <span>Book Table</span>
          </button>
        </div>
      )}
    </header>
  );
}
