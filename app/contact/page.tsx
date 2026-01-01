"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {[
              {
                icon: Phone,
                title: "Phone",
                info: "+977-1-4123456",
                subtitle: "Available during business hours",
              },
              {
                icon: Mail,
                title: "Email",
                info: "hello@aryalsirinjems.com",
                subtitle: "We'll respond within 24 hours",
              },
              {
                icon: MapPin,
                title: "Location",
                info: "Patan, Kathmandu, Nepal",
                subtitle: "Visit our studio by appointment",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-foreground" />
                  <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                  <p className="font-medium text-foreground mb-1">
                    {item.info}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Hours */}
          <div className="bg-muted/30 rounded-lg p-8 mb-16 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-foreground flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-xl mb-4">Business Hours</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monday - Friday</p>
                    <p className="font-medium">10:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Saturday</p>
                    <p className="font-medium">11:00 AM - 5:00 PM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sunday</p>
                    <p className="font-medium">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us how we can help..."
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full tracking-widest uppercase text-sm"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
