import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import classNames from "classnames/bind";
import styles from "./RevenueView.module.scss";
import { CreditCard } from "lucide-react";

const cx = classNames.bind(styles);

// Sample data for revenue over time
const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 10000 },
  { name: "Apr", value: 17000 },
  { name: "May", value: 13000 },
  { name: "Jun", value: 14000 },
];

// Sample transaction data with course information
const transactions = [
  {
    courseCode: "REACT101",
    courseName: "React for Beginners",
    ownerWallet: "Alice Johnson",
    description: "Payment for React course",
    date: "Jun 24, 2023",
    amount: 2890.0,
    type: "positive",
  },
  {
    courseCode: "JS202",
    courseName: "Advanced JavaScript",
    ownerWallet: "Tom Smith",
    description: "Refund for JavaScript course",
    date: "Jun 20, 2023",
    amount: -49.0,
    type: "negative",
  },
  {
    courseCode: "DS101",
    courseName: "Data Science Fundamentals",
    ownerWallet: "Sarah Lee",
    description: "Pending payment for Data Science course",
    date: "Jun 19, 2023",
    amount: -80.0,
    type: "negative",
  },
  {
    courseCode: "UXUI303",
    courseName: "UX/UI Design Basics",
    ownerWallet: "David Kim",
    description: "Payment for UX/UI course",
    date: "Jun 18, 2023",
    amount: 30.0,
    type: "positive",
  },
  {
    courseCode: "ML104",
    courseName: "Machine Learning",
    ownerWallet: "Emma Green",
    description: "Payment for Machine Learning course",
    date: "Jun 17, 2023",
    amount: 1500.0,
    type: "positive",
  },
];

const RevenueView = () => {
  return (
    <div className={cx("revenueDashboard")}>
      {/* Overview Section */}
      <div className={cx("overviewSection")}>
        <div className={cx("card", "wallet")}>
          <div className={cx("walletHeader")}>
            <h4><CreditCard size={30} color="#fff" />Total Revenue</h4>
          </div>
          <div className={cx("walletBalance")}>
            <div className={cx("wrapBalance")}>
              <span className={cx("balanceAmount")}>$120,000.00</span>
            </div>
            <div className={cx("wrapExpireDate")}>
              <span className={cx("expireDate", "positive")}>
                Expires 05/26
              </span>
            </div>
          </div>
        </div>

        <div className={cx("card", "revenueFlow")}>
          <h4>Revenue Over Time</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className={cx("historySection")}>
        <div className={cx("card", "recentTransactions")}>
          <h4>Recent Transactions</h4>
          <table className={cx("transactionsTable")}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Owner Wallet</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.courseCode}</td>
                  <td>{transaction.courseName}</td>
                  <td>{transaction.ownerWallet}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.date}</td>
                  <td className={cx("amount", transaction.type)}>
                    {transaction.type === "positive" ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueView;
