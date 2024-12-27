import { createLazyFileRoute } from "@tanstack/react-router";
import ArchivedNewsPage from "../pages/ArchivedNewsPage";

export const Route = createLazyFileRoute("/my-archives")({
  component: ArchivedNewsPage,
});
