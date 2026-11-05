import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import FeatureSection from "@/components/FeatureSection";
import AppShowcase from "@/components/AppShowcase";
import InteractivePreview from "@/components/InteractivePreview";
import SyncComparison from "@/components/SyncComparison";
import WidgetsShowcase from "@/components/WidgetsShowcase";
import PrivacySection from "@/components/PrivacySection";
import DownloadCTA from "@/components/DownloadCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Integrations />
        <FeatureSection />
        <AppShowcase />
        <InteractivePreview />
        <SyncComparison />
        <WidgetsShowcase />
        <PrivacySection />
        <DownloadCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
