import { IconCalendarEvent, IconNews } from '@tabler/icons-react';

const newsItems = [
  {
    title: 'Musyawarah warga membahas program desa',
    date: '10 Juni 2026',
    category: 'Pemerintahan',
  },
  {
    title: 'Pelayanan administrasi dibuka setiap hari kerja',
    date: '9 Juni 2026',
    category: 'Layanan',
  },
  {
    title: 'Kegiatan gotong royong lingkungan pekan ini',
    date: '8 Juni 2026',
    category: 'Kegiatan',
  },
];

export const BeritaPage = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Berita
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950">
            Berita Desa Karangtengah
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Informasi terbaru seputar kegiatan, pelayanan, dan pengumuman desa.
          </p>
        </div>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              <div className="grid h-11 w-11 place-items-center rounded-md bg-emerald-100 text-emerald-700">
                <IconNews size={22} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {item.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
                <IconCalendarEvent size={17} />
                {item.date}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
