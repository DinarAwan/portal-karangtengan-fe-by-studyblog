import { Table, ActionIcon, Group, Badge } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { HarvestItem } from '../types/harvest';
import { formatDecimal, formatHarvestDate } from '../utils/formatHarvest';

type HarvestTableProps = {
  items: HarvestItem[];
  onDelete: (id: string) => void;
  onEdit: (item: HarvestItem) => void;
};

export const HarvestTable = ({ items, onDelete, onEdit }: HarvestTableProps) => {
  const rows = items.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <p className="font-medium text-neutral-900">{item.farmerName}</p>
        <p className="text-xs text-neutral-500">{item.padukuhan}</p>
      </Table.Td>
      <Table.Td>{formatHarvestDate(item.harvestDate)}</Table.Td>
      <Table.Td>
        <Badge color="teal" variant="light">{formatDecimal(item.ubinanKg)} Kg</Badge>
      </Table.Td>
      <Table.Td>{formatDecimal(item.areaHa)} Ha</Table.Td>
      <Table.Td>
        <Badge color="orange" variant="outline">{formatDecimal(item.yieldTonHa)} Ton/Ha</Badge>
      </Table.Td>
      <Table.Td className="font-semibold text-emerald-700">{formatDecimal(item.estimatedKg)} Kg</Table.Td>
      <Table.Td>
        <span className={item.pestLossPct > 15 ? 'text-red-600 font-medium' : 'text-neutral-600'}>
          {formatDecimal(item.pestLossPct)}%
        </span>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon variant="subtle" color="gray" onClick={() => onEdit(item)} title="Edit Laporan">
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => onDelete(item.id)} title="Hapus Laporan">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="overflow-x-auto">
      <Table striped highlightOnHover verticalSpacing="sm" minWidth={900}>
        <Table.Thead className="bg-neutral-50">
          <Table.Tr>
            <Table.Th>Nama Petani & Area</Table.Th>
            <Table.Th>Tgl Panen</Table.Th>
            <Table.Th>Ubinan</Table.Th>
            <Table.Th>Luas Lahan</Table.Th>
            <Table.Th>Hasil (Ton/Ha)</Table.Th>
            <Table.Th>Total Estimasi</Table.Th>
            <Table.Th>Kerugian Hama</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};