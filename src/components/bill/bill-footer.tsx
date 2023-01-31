interface IProps {
  subTotal: number;
}

function BillFooter({ subTotal }: IProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 px-2 mt-7">
        <div className="text-left">
          <p className="text-sm text-gray-400">Sub Total</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Rs. {subTotal.toFixed(2)}</p>
        </div>

        {/* <div className="text-left">
          <p className="text-sm text-gray-400">Service Charge (0%)</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Rs. 0</p>
        </div>

        <div className="text-left">
          <p className="text-sm text-gray-400">Discount (0%)</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Rs. 0</p>
        </div> */}

        <div className="mt-3 text-left">
          <p className="text-sm">GRAND TOTAL</p>
        </div>
        <div className="mt-3 text-right">
          <p className="text-sm">Rs. {subTotal.toFixed(2)}/-</p>
        </div>
      </div>

      <div className="pt-7">
        <p className="text-center text-xs">Thank You very much</p>
        <p className="text-center text-xs text-gray-400 mt-0">
          RestroX: Restaurant Operating System
        </p>
      </div>
    </div>
  );
}

export default BillFooter;
