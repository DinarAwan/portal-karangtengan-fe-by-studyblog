import {
  IconChevronDown,
  IconCloud,
  IconDroplet,
  IconMapPin,
  IconRefresh,
  IconWind,
} from '@tabler/icons-react';

export const WeatherPanel = ({ onRefresh = () => undefined }: { onRefresh?: () => void }) => (
  <article className="rounded-[22px] border border-white/30 bg-white/16 p-4 text-white shadow-[0_16px_42px_rgba(0,0,0,0.18)] ring-1 ring-white/10 backdrop-blur-2xl">
    <div className="flex items-start gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/22 bg-white/18 text-white shadow-inner shadow-white/15">
        <IconCloud aria-hidden="true" size={24} stroke={1.7} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold leading-tight tracking-normal text-white">
            Area Karangtengah
          </h2>
          <IconChevronDown aria-hidden="true" className="text-white/62" size={15} />
        </div>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-white/76">
          <IconMapPin aria-hidden="true" size={13} />
          Imogiri, Bantul
        </p>
      </div>
    </div>

    <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_126px]">
      <div>
        <p className="text-4xl font-extrabold leading-none tracking-normal">
          28<span className="text-xl align-top">&deg;C</span>
        </p>
        <p className="mt-1.5 text-sm font-semibold text-white/76">Berawan</p>
      </div>

      <div className="grid gap-3 border-white/18 text-xs sm:border-l sm:pl-5">
        <div className="flex items-start gap-2.5">
          <IconDroplet aria-hidden="true" className="mt-0.5 text-white/82" size={17} stroke={1.8} />
          <div>
            <p className="font-bold leading-tight">78%</p>
            <p className="mt-1 text-white/66">Kelembapan</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <IconWind aria-hidden="true" className="mt-0.5 text-white/82" size={17} stroke={1.8} />
          <div>
            <p className="font-bold leading-tight">10 km/jam</p>
            <p className="mt-1 text-white/66">Angin</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/18 pt-3 text-[11px] text-white/68">
      <span className="h-2 w-2 rounded-full bg-[#1DBE75]" />
      Diperbarui
      <span className="font-semibold text-white">13:41 WIB</span>
      <button
        aria-label="Perbarui informasi cuaca"
        className="grid h-6 w-6 place-items-center rounded-full text-white/76 transition hover:bg-white/12 hover:text-white"
        onClick={onRefresh}
        type="button"
      >
        <IconRefresh size={13} stroke={1.8} />
      </button>
    </div>
  </article>
);
