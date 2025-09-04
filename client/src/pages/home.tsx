import { useEffect } from "react";
import * as anime from "animejs";
import ThreeBackground from "@/components/ThreeBackground";
import ScrollIndicator from "@/components/ScrollIndicator";
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
        // Use anime.js for smooth scrolling
        anime({
          targets: 'html, body',
          scrollTop: targetElement.offsetTop - 80,
          duration: 1200,
          easing: 'easeInOutQuart'
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
          
          // Enhanced entrance animations with anime.js
          if (entry.target.classList.contains('section-fade')) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 1000,
              easing: 'easeOutExpo'
            });
          }
          
          if (entry.target.classList.contains('stagger-children')) {
            const children = entry.target.children;
            anime({
              targets: children,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: anime.stagger(150),
              easing: 'easeOutExpo'
            });
          }
        }
      });
    }, observerOptions);

    // Observe all sections for fade-in animations
    const sections = document.querySelectorAll('.section-fade, .stagger-children');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Enhanced parallax effect with anime.js
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        
        anime({
          targets: element,
          translateY: yPos,
          duration: 100,
          easing: 'linear'
        });
      });
      
      // Animate navigation background based on scroll
      const nav = document.querySelector('nav');
      if (nav) {
        const opacity = Math.min(scrolled / 100, 0.95);
        anime({
          targets: nav,
          backgroundColor: `rgba(9, 9, 9, ${opacity})`,
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
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
      <ScrollIndicator />
      <Navigation />
      <Hero />
      <Services />
      <TechnologyShowcase />
      <Contact />
      <Footer />
    </div>
  );
}
