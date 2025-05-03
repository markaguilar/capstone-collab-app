import { Button } from "@/components/ui/button.tsx";
import LoginForm from "@/components/forms/LoginForm.tsx";
import RegisterForm from "@/components/forms/RegisterForm";

import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { selectIsLoginMode, setAuthMode } from "@/features/auth/authSlice";
import { selectAuthError } from "@/features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const isLoginMode = useAppSelector(selectIsLoginMode);
  const error = useAppSelector(selectAuthError);

  const handleSwitchLogin = (value: string) => {
    dispatch(setAuthMode(value));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Branding & Image */}
      <div className="login-gradient-bg text-white w-full md:w-1/2 p-10 flex flex-col justify-center items-center">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center mb-6">
            <i className="fas fa-code text-4xl mr-3"></i>
            <h1 className="text-3xl font-bold">DevConnect</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            {isLoginMode ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="mb-8">
            {isLoginMode
              ? "Connect with fellow students and developers to collaborate on projects, share knowledge, and grow together."
              : "Create your account to start collaborating on projects, finding mentors, and building your portfolio."}
          </p>
          <img
            src="https://illustrations.popsy.co/violet/creative-work.svg"
            alt="Collaboration Illustration"
            className="w-full h-auto max-w-md mx-auto"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full bg-white rounded-xl p-8 login-card-shadow">
          {/* Toggle between Login/Signup */}
          <div className="flex mb-8 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => handleSwitchLogin("login")}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ease-in-out  ${isLoginMode ? "login-toggle-active" : "text-gray-600"}`}
            >
              Login
            </button>
            <button
              onClick={() => handleSwitchLogin("sign-up")}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ease-in-out  ${!isLoginMode ? "login-toggle-active" : "text-gray-600"}`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isLoginMode ? "Login to your account" : "Create a new account"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          {isLoginMode ? <LoginForm /> : <RegisterForm />}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Button
                variant="link"
                onClick={() =>
                  handleSwitchLogin(isLoginMode ? "sign-up" : "login")
                }
                className="p-0 text-purple-600 font-medium hover:text-purple-700"
              >
                {isLoginMode ? "Register here" : "Login here"}
              </Button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="ghost"
                disabled
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-google text-red-500 text-xl"></i>
              </Button>
              <Button
                variant="ghost"
                disabled
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-github text-gray-800 text-xl"></i>
              </Button>
              <Button
                variant="ghost"
                disabled
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-linkedin text-blue-600 text-xl"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
