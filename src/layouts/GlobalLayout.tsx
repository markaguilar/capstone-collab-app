import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 font-sans"
      style={{ overflow: "hidden" }}
    >
      <Outlet />
    </div>
  );
};

export default GlobalLayout;
