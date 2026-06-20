import { useState } from 'react';
import { Modal, TextInput, Button, Group, Stack, FileInput, NumberInput } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

type GalleryModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (file: File, caption: string, orderIndex: number) => Promise<void>;
  isSubmitting: boolean;
};

export const GalleryModal = ({ opened, onClose, onSubmit, isSubmitting }: GalleryModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [orderIndex, setOrderIndex] = useState<number | ''>(0);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Silakan pilih file gambar terlebih dahulu.');
    await onSubmit(file, caption, Number(orderIndex));
    // Reset Form
    setFile(null); setCaption(''); setOrderIndex(0);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Tambah Foto Galeri" centered>
      <form onSubmit={handleFormSubmit}>
        <Stack gap="md">
          <FileInput label="Pilih Gambar" placeholder="Upload file dari komputer" leftSection={<IconPhoto size={16} />} value={file} onChange={setFile} accept="image/*" required />
          <TextInput label="Keterangan (Caption)" placeholder="Misal: Suasana panen padi..." value={caption} onChange={(e) => setCaption(e.target.value)} required />
          <NumberInput label="Urutan Tampil (Order Index)" placeholder="0" value={orderIndex} onChange={(v) => setOrderIndex(Number(v))} min={0} required />
          
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" color="gray" onClick={onClose} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" color="emerald.7" loading={isSubmitting}>Upload ke Galeri</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};