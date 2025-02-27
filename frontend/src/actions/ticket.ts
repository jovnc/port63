"use server";

import { getConcertContract, getTicketContract } from "@/lib/ethers/contracts";
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
      take: 3,
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

export async function claimTicket({
  ticketAddress,
  buyerCUID,
}: {
  ticketAddress: string;
  buyerCUID: string;
}) {
  try {
    const ticketContract = getTicketContract(ticketAddress);
    const tx = await ticketContract.claim(buyerCUID);
    await tx.wait();

    console.log("Transaction hash: ", tx.hash);

    console.log(tx.status);

    return { success: true, message: "Ticket claimed successfully" };
  } catch (error) {
    console.error("Claim error:", error);

    return { success: false, error: "Transaction failed" };
  }
}

export async function isTicketClaimed({
  ticketAddress,
}: {
  ticketAddress: string;
}) {
  try {
    const ticketContract = getTicketContract(ticketAddress);
    const isClaimed = await ticketContract.claimed();

    return isClaimed;
  } catch (error) {
    console.error("Error checking if ticket is claimed:", error);
    return false;
  }
}

export async function getAllUserTickets({ userId }: { userId: string }) {
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

export async function sellTicket({
  userId,
  ticketAddress,
  price,
}: {
  userId: string;
  ticketAddress: string;
  price: number;
}) {
  try {
    const ticketContract = getTicketContract(ticketAddress);

    const ownerId = await ticketContract.buyerCUID();
    if (ownerId !== userId) {
      throw new Error("User does not own this ticket");
    }

    const tx = await ticketContract.putOnResale(price);
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Error updating ticket details: ", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function isSelling({ ticketAddress }: { ticketAddress: string }) {
  try {
    const ticketContract = getTicketContract(ticketAddress);
    const isSelling = await ticketContract.escrow();

    return isSelling;
  } catch (error) {
    console.error("Error checking if ticket is selling:", error);
    return false;
  }
}

export async function removeTicketListing({
  userId,
  ticketAddress,
}: {
  userId: string;
  ticketAddress: string;
}) {
  try {
    const ticketContract = getTicketContract(ticketAddress);

    const ownerId = await ticketContract.buyerCUID();
    if (ownerId !== userId) {
      throw new Error("User does not own this ticket");
    }

    const tx = await ticketContract.cancelListing(0);
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Error updating ticket details: ", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function getPrice({ ticketAddress }: { ticketAddress: string }) {
  try {
    const ticketContract = getTicketContract(ticketAddress);
    const price = await ticketContract.price();

    return price;
  } catch (error) {
    console.error("Error fetching ticket price: ", error);
    return 0;
  }
}

export async function buyResaleTicket({
  ticketAddress,
  price,
  newBuyerCUID,
}: {
  ticketAddress: string;
  price: number;
  newBuyerCUID: string;
}) {
  try {
    const ticketContract = getTicketContract(ticketAddress);
    const tx = await ticketContract.buyFromResale(newBuyerCUID);
    await tx.wait();

    // Update the ticket owner in database
    const ticket = await db.ticket.update({
      where: {
        smartContractAddress: ticketAddress,
      },
      data: {
        ownerId: newBuyerCUID,
      },
    });

    return true;
  } catch (error) {
    console.error("Error buying ticket: ", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
