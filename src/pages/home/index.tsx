import { Container } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import { UserData } from "@/entities/user/types.ts";
import Status from "@/pages/home/status.tsx";
import Table from "@/shared/components/table";
import getJsonData from "@/shared/helpers/get-json-data.ts";

const data: UserData[] = await getJsonData("db/users.json");

const columns: ColumnDef<UserData>[] = [
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
    enableSorting: false,
    cell: ({ row }) => row.original.role
  }
];

function Home() {
  return (
    <Container>
      <Table data={data} columns={columns} />
    </Container>
  );
}

export default Home;
