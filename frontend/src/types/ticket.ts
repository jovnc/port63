import { Concert } from "./concert";

export type Ticket = {
  id: string;
  smartContractAddress: string;
  concertId: string;
  ownerId: string;
  createdAt: Date;
  concert: Concert;
};
