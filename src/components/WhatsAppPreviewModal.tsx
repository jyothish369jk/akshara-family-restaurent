import { useState } from 'react';
import { Check, CheckCheck, Copy, ExternalLink, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageText: string;
  whatsappUrl: string;
}

export function WhatsAppPreviewModal({
  isOpen,
  onClose,
  messageText,
  whatsappUrl,
}: WhatsAppPreviewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/45 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md glass-surface-strong rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 id="wa-preview-title" className="font-display text-xl font-bold text-[#1C1917]">
              WhatsApp Receipt Preview
            </h3>
            <p className="text-xs text-[#57534E] mt-0.5">
              How the order appears on the restaurant&apos;s WhatsApp screen
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview modal"
            className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sleek In-App Phone Screen Mockup */}
        <div className="mx-auto max-w-[330px] rounded-[2rem] border-[6px] border-[#1C1917] bg-[#ECE5DD] overflow-hidden shadow-xl">
          {/* WhatsApp Top Bar */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#D9531E] flex items-center justify-center font-display font-bold text-sm shrink-0">
                A
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{RESTAURANT_INFO.name}</p>
                <p className="text-[10px] text-white/80 tabular-nums">
                  {RESTAURANT_INFO.phoneDisplay}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-emerald-200 whitespace-nowrap">
              Business Account
            </span>
          </div>

          {/* Chat Canvas */}
          <div className="p-3.5 max-h-[340px] overflow-y-auto space-y-2.5">
            <div className="mx-auto w-fit px-2.5 py-0.5 rounded-md bg-white/75 text-[10px] font-medium text-[#57534E]">
              Today
            </div>

            <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3.5 py-2.5 shadow-xs text-[#1C1917]">
              <pre className="font-sans text-[11.5px] leading-relaxed whitespace-pre-wrap break-words">
                {messageText}
              </pre>
              <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-[#57534E]">
                <span>Just now</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1C1917] bg-white/85 hover:bg-white border border-[#1C1917]/12 rounded-xl cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#16A34A]" aria-hidden="true" />
                <span>Receipt Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copy Receipt Text</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl transition-colors"
          >
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
