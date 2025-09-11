import { useState } from "react";
import { BarChart, Users, GraduationCap, Home, Heart, MapPin, TrendingUp, Download, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { toast } from "sonner";
import NigeriaSVGMap from "@/components/NigeriaSVGMap";

const impactStats: any[] = [];

// Simplified dataset for interactive state view
const nigeriaStates: { name: string; reach: number; teachers: number; learners: number }[] = [
  { name: "FCT Abuja", reach: 15, teachers: 42, learners: 680 },
  { name: "Kano", reach: 24, teachers: 78, learners: 1200 },
  { name: "Lagos", reach: 18, teachers: 60, learners: 950 },
  { name: "Bayelsa", reach: 9, teachers: 21, learners: 310 },
  { name: "Kaduna", reach: 14, teachers: 39, learners: 720 },
  { name: "Borno", reach: 8, teachers: 17, learners: 280 },
  { name: "Zamfara", reach: 7, teachers: 16, learners: 240 },
  { name: "Katsina", reach: 11, teachers: 28, learners: 430 },
  { name: "Rivers", reach: 10, teachers: 26, learners: 410 },
  { name: "Oyo", reach: 12, teachers: 33, learners: 500 },
];

const outcomes: any[] = [];

const stories: { title: string; location: string; impact: string; description: string }[] = [
  {
    title: "Amina Finds Her Voice",
    location: "Rijiyar Lemo, Kano State",
    impact: "Literacy Bootcamp Graduate",
    description:
      "Amina, 12, joined our literacy bootcamp unable to read short words. After 8 weeks of phonics-based sessions and community reading circles, she now reads simple storybooks confidently and supports her younger siblings with homework.",
  },
  {
    title: "Classes Continue Despite Floods",
    location: "Yenagoa, Bayelsa State",
    impact: "FLOAT Initiative Beneficiary",
    description:
      "When floods disrupted schooling, our FLOAT toolkits helped teachers deliver lessons in safe community spaces. 63 learners in Akenfa completed a 6‑week numeracy module using low‑cost learning kits and radio lessons.",
  },
  {
    title: "Teachers Go Digital",
    location: "Gwagwalada, FCT Abuja",
    impact: "Digital Literacy for Educators",
    description:
      "Through our weekend clinics, Mrs. Okon learned to create lesson plans on her tablet and use offline content libraries. Her pupils now access interactive quizzes and have shown a 22% increase in weekly attendance.",
  }
];

interface Report {
  id: string;
  title: string;
  file_url: string;
  report_type: 'Annual Report' | 'Financial Report' | 'MEL Framework';
  publish_date: string; // Changed from published_date to publish_date
}

export default function ImpactPage() {
  const [selectedState, setSelectedState] = useState("FCT Abuja");
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoadingReports(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      toast.error("Error fetching reports: " + error.message);
    } else {
      setReports(data || []);
    }
    setLoadingReports(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-light/20 py-20 lg:py-32">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h1 className="display-text text-primary mb-4">Measuring Our Impact</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparency and accountability are core to our mission. Explore our comprehensive 
            impact data, success stories, and the tangible difference we're making in Nigerian communities.
          </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Our Numbers (Impact Statistics) */}
      <section className="section-spacing bg-white">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="display-text text-primary mb-4">Our Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real metrics showing the reach and scale of our educational interventions.
            </p>
          </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "6,000+", label: "Children Reached", icon: Users },
              { number: "500+", label: "Teachers Trained", icon: GraduationCap },
              { number: "80,000+", label: "Homes Impacted", icon: Home },
              { number: "15+", label: "Communities Served", icon: Heart }
            ].map((stat, index) => (
              <FadeInOnScroll key={stat.label} delay={index * 100}>
                <div className="ngo-card text-center p-8">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                  </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Impact Dashboard */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <h2 className="display-text text-primary text-center mb-12">Interactive Impact Dashboard</h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
          <Tabs defaultValue="states" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-background p-1 rounded-full shadow-sm">
                <TabsTrigger value="states" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:rounded-full transition-all text-sm font-medium text-muted-foreground">By States</TabsTrigger>
                <TabsTrigger value="outcomes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:rounded-full transition-all text-sm font-medium text-muted-foreground">Outcomes</TabsTrigger>
            </TabsList>
              <TabsContent value="states">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left: SVG Nigeria map */}
                  <Card className="ngo-card p-6 min-h-[420px]">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-primary">Nigeria Impact Map</CardTitle>
                      <CardDescription>Tap a state on the map to view impact</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-[360px]">
                        <NigeriaSVGMap selectedState={selectedState} onSelect={setSelectedState} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Right: State impact details list */}
                  <Card className="ngo-card p-6 min-h-[420px]">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-primary">State Impact Details</CardTitle>
                      <CardDescription>Overview by state</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-2">
                      {nigeriaStates.map((st) => (
                        <button
                          key={st.name}
                          onClick={() => setSelectedState(st.name)}
                          className={`w-full text-left border rounded-lg px-4 py-3 transition-colors flex items-center justify-between ${
                            selectedState === st.name ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                          }`}
                          aria-pressed={selectedState === st.name}
                        >
                          <div>
                            <div className="text-sm font-semibold text-primary">{st.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {st.learners.toLocaleString()} children • {st.reach} communities • {Math.max(1, Math.round(st.teachers/20))} programs
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">children reached</div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="outcomes">
                <div className="space-y-8">
                  <FadeInOnScroll>
                    <Card className="ngo-card p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-primary text-2xl">Program Outcomes by State and Reach</CardTitle>
                        <CardDescription className="text-lg">Comprehensive overview of our impact across Nigeria and beyond</CardDescription>
                      </CardHeader>
                  <CardContent className="p-0">
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-xl font-semibold text-primary mb-4">Nigeria</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-muted/50 p-6 rounded-lg">
                                <h5 className="font-semibold text-primary mb-3">Abuja (FCT)</h5>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Established the iLearn Literacy Centre with the Mohammed Sanusi Foundation, directly impacting over 2,000 children and youth with foundational literacy, STEM, and life skills.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expanded outreach programs reaching 4,000+ learners through community engagements.
                                </p>
                              </div>
                              <div className="bg-muted/50 p-6 rounded-lg">
                                <h5 className="font-semibold text-primary mb-3">Yobe State</h5>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Partnered with the International Rescue Committee (IRC) and USAID OTL Project, deploying iLearn Literacy Toolkit and offline digital classroom solutions.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Impacted 1,400+ learners directly in hard-to-reach communities (EduTank 2024).
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-semibold text-primary mb-4">Beyond Nigeria</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-muted/50 p-6 rounded-lg">
                                <h5 className="font-semibold text-primary mb-3">Other African Countries</h5>
                                <p className="text-sm text-muted-foreground">
                                  Through iLearn Kids YouTube and online content, learners from Ghana, Kenya, and other African countries access foundational literacy and digital skills lessons.
                                </p>
                              </div>
                              <div className="bg-muted/50 p-6 rounded-lg">
                                <h5 className="font-semibold text-primary mb-3">Western Countries</h5>
                                <p className="text-sm text-muted-foreground">
                                  iLearn Kids content is accessed by diaspora communities in the US, UK, Canada, and Europe, with parents and educators using the platform as a complementary learning tool for children.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xl font-semibold text-primary mb-4">Combined Reach (Implemented + Pipeline)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-primary/5 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-primary mb-1">3,400+</div>
                                <div className="text-sm text-muted-foreground">Direct beneficiaries (Nigeria)</div>
                              </div>
                              <div className="bg-primary/5 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-primary mb-1">4,000+</div>
                                <div className="text-sm text-muted-foreground">Indirect beneficiaries</div>
                              </div>
                              <div className="bg-primary/5 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-primary mb-1">Thousands</div>
                                <div className="text-sm text-muted-foreground">Global reach via iLearn Kids</div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4 text-center">
                              Pipeline states: Nasarawa, Adamawa, and Borno have been mapped for expansion, with pilot designs completed targeting teachers, out-of-school children, and IDP communities.
                            </p>
                          </div>
                        </div>
                  </CardContent>
                </Card>
                  </FadeInOnScroll>
                </div>
            </TabsContent>
          </Tabs>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Video Success Stories */}
      <section className="section-spacing bg-white">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="display-text text-primary mb-4">Video Success Stories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch real stories from communities where our programs have made a lasting impact.
              </p>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInOnScroll delay={100}>
              <Card className="ngo-card p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-primary mb-4">Literacy Bootcamp for Out of School Children</h3>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/Dugk6oqWh-g"
                      title="Literacy Bootcamp for Out of School Children"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    See how our literacy bootcamp transforms the lives of out-of-school children, giving them the foundation they need for a brighter future.
                  </p>
                </CardContent>
              </Card>
            </FadeInOnScroll>

            <FadeInOnScroll delay={200}>
              <Card className="ngo-card p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-primary mb-4">Literacy Bootcamp for Children Struggling in Formal Schooling</h3>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/mye3gQ-xUog"
                      title="Literacy Bootcamp for Children Struggling in Formal Schooling"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    Discover how we help children who are falling behind in traditional school settings catch up and excel in their education.
                  </p>
                </CardContent>
              </Card>
            </FadeInOnScroll>

            <FadeInOnScroll delay={300}>
              <Card className="ngo-card p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-primary mb-4">Teacher Training for LEA School Teachers</h3>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/3TGCSI3Vxjo"
                      title="Teacher Training for LEA School Teachers"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    Watch how our teacher training programs empower educators in Local Education Authority schools with new skills and methodologies.
                  </p>
                </CardContent>
              </Card>
            </FadeInOnScroll>

            <FadeInOnScroll delay={400}>
              <Card className="ngo-card p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-primary mb-4">Teacher Training for Non-Formal Learning Centres</h3>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg"
                    >
                      <source src="/src/assets/Impact Page video feedback/Teacher Training for teachers in Non-Formal Learning Centres.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-muted-foreground">
                    Learn about our specialized training for teachers in non-formal learning centers, reaching the most marginalized communities.
                  </p>
                </CardContent>
              </Card>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
          <div className="text-center mb-12">
              <h2 className="display-text text-primary mb-4">Written Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from communities where our programs have made a lasting impact.
            </p>
          </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <FadeInOnScroll key={story.title} delay={index * 150}>
                <Card className="ngo-card p-6 flex flex-col h-full">
                  <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground font-medium">{story.location}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">{story.title}</h3>
                    <div className="bg-muted px-3 py-2 rounded-lg mb-4 self-start">
                      <span className="text-sm font-medium text-primary">{story.impact}</span>
                  </div>
                    <p className="text-sm text-muted-foreground flex-1">{story.description}</p>
                </CardContent>
              </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency & Accountability */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
          <div className="text-center mb-12">
            <h2 className="display-text text-primary mb-4">Transparency & Accountability</h2>
              <p className="text-muted-foreground mb-8 text-center text-lg max-w-2xl mx-auto">
                We are committed to full transparency and accountability in all our operations. Download our reports to see our impact firsthand.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {loadingReports ? (
                  <div className="col-span-3 text-center text-muted-foreground">Loading reports...</div>
                ) : reports.length === 0 ? (
                  <div className="col-span-3 text-center text-muted-foreground">No reports available yet.</div>
                ) : (
                  reports.map((report, index) => (
                    <FadeInOnScroll key={report.id} delay={index * 100}>
                      <Card className="ngo-card p-6 text-center flex flex-col h-full">
                        <CardContent className="p-0 flex-1 flex flex-col">
                          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-primary mb-3">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 flex-1">Published: {new Date(report.publish_date).toLocaleDateString()}</p>
                          <a href={report.file_url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <Button className="btn-secondary">
                              <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                          </a>
              </CardContent>
            </Card>
                    </FadeInOnScroll>
                  ))
                )}
          </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}