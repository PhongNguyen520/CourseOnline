import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TakeQuiz.module.scss';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        answer: "Harper Lee"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Iron", "Carbon"],
        answer: "Oxygen"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        answer: "Leonardo da Vinci"
    }
];

export default function TakeQuiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); 

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsSubmitted(true);
        }
    }, [timeLeft, isSubmitted]);

    const handleOptionChange = (questionIndex, selectedOption) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: selectedOption
        }));
    };

    const handleSubmitQuiz = () => {
        setIsSubmitted(true);
    };

    const calculateScore = () => {
        return quizData.reduce((score, question, index) => {
            if (userAnswers[index] === question.answer) {
                score += 1;
            }
            return score;
        }, 0);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('quiz-container')}>
                <Row>
                    <Col md={8}>
                        {!isSubmitted ? (
                            <>
                                <h2 className={cx('quiz-title')}>Quiz Time!</h2>
                                {quizData.map((questionData, index) => (
                                    <div key={index} className={cx('question-section')}>
                                        <h4>{index + 1}. {questionData.question}</h4>
                                        <Form>
                                            {questionData.options.map((option, optionIndex) => (
                                                <Form.Check 
                                                    key={optionIndex}
                                                    type="radio"
                                                    id={`question-${index}-option-${optionIndex}`}
                                                    name={`question-${index}`}
                                                    label={option}
                                                    value={option}
                                                    checked={userAnswers[index] === option}
                                                    onChange={() => handleOptionChange(index, option)}
                                                    className={cx('option')}
                                                />
                                            ))}
                                        </Form>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className={cx('result-section')}>
                                <h3>Your Score: {calculateScore()} / {quizData.length}</h3>
                                <div className={cx('review-section')}>
                                    {quizData.map((questionData, index) => (
                                        <div key={index} className={cx('review-question')}>
                                            <h5>{index + 1}. {questionData.question}</h5>
                                            <p>
                                                Your Answer: <strong>{userAnswers[index]}</strong> {userAnswers[index] === questionData.answer ? "✅" : "❌"}
                                            </p>
                                            <p>Correct Answer: <strong>{questionData.answer}</strong></p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="primary" onClick={() => window.location.reload()}>
                                    Retake Quiz
                                </Button>
                            </div>
                        )}
                    </Col>
                    <Col md={4} className={cx('timer-container')}>
                        <div className={cx('timer-box')}>
                            <h3>Time Left</h3>
                            <div className={cx('timer-display')}>{formatTime(timeLeft)}</div>
                            <p className={cx('instruction')}>Complete the quiz before time runs out!</p>
                            <Button variant="success" onClick={handleSubmitQuiz} className={cx('submit-button')}>
                                Submit Quiz
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
