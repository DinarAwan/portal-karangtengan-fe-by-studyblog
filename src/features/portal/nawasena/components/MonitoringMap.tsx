import { useEffect, useRef } from 'react';
import { IconMinus, IconPlus, IconTarget } from '@tabler/icons-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { mapConfig, robot } from '../data/monitoringMapData';

const createRobotIcon = (heading: number) =>
  L.divIcon({
    className: 'nawasena-device-icon',
    html: `
      <div class="nawasena-device-marker nawasena-device-marker-rover" style="transform: rotate(${heading}deg);">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 3l6 16-6-3-6 3 6-16Z" />
        </svg>
      </div>
    `,
    iconAnchor: [18, 18],
    iconSize: [36, 36],
    popupAnchor: [0, -18],
  });
const MAX_ZOOM = 19;
const createRobotTooltip = (heading: number, lat: number, lng: number) => `
  <div class="nawasena-map-tooltip">
    <strong>${robot.name}</strong>
    <div>Lat ${lat.toFixed(6)}, Lon ${lng.toFixed(6)}</div>
    <div>Heading ${heading}&deg;</div>
  </div>
`;

export const MonitoringMap = ({ fullBleed = false }: { fullBleed?: boolean }) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const robotMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      attributionControl: true,
      center: mapConfig.center,
      maxZoom: MAX_ZOOM,
      minZoom: 14,
      preferCanvas: true,
      scrollWheelZoom: false,
      zoom: mapConfig.zoom,
      zoomControl: false,
    });

    map.attributionControl.setPrefix('');
    mapRef.current = map;

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
        className: 'nawasena-satellite-tile',
        maxZoom: MAX_ZOOM,
      },
    ).addTo(map);

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
      {
        className: 'nawasena-label-tile',
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: MAX_ZOOM,
        opacity: 0.72,
        subdomains: 'abcd',
      },
    ).addTo(map);

    const robotMarker = L.marker(robot.position, {
      icon: createRobotIcon(robot.heading),
      title: robot.name,
    })
      .bindTooltip(createRobotTooltip(robot.heading, robot.latitude, robot.longitude), {
        className: 'nawasena-device-tooltip',
        direction: 'top',
        offset: [0, -16],
        opacity: 1,
        permanent: false,
      })
      .addTo(map);

    robotMarkerRef.current = robotMarker;

    return () => {
      map.remove();
      mapRef.current = null;
      robotMarkerRef.current = null;
    };
  }, []);

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

const handleFocusRobot = () => {
  mapRef.current?.flyTo(robot.position, MAX_ZOOM, {
    animate: true,
    duration: 0.6,
  });
};

  return (
    <div
      className={[
        'relative overflow-hidden bg-emerald-950 shadow-[0_24px_80px_rgba(15,23,42,0.14)]',
        fullBleed
          ? ''
          : 'rounded-[30px] border border-white/80',
      ].join(' ')}
    >
      <div
        aria-label="Peta posisi robot Karangtengah"
        className={[
          'nawasena-monitoring-map w-full',
          fullBleed
            ? 'h-[580px] sm:h-[620px] lg:h-[680px]'
            : 'h-[480px] md:h-[500px] xl:h-[500px]',
        ].join(' ')}
        ref={mapElementRef}
      />

      {/* <div className="pointer-events-none absolute inset-0 z-[500] bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.18))]" /> */}
      <div className="pointer-events-none absolute inset-0 z-[500] bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.18))]" />
      <div className="absolute left-4 top-1/2 z-[700] grid -translate-y-1/2 overflow-hidden rounded-full border border-white/20 bg-[#091612]/82 p-1 text-white shadow-[0_16px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:left-8">
        <button
          aria-label="Perbesar peta"
          className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/12"
          onClick={handleZoomIn}
          title="Perbesar"
          type="button"
        >
          <IconPlus size={20} stroke={1.8} />
        </button>
        <button
          aria-label="Perkecil peta"
          className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/12"
          onClick={handleZoomOut}
          title="Perkecil"
          type="button"
        >
          <IconMinus size={20} stroke={1.8} />
        </button>
        <button
          aria-label="Fokus ke posisi robot"
          className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/12"
          onClick={handleFocusRobot}
          title="Fokus ke robot"
          type="button"
        >
          <IconTarget size={20} stroke={1.8} />
        </button>
      </div>

      <div className="absolute bottom-5 left-4 z-[700] flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-4 rounded-full border border-white/18 bg-[#091612]/78 px-4 py-3 text-xs font-semibold text-white shadow-xl shadow-slate-950/25 backdrop-blur-xl sm:left-8">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-sky-400" />
          Posisi robot
        </span>
        <span>
          Lat {robot.latitude.toFixed(6)}, Lon {robot.longitude.toFixed(6)}
        </span>
        <span>Heading {robot.heading}&deg;</span>
      </div>
    </div>
  );
};