import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Bookmark.module.scss";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const cx = classNames.bind(styles);

export default function Bookmark() {
  const [selectAll, setSelectAll] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([
    {
      id: 1,
      title: "Introduction to AI",
      price: 50,
      discount: 10,
      chapters: 12,
      quizzes: 4,
      author: { name: "John Doe", avatar: "https://i.pravatar.cc/50?img=1" },
      createdDate: "2023-01-10",
      imageUrl: "https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png",
      selected: false,
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      price: 75,
      discount: 0,
      chapters: 18,
      quizzes: 5,
      author: { name: "Jane Smith", avatar: "https://i.pravatar.cc/50?img=2" },
      createdDate: "2022-11-05",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNr6rXdKV6nc3p1MhQ5nmq0f1tYn_TsDhNrg&s",
      selected: false,
      level: "Advanced",
    },
    {
      id: 3,
      title: "Web Development Masterclass",
      price: 100,
      discount: 5,
      chapters: 24,
      quizzes: 6,
      author: { name: "Alice Johnson", avatar: "https://i.pravatar.cc/50?img=3" },
      createdDate: "2023-02-15",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1BsKuURgaAvy7OCuXBp0TfkkyRFHYwriCg&s",
      selected: false,
      level: "Beginner",
    },
  ]);

  // Handle select all
  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    setBookmarkedCourses((prevCourses) =>
      prevCourses.map((course) => ({ ...course, selected: updatedSelectAll }))
    );
  };

  // Handle individual selection
  const handleSelectCourse = (id) => {
    setBookmarkedCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, selected: !course.selected } : course
      )
    );
  };

  // Calculate total selected courses
  const totalSelected = bookmarkedCourses.filter(
    (course) => course.selected
  ).length;

  // Add to cart function
  const handleAddToCart = () => {
    const selectedCourses = bookmarkedCourses.filter(
      (course) => course.selected
    );
    console.log("Adding to cart:", selectedCourses);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("actions")}>
        <Form.Check
          type="checkbox"
          label="Select All"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <Col xs={1}>
          {totalSelected !== 0 && (
            <Button onClick={handleAddToCart} className={cx("add-to-cart-btn")}>Add To Cart</Button>
          )}
        </Col>
        <Col xs={1}>
        {totalSelected !== 0 && (
          <Button variant="danger" className={cx("delete-btn")}>
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
              <Col xs={1}><strong>Select</strong></Col>
              <Col xs={3}></Col>
              <Col xs={2}></Col>
              <Col xs={2}></Col>
              <Col xs={2}><strong>Price</strong></Col>
              <Col xs={2}><strong>Author</strong></Col>
            </Row>
          </div>

          <div className={cx("course-list")}>
            {bookmarkedCourses.map((course) => (
              <div key={course.id} className={cx("course-item")}>
                <Row className={cx("course-item-row")}>
                  <Col xs={1}>
                    <Form.Check
                      type="checkbox"
                      checked={course.selected}
                      onChange={() => handleSelectCourse(course.id)}
                    />
                  </Col>
                  <Col xs={2}>
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className={cx("course-image")}
                    />
                  </Col>
                  <Col xs={3}>
                    <h5 className={cx("course-title")}>{course.title}</h5>
                    <p className={cx("course-info")}>
                      Chapters: {course.chapters} | Quizzes: {course.quizzes}
                    </p>
                    <p className={cx("created-date")}>Created on: {course.createdDate}</p>
                  </Col>
                  <Col xs={2}>
                    <span className={cx("level")}>{course.level}</span>
                  </Col>
                  <Col xs={2}>
                    {course.discount > 0 ? (
                      <div>
                        <div style={{ display: "flex", gap: 5, alignItems: "center", justifyContent: "center" }}>
                          <span className={cx("original-price")}>
                            <del>${course.price}</del>
                          </span>
                          <span className={cx("discounted-price")}>
                            ${course.price - (course.price * course.discount) / 100}
                          </span>
                        </div>
                        <span className={cx("discount-label")}>Discount {course.discount}%</span>
                      </div>
                    ) : (
                      <p className={cx("discounted-price")}>${course.price}</p>
                    )}
                  </Col>
                  <Col xs={2}>
                    <div className={cx("author-info")}>
                      <img src={course.author.avatar} alt={course.author.name} className={cx("author-avatar")} />
                      <span className={cx("author-name")}>{course.author.name}</span>
                    </div>
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
