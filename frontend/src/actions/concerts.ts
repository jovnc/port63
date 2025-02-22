"use server";

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

    return { concerts: concerts.slice(0, take), nextCursor, hasMore };
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
}: {
  name: string;
  location: string;
  genre: string;
  date: Date;
  description: string;
  imageUrl: string;
}) {
  try {
    const concert = await db.concert.create({
      data: {
        name,
        location,
        genre,
        date,
        description,
        imageUrl,
      },
    });

    return concert;
  } catch (error) {
    return null;
  }
}
