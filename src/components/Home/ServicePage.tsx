import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux";
import Swal from "sweetalert2";
import { IServicesInterface, getServices } from "../../redux/async/services";
import logo from "./logo";
import { createTransactionAsync } from "../../redux/async/createTransaction";
import { balanceAsync } from "../../redux/async/balance";
import { TfiCreditCard } from "react-icons/tfi";

const ServiceDetailPage: React.FC = () => {
  const { service_code } = useParams<{ service_code?: string }>();
  const dispatch = useAppDispatch();
  const [serviceDetail, setServiceDetail] = useState<IServicesInterface | null>(null);
  const serviceData = useAppSelector((state) => state.service.data);
  const navigate = useNavigate();

  useEffect(() => {}, [dispatch, service_code]);

  useEffect(() => {
    dispatch(balanceAsync());
    if (service_code) {
      const detail = serviceData.find((item) => item.service_code === service_code);
      setServiceDetail(detail || null);
    }
  }, [serviceData, service_code]);

  if (!serviceDetail) return <div>Loading...</div>;

  const matchingLogo = logo.find((item) => item.name === serviceDetail.service_code);

  const handlePayment = async () => {
    if (service_code) {
      Swal.fire({
        title: `Beli listrik prabayar senilai`,
        text: `${serviceDetail.service_tariff}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        inputValue: serviceDetail.service_tariff,
        confirmButtonText: "Ya, lanjutkan bayar",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const transactionResponse = await dispatch(createTransactionAsync({ service_code })).unwrap();

            const balanceResponse = await dispatch(balanceAsync()).unwrap();
            navigate("/");

            Swal.fire({
              title: "Pembayaran Berhasil",
              text: `Saldo Anda sekarang: ${balanceResponse.data.balance}`,
              icon: "success",
              confirmButtonText: "OK",
            });
          } catch (error) {
            Swal.fire({
              title: `Pembayaran ${serviceDetail.service_name} sebesar`,
              text: `${serviceDetail.service_tariff} gagal`,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
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
          <img src={matchingLogo?.icon} alt="Icon" className="w-10 h-10 mr-4" />
          <h2 className="text-lg font-medium">{serviceDetail.service_name}</h2>
        </div>

        <div className="flex items-center w-full mb-4">
          <div className="flex items-center  border rounded-l-md px-3 w-full bg-white">
            <TfiCreditCard className="mr-5" />
            <input type="text" value={serviceDetail.service_tariff} className="border border-gray-300 rounded-r-md p-2 w-full" disabled />
          </div>
        </div>

        <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md w-full" onClick={handlePayment}>
          Bayar
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
