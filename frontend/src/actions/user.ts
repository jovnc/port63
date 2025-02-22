"use server";

import db from "@/lib/prisma";

export async function getUserBalance(userId: string): Promise<number> {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        balance: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.balance as number;
  } catch (error) {
    return 0;
  }
}

export async function withdrawBalance(userId: string, amount: number) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        balance: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if ((user.balance as number) < amount) {
      throw new Error("Insufficient balance");
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}
