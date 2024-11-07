import React, { useState } from 'react';
import { FaUserGraduate, FaBan, FaCheck, FaPlus, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './StudentView.module.scss';

const cx = classNames.bind(styles);

export default function StudentView() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', age: 20, grade: 'A', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 22, grade: 'B', status: 'Banned' },
    { id: 3, name: 'Emily Johnson', age: 21, grade: 'A', status: 'Active' },
    { id: 4, name: 'Michael Brown', age: 23, grade: 'C', status: 'Banned' },
  ]);

  const totalStudents = students.length;
  const activeStudents = students.filter(student => student.status === 'Active').length;
  const bannedStudents = students.filter(student => student.status === 'Banned').length;

  const handleAddStudent = () => alert('Add Student feature coming soon!');
  const handleEditStudent = (studentId) => alert(`Edit Student ID: ${studentId}`);
  const handleDeleteStudent = (studentId) => setStudents(students.filter((student) => student.id !== studentId));
  const handleDetailInstructor = (instructorId) => alert(`Detail for Instructor ID: ${instructorId}`);

  return (
    <div className={cx('studentView')}>
      <div className={cx('header')}>
        <h2>Student Management</h2>
        <button onClick={handleAddStudent} className={cx('addButton')}>
          <FaPlus /> Add New Student
        </button>
      </div>

      <div className={cx('analyticsSection')}>
        <div className={cx('analyticsCard')}>
          <FaUserGraduate className={cx('icon')} />
          <div>
            <h4>Total Students</h4>
            <p>{totalStudents}</p>
          </div>
        </div>
        <div className={cx('analyticsCard')}>
          <FaCheck className={cx('icon')} />
          <div>
            <h4>Active Students</h4>
            <p>{activeStudents}</p>
          </div>
        </div>
        <div className={cx('analyticsCard')}>
          <FaBan className={cx('icon')} />
          <div>
            <h4>Banned Students</h4>
            <p>{bannedStudents}</p>
          </div>
        </div>
      </div>

      <table className={cx('studentsTable')}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td className={cx({ banned: student.status === 'Banned' })}>{student.status}</td>
              <td>
              <button onClick={() => handleDetailInstructor(student.id)} className={cx('detailButton')}>
                  <FaInfoCircle />
                </button>
                <button onClick={() => handleEditStudent(student.id)} className={cx('editButton')}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteStudent(student.id)} className={cx('deleteButton')}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
