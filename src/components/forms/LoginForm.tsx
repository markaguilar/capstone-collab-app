import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { selectSwitchLogin } from "@/features/global/globalSlice";
import { login, signUp } from "@/features/auth/authSlice";

import { LoginRegisterInputs } from "@/types/authTypes";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectSwitchLogin);

  const { register, control, handleSubmit } = useForm<LoginRegisterInputs>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginRegisterInputs> = async (data) => {
    console.log(data);
    if (!isLogin) {
      const signUpResult = await dispatch(signUp(data));
      if (signUp.fulfilled.match(signUpResult)) {
        // Navigate to home only if login was successful
        navigate("/");
      } else {
        console.error("Signup failed:", signUpResult.payload);
      }
    } else {
      // console.log("login", data);
      const resultAction = await dispatch(login(data));

      if (login.fulfilled.match(resultAction)) {
        // Navigate to home only if login was successful
        navigate("/");
      } else {
        // Optional: show error feedback
        console.error("Login failed:", resultAction.payload);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isLogin && (
        <>
          <div className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              {...register("username")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
              placeholder="johndoe123"
              required
            />
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
          </div>
        </>
      )}

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
      </div>

      {isLogin && (
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
      )}

      <Button
        type="submit"
        className="w-full login-gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition tracking-wider lg:text-base"
      >
        {isLogin ? "Login" : "Create Account & Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
