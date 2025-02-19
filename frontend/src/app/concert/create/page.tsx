import { CreateConcertForm } from "@/components/concert/CreateConcertForm";


export default async function Dashboard() {
  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between">
        <h1 className="text-center text-3xl font-bold">
            Create Concert
        </h1>
      </div>
      <CreateConcertForm />
    </div>
  );
}
