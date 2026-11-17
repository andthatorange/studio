import Hero from "@/components/Hero";
import WorkScroll from "@/components/WorkScroll";
import BeforeAfter from "@/components/BeforeAfter";
import ServicesOverview from "@/components/ServicesOverview";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import InstagramPosts from "@/components/InstagramPosts";
import Enquire from "@/components/Enquire";
import { projects } from "@/lib/content";

export default function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <WorkScroll projects={projects} />
      <BeforeAfter />
      <ServicesOverview />
      <Reviews />
      <About />
      <Process />
      <FAQ />
      <InstagramPosts />
      <Enquire />
    </div>
  );
}
