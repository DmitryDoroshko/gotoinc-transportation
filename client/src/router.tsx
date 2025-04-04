import { createBrowserRouter } from "react-router";
import { RouterEnum } from "./constants/enums/routerEnum.ts";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
import ParcelsManagementPage from "./pages/ParcelsManagement/ParcelsManagementPage.tsx";
import AppPage from "./pages/App/AppPage.tsx";

export const router = createBrowserRouter([
  {
    path: RouterEnum.ROOT,
    element: <AppPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: RouterEnum.PARCELS_MANAGEMENT,
    element: <ParcelsManagementPage />,
    errorElement: <ErrorPage />
  }
]);