import { useState } from "react";
import { NavLink } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faBell } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button.tsx";

const Header = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    role: "student",
    school: "Tech University",
    avatar: `https://i.pravatar.cc/150?u=JohnDoe@gmail.com`,
    course: "Computer Science",
    capstoneIdeas: [
      {
        title: "AI Tutor for Programming",
        description: "An AI that helps students learn programming",
        date: "2023-10-01",
      },
      {
        title: "Campus Navigation App",
        description: "Mobile app to navigate university campus",
        date: "2023-09-15",
      },
    ],
    skills: ["JavaScript", "Python", "React"],
  });

  const [activeTab, setActiveTab] = useState("home");
  const [notifications, setNotifications] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("home");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 rounded-full transition duration-200 ${
      isActive ? "bg-white text-[#7c3aed]" : "hover:bg-[#4f46e5] text-white"
    }`;

  return (
    <header className="gradient-bg shadow-lg text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faCode} className="text-2xl " />
          <h1 className="text-xl font-bold ">Capstone Connect</h1>
        </NavLink>

        <nav className="hidden md:flex space-x-6 ">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          {currentUser?.role === "student" && (
            <NavLink to="/my-projects" className={navLinkClass}>
              My Projects
            </NavLink>
          )}
          {currentUser?.role === "developer" && (
            <NavLink to="/my-proposals" className={navLinkClass}>
              My Proposals
            </NavLink>
          )}
          <NavLink to="/messages" className={navLinkClass}>
            Messages
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="relative">
                <div
                  onClick={() => setActiveTab("notifications")}
                  className="bg-transparent relative p-2 px-3 rounded-full hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon={faBell} />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar}
                  alt="User"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setActiveTab("profile")}
                />
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="px-3 py-1 bg-white text-[#7c3aed] rounded-full hover:bg-gray-100"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setAuthMode("login");
                }}
                className="px-3 py-1 border border-white text-white rounded-full transition duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setAuthMode("signup");
                }}
                className="px-3 py-1 border border-white text-white rounded-full transition duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
