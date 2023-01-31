import { useEffect, useState } from "react";
import { Download, Printer } from "react-feather";
import {
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import styles from "./previewBillModal.module.css";
import cn from "classnames";
import { useSkin } from "@hooks/useSkin";
import getIncomeApi from "@apicall/services/account/income/getIncomeApi";
import getRestaurantDataApi from "@apicall/services/restaurant/getRestaurantDataApi";
import downloadPrintIncomeInvoice from "@reusable/utils/downloadIncomeInvoice";

// Function to capitalized text
function capitalizeText(text) {
  let pscText = "";

  for (let index = 0; index < text.length; index++) {
    const element = text[index];
    if (
      index === 0 ||
      (pscText[pscText.length - 1] === " " && element !== " ")
    ) {
      pscText += element.toUpperCase();
    } else pscText += element;
  }

  return pscText;
}

// Function to get the local storage data of the restaurant
function getRestaurantData() {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
  } catch {
    return null;
  }
}

const PreviewBillModal = (props) => {
  const { skin } = useSkin();
  const { open, setOpen, billId } = props;
  const [bill, setBill] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [restName, setRestName] = useState("");
  const [restLocation, setRestLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load bill data
  useEffect(async () => {
    if (!billId) return;
    setIsLoading(true);
    const billResData = await getIncomeApi(billId);
    if (!billResData) return;
    setBill(billResData?.bill || null);

    const _subtotal = billResData?.bill?.items.reduce(
      (previousValue, data) => data.price * data.quantity + previousValue,
      0,
    );
    setSubtotal(_subtotal);

    if (!billResData?.bill?.serviceCharge || !_subtotal) {
      setIsLoading(false);
      return;
    }

    const _serviceCharge = (_subtotal * billResData.bill.serviceCharge) / 100;
    setServiceCharge(_serviceCharge);
    setIsLoading(false);
  }, [billId]);

  // Load restaurant data
  useEffect(async () => {
    const restaurantLocalData = getRestaurantData();
    if (!restaurantLocalData) return;
    const restaurantResData = await getRestaurantDataApi({
      restaurantId: restaurantLocalData?.activeRestaurant?._id,
      userId: restaurantLocalData?._id,
    });
    setRestName(restaurantResData?.restaurant?.name || "");
    setRestLocation(restaurantResData?.restaurant?.address || "");
  }, []);

  useEffect(() => {
    if (!open) setBill(null);
  }, [open]);

  // Toggle hander of the modal
  const toggleHandler = () => setOpen(!open);

  const downloadOrPrintBill = (isPrint = true) => {
    const orderItemList = Array.from(bill?.items || [], (item) => {
      return {
        itemName: item?.item?.name || "",
        quantity: item?.quantity,
        price: item?.price,
      };
    });

    // Let's print the bill
    downloadPrintIncomeInvoice({
      restaurantName: restName,
      address: restLocation,
      billId: bill?.billId || "",
      billBy: bill?.createdBy?.name || "",
      billTo: bill?.customer?.name ? `Bill to : ${bill.customer.name}` : "",
      name: `${capitalizeText(bill?.type || "")}: ${bill.of}`,
      orderList: orderItemList,
      subtotal: subtotal.toFixed(2),
      serviceCharge: bill?.serviceCharge ? serviceCharge.toFixed(2) : "0.00",
      serviceChargeInPersent: bill?.serviceCharge.toFixed(2) || 0,
      discount: bill?.discount?.amount.toFixed(2) || 0,
      grandTotal: bill?.totalAmount.toFixed(2) || 0,
      date: bill?.createdAt.split("T")[0],
      print: isPrint,
      remarks: [bill?.paymentRemarks || ""],
      fileName: `${bill?.billId || "bill"}-bill.pdf`,
    });
  };

  return (
    <Offcanvas
      isOpen={open}
      toggle={toggleHandler}
      direction="end"
      style={{ width: "100%", maxWidth: "500px" }}
    >
      {isLoading ? (
        <OffcanvasBody className="d-flex justify-content-center pt-2">
          <Spinner color="primary" />
        </OffcanvasBody>
      ) : (
        <OffcanvasBody className="mt-2 pt-0" style={{ padding: "0 30px" }}>
          <div
            className="px-1 py-2"
            style={{ backgroundColor: skin === "dark" ? "black" : "#f8f8f8" }}
          >
            <div>
              <h5 className="text-center fw-bold">{restName}</h5>
              <p className="text-center" style={{ fontSize: "0.8rem" }}>
                {restLocation}
              </p>
            </div>
            <Container fluid>
              <Row>
                <Col xs={6} className="p-0">
                  <p className="fw-bold" style={{ fontSize: "0.8rem" }}>
                    Invoice id: #{bill?.billId || ""}
                  </p>
                </Col>
                <Col xs={6} className="p-0">
                  <p
                    className="text-end fw-bold"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Date: {bill?.createdAt.split("T")[0]}
                  </p>
                </Col>
                <Col xs={6} className="p-0">
                  <p className="fw-bold" style={{ fontSize: "0.8rem" }}>
                    Bill by: {bill?.createdBy?.name || ""}
                  </p>
                </Col>
                <Col xs={6} className="p-0" style={{ fontSize: "0.8rem" }}>
                  <p className="text-end fw-bold text-capitalize">
                    {bill?.type}: {bill?.of}
                  </p>
                </Col>

                {bill?.customer?.name ? (
                  <Col xs={12} className="p-0" style={{ fontSize: "0.8rem" }}>
                    <p className="fw-bold text-capitalize">
                      Bill to: {bill?.customer?.name}
                    </p>
                  </Col>
                ) : null}
              </Row>
            </Container>
            <Container fluid className={cn("p-0 mt-2", styles.tableCntr)}>
              <Table responsive>
                <thead>
                  <tr>
                    <th style={{ fontSize: "0.7rem" }}>Particular</th>
                    <th style={{ fontSize: "0.7rem" }}>Rate</th>
                    <th style={{ fontSize: "0.7rem" }}>QTY</th>
                    <th style={{ fontSize: "0.7rem" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {bill?.items &&
                    bill.items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th style={{ fontSize: "0.8rem" }}>
                            {item?.item?.name}
                          </th>
                          <td style={{ fontSize: "0.8rem" }}>
                            Rs.{item?.price || 0}
                          </td>
                          <td style={{ fontSize: "0.8rem" }}>
                            {item?.quantity || ""}
                          </td>
                          <td style={{ fontSize: "0.8rem" }}>
                            Rs.{item.price * item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Container>

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
                    Rs {subtotal.toFixed(2)}
                  </p>
                </Col>

                <Col xs={6} className="p-0" style={{ marginTop: "5px" }}>
                  <p className="fw-bold p-0 m-0" style={{ fontSize: "0.9rem" }}>
                    Service Charge {`(${bill?.serviceCharge.toFixed(2) || 0}%)`}
                  </p>
                </Col>
                <Col xs={6} className="p-0" style={{ marginTop: "5px" }}>
                  <p
                    className="text-end fw-bold p-0 m-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Rs. {serviceCharge.toFixed(2)}
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
                    Rs. {bill?.discount?.amount.toFixed(2) || 0}
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
                    Rs. {bill?.totalAmount.toFixed(2) || 0}
                  </p>
                </Col>
              </Row>
              <Row>
                <div className="d-flex mt-1 p-0">
                  <p className="p-0 m-0" style={{ fontSize: "0.9rem" }}>
                    Remarks:
                  </p>

                  <p className="p-0 m-0 px-1" style={{ fontSize: "0.9rem" }}>
                    {bill?.paymentRemarks || ""}
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
            <Printer
              className={cn(styles.btn, "cursor-pointer")}
              onClick={() => downloadOrPrintBill()}
            />
            <Download
              className={cn(styles.btn, "ms-1 cursor-pointer")}
              onClick={() => downloadOrPrintBill(false)}
            />
          </div>
        </OffcanvasBody>
      )}
    </Offcanvas>
  );
};

export default PreviewBillModal;
