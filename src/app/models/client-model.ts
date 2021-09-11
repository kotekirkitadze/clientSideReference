export interface Client {
  id: number;
  name: string;
  lastName: string;
  sex: Sex;
  personalNumber: number;
  phoneNumber: number;
  legalAddress: Address;
  livingAddress: Address;
  accData?: string;
}

interface Address {
  country: string;
  city: string;
  streetAddress: string;
}

enum Sex {
  Male = 'Male',
  Female = 'Female'
}
