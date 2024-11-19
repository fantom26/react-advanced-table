import { faker } from "@faker-js/faker";
import fs from "fs";

function createJsonFile(data, filename) {
  const directoryPath = "./mockup-data";
  const suffix = "json";

  if (!fs.existsSync(directoryPath)) {
    // Create the directory
    fs.mkdirSync(directoryPath);
  }

  // Convert data to JSON string with 2-space indentation
  const jsonData = JSON.stringify(data, null, 2);

  // Write file into directory
  fs.writeFileSync(`${directoryPath}/${filename}.${suffix}`, jsonData, "utf-8");

  console.log(`The file ${filename}.${suffix} was successfully created!`);
}

const generateUserData = () => {
  return {
    _id: faker.string.uuid(),
    name: faker.person.firstName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    birthday: faker.date.birthdate(),
    status: faker.helpers.arrayElement(["active", "inactive", "banned"]),
    role: faker.helpers.arrayElement([
      "user",
      "admin",
      "editor",
      "moderator",
      "contributor"
    ]),
    registrationDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
    lastLogin: faker.date.recent().toISOString(),
    sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement([
      "free",
      "basic",
      "gold",
      "silver",
      "platinum"
    ]),
    actions: {
      edit: faker.datatype.boolean(),
      delete: faker.datatype.boolean()
    },
    contactInfo: {
      phone: faker.phone.number({ style: "international" }),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zip: faker.location.zipCode()
      }
    },
    preferences: {
      notifications: {
        email: faker.datatype.boolean(),
        sms: faker.datatype.boolean()
      },
      theme: faker.helpers.arrayElement(["light", "dark"])
    },
    meta: {
      createdBy: faker.person.firstName(),
      lastUpdatedBy: faker.person.firstName()
    }
  };
};

const generateData = (numRecords) => {
  return Array.from({ length: numRecords }, generateUserData);
};

const data = generateData(2000);

createJsonFile(data, "users");
