import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Button } from "@/components/ui/button.tsx";

import { useAppDispatch, useAppSelector } from "@/features/hooks.ts";
import { selectSwitchLogin } from "@/features/login/loginSlice";

import { login, signUp } from "@/features/auth/authSlice.ts";
import { useNavigate } from "react-router";

type Inputs = {
  name: string;
  username: string;
  role: string;
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectSwitchLogin);

  const { register, control, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (!isLogin) {
      dispatch(signUp(data));
    } else {
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
        />
      </div>

      <div className="mb-6">
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </Label>
        <Input
          type="password"
          id="password"
          {...register("password")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
          placeholder="••••••••"
          required
        />
      </div>

      {isLogin && (
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
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
