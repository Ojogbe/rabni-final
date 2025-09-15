import { Users, Target, Eye, Heart, Award, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TeamMemberModal } from "@/components/team/TeamMemberModal";
import heroImage from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Mission Empowering Futures.jpg";
import teamIsrael from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Israel Pender - Executive Director, Academics and Learning.jpg";
import teamPatricia from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Patricia Uma - Executive Director, Strategy and Innovation.jpg";
import teamUgheoke from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Engr. Prof. Ugheoke Benjamin Iyenagbe, FNSE, JP.jpg";
import teamChinedu from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Chinedu Chedi.jpeg";
import teamVanessa from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Vanessa Nyingifa-Williams.jpg";
import teamJessica from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Jessica Tee Orika-Owunna.jpeg";
import teamSarah from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Sarah Chiemela Wabara.jpg";
import teamEmmanuel from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Emmanuel P. Erhioghene.PNG";
import teamOjonimi from "@/assets/IMAGES TO USE EVERYWHERE ELSE/Our Leadership/Ojonimi Jeremiah Ojogbe.jpeg";
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

interface TeamMember {
  member: string;
  role: string;
  img: string;
  bio?: string;
}

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'auto';
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/mission-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        
        <div className="relative h-full flex items-center justify-center container-padding max-w-7xl mx-auto text-center text-white">
          <div className="max-w-4xl px-4">
            <FadeInOnScroll>
              <h1 className="display-text text-white mb-6">About RABNI</h1>
            </FadeInOnScroll>
            <FadeInOnScroll delay={200}>
              <p className="text-xl md:text-2xl opacity-95">
                Empowering communities through innovative education solutions
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeInOnScroll>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                RABNI Education Interventions LTD/GTE is a social enterprise dedicated to transforming education and opportunity for children and young people in underserved communities. Established in 2020, RABNI was born out of a deep desire to address foundational learning gaps among children, especially those affected by conflict, displacement, natural disasters, and poverty.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our work is community-rooted, from grassroots mobilization and teacher training to the deployment of innovative learning solutions designed for schools with little or no resources. We combine education, technology, and social innovation to ensure that no child is left behind, regardless of where they live or the challenges they face.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Over the years, RABNI has grown into a trusted implementation partner for both local and international organizations, including the International Rescue Committee (IRC), USAID, Mohammed Sanusi Foundation, US Embassy Abuja, Korean Cultural Centre Nigeria, TED-Ed, and YALI RLC Accra. Through these collaborations, we have reached thousands of children, trained hundreds of teachers, and provided schools and communities with practical solutions for literacy, digital skills, and resilience.
              </p>
              <p className="text-lg text-muted-foreground">
                Our initiatives go beyond academics. By integrating social emotional learning, gender empowerment, climate-responsive education, and digital innovation, we prepare learners not only to succeed in school but also to grow into empathetic leaders, problem solvers, and change-makers for Africa's future.
              </p>
              <p className="text-lg text-muted-foreground mt-6">
                At RABNI, we believe that every child, whether in a rural village, an internally displaced persons' camp, or an urban classroom deserves access to quality education and the tools to thrive. We exist to make this vision a reality.
              </p>
            </div>
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
              { 
                member: "Israel O. Pender", 
                role: "Executive Director, Academics and Learning", 
                img: teamIsrael,
                bio: "Israel O. Pender is an accomplished educator and academic leader with over 15 years of experience in teaching, curriculum development, and school administration. His teaching career began in primary and secondary schools, where he taught in three different institutions before joining the National Mathematical Centre – International Model Science Academy (NMC-IMSA). At NMC-IMSA, where he taught for six years, Israel specialized in English Language and Literature and also served as Exam Officer and later Vice Principal (Academics). In these roles, he mentored teachers, guided students, and helped hundreds of struggling learners build literacy skills and excel in national examinations. Many of his former students have since become leaders in academia, technology, and other sectors worldwide.\n\nIsrael is the co-founder of RABNI Education Interventions, where he currently serves as Executive Director of Academics and Learning. In this capacity, he leads the organization's academic strategy, ensuring that programs align with both national and global standards while addressing the unique realities of underserved communities. He oversees literacy and numeracy bootcamps, STEAM initiatives, and teacher training workshops, strengthening the capacity of educators while equipping students with skills for lifelong success.\n\nPassionate about learner-centered education, creativity, and the strategic use of technology, Israel's leadership continues to inspire confidence in students, empower teachers, and transform classrooms into spaces where excellence thrives."
              },
              { 
                member: "Patricia Uma", 
                role: "Executive Director, Strategy and Innovation", 
                img: teamPatricia,
                bio: "Patricia Uma is an education innovator, social entrepreneur, and advocate for inclusive learning with over a decade of experience driving literacy and access to education in underserved communities. She holds a Bachelor's in English Language and an MBA in Business Management.\n\nAs Co-founder of RABNI Education Interventions Ltd/GTE, Patricia leads strategy, innovation, and program design, advancing solutions that empower children, teachers, and families in Nigeria's most vulnerable regions. Since 2010, she has dedicated her career to teaching, and since 2016 she has focused on designing community-driven interventions for struggling learners in low-resource settings.\n\nUnder her leadership, RABNI has partnered with organizations such as the International Rescue Committee, USAID, Mohammed Sanusi Foundation, US Embassy Abuja, Korean Cultural Centre Nigeria, TED-Ed, and YALI RLC Accra. Her initiatives include the design of iLearn Literacy Kits and Digital Classrooms, which have reached thousands in conflict-affected regions, and the annual iLearn Bootcamps, equipping young learners with skills in coding, design, animation, and public speaking.\n\nPatricia is passionate about using technology, AI, and locally adapted innovations to close learning gaps, promote gender equity, and build future-ready skills. She envisions a future where every African child has equitable access to quality foundational learning and opportunities for growth."
              },
              { 
                member: "Engr. Prof. Ugheoke Benjamin Iyenagbe, FNSE, JP", 
                role: "Governing Member", 
                img: teamUgheoke,
                bio: "Engr. Prof. Ugheoke Benjamin Iyenagbe, FNSE, JP, is a Professor of Mechanical Engineering with specializations in Materials Engineering, Industrial and Production Engineering, and Applied Solid Mechanics. He earned degrees from the Federal University of Technology Yola (B.Eng), FUT Minna (M.Eng), and a PhD from Universiti Teknologi PETRONAS, Malaysia, alongside a Diploma in Transport Management from Galilee International Management Institute, Israel.\n\nProf. Ugheoke has over two decades of experience in academia, research, and leadership. He currently serves as Director of Academic Planning at Edo State University, where he was also Head of Mechanical, Mechatronics and Production Engineering. He previously served on the Governing Council of the University of Abuja and chaired its Academic Staff Union (ASUU), where he championed reform and staff welfare. His leadership roles also include being the pioneer Director of Research and Innovation at the University of Abuja and National Investment Officer for ASUU.\n\nHe has supervised multiple postgraduate theses, including PhDs, and published over 40 peer-reviewed papers with over 540 citations. A COREN-registered engineer, Fellow of the Nigerian Society of Engineers, and member of several international professional bodies, Prof. Ugheoke brings a rare blend of academic excellence, technical expertise, and visionary leadership, with a lifelong commitment to ethical nation-building and human capacity development."
              },
              { 
                member: "Chinedu Chidi", 
                role: "Governing Member", 
                img: teamChinedu,
                bio: "Chidi is a multi-disciplinary professional whose career spans media, education, public service, finance, and technology. His academic training covers English Language, Media Innovation, Public Administration, Law, Systems Thinking–based Strategic Security Studies, Cybersecurity, and Finance. He has studied at respected institutions including Pan-Atlantic University Lagos, the University of Johannesburg, and Huawei Global Training Center.\n\nWith nearly two decades of experience, Chidi has worked in banking, broadcast and digital media, third sector initiatives, and public finance. He has written and edited for newspapers in Nigeria and abroad, led Africa-wide nonprofit media programs, conducted international journalism trainings, and executed strategic projects with organizations such as Google, USAID, Plan International, Internews, FHI 360, and Climate Watch. He also played a leading role in the development of Nigeria's first climate-focused geo-journalism platform, Eco-Nai+, funded by Google.\n\nBeyond media, Chidi has advanced social impact through Book Reign Initiative, an education-centered nonprofit focused on literacy for children in rural and excluded communities. His work reflects a commitment to leveraging innovation, research, and cross-sector partnerships to address complex societal challenges while amplifying the voices of underserved populations."
              },
              { 
                member: "Vanessa Nyingifa-Williams", 
                role: "Governing Member", 
                img: teamVanessa,
                bio: "Vanessa Nyingifa-Williams is a development sector leader and innovation strategist recognized for her systems thinking approach to solving humanitarian and social challenges. With a career rooted in people-focused solutions, she has worked extensively in conflict-affected regions across Nigeria, advancing policies, programs, and innovations that build resilience in underserved communities.\n\nHer expertise spans Human-Centered Design Thinking, program design, policy strategy, and facilitation. She has contributed to the design and delivery of forward-looking development strategies that empower local actors, strengthen governance, and promote peacebuilding. Vanessa is valued for her ability to bridge the gap between policy and practice, ensuring that development solutions remain inclusive, evidence-based, and sustainable.\n\nKnown for her sharp analytical lens and collaborative spirit, Vanessa views every individual and institution as part of a wider system. By placing herself and her work with intention and clarity, she consistently drives momentum for collective transformation. Her vision is for communities not just to survive challenges but to thrive through innovation, inclusion, and resilience."
              },
              { 
                member: "Jessica Tee Orika-Owunna", 
                role: "Governing Member", 
                img: teamJessica,
                bio: "Jessica Tee Orika-Owunna is a certified content marketing strategist and senior writer with extensive experience supporting leading B2B software companies, including Vena Solutions, Contentsquare, and Softr. She helps brands drive conversions, strengthen product adoption, and establish authority through content that connects with their audiences.\n\nShe is the Founder and Head of Strategy at SaaS Content Brand, a consultancy that equips growth-stage software companies to transform internal knowledge into high-performing content that fuels signups and sales conversations. Previously, she worked as a Senior Content Marketing Specialist at Foundation Marketing Inc., a Canadian B2B agency where her work drove revenue growth, attracted sponsorship deals, and was recognized by major industry leaders such as Hubspot, Hootsuite, and Webflow.\n\nJessica's writing has been featured on Moz and other leading publications. She has also been invited to serve as a judge for global marketing awards, including the US Search Awards, Global Search Awards, and Global Digital Excellence Awards. In 2025, The Nation Newspaper recognized her as one of eight Nigerian women shaping the global B2B software marketing industry.\n\nPassionate about mentorship and leadership, Jessica supports early-career writers through ADPList, provides strategic guidance to founders on GrowthMentor, and runs Dear Young Adults, a platform helping teenagers and young adults discover their identity in Christ while making informed life and career decisions."
              },
            ].map((member, index) => (
              <FadeInOnScroll key={member.member} delay={index * 150}>
                <Card 
                  className="ngo-card p-6 cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
                  onClick={() => handleMemberClick(member)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={member.img} 
                      alt={member.member}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-primary mb-1">{member.member}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-primary mt-2 font-medium">Click to view bio →</p>
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
              { 
                member: "Emmanuel P. Erhioghene", 
                role: "Youth Advisory Board Member", 
                img: teamEmmanuel,
                bio: "Emmanuel is the Founder/CEO of HOLYDIGITS101, the pioneering organization powering Mprofy DAO, where he leads the mission of transforming Africa's education system through Web3 technology. With a vision to integrate blockchain, AI, and decentralized tools into schools across Nigeria and beyond, he is at the forefront of building a new model of digital learning and wealth creation for the next generation.\n\nAs Partnership Lead, He oversees strategic collaborations with schools, communities, ed-tech firms, and blockchain foundations. His role ensures that HOLYDIGITS101's innovations—such as Seed/Deed NFTs for tuition, MProlearn for digital skills, and the Mprofy Business Suite—are both scalable and impactful.\n\nBeyond executive leadership, he is deeply involved in curriculum design, community empowerment, and ecosystem development, positioning HOLYDIGITS101 as a bridge between Africa's local education sector and the global Web3 economy.\n\nThrough his work, Emmanuel champions the belief that Africa's future lies in digital transformation, with students and communities equipped not just as users of technology but as builders and innovators."
              },
              { 
                member: "Sarah Wabara Chiemela", 
                role: "Youth Advisory Board Member", 
                img: teamSarah,
                bio: "Sarah Wabara Chiemela is a 500-level Law student at Abia State University and a proud recipient of the Unubiko Foundation Scholarship. Her decision to pursue law is fueled by a deep passion for justice and a strong commitment to advancing fairness within society. She has particular academic interests in contract law, commercial law, and company law, areas she believes are critical for fostering economic growth and social equity.\n\nOutside the classroom, Sarah has demonstrated remarkable leadership and consistency as the founder and coordinator of the Wisteria Book Club, which she has nurtured for more than five years. Through this initiative, she has cultivated a community that promotes reading, dialogue, and intellectual development among young people. Her commitment to service extends to volunteering with legal clinics and contributing to literacy development through her work in a community library as an alumna of the PEA Foundation.\n\nSarah's strengths lie in her ability to communicate effectively and lead with vision. Known for her excellent conversational skills and ability to connect with diverse audiences, she has represented her lecturers at high-level conferences and is frequently invited to speak at youth and women-focused events. As both a public speaker and a writer, she thrives in creating dialogue that inspires change and empowers communities.\n\nHer alignment with RABNI's mission is rooted in her passion for education and gender equality. Sarah is particularly driven to amplify the voices of women who are often denied their rights and opportunities due to gender. Looking ahead, she envisions establishing her own NGO dedicated to combating human trafficking and abuse against women, while continuing to be a voice of hope and change.\n\nThrough her role on RABNI's Youth Advisory Board, Sarah seeks to learn, contribute, and grow as a young leader committed to shaping a more just and equitable society."
              },
              { 
                member: "Ojonimi Jeremiah Ojogbe", 
                role: "Youth Advisory Board Member", 
                img: teamOjonimi,
                bio: "Ojonimi Jeremiah Ojogbe (also known as Jeremiah Ojogbe) is a full-stack software developer, designer, and social entrepreneur who is passionate about using education and technology to open doors for young people. With a background in Science and Environmental Education, he has always believed in the power of learning to shape lives and transform communities.\n\nDriven by this conviction, Jeremiah founded CodeEasy, a platform that has already helped over 100 students in Nigeria and Kenya gain affordable access to coding and digital skills. Through online courses and mentorship, he creates simple and practical ways for young people to explore technology and prepare for global opportunities without the barriers of cost or location.\n\nHe is also the founder of Our Brand Africa, a growing startup that empowers small and medium-scale enterprises across the continent. By combining technology, media, and creativity, Our Brand Africa helps businesses build their presence, tell authentic stories, and compete on both local and international stages.\n\nWhat sets Jeremiah apart is how he blends his technical expertise with a strong commitment to inclusion and accessibility. Whether he is building platforms, training students, or supporting entrepreneurs, his focus is always on creating opportunities for people who might otherwise be left behind.\n\nHis connection with RABNI's mission comes naturally: like RABNI, he believes that when education is combined with creativity and technology, it can unlock Africa's true potential. Through his role on the Youth Advisory Board, he hopes to bring fresh ideas, collaborate with peers, and contribute to programs that strengthen literacy, digital empowerment, and community development.\n\nLooking ahead, Jeremiah's vision is simple but ambitious to see thousands more young Africans equipped with the skills, confidence, and mindset to not just participate in the global economy, but to lead and innovate within it."
              },
            ].map((member, index) => (
              <FadeInOnScroll key={member.member} delay={index * 150}>
                <Card 
                  className="ngo-card p-6 cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
                  onClick={() => handleMemberClick(member)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={member.img} 
                      alt={member.member}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-primary mb-1">{member.member}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-primary mt-2 font-medium">Click to view bio →</p>
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

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={{
          name: selectedMember?.member || '',
          role: selectedMember?.role || '',
          bio: selectedMember?.bio || 'No bio available.',
          image: selectedMember?.img || ''
        }}
      />
    </>
  );
}