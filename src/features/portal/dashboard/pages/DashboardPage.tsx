import {
  IconCalendarEvent,
  IconClipboardList,
  IconFileCheck,
  IconMapPin,
  IconMessageCircle,
  IconNews,
  IconPhone,
  IconUsers,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { DashboardCard } from '../components/Card';

const stats = [
  {
    title: 'Warga',
    value: '1.284',
    description: 'Penduduk yang tercatat dalam layanan desa.',
    icon: <IconUsers size={22} />,
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Layanan Publik',
    value: '18',
    description: 'Administrasi dan pengajuan untuk masyarakat.',
    icon: <IconClipboardList size={22} />,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Informasi',
    value: '42',
    description: 'Pengumuman dan kabar desa yang tersedia.',
    icon: <IconNews size={22} />,
    accent: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Agenda',
    value: '7',
    description: 'Kegiatan desa yang masuk jadwal bulan ini.',
    icon: <IconCalendarEvent size={22} />,
    accent: 'bg-rose-100 text-rose-700',
  },
];

const services = [
  {
    title: 'Surat keterangan',
    detail: 'Pengajuan surat domisili, usaha, dan keterangan umum.',
  },
  {
    title: 'Data kependudukan',
    detail: 'Informasi penduduk, keluarga, dan administrasi warga.',
  },
  {
    title: 'Aspirasi warga',
    detail: 'Saluran masukan untuk kebutuhan lingkungan desa.',
  },
];

export const DashboardPage = () => {
  return (
    <div>
      <section
        id="beranda"
        className="border-b border-neutral-200 bg-white px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Desa Karangtengah
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-neutral-950 sm:text-5xl">
              Informasi dan layanan warga dalam satu portal.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
              Akses layanan administrasi, agenda kegiatan, pengumuman, dan kanal
              kontak desa secara cepat.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                to="/berita"
              >
                <IconFileCheck size={18} />
                Lihat Berita
              </Link>
              <Link
                className="inline-flex h-11 items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
                to="/kontak"
              >
                <IconPhone size={18} />
                Kontak
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
            <div className="rounded-md bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-emerald-100 text-emerald-700">
                  <IconMapPin size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">
                    Lokasi pelayanan
                  </p>
                  <p className="mt-2 text-xl font-semibold text-neutral-950">
                    Kantor Desa Karangtengah
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border border-neutral-200 p-4">
                  <p className="text-neutral-500">Jam layanan</p>
                  <p className="mt-1 font-semibold text-neutral-950">
                    08.00 - 15.00
                  </p>
                </div>
                <div className="rounded-md border border-neutral-200 p-4">
                  <p className="text-neutral-500">Hari kerja</p>
                  <p className="mt-1 font-semibold text-neutral-950">
                    Senin - Jumat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section
        id="layanan"
        className="border-y border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-neutral-950">
              Layanan Warga
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Pilihan layanan utama untuk kebutuhan administrasi dan komunikasi
              warga.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
                key={service.title}
              >
                <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-emerald-700 shadow-sm">
                  <IconMessageCircle size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-neutral-950">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {service.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-950">
              Agenda Desa
            </h2>
            <div className="mt-5 divide-y divide-neutral-200">
              {[
                'Musyawarah warga',
                'Posyandu balita',
                'Kerja bakti lingkungan',
              ].map((agenda, index) => (
                <div className="flex items-center gap-4 py-4" key={agenda}>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-emerald-50 text-sm font-semibold text-emerald-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-950">{agenda}</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Terjadwal bulan ini
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article
            id="kontak"
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-neutral-950">
              Kontak Desa
            </h2>
            <div className="mt-5 space-y-4 text-sm text-neutral-700">
              <p className="flex items-center gap-3">
                <IconPhone size={18} className="text-emerald-700" />
                0812-0000-0000
              </p>
              <p className="flex items-center gap-3">
                <IconMapPin size={18} className="text-emerald-700" />
                Karangtengah, Indonesia
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
