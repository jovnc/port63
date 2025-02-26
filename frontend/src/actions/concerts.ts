"use server";

import {
  concertFactoryContract,
  getConcertContract,
} from "@/lib/ethers/contracts";
import db from "@/lib/prisma";

export async function getUpcomingConcerts() {
  try {
    const concerts = await db.concert.findMany({
      where: {
        date: {
          gt: new Date(),
        },
      },
      take: 10,
      orderBy: {
        date: "desc",
      },
    });

    return concerts;
  } catch (error) {
    return [];
  }
}

export async function getConcerts(cursor: string | null, take: number = 10) {
  try {
    const concerts = await db.concert.findMany({
      where: {
        date: {
          gt: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
      take: take + 1, // Fetch one extra item to check if there are more items
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });

    if (!concerts) {
      throw new Error("Concerts not found");
    }

    const hasMore = concerts.length > take;
    const nextCursor = hasMore ? concerts[concerts.length - 2].id : null;

    return { concerts, nextCursor, hasMore };
  } catch (error) {
    return { concerts: [], nextCursor: null, hasMore: false };
  }
}

export async function getConcertById(id: string) {
  try {
    const concert = await db.concert.findUnique({
      where: {
        id,
      },
    });
    return { concert };
  } catch (error) {
    return null;
  }
}

export async function createConcert({
  name,
  location,
  genre,
  date,
  description,
  imageUrl,
  limit,
  price,
  smartContractAddress,
}: {
  name: string;
  location: string;
  genre: string;
  date: Date;
  description: string;
  imageUrl: string;
  limit: number;
  price: number;
  smartContractAddress: string;
}) {
  try {
    await db.concert.create({
      data: {
        smartContractAddress,
        name,
        location,
        genre,
        date,
        description,
        imageUrl,
        limit,
        price,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createConcertContract({
  date,
  limit,
}: {
  date: Date;
  limit: number;
}): Promise<string> {
  try {
    // Convert Date to Unix timestamp (seconds since epoch)
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    // Create the concert
    const tx = await concertFactoryContract.createConcert(unixTimestamp, limit);
    await tx.wait();

    console.log("Transaction hash: ", tx.hash);

    // Get all concerts
    const concerts = await concertFactoryContract.getConcerts();

    // The new concert address will be the last one in the array
    const newConcertAddress = concerts[concerts.length - 1];

    console.log("New concert address: ", newConcertAddress);

    return newConcertAddress;
  } catch (error) {
    console.error("Error creating concert contract:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

// export async function getConcertListings({
//   concertAddress,
// }: {
//   concertAddress: string;
// }) {
//   try {
//     const concertContract = getConcertContract(concertAddress);
//     const listings = await concertContract.getAllTicketListings();

//     console.log(listings);

//     return { ticketIds: listings.ticketIds, prices: listings.prices };
//   } catch (error) {
//     console.error("Error fetching concert listings:", error);
//     throw error;
//   }
// }
