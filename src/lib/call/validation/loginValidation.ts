import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginInterface } from "../../../interface/loginInterface";

export const useLoginValidation = () => {
  const initialValue: LoginInterface = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return useForm<LoginInterface>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
};
