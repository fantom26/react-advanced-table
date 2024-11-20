import { Tag, ThemeProps } from "@chakra-ui/react";

import { UserData } from "@/entities/user/types.ts";

const ROLES_COLORS: Record<UserData["role"], ThemeProps["colorPalette"]> = {
  editor: "teal",
  admin: "green",
  contributor: "blue",
  moderator: "purple",
  user: "cyan"
};

function Role({ value }: { value: UserData["role"] }) {
  return (
    <Tag.Root size="sm" variant="solid" colorPalette={ROLES_COLORS[value]}>
      {value}
    </Tag.Root>
  );
}

export default Role;
