import base from '@framework/utils/baseUrl';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';
import { TableType } from '@framework/types';

interface IProps {
  restaurantId: unknown;
  tableId: unknown;
}

export async function fetchTable({ restaurantId, tableId }: IProps) {
  if (!restaurantId) throw Error('Invalid restaurant id.');
  if (!tableId) throw Error('Invalid table id.');

  const response = await base.get(
    `v2/restaurant/${restaurantId}/table/${tableId}`
  );
  return response.data.table as TableType;
}

export function useTableQuery() {
  const [activeRestaurant] = useLocalStorage('active_restaurant');
  const [activeTable] = useLocalStorage('active_table');

  return useQuery<TableType>([activeTable], () =>
    fetchTable({ restaurantId: activeRestaurant, tableId: activeTable })
  );
}
