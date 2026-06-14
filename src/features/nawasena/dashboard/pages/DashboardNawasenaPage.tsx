import {
  IconChartBar,
  IconClipboardList,
  IconNews,
  IconPlant2,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type StatItem = {
  title: string;
  value: string;
  description: string;
  icon: typeof IconNews;
  accent: string;
  href?: string;
};

const stats: StatItem[] = [
  {
    title: 'Berita',
    value: '12',
    description: 'Konten berita yang siap dikelola.',
    icon: IconNews,
    accent: 'bg-emerald-100 text-emerald-700',
    href: '/dashboard/berita',
  },
  {
    title: 'Pertanian',
    value: '8',
    description: 'Data program pertanian aktif.',
    icon: IconPlant2,
    accent: 'bg-lime-100 text-lime-700',
  },
  {
    title: 'Infografis',
    value: '5',
    description: 'Ringkasan data yang tampil di portal.',
    icon: IconChartBar,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Pengajuan',
    value: '18',
    description: 'Item yang menunggu tindak lanjut admin.',
    icon: IconClipboardList,
    accent: 'bg-amber-100 text-amber-700',
  },
];

export const DashboardNawasenaPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Dashboard
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-neutral-950">
          NAWASENA Admin
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Halaman ini menjadi pusat pengelolaan konten NAWASENA setelah admin
          berhasil login.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-600">
                    {item.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-neutral-950">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`grid h-11 w-11 place-items-center rounded-md ${item.accent}`}
                >
                  <item.icon size={22} />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {item.description}
              </p>
              {item.href ? (
                <p className="mt-4 text-sm font-semibold text-emerald-700">
                  Buka halaman kelola
                </p>
              ) : null}
            </>
          );

          if (item.href) {
            return (
              <Link
                className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                key={item.title}
                to={item.href}
              >
                {content}
              </Link>
            );
          }

          return (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              {content}
            </article>
          );
        })}
      </section>
    </div>
  );
};
