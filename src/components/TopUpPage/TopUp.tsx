import React, { useState } from "react";
import { BsCreditCardFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux";
import { topUpAsync } from "../../redux/async/topUp";

const TopUpPage = () => {
  const dispatch = useAppDispatch();
  const topUpState = useAppSelector((state) => state.topUp);
  const [top_up_amount, set_top_up_amount] = useState(0);

  const handleInputChange = (e) => {
    set_top_up_amount(e.target.value);
  };

  const handleButtonClick = (value) => {
    set_top_up_amount(value);
  };

  const handleTopUp = async () => {
    dispatch(topUpAsync({ top_up_amount }));
  };

  const isDisabled = top_up_amount < 10000;

  return (
    <div className="mt-16">
      <h1>Silahkan masukkan</h1>
      <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
      <div className="mt-5 flex gap-5 items-center">
        <div className=" w-full">
          <form action="">
            <div className="flex items-center  flex-col gap-4">
              <div className="w-full flex items-center border-4 px-4 py-2 rounded-md">
                <BsCreditCardFill className="text-lg text-gray-400 mr-2" />
                <input type="number" placeholder="Masukan nominal" value={top_up_amount} onChange={handleInputChange} className="w-full focus:outline-none" />
              </div>
              <button
                className={`px-6 py-2 text-white font-semibold rounded-md transition-colors duration-200 w-full ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 w-full"}`}
                disabled={isDisabled}
                onClick={handleTopUp}
              >
                Top Up
              </button>
            </div>
          </form>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-3 justify-start">
            <div className="flex gap-4">
              <button className="px-4 py-2 border rounded-md" onClick={() => handleButtonClick(10000)}>
                Rp10.000
              </button>
              <button className="px-4 py-2 border rounded-md" onClick={() => handleButtonClick(20000)}>
                Rp20.000
              </button>
              <button className="px-4 py-2 border rounded-md" onClick={() => handleButtonClick(50000)}>
                Rp50.000
              </button>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-md" onClick={() => handleButtonClick(100000)}>
                Rp100.000
              </button>
              <button className="px-4 py-2 border rounded-md" onClick={() => handleButtonClick(250000)}>
                Rp250.000
              </button>
              <button className="px-4 py-2 border rounded-md" onClick={() => handleButtonClick(500000)}>
                Rp500.000
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;