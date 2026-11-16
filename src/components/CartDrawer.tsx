import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  Check,
  Copy,
  Eye,
  MessageCircle,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  Trash2,
  Wallet,
  X,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import {
  buildUpiDeepLink,
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  CartEntry,
  CheckoutDetails,
  generateOrderId,
  OrderType,
  PaymentMethod,
} from '../utils/whatsapp';
import { WhatsAppPreviewModal } from './WhatsAppPreviewModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartEntries: CartEntry[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartEntries,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [orderId] = useState<string>(() => generateOrderId());
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [screenshotConfirmed, setScreenshotConfirmed] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showWaPreview, setShowWaPreview] = useState(false);

  const totalAmount = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0),
    [cartEntries]
  );

  const totalItemCount = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartEntries]
  );

  const upiLink = useMemo(
    () => buildUpiDeepLink(totalAmount, orderId),
    [totalAmount, orderId]
  );

  useEffect(() => {
    if (!isOpen || paymentMethod !== 'upi' || totalAmount <= 0) return;
    let active = true;
    QRCode.toDataURL(upiLink, {
      width: 220,
      margin: 1,
      color: {
        dark: '#1C1917',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl('');
      });
    return () => {
      active = false;
    };
  }, [isOpen, paymentMethod, totalAmount, upiLink]);

  const checkoutDetails: CheckoutDetails = {
    orderId,
    orderType,
    customerName,
    customerPhone,
    tableNumber,
    deliveryAddress,
    paymentMethod,
    screenshotConfirmed,
  };

  const whatsappMessage = useMemo(
    () => buildWhatsAppOrderMessage(cartEntries, totalAmount, checkoutDetails),
    [cartEntries, totalAmount, orderId, orderType, customerName, customerPhone, tableNumber, deliveryAddress, paymentMethod, screenshotConfirmed]
  );

  const whatsappUrl = useMemo(
    () => buildWhatsAppOrderUrl(cartEntries, totalAmount, checkoutDetails),
    [cartEntries, totalAmount, orderId, orderType, customerName, customerPhone, tableNumber, deliveryAddress, paymentMethod, screenshotConfirmed]
  );

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT_INFO.upiId);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2000);
    } catch {
      setUpiCopied(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/35 backdrop-blur-xs"
      >
        <div
          className="flex-1"
          onClick={onClose}
          aria-hidden="true"
        />

        <aside className="relative w-full max-w-lg h-full bg-[#F8F7F4]/95 backdrop-blur-2xl border-l border-white/60 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-[#1C1917]/10 flex items-center justify-between gap-3 bg-white/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D9531E]/12 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-display text-lg font-bold text-[#1C1917]">
                  Your Order
                </h2>
                <p className="text-xs text-[#57534E] tabular-nums">
                  #{orderId} · {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartEntries.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#D9531E] rounded-lg hover:bg-white/80 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close order drawer"
                className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
            {cartEntries.length === 0 ? (
              <div className="glass-surface rounded-2xl p-8 text-center my-8">
                <ShoppingBag className="w-9 h-9 text-[#D9531E]/60 mx-auto mb-3" aria-hidden="true" />
                <p className="font-display text-xl font-semibold text-[#1C1917]">
                  Your order tray is empty
                </p>
                <p className="mt-1.5 text-sm text-[#57534E]">
                  Add biryanis, sizzling starters, or fried rice from the menu to start a direct
                  zero-commission WhatsApp order.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#C24515] rounded-xl cursor-pointer transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Itemized Cart List */}
                <div className="glass-surface rounded-2xl p-4 divide-y divide-[#1C1917]/8">
                  {cartEntries.map(({ item, quantity }) => (
                    <div key={item.id} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] border shrink-0 ${
                            item.isVeg ? 'border-[#16A34A]' : 'border-[#D9531E]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? 'bg-[#16A34A]' : 'bg-[#D9531E]'
                            }`}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#1C1917] truncate">{item.name}</p>
                          <p className="text-xs text-[#57534E] tabular-nums">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="inline-flex items-center rounded-lg bg-white border border-[#1C1917]/12">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                            className="p-1.5 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold tabular-nums text-[#1C1917]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                            className="p-1.5 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#1C1917] tabular-nums w-14 text-right">
                          ₹{item.price * quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1. Order Type Selector */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-2.5">
                    1. Order Type
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dine-in' as OrderType, label: 'Dine-In', sub: 'Table #' },
                      { id: 'takeaway' as OrderType, label: 'Takeaway', sub: 'Pickup' },
                      { id: 'delivery' as OrderType, label: 'Delivery', sub: 'Balaji Jct' },
                    ].map((opt) => {
                      const active = orderType === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setOrderType(opt.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'bg-[#D9531E] text-white border-[#D9531E] shadow-sm'
                              : 'bg-white/80 text-[#1C1917] border-[#1C1917]/10 hover:bg-white'
                          }`}
                        >
                          <span className="block text-xs sm:text-sm font-semibold whitespace-nowrap">
                            {opt.label}
                          </span>
                          <span
                            className={`block text-[11px] ${
                              active ? 'text-white/85' : 'text-[#78716C]'
                            }`}
                          >
                            {opt.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Customer Details */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                    2. Customer Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Name *"
                      aria-label="Customer Name"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/85 border border-[#1C1917]/12 rounded-xl text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E]"
                    />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Phone Number (Optional)"
                      aria-label="Phone Number"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/85 border border-[#1C1917]/12 rounded-xl text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E]"
                    />
                  </div>

                  {orderType === 'dine-in' && (
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Table Number (e.g., Table 4 or AC Hall)"
                      aria-label="Table Number"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/85 border border-[#1C1917]/12 rounded-xl text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E]"
                    />
                  )}

                  {orderType === 'delivery' && (
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Delivery Address (Balaji Junction / Vizianagaram Area)"
                      aria-label="Delivery Address"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/85 border border-[#1C1917]/12 rounded-xl text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/30 focus:border-[#D9531E] resize-none"
                    />
                  )}
                </div>

                {/* 3. Payment Method Selector (Zero Security Risk Flow) */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                    3. Payment Method
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'upi'
                          ? 'bg-white border-[#D9531E] ring-2 ring-[#D9531E]/20'
                          : 'bg-white/65 border-[#1C1917]/10 hover:bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#D9531E]/10 flex items-center justify-center shrink-0">
                        <QrCode className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#1C1917]">
                          Pay via UPI QR / GPay / PhonePe (Instant)
                        </p>
                        <p className="text-xs text-[#57534E]">
                          Zero fees · Direct restaurant UPI transfer
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'cod'
                          ? 'bg-white border-[#D9531E] ring-2 ring-[#D9531E]/20'
                          : 'bg-white/65 border-[#1C1917]/10 hover:bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#D49B35]/15 flex items-center justify-center shrink-0">
                        <Wallet className="w-4 h-4 text-[#B47D18]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#1C1917]">
                          Cash / UPI on Delivery or Counter
                        </p>
                        <p className="text-xs text-[#57534E]">
                          Pay directly when receiving your order
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Dynamic UPI Payment Box */}
                  {paymentMethod === 'upi' && (
                    <div className="glass-surface rounded-2xl p-4 space-y-3.5">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-32 h-32 rounded-xl bg-white p-2 border border-[#1C1917]/10 flex items-center justify-center shrink-0">
                          {qrDataUrl ? (
                            <img
                              src={qrDataUrl}
                              alt={`UPI QR code for ₹${totalAmount} to ${RESTAURANT_INFO.upiId}`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <QrCode className="w-16 h-16 text-[#1C1917]/40" aria-hidden="true" />
                          )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <p className="text-xs font-medium text-[#57534E]">Exact Payable Total</p>
                          <p className="font-display text-2xl font-bold text-[#1C1917] tabular-nums">
                            ₹{totalAmount}
                          </p>
                          <p className="mt-1 text-xs font-mono text-[#57534E]">
                            {RESTAURANT_INFO.upiId}
                          </p>

                          <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1C1917] bg-white hover:bg-[#F8F7F4] border border-[#1C1917]/12 rounded-lg cursor-pointer transition-colors"
                            >
                              {upiCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#16A34A]" aria-hidden="true" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Copy UPI ID</span>
                                </>
                              )}
                            </button>

                            <a
                              href={upiLink}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#D9531E] bg-[#D9531E]/10 hover:bg-[#D9531E]/15 rounded-lg transition-colors"
                            >
                              <span>Open UPI App</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <label className="flex items-start gap-2.5 pt-3 border-t border-[#1C1917]/8 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={screenshotConfirmed}
                          onChange={(e) => setScreenshotConfirmed(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-[#1C1917]/25 text-[#16A34A] focus:ring-[#16A34A]"
                        />
                        <span className="text-xs text-[#1C1917] leading-snug">
                          I will attach my UPI payment screenshot on WhatsApp
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer: Total & Dual Checkout Actions */}
          {cartEntries.length > 0 && (
            <div className="px-5 sm:px-6 py-4 border-t border-[#1C1917]/10 bg-white/85 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#57534E]">Grand Total</span>
                <span className="font-display text-2xl font-bold text-[#1C1917] tabular-nums">
                  ₹{totalAmount}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Send Order &amp; Payment on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowWaPreview(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1C1917] glass-pill hover:bg-white rounded-xl cursor-pointer transition-colors"
              >
                <Eye className="w-4 h-4 text-[#D9531E]" aria-hidden="true" />
                <span>Preview WhatsApp Receipt (Demo)</span>
              </button>
            </div>
          )}
        </aside>
      </div>

      <WhatsAppPreviewModal
        isOpen={showWaPreview}
        onClose={() => setShowWaPreview(false)}
        messageText={whatsappMessage}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}
