import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BrandStory } from "@/components/home/BrandStory";
import { BirthstoneWidget } from "@/components/home/BirthstoneWidget";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCollections />
      <BrandStory />
      <BirthstoneWidget />
      <InstagramGallery />
      <CTASection />
    </Layout>
  );
}
