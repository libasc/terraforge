'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/data/index';
import { useSEO } from '@/hooks/useSEO';

const CATEGORIES = ['All', 'Commercial', 'Residential', 'Interior', 'Industrial', 'Renovation'];

export default function WorkPage() {
  useSEO({
    title: 'Our Work',
    description: 'Browse Terraforge Engineering\'s portfolio of completed projects — commercial towers, luxury residences, hospitality interiors, industrial facilities, and heritage renovations worldwide.',
    canonicalPath: '/work',
    keywords: 'construction portfolio, engineering projects, architecture portfolio, building projects, completed projects',
  });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/building-curved.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-tf-bronze font-medium mb-4">Portfolio</p>
          <h1 className="font-display font-black text-white leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Our Work
          </h1>
          <p className="text-tf-sand text-base max-w-lg leading-relaxed">
            Spaces, structures and environments crafted with precision.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-tf-charcoal border-b border-white/10 sticky top-16 lg:top-20 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto py-4 hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 text-[10px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-tf-bronze text-white'
                    : 'text-tf-stone hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="bg-tf-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-tf-stone text-lg">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-tf-sand/30">
              {filtered.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className={`group relative overflow-hidden block bg-tf-offwhite ${
                    i === 0 && filtered.length > 3 ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                  style={{ minHeight: i === 0 && filtered.length > 3 ? '520px' : '380px' }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-70 group-hover:brightness-85"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-2">{project.category}</p>
                        <h3 className="font-display font-700 text-white text-2xl lg:text-3xl tracking-wide mb-1">{project.name}</h3>
                        <p className="text-tf-sand text-sm">{project.location} · {project.year}</p>
                        <p className="text-tf-mid text-sm mt-2 clamp-2 max-w-sm">{project.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-white text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>View Details</span>
                      <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
                        <path d="M0 3h14M11 1l3 2-3 2" stroke="currentColor" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
