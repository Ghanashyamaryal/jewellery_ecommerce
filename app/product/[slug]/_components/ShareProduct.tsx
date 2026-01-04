"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Share2,
  Mail,
  Copy,
  Check,
  MessageCircle,
  MessageSquare,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareProductProps {
  productName: string;
  productPrice: number;
  productImage?: string;
  slug: string;
}

export default function ShareProduct({
  productName,
  productPrice,
  productImage,
  slug,
}: ShareProductProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Get current URL or construct it
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/product/${slug}`
      : "";

  const shareData = {
    title: productName,
    text: `Check out ${productName} - Only $${productPrice.toFixed(2)}!`,
    url: productUrl,
  };

  // Handle native share (mobile)
  const handleNativeShare = async () => {
    if ("share" in navigator) {
      try {
        await navigator.share(shareData);
        setOpen(false);
        toast({
          title: "Shared successfully!",
          description: "Thank you for sharing this product.",
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed:", error);
      }
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
      });
    }
  };

  // Share via SMS
  const handleSMSShare = () => {
    const smsBody = encodeURIComponent(`${shareData.text}\n${productUrl}`);
    window.location.href = `sms:?&body=${smsBody}`;
    setOpen(false);
  };

  // Share to Telegram
  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      productUrl
    )}&text=${encodeURIComponent(shareData.text)}`;
    window.open(telegramUrl, "_blank");
    setOpen(false);
  };

  // Share to WhatsApp
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareData.text} ${productUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
    setOpen(false);
  };

  // Share via Email
  const handleEmailShare = () => {
    const subject = encodeURIComponent(productName);
    const body = encodeURIComponent(
      `I thought you might be interested in this product:\n\n${productName}\nPrice: $${productPrice.toFixed(
        2
      )}\n\n${productUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="h-10 w-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share this product</DialogTitle>
          <DialogDescription>
            Send {productName} to your friends and family via message
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Native Share (Mobile) */}
          {typeof window !== "undefined" && "share" in navigator && (
            <Button
              onClick={handleNativeShare}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Share via...</span>
            </Button>
          )}

          {/* Copy Link */}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full justify-start gap-3 h-12"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              {copied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5 text-gray-700" />
              )}
            </div>
            <span className="font-medium">
              {copied ? "Link copied!" : "Copy link"}
            </span>
          </Button>

          {/* Messaging Apps */}
          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp */}
            <Button
              onClick={handleWhatsAppShare}
              variant="outline"
              className="justify-start gap-3 h-12"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-medium">WhatsApp</span>
            </Button>

            {/* SMS/Text */}
            <Button
              onClick={handleSMSShare}
              variant="outline"
              className="justify-start gap-3 h-12"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium">Text/SMS</span>
            </Button>

            {/* Telegram */}
            <Button
              onClick={handleTelegramShare}
              variant="outline"
              className="justify-start gap-3 h-12"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-50">
                <Send className="h-5 w-5 text-sky-500" />
              </div>
              <span className="font-medium">Telegram</span>
            </Button>

            {/* Email */}
            <Button
              onClick={handleEmailShare}
              variant="outline"
              className="justify-start gap-3 h-12"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50">
                <Mail className="h-5 w-5 text-orange-600" />
              </div>
              <span className="font-medium">Email</span>
            </Button>
          </div>
        </div>

        {/* Product Preview */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            {productImage && (
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-white shrink-0">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{productName}</p>
              <p className="text-sm text-muted-foreground">
                ${productPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
