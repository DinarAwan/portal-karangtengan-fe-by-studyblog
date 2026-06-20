import { Link } from 'react-router-dom';
import { IconArrowRight, IconBookmark, IconCalendarEvent, IconEye } from '@tabler/icons-react';
import type { PublicBeritaItem } from '../types/berita';
import { formatBeritaDate, formatViews } from '../utils/formatBerita';

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x450/e9f1e2/72b841?text=Desa+Karangtengah';

type PublicBeritaCardProps = {
  item: PublicBeritaItem;
};

export const PublicBeritaCard = ({ item }: PublicBeritaCardProps) => {
  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#e5ecdf] bg-white shadow-[0_12px_32px_rgba(16,23,8,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,23,8,0.13)] flex flex-col">
      <div className="relative overflow-hidden bg-[#eef3e8]">
        <img
          alt={item.title}
          className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
          src={item.coverUrl || PLACEHOLDER_IMAGE}
        />
        <span className="absolute right-5 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-[#101708] shadow-[0_10px_24px_rgba(16,23,8,0.16)]">
          <IconBookmark size={19} stroke={1.8} />
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="w-fit rounded-full bg-[#e6f4dc] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#62a23a]">
          {item.category || 'Umum'}
        </p>
        <h3 className="mt-4 line-clamp-2 text-xl font-extrabold leading-snug text-[#101708]">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#626b5f] flex-1">
          {item.excerpt || 'Belum ada ringkasan.'}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-sm text-[#6C757D]">
          <div className="flex flex-wrap gap-5">
            <span className="inline-flex items-center gap-2">
              <IconCalendarEvent size={16} />
              {formatBeritaDate(item.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <IconEye size={16} />
              {formatViews(item.views || 0)}
            </span>
          </div>
          
          {/* Ini bagian Baca Selengkapnya yang mengarah ke halaman detail */}
          <Link
            to={`/berita/${item.slug}`}
            className="inline-flex items-center gap-1.5 font-bold text-[#4f842f] hover:underline"
          >
            Baca selengkapnya
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};