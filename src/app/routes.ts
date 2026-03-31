import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Album } from "./components/Album";
import { Notes } from "./components/Notes";
import { Profile } from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "album", Component: Album },
      { path: "notes", Component: Notes },
      { path: "profile", Component: Profile },
    ],
  },
]);
