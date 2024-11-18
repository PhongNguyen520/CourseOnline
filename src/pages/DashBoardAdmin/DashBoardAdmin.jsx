import React, { useContext, useState } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaChalkboardTeacher,
  FaBook,
  FaWpforms,
} from "react-icons/fa";
import classNames from "classnames/bind";
import styles from "./DashBoardAdmin.module.scss";
import DashboardView from "./components/DashBoard/Dashboard";
import CoursesView from "./components/Course/CoursesView";
import StudentsView from "./components/Student/StudentView";
import InstructorsView from "./components/Instructor/InstructorView";
import RevenueView from "./components/Revenue/RevenueView";
import FormRequest from "./components/FormRequest/FormRequest";

const cx = classNames.bind(styles);

export default function DashBoardAdmin() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "courses":
        return <CoursesView />;
      case "students":
        return <StudentsView />;
      case "instructors":
        return <InstructorsView />;
      case "revenue":
        return <RevenueView />;
      case "request":
        return <FormRequest />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={cx("dashboard")}>
      <div className={cx("sidebar")}>
        <div className={cx("logo")}>
            <span>Admin</span>
            <div className={cx('title')}>
              <span>Panel</span>
          </div>
        </div>
        <nav className={cx("navMenu")}>
          <span
            className={cx("navLink", { active: activeView === "dashboard" })}
            onClick={() => setActiveView("dashboard")}
          >
            <FaChartLine className={cx("navIcon")} />
            Dashboard
          </span>
          <span
            className={cx("navLink", { active: activeView === "courses" })}
            onClick={() => setActiveView("courses")}
          >
            <FaBook className={cx("navIcon")} />
            Courses
          </span>
          <span
            className={cx("navLink", { active: activeView === "students" })}
            onClick={() => setActiveView("students")}
          >
            <FaUsers className={cx("navIcon")} />
            Students
          </span>
          <span
            className={cx("navLink", { active: activeView === "instructors" })}
            onClick={() => setActiveView("instructors")}
          >
            <FaChalkboardTeacher className={cx("navIcon")} />
            Instructors
          </span>
          <span
            className={cx("navLink", { active: activeView === "revenue" })}
            onClick={() => setActiveView("revenue")}
          >
            <FaDollarSign className={cx("navIcon")} />
            Revenue
          </span>
          <span
            className={cx("navLink", { active: activeView === "request" })}
            onClick={() => setActiveView("request")}
          >
            <FaWpforms className={cx("navIcon")} />
            Request
          </span>
        </nav>
      </div>
      <div className={cx("content")}>{renderActiveView()}</div>
    </div>
  );
}
