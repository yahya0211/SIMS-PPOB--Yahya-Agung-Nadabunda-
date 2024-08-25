import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux";
import Swal from "sweetalert2";
import { IServicesInterface, getServices } from "../../redux/async/services";
import logo from "./logo";
import { createTransactionAsync } from "../../redux/async/createTransaction";

const ServiceDetailPage: React.FC = () => {
  const { service_code } = useParams<{ service_code?: string }>();
  const dispatch = useAppDispatch();
  const [serviceDetail, setServiceDetail] = useState<IServicesInterface | null>(null);
  const serviceData = useAppSelector((state) => state.service.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (service_code) {
      dispatch(createTransactionAsync({ service_code }));
    }
    dispatch(getServices());
  }, [dispatch, service_code]);

  useEffect(() => {
    if (service_code) {
      const detail = serviceData.find((item) => item.service_code === service_code);
      setServiceDetail(detail || null);
    }
  }, [serviceData, service_code]);

  if (!serviceDetail) return <div>Loading...</div>;

  const matchingLogo = logo.find((item) => item.name === serviceDetail.service_code);

  const handlePayment = () => {
    if (service_code) {
      Swal.fire({
        title: `Beli listrik prabayar senilai`,
        text: `${serviceDetail.service_tariff}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan bayar",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(createTransactionAsync({ service_code }));
          navigate("/");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Service code is missing.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col h-full p-6 w-full my-20">
      <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow-lg w-full">
        <h1 className="text-xl font-semibold mb-4">Pembayaran</h1>

        <div className="flex items-center mb-6">
          {matchingLogo ? (
            <img src={matchingLogo.icon} alt={serviceDetail.service_name} className="w-10 h-10 mr-2" />
          ) : (
            <div className="w-10 h-10 mr-2 bg-gray-200" />
          )}
          <h2 className="text-lg font-medium">{serviceDetail.service_name}</h2>
        </div>

        <div className="flex items-center w-full mb-4">
          <div className="flex items-center bg-gray-100 border rounded-l-md px-3">
            <img src={matchingLogo?.icon} alt="Icon" className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={serviceDetail.service_tariff}
            className="border border-gray-300 rounded-r-md p-2 w-full"
            disabled
          />
        </div>

        <button
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md w-full"
          onClick={handlePayment}
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
