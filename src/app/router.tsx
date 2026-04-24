import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { StoryIntroPage } from "../pages/StoryIntroPage";
import { StoryPlayPage } from "../pages/StoryPlayPage";
import { StorySelectPage } from "../pages/StorySelectPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/stories", element: <StorySelectPage /> },
  { path: "/stories/:storyId", element: <StoryIntroPage /> },
  { path: "/play/:storyId", element: <StoryPlayPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "*", element: <Navigate to="/" replace /> },
];

/** Matches Vite `base` (e.g. `/Game_Engine/` on GitHub Pages). */
const basename =
  import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter(
  routes,
  basename ? { basename } : undefined,
);
