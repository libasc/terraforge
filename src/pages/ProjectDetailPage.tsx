'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PROJECTS } from '@/data/index';
import Lightbox from '@/components/Lightbox';
import { useSEO } from '@/hooks/useSEO';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);

  useSEO({
    title: project?.name ?? 'Project',
    description: project
      ? `${project.name} — ${project.category} project in ${project.location} (${project.year}). ${project.description}`
      : 'View this project by Terraforge Engineering.',
    canonicalPath: `/work/${slug}`,
    ogImage: project?.coverImage,
    keywords: project ? `${project.name}, ${project.category} construction, ${project.location}, Terraforge Engineering` : '',
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-tf-stone mb-4">Project not found.</p>
          <Link href="/work" className="text-tf-bronze underline">Back to Our Work</Link>
        </div>
      </div>
    );
  }

  const relatedProjects = PROJECTS.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3)
    .concat(PROJECTS.filter(p => p.id !== project.id && p.category !== project.category).slice(0, 3 - PROJECTS.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3).length));

  const lightboxImages = project.images.map(url => ({ url, title: project.name, category: project.category }));

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/85" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-[9px] tracking-[0.2em] uppercase text-tf-bronze font-medium">{project.category}</span>
            <span className="text-tf-mid">·</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-tf-sand">{project.location}</span>
            <span className="text-tf-mid">·</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-tf-sand">{project.year}</span>
          </div>
          <h1 className="font-display font-black text-white leading-[0.9]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
          >
            {project.name}
          </h1>
        </div>
      </section>

      {/* Project overview */}
      <section className="bg-tf-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-6">Project Overview</p>
              <p className="text-tf-charcoal leading-relaxed text-lg mb-8">{project.overview}</p>

              <div className="mb-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Services Provided</p>
                <div className="flex flex-wrap gap-3">
                  {project.services.map(s => (
                    <span key={s} className="border border-tf-sand text-tf-charcoal text-[10px] tracking-[0.15em] uppercase font-medium px-4 py-2">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project details card */}
            <div className="bg-tf-offwhite p-8 h-fit">
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-6">Project Details</p>
              <dl className="space-y-4">
                {[
                  ['Client', project.client],
                  ['Location', project.location],
                  ['Area', project.area],
                  ['Duration', project.duration],
                  ['Completion', project.year],
                  ['Project Type', project.projectType],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col border-b border-tf-sand/40 pb-4 last:border-b-0 last:pb-0">
                    <dt className="text-[10px] tracking-[0.15em] uppercase text-tf-stone mb-1">{label}</dt>
                    <dd className="text-tf-charcoal font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-tf-charcoal py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-4">Photography</p>
          <h2 className="font-display font-black text-white leading-[0.9] mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            Project Gallery
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className={`group overflow-hidden relative block ${i === 0 ? 'col-span-2 lg:col-span-2 row-span-2' : ''}`}
                style={{ minHeight: i === 0 ? '400px' : '200px' }}
              >
                <img
                  src={img}
                  alt={`${project.name} - image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-tf-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">Key Achievements</p>
          <h2 className="font-display font-black text-tf-charcoal leading-[0.9] mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            Project Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-tf-sand/30">
            {project.highlights.map((h, i) => (
              <div key={i} className="bg-tf-white p-8 flex items-start gap-6">
                <span className="font-display font-black text-tf-bronze text-2xl w-12 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-tf-charcoal leading-relaxed pt-1">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-tf-offwhite py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-4">See Also</p>
            <h2 className="font-display font-black text-tf-charcoal leading-[0.9] mb-12"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            >
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-tf-sand/30">
              {relatedProjects.slice(0, 3).map(p => (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group relative overflow-hidden block bg-tf-offwhite"
                  style={{ minHeight: '300px' }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-70 group-hover:brightness-85" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-2">{p.category}</p>
                    <h3 className="font-display font-700 text-white text-xl tracking-wide">{p.name}</h3>
                    <p className="text-tf-sand text-sm">{p.location} · {p.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-tf-charcoal py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-black text-white leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            Start Your Project With Us.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-5 transition-colors duration-200"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % lightboxImages.length)}
        />
      )}
    </>
  );
}
