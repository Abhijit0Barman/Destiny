import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../pages/api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Register component for user registration
const Register = () => {
  const {
    register, // function to register fields for validation
    watch, // function to monitor field values
    handleSubmit, // function to handle form submission
    formState: { errors }, // object containing form validation errors
  } = useForm<RegisterFormData>(); // useForm hook from react-hook-form library to handle form validation and submission

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" })
      // console.log(`Registration Successfully ok`);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
      // console.log(error.message);
    },
  });

  
  const onSubmit = handleSubmit((data) => { // onSubmit function to handle form submission
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        {/* First name field */}
        <div className="flex flex-col flex-1">
          <label className="font-bold">First Name</label>
          <input className="p-2 border rounded w-full py-1 px-2 font-normal " type="text" id="firstName"
            {...register("firstName", {
              required: "First name is required", // validation rule: required field
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              }, // validation rule: minimum length
            })
            } />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}{" "}
          {/* display error message if first name is invalid */}
        </div>

        {/* Last name field */}
        <div className="flex flex-col flex-1">
          <label className="font-bold ">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last name is required", // validation rule: required field
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              }, // validation rule: minimum length
            })}
            className="p-2 border rounded w-full py-1 px-2 font-normal"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}{" "}
          {/* display error message if last name is invalid */}
        </div>
      </div>

      {/* Email field */}
      <div className="flex flex-col">
        <label className="font-bold">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required", // validation rule: required field
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            }, // validation rule: email format
          })}
          className="p-2 border rounded w-full py-1 px-2 font-normal"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}{" "}
        {/* display error message if email is invalid */}
      </div>

      {/* Password field */}
      <div className="flex flex-col">
        <label className="font-bold">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required atleast 8 charector", // validation rule: required field
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            }, // validation rule: minimum length
          })}
          className="p-2 border rounded w-full py-1 px-2 font-normal"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}{" "}
        {/* display error message if password is invalid */}
      </div>

      {/* Confirm password field */}
      <div className="flex flex-col">
        <label className="font-bold">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm password is required atleast 8 charector", // validation rule: required field
            validate: (value) => value === watch("password") || "Passwords do not match", // validation rule: confirm password matches password field
          })}
          className="p-2 border rounded w-full py-1 px-2 font-normal"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}{" "}
        {/* display error message if confirm password is invalid */}
      </div>

      <button type="submit" className="p-2 bg-blue-600 text-white rounded w-full font-bold hover:bg-blue-500 text-xl">
        Register
      </button>
    </form>
  );
};

export default Register;