'use client';

import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';

type FormState = { name: string; email: string; phone: string; company: string; service: string; message: string };
type FieldError = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL: FormState = { name: '', email: '', phone: '', company: '', service: '', message: '' };
const SERVICES = ['Construction', 'Engineering', 'Interior Design', 'Renovation', 'Project Management', 'Other'];

function validate(f: FormState): FieldError {
  const errs: FieldError = {};
  if (!f.name.trim()) errs.name = 'Full name is required.';
  if (!f.email.trim()) errs.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Please enter a valid email.';
  if (!f.service) errs.service = 'Please select a service.';
  if (!f.message.trim()) errs.message = 'Message is required.';
  return errs;
}

export default function ContactPage() {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Terraforge Engineering. Discuss your construction, engineering, interior design or renovation project with our team in London, Dubai, and Singapore.',
    canonicalPath: '/contact',
    keywords: 'contact Terraforge Engineering, construction enquiry, engineering consultation, building project enquiry',
  });
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(er => ({ ...er, [k]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    setTimeout(() => { setStatus('success'); setForm(INITIAL); }, 1500);
  };

  const inputBase = 'w-full bg-tf-offwhite border border-tf-sand focus:border-tf-charcoal focus:outline-none px-5 py-4 text-tf-charcoal placeholder-tf-stone text-sm transition-colors duration-200';
  const errorBorder = 'border-red-400 focus:border-red-500';
  const labelBase = 'block text-[10px] tracking-[0.15em] uppercase font-medium text-tf-stone mb-2';

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/building-sky.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/85" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-tf-bronze font-medium mb-4">Contact Us</p>
          <h1 className="font-display font-black text-white leading-[0.9]"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Let's Build Something<br />Together.
          </h1>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-tf-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            {/* Info column */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone font-medium mb-8">Get In Touch</p>
              <div className="space-y-8">
                {[
                  { label: 'Phone', value: '+91-9315875534', href: 'tel:+919315875534' },
                  { label: 'Email', value: 'terraforge.eng@gmail.com', href: 'mailto:terraforge.eng@gmail.com' },
                  { label: 'Address', value: '12 Forge Lane\nLondon EC1A 1BB\nUnited Kingdom' },
                  { label: 'Hours', value: 'Monday – Friday\n10:00 – 18:00 IST' },
                ].map(item => (
                  <div key={item.label} className="border-b border-tf-sand/40 pb-8 last:border-b-0">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-tf-stone font-medium mb-2">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-tf-charcoal hover:text-tf-bronze transition-colors duration-200 text-base">{item.value}</a>
                    ) : (
                      <p className="text-tf-charcoal whitespace-pre-line leading-relaxed">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
           {/*   <div className="mt-10 bg-tf-offwhite aspect-square flex items-center justify-center border border-tf-sand/40">
                <div className="text-center p-8">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-3 text-tf-stone">
                    <path d="M16 3C10.48 3 6 7.48 6 13c0 8 10 16 10 16s10-8 10-16c0-5.52-4.48-10-10-10zm0 13a3 3 0 110-6 3 3 0 010 6z" fill="currentColor"/>
                  </svg>
                  <p className="text-tf-stone text-sm">12 Forge Lane, London EC1A 1BB</p>
                </div>
              </div>
              */}
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <div className="bg-tf-offwhite p-12 text-center">
                  <div className="w-12 h-12 bg-tf-bronze flex items-center justify-center mx-auto mb-6">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10l5 5 9-9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-700 text-tf-charcoal text-3xl tracking-wide mb-3">Enquiry Received</h3>
                  <p className="text-tf-stone leading-relaxed">
                    Thank you for reaching out. A member of our team will be in touch within 2 business days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-[11px] tracking-[0.2em] uppercase font-medium text-tf-bronze hover:text-tf-bronze-dark transition-colors duration-200"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelBase}>Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Enter your name"
                        className={`${inputBase} ${errors.name ? errorBorder : ''}`}
                      />
                      {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelBase}>Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="Enter your email id"
                        className={`${inputBase} ${errors.email ? errorBorder : ''}`}
                      />
                      {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelBase}>Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+91-9315875534"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className={labelBase}>Company</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={set('company')}
                        placeholder="Company Name"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelBase}>Service Required *</label>
                    <select
                      value={form.service}
                      onChange={set('service')}
                      className={`${inputBase} ${errors.service ? errorBorder : ''}`}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="mt-1 text-red-500 text-xs">{errors.service}</p>}
                  </div>

                  <div>
                    <label className={labelBase}>Message *</label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us about your project — scope, location, timeline, and any other relevant details."
                      rows={7}
                      className={`${inputBase} resize-none ${errors.message ? errorBorder : ''}`}
                    />
                    {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-tf-charcoal hover:bg-tf-bronze disabled:opacity-60 text-white text-[11px] tracking-[0.2em] uppercase font-medium py-5 transition-colors duration-200 flex items-center justify-center gap-3"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Enquiry'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="bg-tf-charcoal py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-tf-bronze font-medium mb-2">Prefer to Call?</p>
            <p className="font-display font-700 text-white text-3xl lg:text-4xl tracking-wide">+91-9315875534</p>
          </div>
          <p className="text-tf-stone text-center lg:text-right max-w-xs">
            Our project team is available Monday to Friday, 8am to 6pm GMT.
          </p>
        </div>
      </section>
    </>
  );
}
