import AddUser from "./adduser/AddUser";
import "./adduser/adduser.css";
import User from "./getuser/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./updateuser/Update";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} /> 
    </div>
  );
}

export default App;
