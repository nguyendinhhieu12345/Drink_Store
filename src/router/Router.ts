// layout
import BlankLayout from "../layout/BlankLayout/blankLayout";
// import DefaultLayout from "../layout/DefaultLayout/defaultLayout";
import { configRouter } from "@/configs/router";
import AdminLayout from "@/layout/AdminLayout/adminLayout";
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
    path: configRouter.home,
    component: lazy(() => import("../pages/DefaultPage/Home")),
    layout: DefaultLayout,
    role: null,
  },

  // customer router

  // {
  //   path: configRouter.course,
  //   component: lazy(() => import("../pages/OverviewCourse")),
  //   layout: DefaultLayout,
  //   role: null,
  // },

  // employee router

  // admin router
  {
    path: configRouter.dashboardAdmin,
    component: lazy(() => import("../pages/AdminPage/DashboardAmin")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.categorys,
    component: lazy(() => import("../pages/AdminPage/Categorys")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.products,
    component: lazy(() => import("../pages/AdminPage/Products")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.profileAdmin,
    component: lazy(() => import("../pages/AdminPage/ProfileAdmin")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.ourStaff,
    component: lazy(() => import("../pages/AdminPage/OurStaff")),
    layout: AdminLayout,
    role: null,
  },

  {
    path: configRouter.orders,
    component: lazy(() => import("../pages/AdminPage/Orders")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.coupons,
    component: lazy(() => import("../pages/AdminPage/Coupons")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.customPage,
    component: lazy(() => import("../pages/AdminPage/CustomPage")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.marketing,
    component: lazy(() => import("../pages/AdminPage/Marketing")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.addMarketting,
    component: lazy(() => import("../pages/AdminPage/AddCampaign")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.addProduct,
    component: lazy(() => import("../pages/AdminPage/AddProduct")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.editProduct,
    component: lazy(() => import("../pages/AdminPage/AddProduct")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.orderDetail,
    component: lazy(() => import("../pages/AdminPage/OrderDetail")),
    layout: AdminLayout,
    role: null,
  },
  {
    path: configRouter.addBranch,
    component: lazy(() => import("../pages/AdminPage/Branchs")),
    layout: AdminLayout,
    role: null,
  },
];
export { publicRoutes };
