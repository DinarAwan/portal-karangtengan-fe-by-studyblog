import { useEffect, useState } from 'react';
import { Modal, TextInput, Textarea, Button, Group, Stack, FileInput } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import type { BeritaItem, BeritaPayload } from '../types/berita';

type BeritaModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: BeritaPayload, file: File | null) => Promise<void>;
  initialData?: BeritaItem | null;
  isSubmitting: boolean;
};

export const BeritaModal = ({
  opened,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: BeritaModalProps) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');
  
  // State untuk menampung file gambar
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setExcerpt(initialData.excerpt || '');
      setContent(initialData.content || '');
    } else {
      setTitle('');
      setExcerpt('');
      setContent('');
    }
    setContentError('');
    setCoverFile(null); // Reset file setiap modal dibuka
  }, [initialData, opened]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.length < 10) {
      setContentError('Isi konten berita minimal 10 karakter!');
      return;
    }

    // Kirim payload teks dan file gambarnya sekaligus
    await onSubmit(
      {
        title,
        content,
        excerpt: excerpt || undefined,
      },
      coverFile
    );
    
    onClose(); 
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Edit Berita' : 'Tambah Berita Baru'}
      size="lg"
      centered
      classNames={{
        header: 'border-b border-neutral-100 pb-4 mb-4',
        title: 'text-lg font-semibold text-neutral-900',
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <Stack gap="md">
          <TextInput
            label="Judul Berita"
            placeholder="Masukkan judul berita"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            size="sm"
          />

          {/* Komponen Input File dari Mantine */}
          <FileInput
            label="Upload Gambar Cover"
            placeholder="Pilih file gambar dari komputer (Opsional)"
            leftSection={<IconPhoto size={16} />}
            value={coverFile}
            onChange={setCoverFile}
            accept="image/*"
            clearable
            size="sm"
          />

          <Textarea
            label="Ringkasan Singkat (Excerpt)"
            placeholder="Tulis ringkasan berita untuk card halaman depan..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            size="sm"
          />

          <Textarea
            label="Isi Konten Berita"
            placeholder="Tulis isi berita secara lengkap di sini..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (e.target.value.length >= 10) setContentError('');
            }}
            error={contentError}
            required
            minRows={6}
            size="sm"
          />

          <Group justify="flex-end" mt="xl" className="border-t border-neutral-100 pt-4">
            <Button variant="subtle" color="gray" onClick={onClose} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" color="emerald.7" className="bg-emerald-700 hover:bg-emerald-800" loading={isSubmitting}>
              {initialData ? 'Simpan Perubahan' : 'Terbitkan Berita'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};