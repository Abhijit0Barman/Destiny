import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../pages/api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
};

function SignIn() {
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const {
        register,
        handleSubmit, // function to handle form submission
        formState: { errors }, // object containing form validation errors
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: () => {
            showToast({ message: "LogIn Success!", type: "SUCCESS" });
            // console.log(`LogIn Successfully ok`);
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
            // console.log(error.message);
        },
    });

    const onSubmit = handleSubmit((data) => {
        // onSubmit function to handle form submission
        // console.log(data);
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold ">Sign In</h2>

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

            <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded w-full font-bold hover:bg-blue-500 text-xl"
            >
                Sign In
            </button>
        </form>
    );
}

export { SignIn };
