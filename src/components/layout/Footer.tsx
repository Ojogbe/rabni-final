import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Impact", href: "/impact" },
    { name: "Get Involved", href: "/get-involved" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Annual Reports", href: "/reports" },
  ],
  social: [
    { name: "Facebook", href: "https://www.facebook.com/share/1CU1kHkmEi/", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/rabnieducationinterventions?igsh=OXd2enExanF1NDh2", icon: Twitter },
    { name: "LinkedIn", href: "https://share.google/ktcdgk6YLQSPr9vzR", icon: Linkedin },
    { name: "YouTube", href: "https://youtube.com/@rabnieducationinterventions?si=vbT8YawVvDuVvy8e", icon: Youtube },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center mb-4">
              <div className="flex items-center justify-center h-8 w-28 mb-2">
                <img 
                  src="/src/assets/NEW%20LOGO.png" 
                  alt="RABNI Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
              <p className="text-sm opacity-90 mb-4">
                Transforming communities through education. Reaching underserved, marginalized, 
                and conflict-affected communities across Nigeria.
              </p>
              <div className="flex space-x-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Organization
              </h3>
              <ul className="space-y-2">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm opacity-90 hover:opacity-100 transition-opacity"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm opacity-90 hover:opacity-100 transition-opacity"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0 opacity-70" />
                  <span className="text-sm opacity-90">
                    Plot 171 Shargale Plaza,<br />
                    Old Kutunku Road, Gwagwalada,<br />
                    Abuja, Nigeria
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 flex-shrink-0 opacity-70" />
                  <span className="text-sm opacity-90">contactrabni@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 flex-shrink-0 opacity-70" />
                  <span className="text-sm opacity-90">+2347033247060</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 flex-shrink-0 opacity-70" />
                  <span className="text-sm opacity-90">+2348142450774</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-90">
              © 2025 RABNI Education Interventions LTD/GTE. All rights reserved.
            </p>
            <p className="text-sm opacity-90 mt-2 md:mt-0">
              Registered | RC1989838
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}