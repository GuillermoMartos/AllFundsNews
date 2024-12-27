import { createLazyFileRoute } from "@tanstack/react-router";
import LoginUserPage from "../pages/LoginUserPage";

export const Route = createLazyFileRoute("/")({
  component: LoginUserPage,
});
