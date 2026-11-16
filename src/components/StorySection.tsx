import { Flame, Leaf, Users } from 'lucide-react';

const STORY_PILLARS = [
  {
    icon: Flame,
    title: 'Traditional Andhra Recipes',
    description:
      'Every dum biryani and gongura specialty is slow-cooked with stone-ground coastal spices, aged basmati, and balanced home-style heat.',
  },
  {
    icon: Users,
    title: 'Spacious Family Ambience',
    description:
      'Designed for relaxed multi-generational dining at Balaji Junction with calm air-conditioned seating, attentive table service, and zero rush.',
  },
  {
    icon: Leaf,
    title: 'Freshly Prepared Daily',
    description:
      'From morning market produce to coastal prawns and country-style naatukodi, every starter and wok dish is cooked fresh to order in an immaculate kitchen.',
  },
];

export function StorySection() {
  return (
    <section id="story" className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Subtle warm ambient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[340px] rounded-full bg-radial from-[#D49B35]/16 via-[#D9531E]/8 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Narrative Glass Card */}
          <div className="lg:col-span-6 glass-surface rounded-3xl p-7 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9531E] mb-3">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight text-balance">
                Rooted in Vizianagaram&apos;s Warmth &amp; Coastal Andhra Craft.
              </h2>
              <p className="mt-5 text-sm sm:text-base text-[#57534E] leading-relaxed">
                At Akshara Family Restaurant, great food begins with patience. Located right at the
                heart of Balaji Junction, our kitchen honors classic Andhra culinary traditions—slow-sealed
                copper dum pots, fragrant ulavacharu reductions, tangy gongura masalas, and hand-roasted
                whole spices ground fresh each morning.
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Whether you are gathering the entire family for Sunday lunch, celebrating milestones
                over Naatukodi Biryani, or picking up evening starters on your way home, we promise
                consistent quality, hygienic preparation, and heartfelt hospitality.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1C1917]/10 grid grid-cols-3 gap-4">
              <div>
                <p className="font-display text-2xl font-bold text-[#1C1917] tabular-nums">112</p>
                <p className="text-xs text-[#57534E] mt-0.5">Curated Dishes</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#1C1917] tabular-nums">100%</p>
                <p className="text-xs text-[#57534E] mt-0.5">Freshly Ground Spice</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#1C1917] tabular-nums">7 Days</p>
                <p className="text-xs text-[#57534E] mt-0.5">11:30 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Minimal Glass Feature Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {STORY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="glass-surface rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-0.5 flex items-start gap-4 flex-1"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D9531E]/10 border border-[#D9531E]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#D9531E]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
