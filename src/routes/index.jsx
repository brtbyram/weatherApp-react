import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../Layouts/web";
import Home from "../pages/home";
import Contact from "../pages/contact";
import Maps from "../pages/maps";
import Error from "../pages/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "maps",
        element: <Maps />
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
]);