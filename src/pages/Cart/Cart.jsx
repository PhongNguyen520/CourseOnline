import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaTrash } from "react-icons/fa";
import images from "../../assets/images";
import requests from "../../utils/requests";

const cx = classNames.bind(styles);
const WALLET_URL = "Wallet/getwalletbyusername";

export default function Cart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [selectAll, setSelectAll] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart.map((item) => ({
      ...item,
      selected: false,
    }));
  });

  const getWallet = async () => {
    try {
      const response = await requests.get(WALLET_URL);
      console.log(response.data);

      if (response.data) {
        setWalletBalance(response.data[0].balance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    getWallet();
  }, [cartItems]);

  const totalPrice = selectedCourses.reduce((sum, item) => {
    const discountedPrice =
      item.course.discount > 0
        ? item.course.price - (item.course.price * item.course.discount) / 100
        : item.course.price;
    return sum + discountedPrice;
  }, 0);

  const filteredItems = cartItems.filter((item) =>
    item.course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      selected: newSelectAll,
    }));
    setCartItems(updatedCartItems);

    setSelectedCourses(newSelectAll ? [...filteredItems] : []);
  };

  const handleSelectCourseChange = (item) => {
    const isSelected = selectedCourses.some(
      (course) => course.course.courseId === item.course.courseId
    );

    const updatedSelection = isSelected
      ? selectedCourses.filter(
          (course) => course.course.courseId !== item.course.courseId
        )
      : [...selectedCourses, item];
    setSelectedCourses(updatedSelection);

    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.course.courseId === item.course.courseId
          ? { ...cartItem, selected: !isSelected }
          : cartItem
      )
    );

    setSelectAll(
      updatedSelection.length === filteredItems.length &&
        updatedSelection.length > 0
    );
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.course.courseId !== id
    );
    setCartItems(updatedCartItems);
    setSelectedCourses(
      selectedCourses.filter((item) => item.course.courseId !== id)
    );

    if (updatedCartItems.length === 0) {
      setSelectAll(false);
    }
  };

  const handleCheckout = () => {
    if (selectedPaymentMethod === "wallet" && totalPrice > walletBalance) {
      alert("Insufficient wallet balance.");
    } else {
      alert("Checkout successful!");
    }
  };

  return (
    <div className={cx("wrapper")}>
      {/* Search Bar */}
      <div className={cx("search-course-container")}>
        <Row className="justify-content-end mt-4">
          <Col md={8}>
            <Form onSubmit={handleSearchSubmit} className={cx("search-form")}>
              <div className={cx("search-bar-container")}>
                <Form.Control
                  type="text"
                  placeholder="Search for items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cx("search-input")}
                />
                <Button type="submit" className={cx("search-button")}>
                  <FaSearch />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>

      <Container className={cx("cart-page")}>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className={cx("cart-container", "mt-4")}>
              {filteredItems.length > 0 ? filteredItems.map((item) => (
                <div key={item.course.courseId} className={cx("cart-item")}>
                  <Row className={cx("cart-item-row")}>
                    <Col xs={1}>
                      <Form.Check
                        type="checkbox"
                        checked={item.selected || false}
                        onChange={() => handleSelectCourseChange(item)}
                      />
                    </Col>
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
                            Discount {item.course.discount}%
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
                        onClick={() => handleDelete(item.course.courseId)}
                      >
                        <div style={{ justifyContent: "center" }}>
                          <FaTrash /> Delete
                        </div>
                      </Button>
                    </Col>
                  </Row>
                </div>
              )): <span>No course in this cart!!</span>}
            </div>
          </Col>

          <Col md={3}>
            <div className={cx("checkout-container")}>
              <h5 className={cx("checkout-title")}>Order Summary</h5>
              <div className={cx("checkout-summary")}>
                <Form.Check
                  type="checkbox"
                  label="Select All"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <div className={cx("total-quantity")}>
                  <strong>Total Quantity: </strong>
                  {selectedCourses.length}
                </div>
                <div className={cx("total-price")}>
                  <strong>Total Price: </strong>${totalPrice}
                </div>
                <div className={cx("wallet-balance")}>
                  <strong>Wallet Balance: </strong>${walletBalance}
                </div>
                <Form.Group controlId="payment-method">
                  <Form.Label>Select Payment Method</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="wallet">Wallet</option>
                    <option value="credit-card">Credit Card</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  className={cx("checkout-btn")}
                  disabled={
                    selectedCourses.length === 0 ||
                    (totalPrice > walletBalance &&
                      selectedPaymentMethod === "wallet")
                  }
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
