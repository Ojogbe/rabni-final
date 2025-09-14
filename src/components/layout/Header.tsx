import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Impact", href: "/impact" },
  { name: "Gallery", href: "/gallery" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    return location.pathname === href;
  };
  
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split('#');
    if (path && path !== location.pathname) {
      navigate(href);
    } else if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <nav className="container-padding max-w-7xl mx-auto" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex flex-col items-center" onClick={(e) => handleScrollToSection(e, "/")}>
              <div className="flex items-center justify-center h-8 w-28">
                <img 
                  src="/src/assets/NEW%20LOGO.png" 
                  alt="RABNI Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/get-involved#donate" onClick={(e) => handleScrollToSection(e, "/get-involved#donate")}>
              <Button className="btn-hero">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/get-involved#donate" className="block" onClick={(e) => handleScrollToSection(e, "/get-involved#donate")}>
                  <Button className="btn-hero w-full">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}