import React from 'react';
import { useRestaurantQuery } from '@framework/restaurant/restaurant-details';
import { useTableQuery } from '@framework/table/table-details';

export const HeaderDashboardBanner: React.FC = () => {
  const { data: restaurantData } = useRestaurantQuery();
  const { data: tableData } = useTableQuery();

  return (
    <div>
      <h1 className="mt-3 font-semibold text-2xl text-gray-700">Welcome to</h1>
      <h1 className="mt-1 font-bold text-2xl text-gray-800">
        {restaurantData?.name},
      </h1>

      <p className="mt-5 text-sm">
        <span>You're at</span>
        <span className="text-black font-semibold">
          &nbsp;
          {tableData?.tableName}
        </span>
      </p>
    </div>
  );
};

export default HeaderDashboardBanner;
