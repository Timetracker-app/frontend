import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Home,
  Work,
  Workplace,
  Project,
  Worker,
  Profile,
  Error,
  Landing,
  Login,
  ProtectedRoute,
} from "./pages";

import { ErrorElement } from "./components";

// loaders
import { loader as workLoader } from "./pages/Work";
// actions

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Work />,
        errorElement: <ErrorElement />,
        loader: workLoader,
      },
      {
        path: "workplace",
        element: <Workplace />,
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "worker",
        element: <Worker />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/landing",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
