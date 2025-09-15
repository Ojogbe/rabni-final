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
      <section className="section-spacing bg-white relative">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="display-text text-primary mb-4">Video Success Stories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch real stories from communities where our programs have made a lasting impact.
              </p>
            </div>
          </FadeInOnScroll>
          
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide" id="videoCarousel">
              {[
                {
                  title: "Literacy Bootcamp for Out of School Children",
                  videoId: "Dugk6oqWh-g",
                  description: "See how our literacy bootcamp transforms the lives of out-of-school children, giving them the foundation they need for a brighter future."
                },
                {
                  title: "Literacy Bootcamp for Children Struggling in Formal Schooling",
                  videoId: "mye3gQ-xUog",
                  description: "Discover how we help children who are falling behind in traditional school settings catch up and excel in their education."
                },
                {
                  title: "Teacher Training for LEA School Teachers",
                  videoId: "3TGCSI3Vxjo",
                  description: "Watch how our teacher training programs empower educators in Local Education Authority schools with new skills and methodologies."
                },
                {
                  title: "Teacher Training for Non-Formal Learning Centres",
                  videoId: "Qt0dU_NBs4s",
                  description: "Learn about our specialized training for teachers in non-formal learning centers, reaching the most marginalized communities."
                }
              ].map((video, index) => (
                <div key={video.videoId} className="flex-shrink-0 w-full sm:w-96">
                  <Card className="h-full ngo-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-4">{video.title}</h3>
                      <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.videoId}`}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>
                      <p className="text-muted-foreground">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
              onClick={() => {
                const container = document.getElementById('videoCarousel');
                if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
              }}
              aria-label="Previous video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
              onClick={() => {
                const container = document.getElementById('videoCarousel');
                if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
              }}
              aria-label="Next video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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