import { useEffect, useRef, useState } from 'react';
import {
  IconLayersIntersect,
  IconMinus,
  IconPlus,
  IconTarget,
} from '@tabler/icons-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  devices,
  fieldPlots,
  heatPoints,
  mapConfig,
  roverPath,
  type FieldDevice,
  type FieldStatus,
} from '../data/monitoringMapData';

const plotFillByStatus: Record<FieldStatus, string> = {
  safe: '#18844E',
  warning: '#F4B526',
  risk: '#EF4141',
};

const plotStrokeByStatus: Record<FieldStatus, string> = {
  safe: 'rgba(220,255,231,0.90)',
  warning: 'rgba(255,205,76,0.95)',
  risk: 'rgba(255,210,210,0.95)',
};

const getDeviceMarkerClass = (device: FieldDevice) => {
  if (device.type === 'rover') {
    return 'nawasena-device-marker nawasena-device-marker-rover';
  }

  if (device.status === 'warning') {
    return 'nawasena-device-marker nawasena-device-marker-warning';
  }

  return 'nawasena-device-marker nawasena-device-marker-trap';
};

const createDeviceIcon = (device: FieldDevice) =>
  L.divIcon({
    className: 'nawasena-device-icon',
    html: `
      <div class="${getDeviceMarkerClass(device)}">
        ${
          device.type === 'rover'
            ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 15h10l2-4H5l2 4Z" /><path d="M9 11V8h6v3" /><path d="M9 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path d="M15 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>'
            : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 7v10" /><path d="M8.5 9.5h7" /><path d="M8 13h8" /><path d="M9 17h6" /><path d="M7 11 4.5 8.5" /><path d="M17 11l2.5-2.5" /><path d="M7 15l-2.5 2.5" /><path d="M17 15l2.5 2.5" /></svg>'
        }
      </div>
    `,
    iconAnchor: [18, 18],
    iconSize: [36, 36],
    popupAnchor: [0, -18],
  });

const createTooltip = (device: FieldDevice) => {
  if (device.type === 'rover') {
    return `
      <div class="nawasena-map-tooltip">
        <strong>${device.name}</strong>
        <div>${device.location}</div>
        <div>${device.statusLabel}</div>
      </div>
    `;
  }

  return `
    <div class="nawasena-map-tooltip">
      <strong>${device.name} ${device.statusLabel}</strong>
      <div>Baterai ${device.battery}%</div>
      <div>${device.detections ?? 0} Deteksi</div>
    </div>
  `;
};

export const MonitoringMap = ({ fullBleed = false }: { fullBleed?: boolean }) => {
  const [isReferenceLayerVisible, setIsReferenceLayerVisible] = useState(true);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const referenceLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      attributionControl: true,
      center: mapConfig.center,
      maxZoom: 18,
      minZoom: 14,
      preferCanvas: true,
      scrollWheelZoom: false,
      zoom: mapConfig.zoom,
      zoomControl: false,
    });

    map.attributionControl.setPrefix('');
    mapRef.current = map;

    L.tileLayer(
      'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
      {
        attribution: 'Sentinel-2 cloudless &copy; EOX IT Services GmbH',
        className: 'nawasena-satellite-tile',
        maxNativeZoom: 14,
        maxZoom: 18,
      },
    ).addTo(map);

    const referenceLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
      {
        className: 'nawasena-label-tile',
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 18,
        opacity: 0.72,
        subdomains: 'abcd',
      },
    );

    referenceLayer.addTo(map);
    referenceLayerRef.current = referenceLayer;

    fieldPlots.forEach((plot) => {
      const polygon = L.polygon(plot.coordinates, {
        color: plotStrokeByStatus[plot.status],
        dashArray: '8 7',
        fillColor: plotFillByStatus[plot.status],
        fillOpacity: plot.status === 'warning' ? 0.22 : 0.2,
        lineCap: 'round',
        lineJoin: 'round',
        opacity: 0.98,
        weight: 2,
      }).addTo(map);

      polygon.bindTooltip(
        `<strong>${plot.name}</strong><span class="nawasena-field-label-status-${plot.status}">${plot.statusLabel}</span>`,
        {
          className: 'nawasena-field-label',
          direction: 'center',
          permanent: true,
        },
      );
    });

    L.polyline(roverPath, {
      color: '#38bdf8',
      dashArray: '10 10',
      lineCap: 'round',
      opacity: 0.98,
      weight: 3.2,
    }).addTo(map);

    heatPoints.forEach((point) => {
      L.circle(point.position, {
        color: 'transparent',
        fillColor: point.color,
        fillOpacity: point.opacity,
        radius: point.radius,
        stroke: false,
      }).addTo(map);
    });

    devices.forEach((device) => {
      L.marker(device.position, {
        icon: createDeviceIcon(device),
        title: device.name,
      })
        .bindTooltip(createTooltip(device), {
          className: 'nawasena-device-tooltip',
          direction: 'top',
          offset: [0, -16],
          opacity: 1,
          permanent: false,
        })
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      referenceLayerRef.current = null;
    };
  }, []);

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleFocusField = () => {
    const bounds = L.latLngBounds(fieldPlots.flatMap((plot) => plot.coordinates));
    mapRef.current?.fitBounds(bounds, {
      animate: true,
      padding: [36, 36],
    });
  };

  const handleToggleLayer = () => {
    const map = mapRef.current;
    const referenceLayer = referenceLayerRef.current;

    if (!map || !referenceLayer) {
      return;
    }

    if (map.hasLayer(referenceLayer)) {
      map.removeLayer(referenceLayer);
      setIsReferenceLayerVisible(false);
      return;
    }

    referenceLayer.addTo(map);
    setIsReferenceLayerVisible(true);
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
        aria-label="Peta monitoring sawah Karangtengah"
        className={[
          'nawasena-monitoring-map w-full',
          fullBleed
            ? 'h-[580px] sm:h-[620px] lg:h-[680px]'
            : 'h-[480px] md:h-[500px] xl:h-[500px]',
        ].join(' ')}
        ref={mapElementRef}
      />

      <div className="pointer-events-none absolute inset-0 z-[500] bg-[linear-gradient(180deg,rgba(8,25,14,0.10),rgba(5,20,12,0.20))]" />

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
          aria-label="Fokus area petak sawah"
          className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/12"
          onClick={handleFocusField}
          title="Fokus area"
          type="button"
        >
          <IconTarget size={20} stroke={1.8} />
        </button>
        <button
          aria-label="Ganti layer referensi peta"
          className={[
            'grid h-11 w-11 place-items-center rounded-full transition hover:bg-white/12',
            isReferenceLayerVisible ? 'bg-white/8' : '',
          ].join(' ')}
          onClick={handleToggleLayer}
          title="Ganti layer"
          type="button"
        >
          <IconLayersIntersect size={20} stroke={1.8} />
        </button>
      </div>

      <div className="absolute bottom-5 left-4 z-[700] flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-4 rounded-full border border-white/18 bg-[#091612]/78 px-4 py-3 text-xs font-semibold text-white shadow-xl shadow-slate-950/25 backdrop-blur-xl sm:left-8">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-emerald-400" />
          Perangkap
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-sky-400" />
          Rover
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-emerald-300/70" />
          Area Aman
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-yellow-400" />
          Waspada
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-red-500" />
          Risiko Tinggi
        </span>
      </div>
    </div>
  );
};
