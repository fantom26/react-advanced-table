import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { tableCellAlign } from "@/declarations/tanstack";
import { UserData } from "@/entities/user/types.ts";
import Table from "@/shared/components/table";
import getJsonData from "@/shared/helpers/get-json-data.ts";
import { DateManager } from "@/shared/managers";

const centerAlign: Record<"th" | "td", tableCellAlign> = {
  th: "center",
  td: "center"
};

const columns: ColumnDef<UserData>[] = [
  {
    id: "select",
    size: 40,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        name="select-row-all"
        {...{
          checked: table.getIsAllRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row, cell }) => (
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
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
    enableSorting: false,
    size: 40,
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
      <img
        src={row.original.avatar}
        className="rounded-full object-cover w-9 h-9 inline-block"
        loading="lazy"
        title={row.original.name}
        alt="Avatar of user"
      />
    )
  },
  {
    header: "Email",
    accessorKey: "email",
    enableSorting: true,
    size: 240,
    cell: ({ row }) => (
      <a className="underline" href={`mailto:${row.original.email}`}>
        {row.original.email}
      </a>
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
    cell: ({ row }) => row.original.sex
  },
  {
    header: "Phone number",
    accessorKey: "contactInfo.phone",
    enableSorting: true,
    cell: ({ row }) => (
      <a className="underline" href={`tel:${row.original.contactInfo.phone}`}>
        {row.original.contactInfo.phone}
      </a>
    )
  },
  {
    header: "Subscription",
    accessorKey: "subscriptionTier",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => row.original.subscriptionTier
  },
  {
    header: "Created by",
    accessorKey: "meta.createdBy",
    enableSorting: true,
    cell: ({ row }) => row.original.meta.createdBy
  },
  {
    header: "Last updated by",
    accessorKey: "meta.lastUpdatedBy",
    enableSorting: true,
    cell: ({ row }) => row.original.meta.lastUpdatedBy
  },
  {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => row.original.status
  },
  {
    header: "Role",
    accessorKey: "role",
    enableSorting: true,
    meta: {
      textAlign: centerAlign
    },
    cell: ({ row }) => row.original.role
  }
];

function Home() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJsonData("db/users.json");

      setData(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container min-h-full">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Table data={data} columns={columns} />
      )}
    </div>
  );
}

export default Home;
