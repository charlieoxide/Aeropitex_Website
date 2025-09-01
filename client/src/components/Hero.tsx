export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden tech-grid pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Data Flow Lines */}
        <div className="absolute top-1/4 left-0 w-1 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent data-flow"></div>
        <div className="absolute top-1/2 left-0 w-1 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent data-flow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-0 w-1 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent data-flow" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-16 h-16 neon-border-cyan transform rotate-45 floating"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 neon-border-purple rounded-full floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 neon-border-green floating" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="neon-cyan pulse-neon">Future</span><br />
            <span className="neon-purple">Tech</span>{' '}
            <span className="neon-green">Solutions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pioneering the next generation of technology with cutting-edge AI, security, and SaaS solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 neon-border-cyan glass-card hover-glow rounded-lg font-semibold neon-cyan transition-all"
              data-testid="button-explore-services"
            >
              Explore Services
            </button>
            <button 
              className="px-8 py-4 border border-muted-foreground hover:border-primary rounded-lg font-semibold transition-all"
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
