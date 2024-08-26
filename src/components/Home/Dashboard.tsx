import React, { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../redux";
import { balanceAsync } from "../../redux/async/balance";
import { getProfile } from "../../redux/async/profile";

const Dashboard = () => {
  const balanceState = useAppSelector((state) => state.balance);
  const profileState = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [visibleBalance, setVisibleBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setVisibleBalance(!visibleBalance);
  };

  useEffect(() => {
    dispatch(balanceAsync());
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <img src={profileState.data.profile_image !== null && profileState.data.profile_image !== "https://minio.nutech-integrasi.app/take-home-test/null" ? profileState.data.profile_image : "./Profile Photo.png"} alt="profile-photo" />
          <h1 className="flex flex-col gap-2 py-1">
            Selamat datang,{" "}
            <span className="text-3xl font-semibold">
              {profileState.data.first_name} {profileState.data.last_name}
            </span>
          </h1>
        </div>
        <div>
          <img src="./Background Saldo.png" alt="background-saldo" className="-z-50" />
          <div className="my-[-20%] text-white px-5">
            <h1 className="font-semibold p-1">Saldo anda</h1>
            <h1 className="text-3xl font-semibold">Rp {visibleBalance ? balanceState.data.balance || 0 : "******"}</h1>
            <h1 className="py-5 text-sm flex">
              Lihat saldo{" "}
              <button className="px-2 py-1 h-[5px]" onClick={toggleBalanceVisibility}>
                {visibleBalance ? <GoEyeClosed /> : <GoEye />}
              </button>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
