import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import floatImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/FLOAT Initiative.png";
import { ArrowLeft } from "lucide-react";

export default function FloatInitiativePage() {
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
            <img src={floatImage} alt="FLOAT Initiative" className="mx-auto rounded-2xl shadow-lg w-full max-w-2xl mb-8 object-cover" />
            <h1 className="display-text text-primary mb-4">FLOAT by RABNI</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              FLOAT by RABNI is an emergency education response that ensures children continue learning during and after flooding. The model keeps education alive in displaced communities, supports continuity for learners, and strengthens resilience in education systems vulnerable to climate shocks.
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
                    <li>Secures uninterrupted learning during disasters</li>
                    <li>Prepares teachers and communities for climate shocks</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">Background: The Challenge</h3>
                  <p className="text-muted-foreground">
                    Seasonal flooding in Nigeria repeatedly disrupts schooling for thousands of children. Many displaced learners lose months of education, widening the learning gap and leaving them vulnerable to long-term setbacks. Without structured support, dropout rates rise, and recovery is slow even after families resettle.
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
                <h3 className="text-lg font-bold text-primary mb-2">The Solution</h3>
                <p className="text-muted-foreground mb-4">
                  FLOAT by RABNI is an emergency education response that ensures children continue learning during and after flooding. The model keeps education alive in displaced communities, supports continuity for learners, and strengthens resilience in education systems vulnerable to climate shocks.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">Key Strategies</h3>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                  <li>Ensure learning continuity for displaced children during emergencies.</li>
                  <li>Train and equip community facilitators to support structured learning.</li>
                  <li>Provide parents and caregivers with resources to engage children at home or in temporary shelters.</li>
                  <li>Work with stakeholders to integrate resilient education planning into disaster response systems.</li>
                  <li>Incorporate social-emotional support to help children cope with trauma and uncertainty.</li>
                </ul>
                <h3 className="text-lg font-bold text-primary mb-2">Planned 2025 Pilot</h3>
                <p className="text-muted-foreground mb-4">
                  In 2025, FLOAT will launch a pilot in flood-prone communities in Adamawa State. The pilot will serve displaced learners and their families while generating evidence to inform wider adoption across Nigeria.
                </p>
                <p className="text-muted-foreground">
                  FLOAT reflects RABNI’s commitment to protecting education in emergencies, ensuring no child is left behind when disasters strike, and building pathways for long-term resilience.
                </p>
              </CardContent>
            </Card>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
