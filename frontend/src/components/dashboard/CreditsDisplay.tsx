"use client";

import { useAccount, useBalance } from "wagmi";
import { CreditsCard } from "./CreditsCard";
import { WithdrawCreditsCard } from "./WithdrawCreditCard";

export default function CreditsDisplay() {
    const { address } = useAccount();
    const { data } = useBalance({
        address,
    });

    const result = data?.formatted;

    return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
        <CreditsCard
        amount={result || "0"}
        />
        <WithdrawCreditsCard
        amount={result || "0"}
        />
    </div>
    );
}
