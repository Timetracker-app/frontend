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
import { action as addWorkAction } from "./pages/AddWork";
import { action as addWorkplaceAction } from "./pages/AddWorkplace";
import { action as addProjectAction } from "./pages/AddProject";
import { action as addWorkerAction } from "./pages/AddWorker";
import { action as loginAction } from "./pages/Login";
import { action as changePasswordAction } from "./pages/ChangePassword";

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
          element: <Work />,
          errorElement: <ErrorElement />,
          loader: workLoader,
        },
        {
          path: "work/:id",
          element: <SingleWork />,
          errorElement: <ErrorElement />,
          loader: singleWorkLoader,
        },
        {
          path: "add-work",
          element: <AddWork />,
          errorElement: <ErrorElement />,
          action: addWorkAction,
        },
        {
          path: "workplace",
          element: <Workplace />,
          errorElement: <ErrorElement />,
          loader: workplaceLoader,
        },
        {
          path: "workplace/:name",
          element: <SingleWorkplace />,
          errorElement: <ErrorElement />,
          loader: singleWorkplaceLoader,
        },
        {
          path: "add-workplace",
          element: <AddWorkplace />,
          errorElement: <ErrorElement />,
          action: addWorkplaceAction,
        },
        {
          path: "project",
          element: <Project />,
          errorElement: <ErrorElement />,
          loader: projectLoader,
        },
        {
          path: "project/:name",
          element: <SingleProject />,
          errorElement: <ErrorElement />,
          loader: singleProjectLoader,
        },
        {
          path: "add-project",
          element: <AddProject />,
          errorElement: <ErrorElement />,
          action: addProjectAction,
        },
        {
          path: "worker",
          element: <Worker />,
          errorElement: <ErrorElement />,
          loader: workerLoader,
        },
        {
          path: "worker/:name",
          element: <SingleWorker />,
          errorElement: <ErrorElement />,
          loader: singleWorkerLoader,
        },
        {
          path: "add-worker",
          element: <AddWorker />,
          errorElement: <ErrorElement />,
          action: addWorkerAction,
        },
        {
          path: "profile",
          element: <Profile />,
          errorElement: <ErrorElement />,
          loader: profileLoader,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
          errorElement: <ErrorElement />,
          action: changePasswordAction,
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
