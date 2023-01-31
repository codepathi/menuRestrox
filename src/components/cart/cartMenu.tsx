import Scrollbar from '@components/ui/scrollbar';
import { useCart } from '@contexts/cart/cart.context';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import cn from "classnames";
import PreviousOrder from './previous-order';
import { useUI } from '@contexts/ui.context';
import CartLayout from '@components/cart/cart-layout';
import { usePreviousOrderQuery } from '@framework/order/get-previos-order';
import {
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  Row,
  Spinner,
  Table,
} from "reactstrap";

type RedirectToPreviousOrderProps = {
  setActiveCartPage: (activePace: 'CART' | 'PREVIOUS_ORDER') => void;
  isCartEmpty: boolean;
  totalOrder: number;
};

const RedirectToPreviousOrder = ({
  setActiveCartPage,
  isCartEmpty,
  totalOrder,
}: RedirectToPreviousOrderProps) => {
  return (
    <div
      className={isCartEmpty ? `absolute top-10 w-full` : `w-full pt-3 pb-7`}
    >
      <div
        className="flex px-5 border rounded-md py-3 cursor-pointer"
        onClick={() => setActiveCartPage('PREVIOUS_ORDER')}
      >
        <div className="flex-grow">
          <h1 className="text-red-500 text-lg">
            Previous Order ({totalOrder | 0})
          </h1>
        </div>
        <div className="flex-none">
          <AiOutlineArrowRight className="mt-1 text-red-500 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default function CartMenu() {
  const { items, isEmpty } = useCart();
  const { closeDrawer, displayDrawer, data: cartData } = useUI();
  const [activeCartPage, setActiveCartPage] = useState<
    'CART' | 'PREVIOUS_ORDER'
  >('CART');
  const { data } = usePreviousOrderQuery();

//   useEffect(() => {
//     if (displayDrawer) {
//       if (cartData?.activePage === 'PREVIOUS_ORDER')
//         setActiveCartPage('PREVIOUS_ORDER');
//       else setActiveCartPage('CART');
//     }
//   }, [displayDrawer]);

//   if (activeCartPage === 'PREVIOUS_ORDER' || isEmpty) {
//     return <PreviousOrder setActiveCartPage={setActiveCartPage} />;
//   }

  return (
    <div >
<div
    //   isOpen="true"
      // toggle="true"
    //   direction="start"
      style={{ width: "100%", maxWidth: "500px"}}
    >
        
        <OffcanvasBody className="mt-2 pt-0" style={{ padding: "0 30px" }}>
        <b>Invoice</b>
          <div
            className="px-1 py-2"
            style={{ backgroundColor:"white"}}
          >
            <div>
              <h5 className="text-center fw-bold">"pathi resturant"</h5>
              <p className="text-center" style={{ fontSize: "0.8rem" }}>
                "lamachaur"
              </p>
            </div>
            <Container fluid>
              <Row>
                <Col xs={6} className="p-0">
                  <p className="fw-bold" style={{ fontSize: "0.8rem" }}>
                    Invoice id: ###
                  </p>
                </Col>
                <Col xs={6} className="p-0">
                  <p
                    className="text-end fw-bold"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Date: 
                  </p>
                </Col>
                <Col xs={6} className="p-0">
                  <p className="fw-bold" style={{ fontSize: "0.8rem" }}>
                    Bill by: 
                  </p>
                </Col>
                <Col xs={6} className="p-0" style={{ fontSize: "0.8rem" }}>
                  <p className="text-end fw-bold text-capitalize">
                  </p>
                </Col>
              </Row>
            </Container>
            <div>
              <Table className='tableBill'>
                <thead>
                  <tr>
                    <th>Particular</th>
                    <th>Rate</th>
                    <th>QTY</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                        <tr>
                          <th>
                            Momo
                          </th>
                          <td>
                            toasdf
                          </td>
                          <td>
                            asdfa
                          </td>
                          <td>
                            asdfadsf
                          </td>
                        </tr>
                        <tr>
                          <th>
                            Dalbhat
                          </th>
                          <td>
                            toasdf
                          </td>
                          <td>
                            asdfa
                          </td>
                          <td>
                            asdfadsf
                          </td>
                        </tr>
                </tbody>
              </Table>
            </div>

            <Container fluid className="mt-2">
              <Row>
                <Col xs={6} className="p-0">
                  <p className="fw-bold p-0 m-0" style={{ fontSize: "0.9rem" }}>
                    Subtotal
                  </p>
                </Col>
                <Col xs={6} className="p-0">
                  <p
                    className="text-end fw-bold p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Rs 5555
                  </p>
                </Col>

                <Col xs={6} className="p-0" style={{ marginTop: "5px" }}>
                  <p className="fw-bold p-0 m-0" style={{ fontSize: "0.9rem" }}>
                    Service Charge 
                  </p>
                </Col>
                <Col xs={6} className="p-0" style={{ marginTop: "5px" }}>
                  <p
                    className="text-end fw-bold p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Rs. 5555
                  </p>
                </Col>

                <Col xs={6} className="p-0" style={{ marginTop: "5px" }}>
                  <p className="fw-bold p-0 m-0" style={{ fontSize: "0.9rem" }}>
                    Discount
                  </p>
                </Col>
                <Col xs={6} className="p-0" style={{ marginTop: "5px" }}>
                  <p
                    className="text-end fw-bold p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Rs. 5555
                  </p>
                </Col>

                <Col xs={6} className="p-0 mt-1">
                  <p
                    className="fw-bolder p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    GRAND TOTAL
                  </p>
                </Col>
                <Col xs={6} className="p-0 mt-1" style={{ fontSize: "0.9rem" }}>
                  <p className="fw-bolder text-end p-0 m-0">
                    Rs. 5555
                  </p>
                </Col>
              </Row>
              <Row>
                <div className="d-flex mt-1 p-0">
                  <p className="p-0 m-0" style={{ fontSize: "0.9rem" }}>
                    Remarks:
                  </p>

                  <p className="p-0 m-0 px-1" style={{ fontSize: "0.9rem" }}>
      
                  </p>
                </div>
              </Row>
            </Container>

            <div className="mt-3">
              <p
                className="text-center fw-bolder p-0 m-0"
                style={{ fontSize: "0.9rem" }}
              >
                Thank you very much !
              </p>
              <p className="text-center p-0 m-0" style={{ fontSize: "0.7rem" }}>
                RestroX Restaurant Operating System
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-2">
            
          </div>
        </OffcanvasBody>
    </div>
    </div>
  );
}
