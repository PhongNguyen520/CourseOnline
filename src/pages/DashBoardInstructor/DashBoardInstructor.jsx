import React, { useContext, useEffect, useState } from "react";
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
  Plus,
  LogOut,
} from "lucide-react";
import styles from "./DashBoardInstructor.module.scss";
import classNames from "classnames/bind";
import requests from "../../utils/requests";
import { FaDollarSign } from "react-icons/fa";

const API_GET_COURSE = "Course/revenue-courses";

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

  const [courses, setCourses] = useState([]);

  const fetchCourse = async () => {
    try {
      const response = await requests.get(API_GET_COURSE);
      console.log(response.data);

      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const revenueByCoursePieData = courses.map((course) => ({
    name: course.courseTitle,
    value: course.revenue,
  }));

  const totalStudents = courses.reduce(
    (total, course) => total + course.totalEnrollment,
    0
  );

  const discount = courses.reduce((total, course) => {
    if (course.discount > 0) {
      total += 1;
    }
    return total;
  }, 0);

  const revenue = courses.reduce((total, course) => total + course.revenue, 0);

  const discountCourses = courses.reduce((result, currentCourse) => {
    if (currentCourse.discount > 0) {
      result.push(currentCourse);
    }
    return result;
  }, []);

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className={cx("dashboardContainer")}>
      <div className={cx("btnContainer")}>
        <div className={cx("btn")}>
          <Download size={16} />
          <span>Export Report</span>
        </div>
      </div>
      <div className={cx("dashboardStats")}>
        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconPurple")}>
                <Users size={20} color="#9333ea" />
                <p>Total Students</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>{totalStudents}</h3>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconBlue")}>
                <TrendingUp size={20} color="#3b82f6" />
                <p>Total Revenue</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>${revenue}</h3>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconGreen")}>
                <Star size={20} color="#22c55e" />
                <p>Average Rating</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>4.8</h3>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconOrange")}>
                <Percent size={20} color="#f97316" />
                <p>Active Discounts</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>{discount}</h3>
          </Card.Body>
        </Card>
      </div>

      <div className={cx("dashboardCharts")}>
        <Card className={cx("chartCard")}>
          <Card.Body>
            <div className={cx("chartHeader")}>
              <h3 className={cx("titleStatistic")}>Student Enrollments</h3>
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
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                name="Total Students"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#22c55e"
                name="New Enrollments"
                strokeWidth={2}
              />
            </LineChart>
          </Card.Body>
        </Card>

        <Card className={cx("chartCard")}>
          <Card.Body>
            <div className={cx("chartHeader")}>
              <h3 className={cx("titleStatistic")}>Course Revenue</h3>
              <select className={cx("btn", "btnSecondary")}>
                <option>All Time</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className={cx("coursePerformance")}>
              <div className={cx("pieChartContainer")}>
                <PieChart width={280} height={320}>
                  <Pie
                    data={revenueByCoursePieData}
                    cx={120}
                    cy={150}
                    innerRadius={70}
                    outerRadius={90}
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
                </PieChart>
              </div>
              <div className={cx("chartDetails")}>
                {courses.map((course, index) => (
                  <div key={course.courseCode} className={cx("courseItem")}>
                    <div className={cx("courseTitle")}>
                      {course.courseTitle}
                    </div>
                    <div className={cx("ratingInfo")}>
                      <span className={cx("rating")}>
                        <FaDollarSign /> {course.revenue}
                      </span>
                      <span className={cx("rating")}>
                        {((course.revenue / revenue) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className={cx("progressBarContainer")}>
                      <div
                        className={cx("progressBar")}
                        style={{
                          width: `${(course.revenue / revenue) * 100}%`,
                          backgroundColor: COLORS[index],
                        }}
                      />
                    </div>
                    <small className={cx("reviewCount")}>
                      {course.reviews} Revenue
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
            <h3 className={cx("titleStatistic")}>Active Discounts</h3>
            <div className={cx("btn")}>
              <span>
                <Plus size={16} />
                Create Discount
              </span>
            </div>
          </div>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Category</th>
                <th>Price</th>
                <th>Revenue</th>
                <th>Enrollments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {discountCourses.length > 0 ? (
                discountCourses.map((course) => (
                  <tr key={course.courseCode}>
                    <td>{course.courseTitle}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.discount}%</td>
                    <td>{course.category.categoryName}</td>
                    <td>${course.price}</td> 
                    <td>${course.revenue}</td> 
                    <td>{course.totalEnrollment}</td>
                    <td
                      className={cx(
                        course.status === "Active"
                          ? "statusActive"
                          : "statusInactive"
                      )}
                    >
                     <span>{course.status}</span> 
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No active discounts available</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InstructorDashboard;
