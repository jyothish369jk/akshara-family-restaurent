import { Star } from 'lucide-react';
import { CUSTOMER_REVIEWS, CustomerReview } from '../data/menuData';

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <article className="glass-surface rounded-2xl p-6 w-[320px] sm:w-[370px] shrink-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(28,25,23,0.14)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: review.rating }).map((_, idx) => (
              <Star
                key={idx}
                className="w-4 h-4 text-[#D49B35] fill-[#D49B35] transition-transform duration-300"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[#78716C]">{review.visitContext}</span>
        </div>

        <p className="text-sm text-[#1C1917] leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
      </div>

      <div className="mt-5 pt-4 border-t border-[#1C1917]/8">
        <p className="font-display text-base font-semibold text-[#1C1917]">{review.author}</p>
        <p className="text-xs text-[#57534E] mt-0.5">
          {review.neighborhood}
          <span className="mx-1.5 text-[#D49B35]" aria-hidden="true">·</span>
          <span className="text-[#D9531E] font-medium">{review.dishPraised}</span>
        </p>
      </div>
    </article>
  );
}

export function RatingsSection() {
  return (
    <section id="ratings" className="relative py-14 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9531E] mb-2">
              Loved Across Vizianagaram
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight text-balance">
              Trusted by Local Families Every Evening
            </h2>
          </div>

          {/* Frosted Glass Overall Google Rating Summary Badge */}
          <div className="glass-surface rounded-2xl px-6 py-4 inline-flex items-center gap-4 self-start md:self-auto">
            <div>
              <p className="font-display text-3xl font-bold text-[#1C1917] tabular-nums leading-none">
                4.8 <span className="text-base font-normal text-[#78716C]">/ 5.0</span>
              </p>
              <p className="text-xs font-medium text-[#57534E] mt-1">Google Family Rating</p>
            </div>
            <div className="h-9 w-px bg-[#1C1917]/10" aria-hidden="true" />
            <div>
              <div className="flex items-center gap-1" aria-label="4.8 out of 5 stars">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-[#D49B35] fill-[#D49B35]"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-xs text-[#57534E] mt-1">Balaji Junction Favorite</p>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Continuous Infinite Horizontal Marquee (pauses gently on hover) */}
      <div
        className="marquee-wrapper relative w-full overflow-hidden py-2"
        aria-label="Customer reviews carousel"
      >
        <div className="marquee-track gap-5 px-4">
          {[...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS].map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
