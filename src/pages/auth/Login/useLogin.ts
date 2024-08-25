import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { LoginInterface } from "../../../interface/loginInterface";
import { useAppDispatch } from "../../../redux";
import { loginAsync } from "../../../redux/async/auth";

interface IProps {
  reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    try {
      const res = await dispatch(loginAsync(data));
      console.log(res);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const onErrorSubmit: SubmitErrorHandler<LoginInterface> = (data) => {
    console.log("data error on:", data);
  };
  return {
    onSubmit,
    onErrorSubmit,
  };
};
