"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ClaimQRCode from "./ClaimQRCode";
import SuccessClaimScreen from "./SuccessClaimScreen";
import { toast } from "@/hooks/use-toast";
import { claimTicket } from "@/actions/ticket";

export default function ClaimTicketForm({
  smartContractAddress,
  ticketId,
  userId,
  isClaimed,
}: {
  smartContractAddress: string;
  ticketId: string;
  userId: string;
  isClaimed: boolean;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timestamp = Math.floor(Date.now() / 200);
  const data = `${ticketId}-${userId}-${timestamp}`;

  const onClaim = async () => {
    setIsLoading(true);

    // API call to claim ticket
    const { success, message } = await claimTicket({
      ticketAddress: smartContractAddress,
      buyerCUID: userId,
    });

    if (success) {
      toast({
        description: "Ticket claimed successfully",
      });
      setIsSuccess(true);
    } else {
      toast({
        description: "Failed to claim ticket",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={isClaimed}>Claim</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Claim Ticket</DialogTitle>
            <DialogDescription>
              You can only claim your ticket 4 hours before the event starts.
            </DialogDescription>
          </DialogHeader>

          {!isSuccess && (
            <div className="flex flex-col gap-4 items-center justify-center">
              <ClaimQRCode data={data} />
            </div>
          )}

          {isSuccess && (
            <SuccessClaimScreen
              transactionId={ticketId}
              setIsSuccess={setIsSuccess}
            />
          )}

          <DialogFooter className="flex flex-row justify-center gap-4">
            <p className="text-muted-foreground text-sm">
              For testing purposes: simulate claiming of ticket
            </p>
            <p className="text-muted-foreground text-sm">Ticket code: {data}</p>
            <Button type="submit" onClick={onClaim} disabled={isLoading}>
              {isLoading ? "Claiming..." : "Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
