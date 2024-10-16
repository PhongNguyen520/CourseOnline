import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import requests from '../../utils/requests';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ModalContext } from "../../components/ModalProvider/ModalProvider";
import images from "../../assets/images";

const API_GET_PROFILE = 'User/GetUserProfile';
const API_UPDATE_PROFILE = 'User/Update-Profile';
const cx = classNames.bind(styles);

export default function Profile() {
    const { user } = useContext(ModalContext);
    const [fetchUser, setFetchUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [certificationFile, setCertificationFile] = useState(null);
    const [open, setOpen] = useState(false);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await requests.get(API_GET_PROFILE);
                if (response.data) {
                    setFetchUser(response.data);
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
        if (fileType === 'avatar') setAvatarFile(file);
        else if (fileType === 'certification') setCertificationFile(file);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!fetchUser) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <motion.div className={cx("wrapper")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box className={cx("profile-container")}>
                <Box className={cx("profile-header")}>
                    <img src={user?.avatar || images.defaultAvatar} alt="Avatar" className={cx("profile-avatar")} />
                    <Box className={cx("profile-title")}>
                        <Typography variant="h4">{fetchUser.fullName}</Typography>
                        <Typography variant="subtitle1">{fetchUser.userName}</Typography>
                    </Box>
                </Box>

                <Box className={cx("profile-details")}>
                    <Box className={cx("section")}>
                        <Typography variant="h6">Personal Information</Typography>
                        <Typography><strong>Email:</strong> {fetchUser.email}</Typography>
                        <Typography><strong>Phone Number:</strong> {fetchUser.phoneNumber}</Typography>
                        <Typography><strong>Address:</strong> {fetchUser.address}</Typography>
                        <Typography><strong>Date of Birth:</strong> {fetchUser.dob}</Typography>
                    </Box>

                    <Box className={cx("section")}>
                        <Typography variant="h6">Other</Typography>
                        <Typography><strong>Certification:</strong> {fetchUser.certification}</Typography>
                        <Typography><strong>Account Created:</strong> {fetchUser.createdDate}</Typography>
                        <Typography><strong>Status:</strong> {fetchUser.Role}</Typography>
                        <Typography><strong>Comment:</strong> {fetchUser.comment}</Typography>
                    </Box>
                </Box>

                <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                    Edit Profile
                </Button>

                <ProfileEditModal
                    open={open}
                    onClose={handleClose}
                    editedUser={editedUser}
                    onInputChange={handleInputChange}
                    onDateChange={handleDateChange}
                    onFileChange={handleFileChange}
                />

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

const ProfileEditModal = ({ open, onClose, editedUser, onInputChange, onDateChange, onFileChange }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="edit-profile-modal">
            <Box className={cx("modal-box")}>
                <Typography variant="h6" id="edit-profile-modal" gutterBottom>
                    Edit Profile
                </Typography>
                <Box component="form" className={cx("edit-form")}>
                    <TextField
                        fullWidth
                        name="fullName"
                        label="Full Name"
                        value={editedUser.fullName}
                        onChange={onInputChange}
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
                        onChange={onInputChange}
                        margin="normal"
                        InputLabelProps={{ style: { fontSize: 18 } }}
                        inputProps={{ style: { fontSize: 15, padding: '10px 14px' } }}
                    />
                    <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        value={editedUser.address}
                        onChange={onInputChange}
                        margin="normal"
                        InputLabelProps={{ style: { fontSize: 18 } }}
                        inputProps={{ style: { fontSize: 15, padding: '10px 14px' } }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={new Date(editedUser.dob)}
                            onChange={onDateChange}
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

                    <Typography variant="body1" gutterBottom>Upload Avatar</Typography>
                    <TextField
                        type="file"
                        onChange={(e) => onFileChange(e, 'avatar')}
                        inputProps={{ accept: "image/*", style: { fontSize: 14, padding: '10px 14px' } }}
                        margin="normal"
                    />

                    <Typography variant="body1" gutterBottom>Upload Certification</Typography>
                    <TextField
                        type="file"
                        onChange={(e) => onFileChange(e, 'certification')}
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
                            onClick={onClose}
                            sx={{ fontSize: '1.4rem', padding: '10px 20px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
