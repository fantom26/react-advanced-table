import { Icon } from "@chakra-ui/react";
import { IoFemale, IoMale } from "react-icons/io5";

import { UserData } from "@/entities/user/types.ts";

function Sex({ value }: { value: UserData["sex"] }) {
  return (
    <Icon fontSize="20px">
      {value === "female" ? <IoFemale /> : <IoMale />}
    </Icon>
  );
}

export default Sex;
