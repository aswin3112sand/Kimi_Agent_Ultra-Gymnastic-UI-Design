import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ChevronRight,
  Star,
  Trophy,
  Users,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  ArrowUp,
  Menu,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo('.hero-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo('.hero-stats',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1 }
      );

      // About section
      gsap.fromTo('.about-image',
        { opacity: 0, x: -80, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      gsap.fromTo('.about-content',
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Programs cards stagger
      gsap.fromTo('.program-card',
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: {
            trigger: programsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stats counter animation
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Gallery images
      gsap.fromTo('.gallery-item',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Testimonials
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact section
      gsap.fromTo('.contact-info',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      gsap.fromTo('.contact-map',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax for hero image
      gsap.to('.hero-bg-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const stats = [
    { icon: Trophy, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '2000+', label: 'Students Trained' },
    { icon: Star, value: '50+', label: 'Awards Won' },
    { icon: Heart, value: '100%', label: 'Safety Record' }
  ];

  const programs = [
    {
      title: 'Kids Gymnastics',
      age: 'Ages 5-12',
      description: 'Fun-filled foundational training focusing on balance, coordination, and confidence building through playful exercises.',
      image: '/kids-gymnastics.jpg',
      features: ['Basic tumbling', 'Balance beam', 'Floor exercises', 'Fun games']
    },
    {
      title: 'Teens Training',
      age: 'Ages 13-18',
      description: 'Advanced techniques, strength conditioning, and routine development for competitive and recreational gymnasts.',
      image: '/teens-training.jpg',
      features: ['Advanced routines', 'Strength training', 'Competition prep', 'Flexibility']
    },
    {
      title: 'Fitness & Conditioning',
      age: 'All Ages',
      description: 'Gymnastics-based fitness programs for overall body conditioning, mobility, and athletic performance.',
      image: '/fitness-conditioning.jpg',
      features: ['Core strength', 'Mobility work', 'Injury prevention', 'Athletic conditioning']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Parent',
      content: 'My daughter has gained so much confidence since joining. The coaches are patient and professional. Highly recommended!',
      rating: 5
    },
    {
      name: 'Arjun Kumar',
      role: 'Teen Athlete',
      content: 'The training here helped me win state-level competitions. The facilities are world-class and coaches truly care.',
      rating: 5
    },
    {
      name: 'Lakshmi Menon',
      role: 'Parent',
      content: 'Safe environment, professional coaching, and visible progress. My kids love coming here every day!',
      rating: 5
    }
  ];

  const galleryImages = [
    '/gallery-1.jpg',
    '/gallery-2.jpg',
    '/gallery-5.jpg',
    '/hero-gymnast.jpg',
    '/kids-gymnastics.jpg',
    '/teens-training.jpg'
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Loading Screen */}
      <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-spinner" />
      </div>

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Particle Background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
        <nav className="glass-dark mx-4 mt-4 rounded-2xl px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e10600] to-[#ff6b35] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Gymnastics Academy</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Home', ref: heroRef },
                { label: 'About', ref: aboutRef },
                { label: 'Programs', ref: programsRef },
                { label: 'Gallery', ref: galleryRef },
                { label: 'Contact', ref: contactRef }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e10600] to-[#ff6b35] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-glow py-2 px-4 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Home', ref: heroRef },
                  { label: 'About', ref: aboutRef },
                  { label: 'Programs', ref: programsRef },
                  { label: 'Gallery', ref: galleryRef },
                  { label: 'Contact', ref: contactRef }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-left text-white/70 hover:text-white transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="hero-bg-image absolute inset-0 scale-110">
            <img
              src="/hero-gymnast.jpg"
              alt="Gymnastics"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <div className="hero-title">
            <span className="inline-block px-4 py-2 rounded-full glass text-[#e10600] text-sm font-semibold mb-6">
              Professional Gymnastics Training
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight mb-6">
              Unleash Your{' '}
              <span className="gradient-text text-glow">Potential</span>
            </h1>
          </div>

          <p className="hero-subtitle text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            World-class gymnastics coaching for kids and teens. Build strength, flexibility, 
            and confidence in a safe, supportive environment.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-glow text-lg px-8 py-4"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Get Free Trial</span>
            </a>
            <button
              onClick={() => scrollToSection(programsRef)}
              className="btn btn-outline text-lg px-8 py-4"
            >
              <span>Explore Programs</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Stats */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-4 text-center">
                <stat.icon className="w-6 h-6 text-[#e10600] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Years of Excellence', suffix: '' },
              { value: '2000', label: 'Students Trained', suffix: '+' },
              { value: '50', label: 'Championships Won', suffix: '+' },
              { value: '100', label: 'Safety Record', suffix: '%' }
            ].map((stat, index) => (
              <div
                key={index}
                className="stat-item glass rounded-3xl p-8 text-center group hover:bg-white/10 transition-all duration-500"
              >
                <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="about-image relative">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="/gallery-1.jpg"
                  alt="About Gymnastics Academy"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e10600] to-[#ff6b35] flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Award Winning</div>
                    <div className="text-white/60 text-sm">Best Academy 2024</div>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#e10600]/30 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 left-1/4 w-16 h-16 bg-[#e10600]/10 rounded-full blur-xl" />
            </div>

            {/* Content */}
            <div className="about-content">
              <span className="inline-block text-[#e10600] font-semibold text-sm uppercase tracking-wider mb-4">
                About Our Academy
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Building Champions{' '}
                <span className="gradient-text">Since 2009</span>
              </h2>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                At Gymnastics Academy, we believe every child has the potential to achieve greatness. 
                Our state-of-the-art facility, combined with certified professional coaches, creates 
                the perfect environment for young athletes to thrive.
              </p>
              <p className="text-white/60 mb-8 leading-relaxed">
                We focus on holistic development - building not just physical strength and flexibility, 
                but also discipline, confidence, and teamwork. Our proven training methodology has 
                helped hundreds of students achieve their goals.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Certified Professional Coaches',
                  'World-Class Training Facility',
                  'Safe & Supportive Environment',
                  'Personalized Training Plans'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#e10600]/20 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-[#e10600]" />
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollToSection(contactRef)}
                className="btn btn-primary"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#e10600] font-semibold text-sm uppercase tracking-wider mb-4">
              Our Programs
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Training Programs for{' '}
              <span className="gradient-text">All Ages</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From beginners to competitive athletes, we have programs designed to help every 
              student reach their full potential.
            </p>
          </div>

          {/* Program Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="program-card group relative glass rounded-3xl overflow-hidden card-hover"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#e10600] text-white text-xs font-semibold">
                      {program.age}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{program.title}</h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full btn btn-outline py-3">
                        <span>Learn More</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="glass-dark border-white/10 max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">
                          {program.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                        <p className="text-white/70 mb-4">{program.description}</p>
                        <div className="space-y-2 mb-6">
                          <h4 className="text-white font-semibold mb-2">Program Features:</h4>
                          {program.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-[#e10600]" />
                              <span className="text-white/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <a
                          href="https://wa.me/919999999999"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-full"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>Enroll Now</span>
                        </a>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#e10600] font-semibold text-sm uppercase tracking-wider mb-4">
              Gallery
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Moments of{' '}
              <span className="gradient-text">Excellence</span>
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div
                    className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer ${
                      index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ height: index === 0 || index === 3 ? '400px' : '200px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-sm font-medium">View Photo</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="glass-dark border-white/10 max-w-4xl p-1">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#e10600] font-semibold text-sm uppercase tracking-wider mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              What Parents & Students{' '}
              <span className="gradient-text">Say</span>
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card glass rounded-3xl p-8 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#e10600] to-[#ff6b35] flex items-center justify-center">
                  <span className="text-white text-lg font-bold">"</span>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/70 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e10600]/30 to-[#ff6b35]/30 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-white/50 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[#e10600] font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Start Your{' '}
              <span className="gradient-text">Journey Today</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info space-y-6">
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e10600]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#e10600]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm mb-1">Phone</div>
                      <a href="tel:+919999999999" className="text-white font-semibold hover:text-[#e10600] transition-colors">
                        +91 99999 99999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e10600]/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[#e10600]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm mb-1">WhatsApp</div>
                      <a 
                        href="https://wa.me/919999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold hover:text-[#e10600] transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e10600]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#e10600]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm mb-1">Working Hours</div>
                      <div className="text-white font-semibold">Mon - Sat: 6AM - 9PM</div>
                      <div className="text-white/60 text-sm">Sunday: Closed</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e10600]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#e10600]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm mb-1">Location</div>
                      <div className="text-white font-semibold">Chennai, Tamil Nadu</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-white/50 text-sm mb-4">Follow Us</div>
                  <div className="flex gap-4">
                    {[
                      { icon: Instagram, href: '#' },
                      { icon: Facebook, href: '#' },
                      { icon: Youtube, href: '#' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-[#e10600] hover:bg-[#e10600]/20 transition-all"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="glass rounded-3xl p-8 bg-gradient-to-br from-[#e10600]/20 to-[#ff6b35]/20">
                <h4 className="text-xl font-bold text-white mb-3">
                  Ready to Start?
                </h4>
                <p className="text-white/70 mb-6">
                  Get a free trial class and experience our world-class training firsthand.
                </p>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book Free Trial</span>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="contact-map">
              <div className="glass rounded-3xl p-4 h-full">
                <iframe
                  title="Gymnastics Academy Location"
                  src="https://www.google.com/maps?q=Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[400px] rounded-2xl"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e10600] to-[#ff6b35] flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">Gymnastics Academy</span>
                </div>
                <p className="text-white/60 mb-6 max-w-md">
                  Building champions through world-class gymnastics training. 
                  Join us to unlock your full potential.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, href: '#' },
                    { icon: Facebook, href: '#' },
                    { icon: Youtube, href: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-[#e10600] hover:bg-[#e10600]/20 transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Home', ref: heroRef },
                    { label: 'About', ref: aboutRef },
                    { label: 'Programs', ref: programsRef },
                    { label: 'Contact', ref: contactRef }
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => scrollToSection(item.ref)}
                        className="text-white/60 hover:text-[#e10600] transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programs */}
              <div>
                <h4 className="text-white font-semibold mb-4">Programs</h4>
                <ul className="space-y-2">
                  {['Kids Gymnastics', 'Teens Training', 'Fitness & Conditioning', 'Competition Prep'].map((item) => (
                    <li key={item}>
                      <span className="text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/40 text-sm">
            © 2026 Gymnastics Academy. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky CTA (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold text-sm">Quick Enquiry</div>
            <div className="text-white/60 text-xs">WhatsApp-la message pannunga</div>
          </div>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary py-2 px-4 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
          </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 md:bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#e10600] to-[#ff6b35] flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;
