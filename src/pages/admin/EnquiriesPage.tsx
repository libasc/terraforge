'use client';

import { useState } from 'react';
import { Enquiry, ENQUIRIES } from '@/data/index';

type Status = Enquiry['status'];
type Toast = { msg: string } | null;

const STATUS_COLORS: Record<Status, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Contacted: 'bg-green-50 text-green-700 border-green-200',
  Closed: 'bg-gray-50 text-gray-400 border-gray-200',
};

function EnquiryDrawer({ enquiry, onClose, onStatusChange }: {
  enquiry: Enquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: Status) => void;
}) {
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white w-full max-w-lg min-h-screen shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <h2 className="font-display font-700 text-tf-charcoal text-xl tracking-wide">Enquiry Detail</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status update */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase font-medium text-gray-400 mb-3">Status</p>
            <div className="flex flex-wrap gap-2">
              {(['New', 'In Progress', 'Contacted', 'Closed'] as Status[]).map(s => (
                <button
                  key={s}
                  onClick={() => onStatusChange(enquiry.id, s)}
                  className={`text-[10px] tracking-[0.12em] uppercase font-medium px-3 py-2 border transition-colors ${
                    enquiry.status === s ? STATUS_COLORS[s] + ' font-700' : 'border-gray-200 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-gray-50 p-5 space-y-3">
            <p className="text-[10px] tracking-[0.15em] uppercase font-medium text-gray-400 mb-3">Customer Information</p>
            {[
              ['Name', enquiry.name],
              ['Email', enquiry.email],
              ['Phone', enquiry.phone],
              ['Company', enquiry.company],
              ['Service Required', enquiry.service],
              ['Submitted', enquiry.date],
            ].map(([label, val]) => (
              <div key={label} className="flex flex-col">
                <span className="text-[9px] tracking-widest uppercase text-gray-400">{label}</span>
                <span className="text-sm text-gray-700 mt-0.5">{val || '—'}</span>
              </div>
            ))}
          </div>

          {/* Message */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase font-medium text-gray-400 mb-3">Message</p>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4">{enquiry.message}</p>
          </div>

          {/* Admin notes */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase font-medium text-gray-400 mb-3">Admin Notes</p>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              placeholder="Add internal notes about this enquiry..."
              className="w-full border border-gray-200 focus:border-tf-charcoal focus:outline-none px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none transition-colors"
            />
            <button className="mt-2 bg-tf-charcoal hover:bg-tf-bronze text-white text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 transition-colors">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(ENQUIRIES);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [filterStatus, setFilterStatus] = useState<Status | ''>('');
  const [search, setSearch] = useState('');

  const showToast = (msg: string) => {
    setToast({ msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id: string, status: Status) => {
    setEnquiries(es => es.map(e => e.id === id ? { ...e, status } : e));
    setSelected(s => s?.id === id ? { ...s, status } : s);
    showToast(`Status updated to "${status}".`);
  };

  const filtered = enquiries.filter(e =>
    (!filterStatus || e.status === filterStatus) &&
    (!search || e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-700 text-tf-charcoal text-3xl tracking-wide mb-1">Contact Enquiries</h1>
        <p className="text-sm text-gray-400">{enquiries.filter(e => e.status === 'New').length} new enquiries</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-100">
        {([['', 'All'], ['New', 'New'], ['In Progress', 'In Progress'], ['Contacted', 'Contacted'], ['Closed', 'Closed']] as [Status | '', string][]).map(([val, label]) => (
          <button
            key={label}
            onClick={() => setFilterStatus(val)}
            className={`px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-medium border-b-2 transition-colors ${
              filterStatus === val ? 'border-tf-bronze text-tf-charcoal' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {label}
            {val && (
              <span className="ml-1.5 text-[8px]">({enquiries.filter(e => e.status === val).length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or service..."
          className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-gray-400 w-72"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">Name</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden md:table-cell">Service</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden lg:table-cell">Date</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">Status</th>
              <th className="text-right px-5 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(enq => (
              <tr key={enq.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelected(enq)}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-tf-offwhite flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-700 text-tf-stone text-sm">{enq.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{enq.name}</p>
                      <p className="text-[10px] text-gray-400">{enq.company || 'Individual'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{enq.email}</td>
                <td className="px-4 py-4 text-gray-500 hidden md:table-cell">{enq.service}</td>
                <td className="px-4 py-4 text-gray-400 text-xs hidden lg:table-cell">{enq.date}</td>
                <td className="px-4 py-4">
                  <span className={`text-[9px] tracking-wide font-medium px-2 py-1 border ${STATUS_COLORS[enq.status]}`}>
                    {enq.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    {(['In Progress', 'Contacted', 'Closed'] as Status[]).filter(s => s !== enq.status).slice(0, 1).map(nextStatus => (
                      <button
                        key={nextStatus}
                        onClick={() => handleStatusChange(enq.id, nextStatus)}
                        className="text-[9px] tracking-wide text-gray-400 hover:text-tf-charcoal px-2 py-1 border border-gray-100 hover:border-gray-300 transition-colors"
                      >
                        Mark {nextStatus}
                      </button>
                    ))}
                    <button onClick={() => setSelected(enq)} className="p-2 text-gray-400 hover:text-tf-charcoal transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">No enquiries found.</div>
        )}
      </div>

      {selected && (
        <EnquiryDrawer
          enquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-tf-charcoal text-white px-5 py-4 shadow-lg flex items-center gap-3 min-w-[240px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span className="text-sm">{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
