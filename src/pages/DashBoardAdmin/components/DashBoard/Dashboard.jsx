// DashboardView.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaChartPie,
  FaChalkboardTeacher,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import Cookies from "js-cookie";
import { ModalContext } from "../../../../components/ModalProvider/ModalProvider";
import config from "../../../../config";
import { useNavigate } from "react-router-dom";
import requests from "../../../../utils/requests";
import images from "../../../../assets/images";

const cx = classNames.bind(styles);
const API_TOTAL_COURSE = "Dashboard/total-courses";
const API_TOTAL_REVENUE = "Dashboard/revenue-overview?period=total";
const API_TOTAL_REVENUE_DAY = "Dashboard/revenue-overview?period=day";
const API_TOTAL_USER = "User/Get-all";
const API_GET_PROFILE = "User/GetUserProfile";
const API_GET_Wallet = "Wallet/getwalletbyusername";
const DashboardView = () => {
  const lineChartData = [
    { month: "Jan", students: 400, revenue: 2400, profit: 2400 },
    { month: "Feb", students: 450, revenue: 2600, profit: 2100 },
    { month: "Mar", students: 500, revenue: 2800, profit: 2500 },
    { month: "Apr", students: 600, revenue: 3000, profit: 2700 },
  ];

  

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const recentActivity = [
    {
      id: "#0001",
      student: "John Doe",
      course: "React for Beginners",
      status: "Completed",
      amount: "$100",
    },
    {
      id: "#0002",
      student: "Jane Smith",
      course: "Advanced JavaScript",
      status: "Pending",
      amount: "$150",
    },
  ];

  const { setAuth, setUser } = useContext(ModalContext);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [revenueOverview, setRevenueOverview] = useState(0);
  const navigate = useNavigate();
  const [fetchUserProfile, setFetchUserProfile] = useState();
  const [revenueOverviewDay, setRevenueOverviewDay] = useState(0);
  const [dataUserActive, setDataUserActive] = useState();
  const [dataUserInActive, setDataUserInActive] = useState();
  const [wallet, setWallet] = useState();

  const summaryData = [
    {
      title: "Total Users",
      value: totalUser,
      icon: <FaUsers className={cx("cardIcon")} />,
      change: "+3.5%",
      trend: "positive",
    },
    {
      title: "Total Courses",
      value: totalCourses,
      icon: <FaChalkboardTeacher className={cx("cardIcon")} />,
      change: "+1.2%",
      trend: "positive",
    },
    {
      title: "Revenue",
      value: revenueOverview,
      icon: <FaDollarSign className={cx("cardIcon")} />,
      change: "-2.1%",
      trend: "negative",
    },
    {
      title: "Revenue Day",
      value: revenueOverviewDay,
      icon: <FaChartPie className={cx("cardIcon")} />,
      change: "+4.5%",
      trend: "positive",
    },
  ];

  const pieData = [
    { name: "Total Students", value: totalUser },
    { name: "Active Students", value: dataUserActive },
    { name: "Inactive Students", value: dataUserInActive },
  ];

  const signOut = () => {
    Cookies.remove("authToken");
    setAuth(null);
    setUser(null);
    navigate(config.routes.home);
  };

  const fetchUsers = async () => {
    try {
      const response = await requests.get(API_GET_PROFILE);
      if (response.data) {
        setFetchUserProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await requests.get(API_TOTAL_COURSE);
      setTotalCourses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchWallet = async () => {
    try {
      const response = await requests.get(API_GET_Wallet);
      console.log(response.data[0].transactions);
      setWallet(response.data[0].transactions)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await requests.get(API_TOTAL_REVENUE);
      setRevenueOverview(response.data.totalRevenue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchRevenueDay = async () => {
    try {
      const response = await requests.get(API_TOTAL_REVENUE_DAY);
      setRevenueOverviewDay(response.data.totalRevenue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await requests.get(API_TOTAL_USER);
      const users = response.data.items;
      const activeUsersCount = users.filter(user => user.status === "Active").length;
    const inActiveUsersCount = users.filter(user => user.status === "Inactive").length;
      setDataUserActive(activeUsersCount);
      setDataUserInActive(inActiveUsersCount);
      setTotalUser(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchRevenue();
    fetchUser();
    fetchUsers();
    fetchRevenueDay();
    fetchWallet();
  }, []);

  return (
    <div className={cx("dashboardView")}>
      <div className={cx("header")}>
        <input
          type="text"
          placeholder="Search here..."
          className={cx("searchBox")}
        />
        <div className={cx("userProfile")}>
          <div>
            <img
              src={fetchUserProfile?.avatar || images.defaultAvatar}
              alt="User"
              className={cx("userAvatar")}
            />

            <span className={cx("userName")}>
              {fetchUserProfile ? fetchUserProfile.fullName : "Loading..."}
            </span>
          </div>
          <div className={cx("logout-button")}>
            <i class="bi bi-box-arrow-right" onClick={signOut}></i>
          </div>
        </div>
      </div>
      <div className={cx("summaryCards")}>
        {summaryData.map((card, index) => (
          <div key={index} className={cx("card", card.trend)}>
            <div className={cx("cardIcon")}>{card.icon}</div>
            <div className={cx("cardContent")}>
              <h3 className={cx("cardTitle")}>{card.title}</h3>
              <p className={cx("cardValue")}>{card.value}</p>
              <span className={cx("cardChange", card.trend)}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={cx("analyticsCharts")}>
        <div className={cx("chart", "lineChart")}>
          <h4 className={cx("chartTitle")}>Monthly Revenue & Students</h4>
          <LineChart width={700} height={250} data={lineChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="students" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className={cx("chart", "pieChart")}>
          <h4 className={cx("chartTitle")}>Student Distribution</h4>
          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className={cx("activityTable")}>
        <h4 className={cx("tableTitle")}>Recent Activity</h4>
        <table className={cx("activityTable")}>
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Create Day</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {wallet && wallet.map((transaction, index) => (
      <tr key={index}>
        <td>{transaction.orderCode}</td>

        <td>
          {new Date(transaction.createdDate).toLocaleDateString("en-GB")}
        </td>

        <td>{transaction.description || "Unknown"}</td>

        <td>{transaction.amount.toFixed(2)}</td>

        <td
          className={cx(
            transaction.status === "Success" ? "completed" : "pending"
          )}
        >
          {transaction.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default DashboardView;
