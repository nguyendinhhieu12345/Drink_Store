import { configRouter } from "@/configs/router";
import { User } from "@/type";
import { Navigate, useLocation } from "react-router-dom";
interface Props {
  children: JSX.Element;
  requiredRole: string | null;
  user?: User;
}

export default function RequireAuth({ children, requiredRole, user }: Props) {
  const location = useLocation();
  // redirects to login if not login
  if (requiredRole === null) {
    if (user) {
      if (location.pathname === configRouter.login)
        return (
          <Navigate to={configRouter.home} state={{ from: location }} replace />
        );
    }
    return children;
  } else {
    if (user) {
      // redirects to home if not teacher
      if (requiredRole === "1") {
        if (user?.role === "1") return children;
        else
          return (
            <Navigate
              to={configRouter.home}
              state={{ from: location }}
              replace
            />
          );
      }

      // redirects to home if not admin
      if (requiredRole === "2") {
        if (user?.role === "2") return children;
        else
          return (
            <Navigate
              to={configRouter.home}
              state={{ from: location }}
              replace
            />
          );
      }
      return children;
    } else {
      return (
        <Navigate to={configRouter.login} state={{ from: location }} replace />
      );
    }
  }
}
