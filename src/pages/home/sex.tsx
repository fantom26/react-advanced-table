import { Icon } from "@chakra-ui/react";
import { IoFemale, IoMale } from "react-icons/io5";

import { UserData } from "@/entities/user/types.ts";

function Sex({ value }: { value: UserData["sex"] }) {
  return (
    <>
      {value === "female" ? (
        <Icon fontSize="20px" color="pink">
          <IoFemale />
        </Icon>
      ) : (
        <Icon fontSize="20px" color="blue.400">
          <IoMale />
        </Icon>
      )}
    </>
  );
}

export default Sex;
