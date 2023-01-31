interface BillTableProps {
  orderData: any[];
  className?: string;
}

interface TableRowProps {
  singleOrder: any;
  orderNumber: string | number;
}

function TableRow({ singleOrder, orderNumber }: TableRowProps) {
  return (
    <>
      <tr>
        <td colSpan={4} className=" p-2 font-semibold text-xs md:text-s py-2">
          Order: #{orderNumber}
        </td>
      </tr>
      {singleOrder.map((orderItem: any) => {
        if (orderItem.status === 'cancelled') return null;
        return (
          <tr key={orderItem._id}>
            <td className="p-2 text-xs md:text-sm">{orderItem.name}</td>
            <td className="p-2 text-xs md:text-sm">
              {orderItem.price.toFixed(2) || 0}
            </td>
            <td className="p-2 pl-5 text-xs md:text-sm">
              {orderItem.quantity}
            </td>
            <td className="p-2 text-xs md:text-sm">
              {(orderItem.price * orderItem.quantity).toFixed(2)}
            </td>
          </tr>
        );
      })}
    </>
  );
}

function BillTable({ className = '', orderData = [] }: BillTableProps) {
  return (
    <div className="border-b pb-4">
      <table className={`w-full ${className}`}>
        <thead className="border-t border-dashed">
          <tr className="text-start">
            <th className="text-sm font-semibold text-gray-400 p-2">
              Particular
            </th>
            <th className="text-sm font-semibold text-gray-400 p-2">Rate</th>
            <th className="text-sm font-semibold text-gray-400 p-2">QTY</th>
            <th className="text-sm font-semibold text-gray-400 p-2">
              Sub Total
            </th>
          </tr>
        </thead>
        <tbody className="border-t">
          {orderData.map((order, index) => {
            return (
              <TableRow
                singleOrder={order.items}
                orderNumber={order.orderId}
                key={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BillTable;
