import { Code, Brain, Shield, Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "saas",
      icon: Code,
      title: "SaaS Web Development",
      description: "Scalable web applications built with modern frameworks, cloud-native architecture, and futuristic user experiences.",
      features: [
        "Cloud-Native Architecture",
        "Real-time Collaboration", 
        "Advanced Analytics",
        "API-First Design"
      ],
      borderClass: "border-primary-green",
      iconClass: "text-primary-green",
      titleClass: "text-primary-green"
    },
    {
      id: "ai",
      icon: Brain,
      title: "AI/ML Innovation", 
      description: "Intelligent systems powered by cutting-edge machine learning algorithms and neural networks for autonomous decision-making.",
      features: [
        "Neural Networks",
        "Computer Vision",
        "Natural Language Processing", 
        "Predictive Analytics"
      ],
      borderClass: "border-secondary-green",
      iconClass: "text-secondary-green",
      titleClass: "text-secondary-green"
    },
    {
      id: "security",
      icon: Shield,
      title: "Security-as-a-Service",
      description: "Advanced cybersecurity solutions with AI-powered threat detection and quantum-resistant encryption protocols.",
      features: [
        "Zero-Trust Architecture",
        "AI Threat Detection",
        "Quantum Encryption",
        "24/7 Monitoring"
      ],
      borderClass: "border-accent-blue", 
      iconClass: "text-accent-blue",
      titleClass: "text-accent-blue"
    }
  ];

  return (
    <section id="services" className="py-20 relative section-fade">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-secondary-green">Our</span> <span className="text-primary-green">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions designed for the future
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`glass-card ${service.borderClass} rounded-xl p-8 hover-glow floating`}
              style={{animationDelay: `${index * 0.5}s`}}
              data-testid={`card-service-${service.id}`}
            >
              <div className={`w-16 h-16 ${service.borderClass} rounded-lg flex items-center justify-center mb-6 mx-auto`}>
                <service.icon className={`${service.iconClass} h-8 w-8`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${service.titleClass}`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 text-sm">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="text-accent-blue h-4 w-4 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
