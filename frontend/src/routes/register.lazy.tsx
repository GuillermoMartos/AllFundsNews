import { createLazyFileRoute } from "@tanstack/react-router";
import RegisterUserPage from "../pages/RegisterUserPage";

export const Route = createLazyFileRoute("/register")({
  component: RegisterUserPage,
});
