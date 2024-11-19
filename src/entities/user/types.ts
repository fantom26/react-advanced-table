import { SexType } from "@faker-js/faker";

interface Address {
  street: string;
  city: string;
  zip: string;
}

interface ContactInfo {
  phone: string;
  address: Address;
}

interface Notifications {
  email: boolean;
  sms: boolean;
}

interface Preferences {
  notifications: Notifications;
  theme: string;
}

interface Meta {
  createdBy: string;
  lastUpdatedBy: string;
}

type SubscriptionTier = "free" | "basic" | "platinum" | "gold" | "silver";

export interface UserData {
  _id: string;
  name: string;
  avatar: string;
  birthday: string;
  email: string;
  status: "inactive" | "banned" | "active";
  role: string;
  registrationDate: string;
  lastLogin: string;
  actions: {
    edit: boolean;
    delete: boolean;
  };
  sex: SexType;
  subscriptionTier: SubscriptionTier;
  contactInfo: ContactInfo;
  preferences: Preferences;
  meta: Meta;
}
