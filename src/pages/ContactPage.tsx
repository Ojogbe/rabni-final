import { useState } from "react";
import { Phone, Mail, ArrowRight, Check, MapPin, MessageCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const contactInfoCards = [
  {
    icon: MapPin,
    title: "Office Address",
    description: "Come visit us at our office location",
    details: "RABNI HQ, Garki, Abuja, Federal Capital Territory, Nigeria",
    action: "Get Directions",
    link: "https://maps.app.goo.gl/xs6Vyt18CQmbWMVd6"
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    description: "Call or chat with our support team",
    details: "+234 703 324 7060",
    action: "Call Now",
    link: "tel:+2347033247060"
  },
  {
    icon: Mail,
    title: "Email Address",
    description: "Send us an email for inquiries",
    details: "info@rabni.org",
    action: "Send Email",
    link: "mailto:info@rabni.org"
  },
  {
    icon: Clock,
    title: "Office Hours",
    description: "Our team is available during these times",
    details: "Mon - Fri: 9:00 AM - 5:00 PM",
    action: "Schedule Visit",
    link: "/contact#schedule"
  }
];

const immediateAssistanceCards = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    details: "+234 703 324 7060",
    link: "tel:+2347033247060",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us on WhatsApp",
    details: "+234 703 324 7060",
    link: "https://wa.me/2347033247060",
  },
  {
    icon: Mail,
    title: "Direct Email",
    description: "Send us an email directly",
    details: "info@rabni.org",
    link: "mailto:info@rabni.org",
  },
];

const socialMediaLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/rabni-education-interventions/posts/?feedView=all",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    url: "https://web.facebook.com/ReadABookNigeriaInitiative",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rabnieducationinterventions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        sender_name: formData.name,
        sender_email: formData.email,
        sender_phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message,
        is_read: false,
      });
      if (error) {
        toast.error("Error sending message: " + error.message);
        return;
      }
      setSubmitted(true);
      toast.success("Message submitted successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "General Inquiry",
        organization: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      toast.error("Unexpected error: " + (err?.message || String(err)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-light/20 py-20 lg:py-32">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="display-text text-primary mb-4">Get in Touch</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have questions about our programs, want to 
              volunteer, or are interested in partnering with us, your contribution helps us expand our reach.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Main Contact Section: Form and Info Cards */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Send Us a Message Form */}
          <FadeInOnScroll>
            <div>
              <h2 className="display-text text-primary mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+234 801 234 5678" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="inquiryType">Type of Inquiry</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleSelectChange('inquiryType', value)}>
                      <SelectTrigger id="inquiryType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization (if applicable)</Label>
                    <Input id="organization" placeholder="RABNI Foundation" value={formData.organization} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Brief summary of your message" value={formData.subject} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea id="message" rows={5} placeholder="Provide detailed information about your inquiry..." value={formData.message} onChange={handleInputChange} required />
                </div>
                <p className="text-xs text-muted-foreground">* Required fields. We typically respond within 24 hours on business days.</p>
                <Button type="submit" className="btn-secondary" disabled={isSaving}>
                  {isSaving ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                  {submitted ? <Check className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          </FadeInOnScroll>

          {/* Right Column: Contact Info Cards */}
          <div>
            <FadeInOnScroll delay={100}>
              <h2 className="display-text text-primary mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {contactInfoCards.map((item) => (
                  <Card key={item.title} className="ngo-card p-6 flex flex-col items-center text-center h-full">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{item.description}</p>
                      <p className="text-md font-medium text-primary mb-4">{item.details}</p>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                          <Button variant="outline" className="btn-outline">
                            {item.action}
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 bg-white">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll delay={100}>
            <h2 className="display-text text-primary mb-4">Connect With Us on Social Media</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Follow us to stay updated with our latest news, events, and initiatives.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              {socialMediaLinks.map((social, index) => (
                <FadeInOnScroll key={social.name} delay={index * 100}>
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ngo-card w-48"
                  >
                    <div className="text-primary mb-3">
                      {social.icon}
                    </div>
                    <span className="font-medium text-primary">{social.name}</span>
                  </a>
                </FadeInOnScroll>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}