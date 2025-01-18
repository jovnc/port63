import ConcertView from "@/components/shop/ConcertView";
import { concerts } from "@/data/concerts";


export default async function Shop() {
  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between">
        <h1 className="text-center text-3xl font-bold">
            Marketplace
        </h1>
      </div>

      <ConcertView concerts={concerts} />

    </div>
  );
}
