'use client';

import { useState } from 'react';
import { Project, PROJECTS } from '@/data/index';

type Toast = { msg: string; type: 'success' | 'error' } | null;

const CATEGORIES = ['Commercial', 'Residential', 'Interior', 'Industrial', 'Renovation'];
const SERVICES_LIST = ['Construction', 'Engineering', 'Interior Design', 'Renovation', 'Project Management'];

function Toast({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 shadow-lg ${toast.type === 'success' ? 'bg-tf-charcoal' : 'bg-red-600'} text-white min-w-[280px]`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span className="text-sm flex-1">{toast.msg}</span>
      <button onClick={onClose} className="text-white/60 hover:text-white ml-2">×</button>
    </div>
  );
}

function ConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm p-8">
        <h3 className="font-display font-700 text-tf-charcoal text-xl tracking-wide mb-2">Delete Project</h3>
        <p className="text-gray-500 text-sm mb-2">Are you sure you want to delete this project?</p>
        <p className="text-[11px] tracking-wide text-red-500 mb-8 font-medium">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-red-600 text-white text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

type ProjectDraft = Omit<Project, 'id' | 'slug' | 'coverImage' | 'images' | 'highlights' | 'featured'>;

function ProjectForm({ initial, onSave, onCancel }: {
  initial?: Project;
  onSave: (data: Partial<Project>, publish: boolean) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [location, setLocation] = useState(initial?.location ?? '');
  const [year, setYear] = useState(initial?.year ?? '');
  const [client, setClient] = useState(initial?.client ?? '');
  const [projectType, setProjectType] = useState(initial?.projectType ?? '');
  const [area, setArea] = useState(initial?.area ?? '');
  const [duration, setDuration] = useState(initial?.duration ?? '');
  const [overview, setOverview] = useState(initial?.overview ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [highlight, setHighlight] = useState('');
  const [highlights, setHighlights] = useState<string[]>(initial?.highlights ?? []);
  const [services, setServices] = useState<string[]>(initial?.services ?? []);

  const addHighlight = () => {
    if (highlight.trim()) { setHighlights(h => [...h, highlight.trim()]); setHighlight(''); }
  };

  const removeHighlight = (i: number) => setHighlights(h => h.filter((_, idx) => idx !== i));

  const toggleService = (s: string) => setServices(sv => sv.includes(s) ? sv.filter(x => x !== s) : [...sv, s]);

  const inputBase = 'w-full border border-gray-200 focus:border-tf-charcoal focus:outline-none px-4 py-3 text-sm text-gray-700 placeholder-gray-300 transition-colors';
  const labelBase = 'block text-[10px] tracking-[0.15em] uppercase font-medium text-gray-400 mb-2';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto flex items-start justify-end">
      <div className="bg-white w-full max-w-xl min-h-screen shadow-xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="font-display font-700 text-tf-charcoal text-xl tracking-wide">{initial ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-700">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-gray-500 mb-4">Basic Information</p>
            <div className="space-y-4">
              <div>
                <label className={labelBase}>Project Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} className={inputBase} placeholder="e.g. Crystalline Tower" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelBase}>Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className={inputBase}>
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelBase}>Year</label>
                  <input value={year} onChange={e => setYear(e.target.value)} className={inputBase} placeholder="2024" />
                </div>
                <div>
                  <label className={labelBase}>Location</label>
                  <input value={location} onChange={e => setLocation(e.target.value)} className={inputBase} placeholder="London, UK" />
                </div>
                <div>
                  <label className={labelBase}>Client</label>
                  <input value={client} onChange={e => setClient(e.target.value)} className={inputBase} placeholder="Client Name" />
                </div>
                <div>
                  <label className={labelBase}>Project Type</label>
                  <input value={projectType} onChange={e => setProjectType(e.target.value)} className={inputBase} placeholder="e.g. High-Rise Commercial" />
                </div>
                <div>
                  <label className={labelBase}>Area</label>
                  <input value={area} onChange={e => setArea(e.target.value)} className={inputBase} placeholder="e.g. 42,000 sq.ft" />
                </div>
                <div>
                  <label className={labelBase}>Duration</label>
                  <input value={duration} onChange={e => setDuration(e.target.value)} className={inputBase} placeholder="e.g. 18 months" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelBase}>Short Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className={`${inputBase} resize-none`} placeholder="Brief project description..." />
          </div>

          <div>
            <label className={labelBase}>Project Overview</label>
            <textarea value={overview} onChange={e => setOverview(e.target.value)} rows={5} className={`${inputBase} resize-none`} placeholder="Detailed project overview..." />
          </div>

          <div>
            <label className={labelBase}>Services Provided</label>
            <div className="flex flex-wrap gap-2">
              {SERVICES_LIST.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={`text-[10px] tracking-[0.12em] uppercase font-medium px-3 py-2 border transition-colors ${
                    services.includes(s) ? 'bg-tf-charcoal border-tf-charcoal text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelBase}>Project Highlights</label>
            <div className="flex gap-2 mb-3">
              <input
                value={highlight}
                onChange={e => setHighlight(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                className={`${inputBase} flex-1`}
                placeholder="Add a highlight..."
              />
              <button type="button" onClick={addHighlight} className="bg-tf-charcoal text-white px-4 text-[11px] tracking-wide hover:bg-tf-bronze transition-colors">Add</button>
            </div>
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-b-0">
                <span className="w-2 h-2 bg-tf-bronze flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1">{h}</span>
                <button onClick={() => removeHighlight(i)} className="text-gray-300 hover:text-red-400 text-lg leading-none">×</button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 pb-8">
            <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="button" onClick={() => onSave({ name, category, location, year, client, projectType, area, duration, overview, description, services, highlights }, false)} className="border border-tf-charcoal text-tf-charcoal text-[11px] tracking-[0.15em] uppercase font-medium px-6 py-3 hover:bg-tf-charcoal hover:text-white transition-colors">Save Draft</button>
            <button type="button" onClick={() => onSave({ name, category, location, year, client, projectType, area, duration, overview, description, services, highlights }, true)} className="bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.15em] uppercase font-medium px-6 py-3 transition-colors">Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkManagementPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [search, setSearch] = useState('');

  const showToast = (msg: string) => {
    setToast({ msg, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (data: Partial<Project>, publish: boolean) => {
    if (editing) {
      setProjects(ps => ps.map(p => p.id === editing.id ? { ...p, ...data, featured: publish || p.featured } : p));
      showToast(publish ? 'Project published successfully.' : 'Draft saved.');
      setEditing(null);
    } else {
      const newP: Project = {
        id: `p${Date.now()}`, slug: (data.name ?? 'project').toLowerCase().replace(/\s+/g, '-'),
        name: data.name ?? '', category: data.category ?? '', location: data.location ?? '',
        year: data.year ?? '', client: data.client ?? '', area: data.area ?? '',
        duration: data.duration ?? '', projectType: data.projectType ?? '',
        description: data.description ?? '', overview: data.overview ?? '',
        coverImage: '/images/hero.jpg',
        images: ['/images/hero.jpg'],
        highlights: data.highlights ?? [], services: data.services ?? [], featured: publish,
      };
      setProjects(ps => [newP, ...ps]);
      showToast(publish ? 'Project published successfully.' : 'Draft saved.');
      setAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setProjects(ps => ps.filter(p => p.id !== id));
    setDeletingId(null);
    showToast('Project deleted.');
  };

  const filtered = projects.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-700 text-tf-charcoal text-3xl tracking-wide mb-1">Our Work</h1>
          <p className="text-sm text-gray-400">{projects.length} projects total</p>
        </div>
        <button onClick={() => setAdding(true)} className="bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-3 flex items-center gap-2 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-gray-400 w-64" />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">Project</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden lg:table-cell">Location</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden lg:table-cell">Year</th>
              <th className="text-left px-4 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium hidden sm:table-cell">Status</th>
              <th className="text-right px-5 py-4 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-9 overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-[10px] text-gray-400 md:hidden">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500 hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-4 text-gray-500 hidden lg:table-cell">{p.location}</td>
                <td className="px-4 py-4 text-gray-500 hidden lg:table-cell">{p.year}</td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={`text-[9px] tracking-wide font-medium px-2 py-1 border ${p.featured ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                    {p.featured ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(p)} className="p-2 text-gray-400 hover:text-tf-charcoal transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2l3 3-7 7H2v-3L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={() => setDeletingId(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V2h4v2M6 6v5M8 6v5M3 4l1 8h6l1-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">No projects found.</div>
        )}
      </div>

      {(adding || editing) && (
        <ProjectForm initial={editing ?? undefined} onSave={handleSave} onCancel={() => { setAdding(false); setEditing(null); }} />
      )}

      {deletingId && (
        <ConfirmModal onConfirm={() => handleDelete(deletingId)} onCancel={() => setDeletingId(null)} />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
