"use client";
import { withdrawBalance } from "@/actions/user";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

export default function WithdrawButton({
  balance,
  userId,
}: {
  balance: number;
  userId: string;
}) {
  const withdrawAction = async () => {
    const success = await withdrawBalance(userId, balance);
    if (success) {
      toast({
        description: "Withdrawal successful",
      });
    } else {
      toast({
        description: "Withdrawal failed. You may not have sufficient balance",
      });
    }
  };
  return (
    <Button onClick={withdrawAction} variant={"outline"}>
      Withdraw
    </Button>
  );
}
