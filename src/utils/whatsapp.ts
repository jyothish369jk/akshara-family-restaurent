import { MenuItem, RESTAURANT_INFO } from '../data/menuData';

export interface CartEntry {
  item: MenuItem;
  quantity: number;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';
export type PaymentMethod = 'upi' | 'cod';

export interface CheckoutDetails {
  orderId: string;
  orderType: OrderType;
  customerName: string;
  customerPhone: string;
  tableNumber: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  screenshotConfirmed: boolean;
}

export function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `AKR-${num}`;
}

export function buildUpiDeepLink(totalAmount: number, orderId: string): string {
  const params = new URLSearchParams({
    pa: RESTAURANT_INFO.upiId,
    pn: RESTAURANT_INFO.name,
    tn: `Order ${orderId}`,
    am: totalAmount.toFixed(2),
    cu: 'INR',
  });
  return `upi://pay?${params.toString()}`;
}

export function buildWhatsAppOrderMessage(
  cart: CartEntry[],
  total: number,
  details: CheckoutDetails
): string {
  const orderTypeLabel =
    details.orderType === 'dine-in'
      ? `Dine-In (Table #${details.tableNumber.trim() || 'Counter'})`
      : details.orderType === 'takeaway'
      ? 'Takeaway / Self Pickup'
      : 'Home Delivery (Balaji Junction Area)';

  const paymentLabel =
    details.paymentMethod === 'upi'
      ? details.screenshotConfirmed
        ? `Paid via UPI (${RESTAURANT_INFO.upiId}) — Screenshot Attached`
        : `UPI QR / GPay / PhonePe (${RESTAURANT_INFO.upiId})`
      : details.orderType === 'delivery'
      ? 'Cash / UPI on Delivery'
      : 'Cash / UPI at Restaurant Counter';

  const itemLines = cart
    .map(
      ({ item, quantity }, idx) =>
        `${idx + 1}. ${item.name} × ${quantity} = ₹${item.price * quantity}`
    )
    .join('\n');

  const locationLine =
    details.orderType === 'dine-in'
      ? `Table No: ${details.tableNumber.trim() || 'To be assigned'}`
      : details.orderType === 'delivery'
      ? `Delivery Address: ${details.deliveryAddress.trim() || 'Near Balaji Junction, Vizianagaram'}`
      : 'Pickup Location: 4, Balaji Junction, Vizianagaram';

  return [
    `*AKSHARA FAMILY RESTAURANT*`,
    `Order ID: *#${details.orderId}*`,
    `--------------------------------`,
    `Customer: ${details.customerName.trim() || 'Guest'}`,
    details.customerPhone.trim() ? `Phone: ${details.customerPhone.trim()}` : null,
    `Order Type: ${orderTypeLabel}`,
    locationLine,
    `--------------------------------`,
    `*Order Items:*`,
    itemLines,
    `--------------------------------`,
    `*Total Payable: ₹${total}*`,
    `Payment Status: ${paymentLabel}`,
    `--------------------------------`,
    `Please confirm preparation time. Thank you!`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildWhatsAppOrderUrl(
  cart: CartEntry[],
  total: number,
  details: CheckoutDetails
): string {
  const text = buildWhatsAppOrderMessage(cart, total, details);
  return `https://wa.me/${RESTAURANT_INFO.whatsappDigits}?text=${encodeURIComponent(text)}`;
}

export interface ReservationPayload {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: string;
  seating: string;
  notes: string;
}

export function buildWhatsAppReservationUrl(payload: ReservationPayload): string {
  const lines = [
    `*TABLE RESERVATION — AKSHARA FAMILY RESTAURANT*`,
    `--------------------------------`,
    `Guest Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Date: ${payload.date}`,
    `Time Slot: ${payload.timeSlot}`,
    `Party Size: ${payload.guests} Guests`,
    `Seating: ${payload.seating}`,
    payload.notes.trim() ? `Notes: ${payload.notes.trim()}` : null,
    `--------------------------------`,
    `4, Balaji Junction, Vizianagaram`,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${RESTAURANT_INFO.whatsappDigits}?text=${encodeURIComponent(lines)}`;
}
