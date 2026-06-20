import { useEffect, useState } from 'react';
import { TextInput, Textarea, Button, Stack, Grid, Divider, NumberInput, ActionIcon } from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import type { VillageItem, VillagePayload, VillagePotency } from '../types/village';

type VillageProfileFormProps = {
  initialData: VillageItem;
  onSubmit: (payload: VillagePayload) => Promise<void>;
  isSubmitting: boolean;
};

export const VillageProfileForm = ({ initialData, onSubmit, isSubmitting }: VillageProfileFormProps) => {
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');
  const [description, setDescription] = useState('');
  const [population, setPopulation] = useState<number | ''>('');
  const [families, setFamilies] = useState<number | ''>('');
  const [areaHa, setAreaHa] = useState<number | ''>('');
  const [potency, setPotency] = useState<VillagePotency[]>([]);

  useEffect(() => {
    setVision(initialData.vision);
    setMission(initialData.mission);
    setDescription(initialData.description);
    setPopulation(initialData.stats.population);
    setFamilies(initialData.stats.families);
    setAreaHa(initialData.stats.area_ha);
    setPotency(initialData.potency || []);
  }, [initialData]);

  const handlePotencyChange = (index: number, field: keyof VillagePotency, value: string) => {
    const newPotency = [...potency];
    newPotency[index] = { ...newPotency[index], [field]: value };
    setPotency(newPotency);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vision,
      mission,
      description,
      stats: { population: Number(population), families: Number(families), area_ha: Number(areaHa) },
      potency,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <Stack gap="md">
        <Textarea label="Visi Desa" value={vision} onChange={(e) => setVision(e.target.value)} rows={2} required />
        <Textarea label="Misi Desa" value={mission} onChange={(e) => setMission(e.target.value)} rows={3} required />
        <Textarea label="Deskripsi Umum" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required />

        <Divider my="sm" label="Statistik Utama Desa" />
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <NumberInput label="Total Penduduk" value={population} onChange={(v) => setPopulation(Number(v))} min={0} required />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <NumberInput label="Total Kepala Keluarga (KK)" value={families} onChange={(v) => setFamilies(Number(v))} min={0} required />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <NumberInput label="Luas Wilayah (Ha)" value={areaHa} onChange={(v) => setAreaHa(Number(v))} min={0} required />
          </Grid.Col>
        </Grid>

        <Divider my="sm" label="Potensi Desa" />
        {potency.map((item, index) => (
          <div key={index} className="flex gap-3 items-start bg-neutral-50 p-3 rounded-md border border-neutral-200">
            <div className="flex-1 grid gap-3 md:grid-cols-2">
              <TextInput label="Judul Potensi" placeholder="Misal: Pertanian Padi" value={item.title} onChange={(e) => handlePotencyChange(index, 'title', e.target.value)} required />
              <TextInput label="Deskripsi Potensi" placeholder="Penjelasan singkat..." value={item.desc} onChange={(e) => handlePotencyChange(index, 'desc', e.target.value)} required />
            </div>
            <ActionIcon color="red" variant="subtle" mt={24} onClick={() => setPotency(potency.filter((_, i) => i !== index))}>
              <IconTrash size={18} />
            </ActionIcon>
          </div>
        ))}
        <Button variant="outline" color="emerald" size="xs" leftSection={<IconPlus size={16} />} onClick={() => setPotency([...potency, { title: '', desc: '' }])} className="w-fit">
          Tambah Potensi Baru
        </Button>

        <div className="flex justify-end mt-4 pt-4 border-t border-neutral-100">
          <Button type="submit" color="emerald.7" loading={isSubmitting} leftSection={<IconDeviceFloppy size={18} />}>
            Simpan Profil
          </Button>
        </div>
      </Stack>
    </form>
  );
};