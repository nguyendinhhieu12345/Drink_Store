// layout
import BlankLayout from "../layout/BlankLayout/blankLayout";
import { configRouter } from "@/configs/router";
import DefaultLayout from "@/layout/DefaultLayout/defaultLayout";
import { FC, lazy } from "react";
// pages

interface LayoutProps {
  children?: React.ReactNode;
}
export interface IRouter {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: FC<LayoutProps>;
  role: string | null;
}

const publicRoutes: IRouter[] = [
  {
    path: configRouter.login,
    component: lazy(() => import("../pages/DefaultPage/Login")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.signUp,
    component: lazy(() => import("../pages/DefaultPage/SignUp")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.forgetPassword,
    component: lazy(() => import("../pages/DefaultPage/ForgetPassword")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.resetPassword,
    component: lazy(() => import("../pages/DefaultPage/ResetPassword")),
    layout: BlankLayout,
    role: null,
  },

  {
    path: configRouter.optConfirm,
    component: lazy(() => import("../pages/DefaultPage/OTPPage")),
    layout: BlankLayout,
    role: null,
  },
  // customer router
  {
    path: configRouter.home,
    component: lazy(() => import("../pages/CustomerPage/Home")),
    layout: DefaultLayout,
    role: null,
  },

  // {
  //   path: configRouter.course,
  //   component: lazy(() => import("../pages/OverviewCourse")),
  //   layout: DefaultLayout,
  //   role: null,
  // },
];
export { publicRoutes };
