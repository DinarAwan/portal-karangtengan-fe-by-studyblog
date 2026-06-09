import { IconSparkles, IconTargetArrow, IconUsersGroup } from '@tabler/icons-react';

const focuses = [
  {
    title: 'Program Unggulan',
    description: 'Ruang untuk memperkenalkan program NAWASENA desa.',
    icon: IconSparkles,
  },
  {
    title: 'Target Kegiatan',
    description: 'Arah kegiatan dan capaian yang ingin diwujudkan.',
    icon: IconTargetArrow,
  },
  {
    title: 'Kolaborasi Warga',
    description: 'Keterlibatan masyarakat dalam menjalankan program.',
    icon: IconUsersGroup,
  },
];

export const NawasenaPage = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            NAWASENA
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950">
            NAWASENA Karangtengah
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Halaman khusus untuk menampilkan informasi program NAWASENA.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {focuses.map((focus) => (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
              key={focus.title}
            >
              <div className="grid h-11 w-11 place-items-center rounded-md bg-rose-100 text-rose-700">
                <focus.icon size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                {focus.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {focus.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
