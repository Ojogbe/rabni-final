import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, GraduationCap, Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Hero Section Background Image.jpg";
import girlsLeftBehindImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Girls Left Behind.jpg";
import floatImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/FLOAT Initiative.png";
import ilearnImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/iLearn_Ecosystem.jpg";
import communityHubsImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Community Learning Hubs.jpg";
import FadeInOnScroll from "@/components/FadeInOnScroll";

const impactStats = [
  { number: "6,000+", label: "Children Reached", icon: Users },
  { number: "500+", label: "Teachers Trained", icon: GraduationCap },
  { number: "80,000+", label: "Homes Impacted", icon: Home },
  { number: "15+", label: "Communities Served", icon: Heart },
];

const programs = [
  {
    title: "iLearn Ecosystem",
    description: "Digital classrooms and AI-powered learning tools bringing quality education to remote communities.",
    image: ilearnImage,
    link: "/programs#ilearn"
  },
  {
    title: "FLOAT Initiative",
    description: "Flood Literacy Outreach Toolkit providing education continuity during climate emergencies.",
    image: floatImage,
    link: "/programs#float"
  },
  {
    title: "Girls Left Behind",
    description: "Empowering marginalized girls with literacy, life skills, and educational opportunities.",
    image: girlsLeftBehindImage,
    link: "/programs#girls"
  }
];

const testimonials = [
  {
    name: "Amina Mohammed",
    role: "Teacher, Kaduna State",
    content: "RABNI's teacher training transformed how I engage with my students. The digital tools make learning so much more interactive and fun."
  },
  {
    name: "Ibrahim Hassan",
    role: "Community Leader, Borno State",
    content: "Even during the floods, our children continued learning thanks to RABNI's FLOAT program. Education truly transforms communities."
  },
  {
    name: "Grace Okoro",
    role: "Parent, FCT Abuja",
    content: "My daughter was falling behind in school. Through RABNI's Girls Left Behind program, she's now one of the top students in her class."
  }
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-hero-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        
        <div className="relative container-padding max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <FadeInOnScroll>
              <h1 className="hero-text mb-6">
                Transforming Communities Through Education
              </h1>
            </FadeInOnScroll>
            <FadeInOnScroll delay={200}>
              <p className="text-xl md:text-2xl mb-8 opacity-95">
                Reaching underserved, marginalized, and conflict-affected communities 
                across Nigeria with innovative education solutions.
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://pay.squadco.com/rabnieducationinterventions" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white text-primary font-semibold px-8 py-4 rounded-xl shadow-[var(--hero-shadow)] transition-[var(--transition-smooth)] hover:bg-white/90">
                    Donate Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/about">
                  <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-xl transition-[var(--transition-smooth)]">
                    Learn More
                  </Button>
                </Link>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-spacing bg-white">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="display-text text-primary mb-4">Our Impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transforming lives and communities through education across Africa
              </p>
            </div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
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

      {/* Programs */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="display-text text-primary mb-4">Our Programs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Innovative education interventions designed for Nigeria's unique challenges.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <FadeInOnScroll key={program.title} delay={index * 150}>
                <Card className="program-card flex flex-col h-full">
                  <div 
                    className="h-48 bg-cover bg-center rounded-t-lg"
                    style={{ backgroundImage: `url(${program.image})` }}
                  />
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-3">{program.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{program.description}</p>
                    <Link 
                      to={program.link}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors mt-auto"
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={200}>
            <div className="text-center mt-12">
              <Link to="/programs">
                <Button className="btn-secondary">
                  View All Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Impact Videos */}
      <section className="section-spacing bg-muted/50">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="display-text text-primary mb-4">See the Impact of Education</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Every day, we witness the transformative power of education in communities across Africa. Our programs are creating lasting change, one child, one teacher, and one community at a time.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={100}>
            <div className="relative">
              <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                {[
                  {
                    title: "Literacy Bootcamp for Out of School Children",
                    src: "/src/assets/Impact Page video feedback/Literacy Bootcamp for Out of school children.mp4",
                    description: "See how our literacy bootcamps are transforming the lives of out-of-school children across Nigeria."
                  },
                  {
                    title: "Literacy Support for Struggling Students",
                    src: "/src/assets/Impact Page video feedback/Literacy Bootcamp for children struggling to read in formal schooling.mp4",
                    description: "Watch how we help children who are struggling in formal schooling catch up with their peers."
                  },
                  {
                    title: "Teacher Training Program",
                    src: "/src/assets/Impact Page video feedback/Teacher Training for teachers in LEA school.mp4",
                    description: "Our comprehensive teacher training programs empower educators with modern teaching methodologies."
                  }
                ].map((video, index) => (
                  <div key={index} className="flex-shrink-0 w-96">
                    <Card className="h-full ngo-card overflow-hidden">
                      <div className="aspect-video bg-black">
                        <video
                          src={video.src}
                          title={video.title}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-primary mb-2">{video.title}</h3>
                        <p className="text-muted-foreground text-sm">{video.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              
              {/* Scroll indicators */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
                <button 
                  className="bg-background/80 hover:bg-background rounded-full p-2 shadow-lg pointer-events-auto"
                  onClick={() => {
                    const container = document.querySelector('.overflow-x-auto');
                    if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                  }}
                >
                  <ArrowRight className="h-6 w-6 rotate-180" />
                </button>
                <button 
                  className="bg-background/80 hover:bg-background rounded-full p-2 shadow-lg pointer-events-auto"
                  onClick={() => {
                    const container = document.querySelector('.overflow-x-auto');
                    if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                  }}
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-primary text-white">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <FadeInOnScroll>
            <h2 className="display-text mb-6 text-white">Join Us in Transforming Education</h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto text-white">
              Every contribution helps us reach more children, train more teachers, 
              and build stronger communities across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://pay.squadco.com/rabnieducationinterventions" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-primary font-semibold px-8 py-4 rounded-xl shadow-[var(--hero-shadow)] transition-[var(--transition-smooth)] hover:bg-white/90">
                  Donate Today
                </Button>
              </a>
              <Link to="/get-involved#volunteer">
                <Button className="btn-outline border-white text-white bg-transparent hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-xl transition-[var(--transition-smooth)]">
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