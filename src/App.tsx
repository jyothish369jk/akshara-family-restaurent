import { useCallback, useEffect, useMemo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { RatingsSection } from './components/RatingsSection';
import { ReservationModal } from './components/ReservationModal';
import { StorySection } from './components/StorySection';
import { MenuItem, RESTAURANT_INFO } from './data/menuData';
import { CartEntry } from './utils/whatsapp';

export default function App() {
  const [cartMap, setCartMap] = useState<Record<string, CartEntry>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleAddItem = useCallback((item: MenuItem) => {
    setCartMap((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, delta: number) => {
    setCartMap((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        const { [itemId]: _removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: {
          ...existing,
          quantity: nextQty,
        },
      };
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCartMap({});
  }, []);

  const cartEntries = useMemo(() => Object.values(cartMap), [cartMap]);

  const cartCount = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartEntries]
  );

  const cartTotal = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0),
    [cartEntries]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsReservationOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1C1917] flex flex-col">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="flex-1">
        <HeroSection onOpenReservation={() => setIsReservationOpen(true)} />

        <MenuSection
          cartMap={cartMap}
          onAddItem={handleAddItem}
          onUpdateQuantity={handleUpdateQuantity}
        />

        <StorySection />

        <RatingsSection />

        <ContactSection onOpenReservation={() => setIsReservationOpen(true)} />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#1C1917]/10 py-10 px-4 sm:px-6 bg-white/40">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-bold text-[#1C1917]">
              {RESTAURANT_INFO.name}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#57534E]">
              {RESTAURANT_INFO.address} · {RESTAURANT_INFO.hours}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#57534E]"
          >
            <a href="#home" className="hover:text-[#1C1917] transition-colors">
              Home
            </a>
            <a href="#menu" className="hover:text-[#1C1917] transition-colors">
              Menu
            </a>
            <a href="#story" className="hover:text-[#1C1917] transition-colors">
              Story
            </a>
            <a href="#ratings" className="hover:text-[#1C1917] transition-colors">
              Ratings
            </a>
            <a href="#contact" className="hover:text-[#1C1917] transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </footer>

      {/* Compact Floating Cart Pill on Mobile when items are added */}
      {cartCount > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-3 inset-x-4 z-30">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full h-12 px-4 rounded-2xl bg-[#D9531E] text-white shadow-lg flex items-center justify-between cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold">
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span className="tabular-nums">
                {cartCount} {cartCount === 1 ? 'Item' : 'Items'} Added
              </span>
            </span>
            <span className="text-sm font-bold tabular-nums">
              ₹{cartTotal} · View Order &rarr;
            </span>
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartEntries={cartEntries}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
