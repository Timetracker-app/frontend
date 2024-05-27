import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Home,
  Work,
  AddWork,
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
import { loader as workplaceLoader } from "./pages/Workplace";
import { loader as projectLoader } from "./pages/Project";
import { loader as workerLoader } from "./pages/Worker";
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
        path: "add-work",
        element: <AddWork />,
        errorElement: <ErrorElement />,
      },
      {
        path: "workplace",
        element: <Workplace />,
        errorElement: <ErrorElement />,
        loader: workplaceLoader,
      },
      {
        path: "add-workplace",
        //element: <AddWorkplace />,
        errorElement: <ErrorElement />,
      },
      {
        path: "project",
        element: <Project />,
        errorElement: <ErrorElement />,
        loader: projectLoader,
      },
      {
        path: "add-project",
        //element: <AddProject />,
        errorElement: <ErrorElement />,
      },
      {
        path: "worker",
        element: <Worker />,
        errorElement: <ErrorElement />,
        loader: workerLoader,
      },
      {
        path: "add-worker",
        //element: <AddWorker />,
        errorElement: <ErrorElement />,
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
