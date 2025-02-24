import { ethers } from "ethers";
import { concertFactoryAbi } from "../abi/concertFactoryAbi";
import { signer } from "./utils";
import { concertAbi } from "../abi/concertAbi";
import { ticketAbi } from "../abi/ticketAbi";

export const concertFactoryContract = new ethers.Contract(
  "0xB698821aA6ddb26e424D5da79FF3cf2Ca3709e5D",
  concertFactoryAbi,
  signer
);

export const getConcertContract = (address: string) => {
  return new ethers.Contract(address, concertAbi, signer);
};

export const getTicketContract = (address: string) => {
  return new ethers.Contract(address, ticketAbi, signer);
};
