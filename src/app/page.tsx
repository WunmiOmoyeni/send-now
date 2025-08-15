import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/Features";
import FeaturesExtra from "@/components/FeaturesExtra";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-blue-100 to-white min-h-screen lg:pt-[40px]">
      <Navbar />
      <Hero/>
      <FeaturesSection/>
      <FeaturesExtra/>
      <Faq/>
      <Footer/>
      <Copyright/>
    </main>
  );
}
