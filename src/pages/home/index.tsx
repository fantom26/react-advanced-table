import { useEffect, useState } from "react";

import {
  AbsoluteCenter,
  Container,
  Spinner,
  TableRootProps,
  Text,
  VStack
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import { UserData } from "@/entities/user/types.ts";
import Status from "@/pages/home/status.tsx";
import Table from "@/shared/components/table";
import getJsonData from "@/shared/helpers/get-json-data.ts";

const columns: ColumnDef<UserData>[] = [
  {
    header: "№",
    accessorKey: "index",
    enableSorting: true,
    cell: ({ row }) => row.index + 1
  },
  {
    header: "Id",
    accessorKey: "_id",
    enableSorting: true,
    cell: ({ row }) => row.original._id
  },
  {
    header: "Name",
    accessorKey: "name",
    enableSorting: true,
    cell: ({ row }) => row.original.name
  },
  {
    header: "Email",
    accessorKey: "email",
    enableSorting: true,
    cell: ({ row }) => row.original.email
  },
  {
    header: "Birthday",
    accessorKey: "birthday",
    enableSorting: true,
    cell: ({ row }) => row.original.birthday.toString()
  },
  {
    header: "Sex",
    accessorKey: "sex",
    enableSorting: true,
    cell: ({ row }) => row.original.sex
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
  size: "sm",
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
