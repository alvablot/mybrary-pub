import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Overview from "./routes/Overview.route";
import NewItem from "./routes/NewItem.route";
import ViewItem from "./routes/ViewItem.route";
import Landing from "./routes/Landing.route";
import EditItem from "./routes/EditItem.route";
import LoginRoute from "./routes/Login.route";
import UserProfile from "./routes/UserProfile.route";

function Root() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Overview />,
    children: [
      {
        path: "",
        element: <Overview />,
        errorElement: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "new_item",
        element: <NewItem />,
      },
      {
        path: "view-item",
        element: <ViewItem />,
      },
      {
        path: "edit-item",
        element: <EditItem />,
      },
      {
        path: "landing",
        element: <Landing />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
