import { DeviceSummaryPanel } from './DeviceSummaryPanel';
import { FieldDevicesTable } from './FieldDevicesTable';
import { HarvestLossCard } from './HarvestLossCard';
import { MonitoringMap } from './MonitoringMap';
import { WeatherPanel } from './WeatherPanel';

export const SmartFarmingDashboard = () => {
  const handleRefreshWeather = () => undefined;

  return (
    <div className="bg-[#F7F8F3]">
      <section className="monitoring-map-section relative overflow-hidden bg-[#102A18]">
        <MonitoringMap fullBleed />

        <div className="z-[720] grid gap-3 px-4 py-4 sm:px-6 lg:absolute lg:right-8 lg:top-[106px] lg:w-[330px] lg:px-0 lg:py-0 xl:right-10 xl:w-[350px]">
          <WeatherPanel onRefresh={handleRefreshWeather} />
          <DeviceSummaryPanel />
        </div>
      </section>

      <section className="dashboard-bottom-section relative z-20 grid gap-4 border-t border-[rgba(31,65,38,0.08)] bg-[#FCFCF8] p-4 sm:p-5 lg:grid-cols-[minmax(280px,0.28fr)_minmax(0,0.72fr)]">
        <HarvestLossCard />
        <FieldDevicesTable />
      </section>
    </div>
  );
};
