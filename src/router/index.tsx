import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import DogSearch from "../pages/DogSearch";
import Providers from "../Providers";
import DogMatch from "../pages/DogMatch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      {
        path: '/',
        element: <DogSearch />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/match',
        element: <DogMatch />
      }
    ]
  },

])

export default router;