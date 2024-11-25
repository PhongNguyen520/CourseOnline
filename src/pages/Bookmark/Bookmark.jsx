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

export default function Bookmark() {
  const [selectAll, setSelectAll] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

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
    const selectedCourses = bookmarkedCourses.filter((course) => course.selected);
  
    if (selectedCourses.length > 0) {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      const newCourses = selectedCourses.filter(
        (selectedCourse) =>
          !existingCart.some(
            (cartItem) => cartItem.course.courseId === selectedCourse.course.courseId
          )
      );
  
      if (newCourses.length > 0) {
        const updatedCart = [...existingCart, ...newCourses];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
  
        try {
          const postPromises = newCourses.map((course) =>
            
            requests.post(`${CART_URL}?courseId=${course.course.courseId}`)
          );
          await Promise.all(postPromises);
          alert("Courses have been added to your cart and bookmarked!");
        } catch (error) {
          console.error("Failed to post courseId to API:", error);
          alert("Some courses could not be bookmarked. Check console for details.");
        }
        
      } else {
        alert("All selected courses are already in the cart.");
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
    } catch (error) {
      console.log('Error fetch bookmarked:' + error);
    }
  };
  

  const handleDeleteSelected = async () => {
    const selectedCourses = bookmarkedCourses.filter((course) => course.selected);
  
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
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("actions")}>
      {bookmarkedCourses.length !== 0 && ( <Form.Check
          type="checkbox"
          label="Select All"
          checked={selectAll}
          onChange={handleSelectAll}
        />)}
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
            {bookmarkedCourses.map((courseInfo) => (
              
              <div
                key={courseInfo.course.courseId}
                className={cx("course-item")}
              >
                <Row className={cx("course-item-row")}>
                  <Col xs={1}>
                    <Form.Check
                      type="checkbox"
                      checked={courseInfo.selected}
                      onChange={() =>
                        handleSelectCourse(courseInfo.course.courseId)
                      }
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
                  <Col xs={2}>
                    <span className={cx("level")}>
                      {courseInfo.course.level === 1
                        ? "Beginner"
                        : courseInfo.course.level === 2
                        ? "Intermediate"
                        : "Advanced"}
                    </span>
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
            ))}
          </div>
        </>
      )}
    </div>
  );
}
