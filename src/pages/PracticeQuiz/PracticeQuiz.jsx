import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PracticeQuiz.module.scss';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

const cx = classNames.bind(styles);

export default function PracticeQuiz() {
    const navigate = useNavigate();
    const sampleCourses = [
        {
            CourseId: 1,
            CourseTitle: 'Javascript',
            Author: 'John Doe',
            InstructorImageUrl: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/461184877_1080201167130354_934555959225370992_n.jpg?stp=dst-jpg_p160x160&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=792z0Y7OL7gQ7kNvgEc8Vwv&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AJepvVmWsW6XJqDQDauqRmw&oh=00_AYCTAXl27h2mXjjEzidjTkae7mVDgZ7CoFVv3lxT34FHcw&oe=6715642A',
            ShortDescription: 'Learn the basics of JavaScript, including variables and functions.',
            ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtME2Ho74uhChIuase5oqeJujVV-wmBEAWAg&s',
            Level: 'Beginner',
            chapters: [
                {
                    ChapterId: 1,
                    ChapterTitle: 'Introduction to JavaScript',
                    lessons: [
                        {
                            LessonId: 1,
                            LessonTitle: 'Lesson 1: Variables and Expressions',
                            quizzes: [
                                {QuizId: 1, QuizTitle: 'Quiz 1: Basic Variables', completed: true},
                                {QuizId: 2, QuizTitle: 'Quiz 2: Expressions and Operations'}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            CourseId: 2,
            CourseTitle: 'Python',
            Author: 'Jane Smith',
            InstructorImageUrl: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/461184877_1080201167130354_934555959225370992_n.jpg?stp=dst-jpg_p160x160&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=792z0Y7OL7gQ7kNvgEc8Vwv&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AJepvVmWsW6XJqDQDauqRmw&oh=00_AYCTAXl27h2mXjjEzidjTkae7mVDgZ7CoFVv3lxT34FHcw&oe=6715642A',
            ShortDescription: 'Learn Python programming from scratch.',
            ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJCK2FHypfNW3Oij9hVCyxQrk5h8xYJmhKQ&s',
            Level: 'Beginner',
            chapters: [
                {
                    ChapterId: 1,
                    ChapterTitle: 'Introduction to Python',
                    lessons: [
                        {
                            LessonId: 1,
                            LessonTitle: 'Lesson 1: Variables and Data Types',
                            quizzes: [
                                {QuizId: 1, QuizTitle: 'Quiz 1: Python Basics', completed: true}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            CourseId: 3,
            CourseTitle: 'React',
            Author: 'Alice Johnson',
            InstructorImageUrl: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/461184877_1080201167130354_934555959225370992_n.jpg?stp=dst-jpg_p160x160&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=792z0Y7OL7gQ7kNvgEc8Vwv&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AJepvVmWsW6XJqDQDauqRmw&oh=00_AYCTAXl27h2mXjjEzidjTkae7mVDgZ7CoFVv3lxT34FHcw&oe=6715642A',
            ShortDescription: 'Build interactive web applications with React.',
            ImageUrl: 'https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg',
            Level: 'Intermediate',
            chapters: [
                {
                    ChapterId: 1,
                    ChapterTitle: 'Getting Started with React',
                    lessons: [
                        {
                            LessonId: 1,
                            LessonTitle: 'Lesson 1: Introduction to JSX',
                            quizzes: [
                                {QuizId: 1, QuizTitle: 'Quiz 1: Understanding JSX', completed: true},
                            ]
                        }
                    ]
                }
            ]
        },
        {
            CourseId: 4,
            CourseTitle: 'Node.js',
            Author: 'Bob Brown',
            InstructorImageUrl: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/461184877_1080201167130354_934555959225370992_n.jpg?stp=dst-jpg_p160x160&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=792z0Y7OL7gQ7kNvgEc8Vwv&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AJepvVmWsW6XJqDQDauqRmw&oh=00_AYCTAXl27h2mXjjEzidjTkae7mVDgZ7CoFVv3lxT34FHcw&oe=6715642A',
            ShortDescription: 'Learn how to build server-side applications using Node.js.',
            ImageUrl: 'https://trungquandev.com/wp-content/uploads/2018/04/tong-quan-nodejs-trungquandev-02.jpg',
            Level: 'Intermediate',
            chapters: [
                {
                    ChapterId: 1,
                    ChapterTitle: 'Introduction to Node.js',
                    lessons: [
                        {
                            LessonId: 1,
                            LessonTitle: 'Lesson 1: Setting Up Node.js',
                            quizzes: [
                                {QuizId: 1, QuizTitle: 'Quiz 1: Node.js Basics'}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            CourseId: 5,
            CourseTitle: 'Django',
            Author: 'Charlie Green',
            InstructorImageUrl: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/461184877_1080201167130354_934555959225370992_n.jpg?stp=dst-jpg_p160x160&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=792z0Y7OL7gQ7kNvgEc8Vwv&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AJepvVmWsW6XJqDQDauqRmw&oh=00_AYCTAXl27h2mXjjEzidjTkae7mVDgZ7CoFVv3lxT34FHcw&oe=6715642A',
            ShortDescription: 'Build web applications using Django.',
            ImageUrl: 'https://images.ctfassets.net/aq13lwl6616q/OTaLX16ljumwlrj5KfHC0/f2e1e55a249f4ce5dc4704374f610c3c/Course_Thumbnail_-_Django_3.png',
            Level: 'Advanced',
            chapters: [
                {
                    ChapterId: 1,
                    ChapterTitle: 'Django Basics',
                    lessons: [
                        {
                            LessonId: 1,
                            LessonTitle: 'Lesson 1: Setting Up Django',
                            quizzes: [
                                {QuizId: 1, QuizTitle: 'Quiz 1: Django Setup'}
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const handleEnroll = (quizId) => {
        navigate(`/takeQuiz/${quizId}`);
    };


    return (
        <div className={cx('wrapper')}>
            <Container>
                <Accordion defaultActiveKey="0">
                    {sampleCourses.map((course, courseIndex) => (
                        <Accordion.Item eventKey={`${courseIndex}`} key={course.CourseId}>
                            <Accordion.Header className={cx('course-header')}>
                                <div className={cx('course-level')}>{course.Level}</div>
                                <Row className={cx('container_course')}>
                                    <div className={cx('course-image')}>
                                        <img src={course.ImageUrl} alt={course.CourseTitle} />
                                    </div>
                                    <Col lg={6} className={cx('course-details')}>
                                        <h5>{course.CourseTitle}</h5>
                                        <p className={cx('course-description')}>{course.ShortDescription}</p>
                                        <div className={cx('instructor-info')}>
                                            <img src={course.InstructorImageUrl} alt={course.Author} className={cx('instructor-avatar')} />
                                            <span className={cx('instructor-name')}>{course.Author}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <AnimatedProgressCircle targetProgress={75} />
                            </Accordion.Header>
                            <Accordion.Body>
                                <Accordion>
                                    {course.chapters.map((chapter, chapterIndex) => (
                                        <Accordion.Item eventKey={`${chapterIndex}`} key={chapter.ChapterId}>
                                            <Accordion.Header>
                                                <div className={cx('chapter-header')}>{chapter.ChapterTitle}</div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ul className={cx('lessons')}>
                                                    {chapter.lessons.map((lesson) => (
                                                        <li key={lesson.LessonId}>
                                                            <strong>{lesson.LessonTitle}</strong>
                                                            <ul className={cx('quizzes')}>
                                                                {lesson.quizzes.map((quiz) => (
                                                                    <li key={quiz.QuizId} className={cx('quiz-item')}>
                                                                        {quiz.QuizTitle}
                                                                            <Button
                                                                                className={cx(quiz.completed ? 'review-quiz-btn' : 'take-quiz-btn')}
                                                                            onClick={() => handleEnroll(quiz.QuizId)}
                                                                            >
                                                                                {quiz.completed ? 'Review' : 'Take Quiz'}
                                                                            </Button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Container>
        </div>
    );
}

function handleQuizButtonClick(quiz) {
    if (quiz.completed) {
        alert(`Reviewing ${quiz.QuizTitle}`);
    } else {
        alert(`Starting ${quiz.QuizTitle}`);
    }
}

function AnimatedProgressCircle({ targetProgress }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const increment = () => {
            setProgress((prev) => {
                if (prev < targetProgress) {
                    return Math.min(prev + 1, targetProgress);
                } else {
                    return prev;
                }
            });
        };

        if (progress < targetProgress) {
            const timer = setInterval(increment, 20);
            return () => clearInterval(timer);
        }
    }, [progress, targetProgress]);

    return (
        <div className={cx('progress-circle')}>
            <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                    pathColor: '#61A2C4',
                    textColor: '#61A2C4',
                    trailColor: '#d6d6d6',
                    textSize: '25px',
                })}
            />
        </div>
    );
}
