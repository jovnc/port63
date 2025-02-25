"use server";

import { getConcertContract } from "@/lib/ethers/contracts";
import db from "@/lib/prisma";

export async function getUserTickets({ userId }: { userId: string }) {
  try {
    const tickets = await db.ticket.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        concert: {
          date: "asc",
        },
      },
      include: {
        concert: true,
      },
    });

    return tickets;
  } catch (error) {
    console.error("Error fetching user tickets: ", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function getTicketById({ ticketId }: { ticketId: string }) {
  try {
    const ticket = await db.ticket.findFirst({
      where: {
        id: ticketId,
      },
      include: {
        concert: true,
      },
    });

    return ticket;
  } catch (error) {
    return null;
  }
}

export async function userOwnTicket({
  userId,
  ticketId,
}: {
  userId: string;
  ticketId: string;
}) {
  try {
    const ticket = await db.ticket.findFirst({
      where: {
        id: ticketId,
        ownerId: userId,
      },
    });

    return ticket != null;
  } catch (error) {
    console.error("Error fetching user tickets: ", error);
    return false;
  }
}

export async function createTicket({
  smartContractAddress,
  concertId,
  ownerId,
}: {
  smartContractAddress: string;
  concertId: string;
  ownerId: string;
}) {
  try {
    const ticket = await db.ticket.create({
      data: {
        smartContractAddress,
        concertId,
        ownerId,
      },
    });

    return ticket;
  } catch (error) {
    console.error("Error saving ticket details to database: ", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function createTicketContract({
  name,
  concertAddress,
  buyerCUID,
}: {
  name: string;
  concertAddress: string;
  buyerCUID: string;
}): Promise<string> {
  try {
    // Create the concert
    const concertContract = getConcertContract(concertAddress);
    const tx = await concertContract.mintTicket(
      buyerCUID,
      name,
      name.slice(0, 3)
    );
    await tx.wait();

    console.log("Transaction hash: ", tx.hash);

    // Get all tickets
    const tickets = await concertContract.getAllTicketAddresses();

    // // The new ticket address will be the last one in the array
    const newTicketAddress = tickets[tickets.length - 1];
    console.log("New ticket address: ", newTicketAddress);

    return newTicketAddress;
  } catch (error) {
    console.error("Error creating ticket contract:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
