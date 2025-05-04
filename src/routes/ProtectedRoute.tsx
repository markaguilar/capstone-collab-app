import React, { useEffect } from "react";
import { Navigate } from "react-router";

import SkeletonLoading from "@/components/SkeletonLoading";

import {
  me,
  selectAuthStatus,
  selectIsAuthenticated,
} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";

import { ROUTES } from "@/utils/constant";

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
    return <SkeletonLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

export default ProtectedRoute;
