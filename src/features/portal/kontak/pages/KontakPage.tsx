import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';

const contacts = [
  {
    label: 'Telepon',
    value: '0812-0000-0000',
    icon: IconPhone,
  },
  {
    label: 'Email',
    value: 'karangtengah@example.com',
    icon: IconMail,
  },
  {
    label: 'Alamat',
    value: 'Kantor Desa Karangtengah, Indonesia',
    icon: IconMapPin,
  },
];

export const KontakPage = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Kontak
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-950">
            Hubungi Desa Karangtengah
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Informasi kontak untuk kebutuhan pelayanan dan komunikasi warga.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {contacts.map((contact) => (
            <article
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
              key={contact.label}
            >
              <div className="grid h-11 w-11 place-items-center rounded-md bg-sky-100 text-sky-700">
                <contact.icon size={22} />
              </div>
              <p className="mt-4 text-sm font-medium text-neutral-600">
                {contact.label}
              </p>
              <p className="mt-2 font-semibold text-neutral-950">
                {contact.value}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
