import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaArrowLeft, FaSearch, FaShoppingCart, FaTrash } from "react-icons/fa";
import images from "../../assets/images";
import requests from "../../utils/requests";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const WALLET_URL = "Wallet/getwalletbyusername";
const CART_CHECKOUT_URL = "Cart/checkout";
const MOMO_URL = "Momo/create-payment-wallet";
const VNPAY_URL = "Vnpay/payment";
const PAYPAL_URL = "PayPal/checkout-payment";
const REMOVE_COURSE_URL = "Cart/remove";

export default function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const fetchCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    return savedCart.map((item) => ({
      ...item,
      selected: false,
    }));
  };

  const [cartItems, setCartItems] = useState(fetchCartItems());
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const getWallet = async () => {
    try {
      const response = await requests.get(WALLET_URL);
      if (response.data) {
        // setWalletBalance(response.data[0].balance);
        setWalletBalance(100);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    getWallet();
  }, [walletBalance]);

  const totalPrice = cartItems.reduce((sum, item) => {
    const discountedPrice =
      item.course.discount > 0
        ? item.course.price - (item.course.price * item.course.discount) / 100
        : item.course.price;
    return sum + discountedPrice;
  }, 0);

  const deleteCourse = async (id) => {
    try {
      handleDelete(id);
      await requests.delete(`${REMOVE_COURSE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.course.courseId !== id
    );

    setCartItems(updatedCartItems);

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));

    setSelectedCourses(
      selectedCourses.filter((item) => item.course.courseId !== id)
    );

    if (updatedCartItems.length === 0) {
      setSelectAll(false);
    }
  };

  const handleCheckout = async () => {
    if (totalPrice <= walletBalance) {
      setIsProcessingPayment(true);
      try {
        const checkoutParams = {
          referralCode: "",
        };
        const checkoutResponse = await requests.post(
          CART_CHECKOUT_URL,
          checkoutParams
        );
        console.log(checkoutResponse);
        
        // if (checkoutResponse.status === 200) {
          getWallet();
          localStorage.removeItem("cart");
          setCartItems([]);
          setIsProcessingPayment(false);
        // } else {
        //   alert("Checkout failed. Please try again.");
        //   setIsProcessingPayment(false);
        // }
      } catch (error) {
        console.error("Payment error:", error);
        alert("An error occurred during payment. Please try again.");
        setIsProcessingPayment(false);
      }
    } else {
      setShowModal(true);
      setSelectedPaymentMethod(null);
    }
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const checkoutParams = {
        referralCode: "",
      };
      const checkoutResponse = await requests.post(
        CART_CHECKOUT_URL,
        checkoutParams
      );

      if (checkoutResponse.status === 200) {
        const orderId = checkoutResponse.data.orderId;

        if (selectedPaymentMethod === "Wallet") {
          localStorage.removeItem("cart");
          getWallet();
          setIsProcessingPayment(false);
          return;
        }

        await redirectSandbox(selectedPaymentMethod, orderId, totalPrice);
      } else {
        alert("Checkout failed. Please try again.");
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const redirectSandbox = async (
    selectedPaymentMethod,
    orderId,
    totalPrice
  ) => {
    try {
      let redirectUrl = "";

      const paramsMomo = {
        amount: totalPrice,
        orderId: orderId.toString(),
        paymentType: "Wallet",
        methodPayment: "payWithATM",
      };

      const paramsVnpay = {
        amount: totalPrice,
        orderType: "paynow",
        orderId: orderId,
      };

      const paramsPayPal = new FormData();
      paramsPayPal.append("orderId", orderId);
      paramsPayPal.append("ReferralCode", "");
      console.log(orderId);

      switch (selectedPaymentMethod) {
        case "Momo":
          setIsProcessingPayment(true);
          const momoResponse = await requests.post(MOMO_URL, paramsMomo);
          console.log(momoResponse);
          if (momoResponse || momoResponse.status === 200) {
            redirectUrl = momoResponse.data.payUrl;
          } else {
            throw new Error("Failed to retrieve Momo payment URL");
          }
          break;

        case "VNPay":
          setIsProcessingPayment(true);
          const vnpayResponse = await requests.post(VNPAY_URL, paramsVnpay);
          if (vnpayResponse || vnpayResponse.data.status === 200) {
            redirectUrl = vnpayResponse.data.paymentUrl.result;
          } else {
            throw new Error("Failed to retrieve VNPay payment URL");
          }
          break;

        case "PayPal":
          setIsProcessingPayment(true);
          const paypalResponse = await requests.post(PAYPAL_URL, paramsPayPal, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (paypalResponse || paypalResponse.status === 200) {
            redirectUrl = paypalResponse.data.approvalUrl;
          } else {
            throw new Error("Failed to retrieve PayPal payment URL");
          }
          break;

        case "Wallet":
          getWallet();
          setIsProcessingPayment(false);
          break;

        default:
          return;
      }

      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error(`${selectedPaymentMethod} payment error:`, error);
      setIsProcessingPayment(false);
    }
  };

  const renderPaymentModal = () => (
    <Modal
      show={showModal}
      onHide={() => {
        if (!isProcessingPayment) {
          setShowModal(false);
        }
      }}
      centered
    >
      <Modal.Header closeButton={!isProcessingPayment}>
        <Modal.Title>Select Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className="payment-summary mb-3 text-center">
            <p>
              <strong>Total Amount:</strong> ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="payment-methods d-flex justify-content-between">
            <div
              className={`payment-method text-center ${
                selectedPaymentMethod === "Momo" ? "selected" : ""
              }`}
              onClick={() => setSelectedPaymentMethod("Momo")}
              style={{
                cursor: "pointer",
                border:
                  selectedPaymentMethod === "Momo"
                    ? "2px solid blue"
                    : "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "110px",
                height: "120px",
              }}
            >
              <img
                src={images.momo}
                alt="Momo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
              <p>Momo</p>
            </div>

            <div
              className={`payment-method text-center ${
                selectedPaymentMethod === "VNPay" ? "selected" : ""
              }`}
              onClick={() => setSelectedPaymentMethod("VNPay")}
              style={{
                cursor: "pointer",
                border:
                  selectedPaymentMethod === "VNPay"
                    ? "2px solid blue"
                    : "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "110px",
                height: "120px",
              }}
            >
              <img
                src={images.vnpay}
                alt="VNPay"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
              <p>VnPay</p>
            </div>

            <div
              className={`payment-method text-center ${
                selectedPaymentMethod === "PayPal" ? "selected" : ""
              }`}
              onClick={() => setSelectedPaymentMethod("PayPal")}
              style={{
                cursor: "pointer",
                border:
                  selectedPaymentMethod === "PayPal"
                    ? "2px solid blue"
                    : "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "110px",
                height: "120px",
              }}
            >
              <img
                src={images.paypal}
                alt="PayPal"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
              <p>Paypal</p>
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handlePayment}
          disabled={!selectedPaymentMethod}
        >
          Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const handleContinueShopping = () => {
    navigate("/searchCourses");
  };

  const renderEmptyCart = () => (
    <div className={cx("empty-cart")}>
      <div className={cx("empty-cart-content")}>
        <FaShoppingCart className={cx("cart-icon")} />
        <h2>Your cart is empty!</h2>
        <p>Looks like you haven't added any courses to your cart yet.</p>
        <Button 
          onClick={handleContinueShopping} 
          className={cx("continue-shopping-btn")}
        >
          <FaArrowLeft className="me-2" /> Back to course page
        </Button>
      </div>
    </div>
  );

  const renderCartWithItems = () => (
    <Container className={cx("cart-page")}>
  <Row className="justify-content-center">
    <Col md={8}>
      <div className={cx("cart-container", "mt-4")}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.course.courseId} className={cx("cart-item")}>
              <Row className={cx("cart-item-row")}>
                <Col xs={3}>
                  <img
                    src={item.course.image || images.courseDefault}
                    alt={item.course.courseTitle}
                    className={cx("product-image")}
                  />
                </Col>
                <Col>
                  <h5 className={cx("course-title")}>
                    {item.course.courseTitle}
                  </h5>
                </Col>
                <Col>
                  {item.course.discount > 0 ? (
                    <div>
                      <p className={cx("original-price")}>
                        <del>${item.course.price}</del>
                      </p>
                      <p className={cx("discounted-price")}>
                        $
                        {(
                          item.course.price -
                          (item.course.price * item.course.discount) / 100
                        ).toFixed(2)}
                      </p>
                      <p className={cx("discount-label")}>
                        Giảm {item.course.discount}%
                      </p>
                    </div>
                  ) : (
                    <p className={cx("course-price")}>
                      ${item.course.price}
                    </p>
                  )}
                </Col>
                <Col xs={1} className="text-end">
                  <Button
                    variant="danger"
                    className={cx("delete-btn")}
                    onClick={() => deleteCourse(item.course.courseId)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>There are no courses in your cart!</h4>
            <Button 
              variant="outline-primary" 
              onClick={handleContinueShopping}
              className="mt-3"
            >
              Go Shopping
            </Button>
          </div>
        )}
      </div>
    </Col>

    <Col md={3}>
      <div className={cx("checkout-container")}>
        <div className={cx("checkout-summary")}>
          <div className={cx('order-header')}>
              <h3>Order Summary</h3>
          </div>
          <div className={cx("total-quantity")}>
            <strong>Total Courses:</strong>
            {cartItems.length}
          </div>
          <div className={cx("total-price")}>
            <strong>Total Price:</strong>${totalPrice.toFixed(2)}
          </div>
          <div className={cx("wallet-balance")}>
            <strong>Amount in wallet:</strong>${walletBalance.toFixed(2)}
          </div>

          <div className={cx("remaining-balance")}>
            {totalPrice > walletBalance ? (
              <>
                <strong>Additional payment required:</strong>
                ${Math.max(0, totalPrice - walletBalance).toFixed(2)}
              </>
            ) : (
              <p className={cx("payment-status")}>
                <strong>Full payment from wallet !</strong>
              </p>
            )}
          </div>

          <div className={cx("btnCheckout")}>
            <button
              className={cx("checkout-button")}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
            <Link
              onClick={handleContinueShopping}
              className={cx('Link')}
            >
              Go Shopping
            </Link>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</Container>

  );
  return (
    <div className={cx("cart-page")}>
    <div className={cx("wrapper")}>
      {cartItems.length === 0 ? renderEmptyCart() : renderCartWithItems()}
    </div>

      {isProcessingPayment ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.8)",
            zIndex: 1000,
          }}
        >
          <div className="position-relative">
            <Spinner
              animation="border"
              style={{
                width: "170px",
                height: "170px",
                borderWidth: "7px",
                borderColor: "#ADB7C5 transparent transparent transparent",
              }}
            />
            <img
              src={
                selectedPaymentMethod === "Momo"
                  ? images.momo
                  : selectedPaymentMethod === "VNPay"
                  ? images.vnpay
                  : selectedPaymentMethod === "PayPal"
                  ? images.paypal
                  : images.wallet
              }
              alt="Payment Logo"
              style={{
                position: "absolute",
                top: "49%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      ) : (
        renderPaymentModal()
      )}
    </div>
  );
}
