import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        address: '',
        phoneNumber: '',
        fullName: '',
        picture: null,
        dob: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setFormData({ ...formData, picture: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <h2>Register for Courses</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>Date of Birth (DOB):</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />

                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        onChange={handleChange}
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
