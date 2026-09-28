import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import { FestivalBanner } from "@/components/home/FestivalBanner";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { ShopByStone } from "@/components/home/ShopByStone";
import { SpiritualSpotlight } from "@/components/home/SpiritualSpotlight";
import { BirthstoneWidget } from "@/components/home/BirthstoneWidget";
import { BrandStory } from "@/components/home/BrandStory";
import { InstagramGallery } from "@/components/home/InstagramGallery";

// Festival collections go live by date, so rebuild the page hourly
export const revalidate = 3600;

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <TrustStrip />
      <FeaturedCollections />
      <FeaturedProduct />
      <FestivalBanner />
      <ShopByStone />
      <SpiritualSpotlight />
      <BirthstoneWidget />
      <BrandStory />
      <InstagramGallery />
    </Layout>
  );
}
