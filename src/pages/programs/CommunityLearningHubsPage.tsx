import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import communityHubsImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Community Learning Hubs.jpg";
import { ArrowLeft } from "lucide-react";

export default function CommunityLearningHubsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-light/20 py-20 lg:py-32">
        <div className="container-padding max-w-5xl mx-auto text-center">
          <div className="text-left mb-4">
            <a href="/programs" className="inline-flex items-center text-primary hover:underline text-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Programs
            </a>
          </div>
          <FadeInOnScroll>
            <img src={communityHubsImage} alt="Community Learning Hubs" className="mx-auto rounded-2xl shadow-lg w-full max-w-2xl mb-8 object-cover" />
            <h1 className="display-text text-primary mb-4">iLearn Spaces: Community Learning Hubs</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              iLearn Spaces are RABNI’s community-based hubs designed to make education accessible, inclusive, and future-ready. They provide children and youth in underserved communities with safe spaces to strengthen literacy and numeracy while also building digital and life skills for the 21st century.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="section-spacing bg-white">
        <div className="container-padding max-w-5xl mx-auto">
          <FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">Key Impacts</h3>
                  <ul className="list-disc list-inside text-left text-muted-foreground space-y-2">
                    <li>Provides equitable access to education in fragile regions</li>
                    <li>Builds local ownership and resilience</li>
                    <li>Empowers youth with digital and life skills</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">Our Reach</h3>
                  <p className="text-muted-foreground">
                    So far, iLearn Spaces have directly reached 2,000+ learners at our flagship literacy centre in Abuja and over 4,000 young people through community outreach. From helping children who could not read to achieve fluency, to equipping youth with practical digital skills, our hubs are transforming lives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-4xl mx-auto space-y-12">
          <FadeInOnScroll>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-primary mb-2">A Vision for the Future</h3>
                <p className="text-muted-foreground mb-4">
                  At iLearn Spaces, learners gain support in reading and numeracy, hands-on training in skills like AI, coding, graphic design, and project management, and teachers receive capacity-building to improve classroom practice. Each hub is designed to serve not just as a classroom but as a center of creativity, innovation, and opportunity.
                </p>
                <p className="text-muted-foreground mb-4">
                  RABNI envisions scaling iLearn Spaces to more conflict-affected and hard-to-reach regions, empowering the next generation to learn, grow, and lead with confidence.
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <a href="https://x.com/ilearnspaces?t=tQq90XQGGqxxAsrcEGYmag&s=09" target="_blank" rel="noopener noreferrer" className="text-primary underline">Follow us on X</a>
                  <a href="https://www.instagram.com/ilearnspaces?igsh=MWhkMGJ0MmJ6aHppZg==" target="_blank" rel="noopener noreferrer" className="text-primary underline">Follow us on Instagram</a>
                </div>
              </CardContent>
            </Card>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
