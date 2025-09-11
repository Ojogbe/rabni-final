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
    details: "Gwagwalada, Abuja, Federal Capital Territory, Nigeria",
    action: "Get Directions",
    link: "https://maps.app.goo.gl/your_office_location" // Placeholder link
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    description: "Call or chat with our support team",
    details: "+234 803 123 4567",
    action: "Call Now",
    link: "tel:+2348031234567"
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

const officeLocations = [
  { title: "Main Office", description: "Our primary administrative hub." },
  { title: "Learning Center", description: "Where our educational programs come to life." },
  { title: "Meeting Room", description: "For collaborations and stakeholder discussions." },
];

const immediateAssistanceCards = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    details: "+234 803 123 4567",
    link: "tel:+2348031234567",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us on WhatsApp",
    details: "+234 803 123 4567",
    link: "https://wa.me/2348031234567",
  },
  {
    icon: Mail,
    title: "Direct Email",
    description: "Send us an email directly",
    details: "info@rabni.org",
    link: "mailto:info@rabni.org",
  },
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

          {/* Right Column: Contact Info Cards, Office Locations, Map */}
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

            <FadeInOnScroll delay={200}>
              <h2 className="display-text text-primary mb-6">Visit Our Office</h2>
              <div className="bg-card p-8 rounded-xl shadow-lg border border-border mb-12">
                <p className="text-lg text-muted-foreground mb-4">RABNI Education Interventions HQ</p>
                <p className="text-md font-medium text-primary mb-2">Plot 123, Education Road, Gwagwalada, Abuja</p>
                <p className="text-sm text-muted-foreground mb-4">Open Mon-Fri: 9:00 AM - 5:00 PM. Saturday & Sunday: Closed.</p>
                <a href="https://maps.app.goo.gl/your_office_location" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="btn-outline">
                    Get Directions
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground mt-4">Visitors are welcome! We recommend scheduling an appointment for personalized attention.</p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={300}>
              <div className="bg-gray-100 p-8 rounded-xl shadow-lg min-h-[250px] flex items-center justify-center text-gray-500 mb-12">
                  <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">Map of our office location coming soon.</p>
                  </div>
                </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={400}>
              <h2 className="display-text text-primary mb-6">Our Office</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {officeLocations.map((location, index) => (
                  <Card key={index} className="ngo-card p-4 text-center">
                <CardContent className="p-0">
                      <h3 className="font-semibold text-primary mb-1">{location.title}</h3>
                      <p className="text-sm text-muted-foreground">{location.description}</p>
                </CardContent>
              </Card>
                ))}
            </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Need Immediate Assistance Section */}
      <section className="section-spacing bg-white">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll delay={100}>
            <h2 className="display-text text-muted-foreground mb-8">Need Immediate Assistance?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              For urgent matters or quick questions, try these alternative contact methods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {immediateAssistanceCards.map((item, index) => (
                <FadeInOnScroll key={item.title} delay={index * 100}>
                  <Card className="ngo-card p-6 flex flex-col items-center text-center h-full">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{item.description}</p>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <Button variant="outline" className="btn-outline">
                          {item.title === "Call Us" ? "Call Now" : item.title === "WhatsApp" ? "Chat on WhatsApp" : "Send an email"}
                </Button>
                      </a>
              </CardContent>
            </Card>
                </FadeInOnScroll>
              ))}
          </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}