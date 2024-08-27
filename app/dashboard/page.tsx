import { auth } from "@/edgedb";

import Items, { Props } from "@/components/Items";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { client } = auth.getSession();

  const items = await client.query<Props["items"][number]>(`
    select Item {
      id,
      name,
      created,
      updated,
      created_by: {
        name,
        email
      }
    };
  `);

  return (
    <>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Items
        </h1>
        <Link href="/dashboard/new">
          <button className="bg-primary text-white px-3 py-2 rounded-md text-xs font-semibold">
            + New Item
          </button>
        </Link>
      </header>
      <Items items={items} />
    </>
  );
}
