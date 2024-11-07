import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChartPie,
  FaCommentDots,
  FaFlag,
  FaCheck,
  FaBan,
  FaInfoCircle,
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import classNames from "classnames/bind";
import styles from "./CoursesView.module.scss";

const cx = classNames.bind(styles);

const CoursesView = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React for Beginners",
      category: "Web Development",
      createdMonth: "Jan",
      duration: "20 hours",
      price: 99,
      discount: 10,
      status: "Active",
      feedbackCount: 120,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      category: "Programming",
      createdMonth: "Feb",
      duration: "30 hours",
      price: 149,
      discount: 15,
      status: "Active",
      feedbackCount: 95,
    },
    {
      id: 3,
      title: "Web Development Fundamentals",
      category: "Web Development",
      createdMonth: "Mar",
      duration: "40 hours",
      price: 199,
      discount: 5,
      status: "Reported",
      feedbackCount: 210,
    },
    {
      id: 4,
      title: "Data Science 101",
      category: "Data Science",
      createdMonth: "Jan",
      duration: "35 hours",
      price: 250,
      discount: 20,
      status: "Inactive",
      feedbackCount: 0,
    },
  ]);

  const totalCourses = courses.length;
  const totalFeedback = courses.reduce(
    (sum, course) => sum + course.feedbackCount,
    0
  );
  const reportedCourses = courses.filter(
    (course) => course.status === "Reported"
  ).length;
  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  ).length;
  const inactiveCourses = courses.filter(
    (course) => course.status === "Inactive"
  ).length;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const monthlyCourseData = months.map((month) => ({
    month,
    Quantity: courses.filter((course) => course.createdMonth === month).length,
  }));

  const categoryMonthlyData = months.map((month) => ({
    month,
    Quantity: courses.filter((course) => course.createdMonth === month).length,
  }));

  // Event Handlers
  const handleAddCourse = () => {
    alert("Add Course feature coming soon!");
  };

  const handleEditCourse = (courseId) => {
    alert(`Edit Course ID: ${courseId}`);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleDetailInstructor = (instructorId) =>
    alert(`Detail for Instructor ID: ${instructorId}`);

  return (
    <div className={cx("coursesView")}>
      <div className={cx("header")}>
        <h2>Courses Management</h2>
        <button onClick={handleAddCourse} className={cx("addButton")}>
          <FaPlus /> Add New Course
        </button>
      </div>

      <div className={cx("analyticsSection")}>
        <div className={cx("analyticsCard")}>
          <FaChartPie className={cx("icon")} />
          <div>
            <h4>Total Courses</h4>
            <p>{totalCourses}</p>
          </div>
        </div>
        <div className={cx("analyticsCard")}>
          <FaCommentDots className={cx("icon")} />
          <div>
            <h4>Total Feedback</h4>
            <p>{totalFeedback}</p>
          </div>
        </div>
        <div className={cx("analyticsCard")}>
          <FaFlag className={cx("icon")} />
          <div>
            <h4>Reported Courses</h4>
            <p>{reportedCourses}</p>
          </div>
        </div>
        <div className={cx("analyticsCard")}>
          <FaCheck className={cx("icon")} />
          <div>
            <h4>Active Courses</h4>
            <p>{activeCourses}</p>
          </div>
        </div>
        <div className={cx("analyticsCard")}>
          <FaBan className={cx("icon")} />
          <div>
            <h4>Inactive Courses</h4>
            <p>{inactiveCourses}</p>
          </div>
        </div>
      </div>

      <div className={cx("chartsSection")}>
        <div className={cx("chart", "lineChart")}>
          <h4 className={cx("chartTitle")}>Total Courses</h4>
          <LineChart width={500} height={300} data={monthlyCourseData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Quantity" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className={cx("chart", "lineChart")}>
          <h4 className={cx("chartTitle")}>Total Categories</h4>
          <LineChart width={500} height={300} data={categoryMonthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Quantity" stroke="#0088FE" />
          </LineChart>
        </div>
      </div>

      <table className={cx("coursesTable")}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Discount (%)</th>
            <th>Status</th>
            <th>Feedback Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>{course.duration}</td>
              <td>${course.price}</td>
              <td>{course.discount}%</td>
              <td>{course.status}</td>
              <td>{course.feedbackCount}</td>
              <td>
                <button
                  onClick={() => handleDetailInstructor(course.id)}
                  className={cx("detailButton")}
                >
                  <FaInfoCircle />
                </button>
                <button
                  onClick={() => handleEditCourse(course.id)}
                  className={cx("editButton")}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className={cx("deleteButton")}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesView;
