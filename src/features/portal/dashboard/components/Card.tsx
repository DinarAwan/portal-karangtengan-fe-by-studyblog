import type { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  accent: string;
};

export const DashboardCard = ({
  title,
  value,
  description,
  icon,
  accent,
}: DashboardCardProps) => {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-neutral-950">{value}</p>
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-md ${accent}`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-600">{description}</p>
    </article>
  );
};
