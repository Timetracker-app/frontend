import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Home,
  Work,
  AddWork,
  Workplace,
  AddWorkplace,
  Project,
  AddProject,
  Worker,
  AddWorker,
  Profile,
  Error,
  Landing,
  Login,
  ProtectedRoute,
  SingleWork,
  SingleWorker,
  SingleProject,
  SingleWorkplace,
  ChangePassword,
} from "./pages";

import { ErrorElement } from "./components";

// loaders
import { loader as workLoader } from "./pages/Work";
import { loader as workplaceLoader } from "./pages/Workplace";
import { loader as projectLoader } from "./pages/Project";
import { loader as workerLoader } from "./pages/Worker";
import { loader as singleWorkLoader } from "./pages/SingleWork";
import { loader as singleWorkerLoader } from "./pages/SingleWorker";
import { loader as singleProjectLoader } from "./pages/SingleProject";
import { loader as singleWorkplaceLoader } from "./pages/SingleWorkplace";
import { loader as profileLoader } from "./pages/Profile";

// actions
import { action as loginAction } from "./pages/Login";

import useToken from "./features/useToken";

const App = () => {
  const { setToken } = useToken();

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
          element: (
            <ProtectedRoute>
              <Work />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: workLoader,
        },
        {
          path: "work/:id",
          element: (
            <ProtectedRoute>
              <SingleWork />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: singleWorkLoader,
        },
        {
          path: "add-work",
          element: (
            <ProtectedRoute>
              <AddWork />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: workLoader,
        },
        {
          path: "workplace",
          element: (
            <ProtectedRoute>
              <Workplace />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: workplaceLoader,
        },
        {
          path: "workplace/:name",
          element: (
            <ProtectedRoute>
              <SingleWorkplace />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: singleWorkplaceLoader,
        },
        {
          path: "add-workplace",
          element: (
            <ProtectedRoute>
              <AddWorkplace />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
        },
        {
          path: "project",
          element: (
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: projectLoader,
        },
        {
          path: "project/:name",
          element: (
            <ProtectedRoute>
              <SingleProject />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: singleProjectLoader,
        },
        {
          path: "add-project",
          element: (
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
        },
        {
          path: "worker",
          element: (
            <ProtectedRoute>
              <Worker />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: workerLoader,
        },
        {
          path: "worker/:name",
          element: (
            <ProtectedRoute>
              <SingleWorker />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: singleWorkerLoader,
        },
        {
          path: "add-worker",
          element: (
            <ProtectedRoute>
              <AddWorker />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
          loader: profileLoader,
        },
        {
          path: "change-password",
          element: (
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          ),
          errorElement: <ErrorElement />,
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
      action: loginAction(setToken),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
