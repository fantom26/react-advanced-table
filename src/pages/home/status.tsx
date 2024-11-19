import { Badge } from "@chakra-ui/react";

import { UserData } from "@/entities/user/types.ts";

const STATUSES_COLORS = {
  inactive: "green",
  active: "purple",
  banned: "red"
};

function Status({ status }: { status: UserData["status"] }) {
  return <Badge colorPalette={STATUSES_COLORS[status]}>{status}</Badge>;
}

export default Status;
