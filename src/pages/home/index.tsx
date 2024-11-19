import { Container, Table } from "@chakra-ui/react";

import { UserData } from "@/entities/user/types.ts";
import Status from "@/pages/home/status.tsx";
import getJsonData from "@/shared/helpers/get-json-data.ts";

const data: UserData[] = await getJsonData("db/users.json");

function Home() {
  return (
    <Container>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Birthday</Table.ColumnHeader>
            <Table.ColumnHeader>Sex</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item._id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.birthday.toString()}</Table.Cell>
              <Table.Cell>{item.sex}</Table.Cell>
              <Table.Cell>
                <Status status={item.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}

export default Home;
