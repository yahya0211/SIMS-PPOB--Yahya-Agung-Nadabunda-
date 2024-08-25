import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib";
import { RegisterInterface } from "../../../interface/registerInterface";

interface IProps {
  reset: () => void;
}

export const useRegister = ({ reset }: IProps) => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
    try {
      const res = await API.post("/registration", data);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onErrorSubmit: SubmitErrorHandler<RegisterInterface> = (data) => {
    console.log("data error on:", data);
  };
  return {
    onSubmit,
    onErrorSubmit,
  };
};
