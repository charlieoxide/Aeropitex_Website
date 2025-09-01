import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 neon-border-orange rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 neon-orange" />
              </div>
              <span className="text-xl font-bold neon-orange">Aeropithex</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Pioneering the future of technology with innovative solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 neon-pink">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-saas">SaaS Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-ai">AI/ML Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-security">Security Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 neon-blue">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-about">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-careers">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-contact">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 neon-orange">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 neon-border-orange rounded-lg flex items-center justify-center hover-glow" data-testid="social-twitter">
                <i className="fab fa-twitter neon-orange text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 neon-border-pink rounded-lg flex items-center justify-center hover-glow" data-testid="social-linkedin">
                <i className="fab fa-linkedin neon-pink text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 neon-border-blue rounded-lg flex items-center justify-center hover-glow" data-testid="social-github">
                <i className="fab fa-github neon-blue text-sm"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Aeropithex. All rights reserved. | Powered by cutting-edge technology
          </p>
        </div>
      </div>
    </footer>
  );
}
