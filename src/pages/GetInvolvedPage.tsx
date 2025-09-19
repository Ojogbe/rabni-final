import { useState } from "react";
import { Heart, Users, Briefcase, DollarSign, Mail, Phone, MapPin, Send, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import volunteerImage from "@/assets/hero-education.jpg";
import { Link } from "react-router-dom";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { jsPDF } from 'jspdf';

const volunteerOpportunities = [
  {
    title: "Literacy Mentor",
    time: "2-4 hours/week",
    description: "Support children with reading and writing skills through our literacy bootcamps.",
    skills: ["Reading proficiency", "Patience", "Communication"],
    location: "On-site & Remote"
  },
  {
    title: "Digital Literacy Trainer",
    time: "4-6 hours/week",
    description: "Teach basic computer skills and digital literacy to teachers and students.",
    skills: ["Computer skills", "Teaching ability", "Tech-savvy"],
    location: "On-site"
  },
  {
    title: "Community Outreach",
    time: "6-8 hours/week",
    description: "Engage with communities to promote education programs and gather feedback.",
    skills: ["Local languages", "Community engagement", "Cultural sensitivity"],
    location: "Field work"
  },
  {
    title: "Content Creator",
    time: "3-5 hours/week",
    description: "Develop educational content, videos, and materials for our programs.",
    skills: ["Content writing", "Video editing", "Creative design"],
    location: "Remote"
  }
];

const donationTiers = [
  {
    amount: "₦5,000",
    title: "Literacy Kit",
    description: "Provides basic learning materials for one child for a month",
    impact: "1 child supported"
  },
  {
    amount: "₦25,000",
    title: "Digital Access",
    description: "Funds tablet and digital learning content for one student",
    impact: "1 student equipped"
  },
  {
    amount: "₦100,000",
    title: "Teacher Training",
    description: "Sponsors complete training program for one teacher",
    impact: "1 teacher trained"
  },
  {
    amount: "₦500,000",
    title: "Community Hub",
    description: "Establishes a learning hub in one community",
    impact: "100+ families served"
  }
];

// IMPORTANT: On Vercel, you cannot reference images under /src via a URL. Serve from /public instead.
// Place logo files under public/partners with these exact filenames (case-sensitive).
const partners = [
  { name: "U.S. Embassy & Consulate in Nigeria", logo: "U.S. Embassy and Consulate in Nigeria.png", type: "Government" },
  { name: "Project Literacy", logo: "Project Literacy.jpg", type: "Educational" },
  { name: "Abuja Enterprise Agency (AEA)", logo: "Abuja Enterprise Agency (AEA).jpg", type: "Government" },
  { name: "International Rescue Committee (IRC)", logo: "INTERNATIONAL RESCUE COMMITEE (IRC).jpg", type: "NGO" },
  { name: "Gordon Barrett", logo: "Gordon Barrett.png", type: "Individual" },
  { name: "Northeast Humanitarian Innovation Hub (NEHIH)", logo: "Northeast Humanitarian Innovation Hub (NEHIH).png", type: "NGO" },
  { name: "HH Muhammad Sanusi II SDG Challenge", logo: "HH Muhammad Sanusi II SDG Challenge.png", type: "Foundation" },
  { name: "TED-Ed", logo: "TED-Ed.jpg", type: "Educational" },
  { name: "UN Sustainable Development Goals (SDGs)", logo: "UN Sustainable Development Goals (SDGs).png", type: "International" },
  { name: "YALI Regional Leadership Center West Africa – Accra", logo: "Yali Regional Leadership Center.png", type: "Educational" },
  { name: "Korean Cultural Centre", logo: "Korean Cultural Centre.jpg", type: "Cultural" }
];

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    why_interested: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    } else {
      setCvFile(null);
    }
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("RABNI Volunteer Application", 20, 20);
    doc.setFontSize(12);
    let yPos = 30;

    const addField = (label: string, value: string | undefined) => {
      if (value) {
        doc.text(`${label}: ${value}`, 20, yPos);
        yPos += 10;
      }
    };

    yPos += 10; // Space after title

    addField("Full Name", formData.full_name);
    addField("Email", formData.email);
    addField("Phone", formData.phone);
    addField("Skills", formData.skills);
    addField("Availability", formData.availability);
    
    if (formData.why_interested) {
      doc.text("Why Interested:", 20, yPos);
      yPos += 10;
      const splitText = doc.splitTextToSize(formData.why_interested, 170); // Max width 170mm
      doc.text(splitText, 20, yPos);
      yPos += (splitText.length * 7); // Adjust line height
    }

    if (cvFile) {
      addField("CV File", cvFile.name);
    }

    doc.save(`RABNI_Volunteer_Application_${formData.full_name.replace(/\s+/g, '_') || 'Anonymous'}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false); // Reset submitted state on new submission attempt

    let cv_url = null;

    if (cvFile) {
      const fileExtension = cvFile.name.split('.').pop();
      const filePath = `volunteer_cvs/${formData.full_name.replace(/\s+/g, '_')}_${Date.now()}.${fileExtension}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cvs') // Assuming you have a 'cvs' bucket for volunteer CVs
        .upload(filePath, cvFile);

      if (uploadError) {
        toast.error("Error uploading CV: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }
      cv_url = uploadData.path ? supabase.storage.from('cvs').getPublicUrl(uploadData.path).data.publicUrl : null; 
    }

    const { error } = await supabase
      .from('volunteer_applications')
      .insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
        availability: formData.availability,
        why_interested: formData.why_interested,
        cv_url: cv_url,
      });

    if (error) {
      toast.error("Error submitting application: " + error.message);
    } else {
      toast.success("Application submitted successfully!");
      setSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        skills: "",
        availability: "",
        why_interested: "",
      });
      setCvFile(null);
      // Reset file input manually
      const fileInput = document.getElementById('cv') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-light/20 py-20 lg:py-32">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="display-text text-primary mb-4">Get Involved with RABNI</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our mission to transform education in Nigeria. Whether through volunteering, 
              donating, or partnering with us, your contribution makes a real difference in the lives of 
              children and communities.
          </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Main Tabs (Volunteer, Donate, Partner) */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
          <Tabs defaultValue="volunteer" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-12 bg-background p-1 rounded-full shadow-sm">
                <TabsTrigger value="volunteer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-full transition-all text-sm font-medium px-4 py-2">Volunteer</TabsTrigger>
                <TabsTrigger value="donate" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-full transition-all text-sm font-medium px-4 py-2">Donate</TabsTrigger>
                <TabsTrigger value="partner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-full transition-all text-sm font-medium px-4 py-2">Partner</TabsTrigger>
            </TabsList>

              {/* Volunteer Tab Content */}
              <TabsContent value="volunteer">
                <div className="text-center mb-12">
                <h2 className="display-text text-primary mb-4">Volunteer Opportunities</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Lend your time, skills, and passion to make a tangible difference in children's lives.
                </p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  {volunteerOpportunities.map((role, index) => (
                    <FadeInOnScroll key={role.title} delay={index * 100}>
                      <Card className="ngo-card p-6 text-center flex flex-col h-full">
                        <CardContent className="p-0 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold text-primary mb-2">{role.title}</h3>
                          <p className="text-muted-foreground text-sm flex-1 mb-4">{role.description}</p>
                          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground mb-4">
                            {role.skills.map(skill => (
                              <span key={skill} className="bg-muted px-2 py-1 rounded-md">{skill}</span>
                          ))}
                        </div>
                          <p className="text-sm text-muted-foreground mb-4">Time: {role.time}</p>
                          <p className="text-sm text-muted-foreground mb-4">Location: {role.location}</p>
                          <Button variant="outline" className="mt-auto" onClick={() => document.getElementById('volunteer-application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Apply Now</Button>
                    </CardContent>
                  </Card>
                    </FadeInOnScroll>
                ))}
              </div>

                {/* Volunteer Application Form */}
                <FadeInOnScroll delay={400}>
                  <div id="volunteer-application-form" className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                    <h3 className="heading-text text-primary mb-6 text-center">Volunteer Application Form</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" name="full_name" placeholder="John Doe" value={formData.full_name} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleInputChange} required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+234 801 234 5678" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="skills">Skills (e.g., teaching, design, tech)</Label>
                        <Input id="skills" name="skills" placeholder="Teaching, Content Creation, Social Media" value={formData.skills} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="availability">Availability (e.g., weekends, 2 days/week)</Label>
                        <Input id="availability" name="availability" placeholder="Weekends, Monday & Wednesday afternoons" value={formData.availability} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="whyInterested">Why are you interested in volunteering with RABNI?</Label>
                        <Textarea id="whyInterested" name="why_interested" rows={4} placeholder="Tell us about your motivation..." value={formData.why_interested} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="cv">Upload CV (Optional)</Label>
                        <Input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button type="submit" className="btn-secondary flex-1" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                        <Button type="button" variant="outline" className="flex-1" onClick={handleDownloadPdf}>
                          Download Form as PDF
                        </Button>
                      </div>
                      {submitted && <p className="text-center text-green-600 mt-4">Application submitted successfully!</p>}
                    </form>
                  </div>
                </FadeInOnScroll>
            </TabsContent>

              {/* Donate Tab Content */}
              <TabsContent value="donate">
                <div className="text-center mb-12">
                <h2 className="display-text text-primary mb-4">Make a Donation</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your financial support directly funds our programs and reaches more children.
                </p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {donationTiers.map((tier, index) => (
                    <FadeInOnScroll key={tier.title} delay={index * 100}>
                      <Card className="ngo-card p-6 text-center flex flex-col h-full">
                        <CardContent className="p-0 flex-1 flex flex-col">
                          <p className="text-3xl font-bold text-primary mb-2">{tier.amount}</p>
                          <h3 className="text-xl font-semibold text-primary mb-2">{tier.title}</h3>
                          <p className="text-muted-foreground text-sm flex-1 mb-4">{tier.description}</p>
                          <p className="text-sm text-muted-foreground mb-4">Impact: {tier.impact}</p>
                          <a href="https://pay.squadco.com/rabnieducationinterventions" target="_blank" rel="noopener noreferrer">
                            <Button className="btn-hero mt-auto w-full">Donate {tier.amount}</Button>
                          </a>
                    </CardContent>
                  </Card>
                    </FadeInOnScroll>
                ))}
              </div>

                {/* Custom Donation */}
                <FadeInOnScroll delay={200}>
                  <div className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg border border-border text-center">
                  <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="heading-text text-primary mb-4">Custom Donation</h3>
                  <p className="text-muted-foreground mb-6">
                    Choose your own amount to support our mission. Every contribution makes a difference.
                  </p>
                    <div className="flex gap-2 mb-4">
                      <Input 
                        type="number" 
                        placeholder="Enter amount (₦)" 
                        className="flex-1" 
                        value={customAmount} 
                        onChange={(e) => setCustomAmount(e.target.value)}
                      />
                      <a href="https://pay.squadco.com/rabnieducationinterventions" target="_blank" rel="noopener noreferrer">
                        <Button className="btn-hero" disabled={!customAmount}>Donate Now</Button>
                      </a>
                    </div>
                  </div>
                </FadeInOnScroll>
            </TabsContent>

              {/* Partner Tab Content */}
              <TabsContent value="partner">
                <div className="text-center mb-12">
                <h2 className="display-text text-primary mb-4">Partner With Us</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join organizations worldwide in supporting quality education for Nigerian children.
                </p>
              </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <FadeInOnScroll>
                    <div>
                      <h3 className="heading-text text-primary mb-6">Partnership Opportunities</h3>
                      <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg">
                        <li>Corporate Social Responsibility programs</li>
                        <li>Technology and resource donations</li>
                        <li>Joint program development</li>
                        <li>Research and evaluation partnerships</li>
                        <li>Capacity building initiatives</li>
                    </ul>
                    </div>
                  </FadeInOnScroll>
                  <FadeInOnScroll delay={200}>
                    <div>
                      <h3 className="heading-text text-primary mb-6">Our Partners</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {partners.map((partner) => (
                          <Card key={partner.name} className="ngo-card p-6 flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                              <img
                                src={`/partners/${partner.logo}`}
                                alt={partner.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Hide broken image and show textual fallback
                                  const img = e.currentTarget as HTMLImageElement;
                                  img.style.display = 'none';
                                  const fallback = img.parentElement?.querySelector('.logo-fallback') as HTMLElement | null;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className="logo-fallback hidden w-full h-full items-center justify-center text-xs font-semibold text-primary bg-primary/10">
                                {partner.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                              </div>
                            </div>
                          <div>
                              <h4 className="font-semibold text-primary text-sm mb-1">{partner.name}</h4>
                              <p className="text-xs text-muted-foreground">{partner.type}</p>
                          </div>
                          </Card>
                      ))}
                    </div>
                    </div>
                  </FadeInOnScroll>
              </div>
            </TabsContent>
          </Tabs>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll delay={600}>
            <h2 className="display-text mb-6 text-primary-foreground">Have Questions? Get in Touch!</h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              We're here to answer your queries and explore partnership opportunities.
            </p>
            <Link to="/contact">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-4 rounded-xl shadow-[var(--hero-shadow)] transition-[var(--transition-smooth)] hover:scale-105">
                Contact Us
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}