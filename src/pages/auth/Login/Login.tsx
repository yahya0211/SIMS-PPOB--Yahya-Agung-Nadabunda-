import React, { useEffect, useState } from "react";
import { IoAt } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useAppSelector } from "../../../redux";
import { useLoginValidation } from "../../../lib/call/validation/loginValidation";
import { useLoginFunction } from "./useLogin";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";

export const Login = () => {
  const authState = useAppSelector((state) => state.auth);
  const { control, reset, handleSubmit } = useLoginValidation();
  const { onSubmit, onErrorSubmit } = useLoginFunction({ reset });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [authState, navigate]);

  return (
    <div className="grid grid-cols-2 ">
      <div className="flex flex-col py-[10%] px-[10%] gap-12">
        <div className="flex gap-2  items-center justify-center">
          <div className="flex flex-col items-center justify-center  gap-8">
            <h1 className="flex items-center justify-center text-2xl font-semibold gap-2 uppercase">
              <img src="./Logo.png" alt="logo-simps" />
              sims ppob
            </h1>
            <h1 className="text-3xl text-wrap w-[70%] text-center font-semibold">Masuk atau buat akun untuk memulai</h1>
          </div>
        </div>
        <div className="items-start justify-start">
          <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="relative my-8">
              <IoAt className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-gray-400" />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input type="email" placeholder="masukan email anda" className="w-full h-10 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" {...field} />
                    {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>}
                  </>
                )}
              />
            </div>

            <div className="relative my-8">
              <MdLockOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-gray-400" />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input type={passwordVisible ? "text" : "password"} placeholder="masukan password anda" className="w-full h-10 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" {...field} />
                    {fieldState.error && <span className="text-red-500 text-sm">{fieldState.error.message}</span>}  
                  </>
                )}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-lg text-gray-400" onClick={togglePasswordVisibility}>
                {passwordVisible ? <GoEye /> : <GoEyeClosed />}
              </div>
            </div>
            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200" onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            belum punya akun? registrasi{" "}
            <a href="/register" className="text-red-500 font-bold">
              di sini
            </a>
          </p>
        </div>
      </div>
      <div>
        <img src="./Illustrasi Login.png" alt="login-image" className="w-screen" />
      </div>
    </div>
  );
};
