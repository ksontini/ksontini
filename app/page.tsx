import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import CaseStudies from "@/components/CaseStudies";
import Tools from "@/components/Tools";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <CaseStudies />
        <Tools />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
