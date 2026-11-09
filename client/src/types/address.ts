export type AddressType = "Home" | "Office";

export interface Address {
  _id: string;
  user_id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  postalCode?: string;
  type: AddressType;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddressPayload {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  township: string;
  postalCode?: string;
  type: AddressType;
}

export interface AddressResponse {
  success: boolean;
  message?: string;
  address: Address;
}

export interface AddressesResponse {
  success: boolean;
  addresses: Address[];
}
