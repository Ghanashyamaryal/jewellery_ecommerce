"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function BespokePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jewelryType: "",
    metalPreference: "",
    stonePreference: "",
    budget: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your inquiry! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      jewelryType: "",
      metalPreference: "",
      stonePreference: "",
      budget: "",
      description: "",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Custom Creations
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Bespoke Jewelry
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a one-of-a-kind piece that tells your unique story. 
            Work directly with our master artisans to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-16">The Bespoke Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Share your ideas and inspiration with us" },
              { step: "02", title: "Design", desc: "Our artisans create detailed sketches" },
              { step: "03", title: "Crafting", desc: "Your piece is handcrafted with care" },
              { step: "04", title: "Delivery", desc: "Receive your unique creation" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-xl">{item.step}</span>
                </div>
                <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-4">Start Your Journey</h2>
            <p className="text-center text-muted-foreground mb-12">
              Tell us about your dream piece and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jewelryType">Jewelry Type *</Label>
                  <Select
                    value={formData.jewelryType}
                    onValueChange={(value) => setFormData({ ...formData, jewelryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      <SelectItem value="ring">Ring</SelectItem>
                      <SelectItem value="necklace">Necklace</SelectItem>
                      <SelectItem value="earrings">Earrings</SelectItem>
                      <SelectItem value="pendant">Pendant</SelectItem>
                      <SelectItem value="bracelet">Bracelet</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="metalPreference">Metal Preference</Label>
                  <Select
                    value={formData.metalPreference}
                    onValueChange={(value) => setFormData({ ...formData, metalPreference: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select metal" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      <SelectItem value="925-silver">925 Sterling Silver</SelectItem>
                      <SelectItem value="copper">Copper</SelectItem>
                      <SelectItem value="mixed">Mixed Metals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stonePreference">Stone Preference</Label>
                  <Select
                    value={formData.stonePreference}
                    onValueChange={(value) => setFormData({ ...formData, stonePreference: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stone" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      <SelectItem value="amethyst">Amethyst</SelectItem>
                      <SelectItem value="turquoise">Turquoise</SelectItem>
                      <SelectItem value="moonstone">Moonstone</SelectItem>
                      <SelectItem value="garnet">Garnet</SelectItem>
                      <SelectItem value="no-stone">No Stone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (NPR)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., 50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Design Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your ideal piece in detail..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full tracking-widest uppercase text-sm">
                Submit Your Design
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
