import { Router } from "express";
import  UserRoutes  from "../modules/user/user.route";
import  AuthRoutes  from "../modules/auth/auth.route";
import DashboardRoutes from "../modules/dashboard/dashboard.route";
import  WaitingListRoutes  from "../modules/waitingList/waitingList.route"


const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auths",
    route: AuthRoutes,
  },
  {
    path: "/waiting-lists",
    route: WaitingListRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
