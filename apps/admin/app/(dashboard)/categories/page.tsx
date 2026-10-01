'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Layers, Package, Image as ImageIcon } from 'lucide-react';
import { Category } from '@quickbasket/types';
import { AdminService } from '@/services/adminService';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [accentColor, setAccentColor] = useState('#EBF8F0');
  const [iconName, setIconName] = useState('Package');
  const [isSaving, setIsSaving] = useState(false);

  // Archive modal
  const [archiveModal, setArchiveModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: '',
  });

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const cats = await AdminService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setImageUrl('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80');
    setAccentColor('#EBF8F0');
    setIconName('Package');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setImageUrl(cat.imageUrl);
    setAccentColor(cat.accentColor || '#EBF8F0');
    setIconName(cat.iconName || 'Package');
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      if (editingCategory) {
        const updated = await AdminService.updateCategory(editingCategory.id, {
          name,
          slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
          imageUrl,
          accentColor,
          iconName,
        });
        setCategories(categories.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const created = await AdminService.createCategory({
          name,
          slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
          imageUrl,
          accentColor,
          iconName,
        });
        setCategories([...categories, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmArchive = async () => {
    try {
      await AdminService.deleteCategory(archiveModal.id);
      setCategories(categories.filter((c) => c.id !== archiveModal.id));
      setArchiveModal({ isOpen: false, id: '', name: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Category Management
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Organize catalog aisles, banners, and delivery routing taxonomies
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-[#eae7e0] overflow-hidden shadow-xs hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="relative h-28 overflow-hidden bg-[#faf9f6]">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: cat.accentColor || '#144d31' }}
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-ink shadow-xs backdrop-blur-xs">
                  {cat.itemCount || 32} SKUs
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-ink truncate">{cat.name}</h3>
                </div>
                <div className="text-[11px] font-mono text-ink-400 truncate">
                  slug: /{cat.slug}
                </div>

                <div className="pt-2 border-t border-[#f0eee8] flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => openEditModal(cat)}
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <button
                    onClick={() =>
                      setArchiveModal({ isOpen: true, id: cat.id, name: cat.name })
                    }
                    className="p-1.5 text-ink-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors text-xs"
                    title="Archive Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Edit / Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create New Category'}
        description="Configure taxonomy label, URL slug, and promotional artwork."
      >
        <form onSubmit={handleSaveCategory} className="space-y-4">
          <Input
            label="CATEGORY NAME *"
            placeholder="e.g. Organic Dairy & Farm Fresh"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!editingCategory) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
              }
            }}
            required
          />

          <Input
            label="URL SLUG"
            placeholder="e.g. organic-dairy"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <Input
            label="IMAGE BANNER URL"
            placeholder="https://images.unsplash.com/..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="ACCENT HEX COLOR"
              placeholder="#EBF8F0"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
            />
            <Input
              label="ICON SYMBOL"
              placeholder="Package, Carrot, Milk, etc."
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eae7e0]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
              Save Category
            </Button>
          </div>
        </form>
      </Modal>

      {/* Archive Category Confirmation */}
      <ConfirmDialog
        isOpen={archiveModal.isOpen}
        onClose={() => setArchiveModal({ isOpen: false, id: '', name: '' })}
        onConfirm={handleConfirmArchive}
        title="Archive Category?"
        message={`Are you sure you want to archive "${archiveModal.name}"? Products inside this category will still remain in catalog but won't show in department navigation.`}
        confirmLabel="Archive Category"
        variant="danger"
      />
    </div>
  );
}
