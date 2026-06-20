import { useEffect, useState } from 'react';
import { Modal, TextInput, Select, Button, Group, Stack, NumberInput, Grid } from '@mantine/core';
import type { HarvestItem, HarvestPayload } from '../types/harvest';

type HarvestModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: HarvestPayload) => Promise<void>;
  initialData?: HarvestItem | null;
  isSubmitting: boolean;
};

export const HarvestModal = ({ opened, onClose, onSubmit, initialData, isSubmitting }: HarvestModalProps) => {
  const [farmerName, setFarmerName] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [padukuhan, setPadukuhan] = useState('Karangtengah');
  const [harvestDate, setHarvestDate] = useState('');
  const [ubinanKg, setUbinanKg] = useState<number | ''>('');
  const [areaHa, setAreaHa] = useState<number | ''>('');
  const [pestLossPct, setPestLossPct] = useState<number | ''>('');
  const [scheduleId, setScheduleId] = useState('');

  useEffect(() => {
    if (initialData) {
      setFarmerName(initialData.farmerName);
      setFieldName(initialData.fieldName || '');
      setPadukuhan(initialData.padukuhan);
      setHarvestDate(initialData.harvestDate.slice(0, 10)); // Potong ISO datetime jadi YYYY-MM-DD
      setUbinanKg(initialData.ubinanKg);
      setAreaHa(initialData.areaHa);
      setPestLossPct(initialData.pestLossPct);
      setScheduleId(initialData.scheduleId || '');
    } else {
      setFarmerName('');
      setFieldName('');
      setPadukuhan('Karangtengah');
      setHarvestDate('');
      setUbinanKg('');
      setAreaHa('');
      setPestLossPct('');
      setScheduleId('');
    }
  }, [initialData, opened]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      farmerName,
      fieldName: fieldName || undefined,
      padukuhan,
      harvestDate,
      ubinanKg: Number(ubinanKg),
      areaHa: Number(areaHa),
      pestLossPct: Number(pestLossPct),
      scheduleId: scheduleId || undefined,
    });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={initialData ? 'Edit Data Panen' : 'Input Data Panen Baru'} size="lg" centered>
      <form onSubmit={handleFormSubmit}>
        <Stack gap="md">
          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput label="Nama Petani" placeholder="Misal: Bu Wati" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} required />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select label="Padukuhan" data={['Karangtengah', 'Sompok', 'Numpukan', 'Mojolegi']} value={padukuhan} onChange={(val) => setPadukuhan(val || 'Karangtengah')} required />
            </Grid.Col>
          </Grid>

          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput label="Nama Lahan / Sawah" placeholder="Misal: Sawah Blok A (Opsional)" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput type="date" label="Tanggal Panen" value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} required />
            </Grid.Col>
          </Grid>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 mt-2">
            <p className="text-sm font-semibold text-amber-800 mb-3">Data Pengukuran (Angka)</p>
            <Grid gutter="sm">
              <Grid.Col span={4}>
                <NumberInput label="Ubinan (Kg)" placeholder="Misal: 5.2" value={ubinanKg} onChange={(val) => setUbinanKg(Number(val))} min={0} decimalScale={2} required />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput label="Luas Lahan (Ha)" placeholder="Misal: 0.3" value={areaHa} onChange={(val) => setAreaHa(Number(val))} min={0} decimalScale={3} step={0.1} required />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput label="Kerugian Hama (%)" placeholder="Misal: 10" value={pestLossPct} onChange={(val) => setPestLossPct(Number(val))} min={0} max={100} decimalScale={1} required />
              </Grid.Col>
            </Grid>
          </div>

          <TextInput label="ID Jadwal Rujukan (Opsional)" placeholder="Masukkan UUID jika data ini merujuk ke jadwal tertentu" value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} size="xs" />

          <Group justify="flex-end" mt="md" className="border-t border-neutral-100 pt-4">
            <Button variant="subtle" color="gray" onClick={onClose} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" color="emerald.7" loading={isSubmitting}>{initialData ? 'Simpan Perubahan' : 'Simpan Data Panen'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};