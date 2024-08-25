import React, { useEffect } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import logo from "./logo";
import { Swiper, SwiperSlide } from "swiper/react";
import BANNER_ITEM from "./BANNER_ITEM";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "../../redux";
import { getServices } from "../../redux/async/services";
import { NavLink } from "react-router-dom";

const HomeComponents = () => {
  const { data: serviceData = [] } = useAppSelector((state) => state.service);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div className="mb-28">
      <div className="flex my-16 gap-3 justify-around w-full">
        {logo.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {serviceData[index] ? (
              <NavLink to={`/services/${serviceData[index].service_code}`} className="flex flex-col items-center text-center">
                <img src={item.icon} alt={item.label} className="w-16 h-16 mb-2" />
                <h1 className="text-xs font-semibold text-wrap w-[80%]">{serviceData[index].service_name}</h1>
              </NavLink>
            ) : (
              <div className="flex flex-col items-center text-center">
                <img src={item.icon} alt={item.label} className="w-16 h-16 mb-2" />
                <h1 className="text-xs font-semibold text-wrap w-[80%]">No Data</h1>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <h1 className="font-semibold my-5">Temukan promo menarik</h1>
        <Swiper className="mySwiper" slidesPerView={4} spaceBetween={10}>
          {BANNER_ITEM.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image} alt={item.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeComponents;
