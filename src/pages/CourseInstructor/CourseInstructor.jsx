import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CourseInstructor.module.scss";
import {
  PlusCircle,
  Edit2,
  XCircle,
  Percent,
  User,
  Users,
  BookOpen,
  Video,
  Star,
  Code,
  DollarSign,
  BarChart,
  FileText,
  Tag,
} from "lucide-react";
import { Card } from "react-bootstrap";
import requests from "../../utils/requests";

const cx = classNames.bind(styles);
const COURSES_URL = "Course/revenue-courses";

function CourseInstructor() {
  const [courses, setCourses] = useState([]);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce(
      (acc, course) => acc + course.totalEnrollment,
      0
    ),
    closedCourses: courses.filter((course) => course.status === "Inactive")
      .length,
    totalRevenue: courses.reduce((acc, course) => acc + course.revenue, 0),
  };

  const fetchCourses = async () => {
    try {
      const response = await requests.get(COURSES_URL);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleNewCourse = () => {
    setShowNewCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseCourse = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: "closed" } : course
      )
    );
  };

  const handleDiscount = (course) => {
    setSelectedCourse(course);
    setShowDiscountForm(true);
  };

  const getLevelText = (level) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Intermediate";
      case 3:
        return "Advanced";
      default:
        return "All Levels";
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("stats")}>
        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconGreen")}>
                <BookOpen size={20} color="#22c55e" />
                <p>Total Courses</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>{stats.totalCourses}</h3>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconPurple")}>
                <Users size={20} color="#9333ea" />
                <p>Total Students</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>{stats.totalStudents}</h3>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconRed")}>
                <XCircle size={20} color="#ef4444" />
                <p>Inactive Courses</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>{stats.closedCourses}</h3>
          </Card.Body>
        </Card>

        <Card className={cx("statCard")}>
          <Card.Body>
            <div className={cx("cardHeader")}>
              <div className={cx("iconContainer", "iconBlue")}>
                <DollarSign size={20} color="#3b82f6" />
                <p>Total Revenue</p>
              </div>
            </div>
            <h3 className={cx("statValue")}>${stats.totalRevenue}</h3>
          </Card.Body>
        </Card>
      </div>

      <div className={cx("courses-list")}>
        <div className={cx("header")}>
          <button className={cx("new-course-btn")} onClick={handleNewCourse}>
            <PlusCircle size={20} />
            New Course
          </button>
        </div>
        <div className={cx("courses-grid")}>
          {courses.map((course) => (
            <div
              key={course.courseCode}
              className={cx("course-card", {
                inactive: course.status === "Inactive",
              })}
            >
              <div className={cx("course-image")}>
                {course.image ? (
                  <img src={course.image} alt={course.courseTitle} />
                ) : (
                  <div className={cx("placeholder-image")}>No Image</div>
                )}
              </div>

              <div className={cx("course-header")}>
                <h3>{course.courseTitle}</h3>
                <span className={cx("course-code")}>{course.courseCode}</span>
              </div>

              <div className={cx("course-info")}>
                <div className={cx("info-item")}>
                  <Tag size={16} />
                  <span>{course.category?.categoryName}</span>
                </div>

                <div className={cx("info-item")}>
                  <Users size={16} />
                  <span>{course.totalEnrollment} students</span>
                </div>

                <div className={cx("info-item")}>
                  <BookOpen size={16} />
                  <span>{getLevelText(course.level)}</span>
                </div>

                <div className={cx("info-item")}>
                  <Star size={16} />
                  <span>{course.averageStarRating || "No ratings"}</span>
                </div>

                <div className={cx("course-price")}>
                  <DollarSign size={16} />
                  <span>{course.price}</span>
                  {course.discount > 0 && (
                    <span className={cx("discount")}>-{course.discount}%</span>
                  )}
                </div>

                <div className={cx("info-item")}>
                  <BarChart size={16} />
                  <span>Revenue: ${course.revenue}</span>
                </div>
              </div>

              <p className={cx("course-description")}>
                {course.shortDescription}
              </p>

              <div className={cx("course-status", course.status.toLowerCase())}>
                {course.status}
              </div>

              <div className={cx("actions")}>
                {course.status === "Active" && (
                  <button
                    onClick={() => handleCloseCourse(course.courseCode)}
                    className={cx("close-btn")}
                  >
                    <XCircle size={16} />
                    Close
                  </button>
                )}

                <button
                  onClick={() => handleDiscount(course)}
                  className={cx("discount-btn")}
                >
                  <Percent size={16} />
                  Discount
                </button>

                <button
                  onClick={() => handleEditCourse(course)}
                  className={cx("edit-btn")}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseInstructor;
