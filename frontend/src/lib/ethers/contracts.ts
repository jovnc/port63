import { ethers } from "ethers";
import { concertFactoryAbi } from "../abi/concertFactoryAbi";
import { signer } from "./utils";
import { concertAbi } from "../abi/concertAbi";
import { ticketAbi } from "../abi/ticketAbi";

// const address = process.env.CONCERT_FACTORY_ADDRESS as string;

export const concertFactoryContract = new ethers.Contract(
  "0x6813cB88ED2B0A9348904ba108fDea3398bd1088",
  concertFactoryAbi,
  signer
);

export const getConcertContract = (address: string) => {
  return new ethers.Contract(address, concertAbi, signer);
};

export const getTicketContract = (address: string) => {
  return new ethers.Contract(address, ticketAbi, signer);
};
