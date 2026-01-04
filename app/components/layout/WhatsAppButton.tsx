import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productName?: string;
}

export function WhatsAppButton({ productName }: WhatsAppButtonProps) {
  const phoneNumber = "9779860120739";
  const message = productName
    ? `Hi! I'm interested in ${productName} from Aryal Siring Gems.`
    : "Hi! I'm interested in your jewelry collection.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden group-hover:inline text-sm font-medium">
        Chat with us
      </span>
    </a>
  );
}
