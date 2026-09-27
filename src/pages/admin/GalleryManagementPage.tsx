'use client';

import { useState, useRef } from 'react';
import { GalleryImage, GALLERY_IMAGES } from '@/data/index';

type Toast = { msg: string; type: 'success' | 'error' } | null;

const CATEGORIES = ['Construction', 'Interior', 'Commercial', 'Residential', 'Renovation', 'Engineering'];

function Toast({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 shadow-lg ${toast.type === 'success' ? 'bg-tf-charcoal' : 'bg-red-600'} text-white min-w-[280px]`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {toast.type === 'success'
          ? <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          : <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5"/>
        }
      </svg>
      <span className="text-sm flex-1">{toast.msg}</span>
      <button onClick={onClose} className="text-white/60 hover:text-white ml-2">×</button>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm p-8">
        <h3 className="font-display font-700 text-tf-charcoal text-xl tracking-wide mb-2">Confirm Delete</h3>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <p className="text-[11px] tracking-wide text-red-500 mb-8 font-medium">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-red-600 text-white text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

function ImageForm({ initial, onSave, onCancel }: {
  initial?: Partial<GalleryImage>;
  onSave: (data: Omit<GalleryImage, 'id'>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [status, setStatus] = useState<'Published' | 'Draft'>(initial?.status ?? 'Draft');
  const [preview, setPreview] = useState(initial?.url ?? '');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, category, status, url: preview || (initial?.url ?? ''), date: new Date().toISOString().split('T')[0] });
  };

  const inputBase = 'w-full border border-gray-200 focus:border-tf-charcoal focus:outline-none px-4 py-3 text-sm text-gray-700 placeholder-gray-300 transition-colors';
  const labelBase = 'block text-[10px] tracking-[0.15em] uppercase font-medium text-gray-400 mb-2';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-end overflow-y-auto">
      <div className="bg-white w-full max-w-lg min-h-screen shadow-xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display font-700 text-tf-charcoal text-xl tracking-wide">
            {initial?.title ? 'Edit Image' : 'Add Image'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-700">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Upload area */}
          <div>
            <label className={labelBase}>Image *</label>
            <div
              className="border-2 border-dashed border-gray-200 hover:border-tf-bronze transition-colors cursor-pointer overflow-hidden"
              style={{ minHeight: '180px' }}
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-gray-300">
                    <path d="M14 20V8M8 14l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="2" y="2" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  <p className="text-sm text-gray-400">Click to upload or drag & drop</p>
                  <p className="text-[10px] text-gray-300">PNG, JPG, WEBP up to 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {preview && (
              <button type="button" onClick={() => setPreview('')} className="mt-2 text-[10px] tracking-wide text-red-500 hover:text-red-700">Remove image</button>
            )}
          </div>

          <div>
            <label className={labelBase}>Image Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className={inputBase} placeholder="e.g. Crystalline Tower Exterior" required />
          </div>

          <div>
            <label className={labelBase}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className={inputBase}>
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className={labelBase}>Status</label>
            <div className="flex gap-3">
              {(['Published', 'Draft'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 border text-[11px] tracking-[0.15em] uppercase font-medium py-3 transition-colors ${
                    status === s ? 'bg-tf-charcoal border-tf-charcoal text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.15em] uppercase font-medium py-3 transition-colors">Save Image</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (data: Omit<GalleryImage, 'id'>) => {
    if (editing) {
      setImages(imgs => imgs.map(img => img.id === editing.id ? { ...img, ...data } : img));
      showToast('Image updated successfully.');
      setEditing(null);
    } else {
      const newImg: GalleryImage = { id: `g${Date.now()}`, ...data };
      setImages(imgs => [newImg, ...imgs]);
      showToast('Image added successfully.');
      setAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setImages(imgs => imgs.filter(img => img.id !== id));
    setDeletingId(null);
    showToast('Image deleted.');
  };

  const filtered = images.filter(img =>
    (!search || img.title.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCat || img.category === filterCat) &&
    (!filterStatus || img.status === filterStatus)
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-700 text-tf-charcoal text-3xl tracking-wide mb-1">Image Gallery</h1>
          <p className="text-sm text-gray-400">{images.length} images total</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-3 flex items-center gap-2 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add Image
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search images..."
          className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-gray-400 w-56"
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="border border-gray-200 px-4 py-2 text-sm focus:outline-none text-gray-600">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-gray-200 px-4 py-2 text-sm focus:outline-none text-gray-600">
          <option value="">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        {(search || filterCat || filterStatus) && (
          <button onClick={() => { setSearch(''); setFilterCat(''); setFilterStatus(''); }} className="text-[11px] tracking-wide text-gray-400 hover:text-gray-700 px-2">Clear</button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-100 py-20 text-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto mb-4 text-gray-200">
            <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
            <circle cx="13" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 28l10-10 8 8 8-12 10 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <p className="text-gray-400 mb-2">No images found</p>
          <button onClick={() => setAdding(true)} className="text-tf-bronze text-sm hover:underline">Add your first image</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(img => (
            <div key={img.id} className="bg-white border border-gray-100 group">
              <div className="relative overflow-hidden aspect-video">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setEditing(img)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-gray-700 p-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2l3 3-7 7H2v-3L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={() => setDeletingId(img.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/90 hover:bg-red-600 text-white p-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V2h4v2M6 6v5M8 6v5M3 4l1 8h6l1-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <span className={`absolute top-2 right-2 text-[8px] tracking-wide font-medium px-2 py-0.5 border ${img.status === 'Published' ? 'bg-white text-green-700 border-green-200' : 'bg-white text-gray-400 border-gray-200'}`}>
                  {img.status}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-700 truncate">{img.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{img.category} · {img.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {(adding || editing) && (
        <ImageForm
          initial={editing ?? undefined}
          onSave={handleSave}
          onCancel={() => { setAdding(false); setEditing(null); }}
        />
      )}

      {deletingId && (
        <ConfirmModal
          message="Delete this gallery image?"
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
