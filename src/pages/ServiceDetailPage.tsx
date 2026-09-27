'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SERVICES, PROJECTS } from '@/data/index';
import { useSEO } from '@/hooks/useSEO';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ServiceDetailPage() {
  const params = useParams();
const id = typeof params?.id === 'string' ? params.id : '';
  const service = SERVICES.find(s => s.id === id);
  const allServices = SERVICES;

  useSEO({
    title: service ? `${service.title} Services` : 'Service',
    description: service
      ? `${service.tagline} — ${service.description}`
      : 'Learn about Terraforge Engineering services.',
    canonicalPath: `/services/${id}`,
    ogImage: service?.heroImage,
    keywords: service
      ? `${service.title.toLowerCase()} services, ${service.capabilities.slice(0, 3).join(', ').toLowerCase()}, Terraforge Engineering`
      : '',
  });

  const s1 = useInView(); const s2 = useInView(); const s3 = useInView(); const s4 = useInView();

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-tf-stone mb-4">Service not found.</p>
          <Link href="/services" className="text-tf-bronze underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  const relatedServices = allServices.filter(s => service.relatedServiceIds.includes(s.id));
  const relatedProjects = PROJECTS.filter(p =>
    p.services.some(s => s.toLowerCase() === service.title.toLowerCase())
  ).slice(0, 3);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[500px] flex flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${service.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/88" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/services" className="text-[10px] tracking-[0.2em] uppercase text-tf-stone hover:text-tf-sand transition-colors">Services</Link>
            <span className="text-tf-stone/40">/</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze">{service.title}</span>
          </div>
          <p className="font-display font-black text-tf-stone text-7xl lg:text-8xl leading-none mb-4 opacity-30 select-none">
            {service.number}
          </p>
          <h1 className="font-display font-black text-white leading-[0.88]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
            {service.title}
          </h1>
          <p className="text-tf-sand text-lg mt-5 max-w-xl leading-relaxed">{service.tagline}</p>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      <section
        ref={s1.ref}
        className={`bg-tf-white py-20 lg:py-28 transition-all duration-700 ${s1.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">
            {/* Long description */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-8">Overview</p>
              <div className="space-y-5 text-tf-stone leading-relaxed">
                {service.longDescription.trim().split('\n\n').map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 mt-10 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 transition-colors duration-200"
              >
                Discuss This Service
                <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
                  <path d="M0 3h14M11 1l3 2-3 2" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </Link>
            </div>

            {/* Capabilities */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-8">Key Capabilities</p>
              <ul className="space-y-3">
                {service.capabilities.map(cap => (
                  <li key={cap} className="flex items-start gap-4 group">
                    <span className="w-5 h-px bg-tf-bronze mt-3 flex-shrink-0 group-hover:w-8 transition-all duration-300" />
                    <span className="text-tf-charcoal text-sm leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>

              {/* Stat strip */}
              <div className="mt-12 pt-10 border-t border-tf-sand/40 space-y-6">
                {[
                  { value: '15+', label: 'Years experience' },
                  { value: '120+', label: 'Projects delivered' },
                  { value: '14', label: 'Countries served' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-baseline gap-4">
                    <span className="font-display font-black text-tf-bronze text-4xl leading-none">{stat.value}</span>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-tf-stone font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ───────────────────────────────────────── */}
      <section className="bg-tf-offwhite">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-tf-sand/30">
            {service.galleryImages.map((img, i) => (
              <div key={i} className="overflow-hidden group" style={{ height: 'clamp(160px, 20vw, 280px)' }}>
                <img src={img} alt={`${service.title} project`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ─────────────────────────────────────────── */}
      <section
        ref={s2.ref}
        className={`bg-tf-charcoal py-20 lg:py-28 transition-all duration-700 ${s2.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-4">How We Deliver</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-16" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            Our Process
          </h2>

          <div className="space-y-px">
            {service.process.map((step, i) => (
              <div key={step.step} className="group grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] border border-white/5 hover:border-tf-bronze/30 transition-colors duration-300">
                <div className="hidden lg:flex items-center justify-center py-8 border-r border-white/5">
                  <span className="font-display font-black text-tf-stone/40 group-hover:text-tf-bronze/60 text-2xl transition-colors duration-300">{step.step}</span>
                </div>
                <div className="px-6 lg:px-10 py-8 border-b lg:border-b-0 lg:border-r border-white/5">
                  <span className="lg:hidden text-[10px] tracking-[0.2em] uppercase text-tf-mid mb-2 block">{step.step}</span>
                  <h3 className="font-display font-700 text-white text-2xl lg:text-3xl tracking-wide">{step.title}</h3>
                </div>
                <div className="px-6 lg:px-10 py-8 flex items-center">
                  <p className="text-tf-mid text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section
        ref={s3.ref}
        className={`bg-tf-offwhite py-20 lg:py-28 transition-all duration-700 ${s3.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Why Choose Us</p>
              <h2 className="font-display font-black text-tf-charcoal leading-[0.9]" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
                The Terraforge<br />Advantage
              </h2>
            </div>
            <div className="space-y-px">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-6 bg-tf-white p-6 group hover:bg-tf-charcoal transition-colors duration-300">
                  <span className="font-display font-black text-tf-bronze group-hover:text-tf-bronze-light text-xl w-10 flex-shrink-0 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-tf-charcoal group-hover:text-tf-sand text-sm leading-relaxed transition-colors duration-300 pt-0.5">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ─────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section
          ref={s4.ref}
          className={`bg-tf-white py-20 lg:py-28 transition-all duration-700 ${s4.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Portfolio</p>
                <h2 className="font-display font-black text-tf-charcoal leading-[0.9]" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
                  Related Work
                </h2>
              </div>
              <Link href="/work" className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase font-medium text-tf-charcoal hover:text-tf-bronze transition-colors duration-200 group">
                All Projects
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M0 4h22M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-tf-sand/30">
              {relatedProjects.map(project => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="group relative overflow-hidden block bg-tf-offwhite"
                  style={{ minHeight: '340px' }}
                >
                  <div className="absolute inset-0">
                    <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-70 group-hover:brightness-85" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-2">{project.category}</p>
                    <h3 className="font-display font-700 text-white text-xl tracking-wide">{project.name}</h3>
                    <p className="text-tf-sand text-sm">{project.location} · {project.year}</p>
                    <div className="mt-4 flex items-center gap-2 text-white text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>View Project</span>
                      <svg width="16" height="6" viewBox="0 0 16 6" fill="none"><path d="M0 3h14M11 1l3 2-3 2" stroke="currentColor" strokeWidth="1"/></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER SERVICES ───────────────────────────────────────── */}
      <section className="bg-tf-offwhite py-20 lg:py-28 border-t border-tf-sand/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-10">Explore More</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-tf-sand/30">
            {relatedServices.map(s => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group bg-tf-white p-8 lg:p-10 flex items-start justify-between gap-6 hover:bg-tf-charcoal transition-colors duration-300"
              >
                <div>
                  <span className="font-display font-black text-tf-sand group-hover:text-tf-stone text-5xl leading-none block mb-4 transition-colors duration-300">{s.number}</span>
                  <h3 className="font-display font-700 text-tf-charcoal group-hover:text-white text-2xl lg:text-3xl tracking-wide mb-2 transition-colors duration-300">{s.title}</h3>
                  <p className="text-tf-stone group-hover:text-tf-mid text-sm leading-relaxed clamp-2 max-w-xs transition-colors duration-300">{s.description}</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-tf-stone group-hover:text-tf-bronze flex-shrink-0 mt-1 transition-colors duration-300">
                  <path d="M2 10h16M12 4l6 6-6 6" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-tf-charcoal py-24 lg:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-6">{service.title}</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
            Ready to Start?
          </h2>
          <p className="text-tf-sand mb-10 leading-relaxed max-w-md mx-auto">
            Tell us about your project and we'll arrange a consultation with our {service.title.toLowerCase()} team.
          </p>
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
