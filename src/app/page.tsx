import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-blue-100 to-white min-h-screen lg:pt-[40px]">
      <Navbar />
      <Hero/>
    </main>
  );
}
