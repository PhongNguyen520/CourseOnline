import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './FeedbackInstructor.module.scss';

const cx = classNames.bind(styles);

const FeedbackInstructor = () => {
  const feedback = [
    {
      id: 1,
      courseName: "React for Beginners",
      studentName: "John Doe",
      rating: 5,
      comment: "Excellent course! The content was well-structured and easy to follow.",
      date: "2024-03-15"
    },
    {
      id: 2,
      courseName: "Advanced JavaScript Patterns",
      studentName: "Jane Smith",
      rating: 4,
      comment: "Very informative but could use more practical examples.",
      date: "2024-03-14"
    }
  ];

  return (
    <div className={cx('feedbackPage', 'p-6', 'space-y-6')}>
      <h1 className={cx('title')}>Student Feedback</h1>

      <div className={cx('summaryCards', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4')}>
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Average Rating</div>
          <div className={cx('cardContent', 'flex', 'items-center', 'gap-2')}>
            <Star className={cx('icon', 'text-yellow-400')} fill="currentColor" />
            <span className={cx('value')}>4.5</span>
          </div>
        </div>
        
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Total Reviews</div>
          <div className={cx('cardContent', 'flex', 'items-center', 'gap-2')}>
            <MessageCircle className={cx('icon')} />
            <span className={cx('value')}>{feedback.length}</span>
          </div>
        </div>
        
        <div className={cx('card')}>
          <div className={cx('cardHeader')}>Response Rate</div>
          <div className={cx('cardContent')}>
            <span className={cx('value')}>98%</span>
          </div>
        </div>
      </div>

      <div className={cx('feedbackTable', 'card')}>
        <div className={cx('cardHeader')}>Recent Feedback</div>
        <div className={cx('cardContent')}>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Student</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item.id}>
                  <td>{item.courseName}</td>
                  <td>{item.studentName}</td>
                  <td>
                    <div className={cx('rating', 'flex', 'items-center')}>
                      {Array(item.rating).fill(null).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </td>
                  <td>{item.comment}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackInstructor;
