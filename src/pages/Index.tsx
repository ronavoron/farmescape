
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FarmGrid } from "@/components/FarmGrid";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <FarmGrid />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Index;
