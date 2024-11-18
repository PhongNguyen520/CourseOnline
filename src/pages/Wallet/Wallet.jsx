import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./Wallet.module.scss";
import { ArrowDownToLine, ArrowUpToLine, CreditCard } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const cx = classNames.bind(styles);

const Wallet = () => {
  const [balance, setBalance] = useState(300.0);
  const transactions = [
    { type: "Payment", title: "React Course", date: "Jan", amount: -45.0 },
    { type: "Refund", title: "Java Course Refund", date: "Feb", amount: 45.0 },
    { type: "Top-up", title: "Wallet Top-up", date: "Mar", amount: 100.0 },
    { type: "Payment", title: "Python Course", date: "Apr", amount: -30.0 },
  ];

  const totalTopUp = transactions.filter(t => t.type === "Top-up").reduce((acc, t) => acc + t.amount, 0);
  const totalPayment = transactions.filter(t => t.type === "Payment").reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const totalRefund = transactions.filter(t => t.type === "Refund").reduce((acc, t) => acc + t.amount, 0);

  const pieData = [
    { name: "Top-ups", value: totalTopUp, color: "#22c55e" },
    { name: "Payments", value: totalPayment, color: "#ef4444" },
    { name: "Refunds", value: totalRefund, color: "#4f46e5" },
  ];

  const chartData = transactions.map(transaction => ({
    date: transaction.date,
    topUp: transaction.type === "Top-up" ? transaction.amount : 0,
    payment: transaction.type === "Payment" ? Math.abs(transaction.amount) : 0,
    refund: transaction.type === "Refund" ? transaction.amount : 0,
  }));

  const cardHolderName = "Leonardo Dicaprio";
  const notifications = [
    { name: "Josep Akbar", message: "Just sent you $10,000", time: "Just now" },
    { name: "Amazon", message: "Payment of $150 processed", time: "1 hr ago" },
    { name: "Netflix", message: "Subscription renewed for $20", time: "Yesterday" },
  ];

  return (
    <Container fluid className={cx("wrapper")}>
      {/* Header */}
     

      <Row className={cx( "wrapperWallet")}>
      <Row className={cx("header", "align-items-center")}>
        <Col>
          <span className={cx("headerGreeting")}>Hello, Leonardo 👋</span>
        </Col>
      </Row>
        <Col md={8} className={cx("wrapperLeft")}>
          {/* Balance Cards */}
          <Row className={cx("balanceCards")}>
            <Col md={6} className={cx("card")}>
              <div className={cx("cardLabel")}>Top-Ups</div>
              <div className={cx("cardAmount")}>
                <span>$21,500.00</span>
              </div>
              <div className={cx("cardTrend", "positive")}>
                <ArrowUpToLine size={16} />
                <span>12%</span>
              </div>
            </Col>

            <Col md={6} className={cx("card")}>
              <div className={cx("cardLabel")}>Spending</div>
              <div className={cx("cardAmount")}>
                <span>$13,500.00</span>
              </div>
              <div className={cx("cardTrend", "negative")}>
                <ArrowDownToLine size={16} />
                <span>8%</span>
              </div>
            </Col>
          </Row>

          {/* Statistics with Line Chart */}
          <Row className="mt-4">
            <Col className={cx("statistics", "card")}>
              <h4>Top-ups, Payments, and Refunds</h4>
              <LineChart width={500} height={300} data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="topUp" stroke="#22c55e" name="Top-ups" strokeWidth={2} />
                <Line type="monotone" dataKey="payment" stroke="#ef4444" name="Payments" strokeWidth={2} />
                <Line type="monotone" dataKey="refund" stroke="#4f46e5" name="Refunds" strokeWidth={2} />
              </LineChart>
            </Col>
          </Row>

          {/* Transaction History */}
          <Row className="mt-4">
            <Col className={cx("transactionHistory", "card")}>
              <h4>Transaction History</h4>
              <ul className={cx("transactionList")}>
                {transactions.map((transaction, index) => (
                  <li key={index} className={cx("transactionItem")}>
                    <div className={cx("transactionItemDetail")}>
                      <span className={cx("transactionTitle")}>{transaction.title}</span>
                      <span className={cx("transactionDate")}>{transaction.date}</span>
                    </div>
                    <div className={cx("transactionAmount", transaction.amount > 0 ? "positive" : "negative")}>
                      {transaction.amount > 0 ? `+` : ``}${transaction.amount.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Col>

        <Col md={4}>
          {/* Card Owner and Balance Section */}
          <Row className="mb-4">
            <Col className={cx("cardOwnerSection", "card")}>
              <div className={cx("cardOwnerDetails")}>
                <div className={cx("cardOwnerAvatar")}>
                  <CreditCard size={30} color="#fff" />
                </div>
                <div>
                  <div className={cx("cardOwnerName")}>{cardHolderName}</div>
                  <div className={cx("cardOwnerLabel")}>Card Owner</div>
                </div>
              </div>
              <div className={cx("cardBalance")}>
                <div className={cx("balanceLabel")}>Available Balance</div>
                <div className={cx("balanceAmount")}>${balance.toLocaleString()}</div>
              </div>
              <div className={cx("expiryDate")}>
                <span>Expires 05/26</span>
              </div>
            </Col>
          </Row>

          {/* Pie Chart Section */}
          <Row className="mb-4">
            <Col className={cx("pieChart", "card")}>
            <h3 className={cx("breakDownTitle")}>Total Breakdown</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </Col>
          </Row>

          {/* Notifications Section */}
          <Row>
            <Col className={cx("notifications", "card")}>
              <h3 className={cx("notificationsTitle")}>Notifications</h3>
              <div className={cx("notificationsList")}>
                {notifications.map((notification, index) => (
                  <div key={index} className={cx("notificationItem")}>
                    <div className={cx("notificationContent")}>
                      <div className={cx("notificationName")}>{notification.name}</div>
                      <div className={cx("notificationMessage")}>{notification.message}</div>
                    </div>
                    <div className={cx("notificationTime")}>{notification.time}</div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Wallet;
