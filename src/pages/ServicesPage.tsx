'use client';

import Link from 'next/link';
import { SERVICES } from '@/data/index';
import { useSEO } from '@/hooks/useSEO';

export default function ServicesPage() {
  useSEO({
    title: 'Services',
    description: 'Explore Terraforge Engineering\'s full range of services: construction, structural engineering, interior design, renovation and project management delivered to the highest standards.',
    canonicalPath: '/services',
    keywords: 'construction services, structural engineering services, interior design, building renovation, project management firm',
  });
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/workers1.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/85" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-tf-bronze font-medium mb-4">What We Do</p>
          <h1 className="font-display font-black text-white leading-[0.9]"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Built Around<br />Your Vision.
          </h1>
        </div>
      </section>

      {/* Services detail */}
      {SERVICES.map((svc, i) => (
        <section
          key={svc.id}
          className={i % 2 === 0 ? 'bg-tf-white' : 'bg-tf-offwhite'}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:grid-flow-col' : ''}`}>
              {/* Image */}
              <div className={`overflow-hidden ${i % 2 !== 0 ? 'lg:order-2' : ''}`}
                style={{ height: 'clamp(280px, 40vw, 520px)' }}
              >
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>

              {/* Content */}
              <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <Link href={`/services/${svc.id}`} className="block group">
                  <span className="font-display font-black text-tf-sand group-hover:text-tf-bronze/40 text-8xl leading-none block mb-4 transition-colors duration-300">{svc.number}</span>
                  <h2 className="font-display font-black text-tf-charcoal group-hover:text-tf-bronze leading-[0.9] mb-6 transition-colors duration-300"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
                  >
                    {svc.title}
                  </h2>
                </Link>
                <p className="text-tf-stone leading-relaxed mb-8">{svc.description}</p>

                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Key Capabilities</p>
                  <div className="grid grid-cols-2 gap-2">
                    {svc.capabilities.map(cap => (
                      <div key={cap} className="flex items-center gap-3">
                        <span className="w-4 h-px bg-tf-bronze flex-shrink-0" />
                        <span className="text-tf-charcoal text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/services/${svc.id}`}
                    className="inline-flex items-center gap-3 bg-tf-charcoal hover:bg-tf-bronze text-white text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 transition-colors duration-200 group"
                  >
                    Read More
                    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                      <path d="M0 3h14M11 1l3 2-3 2" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 border border-tf-stone hover:border-tf-bronze text-tf-stone hover:text-tf-bronze text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 transition-colors duration-200"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-tf-charcoal py-24 lg:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-6">Let's Talk</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
          >
            Ready to Start Your Project?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-5 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
