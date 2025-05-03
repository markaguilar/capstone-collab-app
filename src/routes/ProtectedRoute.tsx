import React, { useEffect } from "react";
import { Navigate } from "react-router";

import {
  me,
  selectAuthStatus,
  selectIsAuthenticated,
} from "@/features/auth/authSlice.ts";
import { useAppDispatch, useAppSelector } from "@/features/hooks.ts";
import { ROUTES } from "@/utils/constant.ts";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(me());
    }
  }, [status, dispatch]);

  if (status === "loading" || status === "idle") {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

export default ProtectedRoute;
