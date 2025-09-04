import { useEffect } from "react";
import * as anime from "animejs";

export default function Hero() {
  useEffect(() => {
    // Enhanced entrance animations
    anime.timeline({
      easing: 'easeOutExpo',
    })
    .add({
      targets: '.hero-title-1',
      opacity: [0, 1],
      translateX: [-100, 0],
      duration: 1000,
    })
    .add({
      targets: '.hero-title-2',
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 1000,
    }, '-=800')
    .add({
      targets: '.hero-title-3',
      opacity: [0, 1],
      translateX: [-100, 0],
      duration: 1000,
    }, '-=800')
    .add({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, '-=600')
    .add({
      targets: '.hero-buttons',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, '-=400');

    // Continuous floating animation for background elements
    anime({
      targets: '.floating',
      translateY: [-10, 10],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(200)
    });

    // Pulse animation for glowing elements
    anime({
      targets: '.pulse-glow',
      scale: [1, 1.1],
      opacity: [0.6, 1],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      delay: anime.stagger(300)
    });
  }, []);
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden tech-grid pt-20 section-fade">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Data Flow Lines */}
        <div className="absolute top-1/4 left-0 w-1 h-px bg-gradient-to-r from-transparent via-brand-green to-transparent data-flow"></div>
        <div className="absolute top-1/2 left-0 w-1 h-px bg-gradient-to-r from-transparent via-brand-green-secondary to-transparent data-flow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-0 w-1 h-px bg-gradient-to-r from-transparent via-brand-blue-accent to-transparent data-flow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/6 left-0 w-1 h-px bg-gradient-to-r from-transparent via-brand-green to-transparent data-flow" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-5/6 left-0 w-1 h-px bg-gradient-to-r from-transparent via-brand-blue-accent to-transparent data-flow" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-16 h-16 border-primary-green transform rotate-45 floating pulse-glow"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 border-secondary-green rounded-full bounceGentle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 border-accent-blue floating" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 border-primary-green rounded-full orbit" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-10 h-10 border-secondary-green transform rotate-45 rotate-slow"></div>
        <div className="absolute top-3/4 left-1/2 w-4 h-4 border-accent-blue rounded-full pulse-glow" style={{animationDelay: '3s'}}></div>
        
        {/* Additional animated elements */}
        <div className="absolute top-1/4 right-1/2 w-2 h-20 bg-gradient-to-b from-brand-green to-transparent opacity-30 rotate-12 floating" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-16 bg-gradient-to-t from-brand-blue-accent to-transparent opacity-40 -rotate-12 bounceGentle" style={{animationDelay: '2.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="hero-title-1 text-primary-green pulse-neon opacity-0">Future</span><br />
            <span className="hero-title-2 text-secondary-green opacity-0">Tech</span>{' '}
            <span className="hero-title-3 text-accent-blue opacity-0">Solutions</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0">
            Pioneering the next generation of technology with cutting-edge AI, security, and SaaS solutions
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center opacity-0">
            <button 
              className="px-8 py-4 bg-brand-green text-black hover:bg-brand-green/90 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              data-testid="button-explore-services"
            >
              Explore Services
            </button>
            <button 
              className="px-8 py-4 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-black rounded-lg font-semibold transition-all"
              data-testid="button-learn-more"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
