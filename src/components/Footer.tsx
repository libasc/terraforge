import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-tf-black text-tf-sand">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 lg:py-20 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-tf-bronze flex items-center justify-center">
                <span className="font-display font-black text-white text-sm tracking-wider">TF</span>
              </div>
              <div>
                <span className="font-display font-700 text-white text-lg tracking-widest uppercase leading-none">Terraforge</span>
                <p className="text-tf-mid text-[9px] tracking-[0.2em] uppercase font-medium leading-none mt-0.5">Engineering</p>
              </div>
            </div>
            <p className="text-tf-mid text-sm leading-relaxed mb-6">
              Building spaces and structures with purpose, precision, and permanence. From concept to completion, we deliver engineering and design excellence.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {['LinkedIn', 'X', 'Instagram'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] tracking-[0.15em] uppercase text-tf-stone hover:text-tf-bronze-light transition-colors duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-[10px] tracking-[0.2em] uppercase font-medium text-tf-mid mb-5">Navigation</h5>
            <ul className="space-y-3">
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/services', 'Services'],
                ['/work', 'Our Work'],
                ['/contact', 'Contact Us'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link href={to} className="text-tf-mid hover:text-white text-sm transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-[10px] tracking-[0.2em] uppercase font-medium text-tf-mid mb-5">Services</h5>
            <ul className="space-y-3">
              {['Construction', 'Engineering', 'Interior Design', 'Renovation', 'Project Management'].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-tf-mid hover:text-white text-sm transition-colors duration-200">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[10px] tracking-[0.2em] uppercase font-medium text-tf-mid mb-5">Contact</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-[10px] tracking-[0.15em] uppercase text-tf-mid mb-1">Phone</p>
                <a href="tel:+919315875534" className="text-tf-sand hover:text-white transition-colors">+91-9315875534</a>
              </li>
              <li>
                <p className="text-[10px] tracking-[0.15em] uppercase text-tf-mid mb-1">Email</p>
                <a href="mailto:terraforge.eng@gmail.com" className="text-tf-sand hover:text-white transition-colors">terraforge.eng@gmail.com</a>
              </li>
              <li>
                <p className="text-[10px] tracking-[0.15em] uppercase text-tf-mid mb-1">Address</p>
                <p className="text-tf-sand leading-relaxed">B-145 commercial complex, park town Aditya world city Ghaziabad</p>
              </li>
              <li>
                <p className="text-[10px] tracking-[0.15em] uppercase text-tf-mid mb-1">Hours</p>
                <p className="text-tf-sand">Mon–Fri, 08:00–18:00</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-[10px] tracking-[0.12em] uppercase text-tf-mid">
          <p>© 2026 Terraforge Engineering. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-tf-sand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-tf-sand transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
