import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Brands from "@/components/Brands";
import Events from "@/components/Events";
import Energy from "@/components/Energy";
import Numbers from "@/components/Numbers";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Backstage from "@/components/Backstage";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingBook from "@/components/FloatingBook";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Manifesto />
      <Brands />
      <Events />
      <Energy />
      <Numbers />
      <Process />
      <Testimonials />
      <Backstage />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingBook />
    </main>
  );
}
