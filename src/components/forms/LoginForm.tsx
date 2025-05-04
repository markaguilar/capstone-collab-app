import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ErrorMessages from "@/components/ErrorMessages";

import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { login, selectIsLoading } from "@/features/auth/authSlice";

import { loginSchemaValidation } from "@/validation/authSchemaValidation";

import { ROUTES } from "@/utils/constant";

import { LoginInputs } from "@/types/authTypes";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchemaValidation),
    defaultValues: {
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const result = await dispatch(login(data));

    const isSuccess = login.fulfilled.match(result);
    if (isSuccess) {
      navigate(ROUTES.HOME);
    } else {
      console.error(`Login failed:`, result.payload);
      // Optional: Show error via toast or UI — already in state.auth.error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
          placeholder="your@email.com"
          required
          autoComplete="username"
        />
        {errors.email && <ErrorMessages messages={errors.email.message} />}
      </div>

      <div className="mb-6">
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <span
            className="absolute flex items-center inset-y-0 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash text-gray-700 text-lg"></i>
            ) : (
              <i className="fas fa-eye text-gray-700 text-lg"></i>
            )}
          </span>
        </div>
        {errors.password && (
          <ErrorMessages messages={errors.password.message} />
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <span className="ml-2 text-sm text-gray-600 mb-0">Remember me</span>
        </label>
        <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full login-gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition tracking-wider lg:text-base"
      >
        {isLoading ? `Logging in ...` : `Login`}
      </Button>
    </form>
  );
};

export default LoginForm;
