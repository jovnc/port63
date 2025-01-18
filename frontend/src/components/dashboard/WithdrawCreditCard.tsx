"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";


interface CreditCardProps {
  amount: string;
}

export function WithdrawCreditsCard({ amount }: CreditCardProps) {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
            Withdrawable Balance
        </CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{amount} POL</div>
        </CardContent>
    </Card>
  );
}
