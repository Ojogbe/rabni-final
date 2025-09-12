import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Laptop, Users, Lightbulb, TrendingUp, Handshake, Globe, Heart, Shield, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ilearnImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/iLearn_Ecosystem.jpg";
import floatImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/FLOAT Initiative.png";
import girlsLeftBehindImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Girls Left Behind.jpg";
import aiInclusiveImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/AI for Inclusive Learning.jpg";
import communityHubsImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Community Learning Hubs.jpg";

interface Program {
  id: string;
  title: string;
  description: string;
  icon: string; // Storing icon name as string to map to LucideReact icons
  link: string;
  image_url?: string; // Add image_url for programs that might have images
  keyImpacts?: string[];
  hasLearnMore?: boolean;
}

// Static program data with new order and content
const staticPrograms: Program[] = [
  {
    id: "ilearn-ecosystem",
    title: "iLearn Ecosystem",
    description: "A comprehensive platform delivering literacy, numeracy, and digital skills through offline and online tools for underserved learners.",
    icon: "BookOpen",
    link: "/programs/ilearn-ecosystem",
    image_url: ilearnImage,
    keyImpacts: [
      "Expands access to foundational education",
      "Strengthens teacher capacity in low-resource settings"
    ],
    hasLearnMore: true
  },
  {
    id: "community-learning-hubs",
    title: "Community Learning Hubs",
    description: "Safe, tech-enabled spaces where children and youth access learning resources, mentorship, and digital literacy.",
    icon: "Users",
    link: "/programs/community-learning-hubs",
    image_url: communityHubsImage,
    keyImpacts: [
      "Provides equitable access to education in fragile regions",
      "Builds local ownership and resilience"
    ],
    hasLearnMore: true
  },
  {
    id: "float-initiative",
    title: "FLOAT Initiative",
    description: "A climate-adaptive learning system ensuring children continue education during flood-induced displacement through offline kits and SMS lessons.",
    icon: "Shield",
    link: "/programs/float-initiative",
    image_url: floatImage,
    keyImpacts: [
      "Secures uninterrupted learning during disasters",
      "Prepares teachers and communities for climate shocks"
    ],
    hasLearnMore: true
  },
  {
    id: "girls-left-behind",
    title: "For Girls Left Behind",
    description: "A program addressing barriers to girls' education with targeted support, mentorship, and skill-building.",
    icon: "Heart",
    link: "/programs/girls-left-behind",
    image_url: girlsLeftBehindImage,
    keyImpacts: [
      "Increases girls' school participation and retention",
      "Equips girls with confidence and employable skills"
    ],
    hasLearnMore: true
  },
  {
    id: "ai-inclusive-learning",
    title: "AI for Inclusive Learning",
    description: "Harnessing artificial intelligence to deliver adaptive literacy and learning support tailored to struggling learners and diverse needs.",
    icon: "Lightbulb",
    link: "#",
    keyImpacts: [
      "Improves literacy outcomes for marginalized learners",
      "Provides scalable, tech-driven solutions for education gaps"
    ],
    hasLearnMore: false
  },
  {
    id: "voice-labs",
    title: "Voice Labs",
    description: "Using voice technology to create accessible learning experiences for children and youth with limited literacy or digital access.",
    icon: "Mic",
    link: "#",
    keyImpacts: [
      "Expands inclusion for non-readers and neurodiverse learners",
      "Enables affordable, offline-friendly learning tools"
    ],
    hasLearnMore: false
  }
];

export default function ProgramsPage() {
  // Use static programs data instead of fetching from Supabase
  const programs = staticPrograms;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return BookOpen;
      case "Laptop":
        return Laptop;
      case "Users":
        return Users;
      case "Lightbulb":
        return Lightbulb;
      case "TrendingUp":
        return TrendingUp;
      case "Handshake":
        return Handshake;
      case "Globe":
        return Globe;
      case "Heart":
        return Heart;
      case "Shield":
        return Shield;
      case "Mic":
        return Mic;
      default:
        return BookOpen; // Default icon if not found
    }
  };

  const getLocalImageForTitle = (title: string): string | undefined => {
    const t = title.trim().toLowerCase();
    if (t.includes("ilearn")) return ilearnImage;
    if (t.includes("float")) return floatImage;
    if (t.includes("girls left")) return girlsLeftBehindImage;
    if (t.includes("inclusive")) return aiInclusiveImage;
    if (t.includes("community") && t.includes("hub")) return communityHubsImage;
    return undefined;
  };

  const getProgramImage = (program: Program): string | undefined => {
    return program.image_url || getLocalImageForTitle(program.title);
  };


  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-light/20 py-20 lg:py-32">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="display-text text-primary mb-4">Our Programs</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-2">
              At RABNI, we design and deliver innovative education solutions that bridge learning gaps for children and youth in underserved communities. From literacy and digital classrooms to teacher training, bootcamps, and resilience programs, our initiatives give learners the tools to thrive and equip educators to deliver quality teaching even in the most resource-limited settings.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Programs Icons Section */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const IconComponent = getIconComponent(program.icon);
              return (
                <FadeInOnScroll key={program.id} delay={index * 150}>
                  <Card className="program-card flex flex-col h-full text-center">
                    <CardContent className="p-8 flex flex-col items-center">
                      <IconComponent className="h-16 w-16 text-primary mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-primary mb-4">{program.title}</h3>
                      <p className="text-muted-foreground flex-1">{program.description}</p>
                    </CardContent>
                  </Card>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded Program Details */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <h2 className="display-text text-primary text-center mb-12">Program Details</h2>
          </FadeInOnScroll>
          <div className="space-y-16">
            {programs
              .filter(program => program.hasLearnMore) // Only show programs with learn more enabled
              .map((program, index) => {
              const isEven = index % 2 === 0;
              const detailsOrder = isEven ? "lg:order-1" : "lg:order-2";
              const imageOrder = isEven ? "lg:order-2" : "lg:order-1";
              
              return (
                <FadeInOnScroll key={program.id} delay={index * 150}>
                  <div id={program.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={imageOrder}>
                      {program.image_url ? (
                        <img 
                          src={program.image_url} 
                          alt={program.title}
                          className="rounded-xl shadow-lg w-full h-auto"
                        />
                      ) : (
                        <div className="w-full h-80 bg-muted rounded-xl shadow-lg flex items-center justify-center">
                          <div className="text-center">
                            {React.createElement(getIconComponent(program.icon), { 
                              className: "h-24 w-24 text-primary mx-auto mb-4" 
                            })}
                            <p className="text-muted-foreground">Icon Only Program</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={detailsOrder}>
                      <h3 className="display-text text-primary mb-4">{program.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">{program.description}</p>
                      <h4 className="heading-text text-primary mb-3">Key Impact:</h4>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        {program.keyImpacts?.map((impact, idx) => (
                          <li key={idx}>{impact}</li>
                        ))}
                      </ul>
                      {program.hasLearnMore && (
                        <Link to={program.link}>
                          <Button className="btn-secondary">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="display-text mb-6 text-primary-foreground">Become a Partner in Education</h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Your support helps us expand our reach and transform more lives through innovative programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://pay.squadco.com/rabnieducationinterventions" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-4 rounded-xl shadow-[var(--hero-shadow)] transition-[var(--transition-smooth)] hover:scale-105">
                  Donate Now
                </Button>
              </a>
              <Link to="/get-involved#volunteer">
                <Button className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4 rounded-xl transition-[var(--transition-smooth)]">
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}