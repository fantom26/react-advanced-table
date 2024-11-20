import { useEffect, useState } from "react";

import {
  AbsoluteCenter,
  Container,
  Image,
  Link,
  Spinner,
  TableRootProps,
  Text,
  VStack
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import { UserData } from "@/entities/user/types.ts";
import Sex from "@/pages/home/sex.tsx";
import Status from "@/pages/home/status.tsx";
import Table from "@/shared/components/table";
import getJsonData from "@/shared/helpers/get-json-data.ts";
import { DateManager } from "@/shared/managers";

const columns: ColumnDef<UserData>[] = [
  {
    header: "№",
    accessorKey: "index",
    enableSorting: true,
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
    cell: ({ row }) => (
      <Image
        src={row.original.avatar}
        loading="lazy"
        rounded="full"
        borderRadius="full"
        fit="cover"
        boxSize="35px"
        title={row.original.name}
        alt="Avatar of user"
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
    cell: ({ row }) => <Sex value={row.original.sex} />
  },
  {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    cell: ({ row }) => <Status status={row.original.status} />
  },
  {
    header: "Role",
    accessorKey: "role",
    enableSorting: true,
    cell: ({ row }) => row.original.role
  }
];

const tableConfig: TableRootProps = {
  size: "md",
  striped: true,
  showColumnBorder: true,
  variant: "outline"
};

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
        <Table data={data} columns={columns} tableConfig={tableConfig} />
      )}
    </Container>
  );
}

export default Home;
