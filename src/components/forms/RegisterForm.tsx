import { useState } from "react";
import { useNavigate } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ErrorMessages from "@/components/ErrorMessages";
import { Button } from "@/components/ui/button";

import {
  selectIsLoading,
  selectIsLoginMode,
  signUp,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";

import { registerSchemaValidation } from "@/validation/authSchemaValidation";

import { ROUTES } from "@/utils/constant";

import { RegisterInputs } from "@/types/authTypes";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoginMode = useAppSelector(selectIsLoginMode);
  const isLoading = useAppSelector(selectIsLoading);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(registerSchemaValidation),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const result = await dispatch(signUp(data));

    const isSuccess = signUp.fulfilled.match(result);

    if (isSuccess) {
      navigate(ROUTES.HOME);
    } else {
      console.error(
        `${isLoginMode ? "Login" : "Signup"} failed:`,
        result.payload,
      );
      // Optional: Show error via toast or UI — already in state.auth.error
    }

    /*   if (!isLoginMode) {
      const signUpResult = await dispatch(signUp(data));
      if (signUp.fulfilled.match(signUpResult)) {
        // Navigate home only if login was successful
        navigate(ROUTES.HOME);
      } else {
        console.error("Signup failed:", signUpResult.payload);
      }
    } else {
      const resultAction = await dispatch(login(data));

      if (login.fulfilled.match(resultAction)) {
        // Navigate home only if login was successful
        navigate(ROUTES.HOME);
      } else {
        // Optional: show error feedback
        console.error("Login failed:", resultAction.payload);
      }
    }*/
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="name">Full Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
          placeholder="ex: johndoe"
          required
        />
        {errors.name && <ErrorMessages messages={errors.name.message} />}
      </div>
      <div className="mb-4">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          {...register("username")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
          placeholder="ex: johndoe123"
          required
          autoComplete="username"
        />
        {errors.username && (
          <ErrorMessages messages={errors.username.message} />
        )}
      </div>
      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          I am a
        </Label>
        <Controller
          name="role"
          control={control}
          defaultValue="student"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center">
                <RadioGroupItem
                  id="r1"
                  value="student"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="r1" className="ml-2 mb-0">
                  Student
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem
                  id="r2"
                  value="developer"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="r2" className="ml-2 mb-0">
                  Developer
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.role && <ErrorMessages messages={errors.role.message} />}
      </div>

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

      <Button
        type="submit"
        className="w-full login-gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition tracking-wider lg:text-base"
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin size-7" />
        ) : (
          `Create Account & Login`
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
