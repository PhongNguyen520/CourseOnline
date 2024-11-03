import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TakeQuiz.module.scss';
import { Container, Button, Form } from 'react-bootstrap';

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

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('quiz-container')}>
                {!isSubmitted ? (
                    <>
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
                        <Button variant="success" onClick={handleSubmitQuiz} className={cx('submit-button')}>
                            Submit
                        </Button>
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
            </Container>
        </div>
    );
}
