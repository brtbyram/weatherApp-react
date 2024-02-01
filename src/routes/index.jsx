import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../Layouts/web";
import Home from "../pages/home";
import Contact from "../pages/contact";
import Maps from "../pages/maps";
import Error from "../pages/error";
import Astronomy from "../pages/astronomy";
import HistoricalWeather from "../pages/historical-weather";
import DailyWeather from "../pages/daily-weather";
import HourlyWeather from "../pages/hourly-weather";
import Settings from "../pages/settings";
import TodayWeather from "../pages/today-weather";

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
        path: "today-weather",
        element: <TodayWeather/>
      },
      {
        path: "hourly-weather",
        element: <HourlyWeather/>
      },
      {
        path: "daily-weather",
        element: <DailyWeather />
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
        path: "astronomy",
        element: <Astronomy />
      },
      {
        path: "historical-weather",
        element: <HistoricalWeather />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
]);