import { Navigate } from "react-router";

import GlobalLayout from "@/layouts/GlobalLayout.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";

import Login from "@/views/Login.tsx";

import Home from "@/views/Home.tsx";
import Projects from "@/views/Projects.tsx";
import MyProjects from "@/views/MyProjects.tsx";
import MyProposals from "@/views/MyProposals.tsx";
import Messages from "@/views/Messages.tsx";

import { paths } from "@/routes/Paths.ts";

const RoutesConfig = [
  {
    element: <GlobalLayout />,
    path: "",
    children: [
      // Auth routes (now on distinct paths)
      {
        element: <AuthLayout />,
        children: [
          {
            element: <Login />,
            path: paths.auth.login,
          },
          {
            element: <Navigate to={paths.auth.login} replace />,
            path: "/auth",
          },
        ],
      },

      // Main layout routes
      {
        element: <MainLayout />,
        children: [
          {
            element: <Home />,
            path: paths.home.root, // This is '/'
          },
          {
            element: <Projects />,
            path: paths.projects.root,
          },
          {
            element: <MyProjects />,
            path: paths.myProjects.root,
          },
          {
            element: <MyProposals />,
            path: paths.myProposals.root,
          },
          {
            element: <Messages />,
            path: paths.messages.root,
          },
        ],
      },

      // Optional: redirect unknown routes
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default RoutesConfig;
