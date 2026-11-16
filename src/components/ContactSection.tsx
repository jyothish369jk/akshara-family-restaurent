import { CalendarClock, Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface ContactSectionProps {
  onOpenReservation: () => void;
}

export function ContactSection({ onOpenReservation }: ContactSectionProps) {
  const directWhatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappDigits}?text=${encodeURIComponent(
    'Hello Akshara Family Restaurant, I have a quick inquiry.'
  )}`;

  return (
    <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9531E] mb-2">
            Visit Us Today
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight text-balance">
            Contact &amp; Location
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E]">
            Conveniently located at Balaji Junction with easy access for families across Vizianagaram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Glass Card: Contact Hub */}
          <div className="lg:col-span-5 glass-surface rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#78716C]">
                  Family Dining · Takeaway · Balaji Junction Delivery
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#1C1917]/10">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D9531E]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#D9531E]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      Address
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-medium text-[#1C1917] leading-snug">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D49B35]/15 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#B47D18]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      Opening Hours
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-medium text-[#1C1917]">
                      {RESTAURANT_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#1C1917]/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#1C1917] bg-white/85 hover:bg-white border border-[#1C1917]/12 rounded-xl transition-all duration-150 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
                  <span className="tabular-nums">{RESTAURANT_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl shadow-sm transition-all duration-150 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onOpenReservation}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#C24515] rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
              >
                <CalendarClock className="w-4 h-4" aria-hidden="true" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>

          {/* Right Glass Card: Responsive Google Map */}
          <div className="lg:col-span-7 glass-surface rounded-3xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="relative w-full min-h-[300px] lg:h-full flex-1 overflow-hidden rounded-2xl border border-[#1C1917]/10 bg-[#EDEAE3]">
              <iframe
                title="Akshara Family Restaurant Location Map — 4, Balaji Junction, Vizianagaram"
                src={RESTAURANT_INFO.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[300px] border-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <p className="text-xs sm:text-sm text-[#57534E]">
                Landmark: Near Balaji Junction Main Road, Vizianagaram
              </p>
              <a
                href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1C1917] bg-white/90 hover:bg-white border border-[#1C1917]/12 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D9531E]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
