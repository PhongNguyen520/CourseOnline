import React from "react";
import { Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  Download,
  TrendingUp,
  Users,
  Star,
  Percent,
} from "lucide-react";
import styles from "./DashBoardInstructor.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const InstructorDashboard = () => {
  const enrollmentData = [
    { month: "Jan", total: 150, new: 45 },
    { month: "Feb", total: 220, new: 70 },
    { month: "Mar", total: 280, new: 60 },
    { month: "Apr", total: 350, new: 70 },
    { month: "May", total: 410, new: 60 },
    { month: "Jun", total: 480, new: 70 },
  ];

  const courseRatingData = [
    { name: "React Basics", rating: 4.8, reviews: 125 },
    { name: "Advanced JS", rating: 4.6, reviews: 98 },
    { name: "Web Design", rating: 4.7, reviews: 156 },
    { name: "Node.js", rating: 4.5, reviews: 87 },
  ];

  const revenueByCoursePieData = [
    { name: "React Basics", value: 35000 },
    { name: "Advanced JS", value: 28000 },
    { name: "Web Design", value: 22000 },
    { name: "Node.js", value: 15000 },
  ];

  const COLORS = ["#8b5cf6", "#3b82f6", "#22c55e", "#f97316"];

  const discountsData = [
    {
      id: 1,
      course: "React Basics",
      code: "REACT25",
      percentage: 25,
      validUntil: "2024-12-31",
      uses: 145,
      status: "Active",
    },
    {
      id: 2,
      course: "Advanced JS",
      code: "JS30",
      percentage: 30,
      validUntil: "2024-11-30",
      uses: 89,
      status: "Active",
    },
    {
      id: 3,
      course: "Web Design",
      code: "DESIGN20",
      percentage: 20,
      validUntil: "2024-12-15",
      uses: 167,
      status: "Active",
    },
  ];

  return (
    <div className={cx("dashboardContainer")}>
      <div className={cx("dashboardHeader")}>
        <h1 className={cx("dashboardTitle")}>Instructor Dashboard</h1>
        <div className={cx("headerActions")}>
          <button className={cx("btn", "btnSecondary")}>
            <Download size={16} />
            Export Report
          </button>
          <button className={cx("btn", "btnPrimary")}>+ Add New Course</button>
        </div>
      </div>

      <div className={cx("dashboardStats")}>
        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconPurple")}>
                <Users size={20} color="#9333ea" />
              </div>
            </div>
            <h3 className={cx("statValue")}>1,245</h3>
            <p>Total Students</p>
            <p className={cx("statTrend", "trendUp")}>↑ 12.5% vs last month</p>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconBlue")}>
                <TrendingUp size={20} color="#3b82f6" />
              </div>
            </div>
            <h3 className={cx("statValue")}>$24,500</h3>
            <p>Total Revenue</p>
            <p className={cx("statTrend", "trendUp")}>↑ 8.2% vs last month</p>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconGreen")}>
                <Star size={20} color="#22c55e" />
              </div>
            </div>
            <h3 className={cx("statValue")}>4.7</h3>
            <p>Average Rating</p>
            <p className={cx("statTrend", "trendUp")}>↑ 0.3 vs last month</p>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconOrange")}>
                <Percent size={20} color="#f97316" />
              </div>
            </div>
            <h3 className={cx("statValue")}>15%</h3>
            <p>Active Discounts</p>
            <p className={cx("statTrend", "trendDown")}>↓ 2% vs last month</p>
          </Card.Body>
        </Card>
      </div>

      <div className={cx("dashboardCharts")}>
      <Card className={cx("chartCard")}>
  <Card.Body>
    <div className={cx("chartHeader")}>
      <h3>Student Enrollments</h3>
      <select className={cx("btn", "btnSecondary")}>
        <option>Last 6 months</option>
        <option>Last year</option>
      </select>
    </div>
    <LineChart width={500} height={300} data={enrollmentData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8b5cf6" name="Total Students" strokeWidth={2} />
      <Line type="monotone" dataKey="new" stroke="#22c55e" name="New Enrollments" strokeWidth={2} />
    </LineChart>
  </Card.Body>
</Card>


        <Card className={cx("chartCard")}>
          <Card.Body>
            <div className={cx("chartHeader")}>
              <h3>Course Performance</h3>
              <select className={cx("btn", "btnSecondary")}>
                <option>All Time</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className={cx("coursePerformance")}>
              <div className={cx("pieChartContainer")}>
                <PieChart width={250} height={300}>
                  <Pie
                    data={revenueByCoursePieData}
                    cx={120}
                    cy={150}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueByCoursePieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
              <div className={cx("chartDetails")}>
                {courseRatingData.map((course, index) => (
                  <div key={course.name} className={cx("courseItem")}>
                    <div className={cx("courseTitle")}>{course.name}</div>
                    <div className={cx("ratingInfo")}>
                      <span className={cx("rating")}>⭐ {course.rating}</span>
                      <span className={cx("rating")}>
                        {course.rating * 20}%
                      </span>
                    </div>
                    <div className={cx("progressBarContainer")}>
                      <div
                        className={cx("progressBar")}
                        style={{
                          width: `${(course.rating / 5) * 100}%`,
                          backgroundColor: COLORS[index],
                        }}
                      />
                    </div>
                    <small className={cx("reviewCount")}>
                      {course.reviews} reviews
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card className={cx("tableCard")}>
        <Card.Body>
          <div className={cx("tableHeader")}>
            <h3>Active Discounts</h3>
            <button className={cx("btn", "btnPrimary")}>
              Create New Discount
            </button>
          </div>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Valid Until</th>
                <th>Uses</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {discountsData.map((discount) => (
                <tr key={discount.id}>
                  <td>{discount.course}</td>
                  <td>{discount.code}</td>
                  <td>{discount.percentage}%</td>
                  <td>{discount.validUntil}</td>
                  <td>{discount.uses}</td>
                  <td
                    className={cx(
                      discount.status === "Active"
                        ? "statusActive"
                        : "statusInactive"
                    )}
                  >
                    {discount.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InstructorDashboard;
