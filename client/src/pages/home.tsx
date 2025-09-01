import { useEffect } from "react";
import ThreeBackground from "@/components/ThreeBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const handleClick = (e: Event) => {
      e.preventDefault();
      const link = e.target as HTMLAnchorElement;
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId!);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    navLinks.forEach(link => {
      link.addEventListener('click', handleClick);
    });

    // Scroll animations with Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all sections for fade-in animations
    const sections = document.querySelectorAll('.section-fade, .stagger-children');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThreeBackground />
      <Navigation />
      <Hero />
      <Services />
      <TechnologyShowcase />
      <Contact />
      <Footer />
    </div>
  );
}
