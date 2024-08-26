import React, { useEffect, useState } from "react";
import { IoAt, IoPersonOutline } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux";
import { LOGOUT } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../redux/async/profile";
import { updateProfileAsync } from "../../redux/async/updateProfile";

const ProfilePage = () => {
  const profileState = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: profileState.data.email,
    firstName: profileState.data.first_name,
    lastName: profileState.data.last_name,
  });

  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/login");
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    dispatch(
      updateProfileAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
    );
    setIsEditMode(false);
    dispatch(getProfile());
  };

  useEffect(() => {
    dispatch(getProfile());
    dispatch(
      updateProfileAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
    );
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col text-center justify-center items-center m-16">
      <form className="flex flex-col gap-4 items-center justify-center w-full">
        <img
          src={profileState.data.profile_image !== null && profileState.data.profile_image !== "https://minio.nutech-integrasi.app/take-home-test/null" ? profileState.data.profile_image : "./Profile Photo.png"}
          alt="profile-photo"
          className="w-[10%]"
        />
        <label className="z-50 mt-[-3%] ml-[7%] rounded-full border-2 p-2">
          <input type="file" className="hidden" />
          <FaPen className="text-sm" />
        </label>

        <h1 className="text-3xl font-semibold">
          {profileState.data.first_name} {profileState.data.last_name}
        </h1>

        <div className="relative my-2 w-[50%]">
          <IoAt className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-black-400" />
          <input type="email" name="email" value={formData.email} disabled className={`w-full h-10 pl-10 p-2 border rounded-md focus:outline-none ${isEditMode ? "focus:ring-2 focus:ring-red-500" : ""}`} />
        </div>

        <div className="relative my-2 w-[50%]">
          <IoPersonOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-black-400" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditMode}
            className={`w-full h-full pl-10 p-2 border rounded-md focus:outline-none ${isEditMode ? "focus:ring-2 focus:ring-red-500" : ""}`}
          />
        </div>

        <div className="relative my-2 w-[50%]">
          <IoPersonOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-black-400" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditMode}
            className={`w-full h-10 pl-10 p-2 border rounded-md focus:outline-none ${isEditMode ? "focus:ring-2 focus:ring-red-500" : ""}`}
          />
        </div>

        {isEditMode ? (
          <button type="button" className="w-[50%] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200" onClick={handleSaveClick}>
            Save Changes
          </button>
        ) : (
          <button type="button" className="w-[50%] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200" onClick={handleEditClick}>
            Edit Profile
          </button>
        )}

        {!isEditMode && (
          <button type="button" className="w-[50%] bg-white text-red-500 border-red-500 border-2 py-2 rounded-md transition-colors duration-200" onClick={handleLogout}>
            Logout
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
