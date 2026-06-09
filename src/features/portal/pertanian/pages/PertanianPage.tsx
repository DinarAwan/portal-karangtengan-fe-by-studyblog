import { IconPlant2, IconTractor, IconWheat } from '@tabler/icons-react';

const programs = [
  {
    title: 'Pendampingan Kelompok Tani',
    description: 'Informasi kegiatan dan dukungan untuk kelompok tani desa.',
    icon: IconPlant2,
  },
  {
    title: 'Data Lahan Produktif',
    description: 'Ringkasan area pertanian dan komoditas unggulan desa.',
    icon: IconWheat,
  },
  {
    title: 'Sarana Produksi',
    description: 'Kebutuhan alat, pupuk, dan fasilitas produksi pertanian.',
    icon: IconTractor,
  },
];

export const PertanianPage = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Pertanian
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950">
            Informasi Pertanian
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Ruang informasi untuk potensi, program, dan kebutuhan sektor
            pertanian Karangtengah.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {programs.map((program) => (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
              key={program.title}
            >
              <div className="grid h-11 w-11 place-items-center rounded-md bg-lime-100 text-lime-700">
                <program.icon size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                {program.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {program.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
