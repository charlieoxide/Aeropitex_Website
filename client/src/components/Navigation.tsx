import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoUrl from "@/assets/aeropithex-logo.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleAdminAccess = () => {
    setLocation("/admin");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={logoUrl} 
              alt="Aeropithex Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary-green">Aeropithex</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors" data-testid="link-home">Home</a>
            <a href="#services" className="hover:text-primary transition-colors" data-testid="link-services">Services</a>
            <a href="#about" className="hover:text-primary transition-colors" data-testid="link-about">About</a>
            <a href="#contact" className="hover:text-primary transition-colors" data-testid="link-contact">Contact</a>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAdminAccess}
              className="opacity-0 hover:opacity-100 text-xs transition-opacity"
              data-testid="button-admin"
            >
              Admin
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-primary-green" />
            ) : (
              <Menu className="h-6 w-6 text-primary-green" />
            )}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="hover:text-primary transition-colors" data-testid="mobile-link-home">Home</a>
              <a href="#services" className="hover:text-primary transition-colors" data-testid="mobile-link-services">Services</a>
              <a href="#about" className="hover:text-primary transition-colors" data-testid="mobile-link-about">About</a>
              <a href="#contact" className="hover:text-primary transition-colors" data-testid="mobile-link-contact">Contact</a>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAdminAccess}
                className="text-left justify-start"
                data-testid="mobile-button-admin"
              >
                Admin
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
