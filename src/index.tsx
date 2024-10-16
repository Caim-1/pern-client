import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ForumProvider } from "./context/forumContext.tsx";
import { PostsProvider } from "./context/postsContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import Root from "./pages/root.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserPage from "./pages/UserPage.tsx";
import ForumPage from "./pages/ForumPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import CreatePost from "./components/CreatePost.tsx";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "user/:userid",
        element: <UserPage />,
      },
      {
        path: "forum/:forumname",
        element: <ForumPage />,
        children: [
          //   {
          //     path: "forum/:forumname/post/:postid",
          //     element: <PostPage />,
          //   }
        ],
      },
      {
        path: "submit",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <ForumProvider>
        <PostsProvider>
          <RouterProvider router={router} />
        </PostsProvider>
      </ForumProvider>
    </UserProvider>
  </React.StrictMode>
);
