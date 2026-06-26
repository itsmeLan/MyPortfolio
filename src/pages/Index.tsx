import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';

const Index = () => {
  const [activeProjectTitle, setActiveProjectTitle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Projects activeProjectTitle={activeProjectTitle} setActiveProjectTitle={setActiveProjectTitle} />
      <Contact />
      <Footer />
      <CommandPalette onOpenProject={(title) => setActiveProjectTitle(title)} />
    </div>
  );
};

export default Index;
