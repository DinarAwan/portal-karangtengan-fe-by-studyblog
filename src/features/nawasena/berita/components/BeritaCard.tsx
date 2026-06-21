import { IconCalendarEvent, IconEdit, IconEye, IconPhoto, IconTag, IconTrash, IconUpload } from '@tabler/icons-react';
import type { BeritaItem, BeritaStatus } from '../types/berita';
import { formatBeritaDate, formatViews, getStatusLabel } from '../utils/formatBerita';

type BeritaCardProps = {
  article: BeritaItem;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, status: BeritaStatus) => void;
  onEdit: (article: BeritaItem) => void;
  onUploadCover: (id: string) => void;
};

const getStatusClass = (status: BeritaStatus) => {
  if (status === 'published') return 'bg-emerald-100 text-emerald-700';
  if (status === 'review') return 'bg-amber-100 text-amber-700';
  if (status === 'archived') return 'bg-neutral-200 text-neutral-600';
  return 'bg-neutral-100 text-neutral-600';
};

// const getPlacementClass = (placement: BeritaHomepagePlacement) => {
//   if (placement === 'featured') return 'border-[#f8cd24]/50 bg-[#fff8d8] text-[#8a6500]';
//   if (placement === 'supporting') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
//   return 'border-neutral-200 bg-neutral-50 text-neutral-500';
// };

export const BeritaCard = ({ article, onDelete, onEdit, onTogglePublish, onUploadCover }: BeritaCardProps) => {
  return (
    <article className="grid gap-4 p-5 lg:grid-cols-[168px_1fr_auto] lg:items-center">
      <div className="relative group">
        {article.coverUrl ? (
          <img alt={article.title} className="h-36 w-full rounded-lg object-cover lg:h-28" src={article.coverUrl} />
        ) : (
          <div className="grid h-36 w-full place-items-center rounded-lg bg-neutral-100 text-neutral-400 lg:h-28">
            <IconPhoto size={26} />
          </div>
        )}
        {/* Tombol Overlay Upload Gambar */}
        <button 
          onClick={() => onUploadCover(article.id)}
          className="absolute inset-0 hidden place-items-center rounded-lg bg-black/50 text-white transition group-hover:grid"
        >
          <IconUpload size={24} />
        </button>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <IconTag size={14} /> {article.category || 'Umum'}
          </span>
          <button 
  onClick={() => onTogglePublish(article.id, article.status)} // <- (Bisa biarkan seperti ini jika propsnya masih butuh status, tapi fungsi handleTogglePublish di atas hanya akan memakai ID-nya)
  className={`rounded-full px-3 py-1 text-xs font-semibold cursor-pointer hover:opacity-80 transition ${getStatusClass(article.status)}`}
  title="Klik untuk ubah status publish"
>
  {getStatusLabel(article.status)}
</button>
          {/* <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${getPlacementClass(article.homepagePlacement ?? 'none')}`}>
            <IconHomeStats size={14} /> {getHomepagePlacementLabel(article.homepagePlacement ?? 'none')}
          </span> */}
        </div>
        
        <h4 className="mt-3 max-w-2xl text-base font-semibold leading-snug text-neutral-950">
          {article.title}
        </h4>
        <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-neutral-600">
          {article.excerpt || 'Belum ada ringkasan.'}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
          <p>{article.authorId || 'Admin'}</p>
          <p className="inline-flex items-center gap-1.5"><IconCalendarEvent size={16} />{formatBeritaDate(article.publishedAt || article.createdAt)}</p>
          <p className="inline-flex items-center gap-1.5"><IconEye size={16} />{formatViews(article.views || 0)} dilihat</p>
        </div>
      </div>

      <div className="flex gap-2 lg:justify-end">
        <button
          onClick={() => onEdit(article)}
          title="Edit Data"
          className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
        >
          <IconEdit size={18} />
        </button>
        <button
          onClick={() => onDelete(article.id)}
          title="Hapus Berita"
          className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-red-600 transition hover:bg-red-50"
        >
          <IconTrash size={18} />
        </button>
      </div>
    </article>
  );
};