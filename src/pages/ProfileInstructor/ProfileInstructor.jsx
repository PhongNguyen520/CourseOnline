import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Camera,
  Edit2,
  Award,
  Users,
  Book,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import classNames from "classnames/bind";
import styles from "./ProfileInstructor.module.scss";
import { ModalContext } from "../../components/ModalProvider/ModalProvider";
import images from "../../assets/images";
import requests from "../../utils/requests";
import ReactLoading from "react-loading";
import { Button, TextField, Box, Typography, Modal } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const API_GET_PROFILE = "User/GetUserProfile";
const API_UPDATE_PROFILE = "User/Update-Profile";
const API_GET_COURSE = "Course/revenue-courses";

const mockInstructor = {
  userName: "johnsmith",
  fullName: "Nguyen Thanh Phong",
  email: "nguyenphong23042001@gmail.com",
  phoneNumber: "0338377334",
  address: "New York, USA",
  createdDate: "2022-01-15",
  certifications: [
    {
      id: 1,
      name: "Advanced Web Development",
      issuer: "Udacity",
      date: "2023",
    },
    {
      id: 2,
      name: "Machine Learning Expert",
      issuer: "Coursera",
      date: "2022",
    },
    { id: 3, name: "Unity Game Development", issuer: "Unity", date: "2023" },
  ],
  courses: [
    {
      id: 1,
      title: "Complete Web Development 2024",
      students: 1234,
      rating: 4.8,
      reviews: 156,
      img: "https://www.syntacticsinc.com/wp-content/uploads/2024/01/Syntactics-DDD-Blog-December-2023-Web-Development-Trends-for-2024-2.jpg",
    },
    {
      id: 2,
      title: "Advanced JavaScript Mastery",
      students: 892,
      rating: 4.9,
      reviews: 98,
      img: "https://i.ytimg.com/vi/k68j9xlbHHk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBBFAlsFWOxNmkuKhza5H-OOUogYQ",
    },
    {
      id: 3,
      title: "React & Redux for Beginners",
      students: 2156,
      rating: 4.7,
      reviews: 245,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9NFMLjD1kkgcQUTWrOcyTh98zCn4wxkykBw&s",
    },
  ],
  stats: {
    totalStudents: 4282,
    averageRating: 4.8,
    totalCourses: 3,
    totalReviews: 499,
  },
};

function ProfileInstructor() {
  const [profile, setProfile] = useState(mockInstructor);
  const { user } = useContext(ModalContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [fetchUser, setFetchUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [certificationFile, setCertificationFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
      setLoading(false);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await requests.get(API_GET_COURSE);
      console.log(response.data);

      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const totalStudents = courses.reduce(
    (total, course) => total + course.totalEnrollment,
    0
  );

  useEffect(() => {
    fetchUserData();
    fetchCourse();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setEditedUser((prev) => ({
      ...prev,
      dob: date,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "avatar") {
      setAvatarFile(file);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not available.");
      return;
    }

    const formData = new FormData();
    formData.append("FullName", editedUser.fullName);
    formData.append("Email", editedUser.email);
    formData.append("Address", editedUser.address);
    formData.append("DOB", editedUser.dob);
    if (avatarFile) formData.append("Avatar", avatarFile);

    try {
      setLoading(true);
      const response = await requests.put(`${API_UPDATE_PROFILE}`, formData);

      if (response.status === 200) {
        fetchUserData();
        handleCloseEditModal();
      } else {
        console.error("Failed to update profile:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleOpenEditModal = () => {
    setEditedUser(fetchUser);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setAvatarFile(null);
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

  const handleCameraClose = () => {
    setIsCameraOpen(false);
  };

  const handlePhotoCapture = (file) => {
    setAvatarFile(file);
    
    const previewUrl = URL.createObjectURL(file);
    setEditedUser((prev) => ({
      ...prev,
      avatar: previewUrl, 
    }));
  
    const formData = new FormData();
    formData.append("Avatar", file);
  
    formData.append("FullName", editedUser.fullName);
    formData.append("Email", editedUser.email);
    formData.append("Address", editedUser.address);
    formData.append("DOB", editedUser.dob);
  
    updateProfile(formData);
  };
  
  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const response = await requests.put(API_UPDATE_PROFILE, formData);
  
      if (response.status === 200) {
        fetchUserData();
        handleCloseEditModal(); 
      } else {
        console.error("Failed to update profile:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <div className={cx("loading-overlay")}>
          <ReactLoading type="spin" color="#fff" height={60} width={60} />
        </div>
      ) : (
        <>
          <button
            className={cx("back-button")}
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>

          <div className={cx("profile-body")}>
            <div className={cx("profile-header")}>
              <div className={cx("avatar-section")}>
                <div className={cx("avatar-container")}>
                  <img
                    src={fetchUser?.avatar || images.defaultAvatar}
                    alt="Profile"
                    className={cx("avatar")}
                  />
                  <button
                    className={cx("camera-button")}
                    onClick={handleCameraClick}
                  >
                    <Camera size={20} />
                  </button>

                  <CameraModal
                    open={isCameraOpen}
                    handleClose={handleCameraClose}
                    onCapture={handlePhotoCapture}
                  />
                </div>
              </div>

              <div className={cx("header-info")}>
                <div className={cx("name-section")}>
                  <h1>{fetchUser?.fullName || "Loading..."}</h1>
                  <button
                    className={cx("edit-button")}
                    onClick={handleOpenEditModal}
                    disabled={!fetchUser}
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                </div>

                <div className={cx("contact-info")}>
                  <div className={cx("info-item")}>
                    <Mail size={16} />
                    <span>{fetchUser?.email || "Loading..."}</span>
                  </div>
                  <div className={cx("info-item")}>
                    <Phone size={16} />
                    <span>{fetchUser?.phoneNumber || "Loading..."}</span>
                  </div>
                  <div className={cx("info-item")}>
                    <MapPin size={16} />
                    <span>{fetchUser?.address || "Loading..."}</span>
                  </div>
                  <div className={cx("info-item")}>
                    <Calendar size={16} />
                    <span>
                      Member since{" "}
                      {fetchUser?.createdDate
                        ? new Date(fetchUser.createdDate).toDateString()
                        : "Loading..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("stats-grid")}>
              <div className={cx("stat-card")}>
                <Users size={24} />
                <div className={cx("stat-content")}>
                  <h3>Total Students</h3>
                  <p>{totalStudents}</p>
                </div>
              </div>
              <div className={cx("stat-card")}>
                <Star size={24} />
                <div className={cx("stat-content")}>
                  <h3>Average Rating</h3>
                  <p>{profile.stats.averageRating} / 5.0</p>
                </div>
              </div>
              <div className={cx("stat-card")}>
                <Book size={24} />
                <div className={cx("stat-content")}>
                  <h3>Courses</h3>
                  <p>{courses.length}</p>
                </div>
              </div>
              <div className={cx("stat-card")}>
                <CheckCircle size={24} />
                <div className={cx("stat-content")}>
                  <h3>Reviews</h3>
                  <p>{0}</p>
                </div>
              </div>
            </div>

            <div className={cx("content-grid")}>
              <div className={cx("certifications-section")}>
                <h2>Certifications</h2>
                <div className={cx("certifications-list")}>
                  {courses.certification ? (
                    courses.certification.map((cert) => (
                      <div key={cert.id} className={cx("certification-card")}>
                        <Award size={24} />
                        <div className={cx("certification-info")}>
                          <h3>{cert.name}</h3>
                          <p>
                            {cert.issuer} • {cert.date}
                          </p>
                          <img
                            src={
                              cert.imageUrl || images.defaultCertificationImage
                            }
                            alt={cert.name}
                            className={cx("certification-image")}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={cx("empty-certification")}>
                      <Award size={24} />
                      <Typography variant="body2" color="textSecondary">
                        No certifications found. Please add your certifications!
                      </Typography>
                    </div>
                  )}
                </div>
              </div>

              <div className={cx("courses-section")}>
                <h2>My Courses</h2>
                <div className={cx("courses-list")}>
                  {courses.map((course) => (
                    <div key={course.courseCode} className={cx("course-card")}>
                      <img
                        src={course.image}
                        alt={course.courseTitle}
                        className={cx("course-image")}
                      />
                      <div className={cx("course-info")}>
                        <h3>{course.courseTitle}</h3>
                        <div className={cx("course-stats")}>
                          <span>
                            <Users size={16} />
                            {course.totalEnrollment} students
                          </span>

                          <div className={cx("course-level")}>
                            <span>
                              {course.level === 1
                                ? "Beginner"
                                : course.level === 2
                                ? "Intermediate"
                                : "Advanced"}
                            </span>
                          </div>

                          <div className={cx("course-price-info")}>
                            {course.discount > 0 && (
                              <span className={cx("course-discount-label")}>
                                -{course.discount}% OFF
                              </span>
                            )}
                            <span className={cx("course-price")}>
                              {course.discount > 0
                                ? `$${(
                                    course.price *
                                    (1 - course.discount / 100)
                                  ).toFixed(2)}`
                                : `$${course.price.toFixed(2)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ProfileEditModal
            open={openEditModal}
            onClose={handleCloseEditModal}
            editedUser={editedUser}
            onInputChange={handleInputChange}
            onDateChange={handleDateChange}
            onFileChange={handleFileChange}
            handleSaveChanges={handleSaveChanges}
          />
        </>
      )}
    </div>
  );
}

export default ProfileInstructor;

const ProfileEditModal = ({
  open,
  onClose,
  editedUser,
  onInputChange,
  onDateChange,
  onFileChange,
  handleSaveChanges,
}) => {
  if (!editedUser) {
    return null;
  }
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-profile-modal">
      <Box className={cx("modal-box")}>
        <Typography variant="h6" id="edit-profile-modal" gutterBottom>
          Edit Profile
        </Typography>
        <Box
          component="form"
          className={cx("edit-form")}
          onSubmit={handleSaveChanges}
        >
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            value={editedUser.fullName}
            onChange={onInputChange}
            margin="normal"
            InputLabelProps={{ style: { fontSize: 18 } }}
            inputProps={{ style: { fontSize: 15, padding: "10px 14px" } }}
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
            inputProps={{ style: { fontSize: 15, padding: "10px 14px" } }}
          />
          <TextField
            fullWidth
            name="address"
            label="Address"
            value={editedUser.address}
            onChange={onInputChange}
            margin="normal"
            InputLabelProps={{ style: { fontSize: 18 } }}
            inputProps={{ style: { fontSize: 15, padding: "10px 14px" } }}
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
                  inputProps={{
                    ...params.inputProps,
                    style: { fontSize: 28, padding: "10px 14px" },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <Typography variant="body1" gutterBottom>
            Upload Avatar
          </Typography>
          <TextField
            type="file"
            onChange={(e) => onFileChange(e, "avatar")}
            inputProps={{
              accept: "image/*",
              style: { fontSize: 14, padding: "10px 14px" },
            }}
            margin="normal"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ fontSize: "1.4rem", padding: "10px 20px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ fontSize: "1.4rem", padding: "10px 20px" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const CameraModal = ({ open, handleClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  React.useEffect(() => {
    let stream = null;

    if (open) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((videoStream) => {
          stream = videoStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please check permissions.");
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [open]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-photo.jpg", {
            type: "image/jpeg",
          });
          onCapture(file); // Capture and pass the file to parent component
          handleClose();
        }
      }, "image/jpeg");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="camera-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ maxWidth: "100%", maxHeight: "70vh" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <button
          onClick={capturePhoto}
          className={cx("capture-button")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Capture Photo
        </button>
      </Box>
    </Modal>
  );
};
