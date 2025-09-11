import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import girlsLeftBehindImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Girls Left Behind.jpg";
import { ArrowLeft } from "lucide-react";

export default function GirlsLeftBehindPage() {
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
            <img src={girlsLeftBehindImage} alt="Girls Left Behind" className="mx-auto rounded-2xl shadow-lg w-full max-w-2xl mb-8 object-cover" />
            <h1 className="display-text text-primary mb-4">Girls Left Behind by RABNI</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Girls Left Behind is RABNI’s gender-responsive initiative designed to restore access to education for marginalized girls, particularly those uprooted by conflict. By delivering structured literacy, numeracy, and life skills support alongside strong community engagement, the program provides girls with a pathway back to education and equips them to make informed, confident choices about their futures.
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
                    <li>Increases girls’ school participation and retention</li>
                    <li>Equips girls with confidence and employable skills</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">Background: The Challenge</h3>
                  <p className="text-muted-foreground">
                    In conflict-affected regions of Nigeria, particularly within internally displaced persons (IDP) communities, girls are disproportionately excluded from education. Poverty, insecurity, early marriage, and cultural restrictions combine to lock them out of classrooms. Once left behind, they face a high risk of lifelong illiteracy, limited opportunities, and cycles of dependency.
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
                  Girls Left Behind is RABNI’s gender-responsive initiative designed to restore access to education for marginalized girls, particularly those uprooted by conflict. By delivering structured literacy, numeracy, and life skills support alongside strong community engagement, the program provides girls with a pathway back to education and equips them to make informed, confident choices about their futures.
                </p>
                <h3 className="text-lg font-bold text-primary mb-2">Pilot Achievements (2021–2024)</h3>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                  <li>Launched in 2021, targeting internally displaced girls in camps and resettlement communities.</li>
                  <li>Directly reached over 300 girls with literacy and life skills programs.</li>
                  <li>Strengthened parental and community support for girls’ education through engagement campaigns.</li>
                  <li>Built evidence on scalable models for girls’ education in fragile contexts.</li>
                </ul>
                <h3 className="text-lg font-bold text-primary mb-2">Key Strategies</h3>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                  <li>Establish safe and inclusive learning environments tailored for displaced girls.</li>
                  <li>Deliver foundational learning and life skills training that bridges the gap for re-entry into school or alternative pathways.</li>
                  <li>Work with families, caregivers, and community leaders to shift cultural perceptions and reduce barriers to girls’ learning.</li>
                  <li>Champion policy advocacy to prioritize the education of displaced and marginalized girls.</li>
                </ul>
              </CardContent>
            </Card>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
