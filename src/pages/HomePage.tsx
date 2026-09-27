'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Lightbox from '@/components/Lightbox';
import { PROJECTS, SERVICES, GALLERY_IMAGES, STATS } from '@/data/index';
import { useSEO } from '@/hooks/useSEO';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({ end, suffix, trigger }: { end: number; suffix: string; trigger: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const duration = 60;
    const step = () => {
      frame++;
      const progress = Math.min(frame / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end]);
  return <span>{val}{suffix}</span>;
}

const HERO_IMG = '/images/hero.jpg';
const INTRO_IMG = '/images/about-hero.jpg';

export default function HomePage() {
  useSEO({
    title: 'Terraforge Engineering',
    description: 'Terraforge Engineering delivers premium construction, structural engineering, interior design, renovation and project management services across Europe, the Middle East and Asia.',
    canonicalPath: '/',
    keywords: 'construction company, structural engineering, interior design, renovation, project management, London, Dubai, Singapore',
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const statsSection = useInView(0.3);
  const introSection = useInView(0.1);
  const servicesSection = useInView(0.05);
  const workSection = useInView(0.05);
  const gallerySection = useInView(0.05);
  const whySection = useInView(0.05);

  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 5);

  const lightboxImages = GALLERY_IMAGES.map(g => ({ url: g.url, title: g.title, category: g.category }));

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const nextImage = () => setLightboxIndex(i => (i + 1) % lightboxImages.length);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-tf-black"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-tf-bronze font-medium mb-6 animate-fade-up">
            Terraforge Engineering
          </p>
          <h1 className="font-display font-black text-white leading-[0.9] mb-8 animate-fade-up delay-100"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
          >
            Building Spaces.<br />
            Forging<br className="sm:hidden" /> Possibilities.
          </h1>
          <p className="text-tf-sand text-base lg:text-lg max-w-lg leading-relaxed mb-10 animate-fade-up delay-200">
            We deliver construction, engineering, interior design, and complete building solutions — from concept through to completion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <Link
              href="/work"
              className="bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 transition-colors duration-200 text-center"
            >
              Explore Our Work
            </Link>
            <Link
              href="/services"
              className="border border-white/40 hover:border-white text-white text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 transition-colors duration-200 text-center"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-600">
          <span className="text-[9px] tracking-[0.2em] uppercase text-tf-sand">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-tf-stone to-transparent" />
        </div>
      </section>

      {/* ─── INTRODUCTION ───────────────────────────────────────── */}
      <section
        ref={introSection.ref}
        className={`bg-tf-white py-20 lg:py-32 transition-all duration-700 ${introSection.inView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-semibold mb-6 tracking-[0.25em]">About</p>
              <h2 className="font-display font-black text-tf-charcoal leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
              >
                We build with purpose, precision and permanence.
              </h2>
            </div>
            <div>
              <p className="text-tf-stone leading-relaxed text-base mb-8">
                Terraforge Engineering is a full-spectrum construction and engineering practice with over 15 years of delivered expertise. From structural engineering and large-scale construction to bespoke interior design and sensitive renovation, we bring rigour and craft to every commission.
              </p>
              <ul className="space-y-3 mb-10">
                {['Construction', 'Engineering', 'Interior Design', 'Renovation', 'Project Management'].map(s => (
                  <li key={s} className="flex items-center gap-4">
                    <span className="w-6 h-px bg-tf-bronze flex-shrink-0" />
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-tf-charcoal">{s}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-tf-charcoal hover:text-tf-bronze transition-colors duration-200 group"
              >
                Discover More
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M0 4h22M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Large image */}
          <div className="mt-16 lg:mt-24 relative overflow-hidden" style={{ height: 'clamp(240px, 45vw, 560px)' }}>
            <img
              src={INTRO_IMG}
              alt="Terraforge engineering project"
              className="w-full h-full object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────── */}
      <section
        ref={servicesSection.ref}
        className={`bg-tf-charcoal py-20 lg:py-32 transition-all duration-700 ${servicesSection.inView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 lg:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-4">What We Do</p>
              <h2 className="font-display font-black text-white leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
              >
                Our Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-tf-sand hover:text-white transition-colors duration-200 group"
            >
              All Services
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M0 4h22M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </Link>
          </div>

          <div className="space-y-px">
            {SERVICES.map((svc, i) => (
              <Link
                key={svc.id}
                href={`/services/${svc.id}`}
                className="group relative overflow-hidden border border-white/10 hover:border-tf-bronze/40 transition-colors duration-300 block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr_60px] gap-6 lg:gap-0 p-6 lg:p-0 items-center">
                  <div className="hidden lg:flex items-center justify-center h-full border-r border-white/10 py-8">
                    <span className="font-display font-black text-tf-mid text-2xl tracking-wider">{svc.number}</span>
                  </div>
                  <div className="lg:px-10 lg:py-8">
                    <span className="lg:hidden text-tf-mid text-[10px] tracking-widest uppercase mb-1 block">{svc.number}</span>
                    <h3 className="font-display font-700 text-white text-3xl lg:text-4xl tracking-wide mb-3">{svc.title}</h3>
                    <p className="text-tf-mid text-sm leading-relaxed max-w-sm">{svc.description}</p>
                  </div>
                  <div className="relative overflow-hidden h-40 lg:h-full" style={{ minHeight: '160px' }}>
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                    />
                  </div>
                  <div className="hidden lg:flex items-center justify-center h-full border-l border-white/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-tf-stone group-hover:text-tf-bronze transition-colors duration-300 group-hover:translate-x-1 transition-transform">
                      <path d="M2 10h16M12 4l6 6-6 6" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY TERRAFORGE ─────────────────────────────────────── */}
      <section
        ref={whySection.ref}
        className={`bg-tf-offwhite py-20 lg:py-32 transition-all duration-700 ${whySection.inView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Why Choose Us</p>
          <h2 className="font-display font-black text-tf-charcoal leading-[0.9] mb-16 lg:mb-24"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            The Terraforge<br />Difference
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-tf-sand/40">
            {[
              { n: '01', title: 'Precision', desc: 'Rigorous attention to engineering and construction details at every stage.' },
              { n: '02', title: 'Quality', desc: 'Uncompromising standards applied throughout every project phase.' },
              { n: '03', title: 'Experience', desc: 'Over 15 years of professional execution and project expertise.' },
              { n: '04', title: 'Innovation', desc: 'Modern construction methods and design approaches that set new benchmarks.' },
              { n: '05', title: 'Reliability', desc: 'A firm commitment to timelines, communication and delivery.' },
            ].map(item => (
              <div key={item.n} className="bg-tf-offwhite p-8 lg:p-10 group hover:bg-tf-charcoal transition-colors duration-400">
                <span className="font-display font-black text-tf-sand group-hover:text-tf-stone text-6xl leading-none block mb-6 transition-colors duration-400">
                  {item.n}
                </span>
                <h3 className="font-display font-700 text-tf-charcoal group-hover:text-white text-2xl tracking-wide mb-3 transition-colors duration-400">
                  {item.title}
                </h3>
                <p className="text-tf-stone group-hover:text-tf-sand text-sm leading-relaxed transition-colors duration-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SELECTED WORK ──────────────────────────────────────── */}
      <section
        ref={workSection.ref}
        className={`bg-tf-white py-20 lg:py-32 transition-all duration-700 ${workSection.inView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Portfolio</p>
              <h2 className="font-display font-black text-tf-charcoal leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
              >
                Selected Work
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-tf-charcoal hover:text-tf-bronze transition-colors duration-200 group"
            >
              View All Projects
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M0 4h22M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </Link>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-tf-sand/30">
            {featuredProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className={`group relative overflow-hidden bg-tf-offwhite block ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
                style={{ minHeight: i === 0 ? '520px' : '300px' }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-2">{project.category}</p>
                  <h3 className="font-display font-700 text-white text-2xl lg:text-3xl tracking-wide mb-1">{project.name}</h3>
                  <div className="flex items-center gap-4 text-tf-sand text-[11px] tracking-wide">
                    <span>{project.location}</span>
                    <span className="text-tf-stone">·</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-white text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Project</span>
                    <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
                      <path d="M0 3h14M11 1l3 2-3 2" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ────────────────────────────────────────────── */}
      <section
        ref={gallerySection.ref}
        className={`bg-tf-charcoal py-20 lg:py-32 transition-all duration-700 ${gallerySection.inView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-4">Gallery</p>
            <h2 className="font-display font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Inside Terraforge
            </h2>
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
            {GALLERY_IMAGES.slice(0, 12).map((img, i) => (
              <button
                key={img.id}
                onClick={() => openLightbox(i)}
                className="group block w-full overflow-hidden relative break-inside-avoid mb-2"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-600 group-hover:scale-105"
                  style={{ display: 'block' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[9px] tracking-[0.2em] uppercase font-medium">
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATISTICS ─────────────────────────────────────────── */}
      <section
        ref={statsSection.ref}
        className="bg-tf-black py-20 lg:py-28"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-tf-black p-10 lg:p-14 text-center">
                <p className="font-display font-black text-white mb-3"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1 }}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} trigger={statsSection.inView} />
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-tf-mid font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-40 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/building-white.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-tf-charcoal/88" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-6">Ready to Build?</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
          >
            Let's Build Something<br />Remarkable.
          </h2>
          <p className="text-tf-sand text-base lg:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Tell us about your project and let's discuss how Terraforge Engineering can bring it to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-5 transition-colors duration-200"
          >
            Start a Conversation
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
