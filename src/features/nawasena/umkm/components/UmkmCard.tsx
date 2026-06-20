import { IconBuildingStore, IconEdit, IconMapPin, IconPhone, IconPhoto, IconTag, IconTrash, IconUpload } from '@tabler/icons-react';
import type { UmkmItem, UmkmStatus } from '../types/umkm';
import { formatRupiah } from '../utils/formatUmkm';

type UmkmCardProps = {
  item: UmkmItem;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
  onEdit: (item: UmkmItem) => void;
  onUploadCover: (id: string) => void;
};

export const UmkmCard = ({ item, onDelete, onEdit, onTogglePublish, onUploadCover }: UmkmCardProps) => {
  return (
    <article className="grid gap-4 p-5 lg:grid-cols-[168px_1fr_auto] lg:items-center">
      <div className="relative group">
        {item.coverUrl ? (
          <img alt={item.name} className="h-36 w-full rounded-lg object-cover lg:h-28" src={item.coverUrl} />
        ) : (
          <div className="grid h-36 w-full place-items-center rounded-lg bg-neutral-100 text-neutral-400 lg:h-28">
            <IconBuildingStore size={26} />
          </div>
        )}
        <button 
          onClick={() => onUploadCover(item.id)}
          className="absolute inset-0 hidden place-items-center rounded-lg bg-black/50 text-white transition group-hover:grid"
        >
          <IconUpload size={24} />
        </button>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 uppercase">
            <IconTag size={14} /> {item.category}
          </span>
          <button 
            onClick={() => onTogglePublish(item.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition hover:opacity-80 ${item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-200 text-neutral-600'}`}
          >
            {item.status.toUpperCase()}
          </button>
        </div>
        
        <h4 className="mt-3 text-base font-semibold leading-snug text-neutral-950">{item.name}</h4>
        <p className="mt-1 text-sm text-neutral-600">Pemilik: {item.ownerName}</p>
        
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
          <p className="inline-flex items-center gap-1.5"><IconPhone size={16} />{item.contactPhone}</p>
          <p className="inline-flex items-center gap-1.5"><IconMapPin size={16} />{item.contactAddress}</p>
        </div>
        
        {item.products && item.products.length > 0 && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 mb-1">Produk Unggulan:</p>
            <p className="text-sm font-medium text-neutral-800">
              {item.products[0].name} ({formatRupiah(item.products[0].price)}/{item.products[0].unit}) 
              {item.products.length > 1 && <span className="text-emerald-600 ml-1">+{item.products.length - 1} lainnya</span>}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2 lg:justify-end">
        <button onClick={() => onEdit(item)} className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100">
          <IconEdit size={18} />
        </button>
        <button onClick={() => onDelete(item.id)} className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-red-600 transition hover:bg-red-50">
          <IconTrash size={18} />
        </button>
      </div>
    </article>
  );
};