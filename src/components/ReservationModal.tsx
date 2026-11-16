import { FormEvent, useState } from 'react';
import { CalendarCheck, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { buildWhatsAppReservationUrl } from '../utils/whatsapp';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '12:30 PM (Lunch)',
  '1:30 PM (Lunch)',
  '2:30 PM (Lunch)',
  '7:00 PM (Dinner)',
  '8:00 PM (Dinner)',
  '9:00 PM (Dinner)',
];

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[4]);
  const [guests, setGuests] = useState('4');
  const [seating, setSeating] = useState('AC Family Hall');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name for the table reservation.');
      return;
    }
    if (!/^[+\d\s-]{8,15}$/.test(phone.trim())) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const whatsappReserveUrl = buildWhatsAppReservationUrl({
    name,
    phone,
    date,
    timeSlot,
    guests,
    seating,
    notes,
  });

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/40 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg glass-surface-strong rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9531E]">
              {RESTAURANT_INFO.name}
            </p>
            <h2
              id="reservation-modal-title"
              className="font-display text-2xl font-bold text-[#1C1917] mt-1"
            >
              Reserve a Family Table
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close reservation modal"
            className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#16A34A]/12 text-[#16A34A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                Table Request Ready
              </h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Reserved for <span className="font-semibold text-[#1C1917]">{name}</span> ({guests}{' '}
                guests · {seating}) on{' '}
                <span className="font-semibold text-[#1C1917] tabular-nums">{date}</span> at{' '}
                <span className="font-semibold text-[#1C1917]">{timeSlot}</span>.
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              <a
                href={whatsappReserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full px-5 py-2.5 text-sm font-semibold text-[#1C1917] bg-white/80 hover:bg-white border border-[#1C1917]/12 rounded-xl cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errorMsg && (
              <div
                role="alert"
                className="px-4 py-2.5 text-xs font-medium text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl"
              >
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                  Guest Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Srinivasa Rao"
                  className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
                >
                  {['2', '4', '6', '8', '10', '12+'].map((count) => (
                    <option key={count} value={count}>
                      {count} Guests
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                  Preferred Time
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                  Seating Zone
                </label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
                >
                  <option value="AC Family Hall">AC Family Hall</option>
                  <option value="Large Group Table">Large Group Table</option>
                  <option value="Quiet Corner Booth">Quiet Corner Booth</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                Special Request (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., High chair needed, Birthday celebration"
                className="w-full px-3.5 py-2.5 text-sm bg-white/90 border border-[#1C1917]/12 rounded-xl text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/35 focus:border-[#D9531E]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#D9531E] hover:bg-[#C24515] rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" aria-hidden="true" />
              <span>Confirm Table Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
