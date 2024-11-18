// DashboardView.jsx
import React, { useContext } from "react";
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

const cx = classNames.bind(styles);

const DashboardView = () => {
  const summaryData = [
    {
      title: "Total Students",
      value: "1,200",
      icon: <FaUsers className={cx("cardIcon")} />,
      change: "+3.5%",
      trend: "positive",
    },
    {
      title: "Total Instructors",
      value: "150",
      icon: <FaChalkboardTeacher className={cx("cardIcon")} />,
      change: "+1.2%",
      trend: "positive",
    },
    {
      title: "Revenue",
      value: "$5,400",
      icon: <FaDollarSign className={cx("cardIcon")} />,
      change: "-2.1%",
      trend: "negative",
    },
    {
      title: "Profit",
      value: "$3,958",
      icon: <FaChartPie className={cx("cardIcon")} />,
      change: "+4.5%",
      trend: "positive",
    },
  ];

  const lineChartData = [
    { month: "Jan", students: 400, revenue: 2400, profit: 2400 },
    { month: "Feb", students: 450, revenue: 2600, profit: 2100 },
    { month: "Mar", students: 500, revenue: 2800, profit: 2500 },
    { month: "Apr", students: 600, revenue: 3000, profit: 2700 },
  ];

  const pieData = [
    { name: "Total Students", value: 1200 },
    { name: "Active Students", value: 900 },
    { name: "Inactive Students", value: 300 },
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

  const navigate = useNavigate();

  const signOut = () => {
    Cookies.remove("authToken");
    setAuth(null);
    setUser(null);
    navigate(config.routes.home);
  };

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
              src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=mix8r9CqT9AQ7kNvgGmOH6c&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=Ake5ZOJc-z6iue2PwxkN0aO&oh=00_AYBNO8YKaxldThk2Ns5T-kfEatTyQGrby0p_Jnge4uigkg&oe=673C05B0"
              alt="User"
              className={cx("userAvatar")}
            />
            <span className={cx("userName")}>Phong Nguyen</span>
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
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.student}</td>
                <td>{row.course}</td>
                <td
                  className={cx(
                    row.status === "Completed" ? "completed" : "pending"
                  )}
                >
                  {row.status}
                </td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardView;
