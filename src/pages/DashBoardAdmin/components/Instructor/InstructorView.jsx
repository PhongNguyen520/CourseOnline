import React, { useState } from 'react';
import { FaUserTie, FaBan, FaPlus, FaEdit, FaTrash, FaCheck, FaInfoCircle } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './InstructorView.module.scss';

const cx = classNames.bind(styles);

const InstructorView = () => {
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Alice Brown', experience: '5 years', rating: 4.7, courses: 8, status: 'Active' },
    { id: 2, name: 'Tom Davis', experience: '8 years', rating: 4.9, courses: 12, status: 'Banned' },
    { id: 3, name: 'Sarah Lee', experience: '3 years', rating: 4.5, courses: 5, status: 'Active' },
    { id: 4, name: 'David Kim', experience: '4 years', rating: 4.3, courses: 6, status: 'Banned' }
  ]);

  const totalInstructors = instructors.length;
  const activeInstructors = instructors.filter(instr => instr.status === 'Active').length;
  const bannedInstructors = instructors.filter(instr => instr.status === 'Banned').length;

  const handleAddInstructor = () => alert('Add Instructor feature coming soon!');
  const handleEditInstructor = (instructorId) => alert(`Edit Instructor ID: ${instructorId}`);
  const handleDeleteInstructor = (instructorId) => setInstructors(instructors.filter((instr) => instr.id !== instructorId));
  const handleDetailInstructor = (instructorId) => alert(`Detail for Instructor ID: ${instructorId}`);

  return (
    <div className={cx('instructorView')}>
      <div className={cx('header')}>
        <h2>Instructor Management</h2>
        <button onClick={handleAddInstructor} className={cx('addButton')}>
          <FaPlus /> Add New Instructor
        </button>
      </div>

      <div className={cx('analyticsSection')}>
        <div className={cx('analyticsCard')}>
          <FaUserTie className={cx('icon')} />
          <div>
            <h4>Total Instructors</h4>
            <p>{totalInstructors}</p>
          </div>
        </div>
        <div className={cx('analyticsCard')}>
          <FaCheck className={cx('icon')} />
          <div>
            <h4>Active Instructors</h4>
            <p>{activeInstructors}</p>
          </div>
        </div>
        <div className={cx('analyticsCard')}>
          <FaBan className={cx('icon')} />
          <div>
            <h4>Banned Instructors</h4>
            <p>{bannedInstructors}</p>
          </div>
        </div>
      </div>

      <table className={cx('instructorsTable')}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Experience</th>
            <th>Rating</th>
            <th>Courses</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td>{instructor.id}</td>
              <td>{instructor.name}</td>
              <td>{instructor.experience}</td>
              <td>{instructor.rating}</td>
              <td>{instructor.courses}</td>
              <td className={cx({ banned: instructor.status === 'Banned' })}>{instructor.status}</td>
              <td>
                <button onClick={() => handleDetailInstructor(instructor.id)} className={cx('detailButton')}>
                  <FaInfoCircle />
                </button>
                <button onClick={() => handleEditInstructor(instructor.id)} className={cx('editButton')}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteInstructor(instructor.id)} className={cx('deleteButton')}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorView;
