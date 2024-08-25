import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RegisterInterface } from "../../../interface/registerInterface";

export const useRegisterValidation = () => {
  const initialValue: RegisterInterface = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords doesn't match"),
  });

  return useForm<RegisterInterface>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
};
