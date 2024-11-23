import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import Providers from "@/app/providers";

import "./config/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);
