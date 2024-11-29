import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Bookmark.module.scss";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import requests from "../../utils/requests";
import images from "../../assets/images";

const cx = classNames.bind(styles);
const BOOKMARKDETAIL_URL = "BookmarkDetail";
const CART_URL = "Cart/Add-Cart";
const COURSE_ENROLL_URL = "Course/view-enrolled?isAscending=true&pageSize=30";

export default function Bookmark() {
  const [selectAll, setSelectAll] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [courseEnroll, setCourseEnroll] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);

  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    setBookmarkedCourses((prevCourses) =>
      prevCourses.map((course) => ({ ...course, selected: updatedSelectAll }))
    );
  };

  const handleSelectCourse = (id) => {
    setBookmarkedCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.course.courseId === id
          ? { ...course, selected: !course.selected }
          : course
      )
    );
  };

  const totalSelected = bookmarkedCourses.filter(
    (course) => course.selected
  ).length;

  const handleAddToCart = async () => {
    const selectedCourses = bookmarkedCourses.filter(
      (course) => course.selected
    );

    if (selectedCourses.length > 0) {
      const newCourses = selectedCourses.filter(
        (selectedCourse) =>
          !cartCourses.some(
            (cartItem) =>
              cartItem.course.courseId === selectedCourse.course.courseId
          ) &&
          !courseEnroll.some(
            (enrolledCourse) =>
              enrolledCourse.courseId === selectedCourse.course.courseId
          )
      );

      if (newCourses.length > 0) {
        const updatedCart = [...cartCourses, ...newCourses];
        setCartCourses(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        try {
          const postPromises = newCourses.map((course) =>
            requests.post(`${CART_URL}?courseId=${course.course.courseId}`)
          );
          await Promise.all(postPromises);
          alert("Courses have been added to your cart!");
        } catch (error) {
          console.error("Failed to post courseId to API:", error);
          alert(
            "Some courses could not be added to the cart. Check console for details."
          );
        }
      } else {
        alert(
          "All selected courses are either already in the cart or enrolled."
        );
      }
    } else {
      alert("No courses selected to add to the cart.");
    }
  };

  const getBookmark = async () => {
    try {
      const response = await requests.get(BOOKMARKDETAIL_URL);
      setBookmarkedCourses(
        response.data.map((course) => ({ ...course, selected: false }))
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching bookmarked courses:", error);
    }
  };

  const getCourseEnrolled = async () => {
    try {
      const response = await requests.get(COURSE_ENROLL_URL);
      setCourseEnroll(response.data.courses);
      console.log(response.data.courses);
    } catch (error) {
      console.log("Error fetching enrolled courses:", error);
    }
  };

  const getCartCourses = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCourses(existingCart);
  };

  const handleDeleteSelected = async () => {
    const selectedCourses = bookmarkedCourses.filter(
      (course) => course.selected
    );

    if (selectedCourses.length === 0) {
      alert("No courses selected for deletion.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedCourses.length} selected course(s)?`
    );

    if (confirmDelete) {
      try {
        for (const course of selectedCourses) {
          await deleteBookmark(course.course.courseId);
        }
      } catch (error) {
        alert("Failed to delete selected courses: " + error.message);
      }
    }
  };

  const deleteBookmark = async (id) => {
    try {
      await requests.delete(`${BOOKMARKDETAIL_URL}/${id}`);
    } catch (error) {
      alert("Error while removing course: " + error.message);
    }
    await getBookmark();
  };

  useEffect(() => {
    getBookmark();
    getCourseEnrolled();
    getCartCourses();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("actions")}>
        {bookmarkedCourses.length !== 0 && (
          <Form.Check
            type="checkbox"
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        )}
        <Col xs={1}>
          {totalSelected !== 0 && (
            <Button onClick={handleAddToCart} className={cx("add-to-cart-btn")}>
              Add To Cart
            </Button>
          )}
        </Col>
        <Col xs={1}>
          {totalSelected !== 0 && (
            <Button
              variant="danger"
              className={cx("delete-btn")}
              onClick={handleDeleteSelected}
            >
              <FaTrash /> Delete
            </Button>
          )}
        </Col>
      </div>

      {bookmarkedCourses.length === 0 ? (
        <p className={cx("empty-message")}>You have no bookmarked courses.</p>
      ) : (
        <>
          <div className={cx("title-bar")}>
            <Row className={cx("title-bar-row")}>
              <Col xs={1}>
                <strong>Select</strong>
              </Col>
              <Col xs={3}></Col>
              <Col xs={3}></Col>
              <Col xs={2}>
                <strong>Level</strong>
              </Col>
              <Col xs={2}>
                <strong>Price</strong>
              </Col>
            </Row>
          </div>

          <div className={cx("course-list")}>
            {bookmarkedCourses.map((courseInfo) => {
              const isCourseEnrolled = courseEnroll.some(
                (enrolledCourse) =>
                  enrolledCourse.courseId === courseInfo.course.courseId
              );
              const isInCart = cartCourses.some(
                (cartCourse) =>
                  cartCourse.course.courseId === courseInfo.course.courseId
              );

              return (
                <div
                  key={courseInfo.course.courseId}
                  className={cx("course-item", {
                    "enrolled-course": isCourseEnrolled,
                    "in-cart": isInCart,
                  })}
                >
                  <Row className={cx("course-item-row")}>
                    <Col xs={1}>
                      <Form.Check
                        type="checkbox"
                        checked={courseInfo.selected}
                        onChange={() =>
                          handleSelectCourse(courseInfo.course.courseId)
                        }
                        disabled={isCourseEnrolled || isInCart}
                      />
                    </Col>
                    <Col xs={3}>
                      <img
                        src={courseInfo.course.image || images.courseDefault}
                        alt={courseInfo.course.courseTitle}
                        className={cx("course-image")}
                      />
                    </Col>
                    <Col xs={3}>
                      <h5 className={cx("course-title")}>
                        {courseInfo.course.courseTitle}
                       
                      </h5>
                      <p className={cx("created-date")}>
                        Created on: {courseInfo.course.createdDate}
                      </p>
                    </Col>
                    <Col xs={2} className={cx("wrap-level")}>
                      <span className={cx("level")}>
                        {courseInfo.course.level === 1
                          ? "Beginner"
                          : courseInfo.course.level === 2
                          ? "Intermediate"
                          : "Advanced"}
                      </span>

                      {isInCart && (
                        <span className={cx("added-to-cart")}>
                          Added to Cart
                        </span>
                      )}
                         {isCourseEnrolled && (
                          <span className={cx("enrolled-label")}>Enrolled</span>
                        )}
                    </Col>
                    <Col xs={2}>
                      {courseInfo.course.discount > 0 ? (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span className={cx("original-price")}>
                              <del>${courseInfo.course.price}</del>
                            </span>
                            <span className={cx("discounted-price")}>
                              $
                              {(
                                courseInfo.course.price -
                                (courseInfo.course.price *
                                  courseInfo.course.discount) /
                                  100
                              ).toFixed(2)}
                            </span>
                          </div>
                          <span className={cx("discount-label")}>
                            Discount {courseInfo.course.discount}%
                          </span>
                        </div>
                      ) : (
                        <p className={cx("discounted-price")}>
                          ${courseInfo.course.price}
                        </p>
                      )}
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
