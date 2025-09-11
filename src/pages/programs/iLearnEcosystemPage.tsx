import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import ilearnImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/iLearn_Ecosystem.jpg";
import { ArrowLeft } from "lucide-react";

export default function ILearnEcosystemPage() {
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
            <img src={ilearnImage} alt="iLearn Ecosystem" className="mx-auto rounded-2xl shadow-lg w-full max-w-2xl mb-8 object-cover" />
            <h1 className="display-text text-primary mb-4">The iLearn Ecosystem</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              At RABNI, we believe learning should be accessible, engaging, and transformative for every child, no matter where they live. That vision inspired the iLearn Ecosystem; a connected suite of programs and tools designed to support learners, teachers, and communities with high-quality, culturally relevant, and technology-driven education.
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
                  <h3 className="text-xl font-semibold text-primary mb-2">Why the iLearn Ecosystem Matters</h3>
                  <p className="text-muted-foreground">
                    These initiatives form a holistic learning ecosystem that addresses the biggest barriers to education in underserved regions — lack of teachers, poor infrastructure, limited electricity, low internet access, and displacement due to conflict or disaster. The iLearn Ecosystem ensures that no matter the challenge, learning never stops.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">Key Impacts</h3>
                  <ul className="list-disc list-inside text-left text-muted-foreground space-y-2">
                    <li>Expands access to foundational education</li>
                    <li>Strengthens teacher capacity in low-resource settings</li>
                    <li>Bridges learning gaps for marginalized children</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-4xl mx-auto space-y-12">
          <FadeInOnScroll>
            <h2 className="display-text text-primary mb-8 text-center">iLearn Initiatives</h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-primary mb-2">iLearn Literacy Project</h3>
                <p className="text-muted-foreground mb-4">
                  Our flagship initiative tackling foundational learning gaps in reading, writing, and numeracy. Delivered through offline plug-and-play kits and online via the iLearn Kids YouTube channel, this project brings phonics, story-based learning, and interactive games directly to learners in homes, schools, and non-formal centers.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">iLearn Digital Classrooms</h3>
                <p className="text-muted-foreground mb-4">
                  An innovation designed for schools with little to no internet or electricity. Using portable offline kits with solar-powered support, teachers can access a full library of literacy and numeracy lessons aligned with national curricula. This ensures no child is left behind simply because of geography or resources.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">iLearn Kids</h3>
                <p className="text-muted-foreground mb-4">
                  Our fast-growing YouTube channel that makes educational content available anytime, anywhere. With interactive videos, phonics songs, stories, and games, iLearn Kids supports both learners and teachers across Nigeria and beyond. It is our most accessible entry point for families who want their children to learn at home.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">iLearn Bootcamps</h3>
                <p className="text-muted-foreground mb-4">
                  Our annual holiday learning camps introduce children and youth to 21st-century skills such as coding, robotics, app development, motion graphics, and public speaking. These bootcamps combine creativity with hands-on learning, ensuring participants not only consume knowledge but also create and innovate.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">iLearn Spaces</h3>
                <p className="text-muted-foreground mb-4">
                  Our dedicated learning hubs where children and youth access structured courses in areas like AI, project management, cybersecurity, graphic design, and more. These spaces offer both physical and digital learning experiences, equipping young people with the skills needed for today’s world of work and innovation.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">Research & Policy Advocacy</h3>
                <p className="text-muted-foreground">
                  Through partnerships with global initiatives such as Pearson’s Project Literacy, we contribute data, evidence, and community-driven insights to influence education policy. Our research bridges the gap between grassroots experiences and systemic reforms.
                </p>
              </CardContent>
            </Card>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
