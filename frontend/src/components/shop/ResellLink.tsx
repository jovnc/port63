import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ResellLink({ id }: { id: string }) {
  return (
    <div className="flex flex-row gap-4 mt-8">
      <p className="text-muted-foreground text-sm">
        Resale market will only be open 1 week after concert ticket sales or
        when the concert is sold out.
      </p>
      <Button asChild variant={"outline"}>
        <Link href={`/shop/${id}/resell`}>View resale market</Link>
      </Button>
    </div>
  );
}
