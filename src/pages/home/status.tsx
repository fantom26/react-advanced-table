import { Badge, ThemeProps } from "@chakra-ui/react";

import { UserData } from "@/entities/user/types.ts";

const STATUSES_COLORS: Record<UserData["status"], ThemeProps["colorPalette"]> =
  {
    inactive: "green",
    active: "purple",
    banned: "red"
  };

function Status({ value }: { value: UserData["status"] }) {
  return <Badge colorPalette={STATUSES_COLORS[value]}>{value}</Badge>;
}

export default Status;
