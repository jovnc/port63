"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { removeTicketListing } from "@/actions/ticket";

export function CancelTicketListing({
  ticketAddress,
  userId,
}: {
  ticketAddress: string;
  userId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const result = await removeTicketListing({
        ticketAddress,
        userId,
      });

      toast({
        title: "Success",
        description: "Ticket listing cancelled successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel ticket listing",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="mt-2 text-xs"
      onClick={handleCancel}
      disabled={isLoading}
    >
      {isLoading ? "Cancelling..." : "Cancel"}
    </Button>
  );
}
