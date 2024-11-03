import { RouterProvider } from "react-router-dom";

import router from "@/app/config/routing/router.tsx";

function Providers() {
  return <RouterProvider router={router} />;
}

export default Providers;
