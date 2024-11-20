import { Tag, ThemeProps } from "@chakra-ui/react";

import { UserData } from "../../entities/user/types";

const SUBSCRIPTION_COLORS: Record<
  UserData["subscriptionTier"],
  ThemeProps["colorPalette"]
> = {
  free: "cyan",
  gold: "yellow",
  basic: "blue",
  silver: "gray",
  platinum: "purple"
};

function Subscription({ value }: { value: UserData["subscriptionTier"] }) {
  return (
    <Tag.Root
      size="sm"
      variant="surface"
      colorPalette={SUBSCRIPTION_COLORS[value]}
    >
      {value}
    </Tag.Root>
  );
}

export default Subscription;
