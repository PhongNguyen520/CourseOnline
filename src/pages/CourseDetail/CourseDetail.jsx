import React, { useMemo } from "react";
import classNames from 'classnames/bind';
import styles from './CourseDetail.module.scss';
import { Col, Row, Accordion, Card, useAccordionButton } from "react-bootstrap";

const cx = classNames.bind(styles);

export default function CourseDetail() {
    // Mock course data for demonstration
    const course = useMemo(() => ({
        title: 'Xây Dựng Website với ReactJS',
        description: 'Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.',
        learnings: [
            "Hiểu về khái niệm SPA/MPA",
            "Hiểu cách ReactJS hoạt động",
            "Biết cách tối ưu hiệu năng ứng dụng",
            "Hiểu rõ ràng Redux workflow",
            "Biết sử dụng redux-thunk middleware",
            "Triển khai dự án React ra Internet",
            "Biết cách Deploy lên Github/Gitlab page"
        ],
        chapters: [
            {
                title: "1. Giới thiệu",
                lessons: [
                    { title: "ReactJS là gì? Tại sao nên học ReactJS?", duration: "10:41" },
                    { title: "SPA/MPA là gì?", duration: "22:20" },
                    { title: "Ưu điểm của SPA", duration: "00:14" },
                ]
            },
            {
                title: "2. Ôn lại ES6+",
                lessons: [
                    { title: "Arrow Functions", duration: "12:05" },
                    { title: "Destructuring", duration: "08:45" },
                    { title: "Spread và Rest", duration: "09:30" },
                ]
            },
            {
                title: "3. React, ReactDOM",
                lessons: [
                    { title: "ReactDOM là gì?", duration: "05:15" },
                    { title: "Virtual DOM", duration: "13:45" },
                ]
            },
        ],
        instructor: {
            name: 'Nguyen Thanh Phong',
            avatar: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=X-0Qbyp45V8Q7kNvgHtOWnQ&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=ACVovl-Ous8cfpRpAMjMC7v&oh=00_AYDQnOZ_oDA4Sujkq0bchz_4U0bUjJ4m30JPmKFILUwhpA&oe=670A5D30',
        },
        price: '50',
        createdDate: '2023-01-01',
        image: 'https://via.placeholder.com/150',
        videoUrl: 'https://www.youtube.com/embed/baXSYQIcxy8'
    }), []);

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col lg={7}>
                    <div className={cx('course-header')}>
                        <h1>{course.title}</h1>
                    </div>
                    <div className={cx('course-description')}>
                        <p>{course.description}</p>
                    </div>
                    <div className={cx('course-learnings')}>
                        <h2>Bạn sẽ học được gì?</h2>
                        <ul>
                            {course.learnings.map((item, index) => (
                                <li key={index}>✔️ {item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('course-content')}>
                        <h2>Nội dung khóa học</h2>
                        <Accordion defaultActiveKey="0">
                            {course.chapters.map((chapter, index) => (
                                <Accordion.Item eventKey={index.toString()} key={index}>
                                    <Accordion.Header>{chapter.title}</Accordion.Header>
                                    <Accordion.Body>
                                        <ul className={cx('lesson-list')}>
                                            {chapter.lessons.map((lesson, lessonIndex) => (
                                                <li key={lessonIndex}>
                                                    {lesson.title} <span className={cx('lesson-duration')}>({lesson.duration})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                </Col>
                <Col lg={5}>
                    <div className={cx('course-video')}>
                        <iframe
                            width="100%"
                            height="250"
                            src={course.videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <Row>
                        <Col className={cx('instructor-info')}>
                            <img src={course.instructor.avatar} alt={course.instructor.name}
                                 className={cx('instructor-avatar')} />
                            <span>{course.instructor.name}</span>
                        </Col>
                    </Row>
                    <div className={cx('course-price')}>
                        <span>{new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(course.price)}</span>
                    </div>
                    <button className={cx('enroll-button')}>Đăng Ký Học</button>
                </Col>
            </Row>
        </div>
    );
}
