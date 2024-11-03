import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaTrash } from "react-icons/fa";

const cx = classNames.bind(styles);

export default function Cart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [walletBalance, setWalletBalance] = useState(500);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [selectAll, setSelectAll] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);


  const [cartItems, setCartItems] = useState([
    {
        id: 1,
        title: "Introduction to AI",
        price: 50,
        total: 50,
        discount: 10, // 10% discount
        imageUrl: "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
        selected: false,
    },
    {
        id: 2,
        title: "Data Science Bootcamp",
        price: 75,
        total: 150,
        discount: 7, // 7% discount
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNr6rXdKV6nc3p1MhQ5nmq0f1tYn_TsDhNrg&s",
        selected: false,
    },
    {
        id: 3,
        title: "Web Development Masterclass",
        price: 100,
        total: 100,
        discount: 5, // 5% discount
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1BsKuURgaAvy7OCuXBp0TfkkyRFHYwriCg&s",
        selected: false,
    },
]);


  // Calculate total price and total quantity for selected items
  const selectedItems = cartItems.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.total, 0);

  // Handle search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Handle select all checkbox
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setCartItems(cartItems.map((item) => ({ ...item, selected: !selectAll })));
    setTotalQuantity(cartItems.length);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
              {/* Cart Items Section */}
              {cartItems.map((item) => (
                <div key={item.id} className={cx("cart-item")}>
                  <Row className={cx("cart-item-row")}>
                    <Col xs={1}>
                      <Form.Check
                        type="checkbox"
                        checked={item.selected}
                        onChange={() =>
                          setCartItems((prevItems) =>
                            prevItems.map((i) =>
                              i.id === item.id
                                ? { ...i, selected: !i.selected }
                                : i
                            )
                          )
                        }
                      />
                    </Col>
                    <Col xs={3}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={cx("product-image")}
                      />
                    </Col>
                    <Col>
                      <h5 className={cx("course-title")}>{item.title}</h5>
                    </Col>
                    <Col>
                      {item.discount > 0 ? (
                        <div>
                          <p className={cx("original-price")}>
                            <del>${item.price}</del>
                          </p>
                          <p className={cx("discounted-price")}>
                            ${item.price - (item.price * item.discount) / 100}
                          </p>
                          <p className={cx("discount-label")}>
                            Discount {item.discount}%
                          </p>
                        </div>
                      ) : (
                        <p className={cx("course-price")}>${item.price}</p>
                      )}
                    </Col>

                    <Col xs={1} className="text-end">
                      <Button
                        variant="danger"
                        className={cx("delete-btn")}
                        onClick={() => handleDelete(item.id)}
                        
                      >
                        <div style={{justifyContent: 'center'}}>
                        <FaTrash /> Delete
                        </div>
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Col>

          {/* Order Summary Section */}
          <Col md={3}>
            <div className={cx("checkout-container")}>
              <h5 className={cx("checkout-title")}>Order Summary</h5>
              <div className={cx("checkout-summary")}>
                <Form.Check
                  type="checkbox"
                  label=" Select All Items"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  style={{display: 'flex', justifyContent: 'flex-end'}}
                />
                <p>Total Items: {totalQuantity}</p>
                <p>Total Price: ${totalPrice}</p>
                <p>Wallet Balance: ${walletBalance}</p>

                <Form.Group controlId="paymentMethod" className="mt-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="wallet">Wallet</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <Button
                variant="success"
                className={cx("checkout-button")}
                disabled={
                  totalPrice > walletBalance &&
                  selectedPaymentMethod === "wallet"
                }
              >
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
