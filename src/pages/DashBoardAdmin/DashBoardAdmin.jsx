import React, { useState } from "react";
import { FaUsers, FaDollarSign, FaChartLine, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './DashBoardAdmin.module.scss';
import DashboardView from './components/DashBoard/Dashboard';
import CoursesView from './components/Course/CoursesView';
import StudentsView from './components/Student/StudentView';
import InstructorsView from './components/Instructor/InstructorView';
import RevenueView from './components/Revenue/RevenueView';

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
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={cx('dashboard')}>
      <div className={cx('sidebar')}>
        <div className={cx('logo')}>Course Admin</div>
        <nav className={cx('navMenu')}>
          <a href="#dashboard" className={cx('navLink', { active: activeView === "dashboard" })}
             onClick={() => setActiveView("dashboard")}>
            <FaChartLine className={cx('navIcon')} />
            Dashboard
          </a>
          <a href="#courses" className={cx('navLink', { active: activeView === "courses" })}
             onClick={() => setActiveView("courses")}>
            <FaBook className={cx('navIcon')} />
            Courses
          </a>
          <a href="#students" className={cx('navLink', { active: activeView === "students" })}
             onClick={() => setActiveView("students")}>
            <FaUsers className={cx('navIcon')} />
            Students
          </a>
          <a href="#instructors" className={cx('navLink', { active: activeView === "instructors" })}
             onClick={() => setActiveView("instructors")}>
            <FaChalkboardTeacher className={cx('navIcon')} />
            Instructors
          </a>
          <a href="#revenue" className={cx('navLink', { active: activeView === "revenue" })}
             onClick={() => setActiveView("revenue")}>
            <FaDollarSign className={cx('navIcon')} />
            Revenue
          </a>
        </nav>
      </div>
      <div className={cx('content')}>
        {renderActiveView()}
      </div>
    </div>
  );
}
