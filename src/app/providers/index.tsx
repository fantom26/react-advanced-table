import { RouterProvider } from "react-router-dom";

import router from "@/app/config/routing/router.tsx";

import TailwindProvider from "./styles";

function Providers() {
  return (
    <TailwindProvider>
      <RouterProvider router={router} />
    </TailwindProvider>
  );
}

export default Providers;
