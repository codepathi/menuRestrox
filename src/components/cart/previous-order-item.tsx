type PreviousOrderItemType = {
  openOrderDetails: (id: string) => void;
  data: any;
  tableName: string;
};

const PreviousOrderItem = ({
  openOrderDetails,
  data,
  tableName,
}: PreviousOrderItemType) => {
  // Function to get items' images
  const getImages = (): string[] => {
    if (!data) return [];

    const imageCntr: string[] = [];

    for (let index = 0; index < data.items.length; index++) {
      const element = data.items[index];

      if (imageCntr.length === 2) return imageCntr;

      if (element.displayImage) {
        imageCntr.push(element.displayImage);
      }
    }

    return imageCntr;
  };

  // Function to get ordered date

  const getOrderedDate = (): string => {
    if (!data.createdAt) return '';

    const date = new Date(data.createdAt);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Function to get total order count

  const getOrderedItemCount = (): number => {
    if (!data) return 0;
    return data.items.length;
  };

  return (
    <div
      className="bg-gray-50 py-2 px-4 rounded-md cursor-pointer"
      onClick={() => openOrderDetails(data._id)}
    >
      <h1 className="font-medium text-sm mt-2">Order {data?.orderId}</h1>
      <p className="text-xs p-0 m-0 mt-[3px]">
        Table: {data?.of?.table?.tableName}
      </p>
      <p className="p-0 m-0 mt-3" style={{ fontSize: '10px' }}>
        {getOrderedDate()}
      </p>

      <div className="mt-2">
        {!getImages()?.length && (
          <div className="bg-white float-left  h-[42px] w-[42px] ml-1">
            <img
              src={'/assets/images/dashboard/dashboard-image.jpeg'}
              alt="image"
              className="object-cover rounded-full h-[34px] w-[34px] m-1"
            />
          </div>
        )}

        {getImages()?.map((data, index) => {
          return (
            <div
              className=" bg-white float-left h-[42px] w-[42px]"
              key={`previourOrderItemImage${index}`}
            >
              <img
                src={data}
                alt="image"
                className="object-cover rounded-full h-[34px] w-[34px] m-1"
              />
            </div>
          );
        })}
        {getOrderedItemCount() > 2 ? (
          <div className="bg-white float-left  h-[42px] w-[42px] ml-1">
            <p className="h-[34px] w-[34px] m-1 text-center mt-[13px] text-xs">
              + {getOrderedItemCount() - 2}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default PreviousOrderItem;
