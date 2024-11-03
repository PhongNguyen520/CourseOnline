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
import { format } from 'date-fns';
import ReactLoading from 'react-loading'; 

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
    const [loading, setLoading] = useState(true); 

    const fetchUserData = async () => {
        try {
            setLoading(true); 
            const response = await requests.get(API_GET_PROFILE);
            if (response.data) {
                setFetchUser(response.data);
                setEditedUser(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } 
    };

    useEffect(() => {
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

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error("User is not available.");
            return;
        }

        const formData = new FormData();
        formData.append('fullName', editedUser.fullName);
        formData.append('email', editedUser.email);
        formData.append('address', editedUser.address);
        formData.append('dob', editedUser.dob);
        if (avatarFile) formData.append('avatar', avatarFile);
        if (certificationFile) formData.append('certification', certificationFile);
        try {
            setLoading(true); 
            const response = await requests.put(`${API_UPDATE_PROFILE}/${user.userName}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.status === 200) {
                fetchUserData();
                handleClose();
                setLoading(false);
            } else {
                console.error("Failed to update profile:", response);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className={cx("wrapper")} >
            {loading ? (
                <div className={cx("loading-overlay")}>
                    <ReactLoading type="spin" color="#fff" height={60} width={60} />
                </div>
            ) :
            <Box className={cx("profile-container")}>
                <Box className={cx("profile-header")}>
                    <img src={user?.avatar || images.defaultAvatar} alt="Avatar" className={cx("profile-avatar")} />
                    <Box className={cx("profile-title")}>
                        <Typography variant="h4">{fetchUser.fullName}</Typography>
                    </Box>
                </Box>

                <Box className={cx("profile-details")}>
                    <Box className={cx("section")}>
                        <Typography variant="h6">Personal Information</Typography>
                        <Typography><strong>Email:</strong> {fetchUser.email}</Typography>
                        <Typography><strong>Phone Number:</strong> {fetchUser.phoneNumber}</Typography>
                        <Typography><strong>Address:</strong> {fetchUser.address}</Typography>
                        <Typography><strong>Date of Birth:</strong> {fetchUser.dob ? format(new Date(fetchUser.dob), 'dd/MM/yyyy') : ''}</Typography>
                        <Typography><strong>Account Created:</strong> {fetchUser.createdDate ? format(new Date(fetchUser.createdDate), 'dd/MM/yyyy') : ''}</Typography>
                    </Box>

                    <Box className={cx("section")}>
                        <Typography variant="h6">Other</Typography>
                        <Typography><strong>Certification:</strong> <img src={fetchUser.certification} alt='certificate'/></Typography>
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
                    handleSaveChanges={handleSaveChanges}
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
            }
        </div>
    );
}

const ProfileEditModal = ({ open, onClose, editedUser, onInputChange, onDateChange, onFileChange, handleSaveChanges }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="edit-profile-modal">
            <Box className={cx("modal-box")}>
                <Typography variant="h6" id="edit-profile-modal" gutterBottom>
                    Edit Profile
                </Typography>
                <Box component="form" className={cx("edit-form")} onSubmit={handleSaveChanges}>
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
                        inputProps={{ accept: "image/*", style: { fontSize: 14, padding: '10px 14px' } }}
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