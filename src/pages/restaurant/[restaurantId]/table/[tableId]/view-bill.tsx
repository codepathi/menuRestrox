import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import SectionHeader from '@components/common/section-header';
import { usePreviousOrderQuery } from '@framework/order/get-previos-order';
import { useEffect, useState } from 'react';
import BillFooter from '@components/bill/bill-footer';
import BillHeader from '@components/bill/bill-header';
import BillTable from '@components/bill/bill-table';
import { useRestaurantQuery } from '@framework/restaurant/restaurant-details';
import downloadBill from '@utils/download-bill';
import { BsDownload } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';

interface NormalizedBillProps {
  data: any[];
  restaurantName: string;
  address: string;
  subTotal: number;
}

// Function to calculation sub total amount

function calculateSubTotal(orderData: any) {
  let subTotal = 0;

  orderData &&
    orderData.forEach((order: any) => {
      let singleOrderAmount = 0;
      order.items.forEach((orderItem: any) => {
        if (orderItem.status !== 'cancelled') {
          singleOrderAmount += orderItem.price * orderItem.quantity;
        }
      });
      subTotal += singleOrderAmount;
    });

  return subTotal;
}

// Data preparation for download bill

function getNormalizedBillData({
  data,
  restaurantName,
  address,
  subTotal,
}: NormalizedBillProps) {
  const date = new Date();
  const normalizedData = [];

  // Adding restaurant name

  normalizedData.push({
    text: restaurantName,
    fontSize: 15,
    bold: true,
    alignment: 'center',
  });

  // Adding address

  normalizedData.push({
    text: address,
    fontSize: 11,
    alignment: 'center',
    margin: [0, 10, 0, 0],
  });

  // Let's add column

  normalizedData.push({
    margin: [0, 20, 0, 0],
    columns: [
      {
        width: '50%',
        text: 'Invloice id: ###',
        color: '#323333',
      },
      {
        width: '50%',
        text: `Date: ${date.toISOString().split('T')[0]}`,
        alignment: 'right',
        color: '#323333',
      },
    ],
  });

  // Let's add table data

  const billTableBody: any[] = [
    [
      { text: 'Particular' },
      { text: 'Rate' },
      { text: 'Quantity' },
      { text: 'Sub Total' },
    ],
  ];

  data.forEach((order) => {
    billTableBody.push([
      { text: `Order: #${order?.orderId || ''}`, bold: true, fontSize: 14 },
      '',
      '',
      '',
    ]);

    order.items.forEach((item: any) => {
      billTableBody.push([
        { text: item?.name || '' },
        { text: item?.price || '' },
        { text: item?.quantity || '' },
        { text: (item.price * item.quantity).toFixed(2) },
      ]);
    });
  });

  normalizedData.push({
    layout: 'headerLineOnly',
    margin: [0, 10, 0, 10],
    table: {
      headerRows: 1,
      widths: ['*', 100, 100, 100],

      body: billTableBody,
    },
  });

  // Let's add sub total, service charge discount

  normalizedData.push({
    margin: [0, 5, 0, 0],
    columns: [
      {
        width: '50%',
        text: 'Sub Total',
      },
      {
        width: '50%',
        text: subTotal.toFixed(2),
        alignment: 'right',
      },
    ],
  });

  // normalizedData.push({
  //   margin: [0, 5, 0, 0],
  //   columns: [
  //     {
  //       width: '50%',
  //       text: 'Service Charge',
  //     },
  //     {
  //       width: '50%',
  //       text: 'Pending',
  //       alignment: 'right',
  //     },
  //   ],
  // });

  // normalizedData.push({
  //   margin: [0, 10, 0, 0],
  //   columns: [
  //     {
  //       width: '50%',
  //       text: 'Discount',
  //     },
  //     {
  //       width: '50%',
  //       text: 'Pending',
  //       alignment: 'right',
  //     },
  //   ],
  // });

  normalizedData.push({
    margin: [0, 10, 0, 0],
    columns: [
      {
        width: '50%',
        text: 'GRAND TOTAL',
      },
      {
        width: '50%',
        text: subTotal.toFixed(2),
        alignment: 'right',
      },
    ],
  });

  normalizedData.push(
    {
      margin: [0, 30, 0, 0],
      text: 'Thank You very much',
      alignment: 'center',
      color: '#323333',
    },
    {
      margin: [0, 20, 0, 0],
      text: 'RestroX: Restaurant Operating System',
      alignment: 'center',
      color: '#a8a8a8',
    }
  );
  return normalizedData;
}

function ViewBill() {
  const { data, isLoading } = usePreviousOrderQuery();
  const [subTotal, setSubTotal] = useState(0);
  const { data: resData, isLoading: isResDataLoading } = useRestaurantQuery();

  useEffect(() => {
    if (data) setSubTotal(calculateSubTotal(data?.orders || []));
  }, [data]);

  // Download pd file handler

  function downLoadPDFHandler() {
    const normalizedData = getNormalizedBillData({
      data: data?.orders || [],
      restaurantName: resData?.name || '',
      address: resData?.address || '',
      subTotal: subTotal,
    });

    downloadBill(normalizedData);
  }

  if (isLoading || isResDataLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout displaySearchIcon={true}>
      <Container className="pb-16 mb-[50px]">
        {data?.orders?.length ? (
          <>
            <div className="px-3 max-w-[1100px] mx-auto">
              <div className="pt-7 pb-7 mt-5 shadow-card">
                <SectionHeader
                  sectionHeading={resData?.name}
                  sectionSubHeading={resData?.address || ''}
                  className="select-none"
                />
                <BillHeader />
                <BillTable orderData={data?.orders || []} className="mt-7" />
                <BillFooter subTotal={subTotal} />
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <BsDownload
                className="text-2xl cursor-pointer"
                onClick={downLoadPDFHandler}
              />
            </div>
          </>
        ) : (
          <div className="">
            <div className="flex h-[73vh] justify-center items-center">
              <div>
                <div className="flex justify-center">
                  <FiAlertCircle size={40} color="#FACCA5" />
                </div>
                <p className="text-center mt-2">
                  There is no bill on this table
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}

export default ViewBill;
