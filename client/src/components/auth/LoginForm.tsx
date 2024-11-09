/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInSchema } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AuthInput } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { ROUTES } from "@/routes";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/features";

export const LoginForm = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((status: any) => status.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const handleLoginSubmit = async (data: any) => {
    const res = await dispatch(loginUser({ ...data }));
    if (res?.payload?.user) {
      navigate(ROUTES.home);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="mt-6 space-y-6"
        >
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />

          <AuthInput
            name="password"
            type="text"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {/* if we have an error */}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/* Submit button */}
          <button
            className="
            w-full 
            flex 
            justify-center 
            bg-green_1 
            text-gray-100 
            p-4 
            rounded-full 
            tracking-wide
            font-semibold 
            focus:outline-none 
            hover:bg-green_2 
            shadow-lg 
            cursor-pointer 
            transition 
            ease-in 
            duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign In"
            )}
          </button>
          {/* Sign in Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>you do not have an account ?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to={ROUTES.register}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
