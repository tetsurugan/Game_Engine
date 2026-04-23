import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { StoryIntroPage } from "../pages/StoryIntroPage";
import { StoryPlayPage } from "../pages/StoryPlayPage";
import { StorySelectPage } from "../pages/StorySelectPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/stories", element: <StorySelectPage /> },
  { path: "/stories/:storyId", element: <StoryIntroPage /> },
  { path: "/play/:storyId", element: <StoryPlayPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
