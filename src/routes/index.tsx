import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import ExploreScreen from "../pages/ExploreScreen";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/explore",
    element: <ExploreScreen />,
  },
]);

export default router;
