import { useMemo, useRef, useState } from 'react';
import { Minus, Plus, Search, UtensilsCrossed, X } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
  SHOWCASE_PHOTOS,
} from '../data/menuData';
import { CartEntry } from '../utils/whatsapp';

interface MenuSectionProps {
  cartMap: Record<string, CartEntry>;
  onAddItem: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export function MenuSection({ cartMap, onAddItem, onUpdateQuantity }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | MenuCategory>('All');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const menuListRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (pureVegOnly && !item.isVeg) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (query && !item.name.toLowerCase().includes(query) && !item.category.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });
  }, [pureVegOnly, selectedCategory, searchQuery]);

  const groupedByCategory = useMemo(() => {
    const groups = new Map<MenuCategory, MenuItem[]>();
    for (const cat of MENU_CATEGORIES) {
      const items = filteredItems.filter((item) => item.category === cat);
      if (items.length > 0) {
        groups.set(cat, items);
      }
    }
    return Array.from(groups.entries());
  }, [filteredItems]);

  const handleShowcaseClick = (targetCategory: MenuCategory) => {
    setPureVegOnly(false);
    setSearchQuery('');
    setSelectedCategory(targetCategory);
    menuListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setPureVegOnly(false);
    setSearchQuery('');
  };

  return (
    <section id="menu" className="relative py-14 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9531E] mb-2">
            Crafted Fresh to Order
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight text-balance">
            Our Complete Kitchen Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed">
            Explore {MENU_ITEMS.length} authentic Andhra biryanis, sizzling starters, seafood specialties,
            and wok-tossed rice bowls. Add dishes directly to send your order via WhatsApp.
          </p>
        </div>

        {/* 3-Photo Horizontal Glassmorphic Showcase Banner (STRICTLY ONLY 3 CURATED PHOTOS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {SHOWCASE_PHOTOS.map((card) => {
            const hasFailed = failedImages[card.id];
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleShowcaseClick(card.targetCategory)}
                className="group text-left glass-surface rounded-2xl p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(28,25,23,0.14)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531E]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EFECE6]">
                  {!hasFailed ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages((prev) => ({ ...prev, [card.id]: true }))}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F4EDE2] to-[#E9DFCE] p-4 text-center">
                      <UtensilsCrossed className="w-7 h-7 text-[#D9531E]" aria-hidden="true" />
                      <span className="font-display text-sm font-semibold text-[#1C1917]">
                        {card.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="pt-3.5 px-1.5 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-[#1C1917] leading-snug">
                      {card.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#D9531E] whitespace-nowrap shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Explore &rarr;
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#57534E] line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sticky/Anchor Menu Filter Bar */}
        <div ref={menuListRef} className="glass-surface rounded-2xl p-4 sm:p-5 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Instant Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g., Naatukodi, Royyila, Paneer)..."
                aria-label="Search menu dishes"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-white/85 border border-[#1C1917]/12 rounded-xl text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Pure Veg Only Toggle + Count */}
            <div className="flex items-center justify-between sm:justify-end gap-5">
              <span className="text-xs font-medium text-[#57534E] tabular-nums whitespace-nowrap">
                Showing {filteredItems.length} of {MENU_ITEMS.length} dishes
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={pureVegOnly}
                onClick={() => setPureVegOnly((prev) => !prev)}
                className="inline-flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-white/80 border border-[#1C1917]/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#16A34A]"
              >
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
                    pureVegOnly ? 'bg-[#16A34A]' : 'bg-[#D6D3CD]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${
                      pureVegOnly ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1917] whitespace-nowrap">
                  Pure Veg Only
                </span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Menu categories"
            className="mt-4 pt-4 border-t border-[#1C1917]/8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'All'}
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#D9531E] text-white shadow-sm'
                  : 'bg-white/65 text-[#44403C] hover:bg-white border border-[#1C1917]/8'
              }`}
            >
              All ({MENU_ITEMS.length})
            </button>

            {MENU_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const availableCount = MENU_ITEMS.filter(
                (i) => i.category === category && (!pureVegOnly || i.isVeg)
              ).length;

              if (pureVegOnly && availableCount === 0) return null;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D9531E] text-white shadow-sm'
                      : 'bg-white/65 text-[#44403C] hover:bg-white border border-[#1C1917]/8'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Typography Menu Cards (NO individual item photos) */}
        {groupedByCategory.length === 0 ? (
          <div className="glass-surface rounded-2xl p-10 text-center">
            <p className="font-display text-xl font-semibold text-[#1C1917]">
              No matching dishes found
            </p>
            <p className="mt-2 text-sm text-[#57534E]">
              Try clearing your search term or turning off the Pure Veg Only filter.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#C24515] rounded-xl cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedByCategory.map(([category, items]) => (
              <div key={category} className="glass-surface rounded-3xl p-5 sm:p-7">
                <div className="flex items-baseline justify-between gap-4 pb-4 mb-2 border-b border-[#1C1917]/10">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">
                    {category}
                  </h3>
                  <span className="text-xs font-medium text-[#78716C] tabular-nums whitespace-nowrap">
                    {items.length} {items.length === 1 ? 'dish' : 'dishes'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0 divide-[#1C1917]/6">
                  {items.map((item) => {
                    const entry = cartMap[item.id];
                    const quantity = entry?.quantity ?? 0;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 py-3.5 md:border-b md:border-[#1C1917]/7"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Authentic FSSAI-style Veg / Non-Veg Dot */}
                          <span
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                            aria-label={item.isVeg ? 'Vegetarian dish' : 'Non-Vegetarian dish'}
                            className={`inline-flex items-center justify-center w-4 h-4 rounded-[4px] border shrink-0 ${
                              item.isVeg ? 'border-[#16A34A]' : 'border-[#D9531E]'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.isVeg ? 'bg-[#16A34A]' : 'bg-[#D9531E]'
                              }`}
                            />
                          </span>

                          <span className="text-sm sm:text-[15px] font-medium text-[#1C1917] leading-snug">
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3.5 shrink-0">
                          <span className="text-sm sm:text-[15px] font-semibold text-[#1C1917] tabular-nums">
                            ₹{item.price}
                          </span>

                          {quantity === 0 ? (
                            <button
                              type="button"
                              onClick={() => onAddItem(item)}
                              aria-label={`Add ${item.name} to order`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#D9531E] bg-[#D9531E]/8 hover:bg-[#D9531E] hover:text-white border border-[#D9531E]/25 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9531E]"
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Add</span>
                            </button>
                          ) : (
                            <div
                              aria-label={`Quantity controls for ${item.name}`}
                              className="inline-flex items-center rounded-lg bg-[#D9531E] text-white shadow-xs"
                            >
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="p-1.5 hover:bg-black/10 rounded-l-lg cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-bold tabular-nums min-w-[1.4rem] text-center">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="p-1.5 hover:bg-black/10 rounded-r-lg cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
