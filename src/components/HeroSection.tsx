import { ArrowDownRight, CalendarCheck, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export function HeroSection({ onOpenReservation }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6"
    >
      {/* Slowly breathing ambient saffron and warm gold orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-radial from-[#D9531E]/24 via-[#D9531E]/8 to-transparent blur-3xl animate-orb-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -right-20 w-[460px] h-[460px] rounded-full bg-radial from-[#D49B35]/28 via-[#D49B35]/10 to-transparent blur-3xl animate-orb-reverse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 w-[380px] h-[380px] rounded-full bg-radial from-[#D9531E]/14 via-[#D49B35]/10 to-transparent blur-3xl animate-orb-slow"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Main Frosted Glass Hero Card */}
        <div className="glass-surface rounded-3xl px-6 py-12 sm:px-14 sm:py-16 lg:py-20 text-center">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-[#78716C] mb-5">
            {RESTAURANT_INFO.name}
            <span className="mx-2 text-[#D49B35]" aria-hidden="true">·</span>
            Balaji Junction, Vizianagaram
          </p>

          <h1
            className="font-display font-bold text-[#1C1917] tracking-tight leading-[1.12] mx-auto max-w-3xl text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4.4vw, 3.85rem)' }}
          >
            Authentic Andhra Flavors &amp; Warm Family Dining.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto">
            Experience Vizianagaram&apos;s favorite traditional biryanis, sizzling starters, and
            spacious family dining at Balaji Junction.
          </p>

          {/* Dual CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D9531E] hover:bg-[#C24515] rounded-2xl shadow-[0_10px_24px_-8px_rgba(217,83,30,0.45)] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531E]"
            >
              <span>Explore Menu</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onOpenReservation}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#1C1917] glass-pill hover:bg-white/90 rounded-2xl transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531E]"
            >
              <CalendarCheck className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
              <span>Reserve a Table</span>
            </button>
          </div>

          {/* Trust Strip inside Glass Pills */}
          <div className="mt-10 pt-8 border-t border-[#1C1917]/8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="glass-pill rounded-full px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1C1917]">
              <Star className="w-4 h-4 text-[#D49B35] fill-[#D49B35]" aria-hidden="true" />
              <span>4.8★ Family Rated</span>
            </div>

            <div className="glass-pill rounded-full px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1C1917]">
              <Sparkles className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
              <span>100% Fresh Spices</span>
            </div>

            <div className="glass-pill rounded-full px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1C1917]">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" aria-hidden="true" />
              <span>Direct WhatsApp &amp; UPI Ordering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
