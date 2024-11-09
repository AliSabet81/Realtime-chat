import * as yup from "yup";

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Name is Reqired")
    .matches(/^[a-zA-Z_ ]*$/, "No Special character allowed")
    .min(2, "Name must be between 2 and 16 characters.")
    .max(16, "Name must be between 2 and 16 characters."),
  email: yup
    .string()
    .required("Email address is required.")
    .email("Invalid email address."),
  status: yup.string().max(64, "Status must be less than 64 characters."),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
    ),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email address is required.")
    .email("Invalid email address."),
  password: yup.string().required("Password is required"),
});
