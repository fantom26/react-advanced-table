import { ReactNode } from "react";

import "@/app/config/styles/index.css";

function TailwindProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default TailwindProvider;
