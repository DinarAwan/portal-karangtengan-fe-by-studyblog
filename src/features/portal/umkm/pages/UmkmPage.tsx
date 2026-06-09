import {
  IconBuildingStore,
  IconShoppingBag,
  IconTrendingUp,
} from '@tabler/icons-react';

const umkmItems = [
  {
    title: 'Direktori UMKM',
    description: 'Daftar pelaku usaha lokal yang berada di wilayah desa.',
    icon: IconBuildingStore,
  },
  {
    title: 'Produk Unggulan',
    description: 'Produk warga yang dapat dipromosikan melalui portal desa.',
    icon: IconShoppingBag,
  },
  {
    title: 'Pengembangan Usaha',
    description: 'Informasi pendampingan, pelatihan, dan peluang pasar.',
    icon: IconTrendingUp,
  },
];

export const UmkmPage = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            UMKM
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950">
            UMKM Karangtengah
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Halaman untuk menampilkan potensi usaha dan produk lokal warga.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {umkmItems.map((item) => (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              <div className="grid h-11 w-11 place-items-center rounded-md bg-amber-100 text-amber-700">
                <item.icon size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {item.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
