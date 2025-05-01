import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login data:", {
        email: formData.email,
        password: formData.password,
      });
      // Login logic here
    } else {
      console.log("Signup data:", formData);
      // Signup logic here
    }
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
            {isLogin ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="mb-8">
            {isLogin
              ? "Connect with fellow students and developers to collaborate on projects, share knowledge, and grow together."
              : "Create your account to start collaborating on projects, finding mentors, and building your portfolio."}
          </p>
          <img
            src="https://popsy.co/static/illustrations/undraw_developer_activity_re_39tg.svg"
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
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ease-in-out  ${isLogin ? "login-toggle-active" : "text-gray-600"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ease-in-out  ${!isLogin ? "login-toggle-active" : "text-gray-600"}`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isLogin ? "Login to your account" : "Create a new account"}
          </h2>

          {/*  {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}*/}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
                    placeholder="johndoe123"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={formData.role === "student"}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Student</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="developer"
                        checked={formData.role === "developer"}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Developer</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full login-gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-medium hover:text-purple-700"
              >
                {isLogin ? "Sign up here" : "Login here"}
              </button>
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
              <button
                disabled
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-google text-red-500"></i>
              </button>
              <button
                disabled
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-github text-gray-800"></i>
              </button>
              <button
                disabled
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <i className="fab fa-linkedin text-blue-600"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
