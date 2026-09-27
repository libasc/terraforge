import Link from 'next/link';
import { GALLERY_IMAGES, PROJECTS, ENQUIRIES } from '@/data/index';

const STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Contacted: 'bg-green-50 text-green-700 border-green-200',
  Closed: 'bg-gray-50 text-gray-500 border-gray-200',
};

export default function DashboardPage() {
  const recentUploads = GALLERY_IMAGES.slice(0, 5);
  const recentEnquiries = ENQUIRIES.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-700 text-tf-charcoal text-3xl tracking-wide mb-1">Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back. Here's an overview of your website content.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Gallery Images', value: GALLERY_IMAGES.length, change: '+3 this month', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 14l5-5 4 4 4-5 5 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg> },
          { label: 'Total Projects', value: PROJECTS.length, change: '+1 this month', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5h16v12a1 1 0 01-1 1H3a1 1 0 01-1-1V5zM6 5V4a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.2"/></svg> },
          { label: 'New Enquiries', value: ENQUIRIES.filter(e => e.status === 'New').length, change: '2 unread', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6l8 6 8-6" stroke="currentColor" strokeWidth="1.2"/></svg> },
          { label: 'Recent Projects', value: PROJECTS.filter(p => p.year === '2024').length, change: 'In 2024', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2"/><path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
        ].map(card => (
          <div key={card.label} className="bg-white border border-gray-100 p-5 rounded-none">
            <div className="flex items-start justify-between mb-4">
              <div className="text-gray-400">{card.icon}</div>
              <span className="text-[9px] tracking-wide text-gray-400 bg-gray-50 px-2 py-1">{card.change}</span>
            </div>
            <p className="font-display font-black text-tf-charcoal text-4xl leading-none mb-2">{card.value}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Gallery */}
        <div className="bg-white border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-display font-700 text-tf-charcoal text-lg tracking-wide">Recent Gallery Uploads</h2>
            <Link href="/admin/gallery" className="text-[10px] tracking-[0.15em] uppercase text-tf-bronze hover:text-tf-bronze-dark transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUploads.map(img => (
              <div key={img.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-12 h-9 overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{img.title}</p>
                  <p className="text-[10px] text-gray-400 tracking-wide">{img.category} · {img.date}</p>
                </div>
                <span className={`text-[9px] tracking-wide font-medium px-2 py-1 border ${img.status === 'Published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  {img.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-display font-700 text-tf-charcoal text-lg tracking-wide">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-[10px] tracking-[0.15em] uppercase text-tf-bronze hover:text-tf-bronze-dark transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEnquiries.map(enq => (
              <div key={enq.id} className="flex items-start gap-4 px-6 py-4">
                <div className="w-8 h-8 bg-tf-offwhite flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-700 text-tf-stone text-sm">{enq.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{enq.name}</p>
                  <p className="text-[10px] text-gray-400 tracking-wide">{enq.service} · {enq.date}</p>
                </div>
                <span className={`text-[9px] tracking-wide font-medium px-2 py-1 border whitespace-nowrap ${STATUS_COLORS[enq.status]}`}>
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
