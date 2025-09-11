import { Users, Target, Eye, Heart, Award, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Mission Empowering Futures.jpg";
import teamIsrael from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Israel Pender - Executive Director, Academics and Learning.jpg";
import teamPatricia from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Patricia Uma - Executive Director, Strategy and Innovation.jpg";
import teamUgheoke from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Engr. Prof. Ugheoke Benjamin Iyenagbe, FNSE, JP.jpg";
import teamChinedu from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Chinedu Chedi.jpeg";
import teamVanessa from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Vanessa Nyingifa-Williams.jpg";
import teamJessica from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Jessica Tee Orika-Owunna.jpeg";
import teamSarah from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Sarah Chiemela Wabara.jpg";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Equity",
    description: "Ensuring every child has access to quality education regardless of their circumstances."
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "Leveraging technology and creative solutions to overcome educational barriers."
  },
  {
    icon: Users,
    title: "Community",
    description: "Working hand-in-hand with local communities to create sustainable change."
  },
  {
    icon: Heart,
    title: "Resilience",
    description: "Building strong, adaptable educational systems that withstand challenges."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Maintaining the highest standards in all our programs and interventions."
  }
];

const timeline = [
  { year: "2016", title: "Foundation", description: "RABNI Education Interventions was founded with a vision to transform education in Nigeria." },
  { year: "2018", title: "First Programs", description: "Launched literacy bootcamps and teacher training initiatives in FCT and surrounding states." },
  { year: "2020", title: "Digital Innovation", description: "Introduced iLearn Ecosystem, bringing digital learning to remote communities." },
  { year: "2022", title: "FLOAT Initiative", description: "Developed Flood Literacy Outreach Toolkit in response to climate emergencies." },
  { year: "2024", title: "AI Integration", description: "Launched VoiceLab and AI for Inclusive Learning programs." },
  { year: "2025", title: "Expansion", description: "Scaling programs nationwide with focus on conflict-affected regions." }
];

const missionStatement = "Our mission is to empower underserved communities...";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-light/20 py-20 lg:py-32">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="display-text text-primary mb-4">About RABNI</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded in 2016, RABNI Education Interventions is a non-governmental organization 
              dedicated to transforming communities through innovative education solutions.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeInOnScroll>
            <div>
              <h2 className="display-text text-primary mb-6">Our Mission: Empowering Futures</h2>
              <p className="text-lg text-muted-foreground mb-4">
                We believe every child deserves access to quality education, regardless of their circumstances. 
                Our mission is to bridge educational gaps and empower underserved communities across Nigeria 
                through sustainable, technology-driven, and community-led interventions.
              </p>
              <p className="text-lg text-muted-foreground">
                We focus on literacy, digital skills, and teacher training to foster a generation of 
                critical thinkers and problem-solvers.
              </p>
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Children learning in a classroom"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="display-text text-primary mb-12">Our Core Values</h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <FadeInOnScroll key={value.title} delay={index * 100}>
                <Card className="ngo-card p-5">
                  <CardContent className="p-0">
                    <value.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-xs">{value.description}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Governing Council */}
      <section className="section-spacing bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="display-text text-primary mb-12">Governing Council</h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { member: "Israel Pender", role: "Executive Director, Academics and Learning", img: teamIsrael },
              { member: "Patricia Uma", role: "Executive Director, Strategy and Innovation", img: teamPatricia },
              { member: "Engr. Prof. Ugheoke Benjamin Iyenagbe, FNSE, JP", role: "Governing Member", img: teamUgheoke },
              { member: "Chinedu Chedi", role: "Governing Member", img: teamChinedu },
              { member: "Vanessa Nyingifa-Williams", role: "Governing Member", img: teamVanessa },
              { member: "Jessica Tee Orika-Owunna", role: "Governing Member", img: teamJessica },
              { member: "Sarah Chiemela Wabara", role: "Governing Member", img: teamSarah },
            ].map((member, index) => (
              <FadeInOnScroll key={member.member} delay={index * 150}>
                <Card className="ngo-card p-6">
                  <CardContent className="p-0">
                    <img 
                      src={member.img} 
                      alt={member.member}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-primary mb-1">{member.member}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Advisory Board */}
      <section className="section-spacing bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="display-text text-primary mb-12">Youth Advisory Board</h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { member: "Sarah Chiemela Wabara", role: "Youth Advisory Board Member", img: teamSarah },
              { member: "Placeholder Name 1", role: "Youth Advisory Board Member", img: "https://ui-avatars.com/api/?name=Placeholder+1&background=eee&color=888" },
              { member: "Placeholder Name 2", role: "Youth Advisory Board Member", img: "https://ui-avatars.com/api/?name=Placeholder+2&background=eee&color=888" },
            ].map((member, index) => (
              <FadeInOnScroll key={member.member} delay={index * 150}>
                <Card className="ngo-card p-6">
                  <CardContent className="p-0">
                    <img 
                      src={member.img} 
                      alt={member.member}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-primary mb-1">{member.member}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey (Timeline) */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <h2 className="display-text text-primary text-center mb-12">Our Journey</h2>
          </FadeInOnScroll>
          <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:h-full before:w-1 before:bg-border before:rounded-full">
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <FadeInOnScroll key={item.year} delay={index * 150}>
                  <div className="flex flex-col md:flex-row items-center justify-center md:odd:flex-row-reverse relative">
                    {/* Card content on one side */}
                    <div className="md:w-5/12 md:text-right md:odd:text-left">
                      <Card className={`ngo-card p-6 ${index % 2 === 0 ? 'timeline-card-primary' : 'timeline-card-secondary'}`}>
                        <CardContent className="p-0">
                          <h3 className="text-xl font-semibold text-primary mb-2">{item.year}: {item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    {/* Central timeline dot */}
                    <div className="absolute md:static w-8 h-8 rounded-full bg-primary ring-8 ring-background z-10 flex-shrink-0 flex items-center justify-center text-white font-bold" />
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="display-text mb-6 text-primary-foreground">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Partner with us to bring transformative education to every child in Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-involved#volunteer">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-4 rounded-xl shadow-[var(--hero-shadow)] transition-[var(--transition-smooth)] hover:scale-105">
                  Volunteer With Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4 rounded-xl transition-[var(--transition-smooth)]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}