import React, { useState } from "react";
import { IoAt } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useRegisterValidation } from "../../../lib/call/validation/registerValidation";
import { useRegister } from "./useRegister";
import { Controller } from "react-hook-form";

export const RegisterPage = () => {
  const { control, reset, handleSubmit } = useRegisterValidation();
  const { onSubmit, onErrorSubmit } = useRegister({ reset });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="grid grid-cols-2 ">
      <div className="flex flex-col py-[10%] px-[10%] gap-12">
        <div className="flex gap-2  items-center justify-center">
          <div className="flex flex-col items-center justify-center  gap-8">
            <h1 className="flex items-center justify-center text-2xl font-semibold gap-2 uppercase">
              <img src="./Logo.png" alt="logo-simps" />
              sims ppob
            </h1>
            <h1 className="text-3xl text-wrap w-[80%] text-center font-semibold">Lengkapi data untuk membuat akun</h1>
          </div>
        </div>
        <div className="items-start justify-start">
          <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="relative my-8">
              <div className="flex items-center">
                <IoAt className="absolute left-3 text-lg text-gray-400" />
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col w-full">
                      <input type="email" placeholder="masukan email anda" className={`w-full h-10 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 ${fieldState.error ? "border-red-500" : "border-gray-300"}`} {...field} />
                      {fieldState.error && <p className="text-red-500 mt-1 text-sm">{fieldState.error.message}</p>}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="relative my-8">
              <IoPersonOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-gray-400" />
              <Controller
                name="first_name"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input type="text" placeholder="nama depan" className="w-full h-10 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" {...field} />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </>
                )}
              />
            </div>
            <div className="relative my-8">
              <IoPersonOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-gray-400" />
              <Controller
                name="last_name"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input type="text" placeholder="nama belakang" className="w-full h-10 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" {...field} />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
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
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </>
                )}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-lg text-gray-400" onClick={togglePasswordVisibility}>
                {passwordVisible ? <GoEye /> : <GoEyeClosed />}
              </div>
            </div>
            <div className="relative my-8">
              <MdLockOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-gray-400" />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input type={confirmPasswordVisible ? "text" : "password"} placeholder="masukan password anda" className="w-full h-10 pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" {...field} />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </>
                )}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-lg text-gray-400" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <GoEye /> : <GoEyeClosed />}
              </div>
            </div>
            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200" onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
              Registrasi
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            sudah punya akun? login{" "}
            <a href="/login" className="text-red-500 font-bold">
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
