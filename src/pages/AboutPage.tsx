'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { TEAM } from '@/data/index';
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

const MILESTONES = [
  { year: '2009', label: 'Founded', detail: 'Established in London as a specialist structural engineering consultancy.' },
  { year: '2013', label: 'Expansion', detail: 'Grew into full-spectrum construction services across the UK and Europe.' },
  { year: '2016', label: 'Dubai Office', detail: 'Opened regional headquarters in Dubai to serve the Middle East market.' },
  { year: '2019', label: 'Singapore', detail: 'Launched Singapore studio, bringing interior design and hospitality expertise to Asia.' },
  { year: '2022', label: '100+ Projects', detail: 'Passed the milestone of 100 completed projects across 14 countries.' },
  { year: '2024', label: 'Today', detail: 'A team of 25+ engineers, designers, and project managers operating globally.' },
];

export default function AboutPage() {
  useSEO({
    title: 'About Us',
    description: 'Learn the story of Terraforge Engineering — 15 years of precision construction, structural engineering, interior design and renovation across Europe, the Middle East and Asia.',
    canonicalPath: '/about',
    keywords: 'about Terraforge Engineering, construction company history, engineering firm London, premium building services',
  });

  const s1 = useInView(0.05);
  const s2 = useInView(0.05);
  const s3 = useInView(0.05);
  const s4 = useInView(0.05);
  const s5 = useInView(0.05);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[440px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(/images/about-hero.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-tf-bronze font-medium mb-4">About Us</p>
          <h1 className="font-display font-black text-white leading-[0.9]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
            Building With<br />Purpose.
          </h1>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section
        ref={s1.ref}
        className={`bg-tf-white py-20 lg:py-32 transition-all duration-700 ${s1.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Section intro */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 mb-20 lg:mb-28">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-6">Our Story</p>
              <h2 className="font-display font-black text-tf-charcoal leading-[0.9]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.5rem)' }}>
                Fifteen years of engineering excellence.
              </h2>
            </div>
            <div className="space-y-5 text-tf-stone leading-relaxed lg:pt-14">
              <p>
                Terraforge Engineering was founded in 2009 by a team of engineers and designers who believed that the built environment deserved more rigour, more beauty, and more care than the industry typically delivered.
              </p>
              <p>
                What began as a specialist structural engineering consultancy has grown into a full-spectrum practice spanning construction, engineering, interior design, renovation, and project management — with offices in London, Dubai, and Singapore.
              </p>
              <p>
                Our work spans residential towers, heritage restorations, luxury interiors, and large-scale industrial facilities. The common thread is an uncompromising commitment to precision and craft.
              </p>
            </div>
          </div>

          {/* Story image strip */}
          <div className="grid grid-cols-3 gap-px bg-tf-sand/30 mb-20 lg:mb-28">
            {[
              { img: '/images/workers1.jpg', cap: 'Site Engineering', sub: 'London, 2023' },
              { img: '/images/building-curved.jpg', cap: 'Crystalline Tower', sub: 'Dubai, 2024' },
              { img: '/images/interior-living.jpg', cap: 'Harrington Residences', sub: 'London, 2023' },
            ].map(item => (
              <div key={item.cap} className="group overflow-hidden relative bg-tf-offwhite">
                <div className="overflow-hidden" style={{ height: 'clamp(180px, 28vw, 400px)' }}>
                  <img src={item.img} alt={item.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-5 py-4 bg-tf-white">
                  <p className="font-display font-700 text-tf-charcoal text-lg tracking-wide leading-tight">{item.cap}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-tf-stone mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mb-20 lg:mb-28">
            <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-10">Our Journey</p>
            <div className="relative">
              {/* Horizontal rule */}
              <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-tf-sand/60" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px bg-tf-sand/30 lg:bg-transparent lg:gap-0">
                {MILESTONES.map((m, i) => (
                  <div key={m.year} className={`bg-tf-white lg:bg-transparent lg:pr-6 p-5 lg:p-0 group ${i < MILESTONES.length - 1 ? 'lg:border-r lg:border-tf-sand/40' : ''}`}>
                    {/* Dot on the timeline */}
                    <div className="hidden lg:flex items-center mb-5">
                      <div className="w-3 h-3 bg-tf-bronze flex-shrink-0 relative z-10" />
                      <div className="flex-1 h-px bg-transparent" />
                    </div>
                    <span className="font-display font-black text-tf-bronze text-2xl leading-none block mb-2 lg:mb-3">{m.year}</span>
                    <p className="font-display font-700 text-tf-charcoal text-base tracking-wide mb-2">{m.label}</p>
                    <p className="text-tf-stone text-xs leading-relaxed">{m.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pull-quote */}
          <div className="relative border-l-4 border-tf-bronze pl-8 lg:pl-14 py-4 mb-20 lg:mb-28 max-w-3xl">
            <p className="font-display font-black text-tf-charcoal leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}>
              "We don't just build structures.<br />We build <em>legacies</em>."
            </p>
            <p className="text-tf-stone text-sm tracking-wide mt-5">— Enter your name, Managing Director</p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-tf-sand/30">
            {[
              {
                label: 'Our Vision',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-tf-bronze">
                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M14 2v4M14 22v4M2 14h4M22 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                ),
                text: 'To be the defining construction and engineering practice of our generation — one that builds with integrity, executes with precision, and leaves every project as a lasting contribution to its environment.',
              },
              {
                label: 'Our Mission',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-tf-bronze">
                    <path d="M4 22L14 6l10 16H4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M14 14v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="14" cy="20" r="1" fill="currentColor"/>
                  </svg>
                ),
                text: 'To deliver exceptional built outcomes for our clients through disciplined engineering, thoughtful design, and rigorous project management — building spaces that serve people well for generations.',
              },
            ].map(item => (
              <div key={item.label} className="bg-tf-offwhite p-10 lg:p-14 group hover:bg-tf-charcoal transition-colors duration-500">
                <div className="mb-6 group-hover:[&_path]:stroke-tf-bronze-light group-hover:[&_circle]:stroke-tf-bronze-light">
                  {item.icon}
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone group-hover:text-tf-mid font-medium mb-4">{item.label}</p>
                <p className="text-tf-charcoal group-hover:text-tf-sand leading-relaxed transition-colors duration-500">{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── APPROACH ─────────────────────────────────────────────── */}
      <section
        ref={s2.ref}
        className={`bg-tf-charcoal py-20 lg:py-32 transition-all duration-700 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-4">How We Work</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-16 lg:mb-24" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            Our Approach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { n: '01', title: 'Understand', desc: 'We invest time in understanding your objectives, constraints, and vision before a single line is drawn.' },
              { n: '02', title: 'Plan', desc: 'Rigorous planning defines programme, budget, and technical strategy — minimising risk before construction begins.' },
              { n: '03', title: 'Build', desc: 'Disciplined construction and engineering execution with continuous quality oversight at every stage.' },
              { n: '04', title: 'Deliver', desc: 'Handover is not the end — we ensure you have everything you need for the space to perform as designed.' },
            ].map(step => (
              <div key={step.n} className="bg-tf-charcoal p-10 lg:p-12 border-l border-white/5 first:border-l-0 group hover:bg-tf-dark transition-colors duration-300">
                <span className="font-display font-black text-tf-stone/40 group-hover:text-tf-bronze/30 text-7xl leading-none block mb-8 transition-colors duration-300">{step.n}</span>
                <h3 className="font-display font-700 text-white text-3xl tracking-wide mb-4">{step.title}</h3>
                <p className="text-tf-mid text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────── */}
      <section
        ref={s3.ref}
        className={`bg-tf-offwhite py-20 lg:py-32 transition-all duration-700 ${s3.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">What We Stand For</p>
              <h2 className="font-display font-black text-tf-charcoal leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
                Core Values
              </h2>
            </div>
            <div className="space-y-5">
              {['Integrity', 'Quality', 'Precision', 'Innovation', 'Commitment'].map((val, i) => (
                <div key={val} className="flex items-center gap-6 group">
                  <span className="font-display font-black text-tf-sand group-hover:text-tf-bronze text-2xl w-12 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 flex items-center gap-4">
                    <span className="w-full h-px bg-tf-sand/60 group-hover:bg-tf-bronze/40 transition-colors duration-300" />
                    <span className="font-display font-700 text-tf-charcoal text-2xl lg:text-3xl tracking-wide whitespace-nowrap">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section
        ref={s4.ref}
        className={`bg-tf-white py-20 lg:py-32 transition-all duration-700 ${s4.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">The People</p>
          <h2 className="font-display font-black text-tf-charcoal leading-[0.9] mb-16" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            Leadership
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-tf-sand/30">
            {TEAM.map(member => (
              <div key={member.name} className="bg-tf-white group">
                <div className="overflow-hidden aspect-[3/4]">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h4 className="font-display font-700 text-tf-charcoal text-xl tracking-wide">{member.name}</h4>
                  <p className="text-tf-stone text-[11px] tracking-[0.15em] uppercase mt-1">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        ref={s5.ref}
        className={`bg-tf-charcoal py-24 lg:py-32 text-center transition-all duration-700 ${s5.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-6">Work With Us</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
            Let's Build Something Remarkable.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-5 transition-colors duration-200"
          >
            Get In Touch
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
