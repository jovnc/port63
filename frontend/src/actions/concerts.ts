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
    }
    catch (error) {
        return [];
    }
}