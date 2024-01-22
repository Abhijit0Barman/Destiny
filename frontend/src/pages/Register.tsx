import { useForm } from "react-hook-form";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Register component for user registration
const Register = () => {
  // useForm hook from react-hook-form library to handle form validation and submission
  const {
    register, // function to register fields for validation
    watch, // function to monitor field values
    handleSubmit, // function to handle form submission
    formState: { errors }, // object containing form validation errors
  } = useForm<RegisterFormData>();

  // onSubmit function to handle form submission
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        {/* First name field */}
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First name is required", // validation rule: required field
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              }, // validation rule: minimum length
            })}
            className="p-2 border rounded"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}{" "}
          {/* display error message if first name is invalid */}
        </div>

        {/* Last name field */}
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
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
            className="p-2 border rounded"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}{" "}
          {/* display error message if last name is invalid */}
        </div>
      </div>

      {/* Email field */}
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
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
          className="p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}{" "}
        {/* display error message if email is invalid */}
      </div>

      {/* Password field */}
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required", // validation rule: required field
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            }, // validation rule: minimum length
          })}
          className="p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}{" "}
        {/* display error message if password is invalid */}
      </div>

      {/* Confirm password field */}
      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm password is required", // validation rule: required field
            validate: (value) =>
              value === watch("password") || "Passwords do not match", // validation rule: confirm password matches password field
          })}
          className="p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}{" "}
        {/* display error message if confirm password is invalid */}
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Register
      </button>
    </form>
  );
};

export default Register;

/*import { useForm } from "react-hook-form";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-500">{"This field is required"}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (val !== watch("password")) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
*/
