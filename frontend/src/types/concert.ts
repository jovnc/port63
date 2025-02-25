import { Ticket } from "./ticket";

export type Concert = {
  id: string; // changed from number to string (uuid)
  smartContractAddress: string; // optional string
  name: string;
  location: string; // changed from venue to location
  genre: string;
  imageUrl: string;
  description: string | null; // optional string
  date: Date | null; // optional DateTime
  tickets?: Ticket[]; // optional array of Ticket relations
  createdAt: Date; // added DateTime field
  price: number | null;
  limit: number | null;
};
