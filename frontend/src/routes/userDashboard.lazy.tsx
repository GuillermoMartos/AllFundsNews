import { createLazyFileRoute } from "@tanstack/react-router";
import UserDashboardPage from "../pages/UserDashboardPage";

export const Route = createLazyFileRoute("/userDashboard")({
  component: UserDashboardPage,
});
