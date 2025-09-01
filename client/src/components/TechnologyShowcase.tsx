export default function TechnologyShowcase() {
  const technologies = [
    { icon: "fab fa-react", name: "React/Next.js", color: "neon-orange" },
    { icon: "fas fa-robot", name: "TensorFlow", color: "neon-pink" },
    { icon: "fab fa-aws", name: "Cloud Infrastructure", color: "neon-blue" },
    { icon: "fas fa-lock", name: "Blockchain Security", color: "neon-orange" }
  ];

  return (
    <section className="py-20 bg-neon-gradient relative overflow-hidden section-fade">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-orange">Advanced</span> <span className="neon-blue">Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by next-generation frameworks and cutting-edge infrastructure
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 stagger-children">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 text-center hover-glow"
              data-testid={`card-technology-${index}`}
            >
              <i className={`${tech.icon} ${tech.color} text-4xl mb-4`}></i>
              <h4 className="font-semibold">{tech.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
