import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import router from "@/app/config/routing/router.tsx";

import TailwindProvider from "./styles";

function Providers() {
  return (
    <ChakraProvider value={defaultSystem}>
      <TailwindProvider>
        <RouterProvider router={router} />
      </TailwindProvider>
    </ChakraProvider>
  );
}

export default Providers;
