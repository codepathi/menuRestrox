import Image from '@components/ui/image';
import defaultImage from 'public/assets/images/dashboard/dashboard-image.jpeg';
import classNames from 'classnames';

export const OrderStatus = ({ status }: { status: string }) => {
  const nStatus = status.toLocaleLowerCase().trim();

  return (
    <div className="pt-1">
      <span
        className={classNames(
          {
            'bg-yellow-500 text-white': nStatus === 'pending',
            'bg-red-500 text-white': nStatus === 'cancelled',
            'bg-green-600 text-white': nStatus === 'served',
          },
          'opacity-75 px-3 pt-[2px] pb-[5px] text-[12px] rounded-lg'
        )}
      >
        {status}
      </span>
    </div>
  );
};

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-skin-base text-[12px] md:text-[14px]">
      <div className="col-span-2 self-center">
        <Image
          src={item.displayImage ? item.displayImage : defaultImage}
          alt={item?.name || 'Product Image'}
          width="60"
          height="60"
          quality={100}
          className="object-cover"
        />
      </div>
      <div className="col-span-5 self-center ps-1 sm:ps-0">
        <h2 className="text-skin-base">{item.name}</h2>
        <OrderStatus status={`${item.status}`} />
      </div>
      <div className="col-span-3 self-center md:text-start text-center">
        {typeof item.quantity === 'number' && <p>{item.quantity}x</p>}
      </div>
      <div className="col-span-2 self-center">
        {<p>Rs. {item?.price * item.quantity}</p>}
      </div>
    </div>
  );
};
