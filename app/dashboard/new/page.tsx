import AddItem from "@/components/AddItem";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "@/edgedb";
import Link from "next/link";

export const dynamic = "force-dynamic";

const addItem = async (name: string) => {
  "use server";
  const session = auth.getSession();

  await session.client.query(
    "with name := <str>$name insert Item { name := name }",
    { name },
  );
};

export default function Example() {
  return (
    <>
      <Link href="/dashboard">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 inline-block" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddItem addItem={addItem} />
      </div>
    </>
  );
}
