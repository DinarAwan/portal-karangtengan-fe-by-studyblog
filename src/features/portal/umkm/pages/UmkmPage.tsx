import { Link } from 'react-router-dom';
import {
  IconArrowRight,
  IconBuildingStore,
  IconLeaf,
  IconPackage,
  IconPlant2,
  IconShoppingBag,
  IconUsers,
} from '@tabler/icons-react';

import umkmBannerImage from '../../../../assets/umkm-banner-karangtengah.png';

const categories = [
  {
    label: 'Makanan ringan',
    description: 'Camilan dan olahan pangan warga.',
    icon: IconPackage,
    color: 'bg-[#F8CD24]/16 text-[#27441d]',
  },
  {
    label: 'Minuman herbal',
    description: 'Jamu, wedang, dan minuman sehat.',
    icon: IconLeaf,
    color: 'bg-[#72b841]/14 text-[#3D7A22]',
  },
  {
    label: 'Kerajinan',
    description: 'Anyaman, bambu, dan karya rumahan.',
    icon: IconBuildingStore,
    color: 'bg-[#72b841]/10 text-[#0F6B35]',
  },
  {
    label: 'Fashion lokal',
    description: 'Batik, jahit, dan produk sandang.',
    icon: IconShoppingBag,
    color: 'bg-[#1A3A68]/10 text-[#1A3A68]',
  },
  {
    label: 'Hasil tani',
    description: 'Produk segar dan olahan pertanian.',
    icon: IconPlant2,
    color: 'bg-[#72b841]/16 text-[#2F6D18]',
  },
  {
    label: 'Jasa rumahan',
    description: 'Layanan warga dan usaha keluarga.',
    icon: IconUsers,
    color: 'bg-[#F8F9FA] text-[#555555]',
  },
];

const products = [
  {
    name: 'Keripik Singkong Karangtengah',
    owner: 'Rumah Cemilan Lestari',
    category: 'Makanan ringan',
    price: 'Rp25.000',
    badge: 'Terlaris',
    imagePosition: '44% center',
  },
  {
    name: 'Kopi Robusta Bukit Imogiri',
    owner: 'Kopi Bukit Lestari',
    category: 'Minuman',
    price: 'Rp55.000',
    badge: 'Favorit',
    imagePosition: '55% center',
  },
  {
    name: 'Madu Hutan Lokal',
    owner: 'Madu Alam Desa',
    category: 'Pangan lokal',
    price: 'Rp85.000',
    badge: 'Baru',
    imagePosition: '70% center',
  },
  {
    name: 'Batik Motif Sawah',
    owner: 'Batik Tangan Desa',
    category: 'Fashion lokal',
    price: 'Rp150.000',
    badge: 'Stok tersedia',
    imagePosition: '64% bottom',
  },
  {
    name: 'Jamu Kunyit Asam',
    owner: 'Sehat Alami Desa',
    category: 'Minuman herbal',
    price: 'Rp20.000',
    badge: 'Baru',
    imagePosition: '83% center',
  },
  {
    name: 'Anyaman Bambu',
    owner: 'Karya Bambu Desa',
    category: 'Kerajinan',
    price: 'Rp45.000',
    badge: 'Stok tersedia',
    imagePosition: '94% center',
  },
];

export const UmkmPage = () => {
  return (
    <div className="bg-white text-[#212529]">
      <section className="relative min-h-[690px] overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:min-h-[760px] lg:px-8 lg:pt-40">
        <img
          alt="Banner produk UMKM Desa Karang Tengah"
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={umkmBannerImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.76)_34%,rgba(255,255,255,0.16)_62%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_100%)]" />

        <div className="relative mx-auto flex min-h-[500px] max-w-[1440px] items-center lg:min-h-[560px]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#72b841]/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2F6D18]">
              <IconLeaf size={16} stroke={1.8} />
              Bangga produk desa
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-[0.2px] text-[#12351F] sm:text-5xl lg:text-[64px] lg:leading-[1.06]">
              Produk lokal desa, kualitas naik kelas.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#555555] sm:text-base">
              Etalase produk warga Desa Karang Tengah, Imogiri, Bantul:
              makanan ringan, minuman herbal, hasil tani, batik, dan kerajinan
              rumahan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F6B35] px-5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(15,107,53,0.22)] transition hover:bg-[#0B5B2D]"
                href="#produk-umkm"
              >
                <IconShoppingBag size={18} />
                Lihat produk
              </a>
              <Link
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#0F6B35]/20 bg-white/82 px-5 text-sm font-semibold text-[#0F6B35] shadow-[0_8px_22px_rgba(16,23,8,0.08)] backdrop-blur transition hover:border-[#0F6B35]/38 hover:bg-white"
                to="/kontak"
              >
                <IconBuildingStore size={18} />
                Daftarkan UMKM
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#72b841]">
                Kategori pilihan
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-[#212529] sm:text-3xl">
                Pilih jenis produk UMKM Karangtengah.
              </h2>
            </div>
            <Link
              className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#F8CD24] px-4 text-sm font-semibold text-[#101708] transition hover:bg-[#E6B800]"
              to="/kontak"
            >
              Kontak pengelola
              <IconArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <article
                className="min-h-[150px] rounded-[16px] border border-[#EFEFEF] bg-white p-5 shadow-[0_6px_18px_rgba(16,23,8,0.06)]"
                key={category.label}
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-full ${category.color}`}
                >
                  <category.icon size={23} stroke={1.7} />
                </div>
                <h3 className="mt-4 text-base font-bold leading-tight text-[#212529]">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#6C757D]">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-4 py-10 sm:px-6 lg:px-8"
        id="produk-umkm"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#72b841]">
                Produk unggulan
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#212529] sm:text-4xl">
                Etalase produk lokal desa.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#6C757D]">
              Data produk ini masih contoh awal untuk tampilan. Nanti bisa
              diganti dengan produk, foto, harga, dan nomor kontak UMKM asli.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                className="group overflow-hidden rounded-[16px] border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(16,23,8,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(16,23,8,0.14)]"
                key={product.name}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F9FA]">
                  <img
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={umkmBannerImage}
                    style={{ objectPosition: product.imagePosition }}
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-[#0F6B35] px-3 py-1 text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(16,23,8,0.18)]">
                    {product.badge}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#72b841]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-[#212529]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#6C757D]">
                    {product.owner}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-lg font-extrabold text-[#0F6B35]">
                      {product.price}
                    </p>
                    <Link
                      aria-label={`Tanyakan ${product.name}`}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#0F6B35]/18 bg-[#0F6B35]/8 px-4 text-sm font-semibold text-[#0F6B35] transition hover:bg-[#0F6B35] hover:text-white"
                      to="/kontak"
                    >
                      Detail
                      <IconArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
