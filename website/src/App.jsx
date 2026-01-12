import "./styles/global.css";
import projects from "./data/projects.json";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Pipeline from "./sections/Pipeline";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function App() {
  const projectCount = projects?.length ?? 0;

  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero projectCount={projectCount} />
        <Projects projects={projects} />
        <Pipeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
