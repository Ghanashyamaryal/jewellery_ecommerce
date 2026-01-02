import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandStory } from "@/components/home/BrandStory";
import { BirthstoneWidget } from "@/components/home/BirthstoneWidget";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { CTASection } from "@/components/home/CTASection";
import FeaturedCollections from "./components/home/FeaturedCollections";
import { FeaturedProduct } from "./components/home/FeaturedProduct";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProduct />
      <BirthstoneWidget />
      <InstagramGallery />
      <BrandStory />
      {/* <CTASection /> */}
    </Layout>
  );
}
