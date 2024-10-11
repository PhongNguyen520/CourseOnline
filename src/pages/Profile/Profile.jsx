import React, {useContext, useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import requests from '../../utils/requests';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {jwtDecode} from "jwt-decode";
import {ModalContext} from "../../components/ModalProvider/ModalProvider";

const API_GET_PROFILE = 'User/GetUserProfile';  // Adjust this endpoint as per your API
const API_UPDATE_PROFILE = 'User/Update-Profile';
const cx = classNames.bind(styles);

export default function Profile() {
    const { auth } = useContext(ModalContext);
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [certificationFile, setCertificationFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");

    const defaultUser = {
        avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
        userName: "nguyenphong",
        fullName: "Nguyễn Thành Phong",
        email: "nguyenphong@gmail.com",
        phoneNumber: "0123456789",
        address: "123 Đường ABC, Quận 1, TP HCM",
        dob: "1995-01-01",
        certification: "Chứng chỉ lập trình viên",
        createdDate: "2023-01-01",
        Role: "Instructor",
        comment: "Thành viên tích cực.",
    };

    useEffect(() => {
        if (auth.token) {
            const decodedToken = jwtDecode(auth.token);
            setUserName(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || "");
        }
        const fetchUserData = async () => {
            try {
                const response = await requests.get(API_GET_PROFILE);
                if (response.data) {
                    setUser(response.data);
                    setEditedUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setEditedUser(prev => ({ ...prev, dob: date }));
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (fileType === 'avatar') {
            setAvatarFile(file);
        } else if (fileType === 'certification') {
            setCertificationFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append form data
        for (const key in editedUser) {
            if (key !== 'avatar' && key !== 'certification') {
                formData.append(key, editedUser[key]);
            }
        }
        if (avatarFile) formData.append('Avatar', avatarFile);
        if (certificationFile) formData.append('Certification', certificationFile);

        try {
            const response = await requests.put(`${API_UPDATE_PROFILE}/${userName}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data) {
                setUser(response.data);
                setIsEditing(false);
                setOpen(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setIsEditing(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <motion.div className={cx("wrapper")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box className={cx("profile-container")}>
                <Box className={cx("profile-header")}>
                    <img src={user.avatar} alt="Avatar" className={cx("profile-avatar")} />
                    <Box className={cx("profile-title")}>
                        <Typography variant="h4">{user.fullName}</Typography>
                        <Typography variant="subtitle1">{user.userName}</Typography>
                    </Box>
                </Box>

                <Box className={cx("profile-details")}>
                    <Box className={cx("section")}>
                        <Typography variant="h6">Personal Information</Typography>
                        <Typography><strong>Email:</strong> {user.email}</Typography>
                        <Typography><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
                        <Typography><strong>Address:</strong> {user.address}</Typography>
                        <Typography><strong>Date of Birth:</strong> {user.dob}</Typography>
                    </Box>

                    <Box className={cx("section")}>
                        <Typography variant="h6">Other</Typography>
                        <Typography><strong>Certification:</strong> {user.certification}</Typography>
                        <Typography><strong>Account Created:</strong> {user.createdDate}</Typography>
                        <Typography><strong>Status:</strong> {user.Role}</Typography>
                        <Typography><strong>Comment:</strong> {user.comment}</Typography>
                    </Box>
                </Box>

                <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                    Edit Profile
                </Button>

                {/* Modal cho form chỉnh sửa */}
                <Modal open={open} onClose={handleClose} aria-labelledby="edit-profile-modal">
                    <Box className={cx("modal-box")}>
                        <Typography variant="h6" id="edit-profile-modal" gutterBottom>
                            Edit Profile
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} className={cx("edit-form")}>
                            <TextField
                                fullWidth
                                name="fullName"
                                label="Full Name"
                                value={editedUser.fullName}
                                onChange={handleInputChange}
                                margin="normal"
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 15, padding: '10px 14px' } }}
                            />

                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                                margin="normal"
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 15, padding: '10px 14px' } }}
                            />

                            <TextField
                                fullWidth
                                name="address"
                                label="Address"
                                value={editedUser.address}
                                onChange={handleInputChange}
                                margin="normal"
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 15, padding: '10px 14px' } }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={new Date(editedUser.dob)}
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: { fontSize: 28 } }}
                                            inputProps={{ ...params.inputProps, style: { fontSize: 28, padding: '10px 14px' } }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                            <Typography variant="body1" gutterBottom>
                                Upload Avatar
                            </Typography>
                            <TextField
                                type="file"
                                onChange={(e) => handleFileChange(e, 'avatar')}
                                inputProps={{ accept: "image/*", style: { fontSize: 14, padding: '10px 14px' } }}
                                margin="normal"
                            />

                            <Typography variant="body1" gutterBottom>
                                Upload Certification
                            </Typography>
                            <TextField
                                type="file"
                                onChange={(e) => handleFileChange(e, 'certification')}
                                inputProps={{ accept: ".pdf,.doc,.docx", style: { fontSize: 14, padding: '10px 14px' } }}
                                margin="normal"
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ fontSize: '1.4rem', padding: '10px 20px' }}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                    sx={{ fontSize: '1.4rem', padding: '10px 20px' }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Modal>


                <Box className={cx("social-links")}>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </Box>
            </Box>
        </motion.div>
    );
}
