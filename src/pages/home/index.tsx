import { useEffect, useState } from "react";

import {
  AbsoluteCenter,
  Container,
  Image,
  Link,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import { tableCellAlign } from "@/declarations/tanstack";
import { UserData } from "@/entities/user/types.ts";
import Role from "@/pages/home/role.tsx";
import Sex from "@/pages/home/sex.tsx";
import Status from "@/pages/home/status.tsx";
import Table from "@/shared/components/table";
import getJsonData from "@/shared/helpers/get-json-data.ts";
import { DateManager } from "@/shared/managers";

import { Checkbox } from "../../components/ui/checkbox";
import Subscription from "./subscription";

const centerAlign: Record<"th" | "td", tableCellAlign> = {
  th: "center",
  td: "center"
};

const columns: ColumnDef<UserData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        name="select-row-all"
        {...{
          checked: table.getIsAllRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row, cell }) => (
      <Checkbox
        name={`select-row-${cell.id}`}
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    )
  },
  {
    header: "№",
    accessorKey: "index",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => row.index + 1
  },
  {
    header: "Name",
    accessorKey: "name",
    enableSorting: true,
    cell: ({ row }) => row.original.name
  },
  {
    header: "Avatar",
    accessorKey: "avatar",
    enableSorting: false,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => (
      <Image
        src={row.original.avatar}
        loading="lazy"
        rounded="full"
        borderRadius="full"
        fit="cover"
        boxSize="30px"
        title={row.original.name}
        alt="Avatar of user"
        style={{ display: "inline-block" }}
      />
    )
  },
  {
    header: "Email",
    accessorKey: "email",
    enableSorting: true,
    cell: ({ row }) => (
      <Link variant="underline" href={`mailto:${row.original.email}`}>
        {row.original.email}
      </Link>
    )
  },
  {
    header: "Birthday",
    accessorKey: "birthday",
    enableSorting: true,
    cell: ({ row }) => DateManager.format(row.original.birthday)
  },
  {
    header: "Last login",
    accessorKey: "lastLogin",
    enableSorting: true,
    cell: ({ row }) => DateManager.format(row.original.lastLogin)
  },
  {
    header: "Registration date",
    accessorKey: "registrationDate",
    enableSorting: true,
    cell: ({ row }) => DateManager.format(row.original.registrationDate)
  },
  {
    header: "Sex",
    accessorKey: "sex",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => <Sex value={row.original.sex} />
  },
  {
    header: "Subscription",
    accessorKey: "subscriptionTier",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => <Subscription value={row.original.subscriptionTier} />
  },
  {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => <Status value={row.original.status} />
  },
  {
    header: "Role",
    accessorKey: "role",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => <Role value={row.original.role} />
  }
];

function Home() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJsonData("db/users-300.json");

      setData(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container minHeight="100vh">
      {loading ? (
        <AbsoluteCenter>
          <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" size="xl" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        </AbsoluteCenter>
      ) : (
        <Table data={data} columns={columns} />
      )}
    </Container>
  );
}

export default Home;
